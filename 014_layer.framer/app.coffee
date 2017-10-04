# print layerA.id (unique identifier, read only)

layerA = new Layer
	x: 50
	y: 47
	z: 0
	backgroundColor: "#d9480f"
	width: 100
	height: 100

animationA = new Animation layerA,
	z: 100

animationB = animationA.reverse()

animationA.start()
animationA.on Events.AnimationEnd, animationB.start
animationB.on Events.AnimationEnd, animationA.start


# print layerA.midX (horizontal center)
# print layerA.maxX (right edge location)
# print layerA.midY (vertical center)
# print layerA.maxY (bottom edge location of the layer)

layerB = new Layer
	minX: 150 # (same as layer.x)
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

