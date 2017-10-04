bg = new BackgroundLayer
	backgroundColor: "#b2f2bb"

# Disable all extras
# Framer.Extras.Hints.disable()
# Framer.Extras.Preloader.disable()

layerA = new Layer
	x: Align.center
	y: Align.top(50)
	borderRadius: 10
	backgroundColor: "#51cf66"

layerA.states.stateA = 
	rotation: 45

layerA.states.stateB =
	rotation: (180+45)

layerA.onTap ->
	layerA.stateCycle("stateA", "stateB")

# Automatically show hints when page loads
Framer.Extras.Hints.enable()
Framer.Extras.Hints.showHints()




# Framer.Extras.Preloader.enable()



# Framer.Extras.Preloader.enable()
# Framer.Extras.Preloader.addImage("https://twitter.com/framerjs/profile_image?size=bigger")
#  
# layerA = new Layer point: Align.center
#  
# layerA.onTap ->
#     layerB = new Layer
#         image: "https://twitter.com/framerjs/profile_image?size=bigger"