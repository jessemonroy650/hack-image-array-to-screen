//
//  https://www.w3schools.com/jsref/dom_obj_image.asp
//  - naturalHeight, naturalWidth
//  https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
//  https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
//  https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
//  https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
//  https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
//  - atob(), btoa()
//
//  More than once I read that the image renders to 96 dpi.
//
var resizeToBase64 = {
    version      : '0.9.8',
    defaultQ     : 0.7,
    base64String : '',

    calculateNewSize : function (size, img) {
        var returnVal = {};
        var ratio     = 1;

        // short-circuit if no `size` given at all
        if ((! size.ratio) && (! size.height) && (! size.width)) {
            return null;
        }
        // `size.width` alone will set `size.height`
        if ((! size.ratio) && (! size.height)) {
            ratio       = (size.width/img.naturalWidth).toFixed(8);
            size.height = Math.floor(img.naturalHeight * ratio);
        }
        // `size.height` alone will set `size.width`
        if ((! size.ratio) && (! size.width)) {
            ratio      = (size.height/img.naturalHeight).toFixed(8);
            size.width = Math.floor(img.naturalWidth  * ratio);
        }
        // validate the size calculation so far
        console.log((size.ratio) ? size.ratio : ratio);

        // resize returnVal to image destination size
        // any blank spots in the <canvas> will show up in the new image
        if (size.ratio) {
            if (size.ratio < 1.0) {
                returnVal.width  = Math.floor(img.naturalWidth  * size.ratio)
                returnVal.height = Math.floor(img.naturalHeight * size.ratio);
            } else {
                return null;
            }
        } else {
            returnVal.width  = size.width;
            returnVal.height = size.height;
        }

        returnVal.ratio = (size.ratio) ? size.ratio : ratio

        return returnVal;
    },
    //
    image : function (imageID, canvasID, theSize, imageQ) {
        var theImage = document.getElementById(imageID);   // This can be set to `display:none;`etc, but must be loaded.
        var c        = document.getElementById(canvasID);  // This must be an HTML <canvas></canvas>
        var imgQ     = (imageQ) ? imageQ : resizeBase64.defaultQ; // If `Q` is not set, it defaults to `0.92` (per mozilla).
        var newSize  = {} ;

        // get the '2d' context - as in a drawable canvas
        var ctx  = c.getContext("2d");

        //
        // Calculate the height & width of the new image
        //
        newSize = resizeToBase64.calculateNewSize(theSize, theImage);

        // check for NULL
        if (! newSize) { return newSize; }

        // Set the Canvas size
        c.width  = newSize.width;
        c.height = newSize.height;

        // copy image to canvas, start at origin given (0,0), and resize (width,height)
        // canvas-size = image-target-size
        ctx.drawImage(theImage, 0, 0, c.width, c.height);

        // canvas image to JPEG `base64` string with given Q
        // save internally and return
        resizeToBase64.base64String = c.toDataURL('image/jpeg', imgQ);

        // return image Object
        return {'img': resizeToBase64.base64String,
                'ratio': newSize.ratio,
                'height': newSize.height,
                'width': newSize.width,
                'Q': imgQ};
    }
};
