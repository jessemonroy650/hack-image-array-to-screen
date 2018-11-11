//
//
//
var app = {
    version : '0.8.8',
    targetEvent : 'click',
    isCordova   : false,

    //
    onDOMContentLoaded : function () {
        document.getElementById('originalImage').src = 'image/IMG_0634.jpg';
        document.getElementById('test').innerHTML    = 'app.onDOMContentLoaded';
    },
    onDeviceReady : function () {

        app.targetEvent = 'touchend';
        document.getElementById('originalImage').src = 'image/dad+benny.jpg';
        document.getElementById('test').innerHTML    = 'app.onDeviceReady';
        //
        //
        //  Setup to load a list
        //
        //app.setupImageList(demoRecord);
    }
};
