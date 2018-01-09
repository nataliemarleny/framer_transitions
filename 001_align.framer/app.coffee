#########################
#  001 - Layer          #
#########################

# Create a new layer and position it in the center

layerA = new Layer
	x: Align.center
	y: Align.center
	backgroundColor: "#212529"
	borderRadius: 20

# Create a state cycle

layerA.states =
	stateA:
		x: Align.right(-20) 
		y: Align.bottom(-20) 
		backgroundColor: "#495057"
	stateB:
		x: Align.left (50) # using offsets
		y: Align.top (50) # using offsets
		backgroundColor: "#ced4da"

layerA.onTap -> layerA.stateCycle()
