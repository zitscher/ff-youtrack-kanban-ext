var kanban = kanban || {}

kanban.methods = kanban.methods || {}

kanban.methods.collectTicketData = function ()
{
    jQuery = jQuery.noConflict();

	//remove unnecessary
	jQuery('.header').remove();
	jQuery('.footer').remove();
	jQuery('.ring-footer').remove();

	var container = jQuery('.fsi-layout');
	container.find('#spContainer').remove();
	container.find('.content:first-of-type').remove();
	container.find('.jt-panel.fsi-tabs').remove();
	container.find('.links-panel').remove();
	container.find('.attach-wrapper').remove();
	container.find('.fsi-mid').remove();
	container.find('.tag-list').remove();

	var sidebar = jQuery('.subcontent');
	sidebar.find('.by').remove();

	sidebar.find('.fsi-property-delimiter').parent().remove();

	var ticket = jQuery('.content');
	var description = ticket.find('.center');
	var info = ticket.find('.subcontent');

    //Hintergrund auf weiss setzen
    jQuery('body').css({
        'background-image': 'none'
    });

	//Eigenschaften des Tickets
	ticket.parent().css({
		'padding-top': '160px',
		'position': 'relative',
		'left': '-20px'

	});

	ticket.css({
		'width': '510px',
		'height': '360px',
		'border-top': '1px solid #ccc',
		'border-bottom': '1px solid #ccc',
		'position': 'relative',
		'overflow': 'hidden',
		'margin-right': '0px'
	});
	ticket.find('.fsi-card').css({
		'height': '242px',
		'margin': '0',
		'padding': '0',
		'box-shadow': 'none',
		'border': '0 none',
		'background': 'transparent',
		'z-index': '1'
	});
	ticket.find('.fsi-content').css({
		'margin': '0px 0px 0px 1px'
	});

	ticket.find('.fsi-toolbar-content').css({
		'margin': '0',
		'border-bottom': '1px solid #ccc'
	});

	ticket.find('.issueId_fsi, .issue-summary').css({
		'font-size': '22px',
		'font-weight': 'bold'
	});

	ticket.find('.ico').css({
		'display': 'none'
	});

	//Eigenschaften der Description
	description.css({
		'width': '510px',
		'height': '196px',
		'position': 'absolute',
		'overflow': 'hidden',
		'top': '0px',
		'left': '0px',
		'margin-right': '0px',
		'background': '#fff',
		'z-index': '9999'
	});

	//Eigenschaften der info
	info.css({
		'border-top': '1px solid #ccc',
		'width': '520px',
		'height': '162px',
		'position': 'absolute',
		'overflow': 'hidden',
		'bottom': '0px',
		'min-height': '0px',
		'margin': '0'
	});

	info.find('tr').css({
		'float': 'left',
		'width': '49%',
		'white-space': 'nowrap',
		'overflow': 'hidden'
	});

	info.find('td:first-of-type').css({
		'width': '120px',
		'max-width': '120px',
		'font-weight': 'bold'
	});
	info.find('td:last-of-type').css({
		'width': '130px'
	});

	info.find('.attribute-color-mark').hide();

	//Druckdialog aufrufen
	window.content.print();
}