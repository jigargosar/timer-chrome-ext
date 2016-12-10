localStorage.setItem("running", "false");
localStorage.setItem("intervalMinutes", 25);
var myAudio = new Audio();        // create the audio object
myAudio.src = "rock-loop.mp3"; // assign the audio file to it


var isRunning = function () {
    return localStorage.getItem("running")
};

var clearID = null;
var startMilli = null;
var intervalMilli = function () {
    return localStorage.getItem("intervalMinutes") * 60 * 1000
};

var stopTimer = function () {
    console.log("Deactivating Timer");
    clearInterval(clearID);
    chrome.browserAction.setTitle({
        title: "Don't click me! Type Ctrl+Shift+9 :)"
    });
    localStorage.setItem("running", "false");
    chrome.browserAction.setIcon({path: "off.png"});
};
var startTimer = function () {
    console.log("Activating Timer");
    clearInterval(clearID);
    startMilli = Date.now();
    localStorage.setItem("running", "true");
    chrome.browserAction.setIcon({path: "on.png"});
    clearID = setInterval(function () {
        var now = Date.now();
        var elapsedMilli = now - startMilli;
        var intervalMillSnapShot = intervalMilli();
        var remMilli = intervalMillSnapShot - elapsedMilli;
        var remSec = remMilli / 1000;
        var remMin = remSec / 60;
        chrome.browserAction.setTitle({
            title: "Remaing Time:" + (Math.floor(remMin)) + "m " + (Math.floor(remSec) % 60) + "s"
        });
        if (elapsedMilli > intervalMillSnapShot && isRunning()) {
            startMilli = now;
            myAudio.play();
        }
    }, 1000);
};

chrome.runtime.onMessage.addListener(function (message) {
    if (message.eventName === "setIntervalMin") {
        localStorage.setItem("intervalMinutes", message.eventValue);
        stopTimer();
        startTimer();
    }
    else if (message.eventName === "toggle") {
        if (isRunning() === "true") {
            stopTimer()
        } else {
            startTimer()
        }
    }
});
