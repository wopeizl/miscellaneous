function Cal2(formObj) {
    
        if (!CheckElem(formObj.a, "ծȯ��ֵ")) return false;
        if (!CheckElem(formObj.b, "����۸�")) return false;
        if (!CheckElem(formObj.c, "�����۸�")) return false;
        if (!CheckElem(formObj.d, "����ʱ��")) return false;
        if (!CheckElem(formObj.i, "Ʊ��������")) return false;
        
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

	if (!CheckElem(formObj.t, "���м۸�")) return false;
	if (!CheckElem(formObj.c, "�����۸�")) return false;
	if (!CheckElem(formObj.d, "����ʱ��")) return false;
	if (!CheckElem(formObj.i, "Ʊ��������")) return false;
	
	var t = parseFloat(formObj.t.value);
	var c = parseFloat(formObj.c.value);
	var d = parseFloat(formObj.d.value);
	var i = parseFloat(formObj.i.value) / 100;
	
	var r = (c - t + d * t * i / 365) / (t * d / 365);
	formObj.r.value = Format(r * 100);
}

function Cal0(formObj) {

	if (!CheckElem(formObj.a, "ծȯ��ֵ")) return false;
	if (!CheckElem(formObj.b, "����۸�")) return false;
	if (!CheckElem(formObj.f, "����ʱ��")) return false;
	if (!CheckElem(formObj.i, "Ʊ��������")) return false;
	
	var a = parseFloat(formObj.a.value);
	var b = parseFloat(formObj.b.value);
	var f = parseFloat(formObj.f.value);
	var i = parseFloat(formObj.i.value) / 100;
	
	var r = (a + a * i * f / 365 - b) / (b * f / 365);
	formObj.r.value = Format(r * 100);
}

//ծȯ��������
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
        if (!CheckElem(formObj.Bond11_edUnitCost, "ծȯ��λ�ɱ�")) return false;
        if (!CheckElem(formObj.Bond11_edUnitPrice, "ծȯ��λ��ֵ")) return false;
        if (!CheckEp(formObj.Bond11_edBuyDate, "ծȯ���򽻸�����")) return false;
        if (!CheckEp(formObj.Bond11_edSellDate, "ծȯ���ڶҸ�����")) return false;
		var BuyDate = new Date();
		BuyDate.setTime(StrToDate(formObj.Bond11_edBuyDate.value));
		var SellDate = new Date();
		SellDate.setTime(StrToDate(formObj.Bond11_edSellDate.value));
		if (BuyDate >= SellDate) {
			DispMessage(formObj.Bond11_edSellDate, "ծȯ���ڶҸ���Ӧ�����ڹ��򽻸���");
			return false;
		}
		if (formObj.selectv.value == 1) {
			//����
			CalcBond11(0);
		}
		if (formObj.selectv.value == 2) {
			if (!CheckElem1(formObj.Bond11_edRate1, "ծȯƱ��������")) return false;
			//if (!CheckElem2(formObj.Bond11_edYear, "ծȯ��������")) return false;
			//һ�λ�����Ϣ
			CalcBond11(1);
		}
		if (formObj.selectv.value == 3) {
			if (!CheckElem1(formObj.Bond11_edRate2, "ծȯƱ��������")) return false;
			if (!CheckElem2(formObj.Bond11_edFreq, "��Ϣ֧��Ƶ��")) return false;
			//����֧��
			CalcBond11(2);
		}
				
	}
	if (GetObj("rbType_1").checked) {
		if (!CheckElem(formObj.Bond21_edUnitCost, "ծȯ��λ�ɱ�")) return false;
		if (!CheckEp(formObj.Bond21_edBuyDate, "ծȯ���򽻸�����")) return false;
		if (!CheckEp(formObj.Bond21_edSellDate, "ծȯ���ڶҸ�����")) return false;
		var BuyDate = new Date();
		BuyDate.setTime(StrToDate(formObj.Bond21_edBuyDate.value));
		var SellDate = new Date();
		SellDate.setTime(StrToDate(formObj.Bond21_edSellDate.value));
		if (BuyDate >= SellDate) {
			DispMessage(formObj.Bond21_edSellDate, "ծȯ���ڶҸ���Ӧ�����ڹ��򽻸���");
			return false;
		}
        if (!CheckElem(formObj.Bond21_edUnitPrice, "ծȯ��λ��ֵ")) return false;
		if (!CheckElem1(formObj.Bond21_edRate, "ծȯƱ��������")) return false;
		if (!CheckElem2(formObj.Bond21_edYear, "ծȯ��������")) return false;
		//ʣ����ͨ������һ�����ϵĵ���һ�λ�����Ϣծȯ
		CalcBond21();
		
	}
	if (GetObj("rbType_2").checked) {
		if (!CheckElem(formObj.Bond31_edUnitCost, "ծȯ��λ�ɱ�")) return false;
		if (!CheckEp(formObj.Bond31_edBuyDate, "ծȯ���򽻸�����")) return false;
		if (!CheckEp(formObj.Bond31_edSellDate, "ծȯ���ڶҸ�����")) return false;
		var BuyDate = new Date();
		BuyDate.setTime(StrToDate(formObj.Bond31_edBuyDate.value));
		var SellDate = new Date();
		SellDate.setTime(StrToDate(formObj.Bond31_edSellDate.value));
		if (BuyDate >= SellDate) {
			DispMessage(formObj.Bond31_edSellDate, "ծȯ���ڶҸ���Ӧ�����ڹ��򽻸���");
			return false;
		}
		if (!CheckElem(formObj.Bond31_edUnitPrice, "ծȯ��λ��ֵ")) return false;
		if (!CheckElem1(formObj.Bond31_edRate, "ծȯƱ��������")) return false;
		if (!CheckElem2(formObj.Bond31_edFreq, "��Ϣ֧��Ƶ��")) return false;
		//���������Ϣ���ڵĹ̶����ʸ�Ϣծȯ�͸�������ծȯ
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
	/// ծȯ��λ�ɱ��������ɽ��۸��Ӧ����Ϣ��: ��  Ԫ��������С�������λ
	//var Cost=0;
	/// ծȯ���򽻸���: ��  �� /��/��
	//var BondBuyDate=new Date();
	/// ծȯ���ڶҸ���: ��  �� /��/�գ����ڹ��򽻸���
	//var BondEndDate=new Date(); 
	///ծȯ��λ��ֵ: ��  Ԫ �������� 
	//var EndCost=0;
	///  ծȯƱ��������: ��  (%)  ��������С�������λ
	//var BondRate=0;
	/// ծȯ��������: ��  �꣬������
	//var YearTimes=0;
	/// ծȯÿ�����Ϣ֧��Ƶ��: ��  �Σ�������
	//var Freq=0;
	/// ��ծȯ�ĵ���������Ϊ��%��������������λС��������ó���
	/// <return>����������</return>
	/// <param name="options">���� 0������
	///                            1������һ�λ�����Ϣծȯ
	///                            2��ʣ����ͨ������һ�����ڣ���һ�꣩�Ķ���֧��ծȯ
	///                            3��ʣ����ͨ������һ�����ϵĵ���һ�λ�����Ϣծȯ 
	///	                           4���������Ϣ���ڵĹ̶����ʸ�Ϣծȯ�͸�������ծȯ
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

//�����������ڵ�������
function GetDayLen(Date1,Date2)
{
	var StartDate=new Date(Date1);
	var StandDate=new Date(Date2);
    
    // ʵ���������㷨
    //return (StartDate-StandDate)/(24*60*60*1000);
	
	// ��ÿ��30����һ�£�һ��Ϊ360��
    var DiffDay=(StartDate.getFullYear()-StandDate.getFullYear())*360+(StartDate.getMonth()-StandDate.getMonth())*30+(StartDate.getDate()-StandDate.getDate());
	
	return DiffDay;
}
function GetDayLen1(Date1, Date2)//add by aiai 6/18/04
{
	var StartDate=new Date(Date1);
	var StandDate=new Date(Date2);
    
    // ʵ���������㷨
    return (StartDate-StandDate)/(24*60*60*1000);
}




//�Ϲ�������
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
	/// ծȯ��Ԫ������������Ĭ��ֵ��
	var Cost=0;
	///  Ʊ�����ʣ� %��������������λС����ծȯ����Ϊ���֣�����ʾ����Ĭ��ֵ��
	var Rate=0;
	///	�Ϲ��۸�Ԫ������������Ĭ��ֵ��
	var BuyPrice=0;
	///	ծȯ���ޣ��꣨��������
	var Years=0;
	///	�Ϲ����ڣ���/��/��
	var BuyDate= new Date();
	/// ծȯÿ�����Ϣ֧��Ƶ��: ��  �Σ�������
	var Freq=0;
	/// options  1������ծȯ
	///		    2������һ�λ�����Ϣծȯ 
	///         3���̶����ʸ�Ϣծȯ�͸�������ծȯ
	var w,m;
	var pv,x,s,e,isetp,ret=0;
	var CurrDate=new Date();
	
	if (!CheckElem(formObj.edCost, "ծȯ���"))  return false;
	if (!CheckElem(formObj.edPrice, "�Ϲ��۸�")) return false;
	if (!CheckElem2(formObj.edYear, "ծȯ����")) return false;
	//����ծȯ
	if (GetObj("rgType_0").checked) {
		options=0;
		Cost=parseFloat(formObj.edCost.value);
		BuyPrice=parseFloat(formObj.edPrice.value);
		Years=parseInt(formObj.edYear.value);
	}
	//����һ�λ�����Ϣծȯ
	if (GetObj("rgType_1").checked) {
		if (!CheckElem1(formObj.edRate, "Ʊ������")) return false;
		options=1;
		Cost=parseFloat(formObj.edCost.value);
		BuyPrice=parseFloat(formObj.edPrice.value);
		Years=parseInt(formObj.edYear.value);
		Rate=parseFloat(formObj.edRate.value)/100;
	}
	//�̶����ʺ͸�������
	if (GetObj("rgType_2").checked) {
		if (!CheckElem1(formObj.edRate, "Ʊ������")) return false;
		if (!CheckEp(formObj.edDate, "�Ϲ�����")) return false;
		if (!CheckElem2(formObj.edFreq, "��Ϣ֧��Ƶ��", false)) return false;
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


//�����Ƚ�
/**
lblYearTime  �긶Ϣ����
lblRetTerm   ��������
lblRate   Ʊ��������
lblLimitDate  ���ڶһ�����
lblPrice  �ɱ��۸�
lblBuyDate ծȯ��������
lblSellDate  ��������
lblWillBuyDate  Ԥ�ƹ���
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
//����
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
//����
function mmcalc(formObj){
  if (!CheckElem(formObj.tbCost, "ծȯƱ����ֵ")) return false;
  var result;
  var msg="��Ϊ0��������ծȯ��1�۸���2Ԫ����������Ͷ�ʻر������ڵ�ǰ�������ʡ�";
  if (GetObj("rblID_0").checked) {
	  if (!CheckElem(formObj.dpLimitDate, "���ڶһ�����")) return false;
	  if (!CheckElem(formObj.dpWillBuyDate, "Ԥ�ƹ���")) return false;
	  var HaveMonth=Cal_MonthDiff(StrToDate1(formObj.dpWillBuyDate.value),StrToDate1(formObj.dpLimitDate.value));
	  Rate=GetRate(HaveMonth);
		switch(GetObj("ddlType").value){
		  case "1"://����ծȯ
		  result=CalcBuyTx(formObj.tbCost.value,formObj.dpLimitDate.value,formObj.dpWillBuyDate.value,Rate);
		  break;
		  case "2"://����һ���Ի�����Ϣ
		  if (!CheckElem(formObj.tbRetTerm, "��������")) return false;
		  if (!CheckElem(formObj.tbRate, "Ʊ��������")) return false;
		  var RetTerm = parseInt(formObj.tbRetTerm.value);
		  result=CalcBuyDq(formObj.tbCost.value,parseFloat(formObj.tbRate.value)/100,formObj.dpLimitDate.value,formObj.dpWillBuyDate.value,Rate, RetTerm);
		  break;
		  case "3"://�̶�����ծȯ�͸�������ծȯ	
		  if (!CheckElem(formObj.tbYearTime, "�긶Ϣ����")) return false;
		  if (!CheckElem(formObj.tbRate, "Ʊ��������")) return false;
		  result=CalcBuyGd(formObj.tbCost.value,parseFloat(formObj.tbRate.value)/100,formObj.tbYearTime.value,formObj.dpLimitDate.value,formObj.dpWillBuyDate.value,Rate);
		  break;
		}
		GetObj("lblInfo").innerHTML=msg.replace("0","��").replace("1","������").replace("2",Format(result).toString());
	  }
  if (GetObj("rblID_1").checked) {
	  if (!CheckElem(formObj.tbPrice, "�ɱ��۸�")) return false;
	  if (!CheckElem(formObj.dpBuyDate, "ծȯ��������")) return false;
	  if (!CheckElem(formObj.dpSellDate, "��������")) return false;
	  var HaveMonth=Cal_MonthDiff(StrToDate1(formObj.dpBuyDate.value),StrToDate1(formObj.dpSellDate.value));
	  Rate=GetRate(HaveMonth);
		switch(GetObj("ddlType").value){
		  case "1"://����ծȯ
		  result=CalcSaleTx(formObj.tbCost.value,formObj.dpLimitDate.value,formObj.tbPrice.value,formObj.dpBuyDate.value,formObj.dpSellDate.value,Rate);
		  break;
		  case "2"://����һ���Ի�����Ϣ
		  if (!CheckElem(formObj.tbRate, "Ʊ��������")) return false;
		  result=CalcSaleDq(formObj.tbCost.value,parseFloat(formObj.tbRate.value)/100,formObj.dpLimitDate.value,formObj.tbPrice.value,formObj.dpBuyDate.value,formObj.dpSellDate.value,Rate);
		  break;
		  case "3"://�̶�����ծȯ�͸�������ծȯ	
		  if (!CheckElem(formObj.tbYearTime, "�긶Ϣ����")) return false;
		  if (!CheckElem(formObj.tbRate, "Ʊ��������")) return false;
		  result=CalcSaleGd(formObj.tbCost.value,parseFloat(formObj.tbRate.value)/100,formObj.tbYearTime.value,formObj.dpLimitDate.value,formObj.tbPrice.value,formObj.dpBuyDate.value,formObj.dpSellDate.value,Rate);
		  break;
		}
		GetObj("lblInfo").innerHTML=msg.replace("0","��").replace("1","������").replace("2",Format(result).toString());
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
					var interestRate = 0.05;  //��Ϣ˰��
	var MaxBuyPrice;
	CurrCost = new Number(CurrCost);
	YearRate = new Number(YearRate);
	Rate = new Number(Rate);
	RetTerm = new Number(RetTerm);
	//2��	����һ�λ�����Ϣծȯ��
	//���������ծȯ�������ޣ���λΪ�¡���������ֻ����ѡ���˵���һ���Ի�����Ϣծȯ�Լ�������ʱ����ʾ��Ĭ��Ϊ12���¡�
	//�������۸�ծȯƱ����ֵ����1+ծȯ�������ޡ�12��ծȯƱ�������ʣ��£�1+���������ʡ�(1-��Ϣ˰��)����������
	MaxBuyPrice = CurrCost * (1 + RetTerm / 12 * YearRate) / Math.pow(1 + Rate * (1-interestRate), GetHaveYear(BuyYears, EndYears));
	return MaxBuyPrice;
}

function CalcBuyGd(CurrCost, YearRate, Freq, EndYears, BuyYears, Rate)
{
					var interestRate = 0.05;  //��Ϣ˰��
	var MaxBuyPrice, D, WillInterestTimes;
	CurrCost = new Number(CurrCost);
	YearRate = new Number(YearRate);
	Rate = new Number(Rate);
	Freq = new Number(Freq);
	//3��	�̶����ʸ�Ϣծȯ�͸�������ծȯ��
	//�������۸�ծȯƱ����ֵ�£�1+���������ʡ�(1-��Ϣ˰��)����������+��ծȯƱ����ֵ��ծȯƱ�������ʡ��긶Ϣ������
	//  ��[1����1+���������ʡ�(1-��Ϣ˰��)���긶Ϣ������������ȡ��Ϣ����]�£����������ʡ�(1-��Ϣ˰��)���긶Ϣ������
	//���У�����ȡ��Ϣ��������ծȯ���ڶһ����ڣ�Ԥ���������ڣ�/��365���긶Ϣ������������С������1λ��������ȡ����
	D = GetHaveYear(BuyYears, EndYears) * Freq;
	WillInterestTimes = Math.ceil(D);
	MaxBuyPrice = CurrCost / Math.pow(1 + Rate * (1-interestRate), GetHaveYear(BuyYears, EndYears)) + (CurrCost * YearRate / Freq)
			* (1 - Math.pow(1 + Rate * (1-interestRate) / Freq, - WillInterestTimes)) / (Rate * (1-interestRate) / Freq);
	return MaxBuyPrice;
}

function CalcBuyTx(CurrCost, EndYears, BuyYears, Rate)
{
					var interestRate = 0.05; //��Ϣ˰��
	var MaxBuyPrice;
	CurrCost = new Number(CurrCost);
	Rate = new Number(Rate);
	//1��	����ծȯ��
	//�������۸�ծȯƱ����ֵ�£�1+���������ʡ��������ޡ���1-��Ϣ˰�ʣ���
	MaxBuyPrice = CurrCost / (1 + Rate * GetHaveYear(BuyYears, EndYears) * (1-interestRate));
	return MaxBuyPrice;
}

function CalcSaleDq(CurrCost, YearRate, EndYears, Cost, BuyYears, SaleYears, Rate)
{
					var interestRate = 0.05; //��Ϣ˰��
	var MinSalePrice;
	CurrCost = new Number(CurrCost);
	YearRate = new Number(YearRate);
	Cost = new Number(Cost);
	Rate = new Number(Rate);
	//2��	����һ�λ�����Ϣծȯ��
	//��������۸�ծȯ�ɱ��۸����1+���������ʡ�(1-��Ϣ˰��)����������
	MinSalePrice = Cost * Math.pow(1 + Rate * (1-interestRate), GetHaveYear(BuyYears, SaleYears));
	return MinSalePrice;
}

function CalcSaleGd(CurrCost, YearRate, Freq, EndYears, Cost, BuyYears, SaleYears, Rate)
{
					var interestRate = 0.05; //��Ϣ˰��
	var MinSalePrice, D, AlreadyInterestedTimes;
	CurrCost = new Number(CurrCost);
	YearRate = new Number(YearRate);
	Cost = new Number(Cost);
	Rate = new Number(Rate);
	Freq = new Number(Freq);
	//3��	�̶����ʸ�Ϣծȯ�͸�������ծȯ��
	//��������۸�ծȯ�ɱ��۸����1+���������ʡ�(1-��Ϣ˰��)���������ޣ�
	//  ��ծȯƱ����ֵ��ծȯƱ�������ʡ��긶Ϣ��������[��1+���������ʡ���1-��Ϣ˰�ʣ����긶Ϣ����������ȡ��Ϣ������1]
	//  �£����������ʡ���1-��Ϣ˰�ʣ����긶Ϣ������
	//����ȡ��Ϣ��������Ԥ���������ڣ�ծȯ�������ڣ�/��365���긶Ϣ������������С����ȡ�������֣�
	D = GetHaveYear(BuyYears, SaleYears) * Freq;
	AlreadyInterestedTimes = Math.floor(D);
	MinSalePrice = Cost * Math.pow(1 + Rate * (1-interestRate), GetHaveYear(BuyYears, SaleYears))
		- (CurrCost * YearRate / Freq) * (Math.pow(1 + Rate * (1-interestRate) / Freq, AlreadyInterestedTimes) - 1)
		/ (Rate * (1-interestRate) / Freq);
	return MinSalePrice;
}

function CalcSaleTx(Currcost, EndYears, Cost, BuyYears, SaleYears, Rate)
{
					var interestRate = 0.05; //��Ϣ˰��
	var MinSalePrice;
	Currcost = new Number(Currcost);
	Cost = new Number(Cost);
	Rate = new Number(Rate);
	//1��	����ծȯ��
	//��������۸�ծȯ�ɱ��۸�����������ʡ��������ޡ���1-��Ϣ˰�ʣ�+ծȯ�ɱ��۸�
	MinSalePrice = Cost * Rate * GetHaveYear(BuyYears, SaleYears) * (1-interestRate) + Cost;
	return MinSalePrice;
}
