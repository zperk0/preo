
export default class eventsController {
  static get UID(){
    return "eventsController";
  }


  constructor() {
    "ngInject";

    this.data = {
    	events: [{
    		id: 1,
    		name: 'test 1'
    	}, {
    		id: 2,
    		name: 'test 2'
    	}, {
    		id: 3,
    		name: 'test 3'
    	}]
    }
  }
}
