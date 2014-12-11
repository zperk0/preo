<div class="content-modal">
  <header class="title-notification" ng-if="title">{{ title }}</header>
  <a class="close-modal" ng-click="cancel()">×</a>

  <div class="container-modal-confirm {{contentClass}}" ng-if="!templateUrl" ng-bind-html="toTrusted(content)">    
  </div>

  <div class="container-modal-confirm {{contentClass}}" id="contentPartial" ng-if="templateUrl"></div>

  <div class="checkbox checkboxStyle modal-term content-check-modal" ng-if="showTerm">
    <input type="checkbox" ng-change="changeTerm(acceptTerm)" ng-model="acceptTerm" id="checkboxNotification" />
    <label for="checkboxNotification"><? echo _("I have read the")?> <a href="{{showTerm}}" target="_blank"><? echo _("Terms and Conditions") ?></a></label>
  </div>  

  <div class="buttons notificationButtons">
    <button class='preodayButton' ng-if='btnOk' ng-class="{secondary:showTerm && !acceptTerm}" ng-click="send()" ng-disabled="showTerm && !acceptTerm">{{ btnOk }} </button>
    <button class='preodayButton' ng-if='btnCancel' ng-click="cancel()">{{ btnCancel }}</button>
  </div>
</div>