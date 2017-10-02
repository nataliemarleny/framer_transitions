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
	backgroundColor: "#2b8a3e"

layerA.onTap ->
	layerA.animate
		x: Align.center

layerA.onDoubleTap ->
	layerA.animate
		scale: 1.5

# Force Tap Events
# .onForceTap 
# .onForceTapChange
# .onForceTapStart
# .onForceTapEnd 

layerB = new Layer
	x: Align.left(10)
	y: Align.top(80)
	size: 50
	borderRadius: 5
	backgroundColor: "#2f9e44"

layerB.onForceTap ->
	layerB.animate
		backgroundColor: "#8ce99a"

layerB.onForceTapEnd ->
	layerB.animate
		backgroundColor: "#2f9e44"

# LongPress Events
# .onLongPress
# .onLongPressStart
# .onLongPressEnd

layerC = new Layer
	x: Align.left(10)
	y: Align.top(135)
	size: 50
	borderRadius: 5
	backgroundColor: "#37b24d"

layerC.onLongPress ->
	layerC.animate
		backgroundColor: "#d3f9d8"

layerC.onLongPressEnd ->
	layerC.animate
		backgroundColor: "#37b24d"

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

layerD = new Layer
	x: Align.left(10)
	y: Align.center(-117)
	size: 50
	borderRadius: 5
	backgroundColor: "#40c057"

layerD.onSwipeRight ->
	layerD.animate
		x: Align.right(250)

layerD.onSwipeRightEnd ->
	layerD.animate
		x: Align.left(10)

layerD.onSwipeLeft ->
	layerD.animate
		x: Align.left(-100)

layerD.onSwipeLeftEnd ->
	layerD.animate
		x: Align.left(10)

layerD.onSwipeUp ->
	layerD.animate
		y: Align.top(50) 
		options:
			time: 1
			curve: Bezier.linear

layerD.onSwipeUpEnd ->
	layerD.animate
		x: Align.left(10)
		y: Align.top(50)

layerD.onSwipeDown ->
	layerD.animate
		y: Align.bottom(200)
		options:
			time: 1
			curve: Bezier.linear

layerD.onSwipeDownEnd ->
	layerD.animate
		x: Align.left(10)
		y: Align.center(-117)
		size: 50

# Pan
# .onPan
# .onPanStart
# .onPanMove
# .onPanEnd
# .onPanLeft
# .onPanRight
# .onPanUp
# .onPanDown

layerE = new Layer
	x: Align.left(10)
	y: Align.center(-60)
	size: 50
	borderRadius: 5
	backgroundColor: "#51cf66"

layerF = new Layer
	x: Align.left(10)
	y: Align.center(-3)
	size: 50
	borderRadius: 5
	backgroundColor: "#69db7c"

layerG = new Layer
	x: Align.left(10)
	y: Align.center(54)
	size: 50
	borderRadius: 5
	backgroundColor: "#8ce99a"

layerH = new Layer
	x: Align.left(10)
	y: Align.bottom(-198)
	size: 50
	borderRadius: 5
	backgroundColor: "#b2f2bb"

layerI = new Layer
	x: Align.left(10)
	y: Align.bottom(-140)
	size: 50
	borderRadius: 5
	backgroundColor: "#d3f9d8"

layerJ = new Layer
	x: Align.left(10)
	y: Align.bottom(-84)
	size: 50
	borderRadius: 5
	backgroundColor: "#ebfbee"