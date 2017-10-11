bg = new BackgroundLayer

bg.states.stateA =
	backgroundColor: "#ffd8a8"

bg.stateSwitch("stateA")

layerA = new Layer
	borderRadius: 10
	backgroundColor: "fd7e14"

# layerA.animationOptions

layerA.animationOptions = 
	curve: Bezier.ease
	time: 5

# layerA.animate
layerA.animate
	x: Align.center()
	y: Align.center()

# layerA.animations()
# Returns all the current running animations for this layer
print layerA.animations()

# layerA.isAnimating
print layerA.isAnimating

# layerA.animateStop()
# layerA.animateStop()


# layer.stateCycle(states, options)

layerB = new Layer
	borderRadius: 100
	backgroundColor: "#d9480f"

layerB.states =
    stateC:
        x: 200
     stateD:
        y: 300

layerB.onTap ->
	layerB.stateCycle(["stateC", "stateD"])

# stateNames
print layerB.stateNames