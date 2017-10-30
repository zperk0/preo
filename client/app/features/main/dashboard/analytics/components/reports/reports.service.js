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

  sendGAExportEvent(type, page) {
    if (this.$window.ga && typeof this.$window.ga === 'function') {
      this.$window.ga('send', 'event', 'export', type, page ? page : 'no-title');
    }
  }

  getParamsFromData(){

    if(!this.data)
      return null;

    var response = {
      venueIds: this.data.venueIds,
      outletIds: this.data.outletIds
    }

    if(this.data.maxCreated && this.data.minCreated){
      response.maxCreated= this.data.maxCreated;
      response.minCreated= this.data.minCreated;
    }

    if(this.data.events && this.data.events.length > 0)
      response.eventIds =  this.data.events.map((event) => {
        return event.occurrenceId;
      });

    return response;
  }

  saveDataReport(data){

    var params = {
      venueIds: data.venueIds,
      outletIds: data.outletIds,
      events: data.events,
      minCreated: data.minCreated,
      maxCreated: data.maxCreated
    }

    if(data.events && data.events.length > 0)
      params.events = data.events;

    if(data.minCreated && data.maxCreated){
      params.minCreated= data.minCreated;
      params.maxCreated= data.maxCreated;
    }

    if(this.checkIfParamsChanged(params, false)){
      this.data = data;
      return;
    }

    Object.keys(data).some((k) => {
        this.data[k] = data[k];
    });

    return this.data;
  }

  setEventSearched(termSearched){
    this.eventSearched = termSearched;
  }

  getEventSearched(){
    var response = this.eventSearched ? this.eventSearched : null;

    return response;
  }

  prepareDataToNotification(rowsSelected){
    var data = {
      venueIds: this.data.venueIds,
      users: []
    }

    rowsSelected.forEach((row) => {
      let colCustomer = row.filter((col) => {
        if( col.key == 'customerName' && col.userId)
          return col;
      });

      if(colCustomer[0])
        data.users.push(colCustomer[0].userId);
    });

    return data;
  }

  getDataFromReport(reportId){
    var response = null;

    if(this.data && this.data[reportId])
      response = this.data[reportId];

    return response;
  }

  // HIDDEN Columns are used in eexport PDF/CSV only. They are not printed in screen.
  prepareDataToTable(reportId){

    var data = this.getDataFromReport(reportId) ? this.getDataFromReport(reportId) : [];
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
        colObj.shouldTruncate = head.shouldTruncate ? head.shouldTruncate : false;

        switch(colObj.fieldType){
          case "currency":
            colObj.displayValue = this.$filter('currency')(colObj.value);
            break;
          case "number":
            colObj.displayValue = this.$filter('currency')(colObj.value,true,0);
            break;
          case "percent":
            colObj.displayValue = this.$filter('percent')(colObj.value, 0);
            break;
          case "date":
            colObj.displayValue = this.$filter('datelocale')(colObj.value);
            break;
          case "dayOfWeek":
            colObj.displayValue = this.$filter('datelocale')(colObj.value, 'dayOfWeek');
            break;
          case "timeOfDay":
            colObj.displayValue = this.$filter('datelocale')(colObj.value, 'timeOfDay');
            break;
          default:
            colObj.displayValue = colObj.value;
            break;
        }

        colObj.displayValue = colObj.displayValue !== null && Boolean(String(colObj.displayValue)) ? colObj.displayValue : this.gettextCatalog.getString('n/a');

        // AUX properties that are used to Push Notification
        if(row['userId'])
          colObj.userId = row['userId'];

        rowObj.push(colObj);
      });

      viewTable.body.push(rowObj);
    });

    return viewTable;
  }

  addTotalRows(response, header, total) {
    let allRow = null;
    for (const totalType in total) {
      let row = [];
      header.forEach(col => {
        if (col.key === 'id' || col.key === 'orderId') {
          row.push(totalType === 'ALL' ? this.gettextCatalog.getString('TOTAL') : this.gettextCatalog.getString('TOTAL') + ' - ' + this.gettextCatalog.getString(totalType));
        } else if (total[totalType].hasOwnProperty(col.key)) {
          row.push(this.$filter('currency')(total[totalType][col.key] || 0));
        } else {
          row.push('-');
        }
      });
      if (totalType !== 'ALL') {
        response.push(row);
      } else {
        allRow = row;
      }
    }
    response.push(allRow);
  }

  // need to show/ hide some fields based on Events/Takeaway properties from header. AND based on Filters used to search
  prepareDataToCsv(report, dataSelected){
    var minDate = moment(this.params.minCreated).format("L");
    var maxDate = moment(this.params.maxCreated).format("L");

    var header = this.getReportHeader(report.id);
    var reportTitle = report.name;

    var response = [[minDate +' - '+ maxDate],[reportTitle]];

    var itemData = [];

    const totalFields = ['discount', 'fee', 'subtotal', 'tax', 'total', 'net'];
    const shouldCountTotal = report.id === 'orders' || report.id === 'taxReport';
    let total = {ALL: {}};
    let headerRow = [];

    header.forEach((col) => {

      if((!col.showToEventsOnly && !col.showToTakeawaysOnly) || (col.showToEventsOnly && this.hasEventVenue) || (col.showToTakeawaysOnly && this.hasTakeawayVenue)) {
        itemData.push(col.text);
        headerRow.push(col);
      }
    });

    response.push(itemData);

    dataSelected.forEach((row) => {

      let paymentType = row.filter(col => {
        if (col.key === 'paymentType') {
          return col;
        }
      });

      paymentType = paymentType.length ? paymentType[0].value : '';

      itemData = [];
      row.forEach((col) => {

        let headerCol = header.filter((x) => {
          if(x.key == col.key)
            return x;
        })[0];

        if (shouldCountTotal && totalFields.indexOf(col.key) > -1) {
          if (paymentType) {
            if (!total[paymentType]) {
              total[paymentType] = {};
            }
            total[paymentType][col.key] = total[paymentType][col.key] ? total[paymentType][col.key] += col.value : col.value;
          }
          total.ALL[col.key] = total.ALL[col.key] ? total.ALL[col.key] += col.value : col.value;
        }

        if((!headerCol.showToEventsOnly && !headerCol.showToTakeawaysOnly) || (headerCol.showToEventsOnly && this.hasEventVenue) || (headerCol.showToTakeawaysOnly && this.hasTakeawayVenue)){

          if(col.value === true)
            itemData.push(this.gettextCatalog.getString('Yes'));
          else if(col.value === false)
            itemData.push(this.gettextCatalog.getString('No'));
          else
            itemData.push(col.displayValue);
        }
      });

      response.push(itemData);
    });

    if (shouldCountTotal) {
      this.addTotalRows(response, headerRow, total);
    }

    return {data: response };
  }

  // need to show/ hide some fields based on Events/Takeaway properties from header. AND based on Filters used to search
  prepareDataToPdf(report, dataSelected){
    var header = this.getReportHeader(report.id);
    var reportTitle = report.name;

    var response = {};

    header.forEach((col) => {
      if(!col.isOnlyCsv && ((!col.showToEventsOnly && !col.showToTakeawaysOnly) || (col.showToEventsOnly && this.hasEventVenue) || (col.showToTakeawaysOnly && this.hasTakeawayVenue)))
        response[col.text] = [];
    });

    dataSelected.forEach((row) => {

      row.forEach((col) => {

        let headerCol = header.filter((x) => {
          if(x.key == col.key)
            return x;
        })[0];

        if(headerCol && !headerCol.isOnlyCsv && ((!headerCol.showToEventsOnly && !headerCol.showToTakeawaysOnly) || (headerCol.showToEventsOnly && this.hasEventVenue) || (headerCol.showToTakeawaysOnly && this.hasTakeawayVenue))){

          if(col.value === true)
            response[headerCol.text].push(this.gettextCatalog.getString('Yes'));
          else if(col.value === false)
            response[headerCol.text].push(this.gettextCatalog.getString('No'));
          else
            response[headerCol.text].push(col.displayValue);
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

  getEntityBasePath() {
    const {
      isChannel
    } = this.StateService;

    return isChannel ? 'channels' : 'venue';
  }

  getChartExportCsvUrl(){
    return '/api/' + this.getEntityBasePath() + '/'+ this.entityId + '/exports/csv/post';
  }

  getChartExportPdfUrl(){
    return '/api/' + this.getEntityBasePath() + '/'+ this.entityId + '/exports/pdfs/post';
  }

  exportReportToPdf(report, dataSelected){

    return this.$q((resolve, reject) => {

      this.sendGAExportEvent('pdf', report.name);
      let udata = this.prepareDataToPdf(report, dataSelected);

      var exportUrl = '/api/' + this.getEntityBasePath() + '/'+ this.entityId + '/exports/pdfs/report';
      // ..
      // TO DO - Create a post method to dont need to Use Form request on Controller.
      // ..

      resolve({data: udata, url: exportUrl});
    });

  }

  exportReportToCsv(report, dataSelected){

    return this.$q((resolve, reject) => {

      this.sendGAExportEvent('csv', report.name);
      let udata = this.prepareDataToCsv(report, dataSelected);

      var exportUrl = '/api/' + this.getEntityBasePath() + '/' + this.entityId + '/exports/csv/report';
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

   this.formatDataFilters(parameters, true);

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

    this.formatDataFilters(venues, true);

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

  checkIfParamsChanged(parameters, format ,reportsIds){
    var params = format ? this.formatDataFilters(parameters) : parameters;
    var paramChanged = false;

    if(!this.data){
      return true;
    }

    if(reportsIds){
      for(var i=0; i < reportsIds.length; i++){
        let reportId = reportsIds[i];

        if(!this.data.hasOwnProperty(reportId) || this.data[reportId] == null){
          paramChanged = true;
          break;
        }
      }
    }

    if(!paramChanged && params.menuItemId){
      if(!this.data.menuItemId || params.menuItemId != this.data.menuItemId)
        return true;
    }

    if(params.minCreated && params.maxCreated){
      if(!this.data.minCreated || !this.data.maxCreated)
        return true;

      params.minCreated = moment(params.minCreated).format('L');
      params.maxCreated = moment(params.maxCreated).format('L');
      var dataMin = moment(this.data.minCreated).format('L');
      var dataMax = moment(this.data.maxCreated).format('L');
      if(params.minCreated != dataMin || params.maxCreated != dataMax){
        return true;
      }
    }

    if(!paramChanged && params.events){
      if(!this.data.events)
        return true;

      let arrayCombined = this.data.events.concat(params.events);
      arrayCombined.sort((a, b) => {
        if(a.occurrenceId > b.occurrenceId) return 1;
        if(a.occurrenceId < b.occurrenceId) return -1;
        return 0;
      });

      if(arrayCombined.length <= 1 || arrayCombined.length % 2 > 0)
        paramChanged =  true;

      if(!paramChanged)
      for(var i=0; i < arrayCombined.length - 1; i+=2){
        if(arrayCombined[i].occurrenceId != arrayCombined[i+1].occurrenceId){

          paramChanged = true;
          break;
        }
      }
    }

    if(!paramChanged){
      let arrayCombined = this.data.venueIds.concat(params.venueIds);
      arrayCombined.sort((a, b) => {
        if(a > b) return 1;
        if(a < b) return -1;
        return 0;
      });

      if(arrayCombined.length <= 1 || arrayCombined.length % 2 > 0)
        paramChanged =  true;

      if(!paramChanged)
      for(var i=0; i < arrayCombined.length - 1; i+=2){
        if(arrayCombined[i] != arrayCombined[i+1]){

          paramChanged = true;
          break;
        }
      }
    }

    if(!paramChanged){
      let arrayCombined = this.data.outletIds.concat(params.outletIds);

      arrayCombined.sort((a, b) => {
        if(a > b) return 1;
        if(a < b) return -1;
        return 0;
      });

     if(arrayCombined.length <= 1 || arrayCombined.length % 2 > 0)
       paramChanged =  true;

      if(!paramChanged)
      for(var i=0; i < arrayCombined.length - 1; i+=2){
        if(arrayCombined[i] != arrayCombined[i+1]){

          paramChanged = true;
          break;
        }
      }
    }

    return paramChanged;
  }

  formatDataFilters(parameters, saveParams){

    var response = {};

    if(parameters.report)
      response.reportType = parameters.report.reportType;

    if(parameters.datesRange && parameters.datesRange.endDate && parameters.datesRange.startDate){
      response.minCreated = moment(parameters.datesRange.startDate, "L").startOf('day').format('YYYY-MM-DD[T]HH:mm:ss');
      response.maxCreated = moment(parameters.datesRange.endDate, "L").endOf('day').format('YYYY-MM-DD[T]HH:mm:ss');
    }
    else{
      response.minCreated = null;
      response.maxCreated = null;
    }

    if(parameters.events && parameters.events.length > 0){
      response.events = [];

      parameters.events.forEach((ev) => {
        let event = {};
        event.eventId = ev.id;
        event.eventName = ev.name;
        event.eventTime = ev.startDate;
        event.occurrenceId = ev.occurId;
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

    if(saveParams){
      this.params = response;
      this.hasTakeawayVenue = isTakeaway ? true : false;
      this.hasEventVenue = isEventVenue ? true : false;
    }

    return response;
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
  constructor($q , ReportTypes, $filter, gettextCatalog, LabelService, $window, StateService, FeatureService) {
    "ngInject";
    this.$q = $q;
    this.$window = $window;
    this.$filter = $filter;
    this.ReportTypes = ReportTypes;
    this.gettextCatalog = gettextCatalog;
    this.LabelService = LabelService;
    this.StateService = StateService;
    this.entityId = StateService.entityId;
    this.hasDobFeature = FeatureService.hasDateOfBirthFeature();
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
        {key:'modifiers', text:this.gettextCatalog.getString('Modifiers') , isHidden: true, isOnlyCsv: true},
        {key:'itemCount', text:this.gettextCatalog.getString('Quantity'), fieldType: 'number'},
        {key:'itemTotal', text:this.gettextCatalog.getString('Revenue'), fieldType: 'currency'}
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
        {key:'items', text:this.gettextCatalog.getString('Items') , shouldTruncate: true},
        {key:'notes', text:this.gettextCatalog.getString('Notes') , isHidden: true, isOnlyCsv: true},
        //{key:'subtotal' ,text:this.gettextCatalog.getString('Subtotal'),fieldType: 'currency', isHidden: true},
        {key:'discount', text:this.gettextCatalog.getString('Discount'), fieldType: 'currency'},
        {key:'fee', text:this.gettextCatalog.getString('Fees'), fieldType: 'currency'},
        {key:'total', text:this.gettextCatalog.getString('Total'), fieldType: 'currency'},
        {key:'paymentType', text:this.gettextCatalog.getString('Payment Method'), isHidden: true, isOnlyCsv: true},
        {key:'type', text:this.gettextCatalog.getString('Order Type'), isHidden: true, isOnlyCsv: true},
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
        {key:'eventName' ,text:this.gettextCatalog.getString('Name')},
        {key:'eventDate' ,text:this.gettextCatalog.getString('Date'), fieldType: 'date'},
        {key:'eventTime', text:this.gettextCatalog.getString('Time'), fieldType: 'timeOfDay'},
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
        {key:'signinDate', text:this.gettextCatalog.getString('Date joined'), fieldType: 'date'},
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
        {key:'signinDate', text:this.gettextCatalog.getString('Date joined'), fieldType: 'date'},
        {key:'email', text:this.gettextCatalog.getString('Email')},
        {key:'phone', text:this.gettextCatalog.getString('Tel')},
        {key:'customerMarketing', text:this.gettextCatalog.getString('Marketing'), fieldType:'icon'}
      ];
    }
    else if(reportId== 'allPayingCustomers'){
      response = [
        {key:'customerName' ,text:this.gettextCatalog.getString('Name')},
        {key:'dateOfBirth' ,text:this.gettextCatalog.getString('D.O.B'), fieldType:'date', isHidden: !this.hasDobFeature},
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
        {key:'signinDate', text:this.gettextCatalog.getString('Date joined'), fieldType: 'date'},
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
    var defaultActions = [this.LabelService.EXPORT_CSV, this.LabelService.EXPORT_PDF];
    var chartActions = defaultActions.concat([this.LabelService.MONTHLY_MODE, this.LabelService.WEEKLY_MODE, this.LabelService.DAILY_MODE]);
    var actionNotify = null;

    //only allow Notify option if Venues has an App
    if(this.reportsOptions && this.reportsOptions.hasApplicationId)
      actionNotify = defaultActions.concat([this.LabelService.NOTIFICATION]);
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
    else if(type == this.ReportTypes.SUMMARY || type == this.ReportTypes.SUMMARY_CARDS){
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
    var barActions = [this.LabelService.EXPORT_CSV, this.LabelService.EXPORT_PDF, this.LabelService.MONTHLY_MODE, this.LabelService.WEEKLY_MODE, this.LabelService.DAILY_MODE];
    var doughnutActions = [this.LabelService.EXPORT_CSV,this.LabelService.EXPORT_PDF];
    objCharts.cards = [
      {id: 'totalRevenue', name: this.gettextCatalog.getString('Total revenue'), type: 'currency',  flexWidth: 50 },
      {id: 'totalOrders', name: this.gettextCatalog.getString('Total number of orders'), type:'integer' ,flexWidth: 50 },
      {id: 'totalPayingCustomers', name: this.gettextCatalog.getString('Total number of customers'), type:'integer', flexWidth: 25 },
      {id: 'avgOrderValue', name: this.gettextCatalog.getString('Average order value'), type: 'currency', flexWidth: 25 },
      {id: 'avgOrdersCustomer', name: this.gettextCatalog.getString('Average orders per customer'), flexWidth: 25 },
      {id: 'avgRevenueCustomer', name: this.gettextCatalog.getString('Average revenue per customer'), type:'currency', flexWidth: 25 }
    ];

    objCharts.bars = [
      {id: 'revenueByPeriod', name: {daily: this.gettextCatalog.getString('Daily Revenue'), monthly: this.gettextCatalog.getString('Monthly Revenue'), weekly: this.gettextCatalog.getString('Weekly Revenue')},
        type: 'currency',actions: barActions
      },
      {id: 'ordersByPeriod', name: {daily: this.gettextCatalog.getString('Daily Orders'), monthly: this.gettextCatalog.getString('Monthly Orders'), weekly: this.gettextCatalog.getString('Weekly Orders')},
        type:'integer', actions: barActions
      },
      {id: 'customersByPeriod', name: {daily: this.gettextCatalog.getString('Daily Customers'), monthly: this.gettextCatalog.getString('Monthly Customers'), weekly: this.gettextCatalog.getString('Weekly Customers')},
        type:'integer',actions: barActions
      }
    ];

    objCharts.doughnuts = [
      {id: 'revenueByChannel', name: this.gettextCatalog.getString('Revenue by channel'),type: 'currency',actions: doughnutActions},

      {id: 'ordersByChannel', name: this.gettextCatalog.getString('Orders by channel'),type:'integer' ,actions: doughnutActions},

      {id: 'customersNewReturning', name: this.gettextCatalog.getString('New vs Returning customers'),type:'integer', actions: doughnutActions},

      {id: 'customersHowSignedup', name: this.gettextCatalog.getString('How customers signed up'),type:'integer', actions: doughnutActions}

    ];

    response.push(objCharts);

    return response;
  }
}
