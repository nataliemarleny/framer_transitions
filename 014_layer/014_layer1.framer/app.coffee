bg = new BackgroundLayer
	backgroundColor: "#ffe8cc"

# print layerA.id (unique identifier, read only)

layerA = new Layer
	x: 50
	y: 47
	z: 0
	backgroundColor: "#d9480f"
	width: 100
	height: 100
	hueRotate: 0

animationA = new Animation layerA,
	z: 100
	hueRotate: 360

animationB = animationA.reverse()

animationA.start()
animationA.on Events.AnimationEnd, animationB.start
animationB.on Events.AnimationEnd, animationA.start

# print layerA.midX (horizontal center)
# print layerA.maxX (right edge location)
# print layerA.midY (vertical center)
# print layerA.maxY (bottom edge location of the layer)

layerB = new Layer
	minX: 160 # (same as layer.x)
	minY: 47 # (same as layer.y)
	gradient:
		start: "#e8590c"
		end: "#ffa94d"
layerB.size =
	width: 100
	height: 100

layerB.name = "square1" # will inherit sketch name if importing
layerB.visible = true # true default

layerC = new Layer
	width: 100
	height: 100
	midX: 100 
	midY: 200
	image: "bg-orange.png"
	borderRadius: 5
	borderColor: "#d9480f"
	borderWidth: 2
	brightness: 0

animationX = new Animation layerC,
	brightness: 100

animationY = animationX.reverse()

animationX.start()
animationX.on Events.AnimationEnd, animationY.start
animationY.on Events.AnimationEnd, animationX.start

layerD = new Layer
	size: 100
	maxX: 260
	maxY: 250
	contrast: 0 # default is 100
	borderRadius: 5
	backgroundColor: "#f76707"

animationC = new Animation layerD,
	contrast: 100

animationD = animationC.reverse()

animationC.start()
animationC.on Events.AnimationEnd, animationD.start
animationD.on Events.AnimationEnd, animationC.start

layerE = new Layer
	size: 100
	saturate: 0
	backgroundColor: "#ffc078"
	borderRadius: 5

animationK = new Animation layerE,
	saturate: 100

animationL = animationK.reverse()

animationK.start()
animationK.on Events.AnimationEnd, animationL.start
animationL.on Events.AnimationEnd, animationK.start


layerE.point =
	x: 50
	y: 260

layerF = new Layer

layerF.frame =
    x: 170
    y: 270
    width: 75
    height: 75

layerF.props =
    rotation: 45
    opacity: 0.5
    borderRadius: 5
    backgroundColor: "#fd7e14"
    invert: 100

animationE = new Animation layerF,
	invert: 0

animationF = animationE.reverse()

animationE.start()
animationE.on Events.AnimationEnd, animationF.start
animationF.on Events.AnimationEnd, animationE.start

layerG = new Layer
	size: 150
	scaleX: 0.5
	scaleY: 0.5
	borderRadius: 5
	x: 25 # note had to move x and y to compensate
	y: 350
	rotationZ: 45 # same as layer rotation
	backgroundColor: "#f76707"
	grayscale: 100

layerG.visible = true

animationG = new Animation layerG,
	grayscale: 0

animationH = animationG.reverse()

animationG.start()
animationG.on Events.AnimationEnd, animationH.start
animationH.on Events.AnimationEnd, animationG.start

layerH = new Layer
	size: 10
	scale: 10 #note had to move x and y to compensate
	x: 205
	y: 420
	backgroundColor: "#ff922b"
	sepia: 100
	borderRadius: 1 # note: sepia does not like borderRadius

animationI = new Animation layerH,
	sepia: 0

animationJ = animationI.reverse()

animationI.start()
animationI.on Events.AnimationEnd, animationJ.start
animationJ.on Events.AnimationEnd, animationI.start