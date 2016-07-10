export default class ModifierService {

  static get UID(){
    return "ModifierService";
  }

   showCreateModifier(){

    let newModifier = {
        $selected:true,
        position:0,
        variant:0,
        minChoices:0,
        maxChoices:1,
        description:"",
        name:"",
        items:[],
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

  createModifier(modifier){
    return Preoday.Modifier.save(modifier)
  }
  updateModifier(modifier){
    var promises = [];
    //delete each of the individual modifier items
    if (modifier.$deletedItems && modifier.$deletedItems.length){
        modifier.$deletedItems.forEach((modifierItem)=>{
            promises.push(modifierItem.delete());
        });
      }
    //once they're all deleted, update the modifier to change values and create new options
    return this.$q.all(promises)
      .then(modifier.update.bind(modifier))
  }


  deleteModifier(modifier){
    return modifier.delete()
      .then(()=>{
        if (this.data.modifiers){
          this.data.modifiers = this.data.modifiers.filter((m)=>m.id!==modifier.id)
        }
      })
  }


  getModifiers(venueId, expand){
    return this.$q((resolve, reject)=>{

      if (this.data.modifiers){
        resolve(this.data);
      } else {
        Preoday.Modifier.getAll({venueId:venueId, expand:expand})
        .then((modifiers)=>{
          this.data.modifiers = modifiers.filter((m)=>m.variant===0);
          resolve(this.data);
        },(err)=>{
          console.log("Error fetching modifiers", err);
          reject(err);
        })
        .catch((err)=>{
          console.log("Error fetching modifiers", err);
          reject(err);
        });
      }
    })
  }



  constructor($q, $rootScope, $stateParams) {
    "ngInject";
    this.$stateParams = $stateParams;
    this.$q =$q;
    this.data={};

  }
}