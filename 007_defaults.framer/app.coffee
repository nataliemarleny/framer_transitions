# Advisable to put default overrides 1st
# Be conscious that layers include bg layer

# Override default gray color
Framer.Defaults.Layer.borderRadius = 12
Framer.Defaults.Layer.size = 100
Framer.Defaults.Animation =
	curve: Spring(damping: 0.75)

bg = new BackgroundLayer
	backgroundColor: "#dbe4ff"
	borderRadius: 0
	size: Screen.size

layerA = new Layer
	x: Align.left(50)
	y: Align.top(50)
	rotation: 45
	backgroundColor: "#91a7ff"

layerB = new Layer
	y: Align.bottom(-50)
	x: Align.right(-50)
	rotation: 45
	backgroundColor: "#4263eb"

animationA = new Animation layerA,
	x: Align.center(-100)
	y: Align.center
	rotation: 0

animationB = new Animation layerB,
	rotation: 0
	y: Align.top(100)

animationA.start()
animationB.start()

animationC = animationA.reverse()
animationD = animationB.reverse()

animationA.on Events.AnimationEnd, animationC.start
animationB.on Events.AnimationEnd, animationD.start
