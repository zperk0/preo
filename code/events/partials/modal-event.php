<div class='ct-modal-event'>

  <h3 translate>New event</h3>
  <!-- {{modal.eventObj}} -->
  <!-- {{modal.schedules}} -->
  <!-- {{modal.slots}} -->
  <div class='ct-tabs' ng-class='{ invalid : modal.validation }'>

    <div class='infoTab' ng-show="modal.activeTab == 1">
      <div>
        <label translate>Event name:</label>
        <input type="text" ng-model='modal.eventObj.name' placeholder="{{'Click to add an event name' | translate}}" maxlength="100" pattern="^.{0,99}$" required>
        <small ng-show='!modal.eventObj.name' class="error" translate>Please type an event name (max 100 chars)</small>
        <label translate>Event description:</label>
        <input type="text" ng-model='modal.eventObj.description' placeholder="{{'Click to add a description' | translate}}" maxlength="250" pattern="^.{0,250}$">
        <!-- <small class="error" translate>Please type a description (max 250 chars)</small> -->
      </div>
      <div class='ct-starttime'>
        <label translate>Start time:</label>
        <input type="text" ng-model='modal.eventObj.starttime' class='startTime' placeholder="{{'HH:MM' | translate}}" required>
        <small ng-show='!modal.eventObj.starttime' class="error priceError" translate>Time?</small>
      </div>
      <div>
        <label>
          {{'Duration:' | translate}} &nbsp;
          <i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="{{'How many days will your event occurs in days, hours and minutes?' | translate}}"></i>
        </label>
        <div class='duration-fields'>
          <!-- <i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="{{'What's your event duration?' | translate}}"></i> -->
          <input type="text" ng-model='modal.eventObj.days' placeholder="{{'Days' | translate}}">
          <small ng-show='!modal.eventObj.days && !modal.eventObj.hours && !modal.eventObj.minutes' class="error priceError" translate>Time?</small>
          <small ng-show='modal.isInvalidFormat(modal.eventObj.days)' class="error priceError" translate>Enter a number</small>
        </div>
        <div class='duration-fields'>
          <input type="text" ng-model='modal.eventObj.hours' placeholder="{{'Hours' | translate}}">
          <small ng-show='!modal.eventObj.days && !modal.eventObj.hours && !modal.eventObj.minutes' class="error priceError" translate>Time?</small>
          <small ng-show='modal.isInvalidFormat(modal.eventObj.hours)' class="error priceError" translate>Enter a number</small>
        </div>
        <div class='duration-fields'>
          <input type="text" ng-model='modal.eventObj.minutes' placeholder="{{'Minutes' | translate}}">
          <small ng-show='!modal.eventObj.days && !modal.eventObj.hours && !modal.eventObj.minutes' class="error priceError" translate>Time?</small>
          <small ng-show='modal.isInvalidFormat(modal.eventObj.minutes)' class="error priceError" translate>Enter a number</small>
        </div>
      </div>
      <div>
        <label translate>Outlet location:</label>
        <select ng-model='modal.eventObj.outletLocationId' ng-options='outletLocation.id as outletLocation.name for outletLocation in modal.outletLocations'>
          <option value="" >{{modal.strings.all_locations}}</option>
        </select>
      </div>
    </div>

    <div ng-show="modal.activeTab == 2">
      <div class="scheduleTab">
        <h4 translate>Schedule</h4>
        <div>
          <label translate>Event frequency:</label>
          <select ng-model='modal.schedules.freq'>
            <option value="ONCE">{{modal.frequencies.once}}</option>
            <option value="DAILY">{{modal.frequencies.daily}}</option>
            <option value="WEEKLY">{{modal.frequencies.weekly}}</option>
            <option value="MONTHLY">{{modal.frequencies.monthly}}</option>
            <option value="YEARLY">{{modal.frequencies.yearly}}</option>
            <option value="CUSTOM">{{modal.frequencies.custom}}</option>
          </select>
          <!-- <small ng-show='!modal.schedules.freq' class="error" translate>Choose the schedule frequency.</small> -->
        </div>
        <div class='sched-dates' ng-hide='modal.schedules.freq == "CUSTOM"'>
          <label translate>Event first occurrence:</label>
          <input type="text" ng-model='modal.schedules.startDate' class='schedStartDate'>
          <small ng-show='modal.schedules.startDate == ""' class="error" translate>Date?</small>
        </div>
        <div class='sched-dates enddate' ng-hide='modal.schedules.freq == "CUSTOM"'>
          <label translate>Event last occurrence:</label>
          <p ng-show='modal.schedules.startDate == ""' translate>Choose the first occurrence.</p>
          <input type="text" ng-model='modal.schedules.endDate' class='schedEndDate' ng-hide='modal.schedules.startDate == ""' ng-disabled='modal.schedules.freq == "ONCE"'>
          <small ng-show='modal.schedules.endDate == "" || !modal.schedules.endDate' class="error" translate>Date?</small>
        </div>
        <div ng-show='modal.schedules.freq == "CUSTOM"'>
          <p translate>Select the days on the calendar below.</p>
          <small ng-show='modal.selectedDays.length == 0' class="error" translate>Date?</small>
        </div>
        <div class='ct-calendar'>
          <div class='white-bg calendar-box'>
            <!-- <h4 translate>Event schedule</h4> -->
            <div class="contentCalendar contentTitleCalendar">
              <table>
                <tr>
                  <td>
                    <button type="button" class="btnLeftCalendar btnCalendar" ng-click="modal.move(-1)" tabindex="-1">&lt;</button>
                  </td>
                  <td>
                    <span class="titleMonth">
                      <select name="ddlMonth" class="titleMonth"
                              ng-model="modal.currentMonth"
                              ng-change="modal.changeMonth()"
                              ng-options="month.valueOf as month.text for month in modal.months"
                              >
                      </select>
                    </span>
                  </td>
                  <td>
                    <button type="button" class="btnRightCalendar btnCalendar" ng-click="modal.move(1)" tabindex="-1">&gt;</button>
                  </td>
                </tr>
              </table>
              <!-- <span class="titleMonth">{{modal.date | date: 'MMMM yyyy'}}</span> -->
            </div>
            <preo-calendar class="eventsDatePicker" selected-days="modal.selectedDays" min-date="modal.minDate" ng-model="modal.date" schedules='modal.schedules' show-weeks="false" ng- class="well well-sm"></preo-calendar>
          </div>
        </div>
      </div>
    </div>

    <div class='slotTab' ng-show="modal.activeTab == 3" dnd-list="modal.slots" dnd-callback='modal.initUiSlots()'>
      <h4>
        {{'Collection Slot' | translate}} &nbsp;
        <i ng-show='modal.customSlotFeature' data-tooltip class="icon-question-sign preoTips has-tip tip-bottom"
          title="{{'Start e End - Interval at which the user can collect the order. Calculated from the event start time. <br>
                        Step - If your slot is too large, you can break it into smaller intervals from the start time till the end time, divided into steps (eg. Start = 22h, End = 23h, Step = 5 will result in 22h05, 22h10, 22h15. .. 22h55, 23h).<br>
                        Lead time - The time it takes to prepare your order before the customer can pick it up.<br><br>
                        In case you define a step, you need to define the slot start.' | translate}}"></i>
        <i ng-show='!modal.customSlotFeature' data-tooltip class="icon-question-sign preoTips has-tip tip-bottom"
          title="{{'End: This slot is available up until the number of minutes provided, relative to the start time of the event. It will not be available after this period is over. <br>
                        Lead time - The time it takes to prepare your order before the customer can pick it up.<br>"></i>
      </h4>
      <div class="slots-parent">
        <div class='ct-slots' ng-repeat='slot in modal.slots' data-index='{{$index}}'>
          <div class='slot-name-container'>
            <label translate>Slot name</label>
            <select ng-model='slot.$type' ng-change='modal.changedSlotName(slot)' ng-options='s.value as s.display for s in modal.slotTypes'>
              <option value="">{{modal.strings.chooseSlot}}</option>
            </select>
            <small ng-show='slot.$type === "" || !slot.$type' class="error" translate>Please choose a slot.</small>
            <input type="text" ng-model='slot.name' ng-if='slot.$type == "CUSTOM"' class='slotName' data-index='{{$index}}' required placeholder="{{'Enter a name for the slot' | translate}}">
            <small ng-show='(slot.$type == "CUSTOM" && (slot.name === "" || !slot.name))' class="error" translate>Please choose a slot.</small>
          </div>

          <div class='slot-sentence' ng-if='slot.$type == "CUSTOM"'>
            <div>
              <span translate>This slot starts </span>
              <div class='ct-inputs-sentence'>
                <input type="text" ng-model='slot.start' pattern="^\d+$" ng-change='slot.startError = false'>
                <small ng-show='(slot.startError || (slot.start && modal.isInvalidFormat(slot.start)) || (slot.start == null && slot.step))' class="error start" translate>Enter minutes?</small>
              </div>
              <span translate>minutes</span>
              <select ng-model='slot.startFactor' class='start-select'>
                <option value="-1">{{modal.strings.before}}</option>
                <option value="1">{{modal.strings.after}}</option>
              </select>
              <span translate>the event start time, it ends</span>
              <div class='ct-inputs-sentence'>
                <input type="text" ng-model='slot.end' pattern="^\d+$" ng-change='slot.endError = false'>
                <small ng-show='(slot.endError || (slot.end && modal.isInvalidFormat(slot.end)) || (slot.end == null && (slot.step || slot.start)))' class="error end" translate>Enter minutes?</small>
              </div>
              <span translate>minutes</span>
              <select ng-model='slot.endFactor' class='end-select'>
                <option value="-1">{{modal.strings.before}}</option>
                <option value="1">{{modal.strings.after}}</option>
              </select>
              <span translate>the event start time with a lead time of</span>
              <div class='ct-inputs-sentence'>
                <input type="text" ng-model='slot.leadTime' required pattern="^\d+$">
                <small ng-show='modal.isInvalidFormat(slot.leadTime) || slot.leadTime === ""' class="error leadtime" translate>Enter minutes?</small>
              </div>
              <span translate>minutes and it</span>
              <select ng-model='slot.hasSteps' class='step-select'>
                <option value="true">{{modal.strings.is}}</option>
                <option value="false">{{modal.strings.is_not}}</option>
              </select>
              <span translate>broken down in steps</span>
              <span ng-show='slot.hasSteps'>{{'of' | translate}}
              <div class='ct-inputs-sentence'>
                <input type="text" ng-model='slot.step' ng-change='slot.stepError = false'>
                <small ng-show='(slot.stepError || (slot.step && modal.isInvalidFormat(slot.step)) || (slot.step == null && slot.start))' class="error step" translate>Enter minutes?</small>
              </div>
              <span translate>minutes</span>.
            </div>
            <div class='ct-slot-controls' ng-show='modal.slots.length > 1'>
              <button type="button" class="sortSlotHandle" title="{{'Move this sloSlot' | translate}}"><i class="pd-move"></i></button> {{"Move this slot" | translate}}&nbsp;&nbsp;&nbsp;&nbsp;
              <button type="button" class="deleteSlot secondary" title="{{'Delete this slot' | translate}}" ng-click='modal.deleteSlot(slot)'><i class="pd-delete"></i></button> {{"Delete this slot" | translate}}
            </div>
          </div>

          <div class='slot-sentence' ng-if='slot.$type != "CUSTOM"'>
            <div>
              <span translate>This slot is available up until</span>
              <div class='ct-inputs-sentence'>
                <input type="text" ng-model='slot.end' pattern="^\d+$" ng-change='slot.endError = false'>
                <small ng-show='(slot.endError || (slot.end && modal.isInvalidFormat(slot.end)) || (!slot.end && (slot.step || slot.start)))' class="error end" translate>Enter minutes?</small>
              </div>
              <span translate>minutes</span>
              <select ng-model='slot.startFactor' class='start-select'>
                <option value="-1">{{modal.strings.before}}</option>
                <option value="1">{{modal.strings.after}}</option>
              </select>
              <span translate>the event start time</span>
              <span translate>with a lead time of</span>
              <div class='ct-inputs-sentence'>
                <input type="text" ng-model='slot.leadTime' required pattern="^\d+$">
                <small ng-show='modal.isInvalidFormat(slot.leadTime) || slot.leadTime === ""' class="error leadtime" translate>Enter minutes?</small>
              </div>
              <span translate>minutes</span>.
            </div>
            <div class='ct-slot-controls' ng-show='modal.slots.length > 1'>
              <button type="button" class="sortSlotHandle" title="{{'Move this slot' | translate}}"><i class="pd-move"></i></button> {{"Move this slot" | translate}}&nbsp;&nbsp;&nbsp;&nbsp;
              <button type="button" class="deleteSlot secondary" title="{{'Delete this slot' | translate}}" ng-click='modal.deleteSlot(slot)'><i class="pd-delete"></i></button> {{"Delete this slot" | translate}}
            </div>
          </div>
        </div>
      </div>

      <div>
        <button ng-click="modal.addSlot()" class="newCollSlot" title="Add another slot">
          <i class="pd-add"></i>
        </button>
        {{'Add another slot' | translate}}
      </div>
      <!-- <div>
        <input type="checkbox">
        <label>Ignore lead time for closing orders</label>
      </div> -->
    </div>

    <div class='ct-btns'>
      <button class="btnPrev button" ng-click="modal.previous()" ng-show='modal.activeTab > 1' translate>Previous</button>
      <button class="btnNext button" ng-click="modal.next()" ng-show='modal.activeTab < modal.totalTabs' translate>Next</button>
      <button class="btnNext button" ng-click="modal.closeModal()" ng-show='modal.activeTab == modal.totalTabs' translate>Done</button>
    </div>

  </div>

</div>
