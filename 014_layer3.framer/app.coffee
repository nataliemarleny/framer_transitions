bg = new BackgroundLayer
	backgroundColor: "#ffe8cc"

# Last inserted layer will always be on top
# Index increases by order of insertion

Framer.Defaults.Layer.size = 100

# Create Layers

layerA = new Layer
	y: 25
Utils.labelLayer(layerA, "A")
layerB = new Layer
	y: 25
	x: 50
	backgroundColor: "#e8590c"
Utils.labelLayer(layerB, "B")

layerC = new Layer
	y: 150
Utils.labelLayer(layerC, "A")
layerD = new Layer
	y: 150
	x: 50
	backgroundColor: "#e8590c"
Utils.labelLayer(layerD, "B")

layerE = new Layer
	y: 275
Utils.labelLayer(layerE, "A")
layerF = new Layer
	y: 275
	x: 50
	backgroundColor: "#e8590c"
Utils.labelLayer(layerF, "B")

layerG = new Layer
	y: 400
Utils.labelLayer(layerG, "A")
layerH = new Layer
	y: 400
	x: 50
	backgroundColor: "#e8590c"
Utils.labelLayer(layerH, "B")

layerI = new Layer
	y: 525
Utils.labelLayer(layerI, "A")
layerJ = new Layer
	y: 525
	x: 50
	backgroundColor: "#e8590c"
Utils.labelLayer(layerJ, "B")

# layerA.index <number> (put layer B on top)

layerA.onTap ->
	layerA.index = 2
	layerB.index = 1

layerB.onTap ->
	layerA.index = 1
	layerB.index = 2

# layerA.placeBefore(layerB)

layerC.onTap ->
	layerC.placeBefore(layerD)

layerD.onTap ->
	layerD.placeBefore(layerC)

# layerA.placeBehind(layerB)

layerE.onTap ->
	layerE.placeBehind(layerF)

layerF.onTap ->
	layerF.placeBehind(layerE)

# layer.bringToFront()

layerG.onTap ->
	layerG.bringToFront()

layerH.onTap ->
	layerH.bringToFront()

# layer.sendToBack()

layerI.onTap ->
	layerI.bringToFront()

layerJ.onTap ->
	layerJ.bringToFront()
