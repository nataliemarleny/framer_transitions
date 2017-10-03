# Color object can be used to define, detect, modiify and mix colors
# So it ends up being a bit like SASS! :D

# You can animate the background color, text color and shadow color of a layer
# These use HUSL (rgb, hsl and husl supported)

violet = new Color("rgba(95,61,196, 1)")
violet2 = new Color(violet).saturate(80) # 10 by default
violet3 = new Color(violet2).desaturate(80) # 10 by default
violet4 = new Color(violet).darken(20)
violet5 = new Color(violet4).lighten(100)
violet6 = violet.grayscale() 
violet7 = Color.gray(0.5)
violet8 = violet.alpha(0.4)
violet9 = Color.mix(violet, violet4, 0.2)
violet10 = Color.random()

bg = new BackgroundLayer
	backgroundColor: violet
#	options:
# 		colorModel: "rgb" (default husl)

animationA = new Animation bg,
	backgroundColor: violet2

animationB = new Animation bg,
	backgroundColor: violet3

animationC = new Animation bg,
	backgroundColor: violet4

animationD = new Animation bg,
	backgroundColor: violet5

bg.onTap ->
	animationA.start()

animationA.on Events.AnimationEnd, animationB.start
animationB.on Events.AnimationEnd, animationC.start
animationC.on Events.AnimationEnd, animationD.start


layerA = new Layer
	x: Align.center
	y: Align.center
	borderRadius: 20
	opacity: 0

animationE = new Animation layerA,
	opacity: 1

animationF = new Animation layerA,
	backgroundColor: violet7

animationG = new Animation layerA,
	backgroundColor: violet8
	borderRadius: 100

animationH = new Animation layerA,
	backgroundColor: violet9

animationI = new Animation layerA,
	backgroundColor: violet10

animationJ = new Animation layerA,
	opacity: 0

animationK = new Animation bg,
	backgroundColor: violet

animationD.on Events.AnimationEnd, animationE.start
animationE.on Events.AnimationEnd, animationF.start
animationF.on Events.AnimationEnd, animationG.start
animationG.on Events.AnimationEnd, animationH.start
animationH.on Events.AnimationEnd, animationI.start
animationI.on Events.AnimationEnd, animationJ.start
animationJ.on Events.AnimationStart, animationK.start

# print values

# isColor()
# isColorObject()
# toHexString()
# toRgbString()
