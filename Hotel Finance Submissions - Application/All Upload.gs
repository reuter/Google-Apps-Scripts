function allSubmission(e){
  var app = UiApp.createApplication().setTitle("Hotel Finance Submission Form");
  var myFormPanel = app.createFormPanel().setTitle("myFormPanel");
  var myGrid = app.createGrid(10,10);
  
  //Setup Labels
  myGrid.setWidget(0,0,
                   app.createLabel("Choose Category")
                   );
  myGrid.setWidget(1,0,
                   app.createLabel("Choose File")
                   );
  myGrid.setWidget(2,0,
                   app.createLabel("Choose Property")
                   );
  myGrid.setWidget(3,0,
                   app.createLabel("Choose Year")
                   );
//  myGrid.setWidget(4,0,
//                   app.createLabel("Choose Month")
//                   );  
  myGrid.setWidget(4,0,
                   app.createLabel("Choose Report")
                   );

  //Setup Fields
  myGrid.setWidget(1,1,
                   app.createFileUpload()
                   .setName("myFile")
                   .setTitle("myFile")
                   );
  myGrid.setWidget(5,1,
                   app.createSubmitButton()
                   .setText("Upload")
                   .setTitle("submitButton")
                   .setId("submitButton")
                   );
  
  //Setup List Boxes
  var properties = getProperties();
  var years = getYears();
//  var months = getMonths();
  var categories = getCategories();
  var reports = getBudgetReports();
  var propertyBox = app.createListBox();
  var yearBox = app.createListBox();
//  var monthBox = app.createListBox();
  var categoryBox = app.createListBox();
  categoryBox.addItem("");
  var reportBox = app.createListBox();
  
  for (p in properties){
    propertyBox.addItem(properties[p]);
  }
  
  for (y in years){
    yearBox.addItem(years[y]);
  }
  
  for (c in categories){
    categoryBox.addItem(categories[c]);
  }
  for (r in reports){
    reportBox.addItem(reports[r]);
  }
  
  myGrid.setWidget(0,1,
                   categoryBox
                   .setName("categoryBox")
                   .setTitle("categoryBox")
                   .setId("categoryBox")                   
                   );
  myGrid.setWidget(2,1,
                   propertyBox
                   .setName("propertyBox")
                   .setTitle("propertyBox")
                   .setId("propertyBox")
                   );
  myGrid.setWidget(3,1,
                   yearBox
                   .setName("yearBox")
                   .setTitle("yearBox")
                   .setId("yearBox")                   
                   );
//  myGrid.setWidget(4,1,
//                   monthBox
//                   .setName("monthBox")
//                   .setTitle("monthBox")
//                   .setId("monthBox")                   
//                   );
  myGrid.setWidget(4,1,
                   reportBox
                   .setName("reportBox")
                   .setTitle("reportBox")
                   .setId("reportBox")                   
                   );

  //Setting hidden value for Post Processing Detection
  myGrid.setWidget(9,9,
                   app
                   .createTextBox()
                   .setVisible(false)
                   .setText("uploadFile")
                   .setName("appType")
                   .setTitle("appType")
                   .setId("appType")
  );
  
  //Adding Pieces to UI
  app.add(
    app
    .createLabel()
    .setText("Hotel Finance Submission Form")
    .setStyleAttributes({
      "font-weight": "bold",
      "font-size": "1.1em",
      "padding": "0px 5px 0px 5px",
      "text-decoration": "underline"
    })
  )
  myFormPanel.add(myGrid);
  app.add(myFormPanel);
  
  //dynamcially build Report Box
  var reportChangeHandler = app.createServerHandler('updateListBoxes').addCallbackElement(myFormPanel);
  categoryBox.addChangeHandler(reportChangeHandler);   
  
  return app;
  
}

function updateListBoxes(e){
  var app = UiApp.getActiveApplication();
  //first listbox item selected
  var categoryBox = e.parameter.categoryBox;

  Logger.log(categoryBox);
  var reportBox = app.getElementById('reportBox');
//  var monthBox = app.getElementById("monthBox");
  var yearBox = app.getElementById("yearBox");
  var propertyBox = app.getElementById("propertyBox");
  var uploadButton = app.getElementById("submitButton");  
  Logger.log(reportBox);
  
  yearBox.clear();
  reportBox.clear();
  propertyBox.clear();

  if(categoryBox == 'Budget'){
    var reports = getBudgetReports();
//    monthBox.clear();
    yearBox.addItem("2015");
    var properties = getProperties();
    uploadButton.setEnabled(true);
    for (r in reports){
      reportBox.addItem(reports[r]);
    }
    for (p in properties){
      propertyBox.addItem(properties[p]);
    }
  }
//  else if(categoryBox == 'Monthly'){
//    var reports = getMonthlyReports();
//    var months = getMonths();    
//    for (r in reports){
//      reportBox.addItem(reports[r]);
//    }
//    for (m in months){
//      monthBox.addItem(months[m]);
//    }    
//  }
  else if(categoryBox == 'Hotel Reviews'){    
    var reports = getOhrReports();
    Logger.log("calling variable");
    var reviewedHotels = getReviewedHotels();
//    monthBox.clear();
    for (r in reports){
      reportBox.addItem(reports[r]);
    }
    if (reviewedHotels.length > 0){
      for (p in reviewedHotels){
        propertyBox.addItem(reviewedHotels[p]);
      }
      uploadButton.setEnabled(true);
    } else {
      propertyBox.addItem("No Hotels");
      uploadButton.setEnabled(false);
    }
    //modify years, custom
    yearBox.addItem("2014");
  }

  return app;
}


function allUpload(file, property, year, month, category, report){
  switch(category){
      case "Budget":
        var app = uploadBudgetFile(file, property, year, report);
        break;
//      case "Monthly":
//        uploadMonthlyFile(file, property, year, month, report);
//        break;
      case "Hotel Reviews":
        uploadOhrFile(file, property, year, report);
        break;
      default:
          var app = UiApp.createApplication().setTitle("You have not chosen a method");
          app.add(app.createLabel().setText("You have not chosen a method"));
  }
  return app;  
}