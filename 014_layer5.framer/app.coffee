# layers can have multiple shadows

bg = new BackgroundLayer
	backgroundColor: "#ffd8a8"

Framer.Defaults.Layer.borderRadius = 5
Framer.Defaults.Layer.backgroundColor = "#ff922b";
Framer.Defaults.Layer.x = Align.center;

layerA = new Layer
	y: Align.center(50)
	shadow1:
		y: 10
		x: 10
		blur: 1
		color: "rgba(0,0,0,0.1)"
		spread: 4 # need to animate spread to show what it is
		type: "inner"


layerB = new Layer
	y: 50

layerC = new Layer
	x: Align.bottom(10)
	

# Inspect Shadows
# print layerA.shadows

# Name Shadows
# shadow1:
# 	y: 10
# 	blur: 20
# 	color: "red"

# Copy shadows
layerB.shadows = layerA.shadows


