function uploadMonthlyFile(file, property, year, month, report){
  var app = UiApp.getActiveApplication();
 
  var result = db.query(
    {
      type: "folder",
      category: "Budget",
      property: property,
      year: year,
      month: month
    }
  );
  
  if (result.getSize() == 0){
    var itInfo = "<blockquote>";
    itInfo += "Type : File<br>";
    itInfo += "Property : " + property + "<br>";
    itInfo += "Catgeory : Monthly<br>";    
    itInfo += "Year : " + year + "<br>";
    itInfo += "Month : " + month + "<br>";
    itInfo += "Report : " + report + "<br>";    
    itInfo += "</blockquote>"; 
    app.add(
      app.createLabel()
      .setText("There was an error with your submission, please provide the following information IT")
    );
    app.add(app.createHTML(itInfo));
  } else {
    var newFile = DriveApp.createFile(file);
    var myFolder = DriveApp.getFolderById(result.next().folderId);
    doesBudgetFileAlreadyExist(myFolder, property, year, month, report);
    myFolder.addFile(newFile);
    newFile.setName(year + " - " + month + " - " + property + " - " + report);
    
    var ob = {
      type: "file",
      property: property,
      category: "Monthly",
      report: report,
      year: year,
      month: month,
      fileId: newFile.getId(),
      fileUrl: newFile.getUrl(),
    };
    db.save(ob);    
    
    app.add(app.createLabel().setText("File Uploaded"));
  }  
  return app;
  
}

function doesMonthlyFileAlreadyExist(folder, property, year, month, report){
  var result = db.query({
      type: "file",
      property: property,
      category: "Monthly",
      report: report,
      year: year,
      month: month
  });
  
  while (result.hasNext()){
    var thisFile = result.next();
    DriveApp.getFileById(thisFile.fileId).setTrashed(true);
    db.remove(thisFile);
  }
}