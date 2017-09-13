layerA = new Layer
	x: 150
	y: 150
	z: 100 # perspective must be enabled on parent layer, diff from z-index
	width: 100
	height: 100
	image: Utils.randomImage()

layerA.name = "square" # will inherit sketch name if importing
layerA.visible = true # true default

# print layerA.minX (same as layer.x)
# print layerA.midX (horizontal center)
# print layerA.maxX (right edge location)
# print layerA.minY (same as layer.y)
# print layerA.midY (vertical center)
# print layerA.maxY (bottom edge location of the layer)

layerB = new Layer
layerB.size = 
	width: 100
	height: 100

layerB.gradient =
	start: "#05F"
	end: "#0DF"
	angle: 0

layerC = new Layer
	width: 100
	height: 100
	x: Align.center()
	y: Align.bottom()
	borderRadius: 20
	borderWidth: 2
	borderColor: "#05F"
