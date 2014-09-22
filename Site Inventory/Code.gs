function collectSites(){
//Load all sites in to Array
  var allSites = SitesApp.getAllSites("deltahotels.com", 0, 200);
  
//Testing Output
  for(x = 0; x < allSites.length; x++){
    Logger.log(x + " : " + allSites[x].getName() + " : " + allSites[x].getUrl());
}
//    allSites[x].getName(),
//    allSites[x].getUrl(),
////    allSites[52].getAllDescendants().length,
//    allSites[x].getOwners().toString(),
////    allSites[52].getEditors().toString()
//  ]);
  
////Setup Spreadsheet
//  var mySheet = SpreadsheetApp.create("Google Sites Audit - 2");
//  mySheet.getActiveSheet().appendRow(["Site Name","Link","Page Count","Owners","Editors"]);
//
//
////Add Data to Spreadsheet
//  for(x = 0; x < allSites.length; x++){
//    mySheet.getActiveSheet().appendRow([
//      allSites[x].getName(),
//      allSites[x].getUrl(),
//      allSites[x].getAllDescendants().length,
//      allSites[x].getOwners().toString(),
//      allSites[x].getEditors().toString()
//    ]);
//  }
}

function getEditorsOnly(){
  var mySite = SitesApp.getSiteByUrl("https://sites.google.com/a/deltahotels.com/delta-quebec-le-bistro-restaurant-bar/");
  Logger.log(mySite.getViewers());
}

function getMahSites(){
var sites = SitesApp.getAllSites("deltahotels.com", 800, 200);
  Logger.log(sites.length);
for(var i in sites) {
//   Logger.log(sites[i].getUrl());
 }
}

function listSites() {
  var domain = UserManager.getDomain();
  var PAGE_LENGTH=200;
  //Setup Spreadsheet
  var mySheet = SpreadsheetApp.create("Google Sites Audit - 2");
  mySheet.getActiveSheet().appendRow(["Site Name","Link"]);


  var sites = SitesApp.getAllSites(domain,0,PAGE_LENGTH);
  for(var i=0; sites.length != 0; i+=PAGE_LENGTH){
    for (var j=0; j<sites.length; j++) {
      try{
        Logger.log(j + " : " + sites[j].getAllDescendants().length);
        mySheet.appendRow([
          sites[j].getName(),
          sites[j].getUrl(),
//          sites[j].getAllDescendants().length,
//          sites[j].getOwners().toString(),
//          sites[j].getEditors().toString()
        ]);
      }
      catch(e){
        mySheet.appendRow([
          sites[j].getName(),
          sites[j].getUrl(),
//          "error",
//          sites[j].getAllDescendants().length,
//          sites[j].getOwners().toString(),
//          sites[j].getEditors().toString()
        ]);
      }
    }
    sites = SitesApp.getAllSites(domain, i, PAGE_LENGTH);
  }
};

function testBulkWrite(){
  var domain = UserManager.getDomain();
  var PAGE_LENGTH=200;
  
  var myArray = new Array();
  myArray.push(["Site Name","Link","Owners"]);

  var sites = SitesApp.getAllSites(domain,0,PAGE_LENGTH);
  for(var i=0; sites.length != 0; i+=PAGE_LENGTH){
    for (var j=0; j<sites.length; j++) {
      try{
        myArray.push([
          sites[j].getName(),
          sites[j].getUrl(),
          sites[j].getOwners().toString()
        ]);
      }
      catch(e){
        myArray.push([
          sites[j].getName(),
          sites[j].getUrl(),
          sites[j].getOwners().toString()          
        ]);
      }
    }
    sites = SitesApp.getAllSites(domain, i, PAGE_LENGTH);
    Logger.log(i);
  }
  //Dump to Spreadsheet
  var mySheet = SpreadsheetApp.create("Google Sites Audit");
  mySheet.getActiveSheet().getRange(1,1,myArray.length, myArray[0].length).setValues(myArray);
}
 