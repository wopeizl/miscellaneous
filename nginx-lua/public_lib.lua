local iconv = require "iconv"
local cjson = require "cjson"
-----------------------------------------

function cjson_encode(tb)
    json = cjson.encode(tb)
    return json
end

function verify_url(tb)
    local verify_req = tb['verify_url'] 
    if verify_req == nil or verify_req == '' then
        return true
    end
    local request = ngx.var.host .. ngx.var.request_uri
    if (string.find(request, verify_req) ~= nil) then
        return true
    else
        return false
    end
end

function to_number(hex_str)
    local total = 0
    local index = 1
    for i = string.len(hex_str), string.len(hex_str)-5, -1 do
        local single_nub = string.sub(hex_str, i, i);
        if single_nub == 'a' then
            single_nub = 10
        elseif single_nub == 'b' then
            single_nub = 11
        elseif single_nub == 'c' then
            single_nub = 12
        elseif single_nub == 'd' then
            single_nub = 13
        elseif single_nub == 'e' then
            single_nub = 14
        elseif single_nub == 'f' then
            single_nub = 15
        end
        total = single_nub*index + total
        index = index * 16
    end
    return total
end

function random()
    local random_nub = math.random(1000000000000000)
    return random_nub
end

function split(str, pat)
    local t = {}  -- NOTE: use {n = 0} in Lua-5.0
    local fpat = "(.-)" .. pat
    local last_end = 1
    local s, e, cap = str:find(fpat, 1)
    while s do
       if s ~= 1 or cap ~= "" then
          table.insert(t,cap)
       end
       last_end = e+1
       s, e, cap = str:find(fpat, last_end)
    end
    if last_end <= #str then
       cap = str:sub(last_end)
       table.insert(t, cap)
    end
    return t
end

function trim (s)
  if s == nil then
      return s
  end
  local x, y
  local len = string.len(s)
  local c1, c2
  for iter = 1, len do
     c1 = string.sub(s, iter, iter)
     if c1 ~= ' ' and c1 ~= '\t' and c1 ~= '\n' and c1 ~= '\r' and c1 ~= '\r\n' then
        x = iter
        break
     end
  end
  if nil ~= x then
     for iter = len, 1, -1 do
        c2 = string.sub(s, iter, iter)
        if c2 ~= ' ' and c2 ~= '\t' and c2 ~= '\n' and c2 ~= '\r' and c2 ~= '\r\n' then
           y = iter
           break
        end
     end
  end
  if 1 == x and len == y then
      return s
  elseif nil == x or nil ==y then
      return ''
  else
      return string.sub(s, x, y)
  end
end

--编码:\x(utf-8)转成%
function escape(w)
    local pattern="[^%w%d%._%-%* ]"
    local s=string.gsub(w,pattern,function(c)
        local c=string.format("%%%02X",string.byte(c))
        return c
    end)
    s=string.gsub(s," ","+")
    return s
end

--解码
function unescape(w)
    local s=string.gsub(w,"+"," ")
    local n
    s, n = string.gsub(s,"%%(%x%x)",function(c)
        return string.char(tonumber(c,16))
    end)
    return s
end

function deepcopy(orig)
    local orig_type = type(orig)
    local copy
    if orig_type == 'table' then
        copy = {}
        for orig_key, orig_value in next, orig, nil do
            copy[deepcopy(orig_key)] = deepcopy(orig_value)
        end
        setmetatable(copy, deepcopy(getmetatable(orig)))
    else -- number, string, boolean, etc
        copy = orig
    end
    return copy
end

function reverse_tb(tb)
    local rev = {}
    rev = deepcopy(tb)
    local len = #rev
    for k, v in pairs(rev) do
        num = len-k+1
        tb[num] = v
    end
    return tb
end

function time_less_than(t1, t2)
    hour_t1, minute_t1 = string.match(t1,"(%d+):(%d+)")
    hour_t2, minute_t2 = string.match(t2,"(%d+):(%d+)")
    if hour_t1 < hour_t2 then
        return true
    elseif hour_t2 == hour_t1 and minute_t1 < minute_t2 then
        return true
    else
        return false
    end
end

--有内存泄露
function createIconv(from,to,text)
  local cd = iconv.new(to .. "//TRANSLIT", from)
  local ostr, err = cd:iconv(text)
  if err == iconv.ERROR_INCOMPLETE then
    return "ERROR: Incomplete input."
  elseif err == iconv.ERROR_INVALID then
    return "ERROR: Invalid input."
  elseif err == iconv.ERROR_NO_MEMORY then
    return "ERROR: Failed to allocate memory."
  elseif err == iconv.ERROR_UNKNOWN then
    return "ERROR: There was an unknown error."
  end
  return ostr
end

function print_r(root)
    local print = print
    local tconcat = table.concat
    local tinsert = table.insert
    local srep = string.rep
    local type = type
    local pairs = pairs
    local tostring = tostring
    local next = next
    print ('\n')
    local cache = {  [root] = "." }
    local function _dump(t,space,name)
        local temp = {}
        for k,v in pairs(t) do
            local key = tostring(k)
            if cache[v] then
                tinsert(temp,"+" .. key .. " {" .. cache[v].."}")
            elseif type(v) == "table" then
                local new_key = name .. "." .. key
                cache[v] = new_key
                tinsert(temp,"+" .. key .. _dump(v,space .. (next(t,k) and "|" or " " ).. srep(" ",#key),new_key))
            else
                tinsert(temp,"+" .. key .. " [" .. tostring(v).."]")
            end
        end
        return tconcat(temp,"\n"..space)
    end
    print(_dump(root, "",""))
end

return {
    verify_url = verify_url,
    to_number = to_number,
    random = random,
    split = split,
    trim = trim,
    escape = escape,
    unescape = unescape,
    deepcopy = deepcopy,
    reverse_tb = reverse_tb,
    time_less_than = time_less_than,
    createIconv = createIconv,
    print_r = print_r,
    cjson_encode = cjson_encode
}
