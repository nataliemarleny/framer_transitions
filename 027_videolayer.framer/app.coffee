# iPhone X vanity code!

Framer.Device.customize
    deviceType: Framer.Device.Type.Phone
    screenWidth: 375
    screenHeight: 812
    deviceImage: "https://images.apple.com/v/iphone-x/a/images/overview/primary/hero_premiere_hardware_small_2x.png"
    deviceImageWidth: 436
    deviceImageHeight: 866
    devicePixelRatio: 1

if not Framer.Device._hideBezel
	Framer.Device.screen.z = -1



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
