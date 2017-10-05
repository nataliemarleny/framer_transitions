bg = new BackgroundLayer

Framer.Defaults.Layer.size = 150
# Framer.Defaults.Layer.x = Align.center (doesn't work)
Framer.Defaults.Layer.borderRadius = 10

# Tap Events
# .onTap
# .onSingleTap
# .onDoubleTap

layerA = new Layer
	y: Align.top(10)
	x: Align.center
	backgroundColor: "#087f5b"

layerA.onTap ->
	layerA.animate
		borderRadius: 100

layerA.onDoubleTap ->
	layerA.animate
		backgroundColor: "#96f2d7"

# LongPress Events
# .onLongPress
# .onLongPressStart
# .onLongPressEnd

layerB = new Layer
	y: Align.top(170)
	x: Align.center
	backgroundColor: "#099268"

layerB.onLongPress ->
	layerB.animate
		borderRadius: 100
		backgroundColor: "#96f2d7"

layerB.onLongPressEnd ->
	layerB.animate
		backgroundColor: "#63e6be"


# Swipe Events
# .onSwipe
# .onSwipeStart
# .onSwipeEnd
# .onSwipeUp
# .onSwipeUpStart
# .onSwipeUpEnd
# .onSwipeDown
# .onSwipeDownStart
# .onSwipeDownEnd
# .onSwipeLeft
# .onSwipeLeftStart
# .onSwipeLeftEnd
# .onSwipeRight
# .onSwipeRightStart
# .onSwipeRightEnd

layerC = new Layer
	y: Align.center(72)
	x: Align.center
	backgroundColor: "#0ca678"

layerC.onSwipeUp ->
	layerC.animate
		borderRadius: 100

layerC.onSwipeDown ->
	layerC.animate
		backgroundColor: "#38d9a9"

# Pinch
# .onPinch
# .onPinchStart
# .onPinchEnd

layerD = new Layer
	y: Align.bottom(-25)
	x: Align.center
	backgroundColor: "#12b886"

layerD.pinchable.enabled = true
layerD.pinchable.rotate = false
layerD.pinchable.maxScale = 1.5
layerD.pinchable.centerOrigin = false

layerD.onPinchStart ->
	layerD.animate
		backgroundColor: "#20c997"
		borderRadius: 100

layerD.onPinchEnd ->
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
