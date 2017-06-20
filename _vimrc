set ic
set nu
set nobackup
colorscheme morning
nmap <F3> <ESC>yw<CR>:vimgrep /<c-r>"/ *<CR>
nmap <F4> <ESC>yw<CR>:vimgrep /<c-r>"/ **<CR>
:set tabstop=4
:set shiftwidth=4
:set expandtab


"set fileencodings=utf-8,gb2312,gbk,gb18030
"set termencoding=utf-8
"set encoding=utf-8
"let $LANG ='zh_CN.UTF-8'
source $VIMRUNTIME/delmenu.vim
source $VIMRUNTIME/menu.vim

map <silent> <F5> :!lua %<CR>

