bg = new BackgroundLayer
	backgroundColor: "#ffe3e3"

layerC = new Layer
	backgroundColor: "#ffe3e3"
	borderRadius: 5
	x: Align.center
	y: Align.top(80)
	width: 300
	height: 0

layerA = new Layer
	borderRadius: 7
	width: 100
	height: 50
	y: Align.bottom(-50)
	x: Align.left(35)
	backgroundColor: "#e03131"

layerB = new Layer
	borderRadius: 7
	width: 100
	height: 50
	y: Align.bottom(-50)
	x: Align.right(-35)
	backgroundColor: "#f03e3e"

animationA = new Animation layerA,
	y: Align.top
	x: Align.left
	width: 375
	height: 50
	borderRadius: 0
	backgroundColor: "#fa5252"
	options:
		curve: Bezier(0.25, 0.1, 0.25, 1)

# Nothing will move until you .start
layerA.onTap ->
	animationA.start()

# Stop animation
# animationA.stop()

# Reverse values from previous  animation
animationB = new Animation layerB, 
	y: Align.top
	x: Align.left
	width: 375
	height: 50
	borderRadius: 0
	backgroundColor: "#ff6b6b"
	options:
		curve: Bezier(0.25, 0.1, 0.25, 1)

layerB.onTap ->
	animationB.start()

animationC = animationA.reverse()
animationD = animationB.reverse()

# Alternate between the two animations 
animationB.on Events.AnimationStart, animationC.start
animationA.on Events.AnimationStart, animationD.start

animationE = new Animation layerC,
	height: 450
	backgroundColor: "#ff8787"
	

animationF = new Animation layerC,
	backgroundColor: "#ffe3e3"
	instant: true

# On animation end start an animation 
animationA.on Events.AnimationEnd, ->
	animationE.start()

animationB.on Events.AnimationStart, animationF.start

