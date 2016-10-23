document.addEventListener("DOMContentLoaded", function () {
    chrome.runtime.sendMessage({eventName: "toggle", eventValue: ""});
    window.close()
}, false);