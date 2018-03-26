var page = require('webpage').create();
console.log("please waiting...")
// page.viewportSize = {
//   width: 1349,
//   height: 3000
// };
page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1';
page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log(msg);
};
var fs = require('fs');

var content = fs.read('file.txt');
console.log('read data:', content);
var path = 'output.txt';
fs.write(path, content, 'w');

page.open("https://reportaproblem.apple.com", function (status) {

  if (status === "success") {
    afunc = function(msg) {
      console.log('afunc: ' +msg);
      };
    window.setTimeout(function () {
      // sendKeys(page, '*[id=appleId]', "a0i21-patsy273@yahoo.com");
      // sendKeys(page, '*[id=pwd]', "Zxcv123123");
      sendKeys(page, '*[id=appleId]', "applevantue-439398669388@yahoo.com");
      sendKeys(page, '*[id=pwd]', "Tienhn123");
      page.render("checkID0.png");
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
      }, 5000);
    }, 5000);

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