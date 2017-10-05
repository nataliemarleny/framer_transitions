bg = new BackgroundLayer

Framer.Defaults.Layer.size = 150
# Framer.Defaults.Layer.x = Align.center (doesn't work)
Framer.Defaults.Layer.borderRadius = 10

# Scale Events
# .onScale
# .onScaleStart
# .onScaleEnd

layerA = new Layer
	y: Align.top(10)
	x: Align.center
	backgroundColor: "#087f5b"

layerA.onScale ->
	layerA.animate
		borderRadius: 100

layerA.onScaleEnd ->
	layerA.animate
		backgroundColor: "#96f2d7"

# Rotate Events
# .onRotate
# .onRotateStart
# .onRotateEnd

layerB = new Layer
	y: Align.top(170)
	x: Align.center
	backgroundColor: "#099268"

layerB.onRotate ->
	layerB.animate
		borderRadius: 100
		backgroundColor: "#96f2d7"

layerB.onRotateEnd ->
	layerB.animate
		backgroundColor: "#63e6be"


# Touch Events
# .onTouchStart
# .onTouchMove
# .onTouchEnd

layerC = new Layer
	y: Align.center(72)
	x: Align.center
	backgroundColor: "#0ca678"

layerC.onTouchMove ->
	layerC.animate
		borderRadius: 100

layerC.onTouchEnd ->
	layerC.animate
		backgroundColor: "#38d9a9"

# Click
# .onClick

layerD = new Layer
	y: Align.bottom(-25)
	x: Align.center
	backgroundColor: "#12b886"

layerD.onClick ->
	layerD.animate
		backgroundColor: "#20c997"
		borderRadius: 100

# Mouse
# .MouseUp / .MouseDown
# .MouseOver / .MouseOut (unhover with mouse cursor)
# .MouseMove / .Mouse Wheel

bg.onMouseWheel ->
	layerA.animate
		borderRadius: 10
		backgroundColor: "#087f5b"
	layerB.animate
		borderRadius: 10
		backgroundColor: "#099268"
	layerC.animate
		borderRadius: 10
		backgroundColor: "#0ca678"
	layerD.animate
		borderRadius: 10
		backgroundColor: "#12b886"