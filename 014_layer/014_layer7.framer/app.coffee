bg = new BackgroundLayer

layerA = new Layer

layerA.onTap ->
	print layerA.style

layerB = new Layer
	x: Align.center
	y: Align.center
	backgroundColor: "orange"

layerB.classList.remove("orange")

layerB.onTap ->
	layerA.destroy()

layerC = new Layer
	parent: layerA
	size: 150
	x: Align.center(100)
	y: Align.center()

layerA.clip = true # disabled by default

layerA.copy()

# 
# layerA.copySingle()