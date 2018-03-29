var page = require('webpage').create();
var system = require('system');
var args = system.args;
console.log("please waiting...")
page.settings.userAgent = 'Mozilla/5.0 (Linux; Android 7.0; SAMSUNG SM-G955U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/5.4 Chrome/51.0.2704.106 Mobile Safari/537.36';//'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1';
page.onConsoleMessage = function (msg, lineNum, sourceId) {
    console.log(msg);
};
page.onResourceError = function (resourceError) {
    console.error(resourceError.url + ': ' + '  - error code: ' + resourceError.errorCode + "  :  " + resourceError.errorString);
};
// page.onResourceRequested = function (req) {
//   console.log("-----------------------------------------------------");
//   console.log("REQUESTED");
//   console.log(JSON.stringify(req, undefined, 4));
//   console.log("-----------------------------------------------------");
// };

// page.onResourceReceived = function (res) {
//   console.log("-----------------------------------------------------");
//   console.log("RECEIVED");
//   console.log('received: ' + JSON.stringify(res, undefined, 4));
//   console.log("-----------------------------------------------------");
// };
var fs = require('fs');
var arrProxy = [];
// var path = 'output.txt';
// fs.write(path, content, 'w');
// phantom.exit();
getProxys();

function getProxys() {
    page.open("http://spys.one/free-proxy-list/VN/", function (status) {
        console.log("Status:" + status)
        if (status === "success") {
            window.setTimeout(function () {
                selectOption('[id=xpp]', 5)
                window.setTimeout(function () {
                    console.log("get Ok")
                    arrProxy = page.evaluate(function () {
                        var arrRawProxy = [];
                        var _arrProxy = [];
                        var arr1 = document.getElementsByClassName('spy1x')
                        var arr2 = document.getElementsByClassName('spy1xx')
                        if (arr1) {
                            for (var i = 0; i < arr1.length; i++) {
                                var innerText = arr1[i].firstElementChild.lastElementChild.innerText;
                                if (innerText.indexOf(':') > -1 && innerText.indexOf('port') == -1) {
                                    _arrProxy.push(innerText);
                                    console.log(innerText);
                                }
                            }
                        }
                        if (arr2) {
                            for (var i = 0; i < arr2.length; i++) {
                                var innerText = arr2[i].firstElementChild.lastElementChild.innerText;
                                if (innerText.indexOf(':') > -1 && innerText.indexOf('port') == -1) {
                                    _arrProxy.push(innerText);
                                    console.log(innerText);
                                }
                            }
                        }
                        return _arrProxy;
                    })
                    var path = 'list_proxy.txt';
                    var content = '';
                    for (var i = 0; i < arrProxy.length; i++) {
                        content = content + arrProxy[i];
                        content = content + "\n";
                    }
                    fs.write(path, content, 'w');

                    page.render("list_Proxys.png");
                    phantom.exit(1);
                }, 3000);

            }, 6000);
        }
        else {
            arrError.push(accountName);
            page.render("fail_Proxys.png");
            console.log("get Fail:" + accountName + " fail.")
        }

        //setTimeout(next_page, 11000);
    });
}

function sendKeys(page, selector, keys) {
    var fillcontrol = page.evaluate(function (selector) {
        // focus on the text element before typing
        var iframe = document.getElementById('aid-auth-widget-iFrame');
        var bodyIframe = document.getElementById('aid-auth-widget-iFrame').contentWindow.document;
        if (!iframe || !bodyIframe) {
            console.log('selector null')
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

function selectOption(selector, optionIndex) {
    page.evaluate(function (selector, optionIndex) {
        var sel = document.querySelector(selector);
        if (sel) {
            console.log("selected")
            sel.selectedIndex = optionIndex;
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            sel.dispatchEvent(evt);
        }
    }, selector, optionIndex);
}