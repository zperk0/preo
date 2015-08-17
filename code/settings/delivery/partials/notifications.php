  <form name="deliveryForm" id="deliveryForm" ng-submit="processForm()" novalidate ng-show="finishedLoading">
    <div class='row deliveryHeader'> <h1 class="alignHeader" translate>Preset Notifications</h1>
    </div>
  <div class='deliveryWrapper'>
    <ul class='row delivery-tabs'>
      <li ng-class="{'selected': selected==1}" ><a href ng:click="selected=1" translate>Order Status Alerts</a></li>
      <li ng-class="{'selected': selected==2}" ><a href ng:click="selected=2" translate>Order Rejection Alerts</a></li>
      <li ng-class="{'selected': selected==3}" ><a href ng:click="selected=3" translate>Venue Alerts</a></li>
    </ul>
  <div class='row delivery-tab-holder'>
  <div ng:show="selected == 1" class='delivery-tab-content'>
      <div class="row messageRow messageRowHeader">
          <div class='messageCol-1' translate>Preset customer notifications, sent by email and push alert</div>
          <div class='messageCol-2' translate>Short name</div>
          <div class='messageCol-3' translate>Active?</div>
      </div>
      <div class='row messageRow' ng-repeat="message in messages.notify" >
          <div class='messageCol-1' ng-class="{'error': validateMessage(message) }">
            <input class='' type='text' ng-change="validateActive(message)"  ng-model="message.content" placeholder='eg."{{getPlaceholder("notify",$index).content}}"' ng-required='validateMessage(message)' />
            <small class="error" ng-show="validateMessage(message)"  translate>Please enter both the notification and a short name.</small>
          </div>
          <div class='messageCol-2' ng-class="{'error': validateMessage(message)}">
              <input class='' type='text' ng-change="validateActive(message)" ng-model="message.name" placeholder='eg."{{getPlaceholder("notify",$index).name}}"' ng-required='validateMessage(message)' />
          </div>
          <div class="messageCol-3 switch" ng-class="{'off': message.active==0, 'disabled':!validateActive(message)}" >
          <input  value="0" type="radio" ng-model="message.active" ng-disabled="!validateActive(message)" tabindex=-1>
            <label class="no" translate>No</label>
          <input value="1" type="radio" ng-model="message.active" ng-disabled="!validateActive(message)" tabindex=-1>
            <label class="yes" translate>Yes</label>
            <span></span>
          </div>
      </div>
  </div>

  <div ng:show="selected == 2" class='delivery-tab-content'>
     <div class="row messageRow messageRowHeader">
          <div class='messageCol-1' translate>Preset order rejection notifications, sent by email and push alert</div>
          <div class='messageCol-2' translate>Short name</div>
          <div class='messageCol-3' translate>Active?</div>
      </div>
      <div class='row messageRow' ng-repeat="message in messages.reject" >

          <div class='messageCol-1' ng-class="{'error': validateMessage(message) }">
            <input class='' type='text' ng-change="validateActive(message)"  ng-model="message.content" placeholder='eg."{{getPlaceholder("reject",$index).content}}"' ng-required='validateMessage(message)' />
            <small class="error" ng-show="validateMessage(message)"  translate>Please enter a message and a short name or remove this notification.</small>
          </div>
          <div class='messageCol-2' ng-class="{'error': validateMessage(message)}">
              <input class='' type='text' ng-change="validateActive(message)" ng-model="message.name"    placeholder='eg."{{getPlaceholder("reject",$index).name}}"' ng-required='validateMessage(message)' />
          </div>
          <div class="messageCol-3 switch" ng-class="{'off': message.active==0, 'disabled':!validateActive(message)}" >
          <input  value="0" type="radio" ng-model="message.active" ng-disabled="!validateActive(message)" tabindex=-1>
            <label class="no" translate>No</label>
          <input value="1" type="radio" ng-model="message.active" ng-disabled="!validateActive(message)" tabindex=-1>
            <label class="yes" translate>Yes</label>
            <span></span>
          </div>
        </div>
  </div>

  <div ng:show="selected == 3" class='delivery-tab-content'>
     <div class="row messageRow messageRowHeader">
          <div class='messageCol-1' translate>
            Email address for receiving venue alerts
            <i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="{{'In addition to the fulfilment app, you can also receive email updates to notify when you have received a new order' | translate}}"></i>
          </div>
      </div>
      <div class='row messageRow contentMail'>
        <div ng-class="{'error': !validateEmail(venue.notificationEmailAddress)}">
            <input type='text' ng-model="venue.notificationEmailAddress" />
        </div>
      </div>
  </div>
  </div>
  </div>
  <div class='row deliverySubmitHolder'>
      <button ng-show="!isPosting" id="deliverySave" ng-class="{'grayedOut':venue.deliverFlag==0}"   type="submit"  translate>SAVE CHANGES</button>
      <button ng-show="isPosting" class="secondary" type="button" translate>SAVING...</button>
    </div>
  </form>