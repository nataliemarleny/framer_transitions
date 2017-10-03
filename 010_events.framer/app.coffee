# Events can originate from the user

# Tap Events
# .onTap
# .onSingleTap
# .onDoubleTap

layerA = new Layer
	x: Align.left(10)
	y: Align.top(25)
	size: 50
	borderRadius: 5
	backgroundColor: "#087f5b"

layerA.onTap ->
	layerA.animate
		x: Align.center

layerA.onDoubleTap ->
	layerA.animate
	



# LongPress Events
# .onLongPress
# .onLongPressStart
# .onLongPressEnd

layerB = new Layer
	x: Align.left(10)
	y: Align.top(80)
	size: 50
	borderRadius: 5
	backgroundColor: "#099268"

layerB.onLongPress ->
	layerB.animate
		backgroundColor: "#96f2d7"

layerB.onLongPressEnd ->
	layerB.animate
		backgroundColor: "#099268"

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
	x: Align.left(10)
	y: Align.top(135)
	size: 50
	borderRadius: 5
	backgroundColor: "#0ca678"

layerC.onSwipeRight ->
	layerC.animate
		x: Align.right(250)

layerC.onSwipeRightEnd ->
	layerC.animate
		x: Align.left(10)

layerC.onSwipeLeft ->
	layerC.animate
		x: Align.left(-100)

layerC.onSwipeLeftEnd ->
	layerC.animate
		x: Align.left(10)

layerC.onSwipeUp ->
	layerC.animate
		y: Align.top(0) 
		options:
			time: 1
			curve: Bezier.linear

layerC.onSwipeUpEnd ->
	layerC.animate
		x: Align.left(10)
		y: Align.top(135)

layerC.onSwipeDown ->
	layerC.animate
		y: Align.bottom(200)
		options:
			time: 1
			curve: Bezier.linear

layerC.onSwipeDownEnd ->
	layerC.animate
		x: Align.left(10)
		y: Align.top(135)
		size: 50

# Pinch
# .onPinch
# .onPinchStart
# .onPinchEnd

layerD = new Layer
	x: Align.left(10)
	y: Align.center(-117)
	size: 50
	borderRadius: 5
	backgroundColor: "#12b886"




layerE = new Layer
	x: Align.left(10)
	y: Align.center(-60)
	size: 50
	borderRadius: 5
	backgroundColor: "#20c997"

layerF = new Layer
	x: Align.left(10)
	y: Align.center(-3)
	size: 50
	borderRadius: 5
	backgroundColor: "#38d9a9"

layerG = new Layer
	x: Align.left(10)
	y: Align.center(54)
	size: 50
	borderRadius: 5
	backgroundColor: "#63e6be"

layerH = new Layer
	x: Align.left(10)
	y: Align.bottom(-198)
	size: 50
	borderRadius: 5
	backgroundColor: "#96f2d7"

layerI = new Layer
	x: Align.left(10)
	y: Align.bottom(-140)
	size: 50
	borderRadius: 5
	backgroundColor: "#c3fae8"

layerJ = new Layer
	x: Align.left(10)
	y: Align.bottom(-84)
	size: 50
	borderRadius: 5
	backgroundColor: "#e6fcf5"


# Force Tap Events
# .onForceTap 
# .onForceTapChange
# .onForceTapStart
# .onForceTapEnd 

layerJ = new Layer
	x: Align.left(10)
	y: Align.bottom(-84)
	size: 50
	borderRadius: 5
	backgroundColor: "#e6fcf5"

layerJ.onForceTap ->
	layerJ.animate
		backgroundColor: "#96f2d7"

layerJ.onForceTapEnd ->
	layerJ.animate
		backgroundColor: "#099268"

# Pan
# .onPan
# .onPanStart
# .onPanMove
# .onPanEnd
# .onPanLeft
# .onPanRight
# .onPanUp
# .onPanDown



