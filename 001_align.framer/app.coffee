# create a new layer and positions it in the center

layerA = new Layer
	x: Align.center
	y: Align.center
	backgroundColor: "#212529"
	borderRadius: 20

# create a state cycle

layerA.states =
	stateA:
		x: Align.right 
		y: Align.bottom 
		backgroundColor: "#495057"
	stateB:
		x: Align.left (50) # using offsets
		y: Align.top (50) # using offsets
		backgroundColor: "#ced4da"

layerA.onTap -> layerA.stateCycle()