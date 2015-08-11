<div class='ct-modal-event'>

  <h3><?php echo _("New event");?></h3>
  <!-- {{modal.eventObj}} -->
  <!-- {{modal.schedules}} -->
  <!-- {{modal.slots}} -->
  <div class='ct-tabs' ng-class='{ invalid : modal.validation }'>

    <div class='infoTab' ng-show="modal.activeTab == 1">
      <div>
        <label><?php echo _("Event name:");?></label>
        <input type="text" ng-model='modal.eventObj.name' placeholder='<?echo _("Click to add an event name");?>' maxlength="100" pattern="^.{0,99}$" required>
        <small ng-show='!modal.eventObj.name' class="error"><?echo _("Please type an event name (max 100 chars)");?></small>
        <label><?php echo _("Event description:");?></label>
        <input type="text" ng-model='modal.eventObj.description' placeholder='<?echo _("Click to add a description");?>' maxlength="250" pattern="^.{0,250}$">
        <!-- <small class="error"><?echo _("Please type a description (max 250 chars)");?></small> -->
      </div>
      <div class='ct-starttime'>
        <label><?php echo _("Start time:");?></label>
        <input type="text" ng-model='modal.eventObj.starttime' class='startTime' placeholder='<?php echo _("HH:MM");?>' required>
        <small ng-show='!modal.eventObj.starttime' class="error priceError"><?echo _("Time?");?></small>
      </div>
      <div>
        <label>
          <?php echo _("Duration:");?>&nbsp;
          <i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("How many days will your event occurs in days, hours and minutes?");?>"></i>
        </label>
        <div class='duration-fields'>
          <!-- <i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom" title="<?echo _("What's your event duration?");?>"></i> -->
          <input type="text" ng-model='modal.eventObj.days' placeholder='<?php echo _("Days");?>'>
          <small ng-show='!modal.eventObj.days && !modal.eventObj.hours && !modal.eventObj.minutes' class="error priceError"><?echo _("Time?");?></small>
          <small ng-show='modal.isInvalidFormat(modal.eventObj.days)' class="error priceError"><?echo _("Enter a number");?></small>
        </div>
        <div class='duration-fields'>
          <input type="text" ng-model='modal.eventObj.hours' placeholder='<?php echo _("Hours");?>'>
          <small ng-show='!modal.eventObj.days && !modal.eventObj.hours && !modal.eventObj.minutes' class="error priceError"><?echo _("Time?");?></small>
          <small ng-show='modal.isInvalidFormat(modal.eventObj.hours)' class="error priceError"><?echo _("Enter a number");?></small>
        </div>
        <div class='duration-fields'>
          <input type="text" ng-model='modal.eventObj.minutes' placeholder='<?php echo _("Minutes");?>'>
          <small ng-show='!modal.eventObj.days && !modal.eventObj.hours && !modal.eventObj.minutes' class="error priceError"><?echo _("Time?");?></small>
          <small ng-show='modal.isInvalidFormat(modal.eventObj.minutes)' class="error priceError"><?echo _("Enter a number");?></small>
        </div>
      </div>
      <div>
        <label><?php echo _("Outlet location:");?></label>
        <select ng-model='modal.eventObj.outletLocationId' ng-options='outletLocation.id as outletLocation.name for outletLocation in modal.outletLocations'>
          <option value=""  ><?echo _("All Locations")?></option>
        </select>
      </div>
    </div>

    <div ng-show="modal.activeTab == 2">
      <div class="scheduleTab">
        <h4><?php echo _("Schedule");?></h4>
        <div>
          <label><?php echo _("Event frequency:");?></label>
          <select ng-model='modal.schedules.freq'>
            <option value="ONCE"><?php echo _("ONCE");?></option>
            <option value="DAILY"><?php echo _("DAILY");?></option>
            <option value="WEEKLY"><?php echo _("WEEKLY");?></option>
            <option value="MONTHLY"><?php echo _("MONTHLY");?></option>
            <option value="YEARLY"><?php echo _("YEARLY");?></option>
            <option value="CUSTOM"><?php echo _("CUSTOM");?></option>
          </select>
          <!-- <small ng-show='!modal.schedules.freq' class="error"><?echo _("Choose the schedule frequency.");?></small> -->
        </div>
        <div class='sched-dates' ng-hide='modal.schedules.freq == "CUSTOM"'>
          <label><?php echo _("Event first occurrence:");?></label>
          <input type="text" ng-model='modal.schedules.startDate' class='schedStartDate'>
          <small ng-show='modal.schedules.startDate == ""' class="error"><?echo _("Date?");?></small>
        </div>
        <div class='sched-dates enddate' ng-hide='modal.schedules.freq == "CUSTOM"'>
          <label><?php echo _("Event last occurrence:");?></label>
          <p ng-show='modal.schedules.startDate == ""'><?php echo _("Choose the first occurrence.");?></p>
          <input type="text" ng-model='modal.schedules.endDate' class='schedEndDate' ng-hide='modal.schedules.startDate == ""' ng-disabled='modal.schedules.freq == "ONCE"'>
          <small ng-show='modal.schedules.endDate == "" || !modal.schedules.endDate' class="error"><?echo _("Date?");?></small>
        </div>
        <div ng-show='modal.schedules.freq == "CUSTOM"'>
          <p><?php echo _("Select the days on the calendar below.");?></p>
          <small ng-show='modal.selectedDays.length == 0' class="error"><?echo _("Date?");?></small>
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
              <!-- <span class="titleMonth">{{ modal.date | date: 'MMMM yyyy' }}</span> -->
            </div>
            <preo-calendar class="eventsDatePicker" selected-days="modal.selectedDays" min-date="modal.minDate" ng-model="modal.date" schedules='modal.schedules' show-weeks="false" ng- class="well well-sm"></preo-calendar>
          </div>
        </div>
      </div>
    </div>

    <div class='slotTab' ng-show="modal.activeTab == 3">
      <h4>
        <?php echo _("Collection Slot");?>&nbsp;
        <i data-tooltip class="icon-question-sign preoTips has-tip tip-bottom"
          title="<?echo _("Start e End - Interval at which the user can collect the order. Calculated from the event start time. <br>
                        Step - If your slot is too large, you can break it into smaller intervals from the start time till the end time, divided into steps (eg. Start = 22h, End = 23h, Step = 5 will result in 22h05, 22h10, 22h15. .. 22h55, 23h).<br>
                        Lead time - The time it takes to prepare your order before the customer can pick it up.<br><br>
                        In case you define a step, you need to define the slot start and end.");?>"></i>
      </h4>
      <div class='ct-slots' ng-repeat='slot in modal.slots'>
        <div>
          <label><?php echo _("Slot name");?></label>
          <input type="text" ng-model='slot.name' class='slotName' data-index='{{ $index }}' required placeholder="<?echo _("Enter a name for the slot");?>">
          <small ng-show='slot.name == "" || !slot.name' class="error"><?echo _("Please choose a slot.");?></small>
        </div>
        <div class='slot-sentence'>
          <span><?php echo _("This slot starts ");?></span>
          <div class='ct-inputs-sentence'>
            <input type="text" ng-model='slot.start' pattern="^\d+$" ng-change='slot.startError = false'>
            <small ng-show='(slot.startError || (slot.start && modal.isInvalidFormat(slot.start)) || (!slot.start && (slot.step || slot.end)))' class="error start"><?echo _("Enter minutes?");?></small>
            <!-- <small ng-show='slot.start == ""' class="error start"><?echo _("Enter minutes?");?></small> -->
          </div>
          <span><?php echo _("minutes");?></span>
          <select ng-model='slot.startFactor' class='start-select'>
            <option value="-1"><?php echo _("Before");?></option>
            <option value="1"><?php echo _("After");?></option>
          </select>
          <span><?php echo _("the event, it ends");?></span>
          <div class='ct-inputs-sentence'>
            <input type="text" ng-model='slot.end' pattern="^\d+$" ng-change='slot.endError = false'>
            <!-- <small ng-show='slot.end == ""' class="error end"><?echo _("Enter minutes?");?></small> -->
            <small ng-show='(slot.endError || (slot.end && modal.isInvalidFormat(slot.end)) || (!slot.end && (slot.step || slot.start)))' class="error end"><?echo _("Enter minutes?");?></small>
          </div>
          <span><?php echo _("minutes");?></span>
          <select ng-model='slot.endFactor' class='end-select'><a href=""></a>
            <option value="-1"><?php echo _("Before");?></option>
            <option value="1"><?php echo _("After");?></option>
          </select>
          <span><?php echo _("the event start time with a lead time of");?></span>
          <div class='ct-inputs-sentence'>
            <input type="text" ng-model='slot.leadTime' required pattern="^\d+$">
            <!-- <small ng-show='modal.isInvalidFormat(slot.leadTime) && slot.leadTime' class="error priceError"><?echo _("Enter a number");?></small> -->
            <small ng-show='modal.isInvalidFormat(slot.leadTime)' class="error leadtime"><?echo _("Enter minutes?");?></small>
          </div>
          <span><?php echo _("minutes and it");?></span>
          <select ng-model='slot.hasSteps' class='step-select'>
            <option value="true"><?php echo _("is");?></option>
            <option value="false"><?php echo _("is not");?></option>
          </select>
          <span><?php echo _("broken down in steps");?></span>
          <span ng-show='slot.hasSteps'><?php echo _("of");?>
          <div class='ct-inputs-sentence'>
            <input type="text" ng-model='slot.step' ng-change='slot.stepError = false'>
            <!-- <small ng-show='slot.step == ""' class="error step"><?echo _("Enter minutes?");?></small> -->
            <small ng-show='(slot.stepError || (slot.step && modal.isInvalidFormat(slot.step)) || (!slot.step && (slot.start || slot.end)))' class="error step"><?echo _("Enter minutes?");?></small>
          </div>
          <span><?php echo _("minutes");?></span>.
          <div class='ct-delete' ng-if='$index != 0'>
            <button ng-click='modal.deleteSlot(slot)' type="button" class="delCollSlot secondary" title="Delete this slot"><i class="pd-delete"></i></button>
            <?php echo _("Delete this slot");?>
          </div>
        </div>
      </div>
      <div>
        <button ng-click="modal.addSlot()" class="newCollSlot" title="Add another slot">
          <i class="pd-add"></i>
        </button>
        <?php echo _("Add another slot");?>
      </div>
      <!-- <div>
        <input type="checkbox">
        <label>Ignore lead time for closing orders</label>
      </div> -->
    </div>

    <div class='ct-btns'>
      <button class="btnPrev button" ng-click="modal.previous()" ng-show='modal.activeTab > 1'><?php echo _("Previous");?></button>
      <button class="btnNext button" ng-click="modal.next()" ng-show='modal.activeTab < modal.totalTabs'><?php echo _("Next");?></button>
      <button class="btnNext button" ng-click="modal.closeModal()" ng-show='modal.activeTab == modal.totalTabs'><?php echo _("Done");?></button>
    </div>

  </div>

</div>
