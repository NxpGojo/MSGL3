$("#messageState").on("change", (x) => {
	$(".message").removeClass("openNor").removeClass("closeNor");
	if ($("#messageState").is(":checked")) {
		$(".message").removeClass("closed").removeClass("no-anim").addClass("openNor");
		$(".heart").removeClass("closeHer").removeClass("openedHer").addClass("openHer");
		$(".container").stop().animate({"backgroundColor": "#f48fb1"}, 2000);
		console.log("Abrindo");
	} else {
		$(".message").removeClass("no-anim").addClass("closeNor");
		$(".heart").removeClass("openHer").removeClass("openedHer").addClass("closeHer");
		$(".container").stop().animate({"backgroundColor": "#fce4ec"}, 2000);
		console.log("fechando");
	}
});

$(".message").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	console.log("Animation End");
	if ($(".message").hasClass("closeNor"))
		$(".message").addClass("closed");
	$(".message").removeClass("openNor").removeClass("closeNor").addClass("no-anim");
});

$(".heart").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	console.log("Animation End");
	if (!$(".heart").hasClass("closeHer"))
		$(".heart").addClass("openedHer").addClass("beating");
	else
		$(".heart").addClass("no-anim").removeClass("beating");
	$(".heart").removeClass("openHer").removeClass("closeHer");
});

// Some browsers block autoplay with sound, so this helps ensure it plays on user interaction
document.addEventListener('DOMContentLoaded', function () {
	const audio = document.getElementById('myAudio');
	
	// Try to play immediately
	const playPromise = audio.play();

	if (playPromise !== undefined) {
	  playPromise
		.then(() => {
		  // Autoplay started
		  console.log("Music is playing.");
		})
		.catch(error => {
		  // Autoplay was prevented.
		  console.log("Autoplay was blocked. Waiting for user interaction...");

		  const unlockAudio = () => {
			audio.play();
			document.removeEventListener('click', unlockAudio);
		  };

		  document.addEventListener('click', unlockAudio);
		});
	}
  });