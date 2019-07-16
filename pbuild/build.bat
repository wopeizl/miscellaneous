@ECHO ON
SETLOCAL 
set source_path=%1
set PYTHON_DIR=%2
set WITH_GPU=%3
set WITH_MKL=%4
set PADDLE_VERSION=%5
set BATDIR=%6
set release_dir=%7
set CUDA_PATH=%8
mkdir d:\.ccache
echo cache_dir=d:\.ccache > d:\.ccache\ccache.conf
echo log_file=d:\ccache.log >> d:\.ccache\ccache.conf
set CCACHE_CONFIGPATH=d:\.ccache\ccache.conf
%start_path%\ccache -M 200G
SET CCACHE_PATH=%BATDIR:\=/%
set NVCC_PATH=%CUDA_PATH%/bin/nvcc.exe
set CL_PATH=C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\BIN\amd64\cl.exe

set WITH_CCACHE=ON
set WITH_SAME_FOLDER=ON
SET CUDA_PATH_WIN=%CUDA_PATH:/=\%
set PATH=%CUDA_PATH_WIN%\nvvm\bin\;%CUDA_PATH_WIN%\bin;%PATH%

call "C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\vcvarsall.bat" amd64

set http_proxy=http://172.19.57.45:3128
set https_proxy=http://172.19.57.45:3128

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
    if "%CUDAV%"=="v8.0" (set PADDLE_VERSION=%PADDLE_VERSION%.post87)
    if "%CUDAV%"=="v9.0" (set PADDLE_VERSION=%PADDLE_VERSION%.post97)
    if "%CUDAV%"=="v9.2" (set PADDLE_VERSION=%PADDLE_VERSION%.post97)
    if "%CUDAV%"=="v10.0" (set PADDLE_VERSION=%PADDLE_VERSION%.post107)
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
    set "dst_path=%source_path%\build_%PYTHONV%_%PLAT%_%BLAS%"
    echo %dst_path%
)

set "pub_path=%release_dir%\build_%PYTHONV%_%PLAT%_%BLAS%"
echo %pub_path%
mkdir %pub_path%

rmdir /q /s %dst_path%

echo "restore the build"
set "BUILD_BACKUP_FILE=build_%PYTHONV%_%PLAT%_%BLAS%_%CUDAV%.zip"
dir %BATDIR%\%BUILD_BACKUP_FILE%
if exist "%BATDIR%\%BUILD_BACKUP_FILE%" (
cd /d %BATDIR%
"%BATDIR%\7z.exe" x %BATDIR%\%BUILD_BACKUP_FILE% -aoa -o.
) else (
mkdir %dst_path%
cd /d %dst_path%
echo "copy env ..."
mkdir python_env
xcopy /C /Y /E %PYTHON_DIR%\* python_env\

mkdir cuda_env
if "%WITH_GPU%"=="ON" (
xcopy /C /Y /E %CUDA_PATH_WIN%\* cuda_env\
)

)

cd /d %dst_path%

set INS=NOAVX
echo "begin to do build noavx ..."
"%BATDIR%\7z.exe" x "%BATDIR%\third_party.rar" -aoa -o.

set PYTHON_DIR="%dst_path%\python_env"

set CUDA_PATH="%dst_path%\cuda_env"
SET CUDA_PATH=%CUDA_PATH:\=/%

if "%WITH_CCACHE%"=="ON" (
set CUDA_NVCC_EXECUTABLE=%CUDA_PATH_WIN%\bin\nvcc.exe
dir %CUDA_NVCC_EXECUTABLE%
cmake ..\Paddle -G "Visual Studio 14 2015 Win64" -DWITH_GPU=%WITH_GPU% -DWITH_MKL=%WITH_MKL% -DWITH_AVX=OFF -DWITH_STATIC_LIB=ON    -DWITH_FLUID_ONLY=ON -DWITH_DSO=ON -DPYTHON_INCLUDE_DIR=%PYTHON_DIR%\include\ -DPYTHON_LIBRARY=%PYTHON_DIR%\libs\ -DPYTHON_EXECUTABLE=%PYTHON_DIR%\python.exe -DCMAKE_BUILD_TYPE=Release -DWITH_TESTING=OFF -DWITH_PYTHON=ON -DCUDA_TOOLKIT_ROOT_DIR=%CUDA_PATH%  -DCUDA_NVCC_EXECUTABLE=%CCACHE_PATH%ccache.exe
echo "replace the CUDA_NVCC_EXECUTABLE as %CCACHE_PATH%/ccache.exe"
%BATDIR%\sed.exe -i -e "s?%NVCC_PATH%?%CCACHE_PATH%ccache.exe?g" CMakeCache.txt
for /F %%i in ('dir /s /b *.cu.obj.cmake.pre-gen') do (
%BATDIR%\sed.exe -i -e "s?%NVCC_PATH%?%CCACHE_PATH%ccache.exe?g" %%i
)
for /F %%i in ('dir /s /b *.cu.obj.Release.cmake') do (
%BATDIR%\sed.exe -i -e "s?%NVCC_PATH%?%CCACHE_PATH%ccache.exe?g" %%i
)

set CUDA_NVCC_EXECUTABLE=%CCACHE_PATH%ccache.exe
rem set CUDA_NVCC_EXECUTABLE=%BATDIR%ccache.exe
msbuild /p:CLToolExe=ccache.exe /p:CLToolPath=%BATDIR% /m /p:Configuration=Release third_party.vcxproj > build.log
msbuild /p:CLToolExe=ccache.exe /p:CLToolPath=%BATDIR% /m /p:Configuration=Release paddle.sln >> build.log
) else (
cmake ..\Paddle -G "Visual Studio 14 2015 Win64" -DWITH_GPU=%WITH_GPU% -DWITH_MKL=%WITH_MKL% -DWITH_AVX=OFF -DWITH_STATIC_LIB=ON    -DWITH_FLUID_ONLY=ON -DWITH_DSO=ON -DPYTHON_INCLUDE_DIR=%PYTHON_DIR%\include\ -DPYTHON_LIBRARY=%PYTHON_DIR%\libs\ -DPYTHON_EXECUTABLE=%PYTHON_DIR%\python.exe -DCMAKE_BUILD_TYPE=Release -DWITH_TESTING=OFF -DWITH_PYTHON=ON -DCUDA_TOOLKIT_ROOT_DIR=%CUDA_PATH%

msbuild /m /p:Configuration=Release third_party.vcxproj
msbuild /m /p:Configuration=Release paddle.sln
)

rmdir /q /s python\build

set INS=AVX
echo "begin to do build avx ..."
"%BATDIR%\7z.exe" x "%BATDIR%\third_party.rar" -aoa -o.
if "%WITH_CCACHE%"=="ON" (
set CUDA_NVCC_EXECUTABLE=%CUDA_PATH_WIN%\bin\nvcc.exe
dir %CUDA_NVCC_EXECUTABLE%
cmake ..\Paddle -G "Visual Studio 14 2015 Win64" -DWITH_GPU=%WITH_GPU% -DWITH_MKL=%WITH_MKL% -DWITH_AVX=ON -DWITH_STATIC_LIB=ON    -DWITH_FLUID_ONLY=ON -DWITH_DSO=ON -DPYTHON_INCLUDE_DIR=%PYTHON_DIR%\include\ -DPYTHON_LIBRARY=%PYTHON_DIR%\libs\ -DPYTHON_EXECUTABLE=%PYTHON_DIR%\python.exe -DCMAKE_BUILD_TYPE=Release -DWITH_TESTING=OFF -DWITH_PYTHON=ON -DCUDA_TOOLKIT_ROOT_DIR=%CUDA_PATH% -DNOAVX_CORE_FILE=%dst_path%\python\paddle\fluid\core_noavx.pyd -DCUDA_NVCC_EXECUTABLE=%CCACHE_PATH%/ccache.exe
echo "replace the CUDA_NVCC_EXECUTABLE as %CCACHE_PATH%ccache.exe"
%BATDIR%\sed.exe -i -e "s?%NVCC_PATH%?%CCACHE_PATH%ccache.exe?g" CMakeCache.txt
for /F %%i in ('dir /s /b *.cu.obj.cmake.pre-gen') do (
%BATDIR%\sed.exe -i -e "s?%NVCC_PATH%?%CCACHE_PATH%ccache.exe?g" %%i
)
for /F %%i in ('dir /s /b *.cu.obj.Release.cmake') do (
%BATDIR%\sed.exe -i -e "s?%NVCC_PATH%?%CCACHE_PATH%ccache.exe?g" %%i
)

set CUDA_NVCC_EXECUTABLE=%CCACHE_PATH%ccache.exe
rem set CUDA_NVCC_EXECUTABLE=%BATDIR%ccache.exe
msbuild /p:CLToolExe=ccache.exe /p:CLToolPath=%BATDIR% /m /p:Configuration=Release third_party.vcxproj >> build.log
msbuild /p:CLToolExe=ccache.exe /p:CLToolPath=%BATDIR% /m /p:Configuration=Release paddle.sln >> build.log
) else (
cmake ..\Paddle -G "Visual Studio 14 2015 Win64" -DWITH_GPU=%WITH_GPU% -DWITH_MKL=%WITH_MKL% -DWITH_AVX=ON -DWITH_STATIC_LIB=ON    -DWITH_FLUID_ONLY=ON -DWITH_DSO=ON -DPYTHON_INCLUDE_DIR=%PYTHON_DIR%\include\ -DPYTHON_LIBRARY=%PYTHON_DIR%\libs\ -DPYTHON_EXECUTABLE=%PYTHON_DIR%\python.exe -DCMAKE_BUILD_TYPE=Release -DWITH_TESTING=OFF -DWITH_PYTHON=ON -DCUDA_TOOLKIT_ROOT_DIR=%CUDA_PATH% -DNOAVX_CORE_FILE=%dst_path%\python\paddle\fluid\core_noavx.pyd

msbuild /m /p:Configuration=Release third_party.vcxproj
msbuild /m /p:Configuration=Release paddle.sln
)

echo "build done!!!"

mkdir inference_dist
"%BATDIR%\7z.exe" a inference_dist\fluid_inference_install_dir.zip fluid_inference_install_dir -r
"%BATDIR%\7z.exe" a inference_dist\fluid_install_dir.zip fluid_install_dir -r

set "verifybat=%6\verify.bat"
call %verifybat% %1 %2 %3 %4 %5 %6 %7 %8

echo "backup the build"
cd ..
"%BATDIR%\7z.exe" a %BUILD_BACKUP_FILE% %dst_path% -r

:END
ENDLOCAL

