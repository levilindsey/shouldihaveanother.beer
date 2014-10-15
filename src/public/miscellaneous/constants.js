angular.module('constants', [])

    .constant('appName', 'shouldihaveanother.beer')

    .constant('beerColors', [
      {
        color1: 'FEE799',
        color2: 'EE9E00',
        opacity: 0.1
      },
      {
        color1: 'EE9E00',
        color2: 'BF5C01',
        opacity: '0.2'
      },
      {
        color1: 'BF5C01',
        color2: '912F00',
        opacity: '0.3'
      },
      {
        color1: '912F00',
        color2: '581301',
        opacity: '0.4'
      },
      {
        color1: '2A0101',
        color2: '080000',
        opacity: '0.6'
      }
    ])

    .constant('svgNamespace', 'http://www.w3.org/2000/svg');
