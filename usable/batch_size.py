
# coding:utf8

import os
import sys
import paddle.fluid as fluid
import numpy as np

def testpredict():
    place = fluid.CPUPlace()
    exe = fluid.Executor(place)
    main_program = fluid.default_main_program()

    x = fluid.layers.data(name='x', shape=[256], dtype='float32')
    y_predict = fluid.layers.fc(input=x, size=64, act=None)
    reshaped_y_predict = fluid.layers.reshape(x=y_predict, shape=[-1, 128], act=None, inplace=True)

    # batchnum must less than 5
    # batchnum = 10
    batchnum = 1
    batch_data = [[np.random.rand(256)] for a in range(batchnum)]
    # print (batch_data)

    feeder = fluid.DataFeeder(place=place, feed_list=[x])
    exe.run(fluid.default_startup_program())
    output = exe.run(main_program,
                     feed=feeder.feed(batch_data),
                     fetch_list=[x, y_predict, reshaped_y_predict])
    for o in output:
        print(o.shape)


if __name__ == '__main__':
    testpredict()