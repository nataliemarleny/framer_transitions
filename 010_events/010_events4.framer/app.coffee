#########################
#  010 - Events pt.4    #
#########################

# Set colors

teal1 = new Color("#c3fae8")
teal2 = new Color("#63e6be")
teal3 = new Color("#20c997")
teal4 = new Color("#0ca678")
teal5 = new Color("#087f5b")


bg = new Layer
	height: Screen.height
	width: Screen.width
	backgroundColor: teal4

# Define Layer

sqBg = new Layer
	x: Align.center()
	y: Align.top(100)
	size: 300
	borderRadius: 5
	backgroundColor: "#111111"

shapeShifter = new Layer
	x: Align.center()
	y: Align.center()
	borderRadius: 5
	size: 150
	parent: sqBg
	backgroundColor: teal5

# .onEdgeSwipe*

groupEdge = new Layer
	width: Screen.width
	height: 250
	y: Align.bottom(150)
	backgroundColor: teal2

groupEdgeText = new TextLayer
	text: "View More Colors"
	parent: groupEdge
	color: "#111111"
	fontSize: 20
	y: 10
	x: 10

coloring0 = new Layer
	width: Screen.width/5
	y: Align.bottom()
	backgroundColor: "#ffd43b"
	parent: groupEdge

coloring1 = new Layer
	width: Screen.width/5
	x: 1*(Screen.width/5)
	y: Align.bottom()
	backgroundColor: "#ff922b"
	parent: groupEdge

coloring2 = new Layer
	width: Screen.width/5
	x: 2*(Screen.width/5)
	backgroundColor: "#f06595"
	y: Align.bottom()
	parent: groupEdge

coloring3 = new Layer
	width: Screen.width/5
	y: Align.bottom
	x: 3*(Screen.width/5)
	backgroundColor: "#be4bdb"
	parent: groupEdge

coloring4 = new Layer
	width: Screen.width/5
	y: Align.bottom
	x: 4*(Screen.width/5)
	backgroundColor: teal1
	parent: groupEdge

Screen.onEdgeSwipeBottom ->
	groupEdge.y = Align.bottom

Utils.loadWebFont("Open Sans")

# slider.onValueChange

# Define Slider
slider = new SliderComponent
	x: Align.left(41)
	y: Align.center(50)
	backgroundColor: "#20c997"
	min: 0
	max: 100
	width: Screen.width - 200

slider.knob.draggable.momentum = false
slider.fill.backgroundColor = "#ebfbee"
slider.animateToValue(20, { curve: Spring })

# Slider Information
sliderValueBtn = new Layer
	width: 75
	height: 40
	borderRadius: 5
	y: 20
	backgroundColor: "#099268"
	opacity: 1
	x: Align.right(-40)
	y: Align.center(50)

textA = new TextLayer
	parent: sliderValueBtn
	fontFamily: "Open Sans"
	fontWeight: 400
	fontSize: 25
	x: 22
	y: 3
	text: "{indicate}"
	color: "#ffffff"

textA.templateFormatter = 
	indicate: (value) ->
		Utils.round(slider.value)

# Make use of slider.onValueChange ->
slider.onValueChange ->
	textA.animate
		template:
			indicate: (slider.value)
	shapeShifter.animate
		options:
			time: 0.1
		borderRadius: (slider.value)
