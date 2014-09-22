function addFoldersToDb(){
  var hotelFolders = DriveApp.getFolderById(parentFolderId).getFolders();
  while (hotelFolders.hasNext()){
    var thisHotel = hotelFolders.next();
    if (thisHotel.getName() !== "BES Finance Submissions") //skip
      continue;
//    var thisHotel = DriveApp.getFolderById(hotelFolderId);
    var theYears = thisHotel.getFolders();
    while (theYears.hasNext()){
      var thisYear = theYears.next();
      if (thisYear.getName() !== "2015")
        continue;
      var theMonths = thisYear.getFolders();
      while (theMonths.hasNext()){
        var thisMonth = theMonths.next();
        if (thisMonth.getName() === "Budget"){
          var ob = {
            type: "folder",
            property: thisHotel.getName().substring(0,3),
            year: thisYear.getName(),
            category: thisMonth.getName(),
            folderId: thisMonth.getId()
          };
          db.save(ob);        
        }
//        if (thisMonth.getName() === "Hotel Reviews"){
//          var ob = {
//            type: "folder",
//            property: thisHotel.getName().substring(0,3),
//            category: "Hotel Reviews",
//            year: thisYear.getName(),
//            folderId: thisMonth.getId(),
//            report: "",
//            month: ""
//          };
//          Logger.log(ob);
//          db.save(ob);        
//        }        
//        var thisMonthsCategories = thisMonth.getFolders();
//        while (thisMonthsCategories.hasNext()){
//          var thisCategory = thisMonthsCategories.next();
//          var ob = {
//            type: "folder",
//            property: thisHotel.getName(),
//            year: thisYear.getName(),
//            month: thisMonth.getName(),
//            category: thisCategory.getName(),
//            folderId: thisCategory.getId()
//          };
//          db.save(ob);
//        }
      }
    }
  }
}

function wipeDb(){
  var result = db.query({});
  while (result.hasNext()){
    db.remove(result.next());
  }
}

function updateFolderName(){
  var result = db.query({
    type: "file",
    category: "Owned Hotels Review"
  });
  while(result.hasNext()){
    var item = result.next();
    //update category name
    item.category = "Hotel Reviews";
    //update Drive
//    DriveApp.getFolderById(item.folderId).setName("Hotel Reviews");
    db.save(item);
  }
}

function queryData(){
//  var doc = DocumentApp.create("HFS - File DB Log").getBody();
  var result = db.query(
    {
// property: "BES",
//    year: "2015",
//  type: "file",
//  category: "Budget"
//    report: "Power Point Presentation "
      folderId: "0B7dO6HAnTNrBVktIWUVSM1NoYWM"
    }    
  );
  Logger.log(result.getSize());
//  doc.appendParagraph(Logger.getLog());
//  doc.appendHorizontalRule();
  while (result.hasNext()){
//    doc.appendParagraph(JSON.stringify(result.next()));
//    doc.appendHorizontalRule();
    Logger.log(result.next());
  }
//  doc.appendParagraph(Logger.getLog());
}

function selectiveWipe(){
  var result = db.query({folderId: "0B7dO6HAnTNrBVktIWUVSM1NoYWM"});
//  Logger.log(result.next());
  while (result.hasNext()){
    db.remove(result.next());
  }  
}

function addBudgetFolders(){
  var hotelsFolder = DriveApp.getFolderById(parentFolderId).getFolders();
  while (hotelsFolder.hasNext()){
    var thisHotel = hotelsFolder.next();
    var newYear = thisHotel.createFolder("2014");
    newYear.createFolder("Budget");
  }
}

function addMonthEndCertifications(){
  var newFolder = "Month End Certifications";
  var hotelFolder = DriveApp.getFolderById(hotelFolderId).getFolders();
  while (hotelFolder.hasNext()){
    var thisYear = hotelFolders.next();
    if (thisYear.getName() === "2013"){
      var months = thisYear.getFolders();
      while (months.hasNext()){
        var thisMonth = months.next();
        if (thisMonth.getName() != "Budget" || thisMonth.getName() != "Owned Hotels Review"){
          var thisFolder = thisMonth.createFolder(newFolder);

        }
      }
    }
    
  }
}

function testing(){
  var hotelFolders = DriveApp.getFolderById(parentFolderId).getFolders();
  var thisHotel = hotelFolders.next();
  var theYears = thisHotel.getFolders()
  var thisYear = theYears.next()
  var myFolders = thisYear.getFolders();
  while (myFolders.hasNext()){
    var thisRound = myFolders.next();
    Logger.log(thisRound.getName());
  }
}

function dateCalc(){
  var today = new Date();
  var thisYear = today.getFullYear().toString();
  Logger.log(thisYear);
}

function hotelFolderIds(){
  var hotelFolders = DriveApp.getFolderById(parentFolderId).getFolders();
  while (hotelFolders.hasNext()){
    var thisHotel = hotelFolders.next();
    Logger.log("var hotelFolderId = '" + thisHotel.getId() + "' // " + thisHotel.getName());
  }
}





function dumpDatabaseIntoSheet(result) {
  // You can change the query below to restrict what to put into
  // the Spreadsheet, or change ordering, etc.  Do note the default
  // query result size limit!
  var result = db.query({});
  var data = [];
  var keys = {};

  // load in data and find out the object keys
  while (result.hasNext()) {
    var item = result.next();
    var itemKeys = Object.keys(item);
    for (var i = 0; i < itemKeys.length; i++) {
      if (typeof(item[itemKeys[i]]) != 'function') {
        keys[itemKeys[i]] = true;
      }
    }
    data.push(item);
  }

  var headings = Object.keys(keys);
  var values = [headings];
  // produce the values array containing the bits from the result
  // objects
  for (var rownum = 0 ; rownum < data.length; rownum++) {
    var thisRow = [];
    var item = data[rownum];
    for (var i = 0; i < headings.length; i++) {
      var field = headings[i];
      var thisValue = item[field];
      if (thisValue == undefined || typeof(thisValue) == 'function') {
        thisValue = null;
      }
      thisRow.push(thisValue);
    }
    values.push(thisRow);
  }

  var spreadsheet = SpreadsheetApp.create("Data Dump");
  var newSheet = spreadsheet.insertSheet(); // make a new sheet
  Logger.log(values.length + " : " + headings.length);
  var range = newSheet.getRange(1, 1,
      values.length, headings.length);
  range.setValues(values);
}

function loadDatabaseFromSheet() {
  var spreadsheet = SpreadsheetApp.openById("0ArdO6HAnTNrBdFVRVWo4bGlwLWpIdjJhZDlNX3A4S1E");
  var data = spreadsheet.getDataRange().getValues();
  var keys = data[0];
  var newDb = ScriptDb.getMyDb();
  for (var row = 2331; row < 2332; row++) {
    var rowData = data[row];
    var item = {};
    for (var column = 0; column < keys.length; column++) {
      item[keys[column]] = rowData[column];
    }
    newDb.save(item);
  }
}

function dbCompare(){
  var firstResult = db.query({});
  Logger.log("Old DB : " + firstResult.getSize());
  var secondResult = newDb.query({});
  Logger.log("New DB : " + secondResult.getSize());
}

function fixCategories(){
  var result = db.query({category: "Owned Hotels Review"});
  while (result.hasNext()){
    var ob = result.next();
    ob.category = "Owned Hotels Review";
    ob.month = "";
    db.save(ob);
  }
}

function addFilesToDb(){
  var thisHotel = DriveApp.getFolderById(hotelFolderId);
  var years = thisHotel.getFolders();
  while (years.hasNext()){
    var thisYear = years.next();
    var months = thisYear.getFolders();
    while (months.hasNext()){
      var thisMonth = months.next();
      if (thisMonth.getName() === "Budget" | thisMonth.getName() === "Owned Hotels Review"){
        var theFiles = thisMonth.getFiles();
        while (theFiles.hasNext()){
          var thisFile = theFiles.next();
          var ob = {
            type: "file",
            property: thisHotel.getName().substring(0,3),
            category: thisMonth.getName(),
            report : thisFile.getName().substring(18),
            year: thisYear.getName(),
            month: thisMonth.getName(),
            fileId: thisFile.getId(),
            fileUrl: thisFile.getUrl(),
          };
          db.save(ob);
        }
      } else {
      
      }
    }
  }
}

function oneTimeUpdate(){
  var result = db.query({
    type: "folder"
  });
  while (result.hasNext()){
    var ob = result.next();
    ob.report = "";
    db.save(ob);
  }
}

function flushFiles(){
    deleteFile("0B7dO6HAnTNrBTUFFLTY4NzEwYzdmLWZkYWMtNDBkZi1iM2M0LTEzZDRhNjU4OWJkNA");
}

function testGetProperties(){
  var currentUser = "yung.tran@deltahotels.com";
  var propertyArray = new Array();
  var result = permissionsDb.query({user: currentUser});
  while (result.hasNext()){
    propertyArray.push(result.next().hotel);
  }
  propertyArray.sort();
  Logger.log(propertyArray);
}

function clearOldFolders(){
  var result = db.query({
    category: "Owned Hotels Review",
    year: "2014",
    type: "file"
  });
  Logger.log(result.getSize());
  while (result.hasNext()){
    var ob = result.next();
    ob.year = "2013";
    db.save(ob);
  }  
}

function fixMyMistake(){
  
}