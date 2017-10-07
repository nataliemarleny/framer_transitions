# Create Layers and Background

bg = new BackgroundLayer
	backgroundColor: "#c3fae8"

layerA = new Layer
    x: Align.center
    y: Align.top(100)
    borderRadius: 20
    height: 150
    width: 150
    backgroundColor: "#38d9a9"

layerB = new Layer
	x: Align.center
	y: Align.bottom(-100)
	borderRadius: 20
	height: 150
	width: 150
	backgroundColor: "#099268"



# layerA.pinchable.enabled = true
# pinchable.enabled is a boolean required to make the pinching happen
# it doesn't do anything by itself :()

layerA.pinchable.enabled = true
layerB.pinchable.enabled = true



# layerA.pinchable.centerOrigin = false (default t)
# centerOrigin is true by default

layerA.pinchable.centerOrigin = false
layerB.pinchable.centerOrigin = false

# layerA.pinchable.minScale = 0.9
layerA.pinchable.minScale = 0.9
layerB.pinchable.minScale = 0.9

# layerA.pinchable.maxScale = 2
layerA.pinchable.maxScale = 2
layerB.pinchable.maxScale = 2



# layerA.pinchable.threshold = 6
# the minimal distance between two points before recognised

layerA.pinchable.threshold = 6

# layerA.pinchable.rotate = false (default t)
layerA.pinchable.rotate = false

# layerA.pinchable.scaleFactor = 1.2 (default 1)
# scaleFactor set to 1 by default
layerA.pinchable.scaleFactor = 1.2



# layerB.pinchable.rotateIncrements = 15
layerB.pinchable.rotateIncrements = 15

# layerB.pinchable.rotateFactor = 0.5
layerB.pinchable.rotateFactor = 0.5



# layerA.scaleIncrements = 0.5
# scaleIncrements (this will scale in increments of 0.5)
# layerA.pinchable.scaleIncrements = 0.5

# layerA.pinchable.scale = false (t default)
