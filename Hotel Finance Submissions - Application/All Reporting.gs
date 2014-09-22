//You need to setup a way to delete results list
//Recommend Button or checkbox, include FileId as value

function allReporting(e){
  var app = UiApp.createApplication().setTitle("Hotel Finance Submission Reporting");
  var myFormPanel = app.createFormPanel().setTitle("myFormPanel");  
  var myGrid = app.createGrid(10,10).setTitle("myGrid");
  
  //Setup Labels
  myGrid.setWidget(0,0,
                   app.createLabel("Choose Category")
                   );
  myGrid.setWidget(1,0,
                   app.createLabel("Choose Property")
                   );
  myGrid.setWidget(2,0,
                   app.createLabel("Choose Year")
                   );
//  myGrid.setWidget(3,0,
//                   app.createLabel("Choose Month")
//                   );  
  myGrid.setWidget(3,0,
                   app.createLabel("Choose Report")
                   );  

  //Setup Fields
  myGrid.setWidget(4,1,
                   app.createSubmitButton()
                   .setText("Get Records")
                   .setTitle("submitButton")
                   );
  
  //Setup List Boxes
  var properties = getProperties();
  var years = getYears();
//  var months = getMonths();
  var categories = getCategories();
  var propertyBox = app.createListBox();
  var yearBox = app.createListBox();
  yearBox.addItem("All Years");
//  var monthBox = app.createListBox();
  var categoryBox = app.createListBox();
  categoryBox.addItem("");
  var reportBox = app.createListBox();
  
//  for (p in properties){
//    propertyBox.addItem(properties[p]);
//  }
  
  for (y in years){
    yearBox.addItem(years[y]);
  }
  
//  for (m in months){
//    monthBox.addItem(months[m]);
//  }
//  monthBox.setEnabled(false);  
  
  for (c in categories){
    categoryBox.addItem(categories[c]);
  }
  
//  reportBox.addItem("All Budget Reports");
//  var budgetReports = getBudgetReports();
//  for (b in budgetReports){
//    reportBox.addItem(budgetReports[b]);
//  }
  
  myGrid.setWidget(0,1,
                   categoryBox
                   .setName("categoryBox")
                   .setTitle("categoryBox")
                   .setId("categoryBox")
                   );  
  myGrid.setWidget(1,1,
                   propertyBox
                   .setName("propertyBox")
                   .setTitle("propertyBox")
                   .setId("propertyBox")                   
                   );
  
  myGrid.setWidget(2,1,
                   yearBox
                   .setName("yearBox")
                   .setTitle("yearBox")
                   .setId("yearBox")                   
                   );
//  myGrid.setWidget(3,1,
//                   monthBox
//                   .setName("monthBox")
//                   .setTitle("monthBox")
//                   .setId("monthBox")                   
//                   );
  myGrid.setWidget(3,1,
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
                   .setText("allReporting")
                   .setName("appType")
                   .setTitle("appType")
  ); 
  
  //Adding Pieces to UI
  app.add(
    app
    .createLabel()
    .setText("All Reporting Form")
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
  var reportChangeHandler = app.createServerHandler('updateReportListBox').addCallbackElement(myFormPanel);
  categoryBox.addChangeHandler(reportChangeHandler); 
  
  return app;
}


function updateReportListBox(e){
  var app = UiApp.getActiveApplication();
  //first listbox item selected
  var categoryBox = e.parameter.categoryBox;

  Logger.log(categoryBox);
  var reportBox = app.getElementById('reportBox');
  var propertyBox = app.getElementById("propertyBox");
//  var monthBox = app.getElementById("monthBox");  
  Logger.log(reportBox);
  reportBox.clear();//remove all items from lb2

  if(categoryBox == 'Budget'){
    var reports = getBudgetReports();
    var properties = getProperties();
    reportBox.clear();
    propertyBox.clear();
//    monthBox.setEnabled(false);
    reportBox.addItem("All Budget Reports");    
    for (r in reports){
      reportBox.addItem(reports[r]);
    }
  propertyBox.addItem("All Hotels");
    for (p in properties){
      propertyBox.addItem(properties[p]);
    }    
  }
  else if(categoryBox == 'Monthly'){
    var reports = getMonthlyReports();
    var properties = getProperties();
    reportBox.clear();
    propertyBox.clear();
//    monthBox.setEnabled(true);
    reportBox.addItem("All Monthly Reports");    
    for (r in reports){
      reportBox.addItem(reports[r]);
    }
    propertyBox.addItem("All Hotels");
    for (p in properties){
      propertyBox.addItem(properties[p]);
    }
  }
  else if(categoryBox == 'Hotel Reviews'){    
    var reports = getOhrReports();
    var hotels = getReviewedHotels();
    reportBox.clear();
    propertyBox.clear();
//    monthBox.setEnabled(true);    
    reportBox.addItem("All Reports");    
    for (r in reports){
      reportBox.addItem(reports[r]);
    }
    propertyBox.addItem("All Hotels");    
    for (h in hotels){
      propertyBox.addItem(hotels[h]);
    }
  }

  return app;
}

function listAllReports(property, year, month, category, report){
//need to include category
  var app = UiApp.getActiveApplication();
  
  
  
//build search terms
  if (property === "All Hotels"){
    var searchProperty = db.anyValue();
  } else {
    var searchProperty = property; // + " Finance Submissions";
  }
  
  if (year === "All Years"){
    var searchYear = db.anyValue();
  } else {
    var searchYear = year;
  }

//  if (month === "All Months"){
//    var searchMonth = db.anyValue();
//  } else {
//    var searchMonth = month;
//  }
  
  if (report === "All Budget Reports" | report === "All Monthly Reports" | report === "All OHR Reports"){
    var searchReport = db.anyValue();
  } else {
    var searchReport = report;
  }
  
  var searchCategory = category;
  
  var result = db.query({
    type: "file",
    property: searchProperty,
    year: searchYear,
//    month: searchMonth,
    category: searchCategory,
    report: searchReport
  }).sortBy("property");

  var myVerticalPanel = app.createVerticalPanel();  
  
//Used to generate info on search result page for user to give to IT for troubleshooting. Info is outline of DB search terms.
  if (result.getSize() == 0){
    var itInfo = "<blockquote>";
    itInfo += "Type : All Reporting <br>";
    itInfo += "Property : " + property + "<br>";
    itInfo += "Year : " + year + "<br>";
//    itInfo += "Month : " + month + "<br>";
    itInfo += "Category : " + category + "<br>";
    itInfo += "Report : " + report + "<br>";    
    itInfo += "</blockquote>"; 
    app.add(
      app.createLabel()
      .setText("Your search returned no results. If there should be results , please provide the following information to IT")
    );
    app.add(
      app.createHTML(itInfo)
    );
  } else {  
    while (result.hasNext()){
      var thisFile = result.next();
      var displayText = thisFile.year + " - " + thisFile.property + " - " + thisFile.report;
      myVerticalPanel.add(app.createAnchor(
        displayText,
        thisFile.fileUrl
      ));      
    }
  }
  
  var myScrollPanel = app.createScrollPanel().setSize('600', '200');
  myScrollPanel.add(myVerticalPanel);
  app.add(myScrollPanel);
  return app;
}


