layerA = new Layer

layerA.centerX()
layerA.rotationX = 45
layerA.originX = 0

layerB = new Layer
layerB.skew = 30
layerB.center()
layerB.originY = 0

# with originZ, positive values bring the object closer to you and negative values further away

layerC = new Layer
layerC.centerX()
layerC.centerY(250)
layerC.originZ = -45
layerC.rotationY = 90

