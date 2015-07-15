<div class='ct-modal-event'>

  <h3>{{ modal.eventObj.name }}</h3>
  <!-- <input type="text" ng-model='modal.eventObj.name'> -->
  <!-- {{modal.eventObj}} -->
  <!-- {{modal.schedules}} -->
  <!-- {{modal.slots}} -->
  <div>

    <div ng-show="modal.activeTab == 1">
      <div>
        <label for="">Name:</label>
        <input type="text" ng-model='modal.eventObj.name' placeholder='Event name'>
      </div>
      <div>
        <label for="">Duration:</label>
        <input type="text" ng-model='modal.eventObj.days' placeholder='Days'>
        <input type="text" ng-model='modal.eventObj.hours' placeholder='Hours'>
        <input type="text" ng-model='modal.eventObj.minutes' placeholder='Minutes'>
      </div>
      <div>
        <label for="">Start time:</label>
        <input type="text" ng-model='modal.eventObj.starttime'>
      </div>
    </div>

    <div class='grid-block' ng-repeat='sched in modal.schedules' ng-show="modal.activeTab == 2">
      <div class='grid-block'>
        <label for="">Schedule frequency:</label>
        <!-- <input type="text" ng-model='sched.freq'> -->
        <select ng-model='sched.freq'>
          <option value="ONCE">ONCE</option>
          <option value="DAILY">DAILY</option>
          <option value="WEEKLY">WEEKLY</option>
          <option value="MONTHLY">MONTHLY</option>
          <option value="YEARLY">YEARLY</option>
        </select>
      </div>
      <div class='grid-block'>
        <label for="">Schedule Start Date:</label>
        <input type="text" ng-model='sched.startDate'>
      </div>
      <div class='grid-block'>
        <label for="">Schedule End Date:</label>
        <input type="text" ng-model='sched.endDate'>
      </div>
      <div class="grid-block medium-2">
        <button ng-click="modal.addSchedule()" ng-if="$index == 0" type="button" class="newCollSlot ng-scope" title="Add another slot"><i class="pd-add"></i></button>
      </div>
    </div>

    <div ng-show="modal.activeTab == 3">
      <div>
        <p class='slot-sentence'>
          This slot starts <input type="text" ng-model='modal.slots.start'> minutes 
          <select ng-model='modal.slots.name' name="" id="">
            <option value="">Before</option>
            <option value="">After</option>
          </select> 
          the event with a lead time of <input type="text" ng-model='modal.slots.leadTime'> minutes 
          <select ng-model='modal.slots.nameleadtime' name="" id="">
            <option value="">Before</option>
            <option value="">After</option>
          </select>.
        </p>
      </div>
      <!-- <div>
        <label for="">Slot Name:</label>
        <input type="text">
      </div>
      <div>
        <label for="">Slot Start:</label>
        <input type="text">
      </div>
      <div>
        <label for="">Slot Step:</label>
        <input type="text">
      </div>
      <div>
        <label for="">Slot End:</label>
        <input type="text">
      </div>
      <div>
        <label for="">Slot Lead Time:</label>
        <input type="text">
      </div> -->
      <div>
        <input type="checkbox">
        <label for="">Ignore lead time for closing orders</label>
      </div>
      <button ng-click="add()" ng-if="$index == 0" type="button" class="newCollSlot ng-scope" title="Add another slot"><i class="pd-add"></i></button>
    </div>
  </div>

  <!-- <p>Selected: <b>{{ selected.item }}</b></p> -->

  <button class="btnPrev button" ng-click="modal.previous()" ng-show='modal.activeTab > 1'>Previous</button>
  <button class="btnNext button" ng-click="modal.next()" ng-show='modal.activeTab < 3'>Next</button>
  <button class="btnNext button" ng-click="modal.closeModal()" ng-show='modal.activeTab == 3'>Done</button>

</div>
