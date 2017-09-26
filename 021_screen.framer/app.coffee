Screen.backgroundColor = "#FFFCF9"

# size covers the width and height variables
print Screen.size
# print Screen.width
# print Screen.height

# frame is read only
print Screen.frame

# Rotate layer in 3D 
layerA = new Layer
    rotationX: 30
    x: 100
    y: 20
    backgroundColor: "#28affa"
 
# Adjust perspective 
Screen.perspective = 1000 #1200 default

# Rotate layer in 3D 
layerB = new Layer
    rotationX: 30
    x: 100
    y: 180
    backgroundColor: "rgba(118,214,255,1)"
 
# Set horizontal perspective origin 
# sets x origin for 3D transformations
# 0 is the left edge, 1 is right edge
Screen.perspectiveOriginX = 1 # default 0.5

# Rotate layer in 3D 
layerC = new Layer
    rotationX: 30
    x: 100
    y: 100
    backgroundColor: "rgba(0,150,255,1)"
 
# Set vertical perspective origin 
Screen.perspectiveOriginY = 1 # default 0.5


layer = new Layer
	height: 689

# point =
#     x: 20
#     y: 40

# pointInCanvas = Screen.convertPointToCanvas(point)

# point =
#     x: 20
#     y: 40
#     z: 200
# pointInLayer = Screen.convertPointToLayer(point, layer)



