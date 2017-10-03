# framer_transitions
Reference for Framer Transitions - Illustrated Framer Docs
- Status: In Progress

Table of Contents
* [001 Align](#001-align-and-offset)
* [002 Animation](#002-animation-is-in-progress)
* [003 Background Layer](#003-backgroundlayer)
* [004 Canvas](#004-canvas)
* [005 Color](#005-color)
* 006 Compatibility: basically "Mac OS"
* [007 Defaults](#007-defaults)
* [008 Device](#008-device)
* [009 Draggable](#009-draggable-is-in-progress)
* [010 Events](#010-events-is-in-progress)
* 011 Extras
* 012 FlowComponent
* [013 Gradient](#013-gradient)
* 014 Layer
* 015 MIDIComponent: Need a MIDI device to test this
* 016 Modules
* 017 PageComponent
* [018 Pinchable](#018-pinchable)
* 019 Print
* [020 RangeSliderComponent](#020-rangeslidercomponent)
* [021 Screen](#021-screen)
* [022 ScrollComponent](#022-scrollcomponent-is-in-progress)
* [023 SliderComponent](#023-slidercomponent)
* 024 States
* [025 TextLayer](#025-textlayer)
* [026 Utilities](#026-utilities)
* [027 VideoLayer](#027-videolayer)

## 001 align and offset

| 001 demo | options [5] |
| :---: | :--- |
| ![gif of align transition](https://github.com/nataliemarleny/framer_transitions/blob/master/001_align.framer/001_alignoffset.gif)  | **Align** <ul><li> Align.bottom()</li><li> Align.center()</li><li> Align.left()</li><li> Align.right()</li><li> Align.top()</li></ul> **Offset** <ul><li> Align.bottom(-50)</li><li> Align.center(50)</li><li> Align.left(50)<li> Align.right(-50)</li><li> Align.top(50)</li></ul> |

## 002 animation is in progress

| 001 demo | options [8] |
| :---: | :--- |
| ![gif of animate](https://github.com/nataliemarleny/framer_transitions/blob/master/002_animation.framer/002_animate.gif)  | <ul><li>animation.start()</li><li>animation.stop()</li><li>animation.reverse()</li><li>animation.reset()</li><li>animation.restart()</li><li>animation.finish()</li></ul> **Not Shown** <ul><li>curve</li><li>properties</li></ul>|

## 003 backgroundLayer

| 003 demo | options [0] |
| :---: | :--- |
| ![gif of backgroundLayer](https://github.com/nataliemarleny/framer_transitions/blob/master/003_backgroundLayer.framer/003_backgroundLayer_.gif)  | Note: backgroundLayer is overridden by an artboard<br>If it has a parent, it will inherit the size of the parent |

## 004 canvas

| 004 demo | options [10] |
| :---: | :--- |
| ![gif of canvas](https://github.com/nataliemarleny/framer_transitions/blob/master/004_canvas.framer/004_canvas.gif)  | **Note: Canvas only works when viewing :iphone:**<br><br> :mount_fuji:<ul><li>Canvas.backgroundColor = "#DD1155"</li><li>Canvas.image = Utils.randomImage()</li></ul> :straight_ruler: - Printed<ul><li>Canvas.width</li><li>Canvas.height</li><li>Canvas.size</li><li>Canvas.frame</li></ul> **Not Shown** <ul><li>Canvas.convertPointToScreen(point)</li><li>Canvas.convertPointToLayer(point, layer)</li></ul>|

## 005 color

| 005 demo | options [16] |
| :---: | :--- |
| ![gif of color](https://github.com/nataliemarleny/framer_transitions/blob/master/005_color.framer/005_color.gif)  | Colors in Framer are similar to SASS! <br><br>:art: <ul><li>bg.animate</li>- backgroundColor: Color.random()</ul>**Not Shown**<ul><li> lighten()</li><li> darken()</li><li> saturate()</li><li> desaturate()</li><li> grayscale()</li><li> gray()</li><li> alpha()</li><li> mix()</li></ul> :printer:<ul><li> isColor()</li><li> isColorObject()</li><li> toHexString()</li><li> toRgbString()</li></ul> |

## 007 defaults

| 007 demo | options [0] |
| :---: | :--- |
| ![gif of defaults](https://github.com/nataliemarleny/framer_transitions/blob/master/007_defaults.framer/007_defaults.gif)  | :a: :b:<ul><li>Framer.Defaults.Layer.backgroundColor = red</li><li>Framer.Defaults.Layer.borderRadius = 12</li><li>Framer.Defaults.Animation =</li> curve: Spring(damping: 0.75)</ul><br> Replicated layer to demonstrate default change |

## 008 device

| 008 demo | options [12] |
| :---: | :--- |
| ![gif of device](https://github.com/nataliemarleny/framer_transitions/blob/master/008_device.framer/008_device.gif)  | :iphone: <ul><li>Framer.Device.customise()</li><li>Framer.Device.Type.Phone</li></ul> :leftwards_arrow_with_hook:<ul><li>Framer.Device.orientationName = "landscape"</li></ul> **Not Shown But Similar** <ul><li>.orientation</li><li>.setOrientation()</li><li>.rotateLeft()</li><li>.rotateRight()</li></ul> **Not Shown** <ul><li>.fullScreen</li><li>.deviceScale</li><li>.setDeviceScale</li><li>.contentScale</li><li>.setContentScale()</li></ul>|

## 009 draggable is in progress

| 009 demo | options [29] |
| :---: | :--- |
| ![gif of draggable](https://github.com/nataliemarleny/framer_transitions/blob/master/009_draggable.framer/009_draggable.gif)  | :arrow_up_down: :arrows_counterclockwise: <ul><li> .draggable.enabled = true</li></ul> :arrow_up_down: <ul><li> .draggable.horizontal = false</li><li> .draggable.speedY = 1.1 (< 1 is slower than mouse movement)</li><li> .draggable.constraints = </li> - y:100<br> - height: 50<li> print \<layer\>.draggable.constraintsOffset</li><li> print \<layer\>.draggable.isBeyondConstraints</li> <li> .draggable.overdrag = true</li><li> .draggable.overdragScale = 0.25</li><li> .draggable.bounce = true (default true)</li><li> .draggable.bounceOptions = </li> - friction: 40,<br> - tension: 200,<br> - tolerance: 0.0001<li> \<layer\>.draggable.on Events.DragMove :arrow_right:</li> - print.\<layer\>.draggable.direction</ul> :arrows_counterclockwise: <ul><li> .draggable.momentum = true (default true)</li><li> .draggable.momentumOptions = </li> - friction: 2.1<br> - tolerance: 0.1 <li> \<layer\>.draggable.on Events.DragMove :arrow_right:</li>- print \<layer\>.draggable.velocity<br>- print \<layer\>.draggable.angle</ul> **Not Shown** <ul><li> .draggable.vertical = false</li><li> .draggable.speedX = 0.5</li></ul> **To Add** <ul><li> angle</li><li> updatePosition()</li><li>directionLock</li><li> directionLockThreshold</li><li> pixelAlign</li><li> isDragging</li><li> isMoving</li><li> offset</li><li> layerStartPoint</li><li> cursorStartPoint</li><li> layerCursorOffset</li><li> propagateEvents</li></ul> |
  
 ## 010 events is in progress

| 010 demo | options [22] |
| :---: | :--- |
| ![gif of events](https://github.com/nataliemarleny/framer_transitions/blob/master/010_events.framer/010_events.gif)  | **1**<ul><li>.onTap</li><li>.onSingleTap</li><li>.onDoubleTap</li></ul> **2**<ul><li>.onForceTap</li><li>.onForceTapChange</li><li>.onForceTapStart</li><li>.onForceTapEnd</li></ul> **3**<ul><li>.onLongPress</li><li>.onLongPressStart</li><li>.onLongPressEnd</li></ul>**4**<ul><li>.onSwipeUp</li><li>.onSwipeUpStart</li><li>.onSwipeUpEnd</li><li>.onSwipeRight</li><li>.onSwipeRightStart</li><li>.onSwipeRightEnd</li><li>.onSwipeDown</li><li>.onSwipeDownStart</li><li>.onSwipeDownEnd</li><li>.onSwipeLeft</li><li>.onSwipeLeftStart</li><li>.onSwipeLeftEnd</li></ul> **to be continued**|
  
  

## 013 gradient

| 013 demo | options [3] |
| :---: | :--- |
| ![gif of gradient transition](https://github.com/nataliemarleny/framer_transitions/blob/master/013_gradient.framer/013_gradient2.gif) | :large_blue_circle: <ul><li> start: "#05F"</li><li> end: "#0DF"</li></ul> :black_circle:<ul><li> angle: 45</li><li> Animatable: YES</li></ul> |

## 018 pinchable

| 018 demo | options [11] |
| :---: | :--- |
| ![gif of pinchable transition](https://github.com/nataliemarleny/framer_transitions/blob/master/018_pinchable.framer/018_pinchable.gif)  | :large_orange_diamond::large_blue_diamond:<ul><li> pinchable.enabled = true</li><li> pinchable.centerOrigin = false (t default)</li><li> pinchable.minScale = 0.9</li><li> pinchable.maxScale = 2</li></ul> :large_orange_diamond:<ul><li> pinchable.threshold = 6</li><li> pinchable.rotate = false (t default)</li> <li> pinchable.scaleFactor = 1.2</li></ul> :large_blue_diamond: <ul><li> pinchable.rotateIncrements = 15</li><li> pinchable.rotateFactor = 0.5</li></ul> **Not Shown** <ul><li>pinchable.scaleIncrements = 0.5</li><li> pinchable.scale = false (t default)</li></ul>|

## 020 rangeSliderComponent

| 020 demo | options [10] |
| :---: | :--- |
| ![gif of rangeSliderComponent](https://github.com/nataliemarleny/framer_transitions/blob/master/020_rangeSliderComponent.framer/020_rangeSliderComponent.gif) | :heavy_minus_sign:  RangeSliderComponent <ul><li> min: 0 (0 default)</li><li> max: 10 (1 default)</li><li> minValue: 2 (0 default)</li><li> maxValue: 8 (0.5 default)</li></ul> :ribbon: <ul><li>range.fill.backgroundColor = "#EF2D56"</li></ul>:white_circle:  :white_circle:<ul><li> range.knobSize = 30 (30 default)</li><li> range.minKnob.draggable.momentum = false (t default)</li><li> range.maxKnob.draggable.momentum = false (t default)</li></ul> :zap:<ul><li> range.animateToMinValue(1)</li><li> range.animateToMaxValue(9)</li></ul>

## 021 screen

| 021 demo | options [10] |
| :---: | :--- |
| ![gif of screen](https://github.com/nataliemarleny/framer_transitions/blob/master/021_screen.framer/021_screen.gif) | :barber: <ul><li>.backgroundColor</li></ul>:iphone: <ul><li>Screen.size</li><li>Screen.frame (read only)</li></ul> :iphone: - not shown: <ul><li>Screen.width</li><li>Screen.height</li></ul> :large_blue_diamond: <ul><li>Screen.perspective = 1000 (1200 by default)</li><li>Screen.perspectiveOriginX = 1 (default 0.5)</li><li>Screen.perspectiveOriginY = 1 (de0fault 0.5)</li></ul> **Not Shown/Not Sure**<ul><li>Screen.convertPointToCanvas(point)</li><li>Screen.convertPointToLayer(point, layer)</li></ul>



## 022 scrollComponent is in progress

| 022 demo | options [28] |
| :---: | :--- |
| ![gif of scrollcomponent](https://github.com/nataliemarleny/framer_transitions/blob/master/022_scrollcomponent.framer/022_scrollcomponent.gif) | :scroll: <ul><li>.contentInset = </li>top: 150<li>.speedX: 1 (default 1)</li><li>scrollVertical: true</li><li>scrollHorizontal: false</li></ul> **Not Shown** <ul><li>.content</li><li>.speedY: 1 (default 1)</li></ul>

## 023 sliderComponent

| 023 demo | options [9] |
| :---: | :--- |
| ![gif of sliderComponent](https://github.com/nataliemarleny/framer_transitions/blob/master/023_sliderComponent.framer/023_pinchable.gif) | :heavy_minus_sign: <ul><li> silder.backgroundColor = "#FCEEBB"</li><li> slider.fill.backgroundColor = "#F6C106"</li></ul>:white_circle:<ul><li> silder.knob.backgroundColor = "#FCF7FF"</li><li> slider.knobSize = 45 (30 default)</li><li> slider.knob.draggable.momentum = false (t default)</li></ul> :1234:<ul><li> silder.min = 0 (0 default)</li><li> slider.max = 100 (1 default)</li></ul> **Not Shown: To Add** <ul><li> silder.pointForValue</li><li> slider.valueForPoint</li><li> silder.animateToValue</li></ul> |

## 025 textLayer

| 025 demo | options [24] |
| :---: | :--- |
| ![gif of textLayer](https://github.com/nataliemarleny/framer_transitions/blob/master/025_textLayer.framer/025_textLayer.gif) | :abcd: TextLayer<ul><li> text: Hello {name}</li><li> fontSize: 60</li><li> fontFamily: "Helvetica"</li><li> fontWeight: 700</li><li> fontStyle: "bold" (italic / bold / oblique)</li><li> padding:</li> - top: -10 (default 0)<br>- left: 0<br>- bottom: 0<br>- right: 0<li> lineHeight: 1.2 (0 default)</li><li> letterSpacing: 1.2 (0 default)</li><li> wordSpacing: 0 (default 0)</li><li> textAlign: "left" (left, right, center)</li><li> textTransform: "capitalize" (uppercase, lowercase, capitalize)</li><li> textDecoration: "none"</li><li> textIndent: 1</li><li> shadowX: 2</li><li> shadowY: 2</li><li> shadowBlur: 4;</li><li> shadowColor: "rgba (0,0,0,0.2)"</li></ul> :octocat: <ul><li>.template =</li> - name: "github"</ul> :1234: <ul><li>.templateFormatter = </li> count: (value) -><br> - Utils.round(value, 0) <li>.animate</li> -template:<br>count: 1000</ul> :twisted_rightwards_arrows: <ul><li>.textReplace("replace", "Lorem ipsum dolor sit")</li> ("from", "to") <li> truncate: true</li><li> height: 50</li></ul> **Not Shown: To Troubleshoot** <ul><li> textOverflow: "ellipsis"</li> - truncate boolean worked however<li> font: "bold, 700, 60px/1, Helvetica"</li> - (fontStyle fontWeight fontSize*/lineHeight fontFamily*) <br> * = mandatory</ul> |

## 026 utilities

| 026 demo | options [23] |
| :---: | :--- |
| ![gif of utilities](https://github.com/nataliemarleny/framer_transitions/blob/master/026_utilities.framer/026_utilities.gif) | :arrow_double_up: <ul><li>Utils.modulate()</li> used here for parallax scroll</ul> :black_nib: <ul><li>Utils.loadWebFont("Bungee Shade")</li><li>Utils.loadWebFont("Roboto", 700)</li></ul>:1234:<ul><li>text.text = Utils.round(Utils.randomNumber(0, 100), 2)</li></ul> :rainbow:<ul><li>.backgroundColor = Utils.randomColor(1)</li></ul> :flashlight:<ul><li>Utils.labelLayer(layer, "Hello")</li></ul> :camera:<ul><li>.image = Utils.randomImage()</li><li>Utils.randomImage(Layer)</li>(clips to layer)</ul>:black_square_button: (only works for border?)<ul><li>layer.classList.add("testClass")<li>css = {...;}</ul> :mag: **Printed Items** <ul><li>Utils.cycle(["a", "b", "c"])</li><li>Utils.randomChoice([":banana:",":apple:",":watermelon:"])</li><li>Utils.delay 0.5, -></li>print "delayed reaction"<li>print Utils.frameInset({x:0, y:0, width:100, height:100}, 10) </li><li>Utils.interval 1, -></li>print "one second"<li>handler = Utils.throttle 0.5, -></li>print "hello"<br>for i in [10...100]<br>handler()<li>handler = Utils.debounce 0.1, -></li>print "hello"<br>for i in [1..100]<br>handler()</ul> **Not Shown - these return a boolean** <ul><li> Utils.isWebKit()</li><li> Utils.isChrome()</li><li> Utils.isSafari()</li><li> Utils.isTouch()</li><li> Utils.isDesktop()</li><li> Utils.isPhone()</li><li> Utils.isTablet()</li><li> Utils.isMobile()</li></ul> |

## 027 videoLayer

| 027 demo | options [2] |
| :---: | :--- |
| ![gif of videoLayer](https://github.com/nataliemarleny/framer_transitions/blob/master/027_videolayer.framer/027_videolayer_update.gif) | :movie_camera: <ul><li> new VideoLayer: </li> video: "name.mp4"<li> .player.autoplay = true</li><li> .player.fastSeek(2)</li></ul>


## Credits:
RayPS - iPhone X Framer device mockup from: https://gist.github.com/RayPS/0a21af6cf3b0578ffab62c604b5ea6e2

