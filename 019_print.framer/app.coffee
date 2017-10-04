# Print allows you to inspect variables in runtime
# Works similarly to console.log()
# Difference - with print, output is shown DIRECTLY in the prototype

bg = new BackgroundLayer
	backgroundColor: "#22b8cf"

print "Hello"

layerA = new Layer
    x: Align.center()
    y: 50
    borderRadius: 10
    backgroundColor: "#0c8599"
 
# A single property value 
print layerA.x
# Output: 10 
 
# Multiple values 
print layerA.x, print layerA.y
# Output: 10, 20 