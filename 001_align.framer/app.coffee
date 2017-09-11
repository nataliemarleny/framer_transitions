# create a new layer and positions it in the center

layerA = new Layer
	x: Align.center
	y: Align.center
	backgroundColor: "rgba(81,81,81,1)"
	borderRadius: 20

# create a state cycle

layerA.states =
	stateA:
		x: Align.right 
		y: Align.bottom 
		backgroundColor: "rgba(214,214,214,1)"
	stateB:
		x: Align.left (50) # using offsets
		y: Align.top (50) # using offsets
		backgroundColor: "rgba(33,33,33,1)"

layerA.onTap -> layerA.stateCycle()