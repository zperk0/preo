<div class='ct-modal-event'>

  <h3>New event</h3>
  <!-- {{modal.eventObj}} -->
  <!-- {{modal.schedules}} -->
  <!-- {{modal.slots}} -->
  <!-- <small class="error"><?echo _("Date?");?></small> -->
  <!-- <small class="error priceError"><?echo _("Time?");?></small> -->
  <!-- <small class="error priceError"><?echo _("Time?");?></small> -->
  <div class='ct-tabs'>

    <div ng-show="modal.activeTab == 1">
      <div>
        <label>Event name:</label>
        <input type="text" ng-model='modal.eventObj.name' placeholder='Event name' maxlength="100">
        <small class="error"><?echo _("Please type an event name (max 100chars)");?></small>
        <label>Event description:</label>
        <input type="text" ng-model='modal.eventObj.description' placeholder='Event description' maxlength="250">
        <small class="error"><?echo _("Please type a description (max 250chars)");?></small>
      </div>
      <div>
        <h4>Duration</h4>
        <label>Days:</label>
        <input type="text" ng-model='modal.eventObj.days' placeholder='Days'>
        <label>Hours:</label>
        <input type="text" ng-model='modal.eventObj.hours' placeholder='Hours'>
        <label>Minutes:</label>
        <input type="text" ng-model='modal.eventObj.minutes' placeholder='Minutes'>
      </div>
      <div>
        <label>Start time:</label>
        <input type="text" ng-model='modal.eventObj.starttime' class='startTime' placeholder='Start time'>
        <small class="error priceError"><?echo _("Time?");?></small>
      </div>
    </div>

    <div class='scheduleTab' ng-show="modal.activeTab == 2">
      <h4>Schedule</h4>
      <div>
        <label>Schedule frequency:</label>
        <!-- <input type="text" ng-model='sched.freq'> -->
        <select ng-model='modal.schedules.freq'>
          <option value="ONCE">ONCE</option>
          <option value="DAILY">DAILY</option>
          <option value="WEEKLY">WEEKLY</option>
          <option value="MONTHLY">MONTHLY</option>
          <option value="YEARLY">YEARLY</option>
          <option value="CUSTOM">CUSTOM</option>
        </select>
        <small class="error"><?echo _("Choose the schedule frequency.");?></small>
      </div>
      <div ng-hide='modal.schedules.freq == "CUSTOM"'>
        <label>Schedule Start Date:</label>
        <input type="text" ng-model='sched.date' class='schedStartDate'>
        <small class="error"><?echo _("Date?");?></small>
      </div>
      <div ng-hide='modal.schedules.freq == "CUSTOM"'>
        <label>Schedule End Date:</label>
        <input type="text" ng-model='sched.endDate' class='schedEndDate'>
        <small class="error"><?echo _("Date?");?></small>
      </div>
      <div ng-show='modal.schedules.freq == "CUSTOM"'>
        <p>Select the days on the calendar beside.</p>
      </div>
      <!-- <div class="grid-block medium-2">
        <button ng-click="modal.addSchedule()" ng-if="$index == 0" type="button" class="newCollSlot ng-scope" title="Add another slot"><i class="pd-add"></i></button>
      </div> -->
    </div>

    <div class='slotTab' ng-show="modal.activeTab == 3">
      <h4>Collection Slot</h4>
      <div class='ct-slots' ng-repeat='slot in modal.slots'>
        <div>
          <label>Slot name</label>
          <input type="text" ng-model='slot.name' class='slotName' data-index='{{ $index }}'>
          <small class="error"><?echo _("Please choose a slot.");?></small>
        </div>
        <p class='slot-sentence'>
          This slot starts <input type="text" ng-model='slot.start'> minutes 
          <select ng-model='slot.startFactor' class='start-select'>
            <option value="-1">Before</option>
            <option value="1">After</option>
          </select>
          <small class="error"><?echo _("Please choose an option.");?></small>
          the event, it ends <input type="text" ng-model='slot.end'><small class="error"><?echo _("Enter minutes?");?></small> minutes
          <select ng-model='slot.endFactor' class='end-select'>
            <option value="-1">Before</option>
            <option value="1">After</option>
          </select>
          the event start time with a lead time of 
          <input type="text" ng-model='slot.leadTime'><small class="error"><?echo _("Enter minutes?");?></small> minutes and it
          <select ng-model='slot.hasSteps' class='step-select'>
            <option value="true">is</option>
            <option value="false">is not</option>
          </select>
          <small class="error"><?echo _("Please choose an option.");?></small>
          broken down in steps
          <span ng-show='slot.hasSteps'>of <input type="text" ng-model='slot.step'><small class="error"><?echo _("Enter minutes?");?></small> minutes</span>
          .
        </p>
      </div>
      <div>
        <label>Add another slot</label>
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
      <button class="btnPrev button" ng-click="modal.previous()" ng-show='modal.activeTab > 1'>Previous</button>
      <button class="btnNext button" ng-click="modal.next()" ng-show='modal.activeTab < modal.totalTabs'>Next</button>
      <button class="btnNext button" ng-click="modal.closeModal()" ng-show='modal.activeTab == modal.totalTabs'>Done</button>
    </div>

  </div>
  <!-- <div ng-show="modal.activeTab == 4"> -->
  <div class='ct-calendar'>
    <div class='white-bg calendar-box'>
      <h4 translate>Event schedule</h4>
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
      <preo-calendar class="eventsDatePicker" day-click="modal.openEvent(events)" events="modal.events" min-date="modal.minDate" ng-model="modal.date" show-weeks="false" class="well well-sm"></preo-calendar>
    </div>
  </div>

</div>
