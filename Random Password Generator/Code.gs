function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function generatePass(form){
  var plength = form.length;
  return passwordGeneration(plength);
}

function generateOraclePass(form){
  var plength = form.length;
  return passwordGeneration(plength-1) + "_";
}

function charSwap(str, index, char){
  Logger.log("The password %s doesn't have any numbers, so let's replace char index %s with a %s", str, index, char);
  var result = str.substring(0,index) + char + str.substring(index+1);
  return result;
}

function passwordGeneration(length){
  var keylist = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  var alphaList = keylist.replace(/[0-9]/g, "");
  var temp = "";
  for (i = 0; i < length-1; i++){
    temp+= keylist.charAt(Math.floor(Math.random()*keylist.length));
  }
  Logger.log(temp)
  if (temp.search(/[0-9]/) == -1)
    temp = charSwap(temp, Math.floor(Math.random()*temp.length), "7");
  Logger.log(temp)
  temp = alphaList.charAt(Math.floor(Math.random()*alphaList.length)) + temp;
  Logger.log(temp)
  return temp;
}
