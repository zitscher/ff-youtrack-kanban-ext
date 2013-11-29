
window.addEventListener("load", function () {
  gBrowser.addEventListener("load", renderNewButton, true);
}, false);

function isYouTrackIssue(){
    var urlArray = window.content.location.href.split('/'),
        url = urlArray[2] + '/' + urlArray[3] + '/',
        base = '10.192.54.209:8080/issue/';

    if (url === base) {
        return true;
    }
    else return false;
}

function renderNewButton(){
    if (isYouTrackIssue()) {
        $jq = jQuery.noConflict();

        //create and append new button
        if($jq('.kanbanextension', window.content.document).length == 0){
            $jq('.jt-toolbar-d-right', window.content.document).append('<div class="jt-toolbar-item-d command-item" title="Print issue"><a href="" class="sb-btn sb-btn-wide sb-border3 sb-toolbar-btn-gr-first kanbanextension" title="kanban" id="id_l.I.ic.icr.tb.printIssue"><span class="print" style="background-position: -40px -474px;"></span></a></div>');
            //assign action to new button
            $jq('.kanbanextension', window.content.document).bind('click', function(){
                collectIssueData();
            });
        }
    }
}

function collectIssueData() {
    if(isYouTrackIssue()){
        $jq = jQuery.noConflict();

        //Nutzloses Rausschmeissen
        $jq('.header'            ,window.content.document).remove();
        $jq('.footer'            ,window.content.document).remove();
        $jq('.jt-bl-north'       ,window.content.document).remove();
        $jq('.by'                ,window.content.document).remove();
        $jq('.jt-list-container' ,window.content.document).remove();
        $jq('.jt-toolbar'        ,window.content.document).remove();
        $jq('.fsiExtra'          ,window.content.document).remove();
        $jq('.jt-tabpanel-body'  ,window.content.document).remove();
        $jq('.commandsDialog'    ,window.content.document).remove();
        $jq('.clipboard-text'    ,window.content.document).remove();
        $jq('.text-copier'       ,window.content.document).remove();
        $jq('.ico'               ,window.content.document).remove();
        $jq('.links-panel'       ,window.content.document).remove();
        $jq('.attach-wrapper'                       ,window.content.document).remove();
        $jq('#id_l\\.I\\.as\\.addScreenshotDiv'     ,window.content.document).remove();
        $jq('#id_l\\.I\\.ewfd\\.editWatchFolderDlg' ,window.content.document).remove();
        $jq('#id_l\\.I\\.aa\\.addAttachmentDlg'     ,window.content.document).remove();
        $jq('#id_l\\.I\\.ni\\.newIssuePane'         ,window.content.document).remove(); 

        //ET wegen Platzgründen rausschmeissen
        $jq('tbody', window.content.document).children().last().remove();

        //Manipulieren
        //Hintergrund auf weiss setzen
        $jq('body', window.content.document).css({
            'background-image': 'none'
        });

        //Eigenschaften des Wrappers
         $jq('.jt-bl-wrapper', window.content.document).css({
            'width': '490px',
            'height': '330px',
            'border-top': '1px solid #ccc',
            'border-bottom': '1px solid #ccc',
            'position': 'relative'
        });
        $jq('.issueContainer', window.content.document).css({
            'margin': '0',
            'padding': '0'
        });

        //Padding-left
        $jq('.wiki, .issueIdAnchor', window.content.document).css({
            'padding-left': '5px'
        });
        $jq('.issueId', window.content.document).css({
            'padding-left': '5px',
            'padding-right': '5px',
            'background': '#ccc',
            'margin': '0px'
        });

        //Ticket-Ueberschrift
        $jq('#id_l\\.I\\.ic\\.icr\\.ToolbarWrapper', window.content.document).css({
            'width': '490px'
        });

        //Properties inline positionieren - fsi-properties = Eigenschaftsbloecke unten
        $jq('.fsi-property', window.content.document).css({
            'width': '100px',
            'padding-left': '1px',
            'padding-right': '1px'
        });
        $jq('.fsi-properties', window.content.document).css({
            'position': 'absolute',
            'width': '490px',
            'bottom': '0px',
            'border-collapse': 'collapse',
            'border-top': '1px solid #ccc',
            'background': '#fff'
        });
        $jq('.fsi-properties tr', window.content.document).css({
            'display': 'inline',
            'border-spacing': '0px !important'
        });
        $jq('.attribute-label', window.content.document).css({
            'width': '52px',
            'padding-left': '5px'
        });

        //Layout links halten
        $jq('.fsi-layout .center', window.content.document).css({
            'margin-left': '0px'
        });
        $jq('.fsi-layout .west', window.content.document).css({
            'width': '0px'
        });

        //Description Text overflow verhindern
        $jq('.description', window.content.document).css({
            'overflow': 'hidden',
            'max-height': '200px'
        });

        $jq('.fsi-wrapper', window.content.document).css({
            'border-bottom': '1px solid #ccc'
        });


        //Rotate and place
        $jq('.jt-bl-wrapper', window.content.document).css({
            '-moz-transform': 'rotate(-90deg)',
            'margin': '70px 0px 0px 65px'
        });

        //Druckdialog aufrufen
        window.content.print();
    }
    else{
        alert('Nur mit YouTrack Issues benutzbar!');
    }
}

//Helper
function log(str) {
    Firebug.Console.log(str);
}