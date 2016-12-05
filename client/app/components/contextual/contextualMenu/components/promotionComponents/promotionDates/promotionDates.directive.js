export default function promotionDates(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionDates.tpl.html"),
    require:'^contextualMenu',
    replace:true,
    link: (scope, el, attr, contextualMenuCtrl) => {
      scope.contextualMenuCtrl = contextualMenuCtrl;
      scope.contextualForm = contextualMenuCtrl.contextualForm;

      if (scope.promotion.startDate){
        scope.$startDate = moment(scope.promotion.startDate).toDate();
        scope.$startTime = moment(scope.promotion.startDate).toDate();
      }

      if (scope.promotion.endDate){
        scope.$endDate = moment(scope.promotion.endDate).toDate()
        scope.$endTime = moment(scope.promotion.endDate).toDate()
      }

      function setStartDate(date = new Date(), time = new Date()){
        scope.promotion.startDate =  new Date(date.getFullYear(), date.getMonth(), date.getDate(),
               time.getHours(), time.getMinutes(), time.getSeconds());
      }
      scope.selectStartDate = function(){
        setStartDate(scope.$startDate, scope.$startTime)
      }
      scope.selectStartTime = function(){
        setStartDate(scope.$startDate, scope.$startTime)
      }
      function setEndDate(date = new Date(), time = new Date()){
        scope.promotion.endDate =  new Date(date.getFullYear(), date.getMonth(), date.getDate(),
               time.getHours(), time.getMinutes(), time.getSeconds());
      }
      scope.selectEndDate = function(){
        setEndDate(scope.$endDate, scope.$endTime)
      }
      scope.selectEndTime = function(){
        setEndDate(scope.$endDate, scope.$endTime)
      }

    }
  }
}
