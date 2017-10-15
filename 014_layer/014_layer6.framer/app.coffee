# Point allows you to capture the x, and y values of a layer

bg = new BackgroundLayer

layerA = new Layer

layerA.point =
	x: 10
	y: 200

print layerA.point
print layerA.x

# Convert a point from a layer to the canvas

point1 =
	x: 20
	y: 40

layerB = new Layer
	size: 100

pointInCanvas = layerB.convertPointToCanvas(point1)

# Nope I'm none the wiser

point2 =
	x: 100
	y: 40

layerC = new Layer
	size: 100
	x: 200

pointInScreen = layerC.convertPointToCanvas(point2)

# Nop

pointInLayerB = layerC.convertPointToLayer(point1, layerC)

# Still nop



