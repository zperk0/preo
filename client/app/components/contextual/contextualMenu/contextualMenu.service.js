export default class contextualMenuService {
  static get UID(){
    return "contextualMenu";
  }

  resolve(res){
    if (this.onSuccess) {
      this.onSuccess(res);
    }
  }

  reject(err){
    this.close(err);
  }

  //same as close but doesn't call error callback
  hide(){
    if (this.$el){
      this.$el.remove();
    }
    delete this.type;
    delete this.onSuccess;
    delete this.onError;
    delete this.entity;
    delete this.parent;
    delete this.$el;
  }

  close(err){
    if (this.onError) {
      this.onError(err);
    }
    this.hide();
  }

  //DO NOT CALL THIS METHOD DIRECTLY, use the contextual service;
  show(template, entity, onSuccess, onError, params){
    //FIXME hack for double call because of drawer and list. instead of doing this here we should not call showMenu when new items are added to the drawer.
    if (this.type && this.entity && this.type === template && this.entity === entity){
      return;
    }

    params = params || {};

    if (this.$el){
      this.close();
    }

    this.type = template;
    this.onSuccess = onSuccess;
    this.onError = onError;
    this.entity = entity;
    this.parent = angular.element(document.querySelector(".contextual-menu-holder"));

    let newScope = this.$rootScope.$new();
    newScope.template = require("./templates/"+template+".tpl.html");;
    newScope.entity = entity;
    newScope.params = params;

    this.directiveHtml ='<contextual-menu template="template" entity="entity" params="params"></contextual-menu>';
    this.$el = this.$compile(this.directiveHtml)(newScope);
    this.parent.append(this.$el);
  }

  constructor($compile, $rootScope, $q) {
    "ngInject";
    this.$compile = $compile;
    this.$rootScope = $rootScope;
    this.$q = $q;

  }
}
