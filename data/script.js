var kanban = kanban || {}

kanban.main = kanban.main || {}

kanban.main.init = function()
{
    var urlArray = window.content.location.href;

	//Ticket List
	if(urlArray.indexOf('printIssues') > -1){
		if(jQuery('.kanbanextension').length == 0){
			kanban.main.addMultiKanbanButton();
		}
	}
	//Single Ticket
	else if(urlArray.indexOf('/issue/') > -1) {
		if(jQuery('.kanbanextension').length == 0){
			kanban.main.addKanbanButton();
			//assign action to new button
			jQuery('.kanbanextension').bind('click', function(event){
				event.preventDefault();
				kanban.main.checkTicketState('single');
			});
		}
	}
}

kanban.main.addKanbanButton = function()
{
    //create and append new button
    jQuery('.jt-toolbar-d-right').append('<div class="jt-toolbar-item-d command-item" title="Print issue"><a href="" class="sb-btn sb-btn-wide sb-border3 sb-toolbar-btn-gr-first kanbanextension" title="kanban" id="id_l.I.ic.icr.tb.printIssue"><span class="print" style="background-position: -40px -474px;"></span></a></div>');
}


kanban.main.addMultiKanbanButton = function()
{
	//create and append new button
	var button = jQuery('<button id="multiPrint">Multiprint</button>');
	jQuery('body').prepend(button);

	button.css({
		'position': 'fixed',
		'left': '50%',
		'top': '20px',
		'width': '100px',
		'height': '50px'
	});

	button.on('click', function(event){
		event.preventDefault();
		var containers = jQuery('.issueContainer');

		containers.each(function() {
			var container = jQuery(this);
			var isPrinted = false;

			//remove attachments
			if(container.find('.print-att').length){
				container.find('.print-att').parent().remove();
			}
			//remove links-panel
			container.find('.links-panel').remove();
			//remove print-votes
			container.find('.print-votes').remove();

			var tags = container.find('div.tag-item .yt-tag');
			tags.each(function() {
				if(jQuery(this).attr('title') === 'PRINTED') {
					container.remove();
					isPrinted = true;
				}
			});

			if(!isPrinted) {
				kanban.main.tagTicket(container.find('.issueId').text());
			}
		});

		//remove logo
		jQuery('img')[0].remove();

		//Style ticket
		//Eigenschaften des Wrappers
		jQuery('.issueContainer').css({
			'width': '490px',
			'height': '330px',
			'border-top': '0px',
			'border-bottom': '0px',
			'position': 'relative',
			'page-break-after': 'always'
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
		jQuery('.print-block:nth-of-type(1)').css({
			'position': 'absolute',
			'bottom': '10px',
			'table-layout': 'none',
			'float': 'left',
			'margin-top': '15px',
			'border-top': 'none',
			'border-bottom': '1px solid #ccc',
			'padding': '5px 0px 5px 0px',
			'background': '#fff',
			'z-index': '999'
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
			'width': '20%'
		});

		//Eigenschaften der Summary
		jQuery('.issue-summary').css({
			'display': 'inline-block',
			'margin': '0px',
			'width': '80%',
			'float': 'left',
			'text-align': 'left',
			'font-size' : '170%',
			'border-top': '1px solid #ccc',
			'border-bottom': '1px solid #ccc',
			'padding': '5px 0px 5px 0px',
			'overflow': 'hidden',
			'max-height': '58px'
		});

		jQuery('.tag-list').parent().css({
			'display': 'block',
			'margin-top': '0px',
			'position': 'relative',
			'top': '-77px',
			'width': '100%',
			'padding-top': '0',
			'background': '#fff'
//			'position': 'relative',
//			'top': '-15px'
		});


		//Eigenschaften des TagContainers
		jQuery('.yt-tag').parent().css({
//			'position': 'absolute',
//			'bottom': '0px',
//			'z-index': '100'
		});

		//Rotate and place
		jQuery('.issueContainer').css({
			'padding': '160px 0px 0px 0px'
		});

		button.remove();

		//Druckdialog aufrufen
		window.content.print();
	});
}

kanban.main.checkTicketState = function(option)
{
    //Single Ticket
    if(option === 'single'){
        var tags = jQuery('.tag-link').text();
        if(tags.indexOf('PRINTED') !== -1) {
            alert('Ticket wurde schon gedruckt!');    
        }
        else {
            var issueId = jQuery('.issueId').text();
            kanban.main.tagTicket(issueId);
            kanban.methods.collectTicketData();
        }
    }
    //Multiple Tickets
    else if(option === 'multiple'){
        var issues = [];
        var noPrintedTickets = true;

        jQuery('.issues-wrapper').children().each(function(){
            var issueId = jQuery(this).find('.issueId').text();
            var tag = jQuery(this).find('.tag-link').text();

            //Printed Tag gefunden
            if(tag !== '' && tag.indexOf('PRINTED') !== -1) {
                alert('Ticket ' + issueId + ' wurde schon gedruckt!');
                noPrintedTickets = false;
                return false;
            }
            //Speichere issueId's
            else if(issueId != '') {
                issues.push(issueId);
            }
        });

        if(noPrintedTickets){
            for(var i=0; i<issues.length; i++) {
                kanban.main.tagTicket(issues[i]);
            }
            kanban.methods.collectTicketListData();
        }
    }
}


kanban.main.tagTicket = function(issueId)
{
    var base_url = window.location.protocol + "//" + window.location.host + "/";
    var url_command = base_url + 'rest/issue/' + issueId + '/execute?command=add+tag+PRINTED';
    console.log(url_command);

    jQuery.ajax({
        type: 'POST',
        url: url_command,
        success: function(data) {
            console.log('success');
        },
        error:function (xhr, ajaxOptions, thrownError){
            console.log(xhr);
            console.log(ajaxOptions);
            console.log(thrownError);
        }        
    });
}

//Execute
kanban.main.init();



