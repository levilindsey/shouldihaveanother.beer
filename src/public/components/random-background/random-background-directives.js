angular.module('randomBackgroundDirectives', [])

    .directive('randomBackground', function (beerColors) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          setRandomBackground();

          // ---  --- //

          function setRandomBackground() {
            var colorIndex = parseInt(Math.random() * beerColors.length);
            var colorString = 'linear-gradient(#' + beerColors[colorIndex].color1 + ',#' +
                beerColors[colorIndex].color2 + ')';
            element.css('background', colorString);
          }
        }
      };
    });
