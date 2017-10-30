# framer_transitions
Reference for Framer Transitions - The Illustrated Framer Docs

Table of Contents
* [001 Align](#001-align-and-offset)
* [002 Animation](#002-animation)
* [003 Background Layer](#003-backgroundlayer)
* [004 Canvas](#004-canvas)
* [005 Color](#005-color)
* 006 Compatibility: basically "Mac OS"
* [007 Defaults](#007-defaults)
* [008 Device](#008-device)
* [009 Draggable](#009-draggable)
* [010 Events (in progress)](#010-events-is-in-progress)
* [011 Extras](#011-extras)
* [012 FlowComponent](#012-flowcomponent)
* [013 Gradient](#013-gradient)
* [014 Layer (in progress)](#014-layer-is-in-progress)
* 015 MIDIComponent: Need a MIDI device to test this
* 016 Modules
* [017 PageComponent](#017-pagecomponent)
* [018 Pinchable](#018-pinchable)
* [019 Print](#019-print)
* [020 RangeSliderComponent](#020-rangeslidercomponent)
* [021 Screen](#021-screen)
* [022 ScrollComponent (in progress)](#022-scrollcomponent-is-in-progress)
* [023 SliderComponent](#023-slidercomponent)
* [024 States](#024-states)
* [025 TextLayer](#025-textlayer)
* [026 Utilities](#026-utilities)
* [027 VideoLayer](#027-videolayer)

## 001 align and offset

| 001 demo | options [5] |
| :---: | :--- |
| ![gif of align transition](https://github.com/nataliemarleny/framer_transitions/blob/master/001_align.framer/001_alignoffset.gif)  | **layerA = new Layer**<br><br> **Align** <ul><li> y: Align.bottom()</li><li> x and y: Align.center()</li><li> x: Align.left()</li><li> x: Align.right()</li><li> y: Align.top()</li></ul> **Offset** <ul><li> y: Align.bottom(-50)</li><li> x and y: Align.center(50)</li><li> x: Align.left(50)<li> x: Align.right(-50)</li><li> y: Align.top(50)</li></ul> |

## 002 animation

| 001 demo | options [8] |
| :---: | :--- |
| ![gif of animate](https://github.com/nataliemarleny/framer_transitions/blob/master/002_animation.framer/002_animate.gif)  | :arrow_upper_right: <ul><li>animationA.start()</li><li>animationC = animationA.reverse()</li><li>options: <br>curve: Bezier(0.25, 0.1, 0.25, 1)</li></ul> **Animatable Properties** <ul><li>x, y, z</li><li>minX, midX, maxX</li><li>minY, midY, maxY</li><li>width, height</li><li>opacity</li><li>rotation, rotationX, rotationY, rotationZ</li><li>scale scaleX, scaleY, scaleZ</li><li>originX, originY, perspective</li><li>scrollX, scrollY</li><li>borderRadius, borderWidth</li><li>shadowX, shadowY, shadowBlur, shadowSpread</li><li>blur, brightness, saturate</li><li>hueRotate, contrast, invert, grayscale, sepia</li></ul> **Not Shown** <ul><li>animation.stop()</li><li>animation.reset()</li><li>animation.restart()</li><li>animation.finish()</li></ul>|

## 003 backgroundLayer

| 003 demo | options [0] |
| :---: | :--- |
| ![gif of backgroundLayer](https://github.com/nataliemarleny/framer_transitions/blob/master/003_backgroundLayer.framer/003_backgroundLayer_.gif)  | **bg = new BackgroundLayer**<br><br> Note: backgroundLayer is overridden by an artboard<br>If it has a parent, it will inherit the size of the parent |

## 004 canvas

| 004 demo | options [10] |
| :---: | :--- |
| ![gif of canvas](https://github.com/nataliemarleny/framer_transitions/blob/master/004_canvas.framer/004_canvas_.gif)  | **Note: Canvas only works when viewing :iphone:**<br><br> :grapes: <ul><li>Canvas.backgroundColor = "#862e9c"</li><li>Canvas.image = "bg-canvas.png"</li></ul> :straight_ruler: - Printed<ul><li>Canvas.width</li><li>Canvas.height</li><li>Canvas.size</li><li>Canvas.frame</li></ul> **Not Shown** <ul><li>Canvas.convertPointToScreen(point)</li><li>Canvas.convertPointToLayer(point, layer)</li></ul>|

## 005 color

| 005 demo | options [16] |
| :---: | :--- |
| ![gif of color](https://github.com/nataliemarleny/framer_transitions/blob/master/005_color.framer/005_color_.gif)  | :art: :iphone: <ul><li>violet = new Color("rgba(95, 61, 196, 1)")</li><li>violet2 = new Color(violet).saturate(80) (default 10)</li><li>violet3 = new Color(violet).desaturate(80) (default 10)</li><li>violet4 = new Color(violet).darken(20)</li><li>violet5 = new Color(violet).lighten(100) (default 10)</li></ul> :ballot_box_with_check: <ul><li> violet6 = violet.grayscale()</li><li> violet7 = Color.gray(0.5)</li></ul> :crystal_ball: <li> violet8 = violet.alpha(0.4)</li><li> violet9 = Color.mix(violet, violet4, 0.2)</li><li>violet10 = Color.random()</li></ul><br> **Not Shown** :printer:<ul><li> Color.isColor() (returns boolean)</li><li> Color.isColorObject() (returns boolean)(value a color string)</li><li> Color.toHexString() (returns hex representation of color)</li><li> Color.toRgbString() (returns rgb representation of color)</li><li>Color.toHSlString() (returns HSL representation of color)</li></ul> |

## 007 defaults

| 007 demo | options [0] |
| :---: | :--- |
| ![gif of defaults](https://github.com/nataliemarleny/framer_transitions/blob/master/007_defaults.framer/007-defaults.gif)  | **Framer.Defaults.Layer.size = 100**<br><br> :large_blue_diamond: :large_blue_diamond:<ul><li>Framer.Defaults.Layer.borderRadius = 12</li><li>Framer.Defaults.Layer.size = 100</li><li>Framer.Defaults.Animation =<br> curve: Spring(damping: 0.75)</li></ul> Replicated layer to demonstrate default change<br><br> :warning:<ul><li>Order default overrides first</li><li>Layers include bg layer</li></ul> |

## 008 device

| 008 demo | options [12] |
| :---: | :--- |
| ![gif of device](https://github.com/nataliemarleny/framer_transitions/blob/master/008_device.framer/008-device.gif)  | :iphone: <ul><li>Framer.Device.customise()</li><li>Framer.Device.Type.Phone</li></ul> :leftwards_arrow_with_hook:<ul><li>Framer.Device.orientationName = "landscape"</li></ul> **Not Shown But Similar** <ul><li>.orientation</li><li>.setOrientation()</li><li>.rotateLeft()</li><li>.rotateRight()</li></ul> **Not Shown** <ul><li>.fullScreen</li><li>.deviceScale</li><li>.setDeviceScale</li><li>.contentScale</li><li>.setContentScale()</li></ul>|

## 009 draggable

| 009 demo | options [29] |
| :---: | :--- |
| ![gif of draggable](https://github.com/nataliemarleny/framer_transitions/blob/master/009_draggable.framer/009-draggable.gif)  | **layerA.draggable.enabled = true**<br><br> 1st :arrow_up_down: 2nd :arrows_counterclockwise: 3rd :arrows_clockwise: <ul><li> .draggable.enabled = true</li></ul> :arrow_up_down: <ul><li> .draggable.horizontal = false</li><li> .draggable.speedY = 1.1 (< 1 is slower than mouse movement)</li><li> .draggable.constraints = </li> - y:100<br> - height: 50<li> print \<layer\>.draggable.constraintsOffset</li><li> print \<layer\>.draggable.isBeyondConstraints</li> <li> .draggable.overdrag = true</li><li> .draggable.overdragScale = 0.25</li><li> .draggable.bounce = true (default true)</li><li> .draggable.bounceOptions = </li> - friction: 40,<br> - tension: 200,<br> - tolerance: 0.0001<li> \<layer\>.draggable.on Events.DragMove :arrow_right:</li> - print.\<layer\>.draggable.direction</ul> :arrows_counterclockwise: <ul><li> .draggable.momentum = true (default true)</li><li> .draggable.momentumOptions = </li> - friction: 2.1<br> - tolerance: 0.1 <li> \<layer\>.draggable.on Events.DragMove :arrow_right:</li>- print \<layer\>.draggable.velocity<br>- print \<layer\>.draggable.angle</ul> **Not Shown** <ul><li> .draggable.vertical = false</li><li> .draggable.speedX = 0.5</li></ul> :arrows_clockwise: <ul><li> print \<layer\>.draggable.angle</li><li> print \<layer\>.draggable.updatePosition() (increments 20px)</li><li>print \<layer\>.draggable.directionLock = true</li><li> print \<layer\>.draggable.directionLockThreshold =<br>x: 10<br>y: 20</li><li>print \<layer\>.draggable.pixelAlign = true</li><li>print \<layer\>.draggable.isDragging (check if layer is being dragged)</li><li> isMoving</li><li> print \<layer\>.draggable.offset (get x and y layer position)</li><li> print \<layer\>.draggable.layerStartPoint (start x and y)</li><li> print \<layer\>.draggable.cursorStartPoint (x and y of cursor)</li><li>print \<layer\>.draggable.layerCursorOffset</li><li>print \<layer\>.draggable.propagateEvents = false<br>**this one let you to drag a layer without affecting scrollComponent!**</li></ul> |
 
 ## 010 events is in progress

| 010 demo 1 | options [1 - 4 / 22] |
| :---: | :--- |
| **Events 1**<br>Tap . LongPress . Swipe . Pinch<br><br> ![gif of events tap longpress swipe pinch](https://github.com/nataliemarleny/framer_transitions/blob/master/010_events/010_events1.framer/010_events_1.gif)  | **[1] Tap**<ul><li>.onTap / .onSingleTap</li><li>.onDoubleTap</li></ul> **[3] LongPress** <ul><li>.onLongPress</li><li>.onLongPressStart</li><li>.onLongPressEnd</li></ul> **[4] Swipe** <ul><li>.onSwipeUp / .onSwipeUpStart / .onSwipeUpEnd</li><li>.onSwipeRight /.onSwipeRightStart /.onSwipeRightEnd</li><li>.onSwipeDown / .onSwipeDownStart /.onSwipeDownEnd</li><li>.onSwipeLeft /.onSwipeLeftStart /.onSwipeLeftEnd</li></ul> **[6] Pinch** <ul><li>.Pinch / .PinchStart / .PinchEnd</li></ul>|
 
| 010 demo 2 | options [5 - 9 / 22] |
| :---: | :--- |
| **Events 2**<br>Scale . Rotate . Touch . Click . Mouse<br><br> ![gif of scale rotate touch click mouse](https://github.com/nataliemarleny/framer_transitions/blob/master/010_events/010_events2.framer/010_events_2.gif)  | **[7] Scale** <ul><li>.Scale / .ScaleStart / .ScaleEnd</li></ul> **[8] Rotate** <ul><li> .Rotate / RotateStart / .RotateEnd</li></ul> **[9] Touch** <ul><li>.TouchStart / .TouchMove / .TouchEnd</li></ul> **[10] Click**<ul><li>.Click (or touch - no delay on mobile)</li></ul> **[11] Mouse** <ul><li>.MouseUp / .MouseDown</li><li>.MouseOver / .MouseOut (unhover with mouse cursor)</li><li>.MouseMove / .MouseWheel</li></ul>|

| 010 demo 3 | options [10 - 13 / 22] |
| :---: | :--- |
| **Events 3**<br>Animation . State . Drag . Scroll<br><br> ![gif of events animation . state . drag . scroll](https://github.com/nataliemarleny/framer_transitions/blob/master/010_events/010_events3.framer/010_events3.gif)  | **[12] Animation** <ul><li>.AnimationStart / .AnimationStop / .AnimationEnd</li></ul> **[13] State** <ul><li>.StateSwitchStart</li><li>.StateSwitchStop / .StateSwitchEnd</li></ul> **[14] Drag** <ul><li>.Move (the layer is moving)</li><li>.Drag / .DragStart / .DragEnd </li><li> .DragAnimationStart / .DragAnimationEnd</li><li> .DirectionLockStart (Did start lock direction?)</li></ul> **[15] Scroll** <ul><li>.Move (the layer is moving)</li><li>.Scroll / .ScrollStart / .ScrollEnd</li><li>.ScrollAnimationDidStart / .ScrollAnimationDidEnd</li></ul>|

| 010 demo 4 | options [14 - 16 / 22] |
| :---: | :--- |
| **Events 4**<br>EdgeSwipe . Transition . Value <br><br> ![gif of events value](https://github.com/nataliemarleny/framer_transitions/blob/master/010_events/010_events4.framer/010_events4.gif)  | **[16] EdgeSwipe** <ul><li>.EdgeSwipe / .EdgeSwipeStart / .EdgeSwipeEnd</li><li>.EdgeSwipeTop / .EdgeSwipeTopStart / .EdgeSwipeTopEnd</li><li>.EdgeSwipeRight / .EdgeSwipeRightStart / .EdgeSwipeRightEnd</li><li>.EdgeSwipeBottom / .EdgeSwipeBottomStart / .EdgeSwipeBottomEnd</li><li>.EdgeSwipeLeft / .EdgeSwipeLeftStart / .EdgeSwipeLeftEnd</li></ul> **[18] Value (used for sliders :white_circle:)** <ul><li>.SliderValueChange</li><li>.SliderMinValueChange (range slider only)</li><li>.SliderMaxValueChange (range slider only)</li></ul> <br>**To Add**<br> **[17] Transition** <ul><li>.TransitionStart</li><li>.TransitionHalt / .TransitionStop / .TransitionEnd</li></ul>|

| 010 demo 5 | options [17 - 20 / 22] |
| :---: | :--- |
|  **Events 5**<br> Change . Gesture Event . touchEvent() . wrap()<br><br> ![gif of eventswrap](https://github.com/nataliemarleny/framer_transitions/blob/master/010_events/010_events5wrap.framer/010_eventswrap.gif) | **[22] wrap()** <ul><li>Wrap a given DOM Element - use to bind events to arbitrary dom elements<br>Events.wrap(window).addEventListener "resize", (event) -><br> - print "Page is resizing"</li></ul><br>**To Add** <br>**[19] Change - listen to properties as they change** <ul><li>layerA.on "change:x", -></li><li>layerA.on "change:y", -></li><li>layerA.on "change:point", -></li><li>layerA.on "change:width", -></li><li>layerA.on "change:height", -></li><li>layerA.on "change:size", -></li><li>layerA.on "change:frame", -></li><li>layerA.on "change:scale", -></li><li>layerA.on "change:rotation", -></li><li>layerA.on "change:borderRadius", -></li><li>layerA.on "change:currentPage", -></li><li>layerA.on "change:style", -></li><li>layerA.on "change:html", -></li><li>layerA.on "change:children", -></li><li>layerA.on "change:parent", -></li></ul> **[20] Gesture Event Properties** <br><br> **Positioning**<ul><li>event.point (current x and y position)</li><li>event.start / event.previous ([] x and y position)</li></ul>**Offset** <ul><li>.offset (current x and y offset)</li><li>.offsetTime / .offsetAngel / .offsetDirection</li></ul> **Deltas**<ul><li>.delta (offset since last event)</li><li>.deltaTime / .deltaAngle / .deltaDirection</li></ul> **Velocity & Force**<ul><li>.velocity (current speed)</li><li>.force (current pressure sensitivity of a tap)</li></ul> **Input** <ul><li>.fingers (amount of fingers on screen! :hand: )</li><li>.touchCenter / .touchDistance / .touchOffset</li></ul> **Scale & Rotation** <ul><li>.scale (scale value from two fingers</li><li>.scaleDirection / .scaleRotation</li></ul> **[21] touchEvent()** <ul><li>Extract the touch event from a given event on mobile</li></ul> |

| 010 demo 6 | options [20 - 22 / 22] |
| :---: | :--- |
| **Events 6**<br>Force Tap . Pan <br><br> ![gif of events value](https://github.com/nataliemarleny/framer_transitions/blob/master/010_events/010_events4.framer/010_eventsvalue.gif)  | **[2] Force Tap** :iphone: <ul><li>.onForceTap / .onForceTapStart</li><li>.onForceTapChange</li><li>.onForceTapEnd</li></ul> **[5] Pan** :iphone: <ul><li>.Pan / .PanStart / .PanMove / .PanEnd</li><li>.PanLeft / .PanRight / .PanUp / .PanDown</li></ul>|

## 011 extras

| 011 demo | options [02] |
| :---: | :--- |
| ![gif of extras](https://github.com/nataliemarleny/framer_transitions/blob/master/011_extras.framer/011_extras.gif) | **Framer.Extras.Hints.enable()**<br><br> :id: **Hints can be customised** <ul><li>Framer.Extras.Hints.enable()</li>If you want your hints to show immediately: <li>Framer.Extras.Hints.showHints()</li></ul> :clock10: **Preloader - only enabled outside of Framer, i.e. mirroring** <ul><li>Framer.Extras.Preloader.enable()</li><li>Framer.Extras.Preloader.setLogo()</li></ul>|

## 012 flowcomponent

| 012 demo | options [12] |
| :---: | :--- |
| ![gif of flowcomponent](https://github.com/nataliemarleny/framer_transitions/blob/master/012_flowComponent/012_flowComponent.framer/012_flowComponent1.gif)![gif of flowcomponent transition](https://github.com/nataliemarleny/framer_transitions/blob/master/012_flowComponent/012_flowComponent2.framer/012_flowComponent2.gif)| **flow = new FlowComponent**<br><br> :green_book: <ul><li>flow.showNext(layerB, animate: true)</li><li>flow.showPrevious(animate: true)</li><li>scroll - have to be careful about order</li></ul> **Header and Footer** <ul><li>header (creates a sticky header)<br><br>navBar = newLayer<br>flow.header = navBar</li><br><li>footer (creates a sticky footer)<br><br>tabBar = new Layer<br>flow.footer = tabBar</li></ul> **Overlays** <ul><li>flow.showOverlayCenter(modal, modal: true)</li><li>flow.showOverlayTop(notification)</li><li>hamburger.onTap -><br>flow.showOverlayLeft(swipeMenu)</li></ul> **Not shown but similar** <ul><li>.showOverlayRight()</li><li>.showOverlayBottom()</li></ul> :beginner: <ul><li>flow.transition = (layer, transition, [options.animate] [options.scroll])</li><li>Custom transition is a function that returns an object with states</li><li>This gif shows a custom transition function from Framer Docs</li></ul>**Not Shown** :printer: <li>print flow.current (shows current page)</li></ul>|

## 013 gradient

| 013 demo | options [3] |
| :---: | :--- |
| ![gif of gradient transition](https://github.com/nataliemarleny/framer_transitions/blob/master/013_gradient.framer/013-gradient.gif) | :banana: <ul><li> start: "#fff9db"</li><li> end: "#ffd43b"</li></ul> :sunrise:<ul><li> angle: 45</li><li>start: "#e67700"</li><li>end: "#ffe066"</li><li> Animatable: YES (animated angle: (180+45)</li></ul> |

## 014 layer is in progress

| 014 demo | options [95] |
| :---: | :--- |
| :large_orange_diamond: **NAME - SIZE - COLOR - BORDER - 2D ROTATION** <br> [A] z, hueRotate (0 to 360)<br> [B] gradient, visible = true, name = "square1" <br> (can inherit from sketch import) <br> [C] borderRadius, borderWidth, borderColor, image, brightness <br> [D] contrast <br> [E] saturate <br> [F] invert, opacity <br> [G] grayscale <br> [I] scale, sepia <br><br> ![gif of layer - size/color/shape](https://github.com/nataliemarleny/framer_transitions/blob/master/014_layer/014_layer1.framer/014-layer1.gif) | :large_orange_diamond:<br>**NAME - SIZE - COLOR - BORDER - 2D ROTATION** <ul><li>id </li><li>name</li><li>x / y / z </li><li>width / height</li><li>minX / midX / maxX</li><li>minY / midY / maxY</li><li>size</li><li>scale / scaleX / scaleY</li><li>frame</li><li>props</li><li>backgroundColor / gradient / image</li><li>visible</li><li>opacity</li><li>brightness</li><li>saturate</li><li>hueRotate</li><li>contrast</li><li>invert</li><li>grayscale</li><li>sepia</li><li>borderRadius / borderColor / borderWidth</li><li>rotation</li><li>rotationZ</li></ul> |

| 014 demo | options [95] |
| :---: | :--- |
| :chicken: :hatching_chick: **PARENTS - CHILDREN**<br><br> ![gif of layer - parents](https://github.com/nataliemarleny/framer_transitions/blob/master/014_layer/014_layer2.framer/014-layer2.gif)| :chicken: :hatching_chick: <br>**PARENT - CHILDREN** <ul><li>parent</li><li>children (READ ONLY)</li><li>childrenWithName()</li><li>siblings</li><li>siblingsWithName()</li><li>descendants</li><li>ancestors()</li><li>addChild()</li><li>removeChild()</li></ul>|

| 014 demo | options [95] |
| :---: | :--- |
| :first_quarter_moon: **POSITIONING - FRONT - BACK**<br><br> ![gif of layer - positioning](https://github.com/nataliemarleny/framer_transitions/blob/master/014_layer/014_layer3.framer/014_layer3.gif)| :first_quarter_moon: **POSITIONING - FRONT - BACK** <ul><li>index</li><li>placeBefore()</li><li>placeBehind()</li><li>bringToFront()</li><li>sendToBack()</li></ul>|

| 014 demo | options [95] |
| :---: | :--- |
| :dizzy: **ANIMATION - STATES**<br><br>![gif of layer - animation and states](https://github.com/nataliemarleny/framer_transitions/blob/master/014_layer/014_layer4.framer/014_layer4-2.gif)|:dizzy: **ANIMATION - STATES** <ul><li>animate</li><li>animationOptions</li></ul>**animationOptions Properties**<br>**(these set the options for all animations performed on the layer unless they are overruled)**<br><ul><li>curve</li><li>curveOptions</li><li>time</li><li>delay</li><li>repeat</li><li>colorModel</li><li>instant</li></ul><br><ul><li>animations()</li><li>isAnimating (read only, boolean)</li><li>stateSwitch()</li><li>stateCycle()</li><li>stateNames</li></ul>**Not Showm**<br><ul><li>animateStop()</li></ul> **EXTRA** <ul><li>computedStyle()[specific] (note - computationally expensive)</li></ul>|

| 014 demo | options [95] |
| :---: | :--- |
|:waning_gibbous_moon: **SHADOWS - BLENDING**<br><br> ![gif of layer - shadows and blending](https://github.com/nataliemarleny/framer_transitions/blob/master/014_layer/014_layer5.framer/014_layer5.gif) | :waning_gibbous_moon: **SHADOWS - BLENDING** <ul><li>blur</li><li>backgroundBlur (couldn't tell any difference, does not work all the time)</li><li>shadows</li><li>shadowX</li><li>shadowY</li><li>shadowBlur</li><li>shadowSpread (adjusted in animation from 1 to 10)</li><li>shadowColor</li><li>shadowType</li></ul> **Blending - TO ADD**<ul><li>[ ] blending</li></ul>**OPTIONS**<ul><li>Blending.normal (default blending mode)</li><br><li>Blending.darken</li><li>Blending.multiply</li><li>Blending.colorBurn</li><br><li>Blending.lighten</li><li>Blending.screen</li><li>Blending.colorDodge</li><br><li>Blending.overlay</li><li>Blending.softLight</li><li>Blending.hardLight</li><br><li>Blending.difference</li><li>Blending.exclusion</li><br><li>Blending.hue</li><li>Blending.saturation</li><li>Blending.color</li><li>Blending.luminosity</li>|

| 014 demo | options [95] |
| :---: | :--- |
| | **CONVERTPOINTTOCANVAS()** <ul><li>[ ] point</li><li>[ ] convertPointToCanvas()</li><li>[ ] convertPointToScreen()</li><li>[ ] convertPointToLayer()</li></ul> **EVENTS**<ul><li>[ ] on()</li><li>[ ] off()</li><li>[x] ignoreEvents (default true)(auto disabled when add events listener)</li></ul>|

| 014 demo | options [95] |
| :---: | :--- |
| | **DYNAMIC CENTERING** <ul><li>[ ] center()</li><li>[ ] centerX()</li><li>[ ] centerY()</li><li>[ ] pixelAlign()</li></ul> **FRAMES** <ul><li>[ ] screenFrame</li><li>[ ] contentFrame()</li><li>[ ] centerFrame()</li></ul> **MOVING AROUND** <ul><li>[ ] originX</li><li>[ ] originY</li><li>[ ] originZ</li><li>[ ] perspective</li><li>[ ] flat</li><li>[ ] backfaceVisible</li><li>[ ] rotationX</li><li>[ ] rotationY</li></ul> |

| 014 demo | options [95] |
| :---: | :--- |
| :computer: **HTML AND CSS**<br><br> ![gif of layer - html and css](https://github.com/nataliemarleny/framer_transitions/blob/master/014_layer/014_layer8.framer/014layer_8.gif)| :computer: **HTML AND CSS** <ul><li>clip (disabled by default - if parent clips children)</li><li>html (best to use this in conjunction with ignoreEvents = false)<br>Remeber: only available after Framer has rendered them<br>Used to insert html content into a layer</li><li>style (get CSS variables for a property)</li><li>classList</li><li>destroy()(remove a layer and its children)</li><li>copy()(note: will not copy layer listeners)</li><li>copySingle()(copies a layer without its children)</li><li>color (as with css - this is for text and not background layer)</li></ul>|

## 017 pageComponent

| 017 demo | options [14] |
| :---: | :--- |
| ![gif of pageComponent](https://github.com/nataliemarleny/framer_transitions/blob/master/017_pageComponent/017_pageComponent2.framer/017_pageComponent.gif)  | **page = new PageComponent**<br><br> :evergreen_tree::green_heart: <ul><li>page.addPage(layername, "right")</li><li>page.originX</li><li>page.originY</li><li>page.velocityThreshold = 5<br>switch to be based on distance</li><li>page.animationOptions = <br>- curve: Bezier.ease<br>- time: 1</li><li>page.currentPage (read only)</li><li>page.closestPage (read only)</li><li>page.previousPage</li><li>page.snapToPage(<br>- pageFive<br>- true<br>- animationOptions = time: 2<br>)</li><li>page.snapToNextPage (page, animate, animationOptions )</li><li>page.snapToPreviousPage(direction, animate, animationOptions)</li><li>page.horizontalPageIndex(pageThree)</li><li>page.verticalPageIndex(pageThree)</li></ul> **To Add** <ul><li>.nextPage()</li></ul>|

## 018 pinchable

| 018 demo | options [11] |
| :---: | :--- |
| ![gif of pinchable transition](https://github.com/nataliemarleny/framer_transitions/blob/master/018_pinchable.framer/018-pinchable.gif)  | **layerA.pinchable.enabled = true**<br><br> :evergreen_tree::green_heart:<ul><li> pinchable.centerOrigin = false (t default)</li><li> pinchable.minScale = 0.9</li><li> pinchable.maxScale = 2</li></ul> :evergreen_tree:<ul><li> pinchable.threshold = 6</li><li> pinchable.rotate = false (t default)</li> <li> pinchable.scaleFactor = 1.2</li></ul> :green_heart: <ul><li> pinchable.rotateIncrements = 15</li><li> pinchable.rotateFactor = 0.5</li></ul> **Not Shown** <ul><li>pinchable.scaleIncrements = 0.5</li><li> pinchable.scale = false (t default)</li></ul>|

## 019 print

| 019 demo | options [0] |
| :---: | :--- |
| ![gif of print](https://github.com/nataliemarleny/framer_transitions/blob/master/019_print.framer/019_print.gif) | Acts in a similar manner to console.log() in JavaScript.<br><br> Want to use this section to show print in context |

## 020 rangeSliderComponent

| 020 demo | options [10] |
| :---: | :--- |
| ![gif of rangeSliderComponent](https://github.com/nataliemarleny/framer_transitions/blob/master/020_rangeSliderComponent.framer/020-rangeslidercomponent.gif) | **range = new RangeSliderComponent**<br><br> :heavy_minus_sign:  RangeSliderComponent <ul><li> min: 0 (0 default)</li><li> max: 10 (1 default)</li><li> minValue: 2 (0 default)</li><li> maxValue: 8 (0.5 default)</li></ul> :cyclone: <ul><li>range.fill.backgroundColor = "#EF2D56"</li></ul>:white_circle:  :white_circle:<ul><li> range.knobSize = 30 (30 default)</li><li> range.minKnob.draggable.momentum = false (t default)</li><li> range.maxKnob.draggable.momentum = false (t default)</li></ul> :zap:<ul><li> range.animateToMinValue(1)</li><li> range.animateToMaxValue(9)</li></ul>

## 021 screen

| 021 demo | options [10] |
| :---: | :--- |
| ![gif of screen](https://github.com/nataliemarleny/framer_transitions/blob/master/021_screen.framer/021-screen.gif) | :barber: <ul><li>.backgroundColor</li></ul> :large_blue_diamond: <ul><li>Screen.perspective = 1000 (1200 by default)</li><li>Screen.perspectiveOriginX = 1 (default 0.5)</li><li>Screen.perspectiveOriginY = 1 (default 0.5)</li></ul> :printer::iphone: (not shown, read only) <ul><li>Screen.size</li><li>Screen.frame (read only)</li></ul> :iphone: - not shown: <ul><li>Screen.width</li><li>Screen.height</li></ul>  **Not Shown/Not Sure**<ul><li>Screen.convertPointToCanvas(point)</li><li>Screen.convertPointToLayer(point, layer)</li></ul>

## 022 scrollComponent is in progress

| 022 demo | options [28] |
| :---: | :--- |
| **Version 1**<br><br>![gif of scrollcomponent](https://github.com/nataliemarleny/framer_transitions/blob/master/022_scrollComponent/022_scrollcomponent.framer/022-scroll.gif) | **scroll = new ScrollComponent**<br><br>**Introduction**<ul><li>ScrollComponent is built with two layers</li><li>The scroll component itself masks another layer</li></ul><br> :scroll: **Version 1: Built Primarily in Design Mode** <ul><li>.scroll: true</li><li>.scrollVertical: true</li><li>.scrollHorizontal: false</li><li>.speedX: 1 (default 1)</li><li>.mouseWheelEnabled: true (default f)</li><li>.contentInset = <br> - top: 150<br>gives content extra padding between the constraints and actual content layers</li></ul> **Version 2: Built entirely in Code Mode**<ul><li>scroll.directionLock = true <br>(only allows scrolling in one direction at a time)</li><li></li></ul> **To Add** <ul><li>layerA.parent = scroll.content<br>.content is the layer content is added to</li><li>.speedY: 1 (default 1)</li><li>.scrollX</li><li>.scrollY</li><li>.scrollPoint</li><li>.scrollFrame</li><li>.velocity</li><li>.direction</li><li>.directionLockThreshold</li><li>.angle</li><li>.isDragging</li><li>.isMoving</li><li>.closestContentLayer()</li><li>.closestContentLayerForScrollPoint()</li><li>.scrollToPoint</li><li>.scrollToLayer</li><li>.scrollToClosestLayer()</li><li>.wrap() !!!!</li><li>.updateContent()</li><li>.copy</li><li>.propagateEvents</li></ul>

## 023 sliderComponent

| 023 demo | options [9] |
| :---: | :--- |
| ![gif of sliderComponent](https://github.com/nataliemarleny/framer_transitions/blob/master/023_sliderComponent.framer/023_sliderComponent_.gif) | **slider = new SliderComponent** <br><br> :heavy_minus_sign: <ul><li> silder.backgroundColor = "#e599f7"</li><li> slider.fill.backgroundColor = "#be4bdb"</li></ul>:white_circle:<ul><li> silder.knob.backgroundColor = "#FCF7FF"</li><li> slider.knobSize = 45 (30 default)</li><li> slider.knob.draggable.momentum = false (t default)</li></ul> :1234:<ul><li> silder.min = 0 (0 default)</li><li> slider.max = 100 (1 default)</li></ul> :zap: <ul><li> silder.animateToValue(20, {curve: Spring } )</li></ul> **Not Shown: To Add** <ul><li> silder.pointForValue</li><li> slider.valueForPoint</li></ul> |

## 024 states

| 024 demo | options [2] |
| :---: | :--- |
| ![gif of states](https://github.com/nataliemarleny/framer_transitions/blob/master/024_states.framer/024-states.gif) |<ul><li>Default<br>The initially active state</li><li>Current<br>The currently active state</li><li>Previous <br> The previously active state</li></ul> |

## 025 textLayer

| 025 demo | options [24] |
| :---: | :--- |
| ![gif of textLayer](https://github.com/nataliemarleny/framer_transitions/blob/master/025_textLayer.framer/025-textlayer.gif) | **title = new TextLayer**<br><br> :abcd: TextLayer<ul><li> text: Hello {name}</li><li> fontSize: 60</li><li> fontFamily: "Helvetica"</li><li> fontWeight: 700</li><li> fontStyle: "bold" (italic / bold / oblique)</li><li> padding:</li> - top: -10 (default 0)<br>- left: 0<br>- bottom: 0<br>- right: 0<li> lineHeight: 1.2 (0 default)</li><li> letterSpacing: 1.2 (0 default)</li><li> wordSpacing: 0 (default 0)</li><li> textAlign: "left" (left, right, center)</li><li> textTransform: "capitalize" (uppercase, lowercase, capitalize)</li><li> textDecoration: "none"</li><li> textIndent: 1</li><li> shadowX: 2</li><li> shadowY: 2</li><li> shadowBlur: 4;</li><li> shadowColor: "rgba (0,0,0,0.2)"</li></ul> :octocat: <ul><li>.template =</li> - name: "github"</ul> :1234: <ul><li>.templateFormatter = </li> count: (value) -><br> - Utils.round(value, 0) <li>.animate</li> -template:<br>count: 1000</ul> :twisted_rightwards_arrows: <ul><li>.textReplace("replace", "Lorem ipsum dolor sit")</li> ("from", "to") <li> truncate: true</li><li> height: 50</li></ul> **Not Shown: To Troubleshoot** <ul><li> textOverflow: "ellipsis"</li> - truncate boolean worked however<li> font: "bold, 700, 60px/1, Helvetica"</li> - (fontStyle fontWeight fontSize*/lineHeight fontFamily*) <br> * = mandatory</ul> |

## 026 utilities

| 026 demo | options [23] |
| :---: | :--- |
| ![gif of utilities](https://github.com/nataliemarleny/framer_transitions/blob/master/026_utilities.framer/026_utilities.gif) | :arrow_double_up: <ul><li>Utils.modulate()</li> used here for parallax scroll</ul> :black_nib: <ul><li>Utils.loadWebFont("Bungee Shade")</li><li>Utils.loadWebFont("Roboto", 700)</li></ul>:1234:<ul><li>text.text = Utils.round(Utils.randomNumber(0, 100), 2)</li></ul> :rainbow:<ul><li>.backgroundColor = Utils.randomColor(1)</li></ul> :flashlight:<ul><li>Utils.labelLayer(layer, "Hello")</li></ul> :camera:<ul><li>.image = Utils.randomImage()</li><li>Utils.randomImage(Layer)</li>(clips to layer)</ul>:black_square_button: (only works for border?)<ul><li>layer.classList.add("testClass")<li>css = {...;}</ul> :mag: **Printed Items** <ul><li>Utils.cycle(["a", "b", "c"])</li><li>Utils.randomChoice([":banana:",":apple:",":watermelon:"])</li><li>Utils.delay 0.5, -></li>print "delayed reaction"<li>print Utils.frameInset({x:0, y:0, width:100, height:100}, 10) </li><li>Utils.interval 1, -></li>print "one second"<li>handler = Utils.throttle 0.5, -></li>print "hello"<br>for i in [10...100]<br>handler()<li>handler = Utils.debounce 0.1, -></li>print "hello"<br>for i in [1..100]<br>handler()</ul> **Not Shown - these return a boolean** <ul><li> Utils.isWebKit()</li><li> Utils.isChrome()</li><li> Utils.isSafari()</li><li> Utils.isTouch()</li><li> Utils.isDesktop()</li><li> Utils.isPhone()</li><li> Utils.isTablet()</li><li> Utils.isMobile()</li></ul> |

## 027 videoLayer

| 027 demo | options [2] |
| :---: | :--- |
| ![gif of videoLayer](https://github.com/nataliemarleny/framer_transitions/blob/master/027_videolayer.framer/027_videolayer_update.gif) | **layerA = new VideoLayer** <br><br> :movie_camera: <ul><li> new VideoLayer: </li> video: "name.mp4"<li> .player.autoplay = true</li><li> .player.fastSeek(2)</li></ul>

## To complete:
<ul>
 <li>[ ] Understand point to canvas commands</li>
 <li>[ ] Use folds to improve readability of raw framer files</li>
 <li>[ ] Investigate 016 Modules</li>
 <li>[ ] Investigate 015 MIDI Component</li>
</ul>

## Credits:
RayPS - iPhone X Framer device mockup from: https://gist.github.com/RayPS/0a21af6cf3b0578ffab62c604b5ea6e2

