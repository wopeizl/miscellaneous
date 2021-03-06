@ECHO ON
SETLOCAL ENABLEDELAYEDEXPANSION
set source_path=%1
set PYTHON_DIR=%2
set WITH_GPU=%3
set WITH_MKL=%4
set PADDLE_VERSION=%5
set BATDIR=%6
set release_dir=%7
set CUDA_PATH=%8
SET CUDA_PATH_WIN=%CUDA_PATH:/=\%
set PATH=%CUDA_PATH_WIN%\bin;%PATH%

set http_proxy=
set https_proxy=
set WITH_SAME_FOLDER=ON

for /f "tokens=1,2,* delims=\\" %%a in ("%PYTHON_DIR%") do (
	set c1=%%a
	set c2=%%b
)

set PYTHONV=%c2%
for /f "tokens=1,2,* delims=/" %%a in ("%CUDA_PATH%") do (
	set x1=%%a
	set x2=%%b
)

set CUDAV=%x2%

if "%WITH_GPU%"=="ON" (
    set PLAT=GPU
) else (
    set PLAT=CPU
)

if "%WITH_MKL%"=="ON" (
    set BLAS=MKL
) else (
    set BLAS=OPEN
)

if "%WITH_SAME_FOLDER%"=="ON" (
    set "dst_path=%source_path%\build"
    echo %dst_path%
) else (
    set "dst_path=%source_path%\build_%PYTHONV%_%PLAT%_%BLAS%_%CUDAV%"
    echo %dst_path%
)

set "pub_path=%release_dir%\build_%PYTHONV%_%PLAT%_%BLAS%_%CUDAV%"
echo %pub_path%
mkdir %pub_path%

cd /d %dst_path%
if %errorlevel% NEQ 0 GOTO END

REM verify the whl
set "tmpdir=%TMP%\build_%PYTHONV%_%PLAT%_%BLAS%"
echo tmpdir %tmpdir%
rmdir /s /q %tmpdir%
mkdir %tmpdir%
cd /d %tmpdir%
%PYTHON_DIR%\python.exe -m pip install --upgrade pip
%PYTHON_DIR%\python.exe -m pip install setuptools==28.0.0
%PYTHON_DIR%\python.exe -m pip install virtualenv
%PYTHON_DIR%\Scripts\virtualenv paddletest
call paddletest\Scripts\activate.bat
dir /s /b %dst_path%\python\dist\*.whl > whl_file.txt
REM type whl_file.txt 
set /p PADDLE_WHL_FILE_WIN=< whl_file.txt
if "%WITH_GPU%"=="ON" (
    pip uninstall -y paddlepaddle-gpu
) else (
    pip uninstall -y paddlepaddle
)
pip install %PADDLE_WHL_FILE_WIN%
echo import paddle.fluid;print(paddle.__version__) > test_whl.py
python test_whl.py

if %errorlevel% NEQ 0 (
    GOTO END
)

REM run the book test cases
set "paddle_path=%source_path%\paddle\python\paddle\fluid\tests\book\"
for /f %%i in ('dir /b %paddle_path%\test_*.py') do (
    python %paddle_path%\%%i
    if !errorlevel! NEQ 0 GOTO END
)

echo copy %PADDLE_WHL_FILE_WIN% %pub_path%
copy /Y %PADDLE_WHL_FILE_WIN% %pub_path%
copy /Y %dst_path%\inference_dist\fluid_inference_install_dir.zip %pub_path%\fluid_inference_install_dir_%PYTHONV%_%PLAT%_%BLAS%_%CUDAV%.zip
copy /Y %dst_path%\inference_dist\fluid_install_dir.zip %pub_path%\fluid_install_dir_%PYTHONV%_%PLAT%_%BLAS%_%CUDAV%.zip

:END
rmdir /q /s %tmpdir%
ENDLOCAL


