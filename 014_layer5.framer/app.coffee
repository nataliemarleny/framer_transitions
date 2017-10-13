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
		spread: 10 # need to animate spread to show what it is
		type: "outer"

animationA = new Animation layerA,
	shadow1:
		spread: 1

layerA.onTap ->
	animationA.start()

# note - background blur will not work on all layers

layerB = new Layer
	y: 250
	x: Align.center
	backgroundBlur: 10 # cannot see any difference!

# Inspect Shadows
# print layerA.shadows

# Name Shadows
# shadow1:
# 	y: 10
# 	blur: 20
# 	color: "red"

# Copy shadows
layerB.shadows = layerA.shadows

layerC = new Layer
	x: Align.center
	y: Align.bottom(-50)
	shadow2:
		y: 10
		x: 10
		blur: 1
		color: "rgba(0,0,0,0.1)"
		spread: 10 # need to animate spread to show what it is
		type: "inner"
