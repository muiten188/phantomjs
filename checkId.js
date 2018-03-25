var page = require('webpage').create();
console.log("please waiting...")
page.viewportSize = {
  width: 1349,
  height: 3000
};
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.4.3202.15';
page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log(msg);
};
page.open("https://reportaproblem.apple.com", function (status) {

  if (status === "success") {
    afunc = function(msg) {
      console.log('afunc: ' +msg);
      };
    window.setTimeout(function () {

      page.render("checkID0.png");
      // sendKeys(page, '*[id=appleId]', "a0i21-patsy273@yahoo.com");
      // sendKeys(page, '*[id=pwd]', "Zxcv123123");
      sendKeys(page, '*[id=appleId]', "applevantue-439398669388@yahoo.com");
      sendKeys(page, '*[id=pwd]', "Tienhn123");
      page.evaluate(function () {
        // focus on the text element before typing
        var element = document.getElementById('aid-auth-widget-iFrame').contentWindow.document.getElementById('sign-in');
        element.click();
      });
      

      window.setTimeout(function () {
        page.render("checkID.png");
        page.evaluate(function(afunc){
          if (document.getElementsByClassName('purchases').length > 0) {
            console.log("done: tai khoan da dang ky thanh toan");
          }
          else {
            console.log("done: tai khoan chua dang ky thanh toan");
          }
        });

        phantom.exit();
      }, 2000);
    }, 3000);

  }
  function sendKeys(page, selector, keys) {
    page.evaluate(function (selector) {
      // focus on the text element before typing
      var element = document.getElementById('aid-auth-widget-iFrame').contentWindow.document.querySelector(selector);
      element.click();
      element.focus();
    }, selector);
    page.sendEvent("keypress", keys);
  }
});