<div class='ct-modal-event'>

  <h3><?php echo _("New event");?></h3>
  <!-- {{modal.eventObj}} -->
  <!-- {{modal.schedules}} -->
  <!-- {{modal.slots}} -->
  <div class='ct-tabs'>

    <div class='infoTab' ng-show="modal.activeTab == 1">
      <div>
        <label><?php echo _("Event name:");?></label>
        <input type="text" ng-model='modal.eventObj.name' placeholder='<?php echo _("Event name");?>' maxlength="100">
        <small class="error"><?echo _("Please type an event name (max 100chars)");?></small>
        <label><?php echo _("Event description:");?></label>
        <input type="text" ng-model='modal.eventObj.description' placeholder='<?php echo _("Event description");?>' maxlength="250">
        <small class="error"><?echo _("Please type a description (max 250chars)");?></small>
      </div>
      <div>
        <!-- <h4>Duration</h4> -->
        <div class='duration-fields'>
          <label><?php echo _("Start time:");?></label>
          <input type="text" ng-model='modal.eventObj.starttime' class='startTime' placeholder='<?php echo _("Start time");?>'>
          <small class="error priceError"><?echo _("Time?");?></small>
        </div>
        <div class='duration-fields'>
          <label><?php echo _("Days:");?></label>
          <input type="text" ng-model='modal.eventObj.days' placeholder='<?php echo _("Days");?>'>
        </div>
        <div class='duration-fields'>
          <label><?php echo _("Hours:");?></label>
          <input type="text" ng-model='modal.eventObj.hours' placeholder='<?php echo _("Hours");?>'>
        </div>
        <div class='duration-fields'>
          <label><?php echo _("Minutes:");?></label>
          <input type="text" ng-model='modal.eventObj.minutes' placeholder='<?php echo _("Minutes");?>'>
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
          <!-- <input type="text" ng-model='sched.freq'> -->
          <select ng-model='modal.schedules.freq'>
            <option value="ONCE"><?php echo _("ONCE");?></option>
            <option value="DAILY"><?php echo _("DAILY");?></option>
            <option value="WEEKLY"><?php echo _("WEEKLY");?></option>
            <option value="MONTHLY"><?php echo _("MONTHLY");?></option>
            <option value="YEARLY"><?php echo _("YEARLY");?></option>
            <option value="CUSTOM"><?php echo _("CUSTOM");?></option>
          </select>
          <small class="error"><?echo _("Choose the schedule frequency.");?></small>
        </div>
        <div class='sched-dates' ng-hide='modal.schedules.freq == "CUSTOM"'>
          <label><?php echo _("Event first occurency:");?></label>
          <input type="text" ng-model='modal.schedules.startDate' class='schedStartDate'>
          <small class="error"><?echo _("Date?");?></small>
        </div>
        <div class='sched-dates' ng-hide='modal.schedules.freq == "CUSTOM"'>
          <label><?php echo _("Event last occurency:");?></label>
          <p ng-show='modal.schedules.startDate == ""'><?php echo _("Choose the first occurency.");?></p>
          <input type="text" ng-model='modal.schedules.endDate' class='schedEndDate' ng-hide='modal.schedules.startDate == ""'>
          <small class="error"><?echo _("Date?");?></small>
        </div>
        <div ng-show='modal.schedules.freq == "CUSTOM"'>
          <p><?php echo _("Select the days on the calendar below.");?></p>
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
      <h4><?php echo _("Collection Slot");?></h4>
      <div class='ct-slots' ng-repeat='slot in modal.slots'>
        <div>
          <label><?php echo _("Slot name");?></label>
          <input type="text" ng-model='slot.name' class='slotName' data-index='{{ $index }}'>
          <small class="error"><?echo _("Please choose a slot.");?></small>
        </div>
        <p class='slot-sentence'>
          <?php echo _("This slot starts ");?><input type="text" ng-model='slot.start'> <?php echo _("minutes");?>
          <select ng-model='slot.startFactor' class='start-select'>
            <option value="-1"><?php echo _("Before");?></option>
            <option value="1"><?php echo _("After");?></option>
          </select>
          <small class="error"><?echo _("Please choose an option.");?></small>
          <?php echo _("the event, it ends");?> <input type="text" ng-model='slot.end'><small class="error"><?echo _("Enter minutes?");?></small> <?php echo _("minutes");?>
          <select ng-model='slot.endFactor' class='end-select'>
            <option value="-1"><?php echo _("Before");?></option>
            <option value="1"><?php echo _("After");?></option>
          </select>
          <?php echo _("the event start time with a lead time of");?>
          <input type="text" ng-model='slot.leadTime'><small class="error"><?echo _("Enter minutes?");?></small> <?php echo _("minutes and it");?>
          <select ng-model='slot.hasSteps' class='step-select'>
            <option value="true"><?php echo _("is");?></option>
            <option value="false"><?php echo _("is not");?></option>
          </select>
          <small class="error"><?echo _("Please choose an option.");?></small>
          <?php echo _("broken down in steps");?>
          <span ng-show='slot.hasSteps'><?php echo _("of");?> <input type="text" ng-model='slot.step'><small class="error"><?echo _("Enter minutes?");?></small> <?php echo _("minutes");?></span>
          .
        </p>
      </div>
      <div>
        <label><?php echo _("Add another slot");?></label>
        <button ng-click="modal.addSlot()" class="newCollSlot" title="Add another slot">
          <i class="pd-add"></i>
        </button>
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
