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

  doInvite (invitedUser, user) {

    let deferred = this.$q.defer();

    invitedUser.accept(user)
      .then((newUser) => {

        this.UserService.checkAdmin(newUser)
          .then(deferred.resolve, deferred.resolve);
      }, deferred.reject);

    return deferred.promise;
  }

  constructor($q, UserService) {
    "ngInject";

    this.$q = $q;
    this.UserService = UserService;
  }
}