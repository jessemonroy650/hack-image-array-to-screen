//
// Photo Notepad
//	Date: 2018-11-01
//
var pnpApp = {
    version : 0.3,
    statusSpan : '',

    init : function (statusSpan) {
        this.statusSpan = statusSpan;

        console.log("pnpApp.statusSpan: " + pnpApp.statusSpan );
    },
    setImageSource : function (location, image) {
        $('#' + location).attr('src', image);
    },
    //
    setRecord2Screen : function (record, img) {
        if (record) {
            // record to the screen
            $('#note'  + record.epoch).text(record.note);
            $('#date'  + record.epoch).text(record.date);
            // hidden fields
            $('#epoch' + record.epoch).text(record.epoch);
            $('#image' + record.epoch).text(record.image);  // This is the original image
        }
        // This is the base64 (string) image
        if (img) {
            // image to screen and size it
            $('#base64thumb' + record.epoch).attr('height', img.height);
            $('#base64thumb' + record.epoch).attr('width', img.width);
            $('#base64thumb' + record.epoch).attr('src', img.img); 
        }
    },
    //
    insertTopOfList : function (location, object) {
        $("#" + location).prepend(object);
    },
    //
    insertBottomOfList : function (location, object) {
        $("#" + location).append(object);
    },
    //
    updateRecordSummary : function () {
        if (pnpApp.statusSpan) {
            $('#' + pnpApp.statusSpan).text("Num of Photo Notes: " + demoRecord.length);
        }
    }

};
