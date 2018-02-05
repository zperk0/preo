
export default function promotionsResolve ($q, authenticated, StateService, Spinner) {
  "ngInject";

  const deferred = $q.defer();
  const LOADER_KEY = 'fetch-promo';

  Spinner.show(LOADER_KEY);

  StateService.getOffers().then((promotions)=>{

    console.log('Promotions [promotionsResolve] - got promotions', promotions);
    deferred.resolve(promotions);

    Spinner.hide(LOADER_KEY);
  },(err)=>{
    console.log('Promotions [promotionsResolve] - reject', err);
    Spinner.hide(LOADER_KEY);
    deferred.reject(err);
  }).catch((err)=>{
    Spinner.hide(LOADER_KEY);
    console.log('Promotions [promotionsResolve] - catch', err);
    deferred.reject(err);
  });

  return deferred.promise;
}