var page = require('webpage').create();
console.log("please waiting...")
// page.viewportSize = {
//   width: 1349,
//   height: 3000
// };
page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1';
page.onConsoleMessage = function (msg, lineNum, sourceId) {
  console.log(msg);
};
var fs = require('fs');
var arrNotRegis = [];
var arrRegis = [];
var arrError = [];
var content = fs.read('file_input.txt');
var arrAccountName = content.split("\n");

// var path = 'output.txt';
// fs.write(path, content, 'w');
// phantom.exit();
next_page();



function handle_page(accountName) {

  page.open("https://reportaproblem.apple.com", function (status) {
    console.log("Status:" + status)
    if (status === "success") {
      window.setTimeout(function () {
        //page.render("processing_.png");
        console.log("account Name Checking:" + accountName)
        // sendKeys(page, '*[id=appleId]', "a0i21-patsy273@yahoo.com");
        // sendKeys(page, '*[id=pwd]', "Zxcv123123");
        var sendAccount = sendKeys(page, '*[id=appleId]', accountName);
        var sendPass = sendKeys(page, '*[id=pwd]', "Zxcv123123");
        if (sendAccount == false || sendPass == false) {
          console.log("check Account Name:" + accountName + " fail.")
          arrError.push(accountName);
        }
        else {
          page.evaluate(function () {
            // focus on the text element before typing
            var element = document.getElementById('aid-auth-widget-iFrame').contentWindow.document.getElementById('sign-in');
            element.click();
          });
          window.setTimeout(function () {
            //page.render("_done.png");
            var isRegis = page.evaluate(function (afunc) {
              if (document.getElementsByClassName('purchases').length > 0) {
                console.log("done: tai khoan da dang ky thanh toan");
                return true;
              }
              else {
                console.log("done: tai khoan chua dang ky thanh toan");
                return false;
              }
            });
            console.log("IS regis:" + isRegis);
            if (isRegis) {
              arrRegis.push(accountName);
            }
            else {
              arrNotRegis.push(accountName);
            }
            next_page();
            //phantom.exit();
          }, 4000);
        }
      }, 8000);
    }
    else {
      arrError.push(accountName);
      console.log("check Account Name:" + accountName + " fail.")
      next_page();
    }

    //setTimeout(next_page, 11000);
  });
}
function next_page() {
  var accountName = arrAccountName.shift();
  if (!accountName) {
    var path = 'list_chua_dang_ky.txt';
    var content = '';
    for (var i = 0; i < arrNotRegis.length; i++) {
      content = content + arrNotRegis[i];
      content = content + "\n";
    }
    fs.write(path, content, 'w');
    path = 'list_da_dang_ky.txt';
    content = '';
    for (var i = 0; i < arrRegis.length; i++) {
      content = content + arrRegis[i];
      content = content + "\n";
    }
    fs.write(path, content, 'w');
    path = 'list_check_loi.txt';
    content = '';
    for (var i = 0; i < arrError.length; i++) {
      content = content + arrError[i];
      content = content + "\n";
    }
    fs.write(path, content, 'w');
    console.log("check xong");
    phantom.exit(0);
  }
  phantom.clearCookies();
  handle_page(accountName);
}
function sendKeys(page, selector, keys) {
  var fillcontrol = page.evaluate(function (selector) {
    // focus on the text element before typing
    var iframe = document.getElementById('aid-auth-widget-iFrame');
    if (!iframe) {
      return false;
    }
    var element = document.getElementById('aid-auth-widget-iFrame').contentWindow.document.querySelector(selector);
    element.click();
    element.focus();
  }, selector);
  if (fillcontrol == false) {
    return fillcontrol;
  }
  page.sendEvent("keypress", keys);
}