bg = new BackgroundLayer
	backgroundColor: "#12b886"

Events.wrap(window).addEventListener "resize", (event) ->
    print "Page is resizing"