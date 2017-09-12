# framer_transitions
Reference for Framer Transitions - Illustrated Framer Docs
- Status: In Progress

Table of Contents
* [001 Align](#001-align-and-offset)
* 002 Animation
* 003 Background Layer
* 004 Canvas
* 005 Color
* ~~006 Compatibility = basically "Mac OS"~~
* 007 Defaults
* 008 Device
* 009 Draggable
* 010 Events
* 011 Extras
* 012 FlowComponent
* [013 Gradient](#013-gradient)
* 014 Layer
* 015 MIDIComponent
* 016 Modules
* 017 PageComonent
* [018 Pinchable](#018-pinchable)
* 019 Print
* 020 RangeSliderComponent
* 021 Screen
* 022 ScrollComponent
* 023 SliderComponent
* 024 States
* 025 TextLayer
* 026 Utilities
* 027 VideoLayer

## 001 align and offset

| 001 demo | options [5] |
| :---: | :--- |
| ![gif of align transition](https://github.com/nataliemarleny/framer_transitions/blob/master/001_align.framer/001_align.gif)  | **Align** <ul><li> Align.bottom()</li><li> Align.center()</li><li> Align.left()</li><li> Align.right()</li><li> Align.top()</li></ul> **Offset** <ul><li> Align.bottom(-50)</li><li> Align.center(50)</li><li> Align.left(50)<li> Align.right(-50)</li><li> Align.top(50)</li></ul> |

## 013 gradient

| 013 demo | options [3] |
| :---: | :--- |
| ![gif of gradient transition](https://github.com/nataliemarleny/framer_transitions/blob/master/013_gradient.framer/013_gradient2.gif) | :large_blue_circle: <ul><li> start: "#05F"</li><li> end: "#0DF"</li></ul> :black_circle:<ul><li> angle: 45</li><li> Animatable: YES</li></ul> |



## 018 pinchable

| 018 demo | options [11] |
| :---: | :--- |
| ![gif of pinchable transition](https://github.com/nataliemarleny/framer_transitions/blob/master/018_pinchable.framer/018_pinchable.gif)  | :large_orange_diamond::large_blue_diamond:<ul><li> pinchable.enabled = true</li><li> pinchable.centerOrigin = false (t default)</li><li> pinchable.minScale = 0.9</li><li> pinchable.maxScale = 2</li></ul> :large_orange_diamond:<ul><li> pinchable.threshold = 6</li><li> pinchable.rotate = false (t default)</li> <li> pinchable.scaleFactor = 1.2</li></ul> :large_blue_diamond: <ul><li> pinchable.rotateIncrements = 15</li><li> pinchable.rotateFactor = 0.5</li></ul> **Not Shown** <ul><li>pinchable.scaleIncrements = 0.5</li><li> pinchable.scale = false (t default)</li></ul>|

