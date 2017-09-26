# Modulate
# Can be used to create scrolling parallax
scroll = new ScrollComponent
	backgroundColor: "#f6c106"
	scrollHorizontal: false
	height: 600

layerPara = new Layer
    x: 500
    x: Align.center
    backgroundColor: "fc6106"
 
# Modulate the scrolling distance 
scroll.on Events.Move, ->
    y = Utils.modulate(scroll.scrollY, [0,100], [0,10])
    layerPara.y = y

# Cycle()
# creates a function that returns the next value of an array every time it is called.
cycler = Utils.cycle(["a", "b", "c"])
print cycler()

# Web Fonts! - works with Google Web Fonts
bungee = Utils.loadWebFont("Bungee Shade")
title = new TextLayer
	fontFamily: bungee
	x: Align.center
	color: "black"

# can pass an optional second argument for font weight

roboto = Utils.loadWebFont("Roboto", 700)
subheader = new TextLayer
	text: "Getting Bolder"
	fontFamily: roboto
	x: Align.center
	y: Align.top(60)
	color: "black"
	fontWeight: 700


# Random Choice
print Utils.randomChoice(["banana", "apple", "melon"])
# Random Color

layerA = new Layer
	width: 100
	height: 100
	x: Align.left(30)
	y: Align.center(-40)
	borderRadius: 10
layerA.backgroundColor = Utils.randomColor(1)

# Label a layer
# By default, font Menlo, and positioned in the center

Utils.labelLayer(layerA, "Hello")

# Random Image

layerB = new Layer
	height: 100
	width: 100
	x: Align.center
	y: Align.center(-40)
	borderRadius: 10
layerB.image = Utils.randomImage()

# Pass through layer argument with random image

layerC = new Layer
	height: 100
	width: 100
	x: Align.right(-30)
	y: Align.center(-40)
	borderRadius: 10
layerC.image = Utils.randomImage(layerC)

# Utils.randomNumber(a, b)
# generate a random number between a and b
# Utils.round(value, decimals, increments, min, max)

text2 = new TextLayer
	x: Align.center(40)
	y: Align.top(150)
	color: "#000"
text2.text = Utils.round(Utils.randomNumber(0, 100), 2)


# Delay()
Utils.delay 0.5, ->
    print "delayed reaction"
 
# Output: "hello", after 0.5 seconds 


# frameInset()
print Utils.frameInset({x:0, y:0, width:100, height:100}, 10) 
# Output {x:10, y:10, width:80, height:80} 

# Utils.interval(interval, handler)
Utils.interval 1, ->
    print "one second"

# .insertCSS()

# Add CSS to a layer by wrapping it in a string and passing it as a parameter
# can't get it to work for anything other than a border
# only works if you put the utils function.

layerD = new Layer
	x: Align.left(30)
	y: Align.center(80)
	height: 100
	width: 100
layerD.classList.add("testClass")

css = """
.testClass {
	border: 20px solid #000;
}
"""

Utils.insertCSS(css)

# not sure what this does :S
# throttle()

handler = Utils.throttle 0.5, ->
    print "hello"
 
for i in [10..100]
    handler()

# not sure what this does :S
# debounce()

handler = Utils.debounce 0.1, ->
    print "hello"
 
for i in [1..100]
    handler()
 
# Output: "hello" only once 


# =================

# .isWebKit()
# .isChrome()
# .isSafari()
# .isTouch()
# .isDesktop()
# .isPhone()
# .isTablet()
# .isMobile()
