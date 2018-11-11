//
//
//
var app = {
    version : '0.8.8',
    targetEvent : 'click',
    isCordova   : false,

    //
    onDOMContentLoaded : function () {
        alert("onDOMContentLoaded");

        document.getElementById('originalImage').src = 'img/IMG_0634.jpg';
        document.getElementById('test').innerHTML    = 'app.onDOMContentLoaded';
    },
    onDeviceReady : function () {
        alert("onDeviceReady");

        app.targetEvent = 'touchend';
        document.getElementById('originalImage').src = 'img/dad+benny.jpg';
        document.getElementById('test').innerHTML    = 'app.onDeviceReady';
        //
        //
        //  Setup to load a list
        //
        //app.setupImageList(demoRecord);
    }
};
