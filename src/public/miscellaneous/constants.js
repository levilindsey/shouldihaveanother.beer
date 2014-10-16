(function () {

  /**
   * A cross-browser compatible requestAnimationFrame. From
   * https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
   *
   * @type {Function}
   */
  var requestAnimationFrame =
      (window.requestAnimationFrame || // the standard
          window.webkitRequestAnimationFrame || // chrome/safari
          window.mozRequestAnimationFrame || // firefox
          window.oRequestAnimationFrame || // opera
          window.msRequestAnimationFrame || // ie
          function (callback) { // default
            window.setTimeout(callback, 16); // 60fps
          }).bind(window);

  var carbonationConfig = {};

  carbonationConfig.bubblesPerMillisPerPixel = 0.0000001;

  carbonationConfig.fadeInDuration = 1000;

  carbonationConfig.burstBubblesPerPixel = 0.0006;

  carbonationConfig.bubbleCreationViewportVerticalMargin = 100;
  carbonationConfig.bubbleCreationMinY = 20;

  carbonationConfig.minRadius = 0.5;
  carbonationConfig.maxRadius = 3;

  carbonationConfig.minStartMovingDelay = 200;
  carbonationConfig.maxStartMovingDelay = 5000;

  carbonationConfig.minSpeed = 0.2; // pixels per millisecond
  carbonationConfig.maxSpeed = 1.1; // pixels per millisecond

  carbonationConfig.rangeRadius = carbonationConfig.maxRadius - carbonationConfig.minRadius;
  carbonationConfig.rangeStartMovingDelay = carbonationConfig.maxStartMovingDelay - carbonationConfig.minStartMovingDelay;
  carbonationConfig.rangeSpeed = carbonationConfig.maxSpeed - carbonationConfig.minSpeed;

  // ---  --- //

  angular.module('constants', [])

      .constant('appName', 'shouldihaveanother.beer')

      .constant('beerColors', [
        {
          color1: 'FDD978',
          color2: 'EE9E00',
          opacity: 0.25
        },
        {
          color1: 'EE9E00',
          color2: 'BF5C01',
          opacity: 0.35
        },
        {
          color1: 'BF5C01',
          color2: '912F00',
          opacity: 0.45
        },
        {
          color1: '912F00',
          color2: '581301',
          opacity: 0.55
        },
        {
          color1: '320401',
          color2: '080000',
          opacity: 0.75
        }
      ])

      .constant('carbonationConfig', carbonationConfig)

      .constant('requestAnimationFrame', requestAnimationFrame)

      .constant('svgNamespace', 'http://www.w3.org/2000/svg');
})();
