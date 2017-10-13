# layers can have multiple shadows

bg = new BackgroundLayer
	backgroundColor: "#ffd8a8"

Framer.Defaults.Layer.borderRadius = 5
Framer.Defaults.Layer.backgroundColor = "#ff922b"
Framer.Defaults.Layer.size = 150

layerA = new Layer
	y: Align.top(50)
	x: Align.center
	shadow1:
		y: 10
		x: 10
		blur: 1
		color: "rgba(0,0,0,0.1)"
		spread: 4 # need to animate spread to show what it is
		type: "outer"

layerB = new Layer
	y: 250
	x: Align.center()

layerC = new Layer
	x: Align.center()
	y: Align.bottom(-50)
	backgroundColor: "#fd7e14"
	shadow2:
		y: 10
		x: 10
		blur: 1
		color: "rgba(0,0,0,0.1)"
		spread: 4 # need to animate spread to show what it is
		type: "inner"


# Inspect Shadows
# print layerA.shadows

# Name Shadows
# shadow1:
# 	y: 10
# 	blur: 20
# 	color: "red"

# Copy shadows
layerB.shadows = layerA.shadows


