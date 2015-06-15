(function(){
  'use strict';

  angular.module('dashboard')
         .service('DashboardService', ['$q', DashboardService]);

  /**
   * Lists DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function DashboardService($q){
    var items = [
      {
        title: 'Add Thermostat',
        svg: 'content:add_box'
      },
      {
        title: 'Add Nest Protect',
        svg: 'content:add_box'
      },
      {
        title: 'Home Settings',
        svg: 'action:settings'
      }
    ];

    // Promise-based API
    return {
      loadAllItems : function() {
        // Simulate async nature of real remote calls
        return $q.when(items);
      }
    };
  }

})();
