//
//
//
var app = {
    version : '0.8.8',
    targetEvent : 'click',
    isCordova   : false,

    //
    setupImageList : function (list) {
        // These screen object ids are used with native javascript.
        imageList.temporaryImage   = 'originalImage';
        imageList.temporaryCanvas  = 'tempCanvas';
        imageList.windowImageList  = 'imageList';

        imageList.currentLoadIndex = 0;
        imageList.listToLoad       = list;
        imageList.hookHandler(imageList.temporaryImage);
        console.log("number of images: " + imageList.listToLoad.length);
        //
        //  Load First Item
        //
        imageList.setImageSource(imageList.temporaryImage, imageList.listToLoad[imageList.currentLoadIndex].image);
    },
    //
    onDOMContentLoaded : function () {
        app.isCordova  = (typeof window.cordova !== "undefined");
        document.getElementById('originalImage').src = 'image/dad+benny.jpg';
    },
    onDeviceReady : function () {
        document.getElementById('test').innerHTML = 'app.onDeviceReady';
        app.targetEvent = 'touchend';
        //
        //
        //  Setup to load a list
        //
        // app.setupImageList(demoRecord);
    }

};
