$(document).keydown(function(e) {
	if (e.keyCode == 27) {
		if ($('.videoContainer').length) {
			$('.videoContainer').fadeOut(500, function() { $(this).remove(); });
		}
	}
});


$(document)
		.ready(
				function() {
					
					$(".trackdownload").on("click", function(e) {
						if (typeof gtag === "function") { 
						  var file=$(this).attr('href');
					      gtag('event', 'download', { event_category: 'download', event_label: file});
						}
					});
					
					$(".navbar").on("show.bs.collapse", function(e) {
						  console.log("open")
							$(".navbar").css("background", "black");
						  $(".navbar-collapse").css("background", "black");
						});

						$(".navbar").on("hide.bs.collapse", function(e) {
						  console.log("close")
							$(".navbar").css("background", "transparent");
						    $(".navbar-collapse").css("background", "transparent");
						});
					// track embeded video play
					$(".embeded-video").on('play',function(){
						var file =  $(this).children("source").attr("src");
						if (typeof gtag === "function") { 
							gtag('event', 'videoView', { event_category: 'videoView', event_label: file});
						}
					});
					$(".showVideo")
							.on(
									"click",
									function(e) {
										e.preventDefault();
										var file = $(this).data("video");
										if (typeof gtag === "function") { 
											gtag('event', 'videoView', { event_category: 'videoView', event_label: file});
										}
									    
										var htmlTemplate = '<div class="videoContainer"><div class="videoPlayer"><div style="display: block; padding-top:56%; width: 100%;">'
												+ '</div><button class="closeBtn">X</button><video class="video-iframe" width="100%" height="100%" autobuffer controls autoplay>'
												+ '<source id="mp4" src="'
												+ file
												+ '" type="video/mp4">'
												+ '</video></div><div/>';
										$player = $(htmlTemplate);
										$player.find('.closeBtn').on(
												'click',
												function() {
													$(this).off().closest(
															'.videoContainer')
															.fadeOut(500, function() { $(this).remove(); });
												});
										$player.appendTo('body').addClass(
												'dark-bg').fadeIn();
										return false;

									});

					
				});

	
