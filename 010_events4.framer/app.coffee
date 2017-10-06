bg = new BackgroundLayer
	backgroundColor: "#12b886"
Utils.loadWebFont("Open Sans")


slider = new SliderComponent
	x: Align.center
	y: Align.top(125)
	backgroundColor: "#69db7c"
	min: 0
	max: 100
	width: Screen.width - 100

slider.knob.draggable.momentum = false
slider.fill.backgroundColor = "#ebfbee"
slider.animateToValue(20, { curve: Spring })

layerA = new Layer
	size: 50
	borderRadius: 100
	x: Align.center()
	y: 20
	backgroundColor: "#099268"
	opacity: 1

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