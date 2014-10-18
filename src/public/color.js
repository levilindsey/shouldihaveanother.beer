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

  var screen1RelativeOpacity = 0.9;

  var body = document.querySelector('body');
  var screen1 = body.querySelector('.screen-1');
  var screen2 = body.querySelector('.screen-2');

  function setRandomScreenColor() {
    var colorIndex = parseInt(Math.random() * beerColors.length);

    var colorStringBackground = 'linear-gradient(#' + beerColors[colorIndex].color1 + ',#' +
        beerColors[colorIndex].color2 + ')';
    var colorStringScreen1 = 'linear-gradient(#' + beerColors[colorIndex].color1 + ',transparent)';
    var colorStringScreen2 = 'linear-gradient(transparent,#' + beerColors[colorIndex].color2 + ')';

    body.style.background = colorStringBackground;
    screen1.style.background = colorStringScreen1;
    screen2.style.background = colorStringScreen2;

    screen1.style.opacity = beerColors[colorIndex].opacity * screen1RelativeOpacity;
    screen2.style.opacity = beerColors[colorIndex].opacity;
  }

  window.beer = window.beer || {};
  window.beer.setRandomScreenColor = setRandomScreenColor;
})();
