
blue = new Gradient
	start: "#05F"
	end: "#0DF"

gray = new Gradient
	angle: 45

blk = new Gradient
	angle: (180+45)

layerA = new Layer
	x: Align.center
	y: Align.top(50)
	borderRadius: 20
	gradient: blue

layerB = new Layer
	x: Align.center
	y: Align.bottom (-50)
	borderRadius: 20
	gradient: gray

layerB.animate
	gradient: blk