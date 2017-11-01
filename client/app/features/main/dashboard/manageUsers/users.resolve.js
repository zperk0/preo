
export default function usersResolve ($q, authenticated, StateService, UserService, Spinner) {
  "ngInject";

  const deferred = $q.defer();
  const LOADER_KEY = 'fetch-users';

  Spinner.show(LOADER_KEY);

  const currentUser = UserService.getCurrent();
  StateService.venue.getUsers()
  .then((users) => {
    users.forEach((u) => {
      u.$current = u.id === currentUser.id;
      if (u.role === 'OWNER'){
        u.role = "ADMIN";
      }
    });

    console.log('ManageUsers [usersResolve] - got users', users);
    deferred.resolve(users);

    Spinner.hide(LOADER_KEY);
  }, (err) => {
    console.log('ManageUsers [usersResolve] - error', err)
    Spinner.hide(LOADER_KEY);
    deferred.reject(err);
  }).catch((err) => {
    Spinner.hide(LOADER_KEY);
    console.log('ManageUsers [usersResolve] - catch', err);
    deferred.reject(err);
  });

  return deferred.promise;
}