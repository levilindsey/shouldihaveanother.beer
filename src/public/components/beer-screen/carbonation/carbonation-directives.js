/**
 * @typedef {Object} Bubble
 * @property {number} x
 * @property {number} y
 * @property {number} r
 * @property {number} startMovingTime
 * @property {number} speed Pixels per milliseconds
 */

angular.module('carbonationDirectives', [])

    .directive('carbonation', function (requestAnimationFrame, carbonationConfig, svgNamespace) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'components/beer-screen/carbonation/carbonation.html',
        link: function (scope, element, attrs) {
          var viewportWidth, viewportHeight, bubbleDelay, previousFrameTime, previousBubbleStartTime;

          var body = document.querySelector('body');

          var rawSvg = element[0];

          var bubbles = [];

          var isLooping = false;
          var isPaused = true;

          // ---  --- //

          // TODO:
          // - have bubbles appear, with a given frequency, in random positions
          // - have the range of these random positions extend slightly past the side edges of the viewport and slightly more past the bottom edge
          // - have these bubbles fade in
          // - have these bubbles work their way upward according to some movement algorithm that has yet to be determined...
          //   - look up something fun and complicated for this that actually mimics realistic fluid dynamics

          window.addEventListener('resize', updateViewportDimensions, false);
          window.addEventListener('focus', startAnimationLoop, false);
          window.addEventListener('blur', pauseAnimationLoop, false);

          updateViewportDimensions();

          startAnimationLoop();

          createBurst();

          // ---  --- //

          function animationLoop() {
            var currentTime = Date.now();
            isLooping = true;

            if (!isPaused) {
              createBubbles(currentTime);
              updateBubbles(currentTime);
              drawBubbles();

              requestAnimationFrame(animationLoop);
            } else {
              isLooping = false;
            }

            previousFrameTime = currentTime;
          }

          function startAnimationLoop() {
            isPaused = false;

            if (!isLooping) {
              // Reset the time values to avoid any jerky or large updates
              previousFrameTime = Date.now();
              previousBubbleStartTime = previousFrameTime;

              animationLoop();
            }
          }

          function pauseAnimationLoop() {
            isPaused = true;
          }

          function createBubbles(currentTime) {
            // Catch up to however many bubbles we may have missed
            while (previousBubbleStartTime + bubbleDelay < currentTime) {
              previousBubbleStartTime += bubbleDelay;
              createBubble(previousBubbleStartTime, false, carbonationConfig.bubbleCreationMinY);
            }
          }

          /**
           * @param {number} startTime
           * @param {boolean} moveInstantly
           * @param {number} minY
           */
          function createBubble(startTime, moveInstantly, minY) {
            var x, y, r, circle, startMovingTime, speed;

            startMovingTime = moveInstantly ? startTime :
                startTime + Math.random() * carbonationConfig.rangeStartMovingDelay +
                    carbonationConfig.minStartMovingDelay;
            speed = Math.random() * carbonationConfig.rangeSpeed + carbonationConfig.minSpeed;

            x = Math.random() * viewportWidth;
            y = Math.random() * (viewportHeight - minY) + minY;
            r = Math.random() * carbonationConfig.rangeRadius + carbonationConfig.minRadius;

            circle = document.createElementNS(svgNamespace, 'circle');
            rawSvg.appendChild(circle);

            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', r);

            bubbles[bubbles.length] = {
              x: x,
              y: y,
              r: r,
              opacity: 0,
              startTime: startTime,
              startMovingTime: startMovingTime,
              speed: speed,
              element: circle
            };
          }

          function updateBubbles(currentTime) {
            var deltaTime, i, count, opacity, distance;

            deltaTime = currentTime - previousFrameTime;

            for (i = 0, count = bubbles.length; i < count; i += 1) {
              // Calculate how much the bubble has faded in
              opacity = currentTime < bubbles[i].startTime + carbonationConfig.fadeInDuration ?
                  (currentTime - bubbles[i].startTime) / carbonationConfig.fadeInDuration : 1;

              // Calculate the distance the bubble has travelled
              distance = bubbles[i].startMovingTime < currentTime ?
                  deltaTime * bubbles[i].speed : 0;

              // Update the values stored for the bubble
              bubbles[i].opacity = opacity;
              bubbles[i].x = bubbles[i].x;
              bubbles[i].y = bubbles[i].y - distance;
            }
          }

          function drawBubbles() {
            var i, count;

            for (i = 0, count = bubbles.length; i < count; i += 1) {
              // Has the bubble reached the top of the viewport?
              if (bubbles[i].y > 0) {
                // Move the bubble
                bubbles[i].element.setAttribute('cx', bubbles[i].x);
                bubbles[i].element.setAttribute('cy', bubbles[i].y);

                // Update the opacity of the bubble
                bubbles[i].element.setAttribute('opacity', bubbles[i].opacity);
              } else {
                // Remove the bubble
                rawSvg.removeChild(bubbles[i].element);
                bubbles.splice(i, 1);
                count -= 1;
              }
            }
          }

          function createBurst() {
            var i;
            var currentTime = Date.now();
            var minY = viewportHeight * 0.9;
            var count = carbonationConfig.burstBubblesPerPixel * viewportWidth * viewportHeight;

            for (i = 0; i < count; i += 1) {
              createBubble(currentTime, true, minY);
            }
          }

          function updateViewportDimensions() {
            viewportWidth = body.offsetWidth;
            viewportHeight = body.offsetHeight +
                carbonationConfig.bubbleCreationViewportVerticalMargin;

            bubbleDelay = 1 / (carbonationConfig.bubblesPerMillisPerPixel *
                viewportWidth * viewportHeight);
          }
        }
      };
    });
