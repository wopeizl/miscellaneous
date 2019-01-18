
# coding:utf8

from paddle import fluid

x = fluid.layers.fill_constant(shape=[1], dtype='int64', value=5)
exe = fluid.Executor(fluid.CPUPlace())
exe.run(fluid.default_main_program(), fetch_list=[x])


y = fluid.layers.fill_constant(shape=[1], dtype='int64', value=1)
z = x + y
exe.run(fluid.default_main_program(), fetch_list=[z])


a = fluid.layers.fill_constant(shape=[1], dtype='int64', value=1)

ifcond = fluid.layers.less_than(x=z, y=a)
ie = fluid.layers.IfElse(ifcond)

with ie.true_block():
    z1 = ie.input(z)
    z1 = z1 + 1
    ie.output(z1)