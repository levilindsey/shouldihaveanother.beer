(function () {

  function onDocumentLoaded() {
    printAppInfo();
    window.beer.setRandomScreenColor();
    window.beer.startCarbonation();
    document.querySelector("body").requestFullscreen();
    document.removeEventListener('load', onDocumentLoaded);
  }

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
    console.log('');
  }

  window.beer = window.beer || {};

  window.addEventListener('load', onDocumentLoaded, false);
})();
