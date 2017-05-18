'use strict';

export default class ReportsService {

  static get UID(){
    return "ReportsService";
  }

  clearData(){
    this.data = {};
    this.params = null;
    this.hasTakeawayVenue = null;
    this.hasEventVenue = null;
  }

  saveDataReport(data){

    if(!this.data ){
      this.data = data;
      return;
    }

    Object.keys(data).some((k) => {
        this.data[k] = data[k];
    });

    return this.data;
  }

  prepareDataToNotification(rowsSelected){
    var data = {
      venueIds: this.data.venueIds,
      users: []
    }

    rowsSelected.forEach((row) => {
      let colCustomer = row.filter((col) => {
        if( col.key == 'customerName' && col.userid)
          return col;
      });

      if(colCustomer[0])
        data.users.push(colCustomer[0].userid);
    });

    return data;
  }

  // HIDDEN Columns are used in eexport PDF/CSV only. They are not printed in screen.
  prepareDataToTable(reportId){

    var data = this.data && this.data[reportId] ? this.data[reportId] : [];
    //var data = [{"menuitemid":8965,"name":"Rabbit Terrine","itemcount":5,"itemtotal":311.85},{"menuitemid":8966,"name":"Pumpkin Soup","itemcount":2,"itemtotal":90},{"menuitemid":8972,"name":"Roast Beef","itemcount":48,"itemtotal":1035},{"menuitemid":11354,"name":"Douwe Egberts Coffee","itemcount":1,"itemtotal":2},{"menuitemid":11356,"name":"Gourmet Hot Chocolate","itemcount":1,"itemtotal":2},{"menuitemid":12354,"name":"Full Time Deal","itemcount":2,"itemtotal":11},{"menuitemid":12359,"name":"Half Price Pie Offer","itemcount":1,"itemtotal":3},{"menuitemid":922200,"name":"Roast Lamb","itemcount":8,"itemtotal":360},{"menuitemid":922201,"name":"Roast Chicken","itemcount":13,"itemtotal":600},{"menuitemid":922202,"name":"Nut Roast","itemcount":11,"itemtotal":221},{"menuitemid":922203,"name":"Christmas Pudding","itemcount":3,"itemtotal":70},{"menuitemid":922204,"name":"Treacle Tart","itemcount":1,"itemtotal":8},{"menuitemid":922205,"name":"Apple Pie","itemcount":3,"itemtotal":4.95},{"menuitemid":924238,"name":"£10 Jason's Cafe Voucher","itemcount":3,"itemtotal":30},{"menuitemid":980744,"name":"12 Glazed Doughnuts","itemcount":2,"itemtotal":20},{"menuitemid":980745,"name":"12 Ring Doughnuts","itemcount":2,"itemtotal":10},{"menuitemid":980746,"name":"4 Milk Chocolate Cookies","itemcount":2,"itemtotal":202},{"menuitemid":980747,"name":"4 White Chocolate Cookies","itemcount":2,"itemtotal":4},{"menuitemid":980759,"name":"Meal deal","itemcount":15,"itemtotal":400},{"menuitemid":980771,"name":"Tuna Sandwich","itemcount":1,"itemtotal":2.75},{"menuitemid":980772,"name":"Chicken Wrap","itemcount":1,"itemtotal":2.5},{"menuitemid":980773,"name":"Mature cheddar cheese","itemcount":1,"itemtotal":2.1},{"menuitemid":980774,"name":"Coke Cola","itemcount":1,"itemtotal":2},{"menuitemid":980775,"name":"Diet Coke","itemcount":1,"itemtotal":2},{"menuitemid":980776,"name":"Fanta","itemcount":2,"itemtotal":3},{"menuitemid":980777,"name":"£3 Sandwich Deal","itemcount":5,"itemtotal":36},{"menuitemid":981063,"name":"dasdasdasd","itemcount":35,"itemtotal":393},{"menuitemid":981064,"name":"HUEE","itemcount":8,"itemtotal":660},{"menuitemid":981065,"name":"MY TEST ITEM","itemcount":16,"itemtotal":1705},{"menuitemid":981880,"name":"MY TEST ITEM","itemcount":14,"itemtotal":832},{"menuitemid":981887,"name":"New Item Single Size","itemcount":7,"itemtotal":149.08},{"menuitemid":981888,"name":"New item Multiple Sized","itemcount":10,"itemtotal":29.79},{"menuitemid":981892,"name":"test mult size","itemcount":1,"itemtotal":2},{"menuitemid":981900,"name":"test item on menu 12345","itemcount":5,"itemtotal":133}];
    var viewTable = {
      header: this.getReportHeader(reportId),
      body: []
    };

    data.forEach((row) => {

      let rowObj = [];
      viewTable.header.forEach((head) => {
        let colObj = {};
        if(row.hasOwnProperty(head.key)){

          // Events are exported to pdf/csv as Date Time - Event name, so need treat it here.
          if(head.key == 'eventName' && row['eventTime'])
            colObj.value = moment(row['eventTime']).format('L') +" "+moment(row['eventTime']).format('LT') +' - ' + row[head.key];
          else
            colObj.value = row[head.key];

        }
        else{
          colObj.value = "-";
        }

        colObj.fieldType = head.fieldType;
        colObj.key = head.key;
        colObj.isHidden = head.isHidden ? head.isHidden : false;

        // AUX properties that are used to Push Notification
        if(row['userid'])
          colObj.userid = row['userid'];

        rowObj.push(colObj);
      });

      viewTable.body.push(rowObj);
    });

    return viewTable;
  }

  // need to show/ hide some fields based on Events/Takeaway properties from header. AND based on Filters used to search
  prepareDataToCsv(report, dataSelected){
    var minDate = moment(this.params.minCreated).format("L");
    var maxDate = moment(this.params.maxCreated).format("L");

    var header = this.getReportHeader(report.id);
    var reportTitle = report.name;

    var response = [[minDate +' - '+ maxDate],[reportTitle]];

    var itemData = [];
    header.forEach((col) => {

      if((!col.showToEventsOnly && !col.showToTakeawaysOnly) || (col.showToEventsOnly && this.hasEventVenue) || (col.showToTakeawaysOnly && this.hasTakeawayVenue))
        itemData.push(col.text);
    });

    response.push(itemData);

    dataSelected.forEach((row) => {

      itemData = [];
      row.forEach((col) => {

        let headerCol = header.filter((x) => {
          if(x.key == col.key)
            return x;
        })[0];

        if((!headerCol.showToEventsOnly && !headerCol.showToTakeawaysOnly) || (headerCol.showToEventsOnly && this.hasEventVenue) || (headerCol.showToTakeawaysOnly && this.hasTakeawayVenue)){

          if(col.value === true)
            itemData.push(this.gettextCatalog.getString('Yes'));
          else if(col.value === false)
            itemData.push(this.gettextCatalog.getString('No'));
          else if(col.fieldType == 'currency')
            itemData.push(this.$filter('currency')(col.value));
          else if(col.fieldType == 'number')
            itemData.push(this.$filter('currency')(col.value,true,0));
          else if(col.fieldType == 'percent')
            itemData.push(this.$filter('percent')(col.value));
          else if(col.fieldType == 'date')
            itemData.push(this.$filter('datelocale')(col.value));
          else if(col.fieldType == 'dayOfWeek')
            itemData.push(this.$filter('datelocale')(col.value, 'dayOfWeek'));
          else if(col.fieldType == 'timeOfDay')
            itemData.push(this.$filter('datelocale')(col.value, 'timeOfDay'));
          else
            itemData.push(col.value);
        }
      });

      response.push(itemData);
    });

    return {data: response };
  }

  // need to show/ hide some fields based on Events/Takeaway properties from header. AND based on Filters used to search
  prepareDataToPdf(report, dataSelected){
    var header = this.getReportHeader(report.id);
    var reportTitle = report.name;

    var response = {};

    header.forEach((col) => {
      if((!col.showToEventsOnly && !col.showToTakeawaysOnly) || (col.showToEventsOnly && this.hasEventVenue) || (col.showToTakeawaysOnly && this.hasTakeawayVenue))
        response[col.text] = [];
    });

    dataSelected.forEach((row) => {

      row.forEach((col) => {

        let headerCol = header.filter((x) => {
          if(x.key == col.key)
            return x;
        })[0];

        if((!headerCol.showToEventsOnly && !headerCol.showToTakeawaysOnly) || (headerCol.showToEventsOnly && this.hasEventVenue) || (headerCol.showToTakeawaysOnly && this.hasTakeawayVenue)){

          if(col.value === true)
            response[headerCol.text].push(this.gettextCatalog.getString('Yes'));
          else if(col.value === false)
            response[headerCol.text].push(this.gettextCatalog.getString('No'));
          else if(col.fieldType == 'currency')
            response[headerCol.text].push(this.$filter('currency')(col.value));
          else if(col.fieldType == 'number')
            response[headerCol.text].push(this.$filter('currency')(col.value,true,0));
          else if(col.fieldType == 'percent')
            response[headerCol.text].push(this.$filter('percent')(col.value));
          else if(col.fieldType == 'date')
            response[headerCol.text].push(this.$filter('datelocale')(col.value));
          else if(col.fieldType == 'dayOfWeek')
            response[headerCol.text].push(this.$filter('datelocale')(col.value, 'dayOfWeek'));
          else if(col.fieldType == 'timeOfDay')
            response[headerCol.text].push(this.$filter('datelocale')(col.value, 'timeOfDay'));
          else
            response[headerCol.text].push(col.value);
        }
      });

    });

    var pdfObj = {
        title: reportTitle,
        startDate:moment( this.params.minCreated).valueOf(),
        endDate:moment( this.params.maxCreated).valueOf(),
        dataJson:JSON.stringify(response)
    };

    if(report.orientation)
      pdfObj.orientation = report.orientation;

    return pdfObj;
  }

  getChartExportCsvUrl(){
    return '/api/accounts/'+ this.accountId + '/exports/csv/post';
  }

  getChartExportPdfUrl(){
    return '/api/accounts/'+ this.accountId + '/exports/pdfs/post';
  }

  exportReportToPdf(report, dataSelected){

    return this.$q((resolve, reject) => {
      let udata = this.prepareDataToPdf(report, dataSelected);

      var exportUrl = '/api/accounts/'+ this.accountId + '/exports/pdfs/report';
      // ..
      // TO DO - Create a post method to dont need to Use Form request on Controller.
      // ..    

      resolve({data: udata, url: exportUrl});
    });

  }

  exportReportToCsv(report, dataSelected){

    return this.$q((resolve, reject) => {

      let udata = this.prepareDataToCsv(report, dataSelected);

      var exportUrl = '/api/accounts/' + this.accountId + '/exports/csv/report';
      // ..
      // TO DO - Create a post method to dont need to Use Form request on Controller.
      // ..   
      resolve({data: udata, url: exportUrl});
    });
  }

  sendPushNotification( rowsSelected ,textMessage){

    var params = this.prepareDataToNotification(rowsSelected);

    params.message = textMessage;

    return this.$q((resolve,reject)=>{

      Preoday.Report.sendNotifyCustomers(params)
        .then((data)=>{

          resolve(data);
        }, (err)=>{
          console.error("Pushing notification Error : ", err)
          reject();
      }).catch((err)=>{
        console.error("Pushing notification Error : ", err)
        reject();
      })
     })
  }

  getVenuesApplications(venuesIds){
    return this.$q((resolve,reject)=>{
      //  resolve([]);
      Preoday.Report.getVenuesApplications(venuesIds)
        .then((data)=>{

          resolve(data);
        }, (err)=>{
          console.error("ReportService - Error fetching apps : ", err)
          reject();
      }).catch((err)=>{
        console.error("ReportService - Error fetching apps : ", err)
        reject();
      })
      });
  }

  getReportData(parameters){

   this.formatDataFilters(parameters);

    return this.$q((resolve,reject)=>{
      //  resolve([]);
      Preoday.Report.getReports(this.params)
        .then((data)=>{

          this.saveDataReport(data);

          resolve(this.data);
        }, (err)=>{
          console.error("ReportService - Error fetching reportdata : ", err)
          reject();
      }).catch((err)=>{
        console.error("ReportService - Error fetching reportdata : ", err)
        reject();
      })
      })

  }

  getMenuItemsByVenues(venues){

    this.formatDataFilters(venues);

    return this.$q((resolve,reject)=>{
        // resolve([]);
      Preoday.Report.getMenuItemsByVenues(this.params)
        .then((data)=>{

          resolve(data);
        }, (err)=>{
          console.error("ReportService - Error fetching item : ", err)
          reject();
      }).catch((err)=>{
        console.error("ReportService - Error fetching item: ", err)
        reject();
      })
    })
  }

  formatDataFilters(parameters){

    var response = {};

    if(parameters.report)
      response.reportType = parameters.report.reportType;  

    if(parameters.datesRange && parameters.datesRange.endDate && parameters.datesRange.startDate){
      response.minCreated = moment(parameters.datesRange.startDate, "L").valueOf();
      response.maxCreated = moment(parameters.datesRange.endDate, "L").endOf('day').valueOf();
    }

    if(parameters.events && parameters.events.length > 0){
      response.events = [];

      parameters.events.forEach((ev) => {
        let event = {};
        event.eventid = ev.id;
        event.eventname = ev.name;
        event.eventtime = ev.startDate;

        response.events.push(event);
      });
    }

    if(parameters.item){
      response.menuItemId = parameters.item.menuItemId;
    }

    if(parameters.venues){

      response.venueIds = [];
      response.outletIds = [];

      var isEventVenue = null;
      var isTakeaway = null;
      parameters.venues.forEach((x) => {

        if(x.isEventVenue == 1)
          isEventVenue = true;

        if(x.isEventVenue == 0)
          isTakeaway = true;

        response.venueIds.push(x.id);

         if(x.outlets){

            x.outlets.forEach((o) => {
             response.outletIds.push(o.id);
            });
         }
      });
    }

    this.params = response;
    this.hasTakeawayVenue = isTakeaway ? true : false;
    this.hasEventVenue = isEventVenue ? true : false;

    return this.params;
  }

  getReports(reportTypes, options){
    return this.$q((resolve, reject) =>{
      var response = [];

      this.reportsOptions = options;

      reportTypes.forEach((r) => {
        response = response.concat(this.getReportsPerType(r));
      });
      //return response;
      resolve(response);
    });

  }

  // Everytime a search is done, this service keeps the last Param and Data returned.
  constructor($q , ReportTypes, $filter, gettextCatalog, CardActionsCodes, VenueService) {
    "ngInject";
    this.$q = $q;
    this.$filter = $filter;
    this.ReportTypes = ReportTypes;
    this.gettextCatalog = gettextCatalog;
    this.cardActionsCodes = CardActionsCodes;
    this.accountId = VenueService.currentVenue.accountId;
  }

  // Object Properties:
  //  - key -> its the exactly object key coming from API
  //  - text -> text to be show in Header
  //  - fieldType -> some specific types to format fields correctly to be show (like currency, percent, number, etc)
  //  - isHidden -> when exporting to PDF/CSV there are some fields that are not displayed on the screen. So i add these fields to the table, but hide them
  //  - showToEventsOnly/showToTakeawaysOnly -> these fields are used in export PDF/CSV only if ther are any field that should be visible for Events or Takeaway venue only..
  getReportHeader(reportId){
    var response = [];

    // STOCK
    if(reportId== 'allItemsSold'){
      response = [
        {key:'name' ,text:this.gettextCatalog.getString('Name')},
        {key:'itemcount', text:this.gettextCatalog.getString('Quantity'), fieldType: 'number'},
        {key:'itemtotal', text:this.gettextCatalog.getString('Revenue'), fieldType: 'currency'}
      ];
    }
    else if(reportId== 'popularityIncreasing'){
      response = [
        {key:'name' ,text:this.gettextCatalog.getString('Name')},
        {key:'countLastMonth', text:this.gettextCatalog.getString('Sold last 30 days'), fieldType: 'number'},
        {key:'countPreviousMonth', text:this.gettextCatalog.getString('Sold previous 30 days'), fieldType: 'number'},
        {key:'rate', text:this.gettextCatalog.getString('% increase'), fieldType: 'percent'}
      ];
    }
    else if(reportId== 'popularityDecreasing'){
      response = [
        {key:'name' ,text:this.gettextCatalog.getString('Name')},
        {key:'countLastMonth', text:this.gettextCatalog.getString('Sold last 30 days'), fieldType: 'number'},
        {key:'countPreviousMonth', text:this.gettextCatalog.getString('Sold previous 30 days'), fieldType: 'number'},
        {key:'rate', text:this.gettextCatalog.getString('% decrease'), fieldType: 'percent'}
      ];
    }
    else if(reportId== 'revenueIncreasing'){
      response = [
        {key:'name' ,text:this.gettextCatalog.getString('Name')},
        {key:'revenueLastMonth', text:this.gettextCatalog.getString('Revenue last 30 days'), fieldType: 'currency'},
        {key:'revenuePreviousMonth', text:this.gettextCatalog.getString('Revenue previous 30 days'), fieldType: 'currency'},
        {key:'rate', text:this.gettextCatalog.getString('% increase'), fieldType: 'percent'}
      ];
    }
    else if(reportId== 'revenueDecreasing'){
      response = [
        {key:'name' ,text:this.gettextCatalog.getString('Name')},
        {key:'revenueLastMonth', text:this.gettextCatalog.getString('Revenue last 30 days'), fieldType: 'currency'},
        {key:'revenuePreviousMonth', text:this.gettextCatalog.getString('Revenue previous 30 days'), fieldType: 'currency'},
        {key:'rate', text:this.gettextCatalog.getString('% decrease'), fieldType: 'percent'}
      ];
    }
    //ORDERS
    else if(reportId== 'orders'){
      response = [
        {key:'id' ,text:this.gettextCatalog.getString('#') },
        {key:'eventName' ,text:this.gettextCatalog.getString('Event'), isHidden: true , showToEventsOnly: true},
        {key:'outletName' ,text:this.gettextCatalog.getString('Outlet'), isHidden: true},
        {key:'pickupSlot' ,text:this.gettextCatalog.getString('Collection'), isHidden: true , showToEventsOnly: true},
        {key:'date', text:this.gettextCatalog.getString('Date'), fieldType: 'date'},
        {key:'customerName', text:this.gettextCatalog.getString('Customer')},
       // {key:'userid' ,text:this.gettextCatalog.getString('#') , isHidden: true},
        {key:'items', text:this.gettextCatalog.getString('Items')},
        //{key:'subtotal' ,text:this.gettextCatalog.getString('Subtotal'),fieldType: 'currency', isHidden: true},
        {key:'discount', text:this.gettextCatalog.getString('Discount'), fieldType: 'currency'},
        {key:'fee', text:this.gettextCatalog.getString('Fees'), fieldType: 'currency'},
        {key:'total', text:this.gettextCatalog.getString('Total'), fieldType: 'currency'},
        //{key:'orderStatus' ,text:this.gettextCatalog.getString('Status'), isHidden: true , showToTakeawaysOnly: true},
      ];
    }
    else if(reportId== 'taxReport'){
      response = [
        {key:'orderId' ,text:this.gettextCatalog.getString('#')},
        {key:'taxRate', text:this.gettextCatalog.getString('Tax rate'), fieldType: 'percent'},
        {key:'total', text:this.gettextCatalog.getString('Price (inc. tax)'), fieldType: 'currency'},
        {key:'net', text:this.gettextCatalog.getString('Price (ex. tax)'), fieldType: 'currency'},
        {key:'tax', text:this.gettextCatalog.getString('Tax paid'), fieldType: 'currency'},
        {key:'paymentType', text:this.gettextCatalog.getString('Payment method')},
      ];
    }
    else if(reportId== 'busiestDays'){
      response = [
        {key:'day' ,text:this.gettextCatalog.getString('Day'), fieldType: 'dayOfWeek'},
        {key:'date', text:this.gettextCatalog.getString('Date'), fieldType: 'date'},
        {key:'orderCount', text:this.gettextCatalog.getString('Orders')},
        {key:'customerCount', text:this.gettextCatalog.getString('Customers')},
        {key:'orderTotal', text:this.gettextCatalog.getString('Revenue'), fieldType: 'currency'}
      ];
    }
    else if(reportId== 'busiestHours'){
      response = [
        {key:'timeSlot' ,text:this.gettextCatalog.getString('Timeslot')},
        {key:'orderCount', text:this.gettextCatalog.getString('Orders')},
        {key:'customerCount', text:this.gettextCatalog.getString('Customers')},
        {key:'orderTotal', text:this.gettextCatalog.getString('Revenue'), fieldType: 'currency'}
      ];
    }
    else if(reportId== 'busiestEvents'){
      response = [
        {key:'eventname' ,text:this.gettextCatalog.getString('Name')},
        {key:'eventDate' ,text:this.gettextCatalog.getString('Date'), fieldType: 'date'},
        {key:'eventtime', text:this.gettextCatalog.getString('Time'), fieldType: 'timeOfDay'},
        {key:'orderCount', text:this.gettextCatalog.getString('Orders')},
        {key:'customerCount', text:this.gettextCatalog.getString('Customers')},
        {key:'orderTotal', text:this.gettextCatalog.getString('Revenue'), fieldType: 'currency'}
      ];
    }
    //CUSTOMERS
    else if(reportId== 'newAreas'){
      response = [
        {key:'date' ,text:this.gettextCatalog.getString('Date requested'), fieldType: 'date'},
        {key:'area' ,text:this.gettextCatalog.getString('Area')},
        {key:'email', text:this.gettextCatalog.getString('Email')}
      ];
    }
    else if(reportId== 'newCustomers'){
      response = [
        {key:'customerName' ,text:this.gettextCatalog.getString('Name')},
        //{key:'userid' ,text:this.gettextCatalog.getString('#') , isHidden: true},
        {key:'signindate', text:this.gettextCatalog.getString('Date joined'), fieldType: 'date'},
        {key:'orderCount', text:this.gettextCatalog.getString('Orders')},
        {key:'orderTotal', text:this.gettextCatalog.getString('Spend'), fieldType: 'currency'},
        {key:'email', text:this.gettextCatalog.getString('Email')},
        {key:'phone', text:this.gettextCatalog.getString('Tel')},
        {key:'customerMarketing', text:this.gettextCatalog.getString('Marketing'), fieldType:'icon'}
      ];
    }
    else if(reportId== 'customerWithoutOrder'){
      response = [
        {key:'customerName' ,text:this.gettextCatalog.getString('Name')},
        //{key:'userid' ,text:this.gettextCatalog.getString('#') , isHidden: true},
        {key:'signindate', text:this.gettextCatalog.getString('Date joined'), fieldType: 'date'},
        {key:'email', text:this.gettextCatalog.getString('Email')},
        {key:'phone', text:this.gettextCatalog.getString('Tel')},
        {key:'customerMarketing', text:this.gettextCatalog.getString('Marketing'), fieldType:'icon'}
      ];
    }
    else if(reportId== 'allPayingCustomers'){
      response = [
        {key:'customerName' ,text:this.gettextCatalog.getString('Name')},
       // {key:'userid' ,text:this.gettextCatalog.getString('#') , isHidden: true},
        {key:'orderCount', text:this.gettextCatalog.getString('Orders')},
        {key:'orderTotal', text:this.gettextCatalog.getString('Spend'), fieldType: 'currency'},
        {key:'email', text:this.gettextCatalog.getString('Email')},
        {key:'phone', text:this.gettextCatalog.getString('Tel')},
        {key:'customerMarketing', text:this.gettextCatalog.getString('Marketing'), fieldType:'icon'}
      ];
    }
    else if(reportId== 'customersOrderedOnce'){
      response = [
        {key:'customerName' ,text:this.gettextCatalog.getString('Name')},
        //{key:'userid' ,text:this.gettextCatalog.getString('#') , isHidden: true},
        {key:'signindate', text:this.gettextCatalog.getString('Date joined'), fieldType: 'date'},
        {key:'orderTotal', text:this.gettextCatalog.getString('Spend'), fieldType: 'currency'},
        {key:'email', text:this.gettextCatalog.getString('Email')},
        {key:'phone', text:this.gettextCatalog.getString('Tel')},
        {key:'customerMarketing', text:this.gettextCatalog.getString('Marketing'), fieldType:'icon'}
      ];
    }
    else if(reportId== 'sleepingCustomers'){
      response = [
        {key:'customerName' ,text:this.gettextCatalog.getString('Name')},
       // {key:'userid' ,text:this.gettextCatalog.getString('#') , isHidden: true},
        {key:'lastOrder', text:this.gettextCatalog.getString('Date joined'), fieldType: 'date'},
        {key:'email', text:this.gettextCatalog.getString('Email')},
        {key:'phone', text:this.gettextCatalog.getString('Tel')},
        {key:'customerMarketing', text:this.gettextCatalog.getString('Marketing'), fieldType:'icon'}
      ];
    }

    return response;
  }

  // Object Properties:
  //  - id -> is the exactly object key coming from API that contains the report data
  //  - name -> name to be displayed to the user
  //  - reportType -> this type is used when fetching data from API only.
  //  - orientation -> used to export PDF.
  //  - actions -> actions that will be available for each report.
  getReportsPerType(type){

    var response = [];

    //default actions for all reports
    var defaultActions = [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF];
    var chartActions = defaultActions.concat([this.cardActionsCodes.MONTHLY_MODE, this.cardActionsCodes.WEEKLY_MODE, this.cardActionsCodes.DAILY_MODE]);
    var actionNotify = null;

    //only allow Notify option if Venues has an App
    if(this.reportsOptions && this.reportsOptions.hasApplicationId)
      actionNotify = defaultActions.concat([this.cardActionsCodes.NOTIFICATION]);
    else
      actionNotify = defaultActions;

    if(type == this.ReportTypes.STOCK){
      response = [
        {id: 'allItemsSold', name:this.gettextCatalog.getString('All items sold'), reportType: this.ReportTypes.STOCK, actions: defaultActions},
        {id: 'popularityIncreasing', name:this.gettextCatalog.getString('Items increasing in popularity'), reportType: this.ReportTypes.STOCK, actions: defaultActions},
        {id: 'popularityDecreasing', name:this.gettextCatalog.getString('Items descreasing in popularity'),reportType: this.ReportTypes.STOCK, actions: defaultActions},
        {id: 'revenueIncreasing', name:this.gettextCatalog.getString('Items increasing in revenue'), reportType: this.ReportTypes.STOCK, actions: defaultActions},
        {id: 'revenueDecreasing', name:this.gettextCatalog.getString('Items decreasing in revenue'), reportType: this.ReportTypes.STOCK, actions: defaultActions},

      ];
    }
    else if(type == this.ReportTypes.STOCKITEMDATA){

      response = [
        {id: 'individualItemDataNumberSold', name:this.gettextCatalog.getString('Individual item data (number sold)'), isChartType: true, hasItemFilter: true, reportType: this.ReportTypes.STOCKITEMDATA,  actions: chartActions},
        {id: 'individualItemDataRevenue', name:this.gettextCatalog.getString('Individual item data (revenue)'), type:'currency', isChartType: true, hasItemFilter: true, reportType: this.ReportTypes.STOCKITEMDATA, actions: chartActions}
      ];
    }
    else if(type == this.ReportTypes.BUSIESTEVENTS){
      response = [];

      if(this.reportsOptions.hasEventVenue){
        response.push({id: 'busiestEvents', name:this.gettextCatalog.getString('Busiest events'),reportType: this.ReportTypes.BUSIESTEVENTS, actions: defaultActions});
      }
    }
    else if(type == this.ReportTypes.BUSIESTDAYS){
      response = [
        {id: 'busiestDays', name:this.gettextCatalog.getString('Busiest days'), reportType: this.ReportTypes.BUSIESTDAYS, actions: defaultActions}
      ];
    }
    else if(type == this.ReportTypes.CUSTOMERS){

      response = [
        {id: 'customerWithoutOrder', name:this.gettextCatalog.getString("Customers who signed up but haven't ordered"), reportType: this.ReportTypes.CUSTOMERS, hasCustomerMarketing: true, actions: actionNotify},
        {id: 'customersOrderedOnce', name:this.gettextCatalog.getString('Customers who have only ordered once'), reportType: this.ReportTypes.CUSTOMERS, hasCustomerMarketing: true, actions: actionNotify},
        {id: 'sleepingCustomers', name:this.gettextCatalog.getString('Sleeping customers'), reportType: this.ReportTypes.CUSTOMERS, hasCustomerMarketing: true, actions: actionNotify},
      ];
    }
    else if(type == this.ReportTypes.NEWAREADELIVERY){
      response = [
        {id: 'newAreas', name:this.gettextCatalog.getString('Customers requesting delivery to a new area'), reportType: this.ReportTypes.NEWAREADELIVERY, actions: defaultActions}
      ];
    }
    else if(type == this.ReportTypes.NEWCUSTOMERS){

      response = [
        {id: 'newCustomers', name:this.gettextCatalog.getString('New customers'), reportType: this.ReportTypes.NEWCUSTOMERS, hasCustomerMarketing: true, actions: actionNotify}
      ];
    }
    else if(type == this.ReportTypes.ORDERS){

      response = [
        {id: 'orders', name:this.gettextCatalog.getString('All orders'), orientation: 'LANDSCAPE', reportType: this.ReportTypes.ORDERS, actions: actionNotify},
        {id: 'taxReport', name:this.gettextCatalog.getString('Tax report'), reportType: this.ReportTypes.ORDERS, actions: defaultActions},
      ];

      if(this.reportsOptions.hasTakeawayVenue){
        response.push({id: 'busiestHours', name:this.gettextCatalog.getString('Busiest time of day'), reportType: this.ReportTypes.ORDERS, actions: defaultActions});
      }
    }
    else if(type == this.ReportTypes.PAYINGCUSTOMERS){

      response = [
        {id: 'allPayingCustomers', name:this.gettextCatalog.getString('All paying customers'), reportType: this.ReportTypes.PAYINGCUSTOMERS, hasCustomerMarketing: true, actions: actionNotify}
      ];

    }
    else if(type == this.ReportTypes.SUMMARY){
      response = this.getSummaryReports();
    }

    return response;
  }

  // Object Properties
  //  - id -> is the exactly object key coming from API that contains the report data
  //  - name -> name to be displayed to the user on Chart. For BAR Charts only, name can goes as an object containing texts for mode types used (daily, monthly, weekly) OR just a normal string that will be show for any mode
  //  - flexWidth -> specific property used by 'Cards' directives (Summary only). Used to format how many cards you want per row.
  //  - type -> data type to be formated by charts directive. Now is only prepared to accept 'currency' filter
  //  - actions -> actions that will be available for each report.
  getSummaryReports(){
    var response = [];
    var objCharts = {};
    objCharts.cards = [
      {id: 'totalRevenue', name: this.gettextCatalog.getString('Total revenue'), type: 'currency',  flexWidth: 50 },
      {id: 'totalOrders', name: this.gettextCatalog.getString('Total number of orders'), flexWidth: 50 },
      {id: 'totalPayingCustomers', name: this.gettextCatalog.getString('Total number of customers'), flexWidth: 25 },
      {id: 'avgOrderValue', name: this.gettextCatalog.getString('Average order value'), type: 'currency', flexWidth: 25 },
      {id: 'avgOrdersCustomer', name: this.gettextCatalog.getString('Average orders per customer'), flexWidth: 25 },
      {id: 'avgRevenueCustomer', name: this.gettextCatalog.getString('Average revenue per customer'), type:'currency', flexWidth: 25 }
    ];

    objCharts.bars = [
      {id: 'revenueByDay', name: {daily: this.gettextCatalog.getString('Daily Revenue'), monthly: this.gettextCatalog.getString('Monthly Revenue'), weekly: this.gettextCatalog.getString('Weekly Revenue')},
        defaultMode: this.cardActionsCodes.DAILY_MODE, type: 'currency',actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF, this.cardActionsCodes.MONTHLY_MODE, this.cardActionsCodes.WEEKLY_MODE, this.cardActionsCodes.DAILY_MODE]
       // data: {x: [], y: []},
      },
      {id: 'ordersByDay', name: {daily: this.gettextCatalog.getString('Daily Orders'), monthly: this.gettextCatalog.getString('Monthly Orders'), weekly: this.gettextCatalog.getString('Weekly Orders')},
        defaultMode: this.cardActionsCodes.DAILY_MODE, actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF, this.cardActionsCodes.MONTHLY_MODE, this.cardActionsCodes.WEEKLY_MODE, this.cardActionsCodes.DAILY_MODE]
       // data: {x: [], y: []},
      },
      {id: 'customersByDay', name: {daily: this.gettextCatalog.getString('Daily Customers'), monthly: this.gettextCatalog.getString('Monthly Customers'), weekly: this.gettextCatalog.getString('Weekly Customers')},
        defaultMode: this.cardActionsCodes.DAILY_MODE,actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF, this.cardActionsCodes.MONTHLY_MODE, this.cardActionsCodes.WEEKLY_MODE, this.cardActionsCodes.DAILY_MODE]
       // data: {x: [], y: []},
      }
    ];

    objCharts.doughnuts = [
      {id: 'revenueByChannel', name: this.gettextCatalog.getString('Revenue by channel'),type: 'currency',actions: [this.cardActionsCodes.EXPORT_CSV,this.cardActionsCodes.EXPORT_PDF]},
        //data: {labels: [], values: []},
      {id: 'ordersByChannel', name: this.gettextCatalog.getString('Orders by channel'),actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF]},
      //data: {labels: [], values: []},
      {id: 'customersNewReturning', name: this.gettextCatalog.getString('New vs Returning customers'),actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF]},
       //data: {labels: [], values: []},
      {id: 'customersHowSignedup', name: this.gettextCatalog.getString('How customers signed up'),actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF]}
       // data: {labels: [], values: []},
    ];

    response.push(objCharts);

    return response;
  }
}
