'use strict';

export default class ReportsService {

  static get UID(){
    return "ReportsService";
  }

  clearData(){
    this.data = {};
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

  prepareDataToTable(reportId){

    var data = this.data && this.data[reportId] ? this.data[reportId] : [];
    
    var viewTable = {
      header: this.getReportHeader(reportId),
      body: []
    };

    data.forEach((row) => {

      let rowObj = [];
      viewTable.header.forEach((head) => {
        let colObj = {};
        if(row.hasOwnProperty(head.key)){
          colObj.value = row[head.key];
          colObj.fieldType = head.fieldType;         
          colObj.key = head.key;
        }
        else{
          colObj.value = "-";        
          colObj.key = head.key;
        }

        //aux properties
        if(row['userid'])
          colObj.userid = row['userid'];

        rowObj.push(colObj);
      });

      viewTable.body.push(rowObj);
    });

    return viewTable;
  }

  prepareDataToCsv(report, dataSelected){
    var minDate = moment(this.params.minCreated).format("L");
    var maxDate = moment(this.params.maxCreated).format("L");

    var header = this.getReportHeader(report.id);
    var reportTitle = report.name;

    var data = [[minDate +' - '+ maxDate],[reportTitle]];

    var itemData = [];
    header.forEach((col) => {
      itemData.push(col.text);
    });
   
    data.push(itemData);

    
    dataSelected.forEach((row) => {
      itemData = [];
      row.forEach((col) => {
        itemData.push(col.value);
      });

      data.push(itemData);
    });

    return {data: data }; //JSON.stringify({data: data });
  }

  prepareDataToPdf(report, dataSelected){
    var header = this.getReportHeader(report.id);
    var reportTitle = report.name;

    var data = {};

    header.forEach((col) => {
      data[col.text] = [];
    });

    dataSelected.forEach((row) => {

      row.forEach((col) => {
        let headerCol = header.filter((x) => {
          if(x.key == col.key)
            return x;
        })[0];

        data[headerCol.text].push(col.value);
      });     

    });

    return {
        title: reportTitle,
        startDate:moment( this.params.minCreated).valueOf(),
        endDate:moment( this.params.maxCreated).valueOf(),
        dataJson:JSON.stringify(data)
    }
  }

  getChartExportCsvUrl(){
    return '/api/accounts/'+ this.accountId + '/exports/csv/post';
  }

  getChartExportPdfUrl(){
    return '/api/accounts/'+ this.accountId + '/exports/pdfs/post';
  }

  exportReportToPdf(report, dataSelected){

    let udata = this.prepareDataToPdf(report, dataSelected); 
     //console.log('data -> ', udata);
    var exportUrl = '/api/accounts/'+ this.accountId + '/exports/pdfs/report';
      // ..
     // TO DO - Create a post method to dont need to Use Form request on Controller.
     // ..
    return {data: udata, url: exportUrl};
  }

  exportReportToCsv(report, dataSelected){  

    let udata = this.prepareDataToCsv(report, dataSelected);  
    //console.log('data -> ', udata);
    var exportUrl = '/api/accounts/' + this.accountId + '/exports/csv/report';    
     // ..
    // TO DO - Create a post method to dont need to Use Form request on Controller.
    // ..
    return {data: udata, url: exportUrl};
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
          console.error("ReportService - Error fetching data : ", err)
          reject();
      }).catch((err)=>{
        console.error("ReportService - Error fetching data : ", err)
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
    //response.ccySymbol = this.currentCcySymbol ? this.currentCcySymbol : "";

    if(parameters.datesRange && parameters.datesRange.endDate && parameters.datesRange.startDate){
      response.minCreated = moment(parameters.datesRange.startDate, "L").valueOf();
      response.maxCreated = moment(parameters.datesRange.endDate, "L").valueOf();
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

      parameters.venues.forEach((x) => {
        response.venueIds.push(x.id);

         if(x.outlets){

            x.outlets.forEach((o) => {
             response.outletIds.push(o.id);
            });
         }
      });
    }

    this.params = response;

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

  constructor($q , ReportTypes, gettextCatalog, CardActionsCodes, VenueService) {
    "ngInject";
    this.$q = $q;
    this.ReportTypes = ReportTypes;
    this.gettextCatalog = gettextCatalog;
    this.cardActionsCodes = CardActionsCodes;    
    this.accountId = VenueService.currentVenue.accountId;
  }

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
        {key:'id' ,text:this.gettextCatalog.getString('#')},
        {key:'date', text:this.gettextCatalog.getString('Date'), fieldType: 'date'},
        {key:'username', text:this.gettextCatalog.getString('Customer')},
        {key:'items', text:this.gettextCatalog.getString('Items')},
        {key:'discount', text:this.gettextCatalog.getString('Discount'), fieldType: 'currency'},
        {key:'fee', text:this.gettextCatalog.getString('Fees'), fieldType: 'currency'},
        {key:'total', text:this.gettextCatalog.getString('Total'), fieldType: 'currency'},
      ];
    }
    else if(reportId== 'taxReport'){
      response = [
        {key:'orderId' ,text:this.gettextCatalog.getString('#')},
        {key:'taxRate', text:this.gettextCatalog.getString('Tax rate'), fieldType: 'number'},
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
        {key:'eventdate' ,text:this.gettextCatalog.getString('Date'), fieldType: 'date'},
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
        {key:'name' ,text:this.gettextCatalog.getString('Name')},
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
        {key:'name' ,text:this.gettextCatalog.getString('Name')},
        {key:'signindate', text:this.gettextCatalog.getString('Date joined'), fieldType: 'date'},
        {key:'email', text:this.gettextCatalog.getString('Email')},
        {key:'phone', text:this.gettextCatalog.getString('Tel')},
        {key:'customerMarketing', text:this.gettextCatalog.getString('Marketing'), fieldType:'icon'}
      ];
    }
    else if(reportId== 'allPayingCustomers'){
      response = [
        {key:'name' ,text:this.gettextCatalog.getString('Name')},
        {key:'orderCount', text:this.gettextCatalog.getString('Orders')},
        {key:'orderTotal', text:this.gettextCatalog.getString('Spend'), fieldType: 'currency'},
        {key:'email', text:this.gettextCatalog.getString('Email')},
        {key:'phone', text:this.gettextCatalog.getString('Tel')},
        {key:'customerMarketing', text:this.gettextCatalog.getString('Marketing'), fieldType:'icon'}
      ];
    }
    else if(reportId== 'customersOrderedOnce'){
      response = [
        {key:'name' ,text:this.gettextCatalog.getString('Name')},
        {key:'signindate', text:this.gettextCatalog.getString('Date joined'), fieldType: 'date'},
        {key:'orderTotal', text:this.gettextCatalog.getString('Spend'), fieldType: 'currency'},
        {key:'email', text:this.gettextCatalog.getString('Email')},
        {key:'phone', text:this.gettextCatalog.getString('Tel')},
        {key:'customerMarketing', text:this.gettextCatalog.getString('Marketing'), fieldType:'icon'}
      ];
    }
    else if(reportId== 'sleepingCustomers'){
      response = [
        {key:'name' ,text:this.gettextCatalog.getString('Name')},
        {key:'lastOrder', text:this.gettextCatalog.getString('Date joined'), fieldType: 'date'},
        {key:'email', text:this.gettextCatalog.getString('Email')},
        {key:'phone', text:this.gettextCatalog.getString('Tel')},
        {key:'customerMarketing', text:this.gettextCatalog.getString('Marketing'), fieldType:'icon'}
      ];
    }

    return response;
  }

  getReportsPerType(type){

    var response = [];

    //default actions for all reports
    var defaultActions = [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF];    
    var chartActions = defaultActions.concat([this.cardActionsCodes.MONTHLY_MODE, this.cardActionsCodes.WEEKLY_MODE, this.cardActionsCodes.DAILY_MODE]);
    var actionNotify = null;

    //only allow Notify option if Venues has an App
    if(this.reportsOptions.hasApplicationId)
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
        {id: 'individualItemDataRevenue', name:this.gettextCatalog.getString('Individual item data (revenue)'), isChartType: true, hasItemFilter: true, reportType: this.ReportTypes.STOCKITEMDATA, actions: chartActions}
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
        {id: 'orders', name:this.gettextCatalog.getString('All orders'), reportType: this.ReportTypes.ORDERS, actions: actionNotify},
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

  getSummaryReports(){
    var response = [];
    var objCharts = {};
    objCharts.cards = [
      {id: 'revenue', name: this.gettextCatalog.getString('Total revenue'), type: 'currency',  flexWidth: 50 },
      {id: 'totalOrders', name: this.gettextCatalog.getString('Total number of orders'), flexWidth: 50 },
      {id: 'totalPayingCustomers', name: this.gettextCatalog.getString('Total number of customers'), flexWidth: 25 },
      {id: 'averageOrderValue', name: this.gettextCatalog.getString('Average order value'), type: 'currency', flexWidth: 25 },
      {id: 'averageOrdersCustomer', name: this.gettextCatalog.getString('Average orders per customer'), flexWidth: 25 },
      {id: 'averageRevenueCustomer', name: this.gettextCatalog.getString('Average revenue per customer'), type:'currency', flexWidth: 25 }
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
