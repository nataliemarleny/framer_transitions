bg = new BackgroundLayer
	backgroundColor: "#862e9c"	

# Create a SliderComponent

sliderA = new SliderComponent
	y: Align.top(70)
	x: Align.center
	width: 250

# Customise the appearance
sliderA.backgroundColor = "#e599f7"
sliderA.fill.backgroundColor = "#be4bdb"

# Customise the 'knob'
sliderA.knob.backgroundColor = "#FCF7FF"
sliderA.knobSize = 45 # set to 30 by default
sliderA.knob.draggable.momentum = false # set to true by default

# Set Slider Values
sliderA.min = 0 # set to 0 by default
sliderA.max = 100 # set to 1 by default

# Getting Fancy
# print the above value
sliderA.on "change:value", ->
	print this.value

# this is useful for retrieving the value or mapping it to another layer property

# slider.valueForPoint
# slider.valueForPoint
# slider.animateToValue
