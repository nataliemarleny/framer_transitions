bg = new BackgroundLayer
	backgroundColor: "#ffe3e3"

title = new TextLayer
	text: "Hello {name}"
	x: Align.center
	y: Align.top(50)
	fontSize: 60
	fontFamily: "Helvetica"
	fontWeight: 700
	fontStyle: "bold" # italic, bold or oblique
	padding: 
		top: -10 # default 0
		left: 0
		bottom: 0
		right: 0
	lineHeight: 1.2 # default 0
	letterSpacing: 1.2 # default 0
	wordSpacing: 0 # default 0
	textAlign: "left" # left, right, center
	textTransform: "capitalize" # uppercase, lowercase, capitalise
	textDecoration: "none" # underline, overline, line-through
	textIndent: 1
	direction: "rtl"
	# hmmm
	shadowX: 2
	shadowY: 2
	shadowBlur: 4;
	shadowColor: "rgba (0,0,0,0.2)"
	color: "#e03131"

# set value for template tag
title.template =
	name: "github"

counter = new TextLayer
	text: "{count}"
	x: Align.left(55)
	y: Align.center
	color: "#fa5252"

# format template value to only have 2 decimals.
counter.templateFormatter =
	count: (value) ->
		Utils.round(value, 0)

# animate template value from 0 to 100
counter.animate
	template:
		count: 1000

replace = new TextLayer
	text: "replace"
	x: Align.left(50)
	y: Align.bottom(-50)
	font: "bold, 700, 60px/1, Helvetica" 
	# hmmm 
	# fontStyle fontWeight fontSize/lineHeight fontFamily
	# required: fontSize and fontFamily
	textOverflow: "ellipsis"
	# hmmm
	height: 50
	truncate: true
	color: "#e03131"

# text.textReplace (from, to)
replace.textReplace("replace", "Lorem ipsum dolor sit amet, consectetur adipiscing eli")
