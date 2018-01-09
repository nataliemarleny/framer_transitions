Canvas.backgroundColor = "#f3d9fa"

# Set Gradients
lightPurple = new Gradient
	start: "#eebefa"
	end: "#da77f2"

darkPurple = new Gradient
	start: "be4bdb"
	end: "9c36b5"
	angle: 45

layerA = new Layer
	height: screen.height
	width: screen.width
	backgroundColor: "#fefefe"

layerB = new Layer
		x: Align.left(25)
		y: Align.top(50)
		size: 100
		borderRadius: 300
		gradient: lightPurple

layerB.states =
	stateA:
		x: Align.right(-200)
		y: Align.bottom(-200)
		size: 600
		borderRadius: 600
		gradient: darkPurple

layerB.onTap -> layerB.stateCycle()


layerB.onTap ->
	Canvas.animate
	Canvas.backgroundColor = "#862e9c" 

# Canvas.image Options
	# can be a local image if added to ./images
	# can be a hosted image if set to a url

# Read Only Values

# print Canvas.width
# print Canvas.height
# print Canvas.size
# print Canvas.frame


# Not shown , not sure how it works

point =
    x: 20
    y: 40
pointInScreen = Canvas.convertPointToScreen(point)

# point =
#     x: 20
#     y: 40
#  
# layer = new Layer
#  
# pointInLayer = Canvas.convertPointToLayer(point, layer)
