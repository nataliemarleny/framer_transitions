bg = new BackgroundLayer

Framer.Defaults.Layer.borderRadius = 5
Framer.Defaults.Layer.backgroundColor = "#ff922b"

layerA = new Layer
	size: 150
	x: Align.center()
	name: "parent"
	opacity: 0.4

layerB = new Layer
	size: 100
	name: "child"

layerF = new Layer
	size: 50
	name: "grandchild"

layerG = new Layer
	size: 50
	x: 100
	y: 100
	name: "notgrandchild"

print layerB.siblings
print layerB.siblingsWithName("grandchild")
print layerA.descendants
print layerG.ancestors()



# layer.parent <Layer object>

# Sets the parent for this layer. You can set the parent to null if you want the layer to live at the root of your document. (Alias: superLayer)

# Children Layer is READONLY

# print layerA.children

layerB.parent = layerA
layerF.parent = layerB
layerG.parent = layerB

layerC = new Layer
	size: 150
	x: Align.center()
	y: Align.center()
	opacity: 0.4

layerD = new Layer
	size: 100
	name: "kid"

layerE = new Layer
	size: 100
	x: 50
	y: 50
	name: "goat"

layerD.parent = layerC
layerE.parent = layerC


# Can't seem to get childrenWithName to work as a 'var'
# i.e 
# layerC.childrenWithName("kid").backgroundColor = "red"

layerG = new Layer
	size: 50
	x: 60
	y: 40

layerH = new Layer
	size: 50
	parent: layerC
	x: 30
	y: 60

layerC.addChild(layerG)
layerC.removeChild(layerH)

print layerC.childrenWithName("kid")
