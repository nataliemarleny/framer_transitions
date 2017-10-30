scroll = new ScrollComponent
	width: screen.width
	height: screen.height
	backgroundColor: "#5f3dc4"
	scrollHorizontal: true
	scrollVertical: false

layerA = new Layer
	parent: scroll.content
	backgroundColor: "#5f3dc4"
	width: screen.width + 60
	height: 100
	y: Align.top(50)

layerB = new Layer
	height: layerA.height - 50
	width: layerA.height - 50
	borderRadius: 100
	y: Align.center
	backgroundColor: "#f3f0ff"
	parent: layerA

scroll2 = new ScrollComponent
	width: screen.width
	height: screen.height
	scrollHorizontal: false
	scrollVertical: true

layerAC = new Layer
	parent: scroll2.content
	width: screen.width
	height: screen.height
	backgroundColor: "#fc6106"

scroll2.contentInset =
	top: 175

layerC = new Layer
	backgroundColor: "#f3f0ff"
	borderRadius: 5
	x: Align.center
	parent: layerAC
	width: 150

for i in [0..7]
	newCard=layerB.copy()
	newCard.x=(layerB.width+15)*(i+1)
	newCard.parent=layerA

# scroll.contentInset
# gives content extra padding between the constraints and the actual content layers

scroll.contentInset =
	left: 20