function deleteFile(fileId){
  
  var result = db.query({
    type: "file",
    fileId: fileId
  });
  
  while (result.hasNext()){
    var thisFile = result.next();
    DriveApp.getFileById(thisFile.fileId).setTrashed(true);
    db.remove(thisFile);
  }
}