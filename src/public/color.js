(function() {

  var beerColors = [
    {
      color1: 'FDD978',
      color2: 'F7B324',
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
  ];

  var body = document.querySelector('body');
  var screen = body.querySelector('.screen');

  // ---  --- //

  function setRandomScreenColor() {
    var colorIndex, colorString;
    var previousColorIndex = window.localStorage && localStorage.getItem('previousColorIndex');

    console.log('previousColorIndex', previousColorIndex);

    // Pick a random color pair (and try to not use whichever color pair was used last time)
    do {
      colorIndex = parseInt(Math.random() * beerColors.length);
    } while ('' + colorIndex === previousColorIndex);

    console.log('colorIndex', colorIndex);

    colorString = 'linear-gradient(#' + beerColors[colorIndex].color1 + ',#' +
        beerColors[colorIndex].color2 + ')';

    body.style.background = colorString;
    screen.style.background = colorString;
    screen.style.opacity = beerColors[colorIndex].opacity;

    // Save the color pair
    if (window.localStorage) {
      localStorage.setItem('previousColorIndex', colorIndex);
    }
  }

  window.beer = window.beer || {};
  window.beer.setRandomScreenColor = setRandomScreenColor;
})();
