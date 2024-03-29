(function ($) {
	function calcStepSize(optionNode) {
		var breakM = 990; 
		var breakS = 768; 
		
		var width = $(window).innerWidth();
		
		if(width < breakS) {
			var key = 's';
		} else if(width < breakM) {
			key = 'm';
		} else {
			key = 'l';
		}
		
		var cnt = 1*optionNode.data("itemcount-"+key);
		
		return cnt > 0? cnt : 1;
	}

	function repartition(container, items, count) {
		container.children().remove();
		
		for(var i = 0; i < items.length; i++) {
			var cBlock = $('<div class="carousel-item" ></div').appendTo(container);
			var cInnerBlock = $('<div class="row"></div>').appendTo(cBlock);
                
			for(var j = 0; j < count; j++) {
				var cIdx = (i + j) % items.length;
				
				cInnerBlock.append($(items.get(cIdx)).clone());
			}
		}
		
		container.children().first().addClass("active");
	}
	
	$('.carousel.multi').each(function(idx, El) {
		var carousel = $(El);
		var container = carousel.find('.carousel-inner');
		
		if(!container.children().first().hasClass('carousel-item')) {
			var items = container.children().clone();

			var lastSize = calcStepSize(carousel);
			repartition(container, items, lastSize);

			$(window).resize(function () {
				var cSize = calcStepSize(carousel);

				if(cSize != lastSize) {
					repartition(container, items, cSize);
					lastSize = cSize;
				}
			}); 
		} else {
			container.children().first().addClass("active");
		}
		
		carousel.carousel({
			interval: false
		});
	});

}(jQuery))
/*tab cart*/
// Instantiate the Bootstrap carousel

