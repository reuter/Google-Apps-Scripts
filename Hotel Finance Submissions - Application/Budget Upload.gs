function uploadBudgetFile(file, property, year, report){
  Logger.log("We're uploading now!");
  var app = UiApp.getActiveApplication();
  
  var isLate = (currentTime.valueOf() > budgetUploadDeadline.valueOf());
  Logger.log(isLate);
  if (isLate && !hasOverride) // The upload should be rejected
  {
    app.add(
      app.createLabel("The budget deadline (" + Utilities.formatDate(budgetUploadDeadline, "EDT", "MMM dd") + ") has passed. Please contact corporate finance to submit your file.")
    );
    return app;
  }
 
  var result = db.query(
    {
      type: "folder",
      category: "Budget",
      property: property,
      year: year
    }
  );
  
  if (result.getSize() == 0){
    var itInfo = "<blockquote>";
    itInfo += "Type : File<br>";
    itInfo += "Property : " + property + "<br>";
    itInfo += "Catgeory : Budget<br>";    
    itInfo += "Year : " + year + "<br>";
    itInfo += "Report : " + report + "<br>";
    itInfo += "</blockquote>"; 
    app.add(
      app.createLabel()
      .setText("There was an error with your submission, please provide the following information to IT")
    );
    app.add(
      app.createHTML(itInfo)
    );
  } else {
//    var newFile = DriveApp.createFile(file);
//    var myFolder = DriveApp.getFolderById(result.next().folderId);
    var newFile = DocsList.createFile(file);
    var myFolder = DocsList.getFolderById(result.next().folderId);    

    doesBudgetFileAlreadyExist(myFolder, property, year, report);
    
//    myFolder.addFile(newFile);
//    newFile.setName(year + " - " + property + " - " + report);
    newFile.addToFolder(myFolder);
    newFile.removeFromFolder(DocsList.getRootFolder());
    newFile.rename(year + " - " + property + " - " + report);

    
    var ob = {
      type: "file",
      property: property,
      category: "Budget",
      report : report,
      year: year,
      month: "",
      fileId: newFile.getId(),
      fileUrl: newFile.getUrl(),
    };
    db.save(ob);    
    
    app.add(app.createLabel().setText("File Uploaded"));
  }  
  return app;
  
}

function doesBudgetFileAlreadyExist(folder, property, year, report){
  var result = db.query({
      type: "file",
      property: property,
      category: "Budget",
      report: report,
      year: year
  });
  
  while (result.hasNext()){
    var thisFile = result.next();
    DriveApp.getFileById(thisFile.fileId).setTrashed(true);
    db.remove(thisFile);
  }
}