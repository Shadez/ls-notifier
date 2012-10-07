<?php
$tracks = array(1 => 'Jahzzar_-_06_-_Circles.mp3', 2 => 'Jahzzar_-_08_-_Pause.mp3');
$titles = array(1 => 'Jahzzar - Circles', 2 => 'Jahzzar - Pause');
$pId = !empty($_GET['player']) ? intval($_GET['player']) : 1;
$track = !empty($tracks[$pId]) ? $tracks[$pId] : $tracks[1];
$title = !empty($titles[$pId]) ? $titles[$pId] : $titles[1];
?>
<!doctype html>
<html>
<head>
<title>Playing <?php echo $title; ?></title>
<script type="text/javascript" src="//code.jquery.com/jquery-latest.min.js"></script>
<script src="js/mediaelements/build/mediaelement-and-player.min.js"></script>
<link rel="stylesheet" href="js/mediaelements/build/mediaelementplayer.min.css" />
<script type="text/javascript" src="js/notifier.js"></script>
<script type="text/javascript">
var player = {};
$(function() {
	var notifier = {};
	notifier = new Notifier();
	player = new MediaElementPlayer('#player', {
		success: function(media, node, player) {
			events = ['play', 'pause'];
			for (var i = 0, il = events.length; i < il; i++) {
				var eventName = events[i];
				media.addEventListener(events[i], function(e) {
					var fav = $('link[rel="shortcut icon"]');

					if (!fav.length)
						fav = $('<link/>', {'rel': 'shortcut icon', 'type': 'image/ico', 'href': 'img/icons/play.ico'}).prependTo('head');

					if (e.type == 'play')
						fav.attr('href', 'img/icons/play.ico');
					else
						fav.attr('href', 'img/icons/pause.ico');

					notifier.notify('audiostate', {'state': e.type});
				});
			}
		}
	});
});
</script>
</head>
<body>
<h1>MediaElementPlayer.js</h1>
<h2><?php echo $title; ?></h2>
<audio id="player" src="audio/<?php echo $track; ?>" type="audio/mp3" controls="controls"></audio>
</body>
</html>