'use strict';

/* Filters */

angular.module('kyc.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }])
.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
})
.filter('marketing', function() {
  return function(marketing) {    
    return marketing === 1 ? _tr("Active") : " - ";
  };
})
.filter('timeAgo', function() {
  return function(date) {      
        if (typeof date !== 'object') {
            date = moment(date);
        }        
        var seconds = Math.floor((moment() - date).valueOf() / 1000);
        var intervalType;

        var interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            if (interval > 1)
                intervalType = _tr('years ago');
            else
                intervalType = _tr('year ago');
        } else {
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
                if (interval > 1)
                    intervalType = _tr('months ago');
                else
                    intervalType = _tr('month ago');
            } else {
                interval = Math.floor(seconds / 86400);
                if (interval >= 1) {
                    if (interval > 1)
                        intervalType = _tr('days ago');
                    else{
                        interval = ''
                        intervalType = _tr('yesterday');
                    }
                } else {
                    interval = Math.floor(seconds / 3600);
                    if (interval >= 1) {
                        if (interval > 1)
                            intervalType = _tr('hours ago');
                        else
                            intervalType = _tr("hour ago");
                    } else {
                        interval = Math.floor(seconds / 60);
                        if (interval >= 1) {
                            if (interval > 1)
                                intervalType = _tr('minutes ago');
                            else
                                intervalType = _tr("minute ago");
                        } else {
                            interval = seconds;
                            if (interval > 1)
                                intervalType = _tr('seconds ago');
                            else
                                intervalType = _tr("second ago");
                        }
                    }
                }
            }
        }
        
      return interval + ' ' + intervalType;      
  };  
})



;

