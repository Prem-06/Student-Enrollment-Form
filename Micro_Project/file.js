function resetForm(){
$('#rollno').val("");
$('#name').val("");
$('#class').val("");
$('#birth').val("");
$('#address').val("");
$('#enrollment').val("");
$('#rollno').prop("disabled",false);
$('#save').prop("disabled",true);
$('#reset').prop("disabled",true);
$('#change').prop("disabled",true);
$('#rollno').focus();
}
var jpdbBaseurl= "http://api.login2explore.com:5577";
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";
var stuDBName='SCHOOL-DB';
var stuRelationName='STUDENT-TABLE';
var connToken=''

function saveRec(jsonStrObj){
    var lvdata=JSON.parse(jsonStrObj.data);
    localStorage.setItem('recno',lvdata.rec_no)
 }
 
 function getSturollnoAsJsonObj(){
     var sturollno=$('#rollno').val();
     var jsonStr={
         rollno:sturollno
     };
     return JSON.stringify(jsonStr);
 }

function valrollnoateData(){
var rollno,name,clas,hra,da,deduction;
rollno=$('#rollno').val();
name=$('#name').val();
clas=$('#class').val();
hra=$('#hra').val();
da=$('#da').val();
deduction=$('#deduction').val();

if(rollno===''){
    alert('stuloyee rollno missing');
    $('#rollno').focus();
    return '';
}
if(name===''){
    alert('stuloyee name missing');
    $('#name').focus();
    return '';
}
if(clas===''){
    alert('stuloyee class missing');
    $('#class').focus();
    return '';
}
if(hra===''){
    alert('stuloyee HRA missing');
    $('#hra').focus();
    return '';
}
if(da===''){
    alert('stuloyee DA missing');
    $('#da').focus();
    return '';
}
if(deduction===''){
    alert('stuloyee deduction missing');
    $('#deduction').focus();
    return '';
}
 var jsonStrObj={
    rollno:rollno,
    name:name,
    class:clas,
    hra:hra,
    da:da,
    deduction:deduction
 }
 return JSON.stringify(jsonStrObj);
}


function saveData(){
    var jsonStrObj=valrollnoateData();
    if(jsonStrObj===''){
        return "";
    }
    var putRequest=createPUTRequest(connToken, formJsonStr, dbName, relName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(putRequest,jpdbBaseurl,jpdbIML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $('#rollno').focus();
}

function changeData(){
    $('#change').prop('disabled',true);
    jsonChg=valrollnoateData();
    var updateRequest=createUPDATERecordRequest(connToken,jsonChg,stuDBName,stuRelationName,localStorage.getItem('recno'));
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseurl,jpdbIML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $('#rollno').focus();
}

function fillData(jsonObj){
 saveRec(jsonObj);
 var data=JSON.parse(jsonObj.data).record;
 $('#name').val(data.name);
 $('#class').val(data.class);
 $('#hra').val(data.hra);
 $('#da').val(data.da);
 $('#deduction').val(data.deduction);
}

function getdata(){
    var getsturollnoJsonObj=getsturollnoAsJsonObj();
    var getrequest=createGET_BY_KEYRequest(connToken,stuDBName,stuRelationName,getsturollnoJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(getrequest,jpdbBaseurl,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(resJsonObj.status===400){
        $('#save').prop('disabled',false)
        $('#reset').prop('disabled',false)
        $('#name').focus();
    }
    else if(resJsonObj.status===200){
        $('#rollno').prop('disabled',true);
        fillData(resJsonObj);
        $('#change').prop('disabled',false);
        $('#reset').prop('disabled',false);

    }
}
