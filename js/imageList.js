//
//
//
var imageList = {
    // screen objects Ids
    windowImageList  : "",
    temporaryCanvas  : "",
    temporaryImage   : "",
    listToLoad       : {},
    currentLoadIndex : 0,
    lastRecord       : {},
    base64Image      : {},


    //
    //  Hook and Unhook our image handler on 'load'
    //
    hookHandler : function (elementId) {
        document.getElementById(elementId).addEventListener('load', imageList.onImageLoad);
    },
    //
    unhookHandler : function (elementId) {
        document.getElementById(elementId).removeEventListener('load', imageList.onImageLoad);
    },

    //
    //  Set the source for out reference Image that will create the base64 image
    // 
    setImageSource : function (loc, src) {
        console.log("imageList.setImageSource: " + src);
        pnpApp.setImageSource(loc, src);
    },

    //
    //  BELOW Here, the `image` is assumed to be loaded before `imageList.onImageLoad()`
    //

    //
    imageToBase64 (imageURL, epoch) {
        // create base64 thumbnail w/parms
        var ratio        = 0.0625;                    // alternative resizing method
        var imgQ         = 0.8;                       // JPEG 'Q' factor
        var ws_width     = 160; // window.screen.width/4;
        imageList.base64Image  = resizeToBase64.image(imageList.temporaryImage,
                                                      imageList.temporaryCanvas,
                                                      {'width': ws_width},
                                                      imgQ);

        // check for NULL
        if (! imageList.base64Image) { return imageList.base64Image; }

        // RETURNS
        // {'img': , 'ratio': , 'height': ,'width': , 'Q': };
        // img    - the new base64 Image
        // ratio  - image reduction ratio used _or_ multipler used to get new image size
        // height - new height
        // width  - new width
        // 'Q'    - the 'Q' used with the JPG (for debugging)

        // create localStorage record
        imageList.lastRecord = {};                   // clear out the assocative array
        imageList.lastRecord.date  = (Date(epoch)).toLocaleString();   // Human readable
        imageList.lastRecord.epoch = epoch;          // for indexing 
        imageList.lastRecord.image = imageURL;       // THE IMAGE
        // RRR
        imageList.lastRecord.note  = "";             // RRR
        // Thumbnail
        imageList.lastRecord.base64thumbnail        = {} ;
        imageList.lastRecord.base64thumbnail.height = imageList.base64Image.height;  // height
        imageList.lastRecord.base64thumbnail.width  = imageList.base64Image.width;   // width
        imageList.lastRecord.base64thumbnail.img    = imageList.base64Image.img;     // thumbnail

        // 
        console.log("base64 image length " + imageList.lastRecord.base64thumbnail.img.length);

        return imageList.lastRecord.base64thumbnail.img.length;
    },
    //
    imageToDisplay : function (image) {
        // get epoch  -  milliseconds since midnight Jan 1, 1970
        var epoch = Date.now();

        // create a base64 image from the original & add to our record
        imageList.imageToBase64(image, epoch);

        //    return null, if some problem (BUT NOT WORKING RRR rewrite)

        // create a new pane image/HTML object - I did this as a separate statement for clariy
        var imageObject = panes.new(imageList.currentLoadIndex, epoch);

        // prepend the image/HTML object onto the list
        pnpApp.insertTopOfList(imageList.windowImageList, imageObject);

        // load image onto list & backfill the on-screen image object with the metadata and user NOTES
        pnpApp.setRecord2Screen(imageList.lastRecord, imageList.lastRecord.base64thumbnail);

        //
        console.log("image object backfilled. imageToDisplay: "  + image);
    },
    //
    onImageLoad : function () {
        // console.log("onImageLoad :" + imageList.listToLoad[imageList.currentLoadIndex].image)
        imageList.imageToDisplay(imageList.listToLoad[imageList.currentLoadIndex].image);
        imageList.currentLoadIndex++;
        //
        if (imageList.currentLoadIndex < imageList.listToLoad.length) {
            imageList.setImageSource(imageList.temporaryImage, imageList.listToLoad[imageList.currentLoadIndex].image);
        } else {
            // remove image handler once the list is loaded
            imageList.unhookHandler(imageList.temporaryImage);
            console.log(".\nturn off onImageLoad()\n.");
        }
    },
    //

    dummy : {}
};