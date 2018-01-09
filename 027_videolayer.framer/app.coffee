#########################
#  027 - videoLayer     #
#########################

# layerA = new VideoLayer

layerA = new VideoLayer
	size: Screen.height
	x: Align.center
	scale: 1
	video: "./images/output.MOV"

# layerA.player.autoplay = true

layerA.player.autoplay = true

# layerA.player.fastSeek(2)

layerA.player.fastSeek(2)
