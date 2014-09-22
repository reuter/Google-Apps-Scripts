function uploadOhrFile(file, property, year, report){
  var app = UiApp.getActiveApplication();
 
  var result = db.query(
    {
      type: "folder",
      category: "Hotel Reviews",
      property: property,
      year: year
    }
  );
  
  if (result.getSize() == 0){
    var itInfo = "<blockquote>";
    itInfo += "Type : File<br>";
    itInfo += "Property : " + property + "<br>";
    itInfo += "Catgeory : Hotel Reviews<br>";    
    itInfo += "Year : " + year + "<br>";
    itInfo += "Report : " + report + "<br>";
    itInfo += "</blockquote>"; 
    app.add(
      app.createLabel()
      .setText("There was an error with your submission, please provide the following information IT")
    );
    app.add(
      app.createHTML(itInfo)
    );
  } else {
//    var newFile = DriveApp.createFile(file);
//    var myFolder = DriveApp.getFolderById(result.next().folderId);
    var newFile = DocsList.createFile(file);
    var myFolder = DocsList.getFolderById(result.next().folderId);    
    
    doesOhrFileAlreadyExist(myFolder, property, year, report);
    
//    myFolder.addFile(newFile);
//    newFile.setName(year + " - " + property + " - " + report);
    newFile.addToFolder(myFolder);
    newFile.rename(year + " - " + property + " - " + report);    
    
    var ob = {
      type: "file",
      property: property,
      category: "Hotel Reviews",
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

function doesOhrFileAlreadyExist(folder, property, year, report){
  var result = db.query({
      type: "file",
      property: property,
      category: "Hotel Reviews",
      report: report,
      year: year
  });
  
  while (result.hasNext()){
    var thisFile = result.next();
    DriveApp.getFileById(thisFile.fileId).setTrashed(true);
    db.remove(thisFile);
  }
}