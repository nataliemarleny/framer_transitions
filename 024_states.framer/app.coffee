bg = new BackgroundLayer
	backgroundColor: "#ffdeeb"

layerA = new Layer
	x: 30
	y: 30
	borderRadius: 10
	size: 150
	backgroundColor: "#c2255c"

layerA.states.stateA =
    x: Align.right
    borderRadius: 10
    backgroundColor: "#f06595"
    animationOptions:
        curve: Spring(damping: 0.5)
        time: 0.5

layerB = new Layer
	x: Align.right(-30)
	y: 30
	borderRadius: 100
	backgroundColor: "d6336c"
	size: 150

layerB.states =
    stateB:
        x: 100
        y: 500
    stateC:
        x: 200
        y: 0

# Animate to the state 
layerA.onTap ->
	layerA.animate("stateA")

# On a click, go back and forth between states.
layerB.onTap ->
    layerB.stateCycle("stateB", "stateC")

layerC = new Layer
	y: 250
	x: Align.center()
	width: 300
	height: 50
	backgroundColor: "#f06595"
	borderRadius: 5
 
layerC.states.stateE =
	x: 250
	opacity: 0.5

layerC.states.stateF =
	y: Align.bottom()

layerC.onTap -> 
	layerC.stateCycle()
 
print layerC.states.previous
# Output: <Object State> 

layerD = new Layer
	width: 100
	height: 200
	x: 50
	y: 400
	borderRadius: 100
	backgroundColor: "#f783ac"
 
layerD.states.stateD =
	rotation: 45 
 
layerD.stateSwitch("stateD")
 
print layerD.states.current
# Output: <Object State> 
 
print layerD.states.current.name
# Output: stateA 

