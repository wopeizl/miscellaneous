local hash_alg = require "utils.hash_alg"
local public_lib = require "utils.public_lib"

-----------------------------------------
function init(init_conf)
    conf = init_conf
end

function replace(tb)
    local replaced_item = nil 
    if tb['replaced'][1]['uri'] ~= nil and tb['replaced'][1]['uri'] ~= '' then
        replaced_item = 'uri'
    elseif tb['replaced'][1]['arg'] ~= nil and tb['replaced'][1]['arg'] ~= '' then
        replaced_item = 'arg'
    else
        return nil, nil
    end

    local key = ''
    for k, v in pairs(tb['key']['ngx_var']) do
        key = key .. ngx.var[v]
    end
    if key == nil then
       return replaced_item, tb['replaced'][1][replaced_item] 
    end
    key_hex = hash_alg.hash256(key)
    key = public_lib.to_number(key_hex)

    local ratio = 0
    for k, item  in pairs(tb['replaced']) do
        local replaced = item[replaced_item]
        local replaced_ratio = tonumber(item['ratio'])
        ratio = ratio + replaced_ratio 
        if key % 100 < ratio then
            return replaced_item, replaced
        end 
    end
end

function verify_time(tb)
    if tb['verify_time'] == nil or tb['verify_time'] == {} then
        return true 
    else
        local now = os.date('%H:%M')
        for k,v in pairs(tb['verify_time']) do
            if public_lib.time_less_than(v['start_time'], now) and public_lib.time_less_than(v['end_time'], now) == false then
                if v['replaced_reverse'] == 'yes' then
                    tb['replaced'] = public_lib.reverse_tb(tb['replaced'])
                    return true
                else
                    return true
                end   
            end 
        end
    end
    return false
end

function do_test()
    if conf.ab_switch == "on" then
        for key, tb in pairs(conf.test_tb) do
            if public_lib.verify_url(tb) then
                if verify_time(tb) then
                    local replaced_uri, replaced_arg = replace(tb)
                    return replaced_uri, replaced_arg
                end
            end
        end
    end
    return  nil, nil
end

function test()
end

return {
    init = init,
    do_test = do_test
}
