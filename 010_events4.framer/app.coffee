bg = new BackgroundLayer

slider = new SliderComponent
	x: Align.center
	y: Align.bottom(-100)
	backgroundColor: "#c3fae8"
	min: 0
	max: 100

slider.fill.backgroundColor = "#12b886"
slider.animateToValue(20, { curve: Spring })