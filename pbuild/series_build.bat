@ECHO OFF

set "source_path=%1"

if "%source_path%"=="" (
    set /p source_path="Please input the dst path : "
)

mkdir %source_path%
cd /d %source_path%
if %errorlevel% NEQ 0 GOTO END

set "release_dir=%source_path%\paddle_release"
mkdir %release_dir%

set http_proxy=http://172.19.57.45:3128
set https_proxy=http://172.19.57.45:3128
set PADDLE_VERSION=1.5.1

echo "begin to download the source code from https://github.com/paddlepaddle/paddle"
git clone https://github.com/paddlepaddle/paddle
cd paddle
git checkout paddle\fluid\framework\commit.h.in 
git checkout cmake\version.cmake
git checkout develop
git pull
git checkout release/1.5
git checkout v1.5.1
git pull
sed -i "s/@PADDLE_VERSION@/%PADDLE_VERSION%/g" paddle\fluid\framework\commit.h.in
sed -i "s/add_definitions(-DPADDLE_VERSION=\${PADDLE_VERSION})//g" cmake\version.cmake
echo "download done!!!"

cd ..
set start_path=%~dp0
echo %start_path%

REM source_path PYTHON_DIR WITH_GPU WITH_MKL WITH_AVX BATDIR

rem build cpu first
if 1==0 (
call %start_path%build.bat %source_path% c:\python27 OFF ON %PADDLE_VERSION% %start_path% %release_dir% d:/v8.0
call %start_path%build.bat %source_path% c:\python27 OFF OFF %PADDLE_VERSION% %start_path% %release_dir% d:/v8.0

call %start_path%build.bat %source_path% c:\python35 OFF ON %PADDLE_VERSION% %start_path% %release_dir% d:/v8.0
call %start_path%build.bat %source_path% c:\python35 OFF OFF %PADDLE_VERSION% %start_path% %release_dir% d:/v8.0

call %start_path%build.bat %source_path% c:\python36 OFF ON %PADDLE_VERSION% %start_path% %release_dir% d:/v8.0
call %start_path%build.bat %source_path% c:\python36 OFF OFF %PADDLE_VERSION% %start_path% %release_dir% d:/v8.0

call %start_path%build.bat %source_path% c:\python37 OFF ON %PADDLE_VERSION% %start_path% %release_dir% d:/v8.0
call %start_path%build.bat %source_path% c:\python37 OFF OFF %PADDLE_VERSION% %start_path% %release_dir% d:/v8.0
)

rem for /D %%i in (d:/v8.0 d:/v9.0 d:/v9.2 d:/v10.0) do (
for /D %%i in (d:/v9.0 d:/v9.2 d:/v10.0) do (
rem call %start_path%build.bat %source_path% c:\python27 ON ON %PADDLE_VERSION% %start_path% %release_dir% %%i
call %start_path%build.bat %source_path% c:\python27 ON OFF %PADDLE_VERSION% %start_path% %release_dir% %%i

call %start_path%build.bat %source_path% c:\python35 ON ON %PADDLE_VERSION% %start_path% %release_dir% %%i
call %start_path%build.bat %source_path% c:\python35 ON OFF %PADDLE_VERSION% %start_path% %release_dir% %%i

call %start_path%build.bat %source_path% c:\python36 ON ON %PADDLE_VERSION% %start_path% %release_dir% %%i
call %start_path%build.bat %source_path% c:\python36 ON OFF %PADDLE_VERSION% %start_path% %release_dir% %%i

call %start_path%build.bat %source_path% c:\python37 ON ON %PADDLE_VERSION% %start_path% %release_dir% %%i
call %start_path%build.bat %source_path% c:\python37 ON OFF %PADDLE_VERSION% %start_path% %release_dir% %%i
)

:END

