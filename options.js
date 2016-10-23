document.addEventListener("DOMContentLoaded", function () {

    // window.close()
    var inputMin = document.querySelector("#minutes");
    inputMin.value = parseInt(localStorage.getItem("intervalMinutes"));

    document.querySelector("#save").addEventListener("click", function () {
        var value = parseInt(inputMin.value);
        inputMin.value = value < 1 ? 1 : value;
        chrome.runtime.sendMessage({eventName: "setIntervalMin", eventValue: inputMin.value});
    })

}, false);