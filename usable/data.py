
# coding:utf8

import os
import sys
import paddle.fluid as fluid
import numpy as np


# error is not clearly indicate that name should be a given

# Traceback (most recent call last):
#   File "data.py", line 10, in <module>
#     a = fluid.layers.data(shape=[1], dtype='int64')
# TypeError: data() takes at least 2 arguments (2 given)

a = fluid.layers.data(shape=[1], dtype='int64')