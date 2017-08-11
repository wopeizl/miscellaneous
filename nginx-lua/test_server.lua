local cjson = require "cjson";
local function operation()
    local request_method=ngx.var.request_method; 
    local val=nil;
    local redis=require("redis_manager")
    local ltable={returncode=0,message=""};
    if "GET"==request_method then
        local params = ngx.req.get_uri_args();
	--for k,v in pairs(params) do
	--	ngx.log(ngx.ERR,k..","..v.."\n");
	--end
        if not params then
            return val;
        end

        local docid;
        local err_code;
        if params.docid then
            docid=params.docid;
        elseif params.url then
            local res=redis.run_command("get",params.url,nil);
            if res=="" or res==ngx.null or res==nil then
                ltable["message"]="no doc for this url";
                ltable["returncode"]=20001;
                err_code=cjson.encode(ltable);
		return err_code
            else
                docid=res;
            end
        else
            return val
        end

        local str=[[{"returncode":0,"message":"ok"]];
        local num=0;
        for did in string.gmatch(docid,"([^',']+)")do
            local res=redis.run_command("get",did,nil);
            if res=="" or res==ngx.null or res==nil then
                ltable["message"]="no doc for this docid";
                ltable["returncode"]=20001;
                err_code=cjson.encode(ltable);
            else
                num=num+1;
                if val==nil then
                    val=res;
                else
                    val=val..","..res;
                end
            end
        end
       -- ngx.log(ngx.ERR,val.."\n");
        str=str..[[,"response":{"rowcount":]]
        str=str..num..[[,"docs":[]];
        if val~=nil then
            val=str..val.."]}}";
        else
            val=err_code;
        end
        return val;
        
    elseif "POST"==request_method then
        ngx.req.read_body() -- 解析 body 参数之前一定要先读取 body
        local args=ngx.req.get_body_data()
        if not args then
            return val; 
        end
        --args=string.gsub(args,"\'","\"");
        local params=cjson.decode(args);
        if not params.docid or not params.operation then
            return val;
        end

        local docid=params.docid;
        local op=params.operation;
        local res=redis.run_command("get",docid,nil);
	local data
        if not params.data or params.data=="" then
	    if op~=2 then
                val=cjson.encode({returncode=20002,message="field data is null"});
                return val;
            end
        else 
	    data=cjson.decode(params.data);
        end

	--for k,v in pairs(data) do
	--	ngx.log(ngx.ERR,k..":"..v.." ");
	--end
	--ngx.log(ngx.ERR,params.data.."\n");
	ltable["message"]="add successful";

        if op==2 then
            local flag=redis.run_command("del",docid,nil);
            if flag=="" then
                ltable["message"]="delete successful";
                val=cjson.encode(ltable);
            else
                ltable["message"]="no doc for this docid";
                ltable["returncode"]=20001;
                val=cjson.encode(ltable);
            end
        elseif op==0 then
            if res=="" or res==ngx.null or res==nil then
                redis.run_command("set",docid,cjson.encode(data));
                redis.run_command("set",data["url"],docid);
                val=cjson.encode(ltable);
            else
                op=1;
            end
        end
        if op==1 then
            if res=="" or res==ngx.null or res==nil then
                val=cjson.encode({returncode=20003,message="no doc for this docid,modify failed!"});
                return val;
            end
            local json_res=cjson.decode(res);
            for k,v in pairs(data) do
                json_res[k]=v;
            end
            redis.run_command("set",docid,cjson.encode(json_res));
            ltable["message"]="modify successful";
            redis.run_command("set",json_res["url"],docid);
            val=cjson.encode(ltable);
        end
    end
    return val;
end    

ngx.header.content_type = "application/json";
local res=operation()
if(not res) then 
    res=cjson.encode({returncode=20001,message="no docid"});
end
ngx.say(res);
