export default class ModifierService {

  static get UID(){
    return "ModifierService";
  }

  createModifier(modifier){
    return Preoday.Modifier.save(modifier)
      .then((mod)=>{
        this.modifiers.push(mod)
      })
  }

  deleteModifier(modifier){
    return modifier.delete()
      .then(()=>{
        this.modifiers = this.modifiers.filter((m)=>m.id!==modifier.id)
      })
  }


  getModifiers(venueId, expand){
    return this.$q((resolve, reject)=>{

      if (this.modifiers){
        resolve(this.modifiers);
      } else {
        Preoday.Modifier.getAll({venueId:venueId, expand:expand})
        .then((modifiers)=>{
          this.modifiers = modifiers.filter((m)=>m.variant===0);
          resolve(modifiers);
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



  constructor($q, $rootScope) {
    "ngInject";
    this.$q =$q;

  }
}