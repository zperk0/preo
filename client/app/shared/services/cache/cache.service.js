export default class CacheService {

	static get UID(){
    return "CacheService"
  }

  buildCacheKey() {
    let key = '';
    (arguments && Array.from(arguments) || []).forEach((arg) => {

      if (arg) {
        key += arg + '_';
      }
    });

    if (key.length > 0) {
      key = key.substring(0, key.length - 1); // remove last _
    }

    return key;
  }

  getCacheFactory(cacheId) {
    const {
      $cacheFactory
    } = this;

    let $cache = $cacheFactory.get(cacheId);

    if (!$cache) {
      $cache = $cacheFactory(cacheId);
    }

    return $cache;
  }

  constructor($cacheFactory) {
    "ngInject";

    this.$cacheFactory = $cacheFactory;
  }
}
