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

	

});