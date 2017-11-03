
export default function invitesResolve ($q, authenticated, StateService, Spinner) {
  "ngInject";

  const deferred = $q.defer();
  const LOADER_KEY = 'fetch-invite-users';

  Spinner.show(LOADER_KEY);

  StateService.getInvites().then((invites)=>{
    invites.forEach((u)=>{
      if (u.role === 'OWNER') {
        u.role = 'ADMIN';
      }
    });

    console.log('ManageUsers [invitesResolve] - got invites', invites);
    deferred.resolve(invites);

    Spinner.hide(LOADER_KEY);
  },(err)=>{
    console.log('ManageUsers [invitesResolve] - reject', err);
    Spinner.hide(LOADER_KEY);
    deferred.reject(err);
  }).catch((err)=>{
    Spinner.hide(LOADER_KEY);
    console.log('ManageUsers [invitesResolve] - catch', err);
    deferred.reject(err);
  });

  return deferred.promise;
}