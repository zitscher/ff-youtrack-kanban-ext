var kanban = kanban || {}

kanban.methods = kanban.methods || {}

kanban.methods.collectTicketListData = function ()
{

    //Nutzloses Rausschmeissen
    jQuery('.header').remove();
    jQuery('.footer').remove();

    jQuery('.jt-bl-north').remove();
    jQuery('.jt-bl-west').remove();

    jQuery('.jt-toolbar').remove();
    jQuery('.sb-toggler').remove();

    jQuery('.issue-controls-wrp').remove();
    jQuery('.vote-wrapper').remove();
    jQuery('.issue-date').remove();
    jQuery('.date.dtbl-cell').remove();

    //Ausgewähltes Ticket unselecten
    jQuery('.issues-wrapper').children().each(function(index) {
        if(jQuery(this).hasClass('selected')){
            jQuery(this).removeClass('selected');
        }
    });    

    //Hintergrund auf weiss setzen
    jQuery('body').css({
        'background-image': 'none',
        'position': 'relative'
    });

    jQuery('.default-layout .center').css({
        'margin-left': '0px'
    });

    //Eigenschaften des Wrappers
    jQuery('.issueContainer').css({
        'width': '490px',
        'height': '330px',
        'border-top': '0px',
        'border-bottom': '0px',
        'position': 'relative',
        'page-break-after': 'always'
    });
    jQuery('.issues-wrapper').css({
        'border': 'none',
        'margin-top': '0px'
    });
    jQuery('.jt-bl-wrapper').css({
        'position': 'absolute',
        'left': '0px'
    });


    //Eigenschaften der Description
    jQuery('.description').css({
        'display': 'block',
        'text-align': 'left',
        'clear': 'both',
        'margin-top': '15px',
        'height': '200px',
        'overflow': 'hidden',
        'padding-top': '15px'
    });

    //Eigenschaften der Properties
    jQuery('.properties').css({
        'position': 'absolute',
        'bottom': '10px',
        'table-layout': 'none',
        'float': 'left',
        'margin-top': '15px',
        'border-top': '1px solid #ccc',        
        'border-bottm': '1px solid #ccc',
        'padding': '5px 0px 5px 0px',
        'background': '#fff'
    });
    jQuery('.dtbl .properties > .regCC, .dtbl .properties > .attributes, .dtbl .properties > .attribute, .dtbl .properties > span').css({
        'float': 'left',
        'width': '32%',
        'height': '30px',
        'border': '0px'
    });    

    //Eigenschaften der IssueId
    jQuery('.issueId').css({
        'font-size': '170%',
        'background': '#ccc',
        'padding': '5px 0px 5px 0px',
        'margin': '0px',
        'width': '10%'
    });    

    //Eigenschaften der Summary
    jQuery('.issue-summary').css({
        'display': 'inline-block',
        'margin': '0px',
        'width': '90%',
        'float': 'left',
        'text-align': 'left',
        'font-size' : '170%',
        'border-top': '1px solid #ccc',
        'border-bottom': '1px solid #ccc',
        'padding': '5px 0px 5px 0px',
        'overflow': 'hidden',
        'max-height': '58px'
    }); 

    //Eigenschaften des TagContainers
    jQuery('.yt-tag').parent().css({
        'position': 'absolute', 
        'bottom': '0px',
        'z-index': '100'
    });

    //Rotate and place
    jQuery('.issueContainer').css({
        'padding': '160px 0px 0px 0px'
    });

    //Druckdialog aufrufen
    window.content.print();

}