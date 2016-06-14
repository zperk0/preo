import User from './user.service';
import Venue from './venue.service';
import Utils from './utils.service';

export default angular.module("PreodayServices" , [])
  .service(User.UID, User)
  .service(Venue.UID, Venue)
  .service(Utils.UID, Utils)
  .name;
