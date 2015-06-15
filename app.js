'use strict';

// Declare app level module which depends on controllers, directives, filters, and services
angular.module('myApp', [
    'ngMaterial',
    'dashboard',
    'n3-line-chart'
  ])
  .config(function($mdThemingProvider, $mdIconProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('amber', {
        'default': '500',
        'hue-1': '100',
        'hue-2': '600',
        'hue-3': 'A100'
      })
      .accentPalette('grey', {
        'default': '500'
      });

    $mdIconProvider
      .iconSet('action', 'assets/svg/action-icons.svg', 24)
      .iconSet('content', 'assets/svg/content-icons.svg', 24)
      .iconSet('communication', 'assets/svg/communication-icons.svg', 24)
      .iconSet('image', 'assets/svg/image-icons.svg', 24)
      .iconSet('maps', 'assets/svg/maps-icons.svg', 24)
      .iconSet('navigation', 'assets/svg/navigation-icons.svg', 24)
      .iconSet('social', 'assets/svg/social-icons.svg', 24);

    // $mdThemingProvider.theme('default')
    //   .primaryPalette('indigo', {
    //     'default': '500',
    //     'hue-1': '100',
    //     'hue-2': '600',
    //     'hue-3': 'A100'
    //   })
    //   .accentPalette('green', {
    //     'default': '500'
    //   });

    // $mdIconProvider
    //   .defaultIconSet("assets/svg/avatars.svg", 128)
    //   .icon("add", "assets/svg/add.svg", 48)
    //   .icon("clear", "assets/svg/clear.svg", 48)
    //   .icon("check", "assets/svg/check.svg", 48)
    //   .icon("menu", "assets/svg/menu.svg", 24)
    //   .icon("share", "assets/svg/share.svg", 24)
    //   .icon("google_plus", "assets/svg/google_plus.svg", 512)
    //   .icon("hangouts", "assets/svg/hangouts.svg", 512)
    //   .icon("twitter", "assets/svg/twitter.svg", 512)
    //   .icon("phone", "assets/svg/phone.svg", 512);

  });
