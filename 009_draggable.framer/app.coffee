layerA = new Layer
	backgroundColor: "#7D6B91"
	borderRadius: 20
	width: 50
	x: Align.left(50)

layerB = new Layer
	backgroundColor: "#5D536B"
	borderRadius: 20
	width: 50
	x: Align.center

layerC = new Layer
	backgroundColor: "#272838"
	borderRadius: 20
	width: 50
	x: Align.right(-50)


layerA.draggable.enabled = true
layerB.draggable.enabled = true
layerC.draggable.enabled = true

# Disable horizontal dragging
layerA.draggable.horizontal = false

# Disable vertical dragging
# layerA.draggable.horizontal = false

# Affect horizontal dragging speed
# layerA.draggable.speedX = 0.5

# Affect vertical dragging speed
layerA.draggable.speedY = 1.1 # if speedY < 1, slower than mouse movement)

# Set constraints
layerA.draggable.constraints = 
	y: 100
	height: 50

# Get the offset position of a layer compared to its dragging constraints
print layerA.draggable.constraintsOffset

# See if draggable layer is currently beyond its dragging constraints
# This is read only
print layerA.draggable.isBeyondConstraints

# Disable dragging beyond constraints
layerA.draggable.overdrag = true

# Slow down dragging beyond constrains
layerA.draggable.overdragScale = 0.25

layerA.draggable.bounce = true # default true
# Define friction, tension and tolerance of bounce
layerA.draggable.bounceOptions = 
	friction: 40,
	tension: 200,
	tolerance: 0.0001


########## layerB ########
# Disable momentum
layerB.draggable.momentum = true # default true
layerB.draggable.momentumOptions = 
	friction: 2.1
	tolerance: 0.1

# On DragMove, print the x and y velocity
layerB.draggable.on Events.DragMove, ->
	print layerB.draggable.velocity
	print layerB.draggable.angle

# On DragMove, print the direction (read only)
layerA.draggable.on Events.DragMove, ->
	print layerA.draggable.direction

# angle
# updatePosition()
# directionLock
# directionLockThreshold
# pixelAlign
# isDragging
# isMoving
# offset
# layerStartPoint
# cursorStartPoint
# layerCursorOffset
# propagateEvents









