angular.module('beerScreenDirectives', [])

    .directive('beerScreen', function (beerColors) {
      return {
        restrict: 'E',
        templateUrl: 'components/beer-screen/beer-screen.html',
        link: function (scope, element, attrs) {
          var screen = angular.element(element[0].querySelector('.screen'));

          setRandomColor();

          // ---  --- //

          function setRandomColor() {
            var colorIndex = parseInt(Math.random() * beerColors.length);
            var colorString = 'linear-gradient(#' + beerColors[colorIndex].color1 + ',#' +
                beerColors[colorIndex].color2 + ')';

            element.css('background', colorString);
            screen.css('background', colorString);
            screen.css('opacity', beerColors.opacity);
          }
        }
      };
    });
