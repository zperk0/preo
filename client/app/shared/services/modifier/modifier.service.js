export default class ModifierService {

  static get UID(){
    return "ModifierService";
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
        items:[
        {
          visible:1,
          price:0,
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
    return modifier.delete({itemId:item.id})
      .then(()=>{
        item.modifiers = item.modifiers.filter((m)=>modifier.id !== m.id);
      })
  }

  removeFromModifierItem(modifier, modifierItem){
    return modifier.delete({modifierItemId:modifierItem.id})
      .then(()=>{
        modifierItem.modifiers = modifierItem.modifiers.filter((m)=>modifier.id !== m.id);
      })
  }

  removeFromParent(modifier, parent){
    return modifier.delete({parentId:parent.id})
      .then(()=>{
        parent.modifiers = parent.modifiers.filter((m)=>modifier.id !== m.id);
      })
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
          this.data.modifiers = this.data.modifiers.filter((m)=>m.id!==modifier.id)
        }
      })
  }

  //this method will replace  the retrieved modifier with a reference of the parent modifier in the list
  //we do this for two reasons, eventually we'll replace the child list with ids only so we don't have to return everything
  //also it'll force an update by reference if we change any of the values
  populateModifiers(index, m = false, arr = []){
    let mod;
    if (m === false){
      mod = this.data.modifiers[index];
    } else{
      mod = arr[m];
    }

    if (mod.modifiers && mod.modifiers.length){
      for (let i=0;i<mod.modifiers.length;i++){
        this.populateModifiers(false, i, mod.modifiers)
      }
    }
    if (mod.items && mod.items.length){
      for (let i=0;i<mod.items.length;i++){
        for (let j=0;j<mod.items[i].modifiers.length;j++){
          this.populateModifiers(false, j, mod.items[i].modifiers)
        }
      }
    }
    // little clue as to why assigning to mod doesn't work when it's an array
    if (m === false){
      mod = this.data.modifiers.filter((m)=>mod.id===m.id)[0];
    } else {
      arr[m] = this.data.modifiers.filter((m)=>mod.id===m.id)[0];
    }
    if(index !== false && index <this.data.modifiers.length-1){
      index++;
      this.populateModifiers(index)
    }

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
          this.data.modifiers = modifiers.filter((m)=>m.variant===0);
          this.populateModifiers(0);
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



  constructor($q, $rootScope, $stateParams) {
    "ngInject";
    this.$stateParams = $stateParams;
    this.$q =$q;
    this.data={};

  }
}