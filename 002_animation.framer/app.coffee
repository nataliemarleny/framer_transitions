layerC = new BackgroundLayer
	backgroundColor: "#ffffff"

layerA = new Layer
	y: Align.center
	x: Align.center
	borderRadius: 5
	backgroundColor: "#12b886"

layerB = new Layer
	x: Align.center
	y: Align.center
	backgroundColor: "#"

layerB.style.webkitClipPath = "polygon(50% 0%, 0 85%, 100% 85%)" 

animationA = new Animation layerA,
	borderRadius: 100
	backgroundColor: "#0ca678"

# Nothing will move until you start
animationA.start()

# Stop animation
# animationA.stop()

# Reverse values from previous  animation
animationB = animationA.reverse()
 
# Alternate between the two animations 
animationA.on Events.AnimationEnd, animationB.start
animationB.on Events.AnimationEnd, animationA.start

# On animation end restart the animation 
#animationA.on Events.AnimationEnd, ->
 #   animationA.restart()

# Finish the animation after a 1 second delay 
Utils.delay 3, ->
    animationA.finish()
