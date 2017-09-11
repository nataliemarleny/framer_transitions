layerA = new Layer
    x: Align.center
    y: Align.top(100)
    borderRadius: 20
    height: 150
    width: 150
    backgroundColor: "rgba(255,147,0,1)"

layerB = new Layer
	x: Align.center
	y: Align.bottom(-100)
	borderRadius: 20
	height: 150
	width: 150
	backgroundColor: "rgba(0,150,255,1)"
	

# pinchable.enabled is a boolean required to make the pinching happen
# it doesn't do anything by itself :(

layerA.pinchable.enabled = true
layerB.pinchable.enabled = true

# the minimal distance between two points before recognised

layerA.pinchable.threshold = 8

# centerOrigin is true by default

layerA.pinchable.centerOrigin = false
layerB.pinchable.centerOrigin = false

# scaleIncrements (this will scale in increments of 0.5)
# layerA.pinchable.scaleIncrements = 0.5

layerA.pinchable.minScale = 0.5
layerB.pinchable.minScale = 0.5
layerA.pinchable.maxScale = 2
layerB.pinchable.maxScale = 2

# scaleFactor set to 1 by default
layerA.pinchable.scaleFactor = 1.2

# set to true by default
layerA.pinchable.rotate = false

layerB.pinchable.rotateIncrements = 15

layerB.pinchable.rotateFactor = 0.5


