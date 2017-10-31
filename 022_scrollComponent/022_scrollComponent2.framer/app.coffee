# Info Cards ScrollComponent

scroll2 = new ScrollComponent
	width: screen.width
	height: screen.height
	scrollHorizontal: false
	scrollVertical: true
	backgroundColor: "#5f3dc4"
	speedY: 0.5

layerAC = new Layer
	parent: scroll2.content
	width: 250
	height: screen.height + 500
	backgroundColor: "#fc106"

scroll2.contentInset =
	top: 175
	left: 35

layerBC = new Layer
	height: 250
	width: 250
	borderRadius: 5
	parent: layerAC
	backgroundColor: "#f3f0ff"

for i in [0..7]
	newInfo=layerBC.copy()
	newInfo.y=(layerBC.height+15)*(i+1)
	newInfo.parent=layerAC

# Stories ScrollComponent

scroll = new ScrollComponent
	width: screen.width
	scrollHorizontal: true
	scrollVertical: true
	directionLock: true
	speedX: 0.5

scroll.directionLockThreshold =
	x: 0
	y: 100

layerA = new Layer
	parent: scroll.content
	backgroundColor: "#5f3dc4"
	width: screen.width + 60
	height: 100
	y: Align.top(60)

layerB = new Layer
	height: layerA.height - 40
	width: layerA.height - 40
	borderRadius: 100
	y: Align.center
	backgroundColor: "#f3f0ff"
	parent: layerA

for i in [0..15]
	newCard=layerB.copy()
	newCard.x=(layerB.width+15)*(i+1)
	newCard.parent=layerA

# Faux navBar
navBar = new Layer
	height: 60
	width: screen.width
	backgroundColor: "b197fc"

# scroll.contentInset
# gives content extra padding between the constraints and the actual content layers

scroll.contentInset =
	left: 20

# scroll.directionLock = true
# only allow scrolling in one direction at a time

# scroll.speed

# scroll.direction - read only and scroll.isMoving
# use to print direction (note: inverse of direction of drag action)

scroll.on Events.Scroll, ->
	print scroll.direction
	print scroll.isMoving

# scroll.directionLockThreshold
# stipulates the x and y coordinates before directionLock is triggered

# scroll.velocity and scroll.angle and scroll.isDragging
scroll2.on Events.Scroll, ->
	print scroll2.velocity
	print scroll2.angle
	print scroll2.isDragging
