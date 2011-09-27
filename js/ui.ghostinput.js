    (function($){
        $.widget('ui.ghostinput', {
            _init: function() {
            	var opt = $.extend({
				    ghostText: this.element.attr("data-ghosttext"),
				    ghostLabel: this.element.attr("data-ghostlabel")
				},this.options);
				
            	wrapper = $('<span/>').addClass('ui-ghostinput-wrapper ui-widget ui-state-default ui-corner-all').attr('id', 'ui-ghostinput-wrapper_'+this.element.attr('id'));
			    this.element.wrap(wrapper);
			    $('#'+wrapper.attr('id')).css({
			              'width': this.element.width()+'px', 
			              'height': this.element.height()+'px', 
			              'display': 'inline-block', 
			              'overflow': 'hidden'});
			              
			    this.element.css('margin', '0');
			    this.element.after($('<span/>').addClass('ui-ghostinput-input').html($('<span/>').addClass('ui-ghostinput-copy')));
			      
			    if (opt.ghostLabel!==undefined ) {
			        this.element.before( $('<label/>').attr({'for': this.element.attr('name'), 'class': 'ui-ghostinput-label'}).html(opt.ghostLabel) );
			    };
				
				this.element
					.bind('keyup', function() {
				      if ($(this).val() !== wrapper.find('.ui-ghostinput-copy').html()) {
				        wrapper = $(this).parent();
				        if ($(this).val() !== '') {
				          wrapper.find('.ui-ghostinput-label').fadeOut('fast');
				          wrapper.find('.ui-ghostinput-input').show().html($('<span/>').addClass('ui-ghostinput-copy').html($(this).val() ));
				          wrapper.find('.ui-ghostinput-copy').after(opt.ghostText);
				        } else {
				          wrapper.find('.ui-ghostinput-label').fadeIn(100);
				          wrapper.find('.ui-ghostinput-input').fadeOut(100, function() {
				            $(this).html('');
				          });
				        };
				        if (opt.change!==undefined) {
				          opt.change();
				        };
				      };
				    })
					.bind('focus', function() {
						$(this).addClass('ui-state-active').parent().addClass('ui-state-active');
					})
  					.bind('blur', function() {
						$(this).removeClass('ui-state-active').parent().removeClass('ui-state-active');
					})
  					.bind('mouseover', function() {
						$(this).addClass('ui-state-hover').parent().addClass('ui-state-hover');
					})
  					.bind('mouseout', function() {
						$(this).removeClass('ui-state-hover').parent().removeClass('ui-state-hover');
					});

            },
        });
        $.extend($.ui.ghostinput);
    })(jQuery);