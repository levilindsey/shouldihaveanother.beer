angular.module('carbonationDirectives', [])

    .directive('carbonation', function (svgNamespace) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'components/beer-screen/carbonation/carbonation.html',
        link: function (scope, element, attrs) {
          var body = document.querySelector('body');

          var config = {};

          config.minRadius = 1;
          config.maxRadius = 3;
          config.minX = 0;
          config.maxX = body.offsetWidth;
          config.minY = 0;
          config.maxY = body.offsetHeight;

          config.rangeX = config.maxX - config.minX;
          config.rangeY = config.maxY - config.minY;
          config.rangeRadius = config.maxRadius - config.minRadius;

          // ---  --- //

          var rawSvg = element[0];

          // TODO:
          // - have bubbles appear, with a given frequency, in random positions
          // - have the range of these random positions extend slightly past the side edges of the viewport and slightly more past the bottom edge
          // - have these bubbles fade in
          // - have these bubbles work their way upward according to some movement algorithm that has yet to be determined...
          //   - look up something fun and complicated for this that actually mimics realistic fluid dynamics

          createBubbles();

          // ---  --- //

          // TODO: replace this with something better
          function createBubbles() {
            var i, count, x, y, r, circle;

            for (i = 0, count = 200; i < count; i += 1) {
              x = Math.random() * config.rangeX + config.minX;
              y = Math.random() * config.rangeY + config.minY;
              r = Math.random() * config.rangeRadius + config.minRadius;

              circle = document.createElementNS(svgNamespace, 'circle');
              rawSvg.appendChild(circle);

              circle.setAttribute('cx', x);
              circle.setAttribute('cy', y);
              circle.setAttribute('r', r);
            }
          }
        }
      };
    });
