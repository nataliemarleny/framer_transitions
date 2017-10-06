# Use it to design
# overlays like modals
# fixed elements like a tab bar
# it fires transition events

# Flow component knows which screen you are viewing! which is awesome

# Two properties:
# layer
# options / animation options - optional

# Layers
layerA = new Layer
	size: Screen.size
	backgroundColor: "#d8f5a2"

layerB = new Layer
	size: Screen.size
	backgroundColor: "#e9fac8"

layerC = new Layer
	parent: layerA
	width: Screen.width
	height: Screen.height + 600
	backgroundColor: "#f4fce3"

# section content
cBlock = new Layer
	parent: layerC
	width: Screen.width - 50
	x: Align.center()
	height: 60
	borderRadius: 5
	y: 100
	backgroundColor: "#82c91e"

cContent = new Layer
	parent: layerC
	width: Screen.width - 50
	x: Align.center()
	height: 300
	y: 170
	borderRadius: 5
	backgroundColor: "#c0eb75"

cPicture = new Layer
	parent: cContent
	borderRadius: 5
	x: Align.center()
	backgroundColor: "#a9e34b"
	y: 20
	width: 220

#heart
heartEmptyState.parent = cContent
heartEmptyState.props =
	x: 20
	y: 236
	scale: 0.8

heartActiveState.parent = cContent
heartActiveState.visible = false
heartActiveState.props =
	x: 17
	y: 234
	scale: 0.8

cContent2 = new Layer
	parent: layerC
	width: Screen.width - 50
	x: Align.center()
	height: 300
	y: 200+300+20
	borderRadius: 5
	backgroundColor: "#a9e34b"

# Profile Page
profilePic.parent = layerB
profilePic.props =
	x: Align.center
	y: Align.center

btn1 = new Layer
	size: 100
	borderRadius: 100
	x: Align.center
	y: Align.bottom(-50)
	backgroundColor: "#66a80f"

# design items control
swipemenu.visible = false
modal.visible = false
notification.visible = false

swipemenu.parent = layerC
btn1.parent = layerB
modal.parent = layerC
notification.parent = layerB

# Create FlowComponent
flow = new FlowComponent

# Show the layer
flow.showNext(layerA)

# flow.showNext(layer, options.animate/options.scroll)
# flow.showPrevious(options.animate/options.scroll)
layerB.onSwipeRight ->
	flow.showPrevious(animate: true)


# flow.showOverlayCenter(layer, options.animate/options.scroll/options.modal)
# modal is false by default
# use modal: true if you don't want overlay to be clickable

# Heart Animation
heartEmptyState.onTap ->
	modal.visible = true
	flow.showOverlayCenter(modal, modal: false)
	heartEmptyState.visible = false
	heartActiveState.visible = true

heartActiveState.onTap ->
	heartEmptyState.visible = true
	heartActiveState.visible = false



# Notification Animation
btn1.onMouseOver ->
	notification.visible = true
	flow.showOverlayTop(notification)

# transition()
# current
# scroll


# NavBar
navBar = new Layer
	height: 75
	backgroundColor: "#82c91e"

hamburger.scale = 0.75
hamburger.y = 14
hamburger.parent = navBar

moreBtn.parent = navBar
moreBtn.x = Align.right(100)

flow.header = navBar

hamburger.onTap ->
	swipemenu.visible = true
	flow.showOverlayLeft(swipemenu)

# Footer
tabBar = new Layer
	height: 30
	backgroundColor: "#5c940d"

flow.footer = tabBar

# Switch to layerB
moreBtn.onTap ->
	flow.showNext(layerB, animate: true)






