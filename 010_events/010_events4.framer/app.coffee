#########################
#  010 - Events pt.4    #
#########################

# Set colors

teal1 = new Color("#c3fae8")
teal2 = new Color("#63e6be")
teal3 = new Color("#20c997")
teal4 = new Color("#0ca678")
teal5 = new Color("#087f5b")


# flow.on Events.Transition* , ->

layerA = new Layer
	height: Screen.height

flow = new FlowComponent
flow.header = layerA

flow.on Events.TransitionEnd, ->
	layerA.backgroundColor = "purple"

# Define Layer

sqBg = new Layer
	x: Align.center()
	y: Align.top(100)
	size: 300
	borderRadius: 5
	backgroundColor: "#111111"

layerQ = new Layer
	x: Align.center()
	y: Align.center()
	borderRadius: 5
	size: 150
	parent: sqBg
	backgroundColor: teal5

# Define States
layerQ.states  =
	state1:
		backgroundColor: teal1
	state2:
		backgroundColor: teal2
	state3:
		backgroundColor: teal3
	state4:
		backgroundColor: teal4
	state5:
		backgroundColor: teal5



# .onEdgeSwipe*

Screen.onEdgeSwipe ->
	layerQ.stateCycle("state1", "state2", "state3", "state4", "state5")

Utils.loadWebFont("Open Sans")

# slider.onValueChange

# Define Slider
slider = new SliderComponent
	x: Align.left(40)
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
	size: 75
	borderRadius: 5
	y: 20
	backgroundColor: "#099268"
	opacity: 1
	x: Align.center()
	y: Align.bottom(-100)

textA = new TextLayer
	parent: sliderValueBtn
	x: Align.center
	y: Align.center
	fontFamily: "Open Sans"
	fontWeight: 400
	fontSize: 48
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
	layerQ.animate
		options:
			time: 0.1
		borderRadius: (slider.value)

