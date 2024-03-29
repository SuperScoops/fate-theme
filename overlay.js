$("#videowrap").append("<div id='VideoOverlay' class='fadein'><button class='btn btn-sm btn-default OLB' id='fs-vid-button'>Fullscreen</button></div>");
/*$('#videowrap').hover(function(){
    $('#VideoOverlay').css({
        'opacity':'1',
        'display':'block',
    });
},function(){
    $('#VideoOverlay').css({
        'opacity':'0',
        'display':'none',
    });
});
*/
$("#VideoOverlay").hide();
var i = null;
$("#videowrap").mousemove(function() {
    clearTimeout(i);
    $("#VideoOverlay").show();
    i = setTimeout('$("#VideoOverlay").hide();', 5000);
}).mouseleave(function() {
    clearTimeout(i);
    $("#VideoOverlay").hide();  
});

$("#VideoOverlay").append($("#voteskip"));
$("#VideoOverlay").append($("#mediarefresh"));
$("#VideoOverlay").append("<button id='hidechat' title='Hide Chat' class='btn btn-sm btn-default OLB'>Theater Mode</button>");
$("#VideoOverlay").append("<button id='showchat' title='show Chat' class='btn btn-sm btn-default OLB'>Regular Mode</button>");
$("#VideoOverlay").append("<button id='pipButton' title='Picture In Picture' class='btn btn-sm btn-default OLB'>PIP</button>");

$(document).ready(function(){
	$('#hidechat').on('click', function(){nochat();});
	$('#showchat').on('click', function(){maxchat();});
});

function nochat(){
	$('#chatwrap').addClass('hidden');
	$('#pollwrap').addClass('hidden');
	$('#maincontain').addClass('fullvideo');
	$('#hidechat,#scroll-feature,#motdrow,#videoinfo,#queuecontainer,#footer,.navbar,#bg-wrapper,#rightpane').addClass('hidden');
	$('#showchat').addClass('showchat');
	    $('#mainpage').css({
        'padding-top':'0px',
    });
	    $('#videowrap').css({
        'position':'fixed',
        'height':'100%!important',
    });
	    $('.embed-responsive').css({
        'position':'static',
    });
}

function maxchat(){
	$('#chatwrap').removeClass('hidden');
	$('#pollwrap').removeClass('hidden');
	$('#maincontain').removeClass('fullvideo');
        $('#hidechat,#scroll-feature,#motdrow,#videoinfo,#queuecontainer,#footer,.navbar,#bg-wrapper,#rightpane').removeClass('hidden');
	$('#showchat').removeClass('showchat');
	    $('#mainpage').css({
        'padding-top':'50px',
    });
	    $('#videowrap').css({
        'position':'inherit',
        'height':'inherit',
    });
	    $('.embed-responsive').css({
        'position':'relative',
    });
}
var requestFullscreen = function (ele) {
	if (ele.requestFullscreen) {
		ele.requestFullscreen();
	} else if (ele.webkitRequestFullscreen) {
		ele.webkitRequestFullscreen();
	} else if (ele.mozRequestFullScreen) {
		ele.mozRequestFullScreen();
	} else if (ele.msRequestFullscreen) {
		ele.msRequestFullscreen();
	} else {
		console.log('Fullscreen API is not supported.');
	}
};
var exitFullscreen = function () {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	} else {
		console.log('Fullscreen API is not supported.');
	}
};
var fsVidButton = document.getElementById('fs-vid-button');
var video = document.getElementById('videowrap');

fsVidButton.addEventListener('click', function(e) {
	e.preventDefault();
	requestFullscreen(videowrap);
});
  // Hide button if Picture-in-Picture is not supported or disabled.
  pipButton.hidden = !document.pictureInPictureEnabled || ytapiplayer_html5_api.disablePictureInPicture;

  pipButton.addEventListener('click', function() {
    // If there is no element in Picture-in-Picture yet, let's request
    // Picture-in-Picture for the video, otherwise leave it.
    if (!document.pictureInPictureElement) {
      ytapiplayer_html5_api.requestPictureInPicture()
      .then(pipWindow => {
        updateVideoSize(pipWindow.width, pipWindow.height);
        pipWindow.addEventListener('resize', function(event) {
          updateVideoSize(pipWindow.width, pipWindow.height);
        });
      })
      .catch(error => {
        console.log(error)
        // Video failed to enter Picture-in-Picture mode.
      });
    } else {
      document.exitPictureInPicture()
      .catch(error => {
        console.error(error)
        // Video failed to leave Picture-in-Picture mode.
      });
    }
  });

  function updateVideoSize(width, height) {
    // TODO: Update video size based on pip window width and height.
  }

  ytapiplayer_html5_api.addEventListener('enterpictureinpicture', function() {
    // Video element entered Picture-In-Picture mode.
  });

  ytapiplayer_html5_api.addEventListener('leavepictureinpicture', function() {
    // Video element left Picture-In-Picture mode.
  });

  if(!CLIENT.googlehax){
    CLIENT.googlehax = true;
    socket.on('changeMedia', (data)=>{ 
        if (data["type"] === 'gd'){
            $('#videowrap').addClass('googlehax');
        }
        else
        {
            $('#videowrap').removeClass('googlehax');
        }
    })
    $('head').append(
        $('<style>')
            .attr('id','googlehax-style')
            .text('.googlehax embed { left: -5em; }')
    )
    $('#mediarefresh').click()
}

setInterval(function(){ document.title = $("#currenttitle").text();}, 5000);


var buttonTimeout = window.setTimeout(function () {
var qualButton=$("<button id='qualityDropDown' class='btn btn-sm btn-default OLB dropdown-toggle' title='Quality' data-toggle='dropdown'>Quality</button>")

$("#VideoOverlay").append(qualButton);
$("#qualityDropDown").after("<ul class='dropdown-menu'><li><button id='qualAuto'>Auto</button><li><button id='qual240'>240p</button></li><li><button id='qual360'>360p</button></li><li><button id='qual480'>480p</button></li><li><button id='qual720'>720p</button></li><li><button id='qual1080'>1080p</button></li><li><button id='qualmax'>Max</button></li></ul>");
$('#qualAuto').click(function(){USEROPTS.default_quality = "auto", PLAYER.mediaType = "",PLAYER.mediaId = "",socket.emit("playerReady"),document.getElementById("qualityDropDown").childNodes[0].nodeValue="Auto";});
$('#qual240').click(function(){USEROPTS.default_quality = "240", PLAYER.mediaType = "",PLAYER.mediaId = "",socket.emit("playerReady"),document.getElementById("qualityDropDown").childNodes[0].nodeValue="240p";});
$('#qual360').click(function(){USEROPTS.default_quality = "360", PLAYER.mediaType = "",PLAYER.mediaId = "",socket.emit("playerReady"),document.getElementById("qualityDropDown").childNodes[0].nodeValue="360p";});
$('#qual480').click(function(){USEROPTS.default_quality = "480", PLAYER.mediaType = "",PLAYER.mediaId = "",socket.emit("playerReady"),document.getElementById("qualityDropDown").childNodes[0].nodeValue="480p";});
$('#qual720').click(function(){USEROPTS.default_quality = "720", PLAYER.mediaType = "",PLAYER.mediaId = "",socket.emit("playerReady"),document.getElementById("qualityDropDown").childNodes[0].nodeValue="720p";});
$('#qual1080').click(function(){USEROPTS.default_quality = "1080", PLAYER.mediaType = "",PLAYER.mediaId = "",socket.emit("playerReady"),document.getElementById("qualityDropDown").childNodes[0].nodeValue="1080p";});
$('#qualmax').click(function(){USEROPTS.default_quality = "best", PLAYER.mediaType = "",PLAYER.mediaId = "",socket.emit("playerReady"),document.getElementById("qualityDropDown").childNodes[0].nodeValue="Max";});
$('div.vjs-volume-menu-button').css("margin-left", "125px");
  window.clearTimeout(buttonTimeout);
}, 5000);