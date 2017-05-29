/* ծȯ���������÷�����
   @20091201 by fangliming 
*/
var bondCache={};

/*ծȯ���м����л�
 */
function ChgItem(x){
	document.getElementById("c0").style.display = (x=="c0") ? "block" : "none";	
	document.getElementById("c1").style.display = (x=="c1") ? "block" : "none";	
	document.getElementById("c2").style.display = (x=="c2") ? "block" : "none";
}

/*��ծ���������
 */
function calWinPdet(){
	var cal_time = document.getElementById("cal_time");
	var cal_amount = document.getElementById("cal_amount");
	var cal_rate = document.getElementById("cal_rate");

	if(cal_time==null){
		return false;
	}else if(cal_time.value==0){
		alert("��ѡ�����!");
		return false;
	}
	if(cal_amount==null){
		return false;
	}else if (cal_amount.value==""){
		alert("�������ծ���!");
		return false;
	}
	if(cal_rate == null){
		return false;
	}else if (cal_rate.value==""){
		alert("�������ծ����!");
		return false;
	}
	if(isNaN(cal_amount.value)){
		alert("����������(��ծ���)!");
		return false;
	}
	if(isNaN(cal_rate.value)){
		alert("����������(��ծ����)!");
		return false;
	}
	if(cal_amount.value<=0){
		alert("��������ȷ�Ĺ�ծ���!");
		return false;
	}
	if(cal_rate.value<=0){
		alert("��������ȷ�Ĺ�ծ����!");
		return false;
	}
	var cal_interest = cal_time.value*cal_amount.value *cal_rate.value/100;
	var cal_result = cal_amount.value*1 + cal_interest;
	cal_interest=Math.round(cal_interest*100)/100+"";
	cal_result=Math.round(cal_result*100)/100+"";

	if(document.getElementById("cal_interest")){
		document.getElementById("cal_interest").value = cal_interest;
	}
	if(document.getElementById("cal_result")){
		document.getElementById("cal_result").value=cal_result;
	}	
};

/*��ծ�������㷽��
 */
function calBuyPdet(){
	var cal_price = document.getElementById("cal_price");
	var cal_amount = document.getElementById("cal_amount");
	
	if(cal_price==null){
		return false;
	}else if (cal_price.value=="" || isNaN(cal_price.value) || (parseFloat(cal_price.value)<=0)){
		alert("����ȷ�����ծ�ļ۸�!");
		return false;
	}
	if(cal_amount==null){
		return false;
	}else if (cal_amount.value=="" || isNaN(cal_amount.value) || (parseInt(cal_amount.value)<=0)){
		alert("����ȷ�����ծ����!");
		return false;
	}
	var cal_result=parseFloat(cal_price.value)*parseInt(cal_amount.value);
	cal_result=Math.round(cal_result*100)/100;
	if(document.getElementById("cal_result")){
		document.getElementById("cal_result").value = cal_result;
	}
} 


/*ծȯ����������
*/

bondCache.finger=[["cal_deadline","cal_cost","cal_buyday","cal_presellday","cal_prebuyday"],[true,,,,true],[false,true,true,true,false]];
bondCache.type=[["cal_price","cal_freq","cal_month","cal_rate"],[[true,,,],[true,,true,true],[true,true,,true]],[[true,,,],[true,,,true],[true,true,,true]]]

//��ʼ��ѡ��[ѡ�������ʱ����]
function initMmbjBond(){
	var cal_finger = (document.getElementById('cal_figure_0').checked) ? 1 : 2;
	var cal_type = document.getElementById('cal_type').value;
	var lenght = bondCache.finger[0].length;
	for(var i =0;i<lenght;i++){
		var obj = document.getElementById(bondCache.finger[0][i]);
		var parentobj = document.getElementById(bondCache.finger[0][i]).parentNode
		if(bondCache.finger[cal_finger][i]){
			obj.disabled = "";
			parentobj.className = parentobj.className.replace("disable","");	
		}else{
			obj.disabled = "disabled";
			parentobj.className = parentobj.className.replace("disable","") + " disable";
		}
	}
	lenght = bondCache.type[0].length;
	for(var i =0;i<lenght;i++){
		var obj = document.getElementById(bondCache.type[0][i]);
		var parentobj = document.getElementById(bondCache.type[0][i]).parentNode;
		if(bondCache.type[cal_finger][cal_type][i]){
			obj.disabled = false;
			parentobj.className = parentobj.className.replace("disable","");	
		}else{
			obj.disabled = true;
			parentobj.className = parentobj.className.replace("disable","") + " disable";
		}
	}
	var cal_today = new Date();
	cal_today = cal_today.getFullYear() + "-" + (cal_today.getMonth()+1)+ "-" + cal_today.getDate();
	document.getElementById("cal_deadline").value = cal_today;
	document.getElementById("cal_buyday").value = cal_today;
	document.getElementById("cal_presellday").value = cal_today;
	document.getElementById("cal_prebuyday").value = cal_today;
	document.getElementById('cal_result').innerHTML = "";
}
function calMmbjBond(){
	var cal_finger = (document.getElementById('cal_figure_0').checked) ? 1 : 2;
	var cal_type = document.getElementById('cal_type').value;
	
	var cal_price = document.getElementById('cal_price').value;
	var cal_freq = document.getElementById('cal_freq').value;
	var cal_month = document.getElementById('cal_month').value;
	var cal_rate = document.getElementById('cal_rate').value;
	var cal_deadline = document.getElementById('cal_deadline').value;
	var cal_cost = document.getElementById('cal_cost').value;
	var cal_buyday = document.getElementById('cal_buyday').value;
	var cal_presellday = document.getElementById('cal_presellday').value;
	var cal_prebuyday = document.getElementById('cal_prebuyday').value;
	
	var msg="��Ϊ0��������ծȯ��1�۸���2Ԫ����������Ͷ�ʻر������ڵ�ǰ�������ʡ�";
	var result,Rate;
	if (cal_finger == 1){ //��
		var HaveMonth=Cal_MonthDiff(Cal_strtodate(cal_prebuyday),Cal_strtodate(cal_deadline));
		Rate=GetRate(HaveMonth);
		switch(parseInt(cal_type))
		{
			//����ծȯ
			case 0:
				if (cal_price=="" || isNaN(cal_price) || cal_price<=0){
					alert("��������ȷ��ծȯƱ����ֵ!");return false;
				}
				if (cal_deadline==""){
					alert("������ծȯ���ڶһ�����!");return false;
				}
				if (cal_prebuyday==""){
					alert("������Ԥ�ƹ�������!");return false;
				}
				if(Cal_DateDiff(Cal_strtodate(cal_prebuyday),Cal_strtodate(cal_deadline))<0){
					alert("Ԥ�ƹ������ڲ�������ծȯ���ڶһ����ڣ�");return false;
				}
				result=CalcBuyTx(cal_price,cal_deadline,cal_prebuyday,Rate);
				break;
				
			//����һ���Ի�����Ϣ	
			case 1:
				if (cal_price=="" || isNaN(cal_price) || cal_price<=0){
					alert("��������ȷ��ծȯƱ����ֵ!");	return false;
				}
				if (cal_month=="" || isNaN(cal_month) || cal_month<=0){
					alert("��������ȷ��ծȯ��������!"); return false;
				}
				if (cal_rate=="" || isNaN(cal_rate) || cal_rate<=0){
					alert("��������ȷ��ծȯƱ��������!"); return false;
				}
				if (cal_deadline==""){
					alert("������ծȯ���ڶһ�����!"); return false;
				}
				if (cal_prebuyday=="" ){
					alert("������Ԥ�ƹ�������!"); return false;	
				}
				if(Cal_DateDiff(Cal_strtodate(cal_prebuyday),Cal_strtodate(cal_deadline))<0){
					alert("Ԥ�ƹ������ڲ�������ծȯ���ڶһ����ڣ�");return false;
				}
				var RetTerm = parseInt(cal_month);
				result=CalcBuyDq(cal_price,parseFloat(cal_rate)/100,cal_deadline,cal_prebuyday,Rate, RetTerm);
				break;
				
			//�̶�����ծȯ�͸�������ծȯ	
			case 2:
				if (cal_price=="" || isNaN(cal_price) || cal_price<=0){
					alert("��������ȷ��ծȯƱ����ֵ!");	return false;
				}
				if (cal_rate=="" || isNaN(cal_rate) || cal_rate<=0){
					alert("��������ȷ��ծȯƱ��������!"); return false;
				}
				if (cal_freq=="" || isNaN(cal_freq) || cal_freq<=0){
					alert("��������ȷ���긶Ϣ����!"); return false;
				}
				if (cal_deadline==""){
					alert("������ծȯ���ڶһ�����!"); return false;
				}
				if (cal_prebuyday==""){
					alert("������Ԥ�ƹ�������!"); return false;	
				}
				if(Cal_DateDiff(Cal_strtodate(cal_prebuyday),Cal_strtodate(cal_deadline))<0){
					alert("Ԥ�ƹ������ڲ�������ծȯ���ڶһ����ڣ�");return false;
				}
				result=CalcBuyGd(cal_price,parseFloat(cal_rate)/100,cal_freq,cal_deadline,cal_prebuyday,Rate);
				break;
		}
		document.getElementById('cal_result').innerHTML=msg.replace("0","��").replace("1","������").replace("2",NBround(result,2).toString());
	}else{//����
		var HaveMonth=Cal_MonthDiff(Cal_strtodate(cal_buyday),Cal_strtodate(cal_presellday));
		Rate=GetRate(HaveMonth);
		switch(parseInt(cal_type))
		{
			//����ծȯ
			case 0:
				if (cal_price=="" || isNaN(cal_price) || cal_price<=0){
					alert("��������ȷ��ծȯƱ����ֵ!");return false;
				}
				if (cal_cost=="" || isNaN(cal_cost) || cal_cost<=0){
					alert("��������ȷ��ծȯ�ɱ��۸�!");return false;
				}
				if (cal_buyday==""){
					alert("������ծȯ��������!");return false;
				}
				if (cal_presellday==""){
					alert("������Ԥ����������!");return false;
				}
				if(Cal_DateDiff(Cal_strtodate(cal_buyday),Cal_strtodate(cal_presellday))<0){
					alert("Ԥ���������ڲ�������ծȯ�������ڣ�");return false;
				}
				result=CalcSaleTx(cal_price,cal_deadline,cal_cost,cal_buyday,cal_presellday,Rate);
				break;
			//����һ���Ի�����Ϣ		
			case 1:
				if (cal_price=="" || isNaN(cal_price) || cal_price<=0){
					alert("��������ȷ��ծȯƱ����ֵ!");return false;
				}
				if (cal_rate=="" || isNaN(cal_rate) || cal_rate<=0){
					alert("��������ȷ��ծȯƱ��������!"); return false;
				}
				if (cal_cost=="" || isNaN(cal_cost) || cal_cost<=0){
					alert("��������ȷ��ծȯ�ɱ��۸�!");return false;
				}
				if (cal_buyday==""){
					alert("������ծȯ��������!");return false;
				}
				if (cal_presellday==""){
					alert("������Ԥ����������!");return false;
				}
				if(Cal_DateDiff(Cal_strtodate(cal_buyday),Cal_strtodate(cal_presellday))<0){
					alert("Ԥ���������ڲ�������ծȯ�������ڣ�");return false;
				}
				result=CalcSaleDq(cal_price,parseFloat(cal_rate)/100,cal_deadline,cal_cost,cal_buyday,cal_presellday,Rate);
				break;
			//�̶�����ծȯ�͸�������ծȯ	
			case 2:
				if (cal_price=="" || isNaN(cal_price) || cal_price<=0){
					alert("��������ȷ��ծȯƱ����ֵ!");return false;
				}
				if (cal_rate=="" || isNaN(cal_rate) || cal_rate<=0){
					alert("��������ȷ��ծȯƱ��������!"); return false;
				}
				if (cal_freq=="" || isNaN(cal_freq) || cal_freq<=0){
					alert("��������ȷ���긶Ϣ����!"); return false;
				}
				if (cal_cost=="" || isNaN(cal_cost) || cal_cost<=0){
					alert("��������ȷ��ծȯ�ɱ��۸�!");return false;
				}
				if (cal_buyday==""){
					alert("������ծȯ��������!");return false;
				}
				if (cal_presellday==""){
					alert("������Ԥ����������!");return false;
				}
				if(Cal_DateDiff(Cal_strtodate(cal_buyday),Cal_strtodate(cal_presellday))<0){
					alert("Ԥ���������ڲ�������ծȯ�������ڣ�");return false;
				}
				result=CalcSaleGd(cal_price,parseFloat(cal_rate)/100,cal_freq,cal_deadline,cal_cost,cal_buyday,cal_presellday,Rate);
				break;					
		}
		document.getElementById('cal_result').innerHTML=msg.replace("0","��").replace("1","������").replace("2",NBround(result,2).toString());
	}
}
// �ַ���ת��Ϊ���� 
function Cal_strtodate(str)
{
  var date = Date.parse(str);
  if (isNaN(date)) {
    date = Date.parse(str.replace(/-/g,"/")); // ʶ�����ڸ�ʽ��YYYY-MM-DD 
    if (isNaN(date)) date = 0;
  }
  return(date);
}

//�������ڼ���������
function Cal_DateDiff(Date1, Date2)
{
	return (Date2-Date1)/(24*60*60*1000);
}

var maxpn=99999999;
var maxfn=99999999.9;
var numerrormsg0="������0-99999999֮�ڵ�����";
var numerrormsg1="������1-99999999֮�ڵ�����";
var overerrormsg="��ֵ�������ֵ99999999";

function DispMessage(CheckCtl,Msg)
{
	if (Msg!="")
	{					
		alert(Msg);					
		CheckCtl.select();
		CheckCtl.focus();
	}
}

//�������ڼ���������(������С��һ����)
function Cal_MonthDiff(DateA, DateB)
{
	Date1=new Date();
	Date2=new Date();
	Date1.setTime(DateA);
	Date2.setTime(DateB);
	months = (Date2.getFullYear() - Date1.getFullYear()) * 12;
	addmonths = Date2.getMonth() - Date1.getMonth();
	months = months + addmonths;
	if(Date2.getDate() < Date1.getDate())
		months--;
	return months;
}

function Cal_datevalid(edit,min,max)
{
  // ���edit�Ƿ�Ϊ���ڵ���min��С�ڵ���max����Ч���ڸ�ʽ�ַ����� 
  var date = Cal_strtodate(edit);
  if (date == 0) return false;
  if (max) {
    var max = Cal_strtodate(max);
    if ((max!=0)&&(date>max)) return false;
  }
  if (min) {
    var min = Cal_strtodate(min);
    if ((min!=0)&&(date<min)) return false;
  }
  date = new Date(date);
  //edit.value = date.getFullYear() + "-" + (date.getMonth()+1) +
  //			 "-" + date.getDate();
  return true;
}



function GetHaveYear(s, e)
{
	var dt_s = Date.parse(s.replace(/-/g, "/"));
	var dt_e = Date.parse(e.replace(/-/g, "/"));
	return (dt_e - dt_s) / (1000 * 60 * 60 * 24) / 365;
}

function CalcBuyDq(CurrCost, YearRate, EndYears, BuyYears, Rate, RetTerm)
{
	var MaxBuyPrice;
	CurrCost = new Number(CurrCost);
	YearRate = new Number(YearRate);
	Rate = new Number(Rate);
	RetTerm = new Number(RetTerm);
	//2��	����һ�λ�����Ϣծȯ��
	//���������ծȯ�������ޣ���λΪ�¡���������ֻ����ѡ���˵���һ���Ի�����Ϣծȯ�Լ�������ʱ����ʾ��Ĭ��Ϊ12���¡�
	//�������۸�ծȯƱ����ֵ����1+ծȯ�������ޡ�12��ծȯƱ�������ʣ��£�1+���������ʡ�0.8����������
	MaxBuyPrice = CurrCost * (1 + RetTerm / 12 * YearRate) / Math.pow(1 + Rate * 0.8, GetHaveYear(BuyYears, EndYears));
	return MaxBuyPrice;
}

function CalcBuyGd(CurrCost, YearRate, Freq, EndYears, BuyYears, Rate)
{
	var MaxBuyPrice, D, WillInterestTimes;
	CurrCost = new Number(CurrCost);
	YearRate = new Number(YearRate);
	Rate = new Number(Rate);
	Freq = new Number(Freq);
	//3��	�̶����ʸ�Ϣծȯ�͸�������ծȯ��
	//�������۸�ծȯƱ����ֵ�£�1+���������ʡ�0.8����������+��ծȯƱ����ֵ��ծȯƱ�������ʡ��긶Ϣ������
	//  ��[1����1+���������ʡ�0.8���긶Ϣ������������ȡ��Ϣ����]�£����������ʡ�0.8���긶Ϣ������
	//���У�����ȡ��Ϣ��������ծȯ���ڶһ����ڣ�Ԥ���������ڣ�/��365���긶Ϣ������������С������1λ��������ȡ����
	D = GetHaveYear(BuyYears, EndYears) * Freq;
	WillInterestTimes = Math.ceil(D);
	MaxBuyPrice = CurrCost / Math.pow(1 + Rate * 0.8, GetHaveYear(BuyYears, EndYears)) + (CurrCost * YearRate / Freq)
			* (1 - Math.pow(1 + Rate * 0.8 / Freq, - WillInterestTimes)) / (Rate * 0.8 / Freq);
	return MaxBuyPrice;
}

function CalcBuyTx(CurrCost, EndYears, BuyYears, Rate)
{
	var MaxBuyPrice;
	CurrCost = new Number(CurrCost);
	Rate = new Number(Rate);
	//1��	����ծȯ��
	//�������۸�ծȯƱ����ֵ�£�1+���������ʡ��������ޡ�0.8��
	MaxBuyPrice = CurrCost / (1 + Rate * GetHaveYear(BuyYears, EndYears) * 0.8);
	return MaxBuyPrice;
}

function CalcSaleDq(CurrCost, YearRate, EndYears, Cost, BuyYears, SaleYears, Rate)
{
	var MinSalePrice;
	CurrCost = new Number(CurrCost);
	YearRate = new Number(YearRate);
	Cost = new Number(Cost);
	Rate = new Number(Rate);
	//2��	����һ�λ�����Ϣծȯ��
	//��������۸�ծȯ�ɱ��۸����1+���������ʡ�0.8����������
	MinSalePrice = Cost * Math.pow(1 + Rate * 0.8, GetHaveYear(BuyYears, SaleYears));
	return MinSalePrice;
}

function CalcSaleGd(CurrCost, YearRate, Freq, EndYears, Cost, BuyYears, SaleYears, Rate)
{
	var MinSalePrice, D, AlreadyInterestedTimes;
	CurrCost = new Number(CurrCost);
	YearRate = new Number(YearRate);
	Cost = new Number(Cost);
	Rate = new Number(Rate);
	Freq = new Number(Freq);
	//3��	�̶����ʸ�Ϣծȯ�͸�������ծȯ��
	//��������۸�ծȯ�ɱ��۸����1+���������ʡ�0.8���������ޣ�
	//  ��ծȯƱ����ֵ��ծȯƱ�������ʡ��긶Ϣ��������[��1+���������ʡ�0.8���긶Ϣ����������ȡ��Ϣ������1]
	//  �£����������ʡ�0.8���긶Ϣ������
	//����ȡ��Ϣ��������Ԥ���������ڣ�ծȯ�������ڣ�/��365���긶Ϣ������������С����ȡ�������֣�
	D = GetHaveYear(BuyYears, SaleYears) * Freq;
	AlreadyInterestedTimes = Math.floor(D);
	MinSalePrice = Cost * Math.pow(1 + Rate * 0.8, GetHaveYear(BuyYears, SaleYears))
		- (CurrCost * YearRate / Freq) * (Math.pow(1 + Rate * 0.8 / Freq, AlreadyInterestedTimes) - 1)
		/ (Rate * 0.8 / Freq);
	return MinSalePrice;
}

function CalcSaleTx(Currcost, EndYears, Cost, BuyYears, SaleYears, Rate)
{
	var MinSalePrice;
	Currcost = new Number(Currcost);
	Cost = new Number(Cost);
	Rate = new Number(Rate);
	//1��	����ծȯ��
	//��������۸�ծȯ�ɱ��۸�����������ʡ��������ޡ�0.8+ծȯ�ɱ��۸�
	MinSalePrice = Cost * Rate * GetHaveYear(BuyYears, SaleYears) * 0.8 + Cost;
	return MinSalePrice;
}


function GetRate(month)
{
	if (month == 0) month = 0.1;
	if (month > 60) month = 60;	// ������ȡ�������
	return GetRMBSaveRatio("2", month) / 100; 
}

//�����---(��ʽ������) return ����
function GetRMBSaveRatio(typeID, period, xmlDoc)  
{			
	if(typeID == "" || period == "")
	{
		alert("ȱ�ٴ�ʽ�ʹ���");
		return;
	}	
	var result=3.6; //2008-12-25 ����,������ȡ
	return result;
}

function Trim(strSource) 
{
	return 	strSource.replace(/^\s*/,'').replace(/\s*$/,'');
}

//�������뺯����Ϊ�˼��IE5����������ת�����֣�С�����λ������NUMBER
function NBround(nb,len)
{
  var strnb=new String(nb);
  if (nb < 0.0000001) return new Number(0); // С��0.1E-7�İ�0����
  pos = strnb.indexOf(".");
  if ((pos == -1) || (strnb.length-pos-1)<len)
    return new Number(strnb);
  else 
  {
    var last = strnb.substring(pos+len+1,pos+len+2);
    var nblast = new Number(last);
    if (nblast<5)
      return new Number(strnb.substring(0,pos+len+1));
    else
       {
           if (strnb.substring(0,1)=="-")
              return new Number(new String(new Number(strnb.substring(0,pos+len+1))-Math.pow(10,-1*len)).substring(0,pos+len+1));
          else
          return new Number(new String(new Number(strnb.substring(0,pos+len+1))+Math.pow(10,-1*len)).substring(0,pos+len+1));
      //return new Number(strnb.substring(0,pos+len+1))+Math.pow(10,-1*len);
       }
  }
}

/*ծȯ�����ڼ�����
*/

//��ʼ��ѡ��[ѡ�������ʱ����]
function initCyWinBond(){
	var cal_type = document.getElementById('cal_type').value;
	var cal_paymethod = document.getElementById('cal_paymethod').value;
	var cal_today = new Date();
	cal_today = cal_today.getFullYear() + "-" + (cal_today.getMonth()+1)+ "-" + cal_today.getDate();
	document.getElementById("cal_payday").value  = cal_today;
	document.getElementById("cal_buyday").value  = cal_today;
	document.getElementById("cal_sellday").value = cal_today;
	document.getElementById('cal_result').innerHTML = "����ó�";
	var obj = parentobj = null;
	if (cal_type==1){
		///����ģʽ�£�ֻ��һ�λ�����Ϣ
		cal_paymethod = 2; 
		document.getElementById('cal_paymethod').options[1].selected = true;
		
		obj = document.getElementById('cal_price');
		obj.disabled = true;
		obj.value = "����";
		obj.parentNode.className = obj.parentNode.className.replace("disable","") + " disable";
		obj = document.getElementById('cal_rate');
		obj.disabled = true;
		obj.value = "����";
		obj.parentNode.className = obj.parentNode.className.replace("disable","") + " disable";
	}else{
		obj = document.getElementById('cal_price');
		obj.disabled = false;
		obj.value = "";
		obj.parentNode.className = obj.parentNode.className.replace("disable","") + "";
		obj = document.getElementById('cal_rate');
		obj.disabled = false;
		obj.value = "";
		obj.parentNode.className = obj.parentNode.className.replace("disable","") + "";
	}
	if (cal_paymethod==2){
		obj = document.getElementById('cal_payday');
		obj.disabled = true;
		obj.value = cal_today;
		obj.parentNode.className = obj.parentNode.className.replace("disable","") + " disable";
		obj = document.getElementById('cal_freq');
		obj.disabled = true;
		obj.value = "����";
		obj.parentNode.className = obj.parentNode.className.replace("disable","") + " disable";
	}else{
		obj = document.getElementById('cal_payday');
		obj.disabled = false;
		obj.value = cal_today;
		obj.parentNode.className = obj.parentNode.className.replace("disable","") + "";
		obj = document.getElementById('cal_freq');
		obj.disabled = false;
		obj.value = "";
		obj.parentNode.className = obj.parentNode.className.replace("disable","") + "";
	}
}

function calCyWinBond(){
	var cal_type = document.getElementById('cal_type').value;
	var cal_paymethod = document.getElementById('cal_paymethod').value;
	var cal_price = document.getElementById('cal_price').value;
	var cal_rate = document.getElementById('cal_rate').value;
	var cal_payday = document.getElementById('cal_payday').value;
	var cal_buyday = document.getElementById('cal_buyday').value;
	var cal_buyprice = document.getElementById('cal_buyprice').value;
	var cal_sellday = document.getElementById('cal_sellday').value;
	var cal_sellprice = document.getElementById('cal_sellprice').value;
	var cal_freq = document.getElementById('cal_freq').value;
	if (cal_type=="1"){cal_paymethod=2};
	if ((cal_type=="2") && (cal_price=="" || isNaN(cal_price) || cal_price<=0)){
		alert("��������ȷ��ծȯƱ����ֵ!");return false;
	}
	if ((cal_type=="2") && (cal_rate=="" || isNaN(cal_rate) || cal_rate<=0)){
		alert("��������ȷ�ĸ�Ϣծȯ����!");return false;
	}
	if ((cal_paymethod=="1") && (cal_payday=="" || !Cal_datevalid(cal_payday))){
		alert("��������ȷ��ծȯ������!");return false;
	}
	if (cal_buyday=="" || !Cal_datevalid(cal_buyday)){
		alert("��������ȷ��ծȯ��������!");return false;
	}
	if (cal_buyprice=="" || isNaN(cal_buyprice) || cal_buyprice<=0){
		alert("��������ȷ��ծȯ����۸�!");return false;
	}
	if (cal_sellprice=="" || isNaN(cal_sellprice) || cal_sellprice<=0){
		alert("��������ȷ��ծȯ�����۸�!");return false;
	}
	if (cal_sellday=="" || !Cal_datevalid(cal_sellday)){
		alert("��������ȷ��ծȯ��������!");return false;
	}
	if ((cal_paymethod=="1") && (cal_freq=="" ||  isNaN(cal_freq) || cal_freq<=0)){
		alert("��������ȷ����Ϣ֧��Ƶ��!");return false;
	}
	if ((cal_paymethod=="1") && (cal_freq>99)){
		alert("ծȯ����Ϣ֧��Ƶ�ʲ��ܴ���2λ��!");return false;
	}
	if(Cal_DateDiff(Cal_strtodate(cal_buyday),Cal_strtodate(cal_sellday))<=0){
		alert("ծȯ�������ڲ�������ծȯ�������ڣ�");return false;
	}
	//��ʼ����
	var FirstPayDate = limitdate = new Date();
	if((cal_type==2)&&(cal_paymethod==1))
	{
		//�����һ�θ�Ϣ��
		limitdate = new Date(Cal_strtodate(cal_payday))
		FirstPayDate = CalcPayDate(limitdate, cal_buyday, cal_freq);
	}
	var BondType = cal_type;
	var PayType =  cal_paymethod;
	
	var BuyYears = new Date();
	var SaleYears = new Date();
	var BuyPrice = parseFloat(cal_buyprice);
	var SalePrice = parseFloat(cal_sellprice);
	var FxRate = parseFloat(cal_rate)/100;
	var Cost = parseInt(cal_price);
	var Freq = cal_freq;
	
	BuyYears.setTime(Cal_strtodate(cal_buyday));
	SaleYears.setTime(Cal_strtodate(cal_sellday));
	
	var DiffYear= Cal_DateDiff(BuyYears,SaleYears)/365;//�������ޣ����������ڡ��������ڣ�/365
	var w,n,y;
	var isetp=0.0001;//�������
	var s=0.001;//�ƽ�����ֵ
	var e=1;//�ƽ�����ֵ
	var pv=0;//�����ʼ������õĹ���۸�
	var tDays;
	tDays=Cal_DateDiff(BuyYears,FirstPayDate);//ծȯ�����վ���һ�θ�Ϣ�յ�ʵ������
	if(BondType==2)	    // ��Ϣծȯ
	{
		if (PayType==1) // ���긶Ϣ
		{
			w=tDays*Freq/365;//ծȯ�����վ���һ�θ�Ϣ�յ�ʵ������ * �긶ϢƵ�� / 365			
			n=parseInt(Cal_DateDiff(FirstPayDate,SaleYears)	/365*Freq);//ʣ��ĸ�Ϣ����=1+[(������ - �״θ�Ϣ��)	/365 * �긶ϢƵ��]ȡ����������
			if(FirstPayDate<=SaleYears)//�����һ�θ�Ϣ�������������������Ϊ��Ϣ����+1
				n = n+1;
			if(n>0)//��������ڼ��и�Ϣ
			{
				y=(e-s)/2;//�����ʳ��ι���ֵ
				while ((Math.abs(pv-BuyPrice)>isetp)&&(Math.abs(e-s)>isetp))
				{
					pv=Calc(y,w,n,Cost*FxRate,Freq,SalePrice, DiffYear);
					if (pv==0) 
						break;
					if (pv<BuyPrice) 
					{
						e=y;
						y=(s+e)/2;
					}
					if (pv>BuyPrice)
					{
						s=y;
						y=(s+e)/2;
					}
				}
			}
			else//����ʱ�����޸�Ϣ
			{
				y=(((SalePrice - BuyPrice)/DiffYear)/BuyPrice);
			}
			rate=y;
		}
		else // һ�λ�����Ϣ
			rate=(((SalePrice - BuyPrice)/DiffYear)/BuyPrice);
	}
	else // ����ծȯ
	{
			//if ((BuyPrice==0)||(BuyPrice<0)) return -1;		
			rate=(((SalePrice - BuyPrice)/DiffYear)/BuyPrice);
	}
	rate = NBround(rate*100,2);
	document.getElementById('cal_result').value = rate;
}
function Calc(y, w, n, C, f, M, diffDay)
{
	var PV=0;
	for (var i=0;i<=n-1;i++)
	{
		PV=PV+(C/f)/Math.pow((1+y/f),i+w);
	}
	PV=PV+ M/Math.pow((1+y/f),diffDay);

	return PV;
}

/*����ծȯ�����ռ����״θ�Ϣ��
EndDate:ծȯ������
BuyDate:ծȯ������ 
PayFreq:�긶Ϣƽ�ʣ���/�꣩
˼·�����蹺����=��һ�θ�Ϣ�꣬�����긶ϢƵ�ʹ��㸶Ϣ�����еĸ�Ϣ�գ�
�Ƚϸ�Ϣ���빺���յ������ȡ��С����������ø�������Ϊ��һ�θ�Ϣ�ա�
*/
function CalcPayDate(limitdate, buydate, PayFreq)
{
	var BuyDate = new Date(Cal_strtodate(buydate));
	var EndDate = new Date(Cal_strtodate(limitdate));
	var PayDiffDays = Math.ceil(365/PayFreq);
	var tmpPayDate=new Array();
	var diff=new Array();
	var i;
	for(i=0; i<PayFreq; i++)
	{
		tmpPayDate[i] = new Date(BuyDate.getFullYear(), EndDate.getMonth(), EndDate.getDate()+new Number((i+1)*PayDiffDays+1));
		diff[i] = (tmpPayDate[i]-BuyDate)/(60*60*24*1000);
	}
	var tmpdiff=365;
	var nearDate=tmpPayDate[0];
	for(i=0; i<PayFreq; i++)
	{
		if(diff[i]<tmpdiff && diff[i]>0)
		{
			tmpdiff=diff[i];
			nearDate = tmpPayDate[i];
		}
	}
	return nearDate;
}


/* �Ϲ������ʼ�����
 */
function initRgWinBond(){
	var cal_type = (document.getElementById("cal_type_1").checked) ? 1 : 0;
		cal_type = (document.getElementById("cal_type_2").checked) ? 2 : cal_type;
	var cal_today = new Date();
		cal_today = cal_today.getFullYear() + "-" + (cal_today.getMonth()+1)+ "-" + cal_today.getDate();
	var obj = parentobj = null;
	if (cal_type==0){
		obj = document.getElementById('cal_rate');
		obj.disabled = true;
		obj.value = "����";
		obj.parentNode.className = obj.parentNode.className.replace("disable","") + " disable";
		obj = document.getElementById('cal_buyday');
		obj.disabled = true;
		obj.value = cal_today;
		obj.parentNode.className = obj.parentNode.className.replace("disable","") + " disable";
		obj = document.getElementById('cal_freq');
		obj.disabled = true;
		obj.value = "1";
		obj.parentNode.className = obj.parentNode.className.replace("disable","") + " disable";
	}else if(cal_type==1){
		obj = document.getElementById('cal_rate');
		obj.disabled = false;
		obj.value = "";
		obj.parentNode.className = obj.parentNode.className.replace("disable","");
		obj = document.getElementById('cal_buyday');
		obj.disabled = true;
		obj.value = cal_today;
		obj.parentNode.className = obj.parentNode.className.replace("disable","") + " disable";
		obj = document.getElementById('cal_freq');
		obj.disabled = true;
		obj.value = "1";
		obj.parentNode.className = obj.parentNode.className.replace("disable","") + " disable";
	}else{
		obj = document.getElementById('cal_rate');
		obj.disabled = false;
		obj.value = "";
		obj.parentNode.className = obj.parentNode.className.replace("disable","");
		obj = document.getElementById('cal_buyday');
		obj.disabled = false;
		obj.value = cal_today;
		obj.parentNode.className = obj.parentNode.className.replace("disable","");
		obj = document.getElementById('cal_freq');
		obj.disabled = false;
		obj.value = "1";
		obj.parentNode.className = obj.parentNode.className.replace("disable","");	
	}
	document.getElementById("cal_result").value = "����ó�";
}

function calRgWinBond(){
	var cal_type = (document.getElementById("cal_type_1").checked) ? 1 : 0;
		cal_type = (document.getElementById("cal_type_2").checked) ? 2 : cal_type;
	var cal_cost = document.getElementById("cal_cost").value;
	var cal_price = document.getElementById("cal_price").value;
	var cal_year = document.getElementById("cal_year").value;
	var cal_rate = document.getElementById("cal_rate").value;
	var cal_buyday = document.getElementById("cal_buyday").value;
	var cal_freq = document.getElementById("cal_freq").value;
	
	if (cal_cost=="" || isNaN(cal_cost) || cal_cost<=0){
		alert("��������ȷ��ծȯƱ����ֵ!");return false;
	}
	if (cal_price=="" || isNaN(cal_price) || cal_price<=0){
		alert("��������ȷ��ծȯ�Ϲ��۸�!");return false;
	}
	if (cal_year=="" || isNaN(cal_year) || cal_year<=0){
		alert("��������ȷ��ծȯ����!");return false;
	}
	if ((cal_type>0) && (cal_rate=="" || isNaN(cal_rate) || cal_rate<=0)){
		alert("��������ȷ��Ʊ������!");return false;
	}
	if ((cal_type>1) && (cal_buyday=="" || !Cal_datevalid(cal_buyday))){
		alert("��������ȷ���Ϲ�����!");return false;
	}
	if ((cal_type>1) && (cal_freq=="" || isNaN(cal_freq) || cal_freq<=0)){
		alert("��������ȷ����Ϣ֧��Ƶ��(��/��)!");return false;
	}
	
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
	/// cal_type  1������ծȯ
	///		     2������һ�λ�����Ϣծȯ 
	///          3���̶����ʸ�Ϣծȯ�͸�������ծȯ
	var w,m;
	var pv,x,s,e,isetp,ret=0;
	var CurrDate=new Date();
			
	//����ծȯ
	if (cal_type==0)
	{
		Cost=parseFloat(cal_cost);
		BuyPrice=parseFloat(cal_price);
		Years=parseInt(cal_year);
	 } 
	//����һ�λ�����Ϣծȯ
	 if (cal_type==1)
	 {
		Cost=parseFloat(cal_cost);
		BuyPrice=parseFloat(cal_price);
		Years=parseInt(cal_year);
		Rate=parseFloat(cal_rate)/100;
	}
	//�̶����ʺ͸�������
	if (cal_type==2)
	{
		Cost=parseFloat(cal_cost);
		BuyPrice=parseFloat(cal_price);
		Years=parseInt(cal_year);
		Rate=parseFloat(cal_rate)/100;
		BuyDate=Cal_strtodate(cal_buyday);
		Freq=parseInt(cal_freq);
		CurrDate = new Date(BuyDate);
		CurrDate.setYear(CurrDate.getYear()+Years);
	}
	
	var Calc=function(x,w,m,Cost,Rate,Freq){
		var y=0;
		for (i=w;i<=w+m-1;i++)
			y=y+(Cost*Rate/Freq)/Math.pow((1+x/Freq),i);
		y=y+(Cost/Math.pow((1+x/Freq),(w+m-1)));
		return y;
	}
	
	switch(cal_type)
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
				pv=Calc(x,w,m,Cost,Rate,Freq);
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
	document.getElementById("cal_result").value = NBround(ret*100,2);
}

/*ծȯ�����ʼ�����
 */
function calWinbond(type){
	//���㹺��������
	if (type==0){
		if(!CheckElem(document.getElementById("cal_cost_0"), "ծȯ��ֵ")) return false;
		if(!CheckElem(document.getElementById("cal_buyprice_0"), "����۸�")) return false;
		if(!CheckElem(document.getElementById("cal_day_0"), "����ʱ��")) return false;
		if(!CheckElem(document.getElementById("cal_rate_0"), "Ʊ��������")) return false;
		
		var a = parseFloat(document.getElementById("cal_cost_0").value);
		var b = parseFloat(document.getElementById("cal_buyprice_0").value);
		var f = parseFloat(document.getElementById("cal_day_0").value);
		var i = parseFloat(document.getElementById("cal_rate_0").value)/100;
		
		var r = (a+a*i*f/365-b)/(b*f/365);
		document.getElementById("cal_result_0").value = NBround(r*100,2);
		
	//������������ʶ�	
	}else if(type==1){
		if(!CheckElem(document.getElementById("cal_cost_1"), "���м۸�")) return false;
		if(!CheckElem(document.getElementById("cal_sellprice_1"), "�����۸�")) return false;
		if(!CheckElem(document.getElementById("cal_day_1"), "����ʱ��")) return false;
		if(!CheckElem(document.getElementById("cal_rate_1"), "Ʊ��������")) return false;
	
		var t = parseFloat(document.getElementById("cal_cost_1").value);
		var c = parseFloat(document.getElementById("cal_sellprice_1").value);
		var d = parseFloat(document.getElementById("cal_day_1").value);
		var i = parseFloat(document.getElementById("cal_rate_1").value)/100;
	
		var r = (c-t+d*t*i/365)/(t*d/365);
		document.getElementById("cal_result_1").value = NBround(r*100,2);
		
	//��������ڼ�������
	}else if(type==2){
		if(!CheckElem(document.getElementById("cal_cost_2"), "ծȯ��ֵ")) return false;
		if(!CheckElem(document.getElementById("cal_buyprice_2"), "����۸�")) return false;
		if(!CheckElem(document.getElementById("cal_sellprice_2"), "�����۸�")) return false;
		if(!CheckElem(document.getElementById("cal_day_2"), "����ʱ��")) return false;
		if(!CheckElem(document.getElementById("cal_rate_2"), "Ʊ��������")) return false;
		
		var a = parseFloat(document.getElementById("cal_cost_2").value);
		var b = parseFloat(document.getElementById("cal_buyprice_2").value);
		var c = parseFloat(document.getElementById("cal_sellprice_2").value);
		var d = parseFloat(document.getElementById("cal_day_2").value);
		var i = parseFloat(document.getElementById("cal_rate_2").value)/100;
		
		var r = (c-b+a*i*d/365)/(b*d/365);
		document.getElementById("cal_result_2").value = NBround(r*100,2);		
	}
}

//�жϹ�ʽһ
function CheckElem(curObj, msg){
	if(msg==null) msg="";
	if(curObj.value==''){
		alert(msg + "����Ϊ��!");
		curObj.focus();
		curObj.select();
		return false;
	}else if(isNaN(curObj.value)){
		alert(msg + "����Ϊ����!");
		curObj.focus();
		curObj.select();
		return false;
	}else{
		return true;
	}
}

/*	���ܣ�    У��һ��ֵ�Ƿ�Ϊ��
	��ڲ�����	
	CheckCtl: ҪУ��������
	disptext: ������ʾ����Ϣ
*/
function CheckEmpty(CheckCtl,disptext,page)
{				
	if (Trim(CheckCtl.value)=="" )
	{
		if (page)
		 showguide(page);
		DispMessage(CheckCtl,disptext);	
		return false;
	}
	else
	  return true;
}
function CheckFN3(CheckCtl,disptext,IsCanZero,page,floatcount)
{					
if ( CheckFN(CheckCtl,disptext,page,floatcount) )
 {
	if ( (parseFloat(CheckCtl.value)==0) &&(!IsCanZero) )
		{
			if (page)
				showguide(page);
			DispMessage(CheckCtl,disptext);
			return false;
		}
	else return true;	
 }		
else
 return false;
}
/*���ܣ� У��һ���Ϸ��Ĵ��ڵ���0�ĸ�����
��ڲ�����	
			CheckCtl: ҪУ��������
			disptext: ������ʾ����Ϣ	
			floatcount: С�������λ�������û�иò�������Ĭ��Ϊ2λ��
			���û��page��������floatcunt�����򣺰�page ��null
			��:	CheckFN(CheckCtl,"������ʾ����Ϣ",null,5)				*/
function CheckFN(CheckCtl,disptext,page,floatcount)
{					
	var s=new String(Trim(CheckCtl.value));
	temp=parseFloat(s);
	var result=true;
	if( (isNaN(temp)) || (temp< 0)||(temp!=s) )
	{					
		result=false;
	}	
	else if (temp>maxfn) 
	{
		result=false;
		disptext=overerrormsg;
	}
	else
	{ 	 					
		limitcount=floatcount?floatcount:2;
		var array=s.split(".");
		if (array[1]==null)
		count=-1;
		else
		{
			var str=new String(array[1]);
			count=str.length;
		}
		if (count>limitcount)
		{
			if (page)
				showguide(page);
			alert("С��λ������"+limitcount+"λ"); 
			CheckCtl.select();
			CheckCtl.focus();
			return false;
		}
	 }	
	 if (!result)
	 {
		if (page)
		 showguide(page);
		DispMessage(CheckCtl,disptext);
		return false;
	 }			
		return true;				
}

/*	���ܣ� У��һ��������
��ڲ�����	
CheckCtl: ҪУ��������
disptext: ������ʾ����Ϣ
IsCanZero : �Ƿ����Ϊ��*/
function CheckPN(CheckCtl,disptext,IsCanZero,page) 
{   
   
	var s=new String(Trim(CheckCtl.value));
	var temp=parseInt(s);
	var result=true;
	if (  (isNaN(temp)) || (temp<0) || ( s.indexOf(".")>=0 )||(temp!=s))
	{
		result=false;
	}				
	else if ( (!IsCanZero)&&(temp==0) )
	 {
		result=false;
	 }
	if  (temp>maxpn) 
	{
		result=false;
		disptext=overerrormsg;
	}
	 if (!result)
	 {
		if (page)
		 showguide(page);
		DispMessage(CheckCtl, disptext);
		return false;
	}					
	 return true;
	 
}

/*ծȯ�������������
 */
function initTimWinBond(){
	var cal_today = new Date();
	cal_today = cal_today.getFullYear() + "-" + (cal_today.getMonth()+1)+ "-" + cal_today.getDate();
	document.getElementById("cal_buyday_0").value = cal_today;
	document.getElementById("cal_sellday_0").value = cal_today;
	document.getElementById("cal_buyday_1").value = cal_today;
	document.getElementById("cal_sellday_1").value = cal_today;
	document.getElementById("cal_buyday_2").value = cal_today;
	document.getElementById("cal_sellday_2").value = cal_today;
	
}
function calTimWinBond(){
	if(document.getElementById("cal_type_0").checked){
		if (!CheckFN3(document.getElementById("cal_cost_0"),"����[ծȯ��λ�ɱ�]��������",false))
			return false;	       		    
		if (!CheckFN3(document.getElementById("cal_price_0"),"����[ծȯ��λ��ֵ]��������",false))
			return false;
		if(!CheckEmpty(document.getElementById("cal_buyday_0"),"[ծȯ���򽻸�����]����Ϊ�գ�"))
			return false;
		if(!CheckEmpty(document.getElementById("cal_sellday_0"),"[ծȯ���ڶҸ�����]����Ϊ�գ�"))
			return false;		
		var BuyDate=new Date();
		BuyDate.setTime(Cal_strtodate(document.getElementById("cal_buyday_0").value));				
		var SellDate=new Date();
		SellDate.setTime(Cal_strtodate(document.getElementById("cal_sellday_0").value));			
		if (BuyDate>=SellDate)
		{
			alert("[ծȯ���ڶҸ���]Ӧ������[���򽻸���]");
			return false;
		}
		if (document.getElementById("paymod_1").checked)		
		{
			if ( !CheckFN3(document.getElementById("cal_mod1_rate"),"����[ծȯƱ��������]����Ǹ���",true))
				return false;
			if ( !CheckPN(document.getElementById("cal_mod1_year"),"����[ծȯ��������]����������",false))
				return false;
		}      
		if (document.getElementById("paymod_2").checked)
		{
		if (!CheckFN3(document.getElementById("cal_mod2_rate"),"����[ծȯƱ��������]����Ǹ���",true))
			return false;    
		if (!CheckPN(document.getElementById("cal_mod2_freq"),"����[��Ϣ֧��Ƶ��]����������",false))
			return false;	       		    	    
		}   	
	}
	if(document.getElementById("cal_type_1").checked)
	 {
		if (!CheckFN3(document.getElementById("cal_cost_1"),"����[ծȯ��λ�ɱ�]��������",false))
			return false;	       		    
		if(!CheckEmpty(document.getElementById("cal_buyday_1"),"[ծȯ���򽻸�����]����Ϊ�գ�"))
			return false;
		if(!CheckEmpty(document.getElementById("cal_sellday_1"),"[ծȯ���ڶҸ�����]����Ϊ�գ�"))
			return false;		
		var BuyDate=new Date();
		BuyDate.setTime(Cal_strtodate(document.getElementById("cal_buyday_1").value));				
		var SellDate=new Date();
		SellDate.setTime(Cal_strtodate(document.getElementById("cal_sellday_1").value));			
		if (BuyDate>=SellDate)
		{
			alert("[ծȯ���ڶҸ���]Ӧ������[���򽻸���]");
			return false;
		}		
		if (!CheckFN3(document.getElementById("cal_unitprice_1"),"����[ծȯ��λ��ֵ����]����",false))
			return false;		
		if (!CheckFN3(document.getElementById("cal_rate_1"),"����[ծȯƱ������������]�Ǹ���",true))
			return false;
		if (!CheckPN(document.getElementById("cal_year_1"),"����[ծȯ��������]����������",false))
			return false;
			
	
	}					
	if(document.getElementById("cal_type_2").checked)
	 {
		if (!CheckFN3(document.getElementById("cal_cost_2"),"����[ծȯ��λ�ɱ�]��������",false))
			return false;	       		    
		if(!CheckEmpty(document.getElementById("cal_buyday_2"),"[ծȯ���򽻸�����]����Ϊ�գ�"))
			return false;
		if(!CheckEmpty(document.getElementById("cal_sellday_2"),"[ծȯ���ڶҸ�����]����Ϊ�գ�"))
			return false;		
		var BuyDate=new Date();
		BuyDate.setTime(Cal_strtodate(document.getElementById("cal_buyday_2").value));				
		var SellDate=new Date();
		SellDate.setTime(Cal_strtodate(document.getElementById("cal_sellday_2").value));			
		if (BuyDate>=SellDate)
		{
			alert("[ծȯ���ڶҸ���]Ӧ������[���򽻸���]");
			return false;
		}		
		if (!CheckFN3(document.getElementById("cal_unitprice_2"),"����[ծȯ��λ��ֵ]��������",false))
			return false;		
		if (!CheckFN3(document.getElementById("cal_rate_2"),"����ծȯƱ������������Ǹ���",true))
			return false;
		if (!CheckPN(document.getElementById("cal_freq_2"),"������Ϣ֧��Ƶ������������",false))
			return false;	       		    	            
	
	}
	if (document.getElementById("cal_type_0").checked)
	{
		if (document.getElementById("paymod_0").checked)
		{
			//����
		   CalcBond11(0);
		}
		if (document.getElementById("paymod_1").checked)
		{
			//һ�λ�����Ϣ
			CalcBond11(1);
		}
		if (document.getElementById("paymod_2").checked)
		{
			//����֧��
			CalcBond11(2);
		}
	}
	if (document.getElementById("cal_type_1").checked)
	{
		//ʣ����ͨ������һ�����ϵĵ���һ�λ�����Ϣծȯ
		CalcBond21();
	}
	if (document.getElementById("cal_type_2").checked)
	{
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
	
	UnitCost = parseFloat(document.getElementById("cal_cost_0").value);
	UnitPrice = parseInt(document.getElementById("cal_price_0").value);
	BuyDate.setTime(Cal_strtodate(document.getElementById("cal_buyday_0").value));
	SellDate.setTime(Cal_strtodate(document.getElementById("cal_sellday_0").value));
	if(Method == 1)
	{
		Rate = parseFloat(document.getElementById("cal_mod1_rate").value)/100;
		Year = parseInt(document.getElementById("cal_mod1_year").value);
	}
	else if(Method == 2)
	{
		Rate = parseFloat(document.getElementById("cal_mod2_rate").value)/100;
		Freq = parseInt(document.getElementById("cal_mod2_freq").value);
	}
	
	
	Excute(UnitCost,BuyDate,SellDate,UnitPrice,Rate,Year,Freq,Method);
}

function CalcBond21()
{
	var Year,UnitPrice;
	var UnitCost,Rate;
	var BuyDate=new Date();
	var SellDate=new Date();
	
	UnitCost = parseFloat(document.getElementById("cal_cost_1").value);
	UnitPrice = parseInt(document.getElementById("cal_unitprice_1").value);
	BuyDate.setTime(Cal_strtodate(document.getElementById("cal_buyday_1").value));
	SellDate.setTime(Cal_strtodate(document.getElementById("cal_sellday_1").value));
	Rate = parseFloat(document.getElementById("cal_rate_1").value)/100;
	Year = parseInt(document.getElementById("cal_year_1").value);

	alert(UnitCost+"-"+UnitPrice+"-"+BuyDate+"-"+SellDate+"-"+Rate+"-"+Year);
	Excute(UnitCost,BuyDate,SellDate,UnitPrice,Rate,Year,0,3);
}

function CalcBond31()
{
	var Freq,UnitPrice;
	var UnitCost,Rate;
	var BuyDate=new Date();
	var SellDate=new Date();
	
	UnitCost = parseFloat(document.getElementById("cal_cost_2").value);
	UnitPrice = parseInt(document.getElementById("cal_unitprice_2").value);
	BuyDate.setTime(Cal_strtodate(document.getElementById("cal_buyday_2").value));
	SellDate.setTime(Cal_strtodate(document.getElementById("cal_sellday_2").value));
	Rate = parseFloat(document.getElementById("cal_rate_2").value)/100;
	Freq = parseInt(document.getElementById("cal_freq_2").value);

	Excute(UnitCost,BuyDate,SellDate,UnitPrice,Rate,0,Freq,4);
}


function Excute(Cost,BondBuyDate,BondEndDate,EndCost,BondRate,YearTimes,Freq,options)
{
	var w,m,tDays=0;	//int
	var l,pv,x,s,e,isetp;	//double
	var CurrDate=new Date(BondBuyDate.getFullYear(),0,1);
	var BondEndRate;
	
	var Calc = function(x, w, m, EndCost, BondRate, Freq){
		var y=0;
		for (var i=0;i<=m-1;i++)
			y=y+((EndCost*BondRate)/Freq)/Math.pow((1+x/Freq),i+w);
		y=y+(EndCost/Math.pow((1+x/Freq),(w+m-1)));
		
		return y;
	}

	tDays=Cal_DateDiff(BondBuyDate,BondEndDate)+1;
	
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
	document.getElementById("cal_result").value = NBround(BondEndRate*100,2);
}



			
