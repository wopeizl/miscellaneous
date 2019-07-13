@ECHO OFF
set /p source_path="Please input the dst path : "
set /p CUDA_PATH="Please input the cuda path : "

cd /d %source_path%
REM if %errorlevel% NEQ 0 GOTO END

set "release_dir=%source_path%\paddle_release"
mkdir %release_dir%

set start_path=%~dp0
echo %start_path%

REM source_path PYTHON_DIR WITH_GPU WITH_MKL WITH_AVX BATDIR
call %start_path%verify.bat %source_path% c:\python27 ON ON ON %start_path% %release_dir%  %CUDA_PATH%
call %start_path%verify.bat %source_path% c:\python27 ON OFF ON %start_path% %release_dir% %CUDA_PATH%
call %start_path%verify.bat %source_path% c:\python27 OFF ON ON %start_path% %release_dir% %CUDA_PATH%
call %start_path%verify.bat %source_path% c:\python27 OFF OFF ON %start_path% %release_dir% %CUDA_PATH%

call %start_path%verify.bat %source_path% c:\python35 ON ON ON %start_path% %release_dir% %CUDA_PATH%
call %start_path%verify.bat %source_path% c:\python35 ON OFF ON %start_path% %release_dir% %CUDA_PATH%
call %start_path%verify.bat %source_path% c:\python35 OFF ON ON %start_path% %release_dir% %CUDA_PATH%
call %start_path%verify.bat %source_path% c:\python35 OFF OFF ON %start_path% %release_dir% %CUDA_PATH%

call %start_path%verify.bat %source_path% c:\python36 ON ON ON %start_path% %release_dir% %CUDA_PATH%
call %start_path%verify.bat %source_path% c:\python36 ON OFF ON %start_path% %release_dir% %CUDA_PATH%
call %start_path%verify.bat %source_path% c:\python36 OFF ON ON %start_path% %release_dir% %CUDA_PATH%
call %start_path%verify.bat %source_path% c:\python36 OFF OFF ON %start_path% %release_dir% %CUDA_PATH%

call %start_path%verify.bat %source_path% c:\python37 ON ON ON %start_path% %release_dir% %CUDA_PATH%
call %start_path%verify.bat %source_path% c:\python37 ON OFF ON %start_path% %release_dir% %CUDA_PATH%
call %start_path%verify.bat %source_path% c:\python37 OFF ON ON %start_path% %release_dir% %CUDA_PATH%
call %start_path%verify.bat %source_path% c:\python37 OFF OFF ON %start_path% %release_dir% %CUDA_PATH%

