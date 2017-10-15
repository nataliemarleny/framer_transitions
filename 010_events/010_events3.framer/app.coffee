# Make scrollComponent

scroll = new ScrollComponent
	width: Screen.width
	height: Screen.height
	scrollHorizontal: false

scrollInside = new Layer
	parent: scroll.content
	backgroundColor: "#c3fae8"
	width: Screen.width
	height: Screen.height + 300

# Set Layers and States

Framer.Defaults.Layer.size = 100
Framer.Defaults.Layer.borderRadius = 5

layerA = new Layer
	backgroundColor: "#12b886"

layerB = new Layer
	backgroundColor: "#0ca678"
	x: Align.right(-30)

layerC = new Layer
	backgroundColor: "#099268"
	y: Align.center
	x: Align.right(-30)

layerC.draggable.enabled = true

layerB.states =
    stateB:
        x: 230
        y: 475
    stateC:
        x: 200
        y: 0



# Animation Event

animationA = new Animation layerA,
	y: Align.center

animationB = animationA.reverse()

animationA.start()

animationA.on Events.AnimationEnd, animationB.start
animationB.on Events.AnimationEnd, animationA.start

# Drag Event

layerC.onDragStart ->
	layerB.stateCycle("stateB", "stateC")

# State Event

layerB.onStateSwitchStop ->
	scrollInside.backgroundColor = "#087f5b"

layerB.onStateSwitchStart ->
	scrollInside.backgroundColor = "#c3fae8"

# Scroll Event

scroll.onScrollStart ->
	layerA.borderRadius = 100
	layerB.borderRadius = 100
	layerC.borderRadius = 100
