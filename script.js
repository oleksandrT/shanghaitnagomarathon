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

	/* Packdges select */
	$('form#registrForm #packageClass').change( function() {
		var selectValue = $(this).val();
		console.log( selectValue );
		if ( selectValue == "8 classes" ) {
			$( 'input[type="checkbox"].lesson' ).attr('checked','checked');
		} else if ( selectValue == "none" ) {
			$( 'input[type="checkbox"].lesson' ).attr('checked', false);
		};
	});

	$('form#registrForm #packageMilonga').change( function() {
		var selectValue = $(this).val();
		console.log( selectValue );
		if ( selectValue == "All milongas" ) {
			$( 'input[type="checkbox"].milonga' ).attr('checked','checked');
		} else if ( selectValue == "Weekend milongas" ) {
			$( 'input[type="checkbox"].milonga' ).attr('checked','checked');
			$( 'input[type="checkbox"].milonga' ).first().removeAttr('checked');
		} else if ( selectValue == "none" ) {
			$( 'input[type="checkbox"].milonga' ).removeAttr('checked');
		};;
	});

	/* Count price */
	$('form.registrForm').bind('change', function(e){
		var priceClass8 = 2000,
			priceClass4 = 1000,
			priceClass1 = 260,
			priceMilongaAll = 1200,
			priceMilongaWeekend = 1000,
			pricePrivate1 = 1400,
			pricePrivate4 = 1300,
			pricePrivate6 = 1200,
			classAmount = $('form.registrForm input[type="checkbox"].lesson:checked').length,
			milongaAmount = $('form.registrForm input[type="checkbox"].milonga:checked').length,
			amountPrivatSR = $('form.registrForm select[name="privatesSebaRoxana"]').val(),
			amountPrivatSI = $('form.registrForm select[name="privatesSebaInes"]').val(),
			amountMilena = $('form.registrForm select[name="privatesMilena"]').val(),
			priceClasses = 0,
			priceMilongas = 0,
			pricePrivates = 0,
			totalPrice = 0;

		var classPackadge = 'none',
			milongaPackadge = 'none';
		classPackadge = $('form#registrForm #packageClass').val();
		milongaPackadge = $('form#registrForm #packageMilonga').val();

		if ( classPackadge.charAt(0) == "8" ) {
			priceClasses = priceClass8;
		} else if ( classPackadge.charAt(0) == "4" ) {
			priceClasses = priceClass4;
		} else {
			priceClasses = classAmount*priceClass1;
		};

		if ( milongaPackadge == "All milongas" ) {
			priceMilongas = priceMilongaAll;
		} else if ( milongaPackadge == "Weekend milongas" ) {
			priceMilongas = priceMilongaWeekend;
		};

		pricePrivates = pricePrivate1*amountPrivatSR + pricePrivate1*amountPrivatSI + pricePrivate1*amountMilena;

		totalPrice = priceClasses + priceMilongas + pricePrivates;
		$('div.priceToPay b').html(totalPrice);
	});

	/* Submit form */
	$('form.registrForm').bind('submit', function(e){
        e.preventDefault();

        var form = this;

        if ( isValidated(form) ) {
        	$('.blockRegister').empty();
        	$('.blockRegister').html( 
        		'<p>Thank you for registration!</p>'+
        		'<p>Copy of registration will be send to your email.</p>'
        		);

	        var json = convertFormToJSON(form);

	        // console.log('my json: ', json);
        };
    });

    /* Load data to admin main page */
    /* All people table */
    var totalPeople = people.length;
    for (var i = 0; i < totalPeople; i++) {
    	var row = document.createElement("tr");
    	for (var key in people[i]) {
    		var marked = false;
    		if ( key != "email" && key != "phone" ) {
	    		var cell = document.createElement("td");
	    		if (key == "name") {
	    			var linkTag = document.createElement("a"),
	    				hrefVal = "list/" + people[i][key] + ".html";	
	    			$(linkTag).attr("href", hrefVal);
	    			$(linkTag).css("color", "#eb2323");
	    			$(linkTag).html( people[i][key] );
	    			$(cell).append(linkTag)
	    		} else {
	    			$(cell).html( people[i][key] );
	    		};
	    		$(row).append(cell);

	    		if ( key == "paid" && people[i][key] == "no" ) {
	    			marked = true;
	    		};
	    	};
    	};

    	if ( marked == true ) {
    		$(row).css("backgroundColor", "#c0c0c0");
    	};

    	$('.admin table').append(row);
    };

    /* classes table */
    var totalClasses = classesTitles.length;
    for (var i = 0; i < totalClasses; i++) {
    	
    	/* class title */
    	var row = document.createElement("tr");    	
	    var cell = document.createElement("td");
	    $(cell).css('textAlign', 'left');
	    $(cell).html(classesTitles[i]);

	    /* max leaders */  	
	    var cell1 = document.createElement("td");
	    $(cell1).html("20");
	    $(row).append(cell);
	    $(row).append(cell1);

	    /* max followers */
	    var cell2 = document.createElement("td");
	    $(cell2).html("20");
	    $(row).append(cell2);

	    /* leaders */
	    var cell3 = document.createElement("td");
	    var counterL = 0;
	    for (var j = 0; j < totalPeople; j++) {
    		if ( people[j].gender == 'Leader' && $.inArray( classesShorts[i], people[j].classes) != -1 ) {
    			counterL++;
    		};
    	};
		$(cell3).html(counterL	);
	    $(row).append(cell3);

	    /* followers */
	    var cell4 = document.createElement("td");
	    var counterF = 0;
	    for (var j = 0; j < totalPeople; j++) {
    		if ( people[j].gender == 'Follower' && $.inArray( classesShorts[i], people[j].classes) != -1 ) {
    			counterF++;
    		};
    	};
	    $(cell4).html(counterF);
	    $(row).append(cell4);

	    /* leaders % */
	    var cell5 = document.createElement("td");
	    var percentL = 0;
	    percentL = (counterL/20)*100;
	    $(cell5).html( percentL );
	    $(row).append(cell5);

	    /* followers % */
	    var cell6 = document.createElement("td");
	    var percentF = 0;
	    percentF = (counterF/20)*100;
	    $(cell6).html( percentF );
	    $(row).append(cell6);

    	$('.classTable table').append(row);
    };

     /* milonga table */
    var totalMilongas = milongaTitles.length;
    for (var i = 0; i < totalMilongas; i++) {
    	
    	/* milonga title */
    	var row = document.createElement("tr");    	
	    var cell = document.createElement("td");
	    $(cell).css('textAlign', 'left');
	    $(cell).html(milongaTitles[i]);

	    /* max leaders */  	
	    var cell1 = document.createElement("td");
	    $(cell1).html("200");
	    $(row).append(cell);
	    $(row).append(cell1);

	    /* max followers */
	    var cell2 = document.createElement("td");
	    $(cell2).html("200");
	    $(row).append(cell2);

	    /* leaders */
	    var cell3 = document.createElement("td");
	    var counterL = 0;
	    for (var j = 0; j < totalPeople; j++) {
    		if ( people[j].gender == 'Leader' && $.inArray( milongaShorts[i], people[j].milongas) != -1 ) {
    			counterL++;
    		};
    	};
		$(cell3).html(counterL	);
	    $(row).append(cell3);

	    /* followers */
	    var cell4 = document.createElement("td");
	    var counterF = 0;
	    for (var j = 0; j < totalPeople; j++) {
    		if ( people[j].gender == 'Follower' && $.inArray( milongaShorts[i], people[j].milongas) != -1 ) {
    			counterF++;
    		};
    	};
	    $(cell4).html(counterF);
	    $(row).append(cell4);

	    /* leaders % */
	    var cell5 = document.createElement("td");
	    var percentL = 0;
	    percentL = (counterL/200)*100;
	    $(cell5).html( percentL );
	    $(row).append(cell5);

	    /* followers % */
	    var cell6 = document.createElement("td");
	    var percentF = 0;
	    percentF = (counterF/200)*100;
	    $(cell6).html( percentF );
	    $(row).append(cell6);

    	$('.milongaTable table').append(row);
    };



    /* Load data to About person admin page */
    var fileName = window.location.pathname.split( '/' ).pop(),
    	personName = fileName.split( '.' )[0].replace("%20", " ");

    var index = 0;
    for (var i = 0; i < totalPeople; i++) {
    	if ( people[i].name == personName ) { index = i };
    };
    personData = people[index];

    var nameTitle = document.createElement("p");
    $(nameTitle).html( people[index].name )

    $('.personInfo').append(nameTitle);
    var personTable = document.createElement('table');

    $('.personInfo').append(personTable);
    for (key in personData) {
    	if (key != "name") {
	    	var personTableRow = document.createElement('tr'),
	    		personTableColTitle = document.createElement('td'),
	    		personTableColValue = document.createElement('td');
	    	$(personTableColTitle).html(key);
	    	$(personTableColValue).html(personData[key]);
	    	if (key == "paid" && personData[key] == "no") {
	    		$(personTableColValue).addClass("notPaid");
	    	} else if (key == "paid" && personData[key] == "yes") {
	    		$(personTableColValue).addClass("paid");
	    	};
	    	if ( key == "payment" ) {
	    		$(personTableColValue).addClass("paymenType");
	    	};
	    	$(personTableRow).append(personTableColTitle);
	    	$(personTableRow).append(personTableColValue);

	    	$(personTable).append(personTableRow);
    	};
    };

    /* Payment select */
    var selectParagraph = document.createElement('p'),
    	paymentSelect = document.createElement('select'),
    	optCash = document.createElement('option'),
    	optBank = document.createElement('option'),
    	optCard = document.createElement('option'),
    	optAlipay = document.createElement('option');

    $(optCash).html("Cash");
    $(optBank).html("Bank");
    $(optCard).html("Card");
    $(optAlipay).html("Alipay");

    $(paymentSelect).append(optCash);
    $(paymentSelect).append(optBank);
    $(paymentSelect).append(optCard);
    $(paymentSelect).append(optAlipay);
    $(selectParagraph).append(paymentSelect);
    $('.personInfo').append(selectParagraph);

    $(paymentSelect).on('change', function() {
    	var cellPayment = $('td.paymenType'),
    		paymentVal = $(paymentSelect).val();
    	console.log(paymentVal);
    	$(cellPayment).html(paymentVal);
    });


    /* Buttons */
    var acceptBtn = document.createElement('button'),
    	cancelBtn = document.createElement('button');
    $(acceptBtn).html("accept payment");
    $(cancelBtn).html("cancel payment");
    $('.personInfo').append(acceptBtn);
    $('.personInfo').append(cancelBtn);

    $(acceptBtn).on('click', function() {
    	var cellPaid = $('td.notPaid');
    	$(cellPaid).removeClass("notPaid");
    	$(cellPaid).addClass("paid");
    	$(cellPaid).html("yes");
    });

    $(cancelBtn).on('click', function() {
    	var cellPaid = $('td.paid');
    	$(cellPaid).removeClass("paid");
    	$(cellPaid).addClass("notPaid");
    	$(cellPaid).html("no");
    });

});

// ==================================================================

function convertFormToJSON(form) {
	var array = jQuery(form).serializeArray();
	var json = {};

	jQuery.each(array, function() {
        json[this.name] = this.value || '';
    });

	return json;
};


/* Form validation function */
function isValidated(form) {
	var inputName = $(form).find('#name'),
		inputCity = $(form).find('#city'),
		inputEmail = $(form).find('#email'),
		inputPhone = $(form).find('#phone'),
		inputGender = $(form).find('[name="gender"]');
		//  isName(inputName) && isCity(inputCity) && isValidEmail(inputEmail) && isValidPhone && isGender(inputGender)
		console.log( 'isName(inputName): ', isName(inputName) );
		console.log( 'isCity(inputCity): ', isCity(inputCity) );
		console.log( 'isValidEmail(inputEmail): ', isValidEmail(inputEmail) );
		console.log( 'isValidPhone(inputPhone): ', isValidPhone(inputPhone) );
		console.log( 'isGender(inputGender): ', isGender(inputGender) );
		console.log( 'isValidPackadgeClasses(form): ', isValidPackadgeClasses(form) );
	if ( isName(inputName) && isCity(inputCity) && isValidEmail(inputEmail) && isValidPhone(inputPhone) && isGender(inputGender) && isValidPackadgeClasses(form) ) {
		console.log( 'form is valid' )
		return true;
	} else {
		return false;
	};
};

function isName(inputName) {
	if( $(inputName).val() == "" ) {
		// console.log( 'there is NO name entered' );
		$(inputName).parent().find('span').remove();
		var errorMsg = document.createElement("span");
	    $(errorMsg).addClass("error");
	    $(errorMsg).html("Please enter your name");
	    $(inputName).parent().append(errorMsg);
		return false;
	} else {
		$(inputName).parent().find('span').remove();
		// console.log( 'there is name' );
		return true
	};
};

function isCity(inputCity) {
	if( $(inputCity).val() == "" ) {
		// console.log( 'there is NO city entered' );
		$(inputCity).parent().find('span').remove();
		var errorMsg = document.createElement("span");
	    $(errorMsg).addClass("error");
	    $(errorMsg).html("Please enter your city");
	    $(inputCity).parent().append(errorMsg);
		return false;
	} else {
		$(inputCity).parent().find('span').remove();
		// console.log( 'there is city' );
		return true
	};
};

function isValidEmail(inputEmail) {
	var emailVal = $(inputEmail).val(),
		filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if ( emailVal == "" ) {
			// console.log('Please provide a valid email address');
			$(inputEmail).parent().find('span').remove();
		    var errorMsg = document.createElement("span");
		    $(errorMsg).addClass("error");
		    $(errorMsg).html("Please enter your email address");
		    $(inputEmail).parent().append(errorMsg);
		    return false;
		} else if ( !filter.test(emailVal) ) {
		    // console.log('Please provide a valid email address');
		    $(inputEmail).parent().find('span').remove();
		    var errorMsg = document.createElement("span");
		    $(errorMsg).addClass("error");
		    $(errorMsg).html("Email address is not valid");
		    $(inputEmail).parent().append(errorMsg);
		    return false;
		} else {
			$(inputEmail).parent().find('span').remove();
			// $(inputEmail).focusout();
			return true;
		};
};

function isValidPhone(inputPhone) {
	var phoneVal = $(inputPhone).val(),
		stripped = phoneVal.replace(/[\(\)\.\-\ ]/g, '');
		// console.log( "stripped: ", stripped );
		if ( phoneVal == "" ) {
			// console.log('Please enter your	 phone number');
			$(inputPhone).parent().find('span').remove();
		    var errorMsg = document.createElement("span");
		    $(errorMsg).addClass("error");
		    $(errorMsg).html("Please enter your phone number");
		    $(inputPhone).parent().append(errorMsg);
		    return false;
		} else if ( isNaN(stripped) ) {
		    // console.log('Please provide a valid phone number');
		    $(inputPhone).parent().find('span').remove();
		    $(inputGender).parent().find('span').remove();
		    var errorMsg = document.createElement("span");
		    $(errorMsg).addClass("error");
		    $(errorMsg).html("Phone number is not valid");
		    $(inputPhone).parent().append(errorMsg);
		    return false;
		} else {
			$(inputPhone).parent().find('span').remove();
			// $(inputPhone).focusout();
			return true;
		};
};

function isGender(inputGender) {
	if( $(inputGender).filter(':checked').val() == undefined ) {
		// console.log( 'there is NO gender entered' );
		$(inputGender).parent().find('span').remove();
		var errorMsg = document.createElement("span");
	    $(errorMsg).addClass("error");
	    $(errorMsg).html("Please select who you are");
	    $(inputGender).parent().append(errorMsg);
		return false;
	} else {
		$(inputGender).parent().find('span').remove();
		// console.log( 'there is gender' );
		return true
	};
};

function isValidPackadgeClasses(form) {
	var packageClassVal = $(form).find('#packageClass').val(),
		limit = packageClassVal.charAt(0),
		choosedLessons = $( 'input[type="checkbox"].lesson:checked' ).length,
		status = true;
	if ( limit == '4' ) {
		if ( choosedLessons < 4 ) {
			// console.log('Please choose ' + (4-choosedLessons) + ' more lessons');
			$('form#registrForm div.rightFormColumn p').find('span').remove();
			var errorMsg = document.createElement("span");
			$(errorMsg).addClass("error");
		    $(errorMsg).html('Please choose ' + (4-choosedLessons) + ' more lessons');
			$( 'form#registrForm div.rightFormColumn p' ).first().append(errorMsg);
			status = false;
		} else if ( choosedLessons > 4 ) {
			// console.log('Please choose ' + (choosedLessons-4) + ' less lessons');
			$('form#registrForm div.rightFormColumn p').find('span').remove();
			var errorMsg = document.createElement("span");
			$(errorMsg).addClass("error");
		    $(errorMsg).html('Please choose ' + (choosedLessons-4) + ' less lessons');
			$( 'form#registrForm div.rightFormColumn p' ).first().append(errorMsg);
			status = false;
		} else {
			$('form#registrForm div.rightFormColumn p').find('span').remove();
			status = true;
		};
	} else if ( limit == '8' ) {
		if ( choosedLessons < 8 ) {
			// console.log('Please choose ' + (8-choosedLessons) + ' more lessons');
			$('form#registrForm div.rightFormColumn p').find('span').remove();
			var errorMsg = document.createElement("span");
			$(errorMsg).addClass("error");
		    $(errorMsg).html('Please choose ' + (8-choosedLessons) + ' more lessons');
			$( 'form#registrForm div.rightFormColumn p' ).first().append(errorMsg);
			status = false;
		} else if ( choosedLessons > 8 ) {
			console.log('Please choose ' + (choosedLessons-8) + ' less lessons');
			$('form#registrForm div.rightFormColumn p').find('span').remove(); 	
			var errorMsg = document.createElement("span");
			$(errorMsg).addClass("error");
		    $(errorMsg).html('Please choose ' + (choosedLessons-8) + ' less lessons');
			$( 'form#registrForm div.rightFormColumn p' ).first().append(errorMsg);
			status = false;
		} else {
			$('form#registrForm div.rightFormColumn p').find('span').remove();
			status = true;
		};
	};

	return status;

};



/* Data object */
var people = [
	{
		name: "Ping Yu",
		gender: "Follower",
		city: "Shanghai",
		email: "pingyu8888@gmail.com",
		phone: "8613816693828",
		packageClass: "8 classes",
		packageMilonga: "All milongas",
		classes: ["classPlebs2 ", "classSR106 ", "classSR205 ", "classSR207 ", "classSR208 ", "classSR209 ", "classSR210 ", "classSR211 "],
		milongas: ["milongaVintage ", "milongaCarnaval ", "milongaLoca "],
		privatesSebaRoxana: "0",
		privatesSebaInes: "3",
		privatesMilena: "0",
		message: "",
		payment: "Alipay",
		price: "7400",
		paid: "yes"
	},
	{
		name: "Vladimir Vereschagin",
		gender: "Leader",
		city: "Moscow",
		email: "djvladimirmoscow@facebook.com",
		phone: "79036723313",
		packageClass: "4 classes",
		packageMilonga: "Weekend milongas",
		classes: ["classPlebs2 ", "classSR205 ", "classSR209 "],
		milongas: ["milongaCarnaval ", "milongaLoca "],
		privatesSebaRoxana: "0",
		privatesSebaInes: "0",
		privatesMilena: "0",
		message: "",
		payment: "Cash",
		price: "2000",
		paid: "no"
	},
	{
		name: "Anthony Miller",
		gender: "Leader",
		city: "Sydney",
		email: "anthonymillertango@facebook.com",
		phone: "61411142860",
		packageClass: "none",
		packageMilonga: "All milongas",
		classes: [],
		milongas: ["milongaVintage ", "milongaCarnaval ", "milongaLoca "],
		privatesSebaRoxana: "0",
		privatesSebaInes: "0",
		privatesMilena: "0",
		message: "What if I'll put nuevo on milonga?",
		payment: "Bank",
		price: "1200",
		paid: "yes"
	},
	{
		name: "Halyna Kurylo",
		gender: "Follower",
		city: "Lviv",
		email: "halyna.kurylo@facebook.com",
		phone: "0676713900",
		packageClass: "Single class",
		packageMilonga: "All milongas",
		classes: ["classSR106 ", "classSR207 ", "classSR211 "],
		milongas: ["milongaVintage ", "milongaCarnaval ", "milongaLoca "],
		privatesSebaRoxana: "0",
		privatesSebaInes: "1",
		privatesMilena: "1",
		message: "",
		payment: "Cash",
		price: "4780",
		paid: "yes"
	}
];

classesTitles = [
	'[SR 207] Milonga: change of speed',
	'[SR 208] Technical training for couples (how to connect better for each other)',
	'[SR 209] The secrets of embrace: focus on how to create a comfort embrace for tango',
	'[SR 210] The secrets of embrace: how to manange a comfort embrace in valz dancing',
	'[SR 211] The secrets of embrace: how to create a embrace especially for tango milonga',
	'Milena Plebs Special Woman Technique Workshop Part 2',
	'[SI 106] Waltz: sequences for the waltz accompaniment',
	'[SR 205] Unusual sacadas of Sebastian y Roxana'
];

classesShorts = [
	'classSR207 ',
	'classSR208 ',
	'classSR209 ',
	'classSR210 ',
	'classSR211 ',
	'classPlebs2 ',
	'classSR106 ',
	'classSR205 '
];

milongaTitles = [
	'Vintage milonga',
	'Carnival milonga',
	'Loca milonga'
];

milongaShorts = [
	'milongaVintage ',
	'milongaCarnaval ',
	'milongaLoca '
];