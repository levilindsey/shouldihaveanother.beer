'use strict';

angular.module('sihabApp', [
  // Third-party libraries
  'ui.router',

  // As part of the build process, all partials are automatically added the angular template cache
  'templates',

  // Helpers
  'constants',
  'routes',
//  'someFilter',
//  'someService',

  // Components
  'beerScreenDirectives',
  'carbonationDirectives',
  'svgIconDirectives',
  'toastDirectives',

  // Models
  'dataNameService',
  'userService',

  // Routes
  'homeController'
])

    .run(function ($rootScope) {
      $rootScope.routeState = {};

      printAppInfo();

      // ---  --- //

      function printAppInfo() {
        console.log('*** DISCLAIMER ****************************************************************');
        console.log('* This website is a joke!');
        console.log('* Please do not interpret this as actual advice regarding your drinking habits.');
        console.log('*******************************************************************************');
        console.log('');
        console.log('*** ABOUT *********************************************************************');
        console.log('* This was made by Levi Lindsey.');
        console.log('* Fork this on GitHub at: github.com/levisl176/shouldihaveanother.beer');
        console.log('* Check out other cool things Levi has created at: jackieandlevi.com/levi');
        console.log('*******************************************************************************');
      }
    });
