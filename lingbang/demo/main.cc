//
// Created by peizhilin on 12/11/2018.
//

#include "inference_icnet.h"

int main() {
  bool use_gpu = false;
  void* handle = init_predictor("__model", "__params__", 0, use_gpu, 0);
  const int C = 3;    // image channel
  const int H = 449;  // image height
  const int W = 581;  // image width
  long long output[C * H * W];
  int output_length = 0;
  predict_file(handle, "test.bmp", output, output_length);
  save_image("output.bmp", output, output_length);
  destory_predictor(handle);
}