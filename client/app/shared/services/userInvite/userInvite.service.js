export default class UserInviteService {

  static get UID(){
    return "UserInviteService";
  }

  getUserByKey (key) {

    let deferred = this.$q.defer();

    Preoday.Invite.getByKey(key)
      .then(deferred.resolve, deferred.reject);

    return deferred.promise;
  }

  isExpired(inviteUser) {

    return moment().isAfter(moment(inviteUser.expiryDate));
  }

  constructor($q) {
    "ngInject";

    this.$q = $q;
  }
}