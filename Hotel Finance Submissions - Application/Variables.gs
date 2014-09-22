var db = ScriptDb.getMyDb();
var permissionsDb = SingleStepPermissionsTest.newPermissionsDb;

var parentFolderId = "0B7NI9vvQipLwSUYxbFpPcXJxTEU"; //production folder
//var parentFolderId = "0B7dO6HAnTNrBM2EtSmdZZzBmSms"; //test folder

//var hotelFolderId = '0B7NI9vvQipLwMS04MTQ5ZmZlNS1jYTdlLTQzMTMtYjc2NS1jMjFiOTE0OWNkNmM' // PRI Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS01YWNkMTQ3YS04OGJmLTQ5ZTItYWUxZC1kZTQ5Nzg5Mjk2YWE' // SHE Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS0zNjhjOTdhMy1lOTZkLTRlMTQtYWYwMi0zODU0Y2U2OGIzMGQ' // TAN Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS00Y2FmMDA3Ny03MDA4LTRhNWItOGRhNS00YWRjNTlhOTlmODI' // DVA Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS05MTIyMDRkMy02NzdhLTQ0NzEtYmNkOS1hOWQ1OTk4MzVlMWU' // BAR Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS1lNDA4MDA0Zi1mYzQ5LTQ2ZWYtYjgyMi1hYjJlNzUwNjIxM2Q' // BEA Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS1jMGU3ODc3Mi05ZTc5LTQ0YzMtODc4Yy0zNWM3MGEyYTg1ZmY' // BES Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS1kYzJiYTMyYS1jMzNhLTQzOWQtYmNmYS1kMDlhN2E5ODY5OTk' // BOW Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS05ODU4YzIyZC0yZDZhLTQxMTgtYjllMC0zYTMyNDYwZGI1YWE' // BUR Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS05Yzc1N2I2Yi03MmQ4LTQ3YzUtYmI1MS03MTE2NzRkNzI4NjU' // CHE Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS00N2FjMTY0ZS0zNWU0LTQ5MDItYTZiOS1mMTM3NmFjMWE5NDY' // DCA Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS1lMzQ0ZDU0My01MDA2LTQxYjctODhjNi04NmFjOTAxMmJlZWE' // DCV Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS03NGJlMWMyOC02ZDVmLTQ2MmUtYmM1Ny00OWY2NDQ1YTEzNGE' // DEC Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS05YjExMTExMy1iYzNmLTQxMWYtYTI2Ny05YWM4ZjI0M2E0OWE' // DES Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS05YWQ5ZTM3Zi0wYjkzLTQ3YmQtYWM2My1jZWQwYmRmOTk4NmY' // DGO Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS00MTM4MTg3MS1jOTM2LTRjOTEtYTEwNi0xZGMxMTU0OTZhOWE' // DGU Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS03YWVhOTBmZC0yYmY4LTRmNTktOTQ2ZS0yYjU0MDY1NjdmOWM' // DOT Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS1iMDY4MjcyZC0wMjk3LTQ1NGYtOWQ0Yi00NzM3MDk2YTRjMTI' // DVS Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS1lOTFhZjQ4NC1iMjJlLTRmMzEtYmZlNi1hYTgxNTVjMmMyOWI' // DWV Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS02ZjM3ZWI0Ni00MDkyLTQ5ZmYtYTg4Zi1lMTlkYTkxZGQ2MWQ' // FRE Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS1iNjI2ZTlmNy05MGZkLTRkODEtYTE1MC05ODRkN2FhY2ZmZWE' // HAL Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS1jYTk4MWRiYi1mNzgwLTRlMGYtYmE0Zi00ODAxNDU0YWM1YTg' // KAN Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS0xM2E3NmY5Zi0yZThkLTQxMjAtODU4Yi0xZTA5Mjk5OGJkNzQ' // MEA Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS0yNDFkYTI1Yi1jN2U5LTQwMzktYWIxNy0yNzIxZjIzZGE5OTk' // MON Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS1jNGQ1YzEwYS0zMzY0LTQwYmEtODViZC1jZGZmOTE1MmQwYmM' // QUE Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS0zMGViYWQ3MC1lZjhhLTQ3NzUtOGExMC02ODJjMDY2N2JiZTY' // SSM Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS00NDQzZGFjYi02MzkwLTQ3MWMtODVjNC04YWY0OWM1OTBmOGE' // SUN Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS0xM2VkNzQ3My02ZDcxLTRmN2EtYTQ3Ni0wYjcxOGJlYjMwOGU' // TAW Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS00YWU0ZDMwZC1jMjc4LTQ4NDEtYjI3Ni1hMzQwMjkwZjBjZWY' // TRO Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS01NzkyY2Q3OS1lOTJmLTQzOGYtOTlhOC00YzhmMGFjOWQ2NWY' // VIC Finance Submissions
//var hotelFolderId = '0B7NI9vvQipLwMS03YmIwMzY4Yy04ZTllLTQ0NjYtODQ4ZS1kN2E3OWEzZTJjZDA' // WIN Finance Submissions


//function getProperties(){
//  var currentUser = Session.getActiveUser();
//  var propertyArray = new Array();
//  var hotelFolders = DriveApp.getFolderById(parentFolderId).getFolders();  
//  while (hotelFolders.hasNext()){
//    var thisHotel = hotelFolders.next();
//    if (thisHotel.getAccess(currentUser) != "NONE"){
//      propertyArray.push(thisHotel.getName().substring(0,3));
//    }
//  }
//  propertyArray.sort();
//  return propertyArray;
//}

var budgetUploadDeadline = new Date(2014,09,09,03,00); //Note: Month and day (second and third value) is 0-based

function getProperties(){
  var currentUser = Session.getActiveUser();
  var propertyArray = new Array();
  var result = permissionsDb.query({user: currentUser.getEmail()});
  while (result.hasNext()){
    propertyArray.push(result.next().hotel);
  }
  propertyArray.sort();
  return propertyArray;
}

function getOwnedHotels(){
  var propertyArray = getProperties();
  var ownedHotels = new Array(
    "BOW",
    "BES",
    "DES",
    "FRE",
    "DGO",
    "MON",
    "QUE",
    "VIC",
    "TAW",
    "DOT"
  );
  var finalList = new Array();
  for (a in propertyArray){
    for (b in ownedHotels){
      if (propertyArray[a] === ownedHotels[b]){
          finalList.push(ownedHotels[b]);
      }
    }
  }
  Logger.log(finalList);
  return finalList;
}

function getReviewedHotels(){
  var propertyArray = getProperties();
  var reviewedHotels = new Array(
    'BES',
    'BOW',
    'DES',
    'DGO',
    'DOT',
    'FRE',
    'MON',
    'QUE',
    'VIC',
    'KAN',
    'SSM',
    'DGU',
    'TOR'
  );
  var finalList = new Array();
  for (a in propertyArray){
    for (b in reviewedHotels){
      if (propertyArray[a] === reviewedHotels[b]){
          finalList.push(reviewedHotels[b]);
      }
    }
  }
  Logger.log(finalList);
  return finalList;
}

function getBudgetReports(){
  var reportArray = new Array(
	"4yr Compare Book (FCST)",
   	"4yr Compare Book (11th Edition)",
    "4yr Compare P&L Summary",
    "4yr Compare Rooms Revenue Analysis",
    "4yr Compare F&B Analysis",
    "Line by Line Analysis",
    "Budget Retention Calculator w/notes",
    "5 Yr Capital Plan",
    "Rooms Day by Day",
    "Top Accounts",
    "Power Point Presentation",
    "Business Plan",
    "Asset Management Plan",
    "F&B Marketing Initatives",
    "2015 Budget Cost Guidelines",
    "Mapping Template - 11th USALI Edition",
    "Proforma",
    "Capital Reserve Account Reconciliation"
  );
  return reportArray;
}

function getMonthlyReports(){
  var reportArray = new Array(
    "Capital",
    "Corporate Fees",
    "Month-End Commentary",
    "Other",
    "Hotel Reviews"
  );    
  return reportArray;  
}

function getOhrReports(){
  var reportArray = new Array(
    'Hotel Organizational Chart',
    'SWOT',
    '10 Year Proforma',
    'Power Point Presentation',
    'GSAT',
    'F&B Report',
    'Summary Income Statement',
    'Summary of Hotel\'s Capital Plan',
    'STR Report'
  );
  return reportArray;
}

function getCategories(){
  var categoryArray = new Array(
    "Budget",
//    "Monthly",
    "Hotel Reviews"
  );
  return categoryArray;
}

function getYears(){
  var yearArray = new Array(
    "2013",
    "2014",
    "2015"
  );
  return yearArray;
}

function getMonths(){
  var monthArray = new Array(
    "01 - JAN",
    "02 - FEB",
    "03 - MAR",
    "04 - APR",
    "05 - MAY",
    "06 - JUN",
    "07 - JUL",
    "08 - AUG",
    "09 - SEP",
    "10 - OCT",
    "11 - NOV",
    "12 - DEC"
  );
  
  return monthArray;
}