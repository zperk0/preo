angular.module('kyc.charts')
.factory('OrdersPerChannel',['ChartType', 'Colors', 'ChartHelper', 'gettextCatalog', 'PaymentType', function(ChartType, Colors, ChartHelper, gettextCatalog, PaymentType) {

    var type = ChartType.PIE;
    var colorIndex = 0;
    var title = gettextCatalog.getString('Orders per channel');
    var data;
    var minTimestamp = 0;
    var maxTimestamp = 0;

    function clearData(){
        data = [
        {name:gettextCatalog.getString("Mobile app"),y:0,color:Colors[0]},
        {name:gettextCatalog.getString("Website"),y:0,color:Colors[1]}
        ]
        colorIndex=0;
    }

    function setData(order,minDate,maxDate){
        var orderData = order.paymentType == PaymentType.CASH ? order.created : order.paid;
        orderData = moment.utc(orderData);

        if (orderData >= minDate && orderData <= maxDate) {

            if(order.sourceAppId == 1 || order.sourceAppId == 23) {

                data[1].y++;
            } else {

                data[0].y++;
            }
        }
    }

    function onSetDataComplete(){

    }

    function getData(){
        return data;
    }
    function getType(){
        return type;
    }

    function getHighChart(){
        return {
            type:type,
            title:title,
            data:getData(),
            getPdf:getPdf,
              getCsv:getCsv
        }
    }

    function getCsv(){
        var data = getData();
        var csvData =[[moment.utc(minTimestamp).format("DD-MMM-YYYY") + " - " + moment.utc(maxTimestamp).format("DD-MMM-YYYY")],[title]]
        angular.forEach(data,function(d){
            csvData.push([d.name,d.y])
        })
        return {
            data:csvData
        };
    }

    function getPdf(){
        return  {
            type:type,
            title:title,
            startDate: minTimestamp,
            endDate: maxTimestamp,
            dataJson: JSON.stringify(data),
            categories: [gettextCatalog.getString('Mobile app'), gettextCatalog.getString('Website')]
        }
    }

    return {
        getData:getData,
        getType:getType,
        setData:setData,
        onSetDataComplete:onSetDataComplete,
        getHighChart:getHighChart,
        clearData:clearData
    };
}]);