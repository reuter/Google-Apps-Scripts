function allSites(){
	//testing playing with GIT
	//another GIT test
	
	//name for report title
  var reportFor = "Revenue Management";

  //list of sites for the report. Full url, in quotes, separated by commas.
  var mySites = [
    "https://sites.google.com/a/deltahotels.com/revenue-management/"
  ];
  
  //create report
  var myReport = SpreadsheetApp.create("Site Inventory Report for " + reportFor);
  DriveApp.getFolderById("0B4xmSrCDx8rTNkRhOHZrSk1SZm8").addFile(DriveApp.getFileById(myReport.getId()));
    
  //run through each site. Calling inventorySite function for each site. Will return an array with values for each page
  //type as well as Site name and URL (in array[1] and array[2] respectively)
  for(s in mySites){
    var countArray = inventorySite(mySites[s]);
    //this is the slow way to add the array, but I was lazy
    for(r in countArray){
      myReport.appendRow(countArray[r]);
    }
    //just a division line in the spreadsheet between sites.
    myReport.appendRow(["--","--"]);
  }
}

function inventorySite(siteURL){
  //declare site to inventory
  var mySite = SitesApp.getSiteByUrl(siteURL);
  var myPages = mySite.getAllDescendants();
  
  //setting up variables for invetory counts
  var webPageCount = 0;
  var announcementsPageCount = 0;
  var announcementCount = 0;
  var fileCabinetPageCount = 0;
  var listPageCount = 0;
  var otherCount = 0;
  
  
  //walk through all pages
  for (x in myPages){
  
    //load next page and pageType
    var thisPage = myPages[x];
    var pageType = thisPage.getPageType();
    
    //go to pageType
    switch(pageType.toString()){
      case "WebPage":
        webPageCount++;
        break;
      case "AnnouncementsPage":
        announcementsPageCount++;
        break;
      case "Announcement":
        announcementCount++;
        break;
      case "FileCabinetPage":
        fileCabinetPageCount++;
        break;
      case "ListPage":
        listPageCount++;
        break;
      default:
        otherCount++;
        Logger.log(pageType.toString());
        break;        
    }
  }
//    Logger.log("Web Pages : " + webPageCount);
//    Logger.log("Announcement Pages : " + announcementsPageCount);
//    Logger.log("Announcements : " + announcementCount);
//    Logger.log("File Cabinet Pages : " + fileCabinetPageCount);
//    Logger.log("List Pages : " + listPageCount);
//    Logger.log("Other Pages : " + otherCount);
    
  //array to return to parent
  var countArray = [
      ["Site Name", mySite.getTitle()],
      ["Site URL", mySite.getUrl()],
      ["Web Pages", webPageCount],
      ["Announcement Pages", announcementsPageCount],
      ["Announcements", announcementCount],
      ["File Cabinet Pages", fileCabinetPageCount],
      ["List Pages", listPageCount],
      ["Other Pages", otherCount]
    ];
    
    return(countArray);
}