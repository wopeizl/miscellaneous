cmake_minimum_required(VERSION 2.8.7)
set( CMAKE_VERBOSE_MAKEFILE off )

# ---[ deep_server project
project(mini3d C CXX)

set(MINI3D_SRCS mini3d.c
    )

add_executable(mini3d ${MINI3D_SRCS}) 
