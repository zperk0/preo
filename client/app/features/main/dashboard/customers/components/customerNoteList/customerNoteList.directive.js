import controller from './customerNoteList.controller';

export default function customerNoteList(){
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      collection: '=',
    },
    template: require('./customerNoteList.tpl.html'),
    controller: controller.UID,
    controllerAs: 'customerNoteListCtrl',
    bindToController: true,
    replace:true,
    link: (scope, el, attr) => {

    }
  }
}
