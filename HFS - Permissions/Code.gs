var newPermissionsDb = ScriptDb.getMyDb();
var parentFolderId = "0B7NI9vvQipLwSUYxbFpPcXJxTEU"; //production folder
//var parentFolderId = "0B7dO6HAnTNrBM2EtSmdZZzBmSms"; //test folder


function selectiveWipeDb(){
  var result = newPermissionsDb.query({user: "yung.tran@deltahotels.com"});

  Logger.log(result.getSize());
  while (result.hasNext()){
    var thisFile = result.next();
    newPermissionsDb.remove(thisFile);
  }
}

function getExistingFolderPermissions(){
  var dbArray = [];
  var hotelFolders = DocsList.getFolderById(parentFolderId).getFolders();
  for (h in hotelFolders){
    if (hotelFolders[h].getName() === 'Hotel Reviews')
      continue; //skip processing for this folder
    var userList = hotelFolders[h].getViewers();
    for (u in userList){
      var thisUser = userList[u].getEmail();
      var ob = 
        {
          type: "permission",
          user: thisUser,
          hotel: hotelFolders[h].getName().substring(0,3)
        };
      dbArray.push(ob);
    }
  }
  if (dbArray.length > 0)
    newPermissionsDb.saveBatch(dbArray, false);
}

//function getExistingPermissions(){
//  var hotelFolders = DocsList.getFolderById(parentFolderId).getFolders();
//  for (h in hotelFolders){
//    var ob = {
//      type: "permission",
//      user: hotelFolders[h].getOwner().getEmail(),
//      hotel: hotelFolders[h].getName().substring(0,3)
//    };
//  newPermissionsDb.save(ob);
//  }
//}

function clearDuplicates(){
  var result = newPermissionsDb.query({});
  var unique = {};
  var tbd = [];
  while(result.hasNext()){
    var item = result.next();
    if (unique[item.hotel] == null){
      unique[item.hotel] = [item.user];
    } else if (unique[item.hotel].indexOf(item.user) == -1){ //is first occurance
      unique[item.hotel].push(item.user);
    } else
      tbd.push(item);
  }
  Logger.log(tbd.length);
  newPermissionsDb.removeBatch(tbd, false);
}

function wipeDb(){
  var result = newPermissionsDb.query({});
  Logger.log(result.getSize());
  while (result.hasNext()){
    newPermissionsDb.remove(result.next());
  }
}

function queryDb(){
  var logToDatabase = ""; //name of DB goes here, otherwise empty string
  var result = newPermissionsDb.query(
    {
//      type: "permission",
      user: "stefan.deprez@deltahotels.com"
//      hotel: "Hot"
    }
  )
  Logger.log(result.getSize());
  while (result.hasNext()){
    Logger.log(result.next());
  }
  if (logToDatabase){    
    var doc = DocumentApp.create(logToDatabase).getBody();
    doc.appendParagraph(Logger.getLog());
  }
}


function addUserToAllProperties(){
  var user = "stacy.kim@deltahotels.com" // user's email address
  var hotelFolders = DriveApp.getFolderById(parentFolderId).getFolders();
  while (hotelFolders.hasNext()){
    var thisHotel = hotelFolders.next();
    thisHotel.addViewer(user);
    var ob = {
      type: "permission",
      user: user,
      hotel: thisHotel.getName().substring(0,3)
    };
    newPermissionsDb.save(ob);
  }
}

function removeUserFromAllProperties(){
  var result = newPermissionsDb.query(
    {
//      type: "permission"
//      user: "piero.iamundo@deltahotels.com",
      hotel: "Hot"
    }
  )
  while(result.hasNext()){
    newPermissionsDb.remove(result.next());
  }
}

//TODO - write remove user from property function which removes DriveApp permissions as well


function addUserToProperty(){
  var user = "ryan.jackson@deltahotels.com";
  var hotel = "BUR";
  var hotelFolders = DriveApp.getFolderById(parentFolderId).getFolders();
  while (hotelFolders.hasNext()){
    var thisHotel = hotelFolders.next();
    if (thisHotel.getName() === hotel + " Finance Submissions"){
      thisHotel.addViewer(user);
      var ob = {
      type: "permission",
      user: user,
      hotel: hotel
    };
    newPermissionsDb.save(ob);
    }
  }
  
}


function quiekTest(){
  var hotelFolders = DocsList.getFolderById(parentFolderId);
  Logger.log(hotelFolders.getViewers());
}