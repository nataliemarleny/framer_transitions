bg = new BackgroundLayer
	backgroundColor: "#ffe8cc"

Framer.Defaults.Layer.borderRadius = 20

layerA = new Layer
	backgroundColor: "#f76707"
	opacity: 0.5

layerA.onTap ->
	print layerA.style

layerB = new Layer
	x: Align.center
	y: Align.center
	backgroundColor: "#ff922b"

layerB.classList.remove("#ff922b")
# couldn't get this to work

layerB.html = "014 Layers"
layerB.color = "#d9480f"

layerB.onTap ->
	layerA.destroy()

layerC = new Layer
	parent: layerA
	size: 150
	x: Align.center(100)
	y: Align.center()
	backgroundColor: "#ff922b"

layerA.clip = true # disabled by default


layerB.onDoubleTap ->
	layerA.copy()

bg.onTap ->
	layerA.copySingle()