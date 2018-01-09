#########################
#  004 - Canvas         #
#########################

Canvas.backgroundColor = "#e599f7"

# Set Gradients
lightPurple = new Gradient
	start: "#eebefa"
	end: "#da77f2"

darkPurple = new Gradient
	start: "be4bdb"
	end: "9c36b5"
	angle: 45

# Screen Background
layerA = new Layer
	height: screen.height
	width: screen.width
	backgroundColor: "#fefefe"

# Trigger Button
layerB = new Layer
		x: Align.left(25)
		y: Align.top(100)
		size: 100
		borderRadius: 300
		gradient: lightPurple

layerB.states =
	stateA:
		x: Align.left(-100)
		y: Align.top()
		height: 300
		width: 600
		borderRadius: 0
		gradient: darkPurple

layerB.onTap -> layerB.stateCycle()

# Add reusable button
for i in [0..3]
	newButton=layerB.copy()
	newButton.y=newButton.height+140*(i+1)

layerB.onTap ->
	Canvas.animate
	Canvas.backgroundColor = "#862e9c"

# Canvas.image Options
	# can be a local image if added to ./images
	# can be a hosted image if set to a url

# Canvas: Read Only Values

# print Canvas.width
# print Canvas.height
# print Canvas.size
# print Canvas.frame

# Canvas.to
# Not shown , not sure how it works

# point =
#     x: 20
#     y: 40
# pointInScreen = Canvas.convertPointToScreen(point)

# point =
#     x: 20
#     y: 40
#  
# layer = new Layer
#  
# pointInLayer = Canvas.convertPointToLayer(point, layer)
