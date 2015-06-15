(function(){

  angular
       .module('dashboard')
       .controller('DashboardController', [
          'DashboardService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
          DashboardController
       ]);

  /**
   * Main Controller for the Angular Material Todo App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function DashboardController( DashboardService, $mdSidenav, $mdBottomSheet, $log, $q) {
    var self = this;

    self.selected      = null;
    self.deviceChart   = getDeviceChartData();
    self.forecastChart = getForecastChartData();
    self.toggleNav     = toggleNav;
    self.share         = share;


    // Load all registered items
    DashboardService
      .loadAllItems()
      .then( function( items ) {
        self.navItems = [].concat(items);
        self.selected = items[0];
      });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Get Chart Data
     */
    function getForecastChartData() {
      var data = {
        config: {
          axes: {
            x: { type: "date", key: "x" },
            y: { type: "linear" }
          },
          series: [
            {
              y: "y",
              label: "Low",
              type: "area",
              striped: false,
              axis: "y",
              color: "#50C3DD",
              thickness: "1px",
              dotSize: 2,
              id: "series_0"
            },
            {
              y: "val_2",
              label: "High",
              type: "area",
              striped: false,
              axis: "y",
              color: "#FFCC00",
              thickness: "1px",
              dotSize: 2,
              id: "series_1"
            }
          ],
          lineMode: "cardinal",
          tooltip: {
            mode: "scrubber",
            formatter: function (x, y, series) {
              return daysFromNow(x) + ' : ' + y;
            }
          },
          stacks: [],
          margin: {
            top: 20,
            right: 50,
            bottom: 60,
            left: 50,
            width: 1148,
            height: 500
          },
          tension: 0.7,
          drawLegend: true,
          drawDots: true,
          columnsHGap: 5
        }
      };

      var rawData = [
        { x: '2015-06-15T23:59:42.082Z', y: 66, val_2: 76 },
        { x: '2015-06-16T23:59:42.082Z', y: 64, val_2: 74 },
        { x: '2015-06-17T23:59:42.082Z', y: 62, val_2: 72 },
        { x: '2015-06-18T23:59:42.082Z', y: 58, val_2: 68 },
        { x: '2015-06-19T23:59:42.082Z', y: 64, val_2: 74 },
        { x: '2015-06-20T23:59:42.082Z', y: 66, val_2: 76 },
        { x: '2015-06-21T23:59:42.082Z', y: 66, val_2: 76 }
      ];


      rawData.map(function(r) {
        r.x = new Date(r.x);
        return r;
      });

      data.data = rawData;

      return data;
    }

    /**
     * Get Chart Options
     */
    function getDeviceChartData() {
      var data = {
        config: {
          axes: {
            x: {
              type: "date",
              key: "x"
            },
            y: {
              type: "linear"
            },
            y2: {
              min: 0,
              max: 9,
              type: "linear"
            }
          },
          series: [
            {
              y: 'y',
              type: 'area',
              striped: false,
              label: 'Downstairs',
              axis: 'y',
              color: '#1f77b4',
              thickness: '1px',
              dotSize: 2,
              id: 'series_0'
            },
            {
              y: 'val_2',
              label: 'Upstairs',
              type: 'area',
              striped: false,
              axis: 'y',
              color: '#ff7f0e',
              thickness: '1px',
              dotSize: 2,
              id: 'series_1'
            },
            {
              y: 'val_3',
              type: 'line',
              label: 'Kitchen CO',
              axis: 'y2',
              color: '#00BCD4',
              thickness: '1px',
              dotSize: 2,
              id: 'series_2'
            }
          ],
          lineMode: 'cardinal',
          tooltip: {
            mode: 'scrubber',
            formatter: function (x, y, series) {
              return hoursFromNow(x) + ' : ' + y;
            }
          },
          stacks: [],
          margin: {
            top: 20,
            right: 50,
            bottom: 60,
            left: 50,
            width: 1148,
            height: 500
          },
          tension: 0.7,
          drawLegend: true,
          drawDots: true,
          columnsHGap: 5
        }
      };

      var rawData = [
        { x: '2015-06-15T01:00:00.082Z', y: 67, val_2: 69, val_3: 3 },
        { x: '2015-06-15T02:00:00.082Z', y: 68, val_2: 69, val_3: 4 },
        { x: '2015-06-15T03:00:00.082Z', y: 68, val_2: 69, val_3: 2 },
        { x: '2015-06-15T04:00:00.082Z', y: 68, val_2: 69, val_3: 4 },
        { x: '2015-06-15T05:00:00.082Z', y: 68, val_2: 70, val_3: 4 },
        { x: '2015-06-15T06:00:00.082Z', y: 69, val_2: 71, val_3: 3 },
        { x: '2015-06-15T07:00:00.082Z', y: 70, val_2: 72, val_3: 4 },
        { x: '2015-06-15T08:00:00.082Z', y: 70, val_2: 72, val_3: 7 },
        { x: '2015-06-15T09:00:00.082Z', y: 71, val_2: 74, val_3: 5 },
        { x: '2015-06-15T10:00:00.082Z', y: 70, val_2: 72, val_3: 2 },
        { x: '2015-06-15T11:00:00.082Z', y: 70, val_2: 72, val_3: 2 },
        { x: '2015-06-15T12:00:00.082Z', y: 68, val_2: 69, val_3: 3 },
        { x: '2015-06-15T13:00:00.082Z', y: 68, val_2: 69, val_3: 5 },
        { x: '2015-06-15T14:00:00.082Z', y: 68, val_2: 70, val_3: 4 },
        { x: '2015-06-15T15:00:00.082Z', y: 68, val_2: 70, val_3: 8 },
        { x: '2015-06-15T16:00:00.082Z', y: 69, val_2: 70, val_3: 6 },
        { x: '2015-06-15T17:00:00.082Z', y: 69, val_2: 70, val_3: 8 },
        { x: '2015-06-15T18:00:00.082Z', y: 69, val_2: 71, val_3: 6 },
        { x: '2015-06-15T19:00:00.082Z', y: 68, val_2: 70, val_3: 7 },
        { x: '2015-06-15T20:00:00.082Z', y: 69, val_2: 71, val_3: 6 },
        { x: '2015-06-15T21:00:00.082Z', y: 70, val_2: 72, val_3: 3 },
        { x: '2015-06-15T22:00:00.082Z', y: 70, val_2: 72, val_3: 3 },
        { x: '2015-06-15T23:00:00.082Z', y: 69, val_2: 71, val_3: 3 }
      ];


      rawData.map(function(r) {
        r.x = new Date(r.x);
        return r;
      });

      data.data = rawData;

      return data;
    }

    /**
     * Get the number of days from today
     * @param date
     */
    function daysFromNow(date) {
      var today = new Date();
      // The number of milliseconds in one day
      var ONE_DAY = 1000 * 60 * 60 * 24;

      // Convert both dates to milliseconds
      var dateMS = date.getTime();
      var todayMS = today.getTime();

      // Calculate the difference in milliseconds
      var differenceMS = Math.abs(dateMS - todayMS);

      // Convert back to days and return
      var numDays = Math.round(differenceMS/ONE_DAY);
      if (numDays == 0) {
        return 'today';
      }

      return numDays + ' days from now';
    }

    /**
     * Get the number of hours from the current hour
     * @param date
     */
    function hoursFromNow(date) {
      var now = new Date();

      var dateHours = date.getHours();
      var currentHour = now.getHours();
      var difference = dateHours - currentHour;

      if (difference == 0) {
        return 'now';
      } else if (difference < 0) {
        return Math.abs(difference) + ' hours ago';
      }

      return difference + ' hours from now';
    }

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleNav() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Show the bottom sheet
     */
    function share($event) {
        var list = self.selected;

        $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          templateUrl: 'todo/view/shareSheet.html',
          controller: [ '$mdBottomSheet', TodoSheetController ],
          controllerAs: "vm",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) {
          clickedItem && $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function TodoSheetController( $mdBottomSheet ) {
          this.list = list;
          this.items = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.performAction = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();
