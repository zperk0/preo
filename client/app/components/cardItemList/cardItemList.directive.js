import controller from './cardItemList.controller'

export default function cardItemList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      collection:"=",
      collectionResults:"=",
      searchFilter:"=",
      hasNew:"=?",
      tooltip:"@",
      onClickNew:"&?",
      searchLabel:"@"
    },
    template: require("./cardItemList.tpl.html"),
    controller: controller.UID,
    controllerAs: "cardItemListCtrl",
    bindToController: true,
    transclude:true,
    require:['cardItemList', '?^^usersInviteList', '?^^usersList','?^^menuSectionItemList', '?^^menuItemList', '?^^menuSectionList',
          '?^^modifierList', '?^^outletLocationList', '?^^promotionsList', '?^^outletList', '?^^taxGroupList', '?^^deliveryZoneList',
          '?^^customTagList'],
    link: (scope, el, attr, ctrls) => {
      if (ctrls.length > 1) {
        for (let i = 1, len = ctrls.length; i < len; i++) {
          if (ctrls[i]) {
            ctrls[i].cardItemList = ctrls[0];
            break;
          }
        }
      }
    }
  }
}
