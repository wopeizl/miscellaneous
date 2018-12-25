#encoding:utf-8

import os
import mobilenet_v2
import reader
import paddle.fluid as fluid
import paddle
from config import Config

cfg = Config(file('test.cfg'))

# 获取分类器
image = fluid.layers.data(name='image', shape=[cfg.TRAIN.IMAGE_CHANNEL, cfg.TRAIN.IMAGE_WIDTH, cfg.TRAIN.IMAGE_HEIGHT], dtype='float32')
net = mobilenet_v2.MobileNetV2().net(input=image, class_dim=cfg.TRAIN.CLASS_DIM, scale=1.0)

# 获取损失函数和准确率函数
label = fluid.layers.data(name='label', shape=[1], dtype='int64')
cost = fluid.layers.cross_entropy(input=net, label=label)
avg_cost = fluid.layers.mean(cost)
accuracy = fluid.layers.accuracy(input=net, label=label)

# 克隆测试程序
test_program = fluid.default_main_program().clone(for_test=True)

# 定义优化方法
optimizer = fluid.optimizer.AdamOptimizer(learning_rate=cfg.TRAIN.LEARNING_RATE)
opt = optimizer.minimize(avg_cost)

# 获取执行器并进行初始化
place = fluid.CUDAPlace(0) if cfg.TRAIN.USE_GPU else fluid.CPUPlace()
exe = fluid.Executor(place)
exe.run(fluid.default_startup_program())

# 获取训练和测试数据
train_reader = paddle.batch(reader=paddle.reader.shuffle(
    reader=reader.train_reader(cfg.TRAIN.TRAIN_LIST), buf_size=20000), batch_size=cfg.TRAIN.BATCH_SIZE)
test_reader = paddle.batch(reader=reader.test_reader(cfg.TRAIN.TEST_LIST), batch_size=cfg.TRAIN.BATCH_SIZE)

# 定义输入数据维度
feeder = fluid.DataFeeder(feed_list=[image, label], place=place)

# 开始训练
for pass_id in range(cfg.TRAIN.PASS_SUM):
    # 训练
    for batch_id, data in enumerate(train_reader()):
        train_cost, train_acc = exe.run(program=fluid.default_main_program(),
                                        feed=feeder.feed(data),
                                        fetch_list=[avg_cost, accuracy])

        if batch_id % 100 == 0:
            print("Pass:%d, Batch:%d, Cost:%f, Accuracy:%f" % (pass_id, batch_id, train_cost[0], train_acc[0]))

    # 测试
    test_costs = []
    test_accs = []
    for batch_id, data in enumerate(test_reader()):
        test_cost, test_acc = exe.run(program=test_program,
                                      feed=feeder.feed(data),
                                      fetch_list=[avg_cost, accuracy])
        test_costs.append(test_cost[0])
        test_accs.append(test_acc[0])
    test_cost = sum(test_costs) / len(test_costs)
    test_acc = sum(test_accs) / len(test_accs)
    print("Test:%d, Cost:%f, Accuracy:%f" % (pass_id, test_cost, test_acc))

    # 保存模型
    save_model_path = './model/%d' % pass_id
    if not os.path.exists(save_model_path):
        os.makedirs(save_model_path)
    fluid.io.save_inference_model(dirname=save_model_path,
                                  feeded_var_names=[image.name],
                                  target_vars=[net],
                                  executor=exe)