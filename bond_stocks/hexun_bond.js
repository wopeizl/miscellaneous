function Cal2(formObj) {
    
        if (!CheckElem(formObj.a, "债券面值")) return false;
        if (!CheckElem(formObj.b, "买入价格")) return false;
        if (!CheckElem(formObj.c, "卖出价格")) return false;
        if (!CheckElem(formObj.d, "持有时间")) return false;
        if (!CheckElem(formObj.i, "票面年利率")) return false;
        
        var a = parseFloat(formObj.a.value);
        var b = parseFloat(formObj.b.value);
        var c = parseFloat(formObj.c.value);
        var d = parseFloat(formObj.d.value);
        var i = parseFloat(formObj.i.value) / 100;
        
        var r = (c - b + a * i * d / 365) / (b * d / 365);
        formObj.r.value = Format(r * 100);
    }
    
function ChgItem(itemName) {
	for (var i = 0; i < 3; i++) {
		GetObj("c" + i).style.display = "none";
	}
	GetObj("c"+itemName).style.display = "block";

}
  
function Cal1(formObj) {

	if (!CheckElem(formObj.t, "发行价格")) return false;
	if (!CheckElem(formObj.c, "卖出价格")) return false;
	if (!CheckElem(formObj.d, "持有时间")) return false;
	if (!CheckElem(formObj.i, "票面年利率")) return false;
	
	var t = parseFloat(formObj.t.value);
	var c = parseFloat(formObj.c.value);
	var d = parseFloat(formObj.d.value);
	var i = parseFloat(formObj.i.value) / 100;
	
	var r = (c - t + d * t * i / 365) / (t * d / 365);
	formObj.r.value = Format(r * 100);
}

function Cal0(formObj) {

	if (!CheckElem(formObj.a, "债券面值")) return false;
	if (!CheckElem(formObj.b, "买入价格")) return false;
	if (!CheckElem(formObj.f, "到期时间")) return false;
	if (!CheckElem(formObj.i, "票面年利率")) return false;
	
	var a = parseFloat(formObj.a.value);
	var b = parseFloat(formObj.b.value);
	var f = parseFloat(formObj.f.value);
	var i = parseFloat(formObj.i.value) / 100;
	
	var r = (a + a * i * f / 365 - b) / (b * f / 365);
	formObj.r.value = Format(r * 100);
}

//债券到期收益
if(GetObj("Bond11_edBuyDate")){
GetObj("Bond11_edBuyDate").value = initdate;}
if(GetObj("Bond11_edSellDate")){
GetObj("Bond11_edSellDate").value = initdate1;}
if(GetObj("Bond21_edBuyDate")){
GetObj("Bond21_edBuyDate").value = initdate;}
if(GetObj("Bond21_edSellDate")){
GetObj("Bond21_edSellDate").value = initdate1;}
if(GetObj("Bond31_edBuyDate")){
GetObj("Bond31_edBuyDate").value = initdate;}
if(GetObj("Bond31_edSellDate")){
GetObj("Bond31_edSellDate").value = initdate1;}


function BRCalcrset(formObj){
	formObj.reset();
	GetObj("Bond11_edBuyDate").value = initdate;
	GetObj("Bond11_edSellDate").value = initdate1;
	GetObj("Bond21_edBuyDate").value = initdate;
	GetObj("Bond21_edSellDate").value = initdate1;
	GetObj("Bond31_edBuyDate").value = initdate;
	GetObj("Bond31_edSellDate").value = initdate1;
	GetObj("Layer0").style.display="";
	GetObj("Layer1").style.display="none";
	GetObj("Layer2").style.display="none";
	GetObj("v2").style.display="none";
	GetObj("v3").style.display="none";
}

function rbT(num){
	for(i=0;i<3;i++){
	if (num==i) {
		GetObj("Layer"+i).style.display = "";
		GetObj("edBond").value = i;
	}
	else{
		GetObj("Layer"+i).style.display = "none";
	}
	}
}

function CHan(){
	var selectv=GetObj("selectv");
	var v2=GetObj("v2");
	var v3=GetObj("v3");
	switch(selectv.value){
		case "1":
		v2.style.display="none";
		v3.style.display="none";
		break;
		case "2":
		v2.style.display="inline";
		v3.style.display="none";
		break;
		case "3":
		v2.style.display="none";
		v3.style.display="inline";
		break;
	}
}


function calcu(formObj) {

	if (GetObj("rbType_0").checked) {
        if (!CheckElem(formObj.Bond11_edUnitCost, "债券单位成本")) return false;
        if (!CheckElem(formObj.Bond11_edUnitPrice, "债券单位面值")) return false;
        if (!CheckEp(formObj.Bond11_edBuyDate, "债券购买交割日期")) return false;
        if (!CheckEp(formObj.Bond11_edSellDate, "债券到期兑付日期")) return false;
		var BuyDate = new Date();
		BuyDate.setTime(StrToDate(formObj.Bond11_edBuyDate.value));
		var SellDate = new Date();
		SellDate.setTime(StrToDate(formObj.Bond11_edSellDate.value));
		if (BuyDate >= SellDate) {
			DispMessage(formObj.Bond11_edSellDate, "债券到期兑付日应当晚于购买交割日");
			return false;
		}
		if (formObj.selectv.value == 1) {
			//贴现
			CalcBond11(0);
		}
		if (formObj.selectv.value == 2) {
			if (!CheckElem1(formObj.Bond11_edRate1, "债券票面年利率")) return false;
			//if (!CheckElem2(formObj.Bond11_edYear, "债券偿还期限")) return false;
			//一次还本付息
			CalcBond11(1);
		}
		if (formObj.selectv.value == 3) {
			if (!CheckElem1(formObj.Bond11_edRate2, "债券票面年利率")) return false;
			if (!CheckElem2(formObj.Bond11_edFreq, "利息支付频率")) return false;
			//定期支付
			CalcBond11(2);
		}
				
	}
	if (GetObj("rbType_1").checked) {
		if (!CheckElem(formObj.Bond21_edUnitCost, "债券单位成本")) return false;
		if (!CheckEp(formObj.Bond21_edBuyDate, "债券购买交割日期")) return false;
		if (!CheckEp(formObj.Bond21_edSellDate, "债券到期兑付日期")) return false;
		var BuyDate = new Date();
		BuyDate.setTime(StrToDate(formObj.Bond21_edBuyDate.value));
		var SellDate = new Date();
		SellDate.setTime(StrToDate(formObj.Bond21_edSellDate.value));
		if (BuyDate >= SellDate) {
			DispMessage(formObj.Bond21_edSellDate, "债券到期兑付日应当晚于购买交割日");
			return false;
		}
        if (!CheckElem(formObj.Bond21_edUnitPrice, "债券单位面值")) return false;
		if (!CheckElem1(formObj.Bond21_edRate, "债券票面年利率")) return false;
		if (!CheckElem2(formObj.Bond21_edYear, "债券偿还期限")) return false;
		//剩余流通期限在一年以上的到期一次还本付息债券
		CalcBond21();
		
	}
	if (GetObj("rbType_2").checked) {
		if (!CheckElem(formObj.Bond31_edUnitCost, "债券单位成本")) return false;
		if (!CheckEp(formObj.Bond31_edBuyDate, "债券购买交割日期")) return false;
		if (!CheckEp(formObj.Bond31_edSellDate, "债券到期兑付日期")) return false;
		var BuyDate = new Date();
		BuyDate.setTime(StrToDate(formObj.Bond31_edBuyDate.value));
		var SellDate = new Date();
		SellDate.setTime(StrToDate(formObj.Bond31_edSellDate.value));
		if (BuyDate >= SellDate) {
			DispMessage(formObj.Bond31_edSellDate, "债券到期兑付日应当晚于购买交割日");
			return false;
		}
		if (!CheckElem(formObj.Bond31_edUnitPrice, "债券单位面值")) return false;
		if (!CheckElem1(formObj.Bond31_edRate, "债券票面年利率")) return false;
		if (!CheckElem2(formObj.Bond31_edFreq, "利息支付频率")) return false;
		//不处于最后付息周期的固定利率附息债券和浮动利率债券
		CalcBond31();
		
	}
	return false;
}




function CalcBond11(Method)
{
	var Year = 0,Freq = 0,UnitPrice = 0;		//int
	var UnitCost,Rate = 0;		//double
	var BuyDate=new Date();
	var SellDate=new Date();
	
	UnitCost = parseFloat(GetObj("Bond11_edUnitCost").value);
	UnitPrice = parseInt(GetObj("Bond11_edUnitPrice").value);
	BuyDate.setTime(StrToDate(GetObj("Bond11_edBuyDate").value));
	SellDate.setTime(StrToDate(GetObj("Bond11_edSellDate").value));
	if(Method == 1)
	{
		Rate = parseFloat(GetObj("Bond11_edRate1").value)/100;
		Year = parseInt(GetObj("Bond11_edYear").value);
	}
	else if(Method == 2)
	{
		Rate = parseFloat(GetObj("Bond11_edRate2").value)/100;
		Freq = parseInt(GetObj("Bond11_edFreq").value);
	}
	
	Excute(UnitCost,BuyDate,SellDate,UnitPrice,Rate,Year,Freq,Method);
}

function CalcBond21()
{
	var Year,UnitPrice;
	var UnitCost,Rate;
	var BuyDate=new Date();
	var SellDate=new Date();
	
	UnitCost = parseFloat(GetObj("Bond21_edUnitCost").value);
	UnitPrice = parseInt(GetObj("Bond21_edUnitPrice").value);
	BuyDate.setTime(StrToDate(GetObj("Bond21_edBuyDate").value));
	SellDate.setTime(StrToDate(GetObj("Bond21_edSellDate").value));
	Rate = parseFloat(GetObj("Bond21_edRate").value)/100;
	Year = parseInt(GetObj("Bond21_edYear").value);

	Excute(UnitCost,BuyDate,SellDate,UnitPrice,Rate,Year,0,3);
}

function CalcBond31()
{
	var Freq,UnitPrice;
	var UnitCost,Rate;
	var BuyDate=new Date();
	var SellDate=new Date();
	
	UnitCost = parseFloat(GetObj("Bond31_edUnitCost").value);
	UnitPrice = parseInt(GetObj("Bond31_edUnitPrice").value);
	BuyDate.setTime(StrToDate(GetObj("Bond31_edBuyDate").value));
	SellDate.setTime(StrToDate(GetObj("Bond31_edSellDate").value));
	Rate = parseFloat(GetObj("Bond31_edRate").value)/100;
	Freq = parseInt(GetObj("Bond31_edFreq").value);

	Excute(UnitCost,BuyDate,SellDate,UnitPrice,Rate,0,Freq,4);
}
	/// 债券单位成本（包括成交价格和应计利息）: 　  元，正数，小数点后两位
	//var Cost=0;
	/// 债券购买交割日: 　  年 /月/日
	//var BondBuyDate=new Date();
	/// 债券到期兑付日: 　  年 /月/日，晚于购买交割日
	//var BondEndDate=new Date(); 
	///债券单位面值: 　  元 ，正整数 
	//var EndCost=0;
	///  债券票面年利率: 　  (%)  ，正数，小数点后两位
	//var BondRate=0;
	/// 债券偿还期限: 　  年，正整数
	//var YearTimes=0;
	/// 债券每年的利息支付频率: 　  次，正整数
	//var Freq=0;
	/// 该债券的到期收益率为：%（正数，保留两位小数；计算得出）
	/// <return>到期收益率</return>
	/// <param name="options">参数 0、贴现
	///                            1、到期一次还本付息债券
	///                            2、剩余流通期限在一年以内（含一年）的定期支付债券
	///                            3、剩余流通期限在一年以上的到期一次还本付息债券 
	///	                           4、处于最后付息周期的固定利率附息债券和浮动利率债券
	///			</param>
function Excute(Cost,BondBuyDate,BondEndDate,EndCost,BondRate,YearTimes,Freq,options)
{
	var w,m,tDays=0;	//int
	var l,pv,x,s,e,isetp;	//double
	var CurrDate=new Date(BondBuyDate.getFullYear(),0,1);
	var BondEndRate;

	tDays=GetDayLen1(BondEndDate,BondBuyDate)+1;
	switch(options)
	{
		case 0:
			BondEndRate=(EndCost-Cost)/Cost*365/tDays;
			break;
		case 1:
			BondEndRate=(EndCost+YearTimes*EndCost*BondRate-Cost)/Cost*365/tDays;
			break;
		case 2:
			BondEndRate=((EndCost+EndCost*BondRate/Freq)-Cost)/Cost*365.0/tDays;
			break;
		case 3:
			BondEndRate=Math.pow((EndCost+EndCost*YearTimes*BondRate)/Cost,365.0/tDays)-1;
			break;
		case 4:
			l=tDays*Freq/365;
			m=parseInt(l + 1);
			w= tDays % (365/Freq) / (365/Freq);
			isetp=0.0001;
			s=0.001;
			e=1;
			pv=0;						
			x=(e-s)/2;
			while ((Math.abs(pv-Cost)>0.001)&&(Math.abs(e-s)>isetp))
			{
				pv=Calc(x,w,m,EndCost,BondRate,Freq);
				if (pv==0) break;
				if (pv<Cost) 
				{
					e=x;
					x=(s+e)/2;
				}
				if (pv>Cost)
				{
					s=x;
					x=(s+e)/2;
				}
			}
			BondEndRate=x;
			break;
	}
	GetObj("lbResult").value = Format(BondEndRate*100);
}

function Calc(x, w, m, EndCost, BondRate, Freq)
{
	var y=0;
	for (var i=0;i<=m-1;i++)
		y=y+((EndCost*BondRate)/Freq)/Math.pow((1+x/Freq),i+w);
	y=y+(EndCost/Math.pow((1+x/Freq),(w+m-1)));
	
	return y;
}

//计算两个日期的天数差
function GetDayLen(Date1,Date2)
{
	var StartDate=new Date(Date1);
	var StandDate=new Date(Date2);
    
    // 实际天数的算法
    //return (StartDate-StandDate)/(24*60*60*1000);
	
	// 以每月30天算一月，一年为360天
    var DiffDay=(StartDate.getFullYear()-StandDate.getFullYear())*360+(StartDate.getMonth()-StandDate.getMonth())*30+(StartDate.getDate()-StandDate.getDate());
	
	return DiffDay;
}
function GetDayLen1(Date1, Date2)//add by aiai 6/18/04
{
	var StartDate=new Date(Date1);
	var StandDate=new Date(Date2);
    
    // 实际天数的算法
    return (StartDate-StandDate)/(24*60*60*1000);
}




//认购收益率
if(GetObj("edDate")){
GetObj("edDate").value = initdate;}

function rgT(n){
	switch(n){
		case 0:
		GetObj("rg1").style.display = "none";
		GetObj("rg2").style.display = "none";
		break;
		case 1:
		GetObj("rg1").style.display = "block";
		GetObj("rg2").style.display = "none";
		break;
		case 2:
		GetObj("rg1").style.display = "block";
		GetObj("rg2").style.display = "block";
		break;
		}
}
function CBProfitrset(formObj){
	formObj.reset();
	GetObj("rg1").style.display = "none";
	GetObj("rg2").style.display = "none";
	GetObj("edDate").value = initdate;
}
function CalcBondBuy(formObj){
	/// 债券面额：元（正整数；无默认值）
	var Cost=0;
	///  票面利率： %（正数，保留两位小数；债券种类为贴现，则不显示；无默认值）
	var Rate=0;
	///	认购价格：元（正整数；无默认值）
	var BuyPrice=0;
	///	债券期限：年（正整数）
	var Years=0;
	///	认购日期：年/月/日
	var BuyDate= new Date();
	/// 债券每年的利息支付频率: 　  次，正整数
	var Freq=0;
	/// options  1、贴现债券
	///		    2、到期一次还本付息债券 
	///         3、固定利率附息债券和浮动利率债券
	var w,m;
	var pv,x,s,e,isetp,ret=0;
	var CurrDate=new Date();
	
	if (!CheckElem(formObj.edCost, "债券面额"))  return false;
	if (!CheckElem(formObj.edPrice, "认购价格")) return false;
	if (!CheckElem2(formObj.edYear, "债券期限")) return false;
	//贴现债券
	if (GetObj("rgType_0").checked) {
		options=0;
		Cost=parseFloat(formObj.edCost.value);
		BuyPrice=parseFloat(formObj.edPrice.value);
		Years=parseInt(formObj.edYear.value);
	}
	//到期一次还本付息债券
	if (GetObj("rgType_1").checked) {
		if (!CheckElem1(formObj.edRate, "票面利率")) return false;
		options=1;
		Cost=parseFloat(formObj.edCost.value);
		BuyPrice=parseFloat(formObj.edPrice.value);
		Years=parseInt(formObj.edYear.value);
		Rate=parseFloat(formObj.edRate.value)/100;
	}
	//固定利率和浮动利率
	if (GetObj("rgType_2").checked) {
		if (!CheckElem1(formObj.edRate, "票面利率")) return false;
		if (!CheckEp(formObj.edDate, "认购日期")) return false;
		if (!CheckElem2(formObj.edFreq, "利息支付频率", false)) return false;
		options=2;
		Cost=parseFloat(formObj.edCost.value);
		BuyPrice=parseFloat(formObj.edPrice.value);
		Years=parseInt(formObj.edYear.value);
		Rate=parseFloat(formObj.edRate.value)/100;
		BuyDate=formObj.edDate.value;
		Freq=parseInt(formObj.edFreq.value);
		CurrDate =StrToDate1(BuyDate);
		CurrDate.setYear(CurrDate.getYear()+Years);

	}
	
	switch(options)
	{
		case 0:
			ret=(Cost-BuyPrice*1.0)/(BuyPrice*Years);
			break;
		case 1:
			ret= Math.pow((Cost+Years*Cost*Rate)/BuyPrice,1.0/Years)-1;
			break;
		case 2:
			m=Years*Freq;
			w=1;
			isetp=0.0001;
			s=0.001;
			e=1;
			pv=0;						
			x=(1-isetp)/2;
			while ((Math.abs(pv-BuyPrice)>0.001)&&(Math.abs(e-s)>isetp))
			{
				pv=Calcrg(x,w,m,Cost,Rate,Freq);
				if (pv==0)
					break;
				if (pv<BuyPrice) 
				{
					e=x;
					x=s+(e-s)/2;
				}
				if (pv>BuyPrice)
				{
					s=x;
					x=s+(e-s)/2;
				}
			}
			ret=x;
			break;
	}
	formObj.lbResult.value = Format(ret*100);
}
function Calcrg(x,w,m,Cost,Rate,Freq)
{
	var y=0;
	for (i=w;i<=w+m-1;i++)
		y=y+(Cost*Rate/Freq)/Math.pow((1+x/Freq),i);
	y=y+(Cost/Math.pow((1+x/Freq),(w+m-1)));
	return y;
}


//买卖比较
/**
lblYearTime  年付息次数
lblRetTerm   偿还期限
lblRate   票面年利率
lblLimitDate  到期兑换日期
lblPrice  成本价格
lblBuyDate 债券购入日期
lblSellDate  卖出日期
lblWillBuyDate  预计购入
**/
if(GetObj("dpLimitDate")){
GetObj("dpLimitDate").value = initdate1;}
if(GetObj("dpBuyDate")){
GetObj("dpBuyDate").value = initdate;}
if(GetObj("dpSellDate")){
GetObj("dpSellDate").value = initdate1;}
if(GetObj("dpWillBuyDate")){
GetObj("dpWillBuyDate").value = initdate;}

function Hidden(ctrl) {
	ctrl.style.display="none";
}

function Show(ctrl) {
	ctrl.style.display="block";
}
function GetRate(month)
{
if ( month<=3) return rateDemand;
if ( 3 < month && month<=6) return rate3;
if ( 6 < month && month<=12) return rate6;
if ( 12 < month && month<=24) return rate12;
if ( 24 < month && month<=36) return rate24;
if ( 36 < month && month<=60) return rate36;
if ( 60 < month) return rate60;
} 
//重置
function Edurset(formObj){
	formObj.reset();
	Hidden(GetObj("lblYearTime"));
	Hidden(GetObj("lblRetTerm"));
	Hidden(GetObj("lblRate"));
	Hidden(GetObj("lblLimitDate"));
	Show(GetObj("lblPrice"));
	Show(GetObj("lblBuyDate"));
	Show(GetObj("lblSellDate"));
	Hidden(GetObj("lblWillBuyDate"));	
	GetObj("dpLimitDate").value = initdate1;
	GetObj("dpBuyDate").value = initdate;
	GetObj("dpSellDate").value = initdate1;
	GetObj("dpWillBuyDate").value = initdate;
	GetObj("lblInfo").innerHTML="&nbsp;";
}
function mmrb(){
  if (GetObj("rblID_0").checked) {
	  Show(GetObj("lblLimitDate"));
	  Hidden(GetObj("lblPrice"));
	  Hidden(GetObj("lblBuyDate"));
	  Hidden(GetObj("lblSellDate"));
	  Show(GetObj("lblWillBuyDate"));
		switch(GetObj("ddlType").value){
		  case "1":
		  Hidden(GetObj("lblYearTime"));
		  Hidden(GetObj("lblRetTerm"));
		  Hidden(GetObj("lblRate"));
		  break
		  case "2":
		  Hidden(GetObj("lblYearTime"));
		  Show(GetObj("lblRetTerm"));
		  Show(GetObj("lblRate"));
		  break
		  case "3":
		  Show(GetObj("lblYearTime"));
		  Hidden(GetObj("lblRetTerm"));
		  Show(GetObj("lblRate"));
		  break
		}
	  }
  if (GetObj("rblID_1").checked) {
	  Hidden(GetObj("lblRetTerm"));
	  Hidden(GetObj("lblLimitDate"));
	  Show(GetObj("lblPrice"));
	  Show(GetObj("lblBuyDate"));
	  Show(GetObj("lblSellDate"));
	  Hidden(GetObj("lblWillBuyDate"));
		switch(GetObj("ddlType").value){
		  case "1":
		  Hidden(GetObj("lblYearTime"));
		  Hidden(GetObj("lblRate"));
		  break
		  case "2":
		  Hidden(GetObj("lblYearTime"));
		  Show(GetObj("lblRate"));
		  break
		  case "3":
		  Show(GetObj("lblYearTime"));
		  Show(GetObj("lblRate"));
		  break
		}
  }
}

function mmd(n){
  if (GetObj("rblID_0").checked) {
	  switch(n)
	  {
		  case "1":
		  Hidden(GetObj("lblYearTime"));
		  Hidden(GetObj("lblRetTerm"));
		  Hidden(GetObj("lblRate"));
		  break
		  case "2":
		  Hidden(GetObj("lblYearTime"));
		  Show(GetObj("lblRetTerm"));
		  Show(GetObj("lblRate"));
		  break
		  case "3":
		  Show(GetObj("lblYearTime"));
		  Hidden(GetObj("lblRetTerm"));
		  Show(GetObj("lblRate"));
		  break
	  }
  }
  if (GetObj("rblID_1").checked) {
	  switch(n)
	  {
		  case "1":
		  Hidden(GetObj("lblYearTime"));
		  Hidden(GetObj("lblRate"));
		  break
		  case "2":
		  Hidden(GetObj("lblYearTime"));
		  Show(GetObj("lblRate"));
		  break
		  case "3":
		  Show(GetObj("lblYearTime"));
		  Show(GetObj("lblRate"));
		  break
	  }
  }
}
//计算
function mmcalc(formObj){
  if (!CheckElem(formObj.tbCost, "债券票面面值")) return false;
  var result;
  var msg="作为0方，您的债券最1价格是2元，否则，您的投资回报将低于当前银行利率。";
  if (GetObj("rblID_0").checked) {
	  if (!CheckElem(formObj.dpLimitDate, "到期兑换日期")) return false;
	  if (!CheckElem(formObj.dpWillBuyDate, "预计购入")) return false;
	  var HaveMonth=Cal_MonthDiff(StrToDate1(formObj.dpWillBuyDate.value),StrToDate1(formObj.dpLimitDate.value));
	  Rate=GetRate(HaveMonth);
		switch(GetObj("ddlType").value){
		  case "1"://贴现债券
		  result=CalcBuyTx(formObj.tbCost.value,formObj.dpLimitDate.value,formObj.dpWillBuyDate.value,Rate);
		  break;
		  case "2"://到期一次性还本付息
		  if (!CheckElem(formObj.tbRetTerm, "偿还期限")) return false;
		  if (!CheckElem(formObj.tbRate, "票面年利率")) return false;
		  var RetTerm = parseInt(formObj.tbRetTerm.value);
		  result=CalcBuyDq(formObj.tbCost.value,parseFloat(formObj.tbRate.value)/100,formObj.dpLimitDate.value,formObj.dpWillBuyDate.value,Rate, RetTerm);
		  break;
		  case "3"://固定利率债券和浮动利率债券	
		  if (!CheckElem(formObj.tbYearTime, "年付息次数")) return false;
		  if (!CheckElem(formObj.tbRate, "票面年利率")) return false;
		  result=CalcBuyGd(formObj.tbCost.value,parseFloat(formObj.tbRate.value)/100,formObj.tbYearTime.value,formObj.dpLimitDate.value,formObj.dpWillBuyDate.value,Rate);
		  break;
		}
		GetObj("lblInfo").innerHTML=msg.replace("0","买").replace("1","高买入").replace("2",Format(result).toString());
	  }
  if (GetObj("rblID_1").checked) {
	  if (!CheckElem(formObj.tbPrice, "成本价格")) return false;
	  if (!CheckElem(formObj.dpBuyDate, "债券购入日期")) return false;
	  if (!CheckElem(formObj.dpSellDate, "卖出日期")) return false;
	  var HaveMonth=Cal_MonthDiff(StrToDate1(formObj.dpBuyDate.value),StrToDate1(formObj.dpSellDate.value));
	  Rate=GetRate(HaveMonth);
		switch(GetObj("ddlType").value){
		  case "1"://贴现债券
		  result=CalcSaleTx(formObj.tbCost.value,formObj.dpLimitDate.value,formObj.tbPrice.value,formObj.dpBuyDate.value,formObj.dpSellDate.value,Rate);
		  break;
		  case "2"://到期一次性还本付息
		  if (!CheckElem(formObj.tbRate, "票面年利率")) return false;
		  result=CalcSaleDq(formObj.tbCost.value,parseFloat(formObj.tbRate.value)/100,formObj.dpLimitDate.value,formObj.tbPrice.value,formObj.dpBuyDate.value,formObj.dpSellDate.value,Rate);
		  break;
		  case "3"://固定利率债券和浮动利率债券	
		  if (!CheckElem(formObj.tbYearTime, "年付息次数")) return false;
		  if (!CheckElem(formObj.tbRate, "票面年利率")) return false;
		  result=CalcSaleGd(formObj.tbCost.value,parseFloat(formObj.tbRate.value)/100,formObj.tbYearTime.value,formObj.dpLimitDate.value,formObj.tbPrice.value,formObj.dpBuyDate.value,formObj.dpSellDate.value,Rate);
		  break;
		}
		GetObj("lblInfo").innerHTML=msg.replace("0","卖").replace("1","低卖出").replace("2",Format(result).toString());
  }
  
}


function GetHaveYear(s, e)
{
	var dt_s = Date.parse(s.replace(/-/g, "/"));
	var dt_e = Date.parse(e.replace(/-/g, "/"));
	return (dt_e - dt_s) / (1000 * 60 * 60 * 24) / 365;
}

function CalcBuyDq(CurrCost, YearRate, EndYears, BuyYears, Rate, RetTerm)
{
					var interestRate = 0.05;  //利息税率
	var MaxBuyPrice;
	CurrCost = new Number(CurrCost);
	YearRate = new Number(YearRate);
	Rate = new Number(Rate);
	RetTerm = new Number(RetTerm);
	//2）	到期一次还本付息债券：
	//增加输入项：债券偿还期限，单位为月。该项输入只有在选择了到期一次性还本付息债券以及计算买方时才显示。默认为12个月。
	//最高买入价格＝债券票面面值×（1+债券偿还期限÷12×债券票面年利率）÷（1+银行年利率×(1-利息税率)）持有年限
	MaxBuyPrice = CurrCost * (1 + RetTerm / 12 * YearRate) / Math.pow(1 + Rate * (1-interestRate), GetHaveYear(BuyYears, EndYears));
	return MaxBuyPrice;
}

function CalcBuyGd(CurrCost, YearRate, Freq, EndYears, BuyYears, Rate)
{
					var interestRate = 0.05;  //利息税率
	var MaxBuyPrice, D, WillInterestTimes;
	CurrCost = new Number(CurrCost);
	YearRate = new Number(YearRate);
	Rate = new Number(Rate);
	Freq = new Number(Freq);
	//3）	固定利率附息债券和浮动利率债券：
	//最高买入价格＝债券票面面值÷（1+银行年利率×(1-利息税率)）持有年限+（债券票面面值×债券票面年利率÷年付息次数）
	//  ×[1－（1+银行年利率×(1-利息税率)÷年付息次数）－将领取利息次数]÷（银行年利率×(1-利息税率)÷年付息次数）
	//其中：将领取利息次数＝（债券到期兑换日期－预计买入日期）/（365÷年付息次数）（如有小数，进1位整数，再取整）
	D = GetHaveYear(BuyYears, EndYears) * Freq;
	WillInterestTimes = Math.ceil(D);
	MaxBuyPrice = CurrCost / Math.pow(1 + Rate * (1-interestRate), GetHaveYear(BuyYears, EndYears)) + (CurrCost * YearRate / Freq)
			* (1 - Math.pow(1 + Rate * (1-interestRate) / Freq, - WillInterestTimes)) / (Rate * (1-interestRate) / Freq);
	return MaxBuyPrice;
}

function CalcBuyTx(CurrCost, EndYears, BuyYears, Rate)
{
					var interestRate = 0.05; //利息税率
	var MaxBuyPrice;
	CurrCost = new Number(CurrCost);
	Rate = new Number(Rate);
	//1）	贴现债券：
	//最高买入价格＝债券票面面值÷（1+银行年利率×持有年限×（1-利息税率））
	MaxBuyPrice = CurrCost / (1 + Rate * GetHaveYear(BuyYears, EndYears) * (1-interestRate));
	return MaxBuyPrice;
}

function CalcSaleDq(CurrCost, YearRate, EndYears, Cost, BuyYears, SaleYears, Rate)
{
					var interestRate = 0.05; //利息税率
	var MinSalePrice;
	CurrCost = new Number(CurrCost);
	YearRate = new Number(YearRate);
	Cost = new Number(Cost);
	Rate = new Number(Rate);
	//2）	到期一次还本付息债券：
	//最低卖出价格＝债券成本价格×（1+银行年利率×(1-利息税率)）持有年限
	MinSalePrice = Cost * Math.pow(1 + Rate * (1-interestRate), GetHaveYear(BuyYears, SaleYears));
	return MinSalePrice;
}

function CalcSaleGd(CurrCost, YearRate, Freq, EndYears, Cost, BuyYears, SaleYears, Rate)
{
					var interestRate = 0.05; //利息税率
	var MinSalePrice, D, AlreadyInterestedTimes;
	CurrCost = new Number(CurrCost);
	YearRate = new Number(YearRate);
	Cost = new Number(Cost);
	Rate = new Number(Rate);
	Freq = new Number(Freq);
	//3）	固定利率附息债券和浮动利率债券：
	//最低卖出价格＝债券成本价格×（1+银行年利率×(1-利息税率)）持有年限－
	//  （债券票面面值×债券票面年利率÷年付息次数）×[（1+银行年利率×（1-利息税率）÷年付息次数）已领取利息次数－1]
	//  ÷（银行年利率×（1-利息税率）÷年付息次数）
	//已领取利息次数＝（预计卖出日期－债券购入日期）/（365÷年付息次数）（如有小数，取整数部分）
	D = GetHaveYear(BuyYears, SaleYears) * Freq;
	AlreadyInterestedTimes = Math.floor(D);
	MinSalePrice = Cost * Math.pow(1 + Rate * (1-interestRate), GetHaveYear(BuyYears, SaleYears))
		- (CurrCost * YearRate / Freq) * (Math.pow(1 + Rate * (1-interestRate) / Freq, AlreadyInterestedTimes) - 1)
		/ (Rate * (1-interestRate) / Freq);
	return MinSalePrice;
}

function CalcSaleTx(Currcost, EndYears, Cost, BuyYears, SaleYears, Rate)
{
					var interestRate = 0.05; //利息税率
	var MinSalePrice;
	Currcost = new Number(Currcost);
	Cost = new Number(Cost);
	Rate = new Number(Rate);
	//1）	贴现债券：
	//最低卖出价格＝债券成本价格×银行年利率×持有年限×（1-利息税率）+债券成本价格
	MinSalePrice = Cost * Rate * GetHaveYear(BuyYears, SaleYears) * (1-interestRate) + Cost;
	return MinSalePrice;
}
