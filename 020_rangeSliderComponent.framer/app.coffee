bg = new BackgroundLayer
	backgroundColor: "#ccedff"

# Create a range slider

range = new RangeSliderComponent
	y: Align.top(70)
	x: Align.center
	width: 250
	min: 0 # 0 default
	max: 10 # 1 default
	minValue : 2 # 0 default
	maxValue: 8 # 0.5 default

range.backgroundColor = "#72c3fc"

# knobSize
# This property affects both minKnob and maxKnob
range.knobSize = 30 # 30 default

# fill
range.fill.backgroundColor = "#1c7cd6"

# minKnob
range.minKnob.draggable.momentum = false

# maxKnob
range.maxKnob.draggable.momentum = false

# Animate to 8 
range.animateToMaxValue(9)
 
# Animate with a custom curve 
range.animateToMaxValue(8, { curve: Spring })

# Animate to 1 
range.animateToMinValue(1)
 
# Animate with a custom curve 
range.animateToMinValue(1, { curve: Spring })


