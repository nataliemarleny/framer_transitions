# Custom transition 
# current/next/background - three layers
# back / forward = two states
# if you don't define a specific state, FlowComponent assuems you don't want to animate that layer

scaleTransition = (nav, layerA, layerB, overlay) ->
    transition =
        layerA:
            show:
                scale: 1.0
                opacity: 1
            hide:
                scale: 0.6
                opacity: 0
        layerB:
            show:
                scale: 1.0
                opacity: 1
            hide:
                scale: 0.6
                opacity: 0

# Create layers 
layerA = new Layer
    backgroundColor: "#82c91e"
    size: Screen.size
 
layerB = new Layer
    backgroundColor: "#d8f5a2"
    size: Screen.size

# Create FlowComponent 
flow = new FlowComponent
flow.showNext(layerA)
 
# Switch to layerB with custom transition 
# arguments: flow.transition = (layer, transition, [options.animate] [options.scroll])
layerA.onClick ->
    flow.transition(layerB, scaleTransition)

layerB.onClick ->
    flow.transition(layerA, scaleTransition)

# Custom transition is a function that returns an object with states

# The layer (screen that is currently visable)
# print flow.current