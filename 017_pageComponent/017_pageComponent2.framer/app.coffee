# pageComponent
# designed for paginated instead of continuous content

# page = new PageComponent
# Create a new PageComponent and only allow horizontal scrolling. 
page = new PageComponent
    width: Screen.width
    height: Screen.height
    scrollVertical: false

# Define the first page 
pageOne = new Layer
    width: page.width
    height: page.height
    parent: page.content
    backgroundColor: "#2b8a3e"

# Define second page 
pageTwo = new Layer
    width: page.width
    height: page.height
    backgroundColor: "#37b24d"

# Define third page
 pageThree = new Layer
    width: page.width
    height: page.height
    backgroundColor: "#51cf66"

# Define forth page
 pageFour = new Layer
    width: page.width
    height: page.height
    backgroundColor: "#8ce99a"

# Define fifth page
 pageFive = new Layer
    width: page.width
    height: page.height
    backgroundColor: "#d3f9d8"

#-#-#-#-#-#-#-#-#-#-#-#-#

# page.addPage(layername, "right")
# Add the second page to the right 
page.addPage(pageTwo, "right")
page.addPage(pageThree, "right")
page.addPage(pageFour, "right")
page.addPage(pageFive, "right")

# page.originX
page.originX = 0.5 # default 0.5

# page.originY
page.originY = 0.5 # default 0.5

# page.velocityThreshold
# Switch to be based on distance, increase the VT
page.velocityThreshold = 5

page.on Events.ScrollEnd, ->
	print Math.abs(page.velocity.x)

# page.animationOptions
page.animationOptions =
	curve: Bezier.ease
	time: 1

# page.currentPage (read only)
print page.currentPage

# page.closestPage (read only)
page.on Events.ScrollEnd, ->
	print page.closestPage

# page.nextPage()

# page.previousPage

#page.snapToPage()
pageSix = new Layer
    width: page.width
    height: page.height
    backgroundColor: "#fcc419"

page.addPage(pageSix, "left")

page.snapToPage(pageTwo, false) #not totally sure about the logic of true/false

# Takes three arguments: a page.content layer, animate t/f, animation options
# automatically scroll to pageFour
page.snapToPage(
	pageFive
	true
	animationOptions = time: 2
)

# page.snapToNextPage(page, animate, animationOptions)

# page.snapToPreviousPage(direction, animate, animationOptions)
# page.snapToPreviousPage()

# page.horitzontalPageIndex(pageThree)
print page.horizontalPageIndex(pageThree)

# page.verticalPageIndex(pageThree)
print page.verticalPageIndex(pageThree)

