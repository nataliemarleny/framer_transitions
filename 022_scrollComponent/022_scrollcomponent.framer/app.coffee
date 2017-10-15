# A ScrollComponent is built with two layers

Canvas.backgroundColor = "#5f3dc4"



scrollStart = Header.maxY-20

scroll = new ScrollComponent
	parent: Home
	scroll: true
	scrollVertical: true
	scrollHorizontal: false
	speedX: 1 # default 1
	size: Screen.size
	mouseWheelEnabled: true #default false
	contentInset:
		top: 150
	
scroll.sendToBack()
Feed.parent = scroll.content