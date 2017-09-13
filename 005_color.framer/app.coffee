# Color object can be used to define, detect, modiify and mix colors
# So it ends up being a bit like SASS! :D

# You can animate the background color, text color and shadow color of a layer
# These use HUSL (rgb, hsl and husl supported)

bg = new BackgroundLayer
	backgroundColor: ("hsl(201, 95, 57)")

# Random and models instance

bg.animate
	backgroundColor: Color.random()
#  options:
# colorModel: "rgb" (default husl)


# lighten()
# darken()
# saturate()
# desaturate()
# grayscale()
# gray()
# alpha()
# mix()

# print values

# isColor()
# isColorObject()
# toHexString()
# toRgbString()
