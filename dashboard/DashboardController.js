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
    self.removeTodo    = removeTodo;
    self.getAvatar     = getAvatar;
    self.selectList    = selectList;
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
              color: "#003BEB",
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
              color: "#E0461B",
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

      var dataArray = [];
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
      return {
        config: {
          axes: {
            x: {
              type: "linear",
              key: "x"
            },
            y: {
              type: "linear"
            },
            y2: {
              min: -15,
              max: 15,
              type: "linear"
            }
          },
          series: [
            {
              y: "val_2",
              label: "Upstairs",
              type: "area",
              striped: true,
              axis: "y",
              color: "#1f77b4",
              thickness: "1px",
              dotSize: 2,
              id: "series_0"
            },
            {
              y: "y",
              type: "area",
              striped: true,
              label: "Downstairs",
              axis: "y",
              color: "#ff7f0e",
              thickness: "1px",
              dotSize: 2,
              id: "series_1"
            },
            {
              y: "other_y",
              type: "area",
              label: "Kitchen CO",
              striped: true,
              axis: "y2",
              color: "#2ca02c",
              thickness: "1px",
              dotSize: 2,
              id: "series_2"
            }
          ],
          lineMode: "cardinal",
          tooltip: {
            mode: "scrubber"
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
        },
        data: [
          { x: 0, y: 0, other_y: 0, val_2: 0, val_3: 0 },
          { x: 1, y: 0.993, other_y: 3.894, val_2: 8.47, val_3: 14.347 },
          { x: 2, y: 1.947, other_y: 7.174, val_2: 13.981, val_3: 19.991 },
          { x: 3, y: 2.823, other_y: 9.32, val_2: 14.608, val_3: 13.509 },
          { x: 4, y: 3.587, other_y: 9.996, val_2: 10.132, val_3: -1.167 },
          { x: 5, y: 4.207, other_y: 9.093, val_2: 2.117, val_3: -15.136 },
          { x: 6, y: 4.66, other_y: 6.755, val_2: -6.638, val_3: -19.923 },
          { x: 7, y: 4.927, other_y: 3.35, val_2: -13.074, val_3: -12.625 },
          { x: 8, y: 4.998, other_y: -0.584, val_2: -14.942, val_3: 2.331 },
          { x: 9, y: 4.869, other_y: -4.425, val_2: -11.591, val_3: 15.873 },
          { x: 10, y: 4.546, other_y: -7.568, val_2: -4.191, val_3: 19.787 },
          { x: 11, y: 4.042, other_y: -9.516, val_2: 4.673, val_3: 11.698 },
          { x: 12, y: 3.377, other_y: -9.962, val_2: 11.905, val_3: -3.487 },
          { x: 13, y: 2.578, other_y: -8.835, val_2: 14.978, val_3: -16.557 }
        ]
      };
    }

    /**
     * Utility Function
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
     * Remove a todo item
     * @param title
     */
    function removeTodo(index) {
      self.selected.todos.splice(index, 1);
    }

    /**
     * Create Avatar SVG String
     */
    function getAvatar() {
      var avatarNum = self.lists.length + 1;
      var avatar = 'svg-' + avatarNum.toString();
      return avatar;
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectList ( list ) {
      self.selected = angular.isNumber(list) ? $scope.lists[list] : list;
      self.toggleNav();
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
