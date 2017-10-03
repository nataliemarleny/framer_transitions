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

# -------------------------------------------
bg = new BackgroundLayer 
	backgroundColor: "#72c3fc"

animationA = new Animation bg,
	backgroundColor: "#1b6ec2"

animationA.start()

Framer.Device.rotateLeft()
Framer.Device.rotateRight()

# Framer.Device.fullScreen
# Framer.Device.deviceScale
# Framer.Device.setDeviceScale()
# Framer.Device.contentScale
# Framer.Device.setContentScale()
# Framer.Device.orientation
# Framer.Device.setOrientation()
# Framer.Device.orientationName = "landscape"
# Framer.Device.rotateLeft()
# Framer.Device.rotateRight()