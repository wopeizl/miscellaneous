#encoding:utf-8

import paddle.fluid as fluid
from PIL import Image
from config import Config
import numpy as np

cfg = Config(file('test.cfg'))

# 获取执行器
place = fluid.CPUPlace()
exe = fluid.Executor(place)

# 从保存的模型文件中获取预测程序、输入数据的名称和分类器
[infer_program, feeded_var_names, target_vars] = fluid.io.load_inference_model(dirname='./model', executor=exe)


# 对图片进行预处理
def load_image(path):
    img = Image.open(path)
    # 统一图像大小
    img = img.resize((cfg.READER.CROP_SIZE, cfg.READER.CROP_SIZE), Image.ANTIALIAS)
    # 转换成numpy值
    img = np.array(img).astype(np.float32)
    # 转换成CHW
    img = img.transpose((2, 0, 1))
    # 转换成BGR
    img = img[(2, 1, 0), :, :] / 255.0
    return img


# 添加待预测的图片
infer_data = []
infer_data.append(load_image('./dataset/cucumber/2e10432c-01ea-11e9-a2e1-c8ff285a4318.jpg'))
infer_data.append(load_image('./dataset/apple/58d14a90-01e2-11e9-9470-c8ff285a4318.jpg'))
infer_data = np.array(infer_data)
print(infer_data.shape)

results = exe.run(program=infer_program,
                  feed={feeded_var_names[0]: infer_data},
                  fetch_list=target_vars)
print(results)
lab = np.argsort(results)
print(lab[0])