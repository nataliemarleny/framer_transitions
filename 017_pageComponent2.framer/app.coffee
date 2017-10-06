# designed for paginated instead of continuous content

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

# Add the second page to the right 
page.addPage(pageTwo, "right")
page.addPage(pageThree, "right")
page.addPage(pageFour, "right")
page.addPage(pageFive, "right")
