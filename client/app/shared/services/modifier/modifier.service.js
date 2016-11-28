export default class ModifierService {

  static get UID(){
    return "ModifierService";
  }

  // takes a list of modifiers and a jscore modifier parent object with a saveModifier method
  addModifiersToParent($modifiers, parent){
    let promises  = [];
    $modifiers.forEach((modifier)=>{
      let modClone = angular.copy(modifier);
      modClone.position = (parent.modifiers && parent.modifiers.length ? parent.modifiers[parent.modifiers.length-1].position : 0 ) + 1000
      promises.push(parent.saveModifier(modClone).then((mod)=>{
        mod.modifiers = modClone.modifiers;
        parent.modifiers.push(mod);
      }))
    })
    return promises;
  }

  // takes a list of modifiers and a jscore modifier parent object with a saveModifier method
  addCustomModifierToParent($modifiersToAdd, parent, currentModifiers) {

    let deferred = this.$q.defer();
    let promises  = [];

    $modifiersToAdd.forEach((modifier)=>{
      let modClone = angular.copy(modifier);

      if (!currentModifiers) {
        currentModifiers = parent.modifiers;
      }

      modClone.position = Math.max.apply(Math, currentModifiers.map(function(o){return o.position;})) + 1000;

      promises.push(parent.saveModifier(modClone));
    });

    this.$q.all(promises)
      .then((modifiers) => {

        if (modifiers && modifiers.length) {
          modifiers.forEach((mod, index) => {

            mod.modifiers = $modifiersToAdd[index].modifiers;
          });
        }

        deferred.resolve(modifiers);
      }, (err) => {

        deferred.reject(err);
      });

    return deferred.promise;
  }

  isModifiersDuplicated($modifiers, parent){
    let $modIds = $modifiers.map((m)=>m.id);
    let $parentModIds = parent.modifiers.map((m)=>m.id);
    let dupes = $modIds.filter(function(id) {
      return $parentModIds.indexOf(id) !== -1;
    });
    return dupes.length > 0;
  }

  //this method loops through all modifiers nested inside a given parent modifier and find matches from an array of modifiers, if any is found there is cyclic referencing
  canAddModifiers($modifiers, parent){
    var found = false;
    var i=-1;
    let parentModIds = []
    function getAllIds(mod, modIds = []){
      i++
      //add mod to array
      modIds.push(mod.id);

      if (mod.modifiers && mod.modifiers.length){
        for (let i=0;i<mod.modifiers.length;i++){
          getAllIds(mod.modifiers[i], [...modIds])
        }
      }
      if (mod.items && mod.items.length){
        for (let i=0;i<mod.items.length;i++){
          for (let j=0;j<mod.items[i].modifiers.length;j++){
            getAllIds(mod.items[i].modifiers[j], [...modIds])
          }
        }
      }

      //try to find repetittions
      let thisModModIds = mod.modifiers.map((m)=>m.id);
      thisModModIds.push(mod.id);
      for (let k=0;k<thisModModIds.length;k++){
        let occurrences = modIds.reduce(function(n, val) {
           return n + (val === thisModModIds[k]);
        }, 0);
        //if theres more than one occurence of something in the "arrayed" tree we have a cyclic reference
        if (occurrences > 1){
          found = thisModModIds[k];
        }
      }

    }

    let parentClone = angular.copy(parent);
    parentClone.modifiers.splice(-1,0,...$modifiers);
    getAllIds(parentClone);
    console.log("found:", found);
    return found ? true : false;

  }

   showCreateModifier(){

    let newModifier = {
        $selected:true,
        position:Math.max.apply(Math,this.data.modifiers.map(function(o){return o.position;})) + 1000,
        variant:0,
        minChoices:0,
        maxChoices:1,
        description:"",
        name:"",
        modifiers: [],
        items:[
        {
          visible:1,
          price:'',
          position:0
        }
        ],
        venueId:this.$stateParams.venueId
    };

    let isCreating = false;
      this.data.modifiers.forEach((s, index)=>{
        if (!s.id){
          isCreating = true;
        }
      });
      if (isCreating){
        return;
    }
    this.data.modifiers.push(newModifier);
  }

  cloneModifier(modifier){
    const newModifierData = angular.copy(modifier);
    //remove ids from all necesasry entities to duplicate them. We'll not clone Modifiers but will clone sizes. Images are handled below
    delete newModifierData.id;
    if (newModifierData.items && newModifierData.items.length){
      newModifierData.items.forEach((modifierItem)=>{
        delete modifierItem.id;
        delete modifierItem.modifierId;
      })
    }
    // Cloning an image is more complicated, we need to get the base64 from the current image and repost it
    return this.createModifier(newModifierData)
      .then((newModifierData)=>{
        this.data.modifiers.push(newModifierData);
        return newModifierData;
      })
  }

  createModifier(modifier){
    return Preoday.Modifier.save(modifier)
  }
  updateModifier(modifier){
    var promises = [];
    //delete each of the individual modifier items
    if (modifier.$deletedItems && modifier.$deletedItems.length){
        modifier.$deletedItems.forEach((modifierItem)=>{
          if (modifierItem.id){
            promises.push(modifierItem.delete());
          }
        });
      }
    //once they're all deleted, update the modifier to change values and create new options
    return this.$q.all(promises)
      .then(modifier.update.bind(modifier))
  }


  removeFromItem(modifier, item){
    return modifier.delete({itemId:item.id});
  }

  removeFromModifierItem(modifier, modifierItem){
    return modifier.delete({modifierItemId:modifierItem.id});
  }

  removeFromParent(modifier, parent){
    return modifier.delete({parentId:parent.id});
  }

  removeFromSection(modifier, section){
    return modifier.delete({sectionId:section.id})
      .then(()=>{
        section.modifiers = section.modifiers.filter((m)=>modifier.id !== m.id);
      })
  }


  deleteModifier(modifier){
    return modifier.delete()
      .then(()=>{
        if (this.data.modifiers){

          this.$rootScope.$broadcast(this.BroadcastEvents.ON_DELETE_MODIFIER, modifier);
          this.data.modifiers.splice(this.data.modifiers.indexOf(modifier), 1);
        }
      })
  }

  getById(id){
    return this.data.modifiers.filter((m)=>id===m.id)[0];
  }
  getByIds(ids){

    return this.data.modifiers ? this.data.modifiers.filter((m)=>ids.indexOf(m.id)>-1) : [];
  }


  getModifiers(venueId, expand='items,modifiers'){
    if (this.data.modifiers){
      return this.$q.resolve(this.data);
    } else if ( this.p){
      return this.p;
    }
    this.p = this.$q((resolve, reject)=>{
      Preoday.Modifier.getAll({venueId:venueId, expand:expand})
        .then((modifiers)=>{
          console.log("got modifiers", modifiers)
          this.data.modifiers = (modifiers.filter((m)=>m.variant===0) || []).sort((a, b) => {

            return a.id - b.id;
          });
          console.log("this data", this.data.modifiers);
          resolve(this.data);
        },(err)=>{
          console.log("Error fetching modifiers", err);
          reject(err);
        })
        .catch((err)=>{
          console.log("Error fetching modifiers", err);
          reject(err);
        });
    })
    return this.p;
  }



  constructor($q, $rootScope, $stateParams, BroadcastEvents) {
    "ngInject";
    this.$rootScope = $rootScope;
    this.$stateParams = $stateParams;
    this.BroadcastEvents = BroadcastEvents;
    this.$q =$q;
    this.data = {
      modifiers: []
    };

  }
}