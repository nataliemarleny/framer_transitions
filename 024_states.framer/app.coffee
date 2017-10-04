bg = new BackgroundLayer

layerA = new Layer
	x: Align.center
	y: Align.center

layerA.states.stateA =
    x: 100
    animationOptions:
        curve: Spring(damping: 0.5)
        time: 0.5

layerB = new Layer
	x: Align.center

layerB.states =
    stateB:
        x: 100
        y: 500
    stateC:
        x: 200
        y: 0

# Animate to the state 
layerA.animate("stateA")

# On a click, go back and forth between states.
layerB.onTap ->
    layerB.stateCycle("stateB", "stateC")

layerC = new Layer
 
layerC.states.stateD =
    x: 50
    y: 400
    opacity: 0.5
 
layerC.stateSwitch("stateD")
 
print layerC.states.current
# Output: <Object State> 
 
print layerC.states.current.name
# Output: stateA 

layerD = new Layer
 
layerD.states.stateE =
    x: 250
    opacity: 0.5
 
layerD.stateSwitch("stateE")
 
print layerD.states.previous
# Output: <Object State> 


