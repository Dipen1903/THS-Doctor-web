import $ from 'jquery';
// ;(function () {
// 	var isMobile = {
// 			Android: function() {
// 			return navigator.userAgent.match(/Android/i);
// 		},
// 			BlackBerry: function() {
// 			return navigator.userAgent.match(/BlackBerry/i);
// 		},
// 			iOS: function() {
// 			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
// 		},
// 			Opera: function() {
// 			return navigator.userAgent.match(/Opera Mini/i);
// 		},
// 			Windows: function() {
// 			return navigator.userAgent.match(/IEMobile/i);
// 		},
// 			any: function() {
// 			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
// 		}
// 	};

// 	var isiPad = function(){
// 		return (navigator.platform.indexOf("iPad") !== -1);
// 	};

// 	var isiPhone = function(){
//     return (
// 		(navigator.platform.indexOf("iPhone") !== -1) ||
// 		(navigator.platform.indexOf("iPod") !== -1)
//     );
// 	};
	

// 	var fullHeight = function() {
// 		if ( !$().isMobile ) {
// 			$('.js-fullheight').css('height', $(window).height());
// 			$(window).resize(function(){
// 				$('.js-fullheight').css('height', $(window).height());
// 			});
// 		}
// 	};

// 	$(function(){
// 		fullHeight();
// 	});

// }());

// window.addEventListener('load', function() {
//   var inp = document.querySelectorAll('input');
//   for (var i = 0; i < inp.length; i++) {
//     inp[i].addEventListener('change', function() {
//       this.setAttribute("data-value", this.value);
//     })
//   }
// });

$(".toggle-password").click(function() {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $(this).parent().find("input");

  if (input.attr("type") === "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

$(".toggle_password_1").click(function() {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $(this).parent().find("input");

  if (input.attr("type") === "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

$('#myForm input').on('change', function() {
	if($("#male").prop("checked", true))
	{
		$(".male_icon").addClass("checked_radio");
	}
	else if($("#female").prop("checked", true))
	{
		$(".female_icon").addClass("checked_radio");
	}
});

/*----------------------------------------------------------------------------------------------------------*/
