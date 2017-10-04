# Use it to design
# overlays like modals
# fixed elements like a tab bar
# it fires transition events

# Flow component knows which screen you are viewing! which is awesome

# Two properties:
# layer
# options / animation options - optional

layerA = new Layer
	size: Screen.size
	backgroundColor: "#d8f5a2"

layerB = new Layer
	size: Screen.size
	backgroundColor: "#a9e34b"

btn1 = new Layer
	size: 100
	borderRadius: 100
	x: Align.center
	y: Align.bottom(-100)
	backgroundColor: "#66a80f"

# Create FlowComponent
flow = new FlowComponent

# Show the layer
flow.showNext(layerA)

# flow.showNext(layer, options.animate/options.scroll)

# Switch to layerB
layerA.onTap ->
	flow.showNext(layerB, animate: true)

# flow.showPrevious(options.animate/options.scroll)
layerB.onTap ->
	flow.showPrevious(animate: true)

# flow.showOverlayCenter(layer, options.animate/options.scroll/options.modal)
# modal is false by default
# flow2 = new FlowComponent
# 
# layerB.onTap ->
# 	flow2.showOverlayCenter(modal, modal: true)

