bg = new BackgroundLayer
	backgroundColor: "#99e9f2"

layerA = new Layer
	backgroundColor: "#3bc9db"
	borderRadius: 20
	width: 50
	x: Align.left(50)

layerB = new Layer
	backgroundColor: "#15aabf"
	borderRadius: 20
	width: 50
	x: Align.center

layerC = new Layer
	backgroundColor: "#0c8599"
	borderRadius: 20
	width: 50
	x: Align.right(-50)


layerA.draggable.enabled = true
layerB.draggable.enabled = true
layerC.draggable.enabled = true

# Disable horizontal dragging
layerA.draggable.horizontal = false

# Disable vertical dragging
# layerA.draggable.vertical = false

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

########## layerC ########

layerC.on Events.DragMove, ->
	print layerC.draggable.angle

# setup for draggable
round = (number, nearest) ->
    Math.round(number / nearest) * nearest
 
# Drag in increments of 20px 
layerC.draggable.updatePosition = (point) ->
    point.x = round(point.x, 20)
    point.y = round(point.y, 20)
    return point

layerC.draggable.directionLock = true
layerC.draggable.directionLockThreshold =
    x: 10
    y: 20
    
layerC.draggable.pixelAlign = true

# Check if the layer is being dragged 
# Returns false when animating
layerC.on Events.DragMove, ->
    print layerA.draggable.isDragging

#isAnimating

# Check if the layer is animating
# via bounce or momentum 
# Can't get this to work
layerB.on Events.DragMove, ->
	print layerB.draggable.isAnimating

# Get the x and y position of the layer 
layerC.on Events.DragMove, ->
    print layerC.draggable.offset

# On DragStart, get the current x and y position  
layerC.on Events.DragStart, ->
    print layerC.draggable.layerStartPoint

# On DragStart, get x and y position of the cursor 
layerC.on Events.DragStart, ->
    print layerC.draggable.cursorStartPoint

# Get the cursor position within the layer 
layerC.on Events.DragStart, ->
    print layerC.draggable.layerCursorOffset

# propagateEvents

# Setting propagateEvents to false allows you to drag layerA 
# without also scrolling within the ScrollComponent 
layerA.draggable.propagateEvents = false



