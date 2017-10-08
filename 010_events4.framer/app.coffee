bg = new BackgroundLayer
	backgroundColor: "#12b886"
	width: Screen.width
	height: Screen.height



Utils.loadWebFont("Open Sans")

# slider.onValueChange
slider = new SliderComponent
	x: Align.center
	y: Align.bottom(-50)
	backgroundColor: "#20c997"
	min: 0
	max: 100
	width: Screen.width - 100

slider.knob.draggable.momentum = false
slider.fill.backgroundColor = "#ebfbee"
slider.animateToValue(20, { curve: Spring })

layerA = new Layer
	size: 50
	borderRadius: 100
	y: 20
	backgroundColor: "#099268"
	opacity: 1
	x: Align.center()
	y: Align.bottom(-100)

textA = new TextLayer
	parent: layerA
	x: 14
	y: 10
	fontFamily: "Open Sans"
	fontWeight: 400
	fontSize: 20
	text: "{indicate}"
	color: "#ffffff"

textA.templateFormatter = 
	indicate: (value) ->
		Utils.round(slider.value)

slider.onValueChange ->
	textA.animate
		template:
			indicate: (slider.value)

layerQ = new Layer
	x: Align.center
	borderRadius: 5
	y: 25
	size: 150
	backgroundColor: "#099268"


Screen.onEdgeSwipe ->
	layerQ.x = 300

Screen.onEdgeSwipeEnd ->
	layerQ.x = Align.center