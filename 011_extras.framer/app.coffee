
Framer.Extras.Preloader.enable()
Framer.Extras.Preloader.addImage("images/natalie_logomark.png")


bg = new BackgroundLayer
	backgroundColor: "#b2f2bb"

# Disable all extras
# Framer.Extras.Hints.disable()
# Framer.Extras.Preloader.disable()

layerA = new Layer
	x: Align.center
	y: Align.top(100)
	borderRadius: 10
	backgroundColor: "#51cf66"

layerA.states.stateA = 
	rotation: 45

layerA.states.stateB =
	rotation: (0)

layerA.onTap ->
	layerA.stateCycle("stateA", "stateB")

# Automatically show hints when page loads
Framer.Extras.Hints.enable()
Framer.Extras.Hints.showHints()
 
layerB = new Layer
	x: Align.center
	y: Align.center(100)
	borderRadius: 10
	backgroundColor: "#37b24d"

layerB.states.stateC =
	borderRadius: 100

layerB.states.stateD =
	borderRadius: 10

layerB.onTap ->
	layerB.stateCycle("stateC", "stateD")
 
layerB.showHint = (hintFrame) ->
 
    # Create a hint layer, this will automatically be   
    # placed in the hints context on top of everything. 
    hint = new Layer
        frame: hintFrame
        backgroundColor: "#fab005"
        opacity: 0.5
 
    # Add a cool animation 
    hint.animate
        scale: 1.3
        opacity: 0
        options:
            time: 0.5
 
    # Remove the layer when done 
    hint.onAnimationEnd -> hint.destroy()



 

