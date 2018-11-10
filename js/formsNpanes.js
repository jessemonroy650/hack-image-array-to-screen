//
//
//
var forms = {
};
//
var panes = {
    new : function (rootID, miscId) {
        if (typeof rootID != "undefined") {
            return "        <div id=record" + rootID + " me= class='record clearfix' > \
            <img  id=base64thumb" + miscId + " me= class='canvasImage thumbnail'> \
            <div id=note" + miscId + " class='summaryNote truncate' ></div> \
            <div id=date" + miscId + " class='calendarDate truncate'></div> \
            <div id=epoch" + miscId + " class=''></div> \
            <div id=image" + miscId + " class=''></div> \
        </div>";
        } else {
            return null;
        }
    }
};
