(function() {

  var requestAnimationFrame =
      (window.requestAnimationFrame || // the standard
          window.webkitRequestAnimationFrame || // chrome/safari
          window.mozRequestAnimationFrame || // firefox
          window.oRequestAnimationFrame || // opera
          window.msRequestAnimationFrame || // ie
          function (callback) { // default
            window.setTimeout(callback, 16); // 60fps
          }).bind(window);

  var twoPi = Math.PI * 2;

  // ---  --- //

  var maxAnimationFrameDelay = 150;

  var carbonationConfig = {};

  carbonationConfig.opacity = 0.5;

  carbonationConfig.bubblesPerMillisPerPixel = 0.0000003;

  carbonationConfig.fadeInDuration = 1000;
  carbonationConfig.instantFadeInDuration = 300;

  carbonationConfig.burstBubblesPerPixel = 0.005;

  carbonationConfig.bubbleCreationViewportVerticalMargin = 100;
  carbonationConfig.bubbleCreationMinY = 20;

  carbonationConfig.minRadius = 0.5;
  carbonationConfig.maxRadius = 3.5;

  carbonationConfig.minStartMovingDelay = 200;
  carbonationConfig.maxStartMovingDelay = 5000;

  carbonationConfig.minSpeed = 0.2; // pixels per millisecond
  carbonationConfig.maxSpeed = 1.1; // pixels per millisecond

  // Dependent values (computed from the hand-tuned values above)
  carbonationConfig.rangeRadius = carbonationConfig.maxRadius - carbonationConfig.minRadius;
  carbonationConfig.rangeStartMovingDelay = carbonationConfig.maxStartMovingDelay - carbonationConfig.minStartMovingDelay;
  carbonationConfig.rangeSpeed = carbonationConfig.maxSpeed - carbonationConfig.minSpeed;

  // ---  --- //

  var viewportWidth, viewportHeight, bubbleDelay, previousFrameTime, previousBubbleStartTime;

  var body = document.querySelector('body');
  var canvas = body.querySelector('.carbonation');
  var context = canvas.getContext('2d');

  var bubbles = [];

  var isLooping = false;
  var isPaused = true;

  // ---  --- //

  window.addEventListener('resize', updateViewportDimensions, false);

  updateViewportDimensions();

  // ---  --- //

  function startCarbonation() {
    startAnimationLoop();
    createBurst();
  }

  function animationLoop() {
    var currentTime = Date.now();
    isLooping = true;

    // This helps to avoid any jerky or large updates when the window loses and regains focus
    if (currentTime - previousFrameTime > maxAnimationFrameDelay) {
      previousBubbleStartTime = currentTime - bubbleDelay;
    }

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

  function createBubbles(currentTime) {
    // Catch up to however many bubbles we may have missed
    while (previousBubbleStartTime + bubbleDelay < currentTime) {
      previousBubbleStartTime += bubbleDelay;
      createBubble(previousBubbleStartTime, false, carbonationConfig.bubbleCreationMinY);
    }
  }

  /**
   * This function originally used Math.random to determine the parameters for a new bubble.
   * However, it was changed to cycle through pre-set values, because this is more performant and
   * appears no different to the viewer.
   *
   * @param {number} startTime
   * @param {boolean} moveInstantly
   * @param {number} minY
   */
  function createBubble(startTime, moveInstantly, minY) {
    var x, y, r, startMovingTime, speed, fadeInDuration;

    startMovingTime = moveInstantly ? startTime + carbonationConfig.instantFadeInDuration :
        startTime + Math.random() * carbonationConfig.rangeStartMovingDelay +
        carbonationConfig.minStartMovingDelay;
    speed = Math.random() * carbonationConfig.rangeSpeed + carbonationConfig.minSpeed;
    fadeInDuration = moveInstantly ?
        carbonationConfig.instantFadeInDuration : carbonationConfig.fadeInDuration;

    x = Math.random() * viewportWidth;
    y = Math.random() * (viewportHeight - minY) + minY;
    r = Math.random() * carbonationConfig.rangeRadius + carbonationConfig.minRadius;

    bubbles[bubbles.length] = {
      x: x,
      y: y,
      r: r,
      opacity: 0,
      startTime: startTime,
      startMovingTime: startMovingTime,
      speed: speed,
      fadeInDuration: fadeInDuration
    };
  }

  function updateBubbles(currentTime) {
    var deltaTime, i, count, opacity, distance;

    deltaTime = currentTime - previousFrameTime;

    for (i = 0, count = bubbles.length; i < count; i += 1) {

      // Calculate how much the bubble has faded in
      opacity = currentTime < bubbles[i].startTime + bubbles[i].fadeInDuration ?
          (currentTime - bubbles[i].startTime) / bubbles[i].fadeInDuration : 1;

      // Calculate the distance the bubble has travelled
      distance = bubbles[i].startMovingTime < currentTime ?
          deltaTime * bubbles[i].speed : 0;

      // Update the values stored for the bubble
      bubbles[i].opacity = opacity;
      bubbles[i].y = bubbles[i].y - distance;
    }
  }

  function drawBubbles() {
    var i, count;

    context.clearRect(0, 0, viewportWidth, viewportHeight);

    for (i = 0, count = bubbles.length; i < count; i += 1) {

      // Has the bubble reached the top of the viewport?
      if (bubbles[i].y > 0) {
        context.beginPath();
        context.arc(bubbles[i].x, bubbles[i].y, bubbles[i].r, 0, twoPi, false);
        context.closePath();
        context.fillStyle = 'rgba(255,255,255,' +
            carbonationConfig.opacity * bubbles[i].opacity + ')';
        context.fill();
      } else {
        // Remove the bubble
        bubbles.splice(i, 1);
        count -= 1;
      }
    }
  }

  function createBurst() {
    var i;
    var currentTime = Date.now();
    var count = carbonationConfig.burstBubblesPerPixel * viewportWidth * viewportHeight;

    for (i = 0; i < count; i += 1) {
      createBubble(currentTime, true, 0);
    }
  }

  function updateViewportDimensions() {
    viewportWidth = body.offsetWidth;
    viewportHeight = body.offsetHeight +
        carbonationConfig.bubbleCreationViewportVerticalMargin;

    bubbleDelay = 1 / (carbonationConfig.bubblesPerMillisPerPixel *
        viewportWidth * viewportHeight);

    canvas.width = viewportWidth;
    canvas.height = viewportHeight;
  }

  window.beer = window.beer || {};
  window.beer.startCarbonation = startCarbonation;
})();
