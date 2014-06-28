$(document).ready( function() {
	var downEvents = 'touchstart MSPointerDown click';

	$('.menu-icon').on(downEvents, function() {
		$('.nav2').addClass('open');
		$('.menu-icon').addClass('hidden');
		return false;
	});

	$('.close-icon').on(downEvents, function() {
		$('.nav2').removeClass('open');
		$('.menu-icon').removeClass('hidden');
		return false;
	});

	/* Adjust height of blocks on page */
	var mq = window.matchMedia('(min-width: 700px)');
	if(mq.matches) {
	    console.log( 'height of window is: ', $(window).height(), ' px' );
		var winHeight = $(window).height();
		console.log($('.couple'));
		$('.couple').height( winHeight );
	};

});