export default class eventBasicController {
  static get UID(){
    return "eventBasicController"
  }

  buildOutletLocationTree () {

  	if (!this.outletLocationRootGroup) {
  		return;
  	}

  	this.outletLocationTree = this.buildTree();
  }

  buildTree () {

  	var output = [];

  	this.outletLocationRootGroup.outletLocations.forEach((outletLocation, index) => {

  		this.indentNodeForSelect(outletLocation, 1, output);
  	});  	

  	return output;
  }

  indentNodeForSelect (outletLocation, indent, output) {

    var formattedChild = {
          id: outletLocation.id,
          name: this.UtilsService.str_repeat("--", indent) + ' ' + this.getOutletLocationName(outletLocation)
        };

    output.push(formattedChild);

    if (!outletLocation.isSeat() && outletLocation.hasChildren()) {
    	var children = outletLocation.getChildren();
	    children.forEach((elem, index) => {

	      this.indentNodeForSelect(elem, (indent+1), output);
	    }); 
    } 	
  }

  getOutletLocationName (outletLocation) {

    let fullName = [outletLocation.name];

    if (outletLocation.isSeat()) {
      fullName.push(' : ');
      fullName.push(outletLocation.seatStart);
      fullName.push('-');
      fullName.push(outletLocation.seatEnd);
    }

    return fullName.join('');
  }  

  /* @ngInject */
  constructor($scope, OutletLocationService, UtilsService) {
    'ngInject';

    this.outletLocationTree = null;

    this.UtilsService = UtilsService;

    OutletLocationService.getOutletLocations()
    	.then((data) => {
    		
    		this.outletLocationRootGroup = data.rootGroup;
    		this.buildOutletLocationTree();
    	}, () => {

    		this.outletLocationRootGroup = null;
    	});
  }
}
