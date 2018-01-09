Canvas.backgroundColor = "#862e9c"

layerA = new Layer
	height: screen.height
	width: screen.width
	backgroundColor: "white"

layerB = new Layer
		x: Align.left(25)
		y: Align.top(50)
		size: 150
		borderRadius: 300
		backgroundColor: "#ae3ec9"

layerB.states =
	stateA:
		x: Align.right(-200)
		y: Align.bottom(-200)
		size: 600
		borderRadius: 600
		backgroundColor: "e599f7"

layerB.onTap -> layerB.stateCycle()

layerB.on "change:y", ->
	Canvas.animate
	Canvas.backgroundColor = "#862e9c" 
	# can also be a hosted image if set to a url

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
