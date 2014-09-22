  var currentUser = Session.getActiveUser();
  var currentTime = new Date();
  var hasOverride = false; //GroupsApp.getGroupByEmail('dhc.financesubmissionoverride.grp@deltahotels.com').hasUser(currentUser);

function doGet(e){
  
  if (hasOverride)
    Logger.log('Currently serving app for %s, who has override rights', currentUser.getEmail());
  
  switch(e.parameter["appType"]){
      
    case "allReporting":
      var app = allReporting(e);
      break;      
      
    case "allSubmission":
      var app = allSubmission(e);
      break;      
      
    default:
      var app = UiApp.createApplication().setTitle("You have not chosen a method");
      app.add(app.createLabel().setText("You have not chosen a method"));
  }
  
  return app;
}

function doPost(e){
  var app = UiApp.getActiveApplication();
  Logger.log(e.parameter["month"]);
  switch(e.parameter["appType"]){

    case "allReporting":
      listAllReports(
         e.parameter["propertyBox"],
         e.parameter["yearBox"],
         e.parameter["monthBox"],        
         e.parameter["categoryBox"],
         e.parameter["reportBox"]        
        );
      break;      

    case "uploadFile":
      allUpload(
        e.parameter["myFile"],
        e.parameter["propertyBox"],
        e.parameter["yearBox"],
        e.parameter["monthBox"],        
        e.parameter["categoryBox"],
        e.parameter["reportBox"]
        );
      break; 
      
    default:
      
  }
  
  return app;
  
  
}

