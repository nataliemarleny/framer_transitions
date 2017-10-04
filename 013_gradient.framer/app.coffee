
sunshine = new Gradient
	start: "#fff9db"
	end: "#ffd43b"

sunset = new Gradient
	angle: 45
	start: "#e67700"
	end: "#ffe066"

wave = new Gradient
	angle: (180+45)
	start: "#e67700"
	end: "#ffe066"

layerA = new Layer
	x: Align.center
	y: Align.top
	width: Screen.width
	height: 350
	gradient: sunshine

layerB = new Layer
	x: Align.center
	y: Align.bottom
	height: 350
	width: Screen.width
	gradient: sunset

animation1 = new Animation layerB,
	gradient: wave

animation2 = new Animation layerB,
	gradient: sunset

animation1.start()

animation1.on Events.AnimationEnd, animation2.start
animation2.on Events.AnimationEnd, animation1.start



