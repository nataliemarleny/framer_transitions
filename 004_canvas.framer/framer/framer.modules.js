require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"gotcha/gotcha":[function(require,module,exports){
var DashedLine, Gotcha, SVGContext, SVGShape, SpecPanel, accordionsOpen, device, deviceType, gotcha, pAccordian, pColor, pDiv, pDivider, pImage, pInput, pLabel, pRange, pRow, pSelect, pSpan, panel, propLayers, ref, secretBox, startOpen, svgContext, viewC,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

deviceType = window.localStorage.deviceType;

if (deviceType != null) {
  device = Framer.DeviceComponent.Devices[deviceType];
  Framer.Device._context.devicePixelRatio = device.devicePixelRatio;
  Framer.Device.deviceType = deviceType;
  window.localStorage.device = void 0;
}

Framer.Extras.Hints.disable();

svgContext = void 0;

startOpen = false;

accordionsOpen = false;

if ((ref = document.getElementsByClassName('DevicePhone')[0]) != null) {
  ref.classList.add('IgnorePointerEvents');
}


/* -------------------------------------------

  	.d88888b  dP     dP  .88888.      a88888b.                                                                    dP
  	88.    "' 88     88 d8'   `88    d8'   `88                                                                    88
  	`Y88888b. 88    .8P 88           88        .d8888b. 88d8b.d8b. 88d888b. .d8888b. 88d888b. .d8888b. 88d888b. d8888P .d8888b.
  	      `8b 88    d8' 88   YP88    88        88'  `88 88'`88'`88 88'  `88 88'  `88 88'  `88 88ooood8 88'  `88   88   Y8ooooo.
  	d8'   .8P 88  .d8P  Y8.   .88    Y8.   .88 88.  .88 88  88  88 88.  .88 88.  .88 88    88 88.  ... 88    88   88         88
  	 Y88888P  888888'    `88888'      Y88888P' `88888P' dP  dP  dP 88Y888P' `88888P' dP    dP `88888P' dP    dP   dP   `88888P'
  	                                                               88
  	                                                               dP
 */

SVGContext = (function() {
  function SVGContext(options) {
    var setAttributes, svgNS;
    if (options == null) {
      options = {};
    }
    this.removeAll = bind(this.removeAll, this);
    this.setContext = bind(this.setContext, this);
    this.__constructor = true;
    this.shapes = [];
    svgContext = this;
    svgNS = "http://www.w3.org/2000/svg";
    setAttributes = function(element, attributes) {
      var key, results, value;
      if (attributes == null) {
        attributes = {};
      }
      results = [];
      for (key in attributes) {
        value = attributes[key];
        results.push(element.setAttribute(key, value));
      }
      return results;
    };
    this.svg = document.createElementNS(svgNS, 'svg');
    document.body.appendChild(this.svg);
    this.svg.style['z-index'] = '999';
    this.frameElement = Framer.Device.screenBackground._element;
    this.setContext();
    this.svgDefs = document.createElementNS(svgNS, 'defs');
    this.svg.appendChild(this.svgDefs);
    delete this.__constructor;
  }

  SVGContext.prototype.setAttributes = function(element, attributes) {
    var key, results, value;
    if (attributes == null) {
      attributes = {};
    }
    results = [];
    for (key in attributes) {
      value = attributes[key];
      results.push(element.setAttribute(key, value));
    }
    return results;
  };

  SVGContext.prototype.setContext = function() {
    var sFrame;
    this.lFrame = this.frameElement.getBoundingClientRect();
    _.assign(this, {
      width: this.lFrame.width.toFixed(),
      height: this.lFrame.height.toFixed(),
      x: this.lFrame.left.toFixed(),
      y: this.lFrame.top.toFixed()
    });
    this.screenElement = document.getElementsByClassName('framerContext')[0];
    sFrame = this.screenElement.getBoundingClientRect();
    this.setAttributes(this.svg, {
      x: 0,
      y: 0,
      width: sFrame.width,
      height: sFrame.height,
      viewBox: "0 0 " + sFrame.width + " " + sFrame.height
    });
    return _.assign(this.svg.style, {
      position: "absolute",
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      'pointer-events': 'none'
    });
  };

  SVGContext.prototype.addShape = function(shape) {
    this.shapes.push(shape);
    return this.showShape(shape);
  };

  SVGContext.prototype.removeShape = function(shape) {
    this.hideShape(shape);
    return _.pull(this.shapes, shape);
  };

  SVGContext.prototype.hideShape = function(shape) {
    return this.svg.removeChild(shape.element);
  };

  SVGContext.prototype.showShape = function(shape) {
    return this.svg.appendChild(shape.element);
  };

  SVGContext.prototype.addDef = function(def) {
    return this.svgDefs.appendChild(def);
  };

  SVGContext.prototype.removeAll = function() {
    var j, len, ref1, shape;
    ref1 = this.shapes;
    for (j = 0, len = ref1.length; j < len; j++) {
      shape = ref1[j];
      this.svg.removeChild(shape.element);
    }
    return this.shapes = [];
  };

  return SVGContext;

})();

SVGShape = (function() {
  function SVGShape(options) {
    var key, value;
    if (options == null) {
      options = {
        type: 'circle'
      };
    }
    this.setAttribute = bind(this.setAttribute, this);
    this.__constructor = true;
    this.parent = svgContext;
    this.element = document.createElementNS("http://www.w3.org/2000/svg", options.type);
    this.setCustomProperty('text', 'textContent', 'textContent', options.text);
    for (key in options) {
      value = options[key];
      this.setAttribute(key, value);
    }
    this.parent.addShape(this);
    this.show();
  }

  SVGShape.prototype.setAttribute = function(key, value) {
    if (key === 'text') {
      return;
    }
    if (this[key] == null) {
      Object.defineProperty(this, key, {
        get: (function(_this) {
          return function() {
            return _this.element.getAttribute(key);
          };
        })(this),
        set: (function(_this) {
          return function(value) {
            return _this.element.setAttribute(key, value);
          };
        })(this)
      });
    }
    return this[key] = value;
  };

  SVGShape.prototype.setCustomProperty = function(variableName, returnValue, setValue, startValue) {
    Object.defineProperty(this, variableName, {
      get: function() {
        return returnValue;
      },
      set: function(value) {
        return this.element[setValue] = value;
      }
    });
    return this[variableName] = startValue;
  };

  SVGShape.prototype.hide = function() {
    return this.parent.hideShape(this);
  };

  SVGShape.prototype.show = function() {
    return this.parent.showShape(this);
  };

  SVGShape.prototype.remove = function() {
    return this.parent.removeShape(this);
  };

  return SVGShape;

})();

DashedLine = (function(superClass) {
  extend(DashedLine, superClass);

  function DashedLine(pointA, pointB, color, offset, options) {
    if (color == null) {
      color = '#000';
    }
    if (offset == null) {
      offset = 0;
    }
    if (options == null) {
      options = {};
    }
    _.assign(options, {
      type: 'path',
      d: "M " + pointA.x + " " + pointA.y + " L " + pointB.x + " " + pointB.y,
      stroke: color,
      'stroke-width': '1px',
      'stroke-dasharray': "5, 5",
      'stroke-dashoffset': offset
    });
    DashedLine.__super__.constructor.call(this, options);
  }

  return DashedLine;

})(SVGShape);

Utils.insertCSS("\n.logo {\n	opacity: .4;\n}\n\n.logo:hover {\n	opacity: 1;\n}\n\n#linkedin_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 68px;\n}\n\n\n#twitter_logo {\n	position: absolute;\n	bottom: 4px;\n	right: 4px;\n}\n\n#github_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 36px;\n}\n\n.framerLayer { \n	pointer-events: all !important; \n	} \n\n.IgnorePointerEvents {\n	pointer-events: none !important; \n}\n\n.dropdown {\n	opacity: 0;\n}\n\n#pContainer {\n	position: fixed;\n	right: 0;\n	width: 224px;\n	height: 100%;\n	font-family: 'Helvetica Neue';\n	font-size: 11px;\n	background-color: rgba(20, 20, 20, 1.000);\n	border-left: 1px solid rgba(45, 45, 45, 1.000);\n	pointer-events: all;\n	white-space: nowrap;\n	cursor: default;\n	overflow: scroll;\n	padding-top: 8px;\n}\n\n.pDiv {\n	display: block;\n	width: 100%;\n}\n\n.hidden {\n	display: none;\n}\n\n.pRow {\n	width: 100%;\n	height: 32px;\n}\n\n.pSpan {\n	position: absolute;\n	color: #888888;\n	font-weight: 400;\n	letter-spacing: .5px;\n	padding-left: 8px;\n	margin-top: 2px;\n}\n\n.pLabel {\n	position: absolute;\n	text-align: right;\n	font-size: 10px;\n	width: none;\n	margin-top: 2px;\n	margin-right: 8px;\n	z-index: 10;\n	pointer-events: none;\n}\n\n.pRange {\n	position: absolute;\n	border-radius: 4px;\n	margin-top: 15px;\n	margin-right: 4px;\n	border: 1px solid #000;\n	-webkit-appearance: none;  /* Override default CSS styles */\n	appearance: none;\n	width: 100%; \n	height: 4px;\n	background: #323232;\n	outline: none;\n	opacity: 1;\n}\n\n\n.pRange::-webkit-slider-thumb {\n	border-radius: 8px;\n	-webkit-appearance: none;\n	appearance: none;\n	width: 16px;\n	height: 16px;\n	background: #888888;\n	border: 1px solid #000;\n	cursor: pointer;\n}\n\n.pRange::-moz-range-thumb {\n	border-radius: 8px;\n	width: 16px;\n	height: 16px;\n	background: #888888;\n	border: 1px solid #000;\n	cursor: pointer;\n}\n\n.pInput {\n	background-color: #292929;\n	border: 1px solid #000;\n	color: #555555;\n	padding: 4px;\n	position: absolute;\n	border-radius: 4px;\n	outline: none;\n	margin-top: 4px;\n}\n\n.pInput:hover {\n	border: 1px solid #48cfff;\n	color: #48cfff;\n}\n\n.right {\n	right: 8px;\n	width: 48px;\n}\n\n.left {\n	right: 72px;\n	width: 48px;\n}\n\n.alignLeft {\n	text-align: left;\n}\n\n.full {\n	right: 8px;\n	width: 112px;\n}\n\n.pImage {\n	display: block;\n	margin-left: 8px;\n	height: auto;\n	width: 196px;\n	overflow: hidden;\n	background-color: #292929;\n	border: 1px solid #000;\n	border-radius: 4px;\n	outline: 4px solid #292929;\n	outline-offset: -4px;\n	padding: 4px;\n}\n\n.pImage:hover {\n	border: 1px solid #48cfff;\n	color: #48cfff;\n	outline: 2px solid #292929;\n}\n\n.pColor {\n	outline: 4px solid #292929;\n	outline-offset: -4px;\n}\n\n.pColor:hover {\n	outline: 2px solid #292929;\n	color: #48cfff;\n}\n\n.pSelect {\n	position: absolute;\n	right: 8px;\n	width: 122px;\n	color: #555555;\n	background-color: #292929;\n	-webkit-appearance: none;\n	border: 1px solid #000;\n	padding: 4px;\n	border-radius: 4px;\n	outline: none;\n}\n\n.pDivider {\n	height: 1px;\n	background-color: #000;\n	margin: 16px 8px 16px 8px;\n}\n\n.pAccordian {\n	border-top: 1px solid #141414;\n	border-bottom: 1px solid #141414;\n	height: auto;\n	min-height: 32px;\n	background-color: #1D1D1D;\n	margin-top: 16px;\n}\n\n.pAccordianBody {\n	display: none;\n	height: auto;\n	margin-top: 32px;\n	padding-top: 4px;\n	background-color: #141414;\n}\n\n.active {\n	display: block;\n	height: auto;\n}\n\n.hasValue {\n	color: #FFF;\n}\n\n.socialLinks {\n	background-color: #141414;\n	position: fixed;\n	bottom: 0px;\n	right: 0px;\n	padding-top: 4px;\n	z-index: 100;\n}\n\n.strong {\n	font-weight: 600;\n}\n");

pDiv = (function() {
  function pDiv(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: void 0
    });
    this.properties = [];
    this.element = document.createElement('div');
    this.element.classList.add("pDiv");
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    Object.defineProperty(this, "visible", {
      get: function() {
        return this._visible;
      },
      set: function(bool) {
        if (bool === this._visible) {
          return;
        }
        this._visible = bool;
        if (bool) {
          this.element.classList.remove('hidden');
          return;
        }
        return this.element.classList.add('hidden');
      }
    });
  }

  return pDiv;

})();

pRow = (function(superClass) {
  extend(pRow, superClass);

  function pRow(options) {
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      text: 'Label',
      bold: false
    });
    _.assign(this, {
      children: []
    });
    pRow.__super__.constructor.call(this, options);
    this.element.classList.remove("pDiv");
    this.element.classList.add("pRow");
    this.label = new pSpan({
      parent: this,
      text: options.text,
      bold: options.bold
    });
    Object.defineProperty(this, 'color', {
      get: function() {
        return this.label.style.color;
      },
      set: function(value) {
        return this.label.element.style.color = value;
      }
    });
  }

  return pRow;

})(pDiv);

pDivider = (function() {
  function pDivider(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: void 0
    });
    this.element = document.createElement('div');
    this.element.classList.add("pDivider");
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
  }

  return pDivider;

})();

pSpan = (function() {
  function pSpan(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: void 0,
      text: 'hello world',
      bold: false
    });
    this.element = document.createElement('span');
    this.element.classList.add("pSpan");
    this.element.textContent = options.text;
    if (options.bold) {
      this.element.classList.add("strong");
    }
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    Object.defineProperty(this, 'text', {
      get: function() {
        return this.element.textContent;
      },
      set: function(value) {
        return this.element.textContent = value;
      }
    });
  }

  return pSpan;

})();

pRange = (function() {
  function pRange(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: null,
      className: 'full',
      value: '',
      min: '0',
      max: '100',
      value: '100',
      action: (function(_this) {
        return function(value) {
          return null;
        };
      })(this)
    });
    this.element = document.createElement('input');
    _.assign(this.element, {
      type: 'range',
      min: options.min,
      max: options.max,
      value: options.value,
      action: options.action
    });
    this.element.classList.add("pRange");
    this.element.classList.add(options.className);
    this.element.oninput = (function(_this) {
      return function() {
        return _this.action(_this.value);
      };
    })(this);
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    propLayers.push(this);
    Object.defineProperty(this, 'value', {
      get: function() {
        return this.element.value;
      }
    });
    _.assign(this, {
      action: options.action
    });
  }

  return pRange;

})();

pLabel = (function() {
  function pLabel(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: void 0,
      className: null,
      text: 'x',
      "for": void 0
    });
    this.element = document.createElement('label');
    this.element.classList.add("pLabel");
    this.element.classList.add(options.className);
    _.assign(this.element, {
      textContent: options.text,
      "for": options["for"]
    });
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
  }

  return pLabel;

})();

pInput = (function() {
  function pInput(options) {
    var parent, ref1, ref2, ref3, ref4;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: null,
      className: 'left',
      value: '',
      unit: 'x',
      "default": '',
      isDefault: true,
      section: void 0
    });
    this.element = document.createElement('input');
    this.element.classList.add("pInput");
    this.element.classList.add(options.className);
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    if ((ref3 = options.section) != null) {
      ref3.properties.push(this);
    }
    this.unit = new pLabel({
      parent: options.parent,
      className: options.className,
      text: options.unit,
      "for": this.element
    });
    propLayers.push(this);
    Object.defineProperty(this, 'default', {
      get: function() {
        return this._default;
      },
      set: function(value) {
        return this._default = value;
      }
    });
    this["default"] = (ref4 = options["default"]) != null ? ref4 : '';
    Object.defineProperty(this, 'value', {
      get: function() {
        return this._value;
      },
      set: function(value) {
        var ref5;
        this._value = value;
        if ((value == null) || value === "" || value === "undefined") {
          value = String(this["default"]);
        }
        this.element.value = value != null ? value : "";
        if ((value != null) && !this.isDefault && value !== "") {
          return (ref5 = this.section) != null ? ref5.visible = true : void 0;
        }
      }
    });
    Object.defineProperty(this, 'isDefault', {
      get: function() {
        return this._isDefault;
      },
      set: function(bool) {
        this._isDefault = bool;
        if (bool) {
          this.element.classList.remove('hasValue');
          return;
        }
        return this.element.classList.add('hasValue');
      }
    });
    this.element.addEventListener('click', (function(_this) {
      return function() {
        if (!secretBox) {
          return;
        }
        secretBox.value = _this.value;
        secretBox.select();
        document.execCommand('copy');
        return secretBox.blur();
      };
    })(this));
    _.assign(this, {
      value: options.value,
      "default": options["default"],
      section: options.section,
      isDefault: options.isDefault
    });
  }

  return pInput;

})();

pImage = (function() {
  function pImage(options) {
    var parent, ref1, ref2, ref3;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: null,
      value: '',
      unit: '',
      section: void 0
    });
    this.element = document.createElement('img');
    this.element.classList.add("pImage");
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    if ((ref3 = options.section) != null) {
      ref3.properties.push(this);
    }
    propLayers.push(this);
    Object.defineProperty(this, 'value', {
      get: function() {
        return this._value;
      },
      set: function(value) {
        var ref4;
        if (value == null) {
          value = '';
        }
        this._value = value;
        this.element.src = value;
        return (ref4 = this.section) != null ? ref4.visible = value !== '' : void 0;
      }
    });
    this.element.addEventListener('click', (function(_this) {
      return function() {
        if (!secretBox) {
          return;
        }
        secretBox.value = _this.value;
        secretBox.select();
        document.execCommand('copy');
        return secretBox.blur();
      };
    })(this));
    _.assign(this, {
      value: options.value,
      section: options.section
    });
  }

  return pImage;

})();

pColor = (function() {
  function pColor(options) {
    var parent, ref1, ref2, ref3;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: null,
      value: '#292929'
    });
    this.element = document.createElement('input');
    this.element.classList.add("pInput");
    this.element.classList.add('pColor');
    this.element.classList.add(options.className);
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    if ((ref3 = options.section) != null) {
      ref3.properties.push(this);
    }
    propLayers.push(this);
    Object.defineProperty(this, 'value', {
      get: function() {
        return this._value;
      },
      set: function(value) {
        var ref4;
        if ((value != null ? value.color : void 0) === 'transparent') {
          value = null;
        }
        if ((value != null) && value !== '') {
          if ((ref4 = this.section) != null) {
            ref4.visible = true;
          }
        }
        this._value = value != null ? value : '';
        return this.element.style['background-color'] = value != null ? value : 'none';
      }
    });
    this.element.addEventListener('click', (function(_this) {
      return function() {
        if (!secretBox) {
          return;
        }
        secretBox.value = _this.value;
        secretBox.select();
        document.execCommand('copy');
        return secretBox.blur();
      };
    })(this));
    _.assign(this, {
      value: options.value,
      section: options.section
    });
  }

  return pColor;

})();

pSelect = (function() {
  function pSelect(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    this.makeOptions = bind(this.makeOptions, this);
    _.defaults(options, {
      parent: void 0,
      selected: 0,
      options: ['red', 'white', 'blue'],
      callback: function(value) {
        return null;
      }
    });
    this.element = document.createElement('select');
    this.element.classList.add("pSelect");
    this.element.classList.add('hasValue');
    this.unit = new pLabel({
      parent: options.parent,
      className: 'right',
      text: '▾',
      "for": this.element
    });
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    Object.defineProperty(this, 'options', {
      get: function() {
        return this._options;
      },
      set: function(array) {
        this._options = array;
        return this.makeOptions();
      }
    });
    Object.defineProperty(this, 'selected', {
      get: function() {
        return this._selected;
      },
      set: function(num) {
        return this._selected = num;
      }
    });
    _.assign(this, {
      _options: [],
      _optionElements: [],
      options: options.options,
      callback: options.callback,
      selected: options.selected
    });
    this.element.selectedIndex = options.selected;
    this.element.onchange = (function(_this) {
      return function() {
        _this.selected = _this.element.selectedIndex;
        return _this.callback(_this.element.selectedIndex);
      };
    })(this);
  }

  pSelect.prototype.makeOptions = function() {
    var i, j, k, len, len1, o, option, ref1, ref2, results;
    ref1 = this._optionElements;
    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
      option = ref1[i];
      this.element.removeChild(option);
    }
    this._optionElements = [];
    ref2 = this.options;
    results = [];
    for (i = k = 0, len1 = ref2.length; k < len1; i = ++k) {
      option = ref2[i];
      o = document.createElement('option');
      o.value = option;
      o.label = option;
      o.innerHTML = option;
      this.element.appendChild(o);
      this._optionElements.push(o);
      if (i === this.selected) {
        results.push(this.value = this.element.options[this.element.selectedIndex].label);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  return pSelect;

})();

pAccordian = (function(superClass) {
  extend(pAccordian, superClass);

  function pAccordian(options) {
    if (options == null) {
      options = {};
    }
    this.toggle = bind(this.toggle, this);
    pAccordian.__super__.constructor.call(this, options);
    this.element.classList.add('pAccordian');
    this.element.addEventListener("click", this.toggle);
    _.assign(this, {
      toggled: false
    });
    this.unit = new pLabel({
      parent: this,
      className: 'right',
      text: '▿',
      "for": this.element
    });
    this.body = new pRow({
      parent: this,
      text: ''
    });
    this.body.element.removeChild(this.body.label.element);
    this.element.appendChild(this.body.element);
    this.body.element.classList.add('pAccordianBody');
    this.body.element.addEventListener('click', function(event) {
      return event.stopPropagation();
    });
    if (accordionsOpen) {
      this.toggle();
    }
  }

  pAccordian.prototype.toggle = function() {
    this.toggled = !this.toggled;
    if (this.toggled) {
      this.body.element.classList.add('active');
      this.unit.element.textContent = '▾';
      return;
    }
    if (this.body.element.classList.contains('active')) {
      this.body.element.classList.remove('active');
      return this.unit.element.textContent = '▿';
    }
  };

  return pAccordian;

})(pRow);


/* -------------------------------------------

 	.d88888b                                 888888ba                             dP
 	88.    "'                                88    `8b                            88
 	`Y88888b. 88d888b. .d8888b. .d8888b.    a88aaaa8P' .d8888b. 88d888b. .d8888b. 88
 	      `8b 88'  `88 88ooood8 88'  `""     88        88'  `88 88'  `88 88ooood8 88
 	d8'   .8P 88.  .88 88.  ... 88.  ...     88        88.  .88 88    88 88.  ... 88
 	 Y88888P  88Y888P' `88888P' `88888P'     dP        `88888P8 dP    dP `88888P' dP
 	          88
 	          dP
 */

SpecPanel = (function() {
  function SpecPanel() {
    this.hideDivs = bind(this.hideDivs, this);
    this.showProperty = bind(this.showProperty, this);
    this.showProperties = bind(this.showProperties, this);
    this.showAnimations = bind(this.showAnimations, this);
    this.showEventListeners = bind(this.showEventListeners, this);
    this.clearChildrenThenShowEventListeners = bind(this.clearChildrenThenShowEventListeners, this);
    this.clearChildrenThenShowAnimations = bind(this.clearChildrenThenShowAnimations, this);
    var currentSelected, deviceOptions, element, j, key, len, maxp, maxv, minp, minv, ref1, ref2, row, vScale, value;
    this.element = panel;
    this.propLayers = [];
    this._props = {};
    this.frame = this.element.getBoundingClientRect();
    this.defaults = Framer.Device.screen._propertyList();
    Object.defineProperty(this, 'props', {
      get: function() {
        return this._props;
      },
      set: function(obj) {
        var key, results, value;
        results = [];
        for (key in obj) {
          value = obj[key];
          if (_.has(this.props, key)) {
            results.push(this.props[key] = value);
          } else {
            results.push(void 0);
          }
        }
        return results;
      }
    });
    this.element.style.opacity = startOpen ? '1' : '0';
    this.canvas = document.createElement('canvas');
    deviceOptions = ['fullscreen'];
    currentSelected = void 0;
    ref1 = Framer.DeviceComponent.Devices;
    for (key in ref1) {
      value = ref1[key];
      if (_.endsWith(key, 'hand')) {
        continue;
      }
      if (value.minStudioVersion == null) {
        continue;
      }
      if (Utils.framerStudioVersion() > value.maxStudioVersion) {
        continue;
      }
      if (Utils.framerStudioVersion() < value.minStudioVersion) {
        continue;
      }
      deviceOptions.push(key);
      if (key === Framer.Device.deviceType) {
        currentSelected = deviceOptions.length - 1;
      }
    }
    row = new pRow({
      text: 'Device'
    });
    this.deviceBox = new pSelect({
      parent: row,
      unit: '',
      options: deviceOptions,
      selected: currentSelected,
      callback: (function(_this) {
        return function(index) {
          deviceType = deviceOptions[index];
          device = Framer.DeviceComponent.Devices[deviceType];
          _.assign(window.localStorage, {
            deviceType: deviceType,
            device: device,
            bg: Screen.backgroundColor
          });
          return window.location.reload();
        };
      })(this)
    });
    this.speedRow = new pRow({
      text: 'Speed 100%'
    });
    minp = parseInt(0, 10);
    maxp = parseInt(100, 10);
    minv = Math.log(0.00001);
    maxv = Math.log(0.01666666667);
    vScale = (maxv - minv) / (maxp - minp);
    this.speedBox = new pRange({
      parent: this.speedRow,
      className: 'full',
      unit: '',
      action: (function(_this) {
        return function(value) {
          var delta, rate, spaces;
          delta = Math.exp(minv + vScale * (value - minp));
          rate = (delta / (1 / 60)) * 100;
          spaces = rate < 1 ? 2 : rate < 10 ? 1 : 0;
          _this.speedRow.label.text = 'Speed ' + rate.toFixed(spaces) + '%';
          return Framer.Loop.delta = delta;
        };
      })(this)
    });
    new pDivider;
    row = new pRow({
      text: 'Name'
    });
    this.nameBox = new pInput({
      parent: row,
      className: 'full',
      unit: ''
    });
    row = new pRow({
      text: 'Component'
    });
    this.componentNameBox = new pInput({
      parent: row,
      className: 'full',
      unit: ''
    });
    this.componentNamesRow = new pRow({
      text: 'Part of'
    });
    this.componentNamesBox = new pInput({
      parent: this.componentNamesRow,
      className: 'full',
      unit: ''
    });
    new pDivider;
    row = new pRow({
      text: 'Position'
    });
    this.xBox = new pInput({
      parent: row,
      className: 'left',
      unit: 'x'
    });
    this.yBox = new pInput({
      parent: row,
      className: 'right',
      unit: 'y'
    });
    row = new pRow({
      text: 'Size'
    });
    this.widthBox = new pInput({
      parent: row,
      className: 'left',
      unit: 'w'
    });
    this.heightBox = new pInput({
      parent: row,
      className: 'right',
      unit: 'h'
    });
    row = new pRow({
      text: 'Background'
    });
    this.backgroundColorBox = new pColor({
      parent: row,
      className: 'left'
    });
    this.gradientPropertiesDiv = new pDiv;
    row = new pRow({
      parent: this.gradientPropertiesDiv,
      text: 'Gradient'
    });
    this.gradientStartBox = new pColor({
      parent: row,
      className: 'left',
      section: this.gradientPropertiesDiv,
      "default": null
    });
    this.gradientEndBox = new pColor({
      parent: row,
      className: 'right',
      section: this.gradientPropertiesDiv,
      "default": null
    });
    row = new pRow({
      parent: this.gradientPropertiesDiv,
      text: ''
    });
    this.gradientAngleBox = new pInput({
      parent: row,
      className: 'left',
      unit: 'a',
      section: this.gradientPropertiesDiv,
      "default": null
    });
    row = new pRow({
      text: 'Opacity'
    });
    this.opacityBox = new pInput({
      parent: row,
      className: 'left',
      unit: ''
    });
    new pDivider({
      parent: this.filtersDiv
    });
    this.borderPropertiesDiv = new pDiv;
    row = new pRow({
      text: 'Border',
      parent: this.borderPropertiesDiv
    });
    this.borderColorBox = new pColor({
      parent: row,
      className: 'left'
    });
    this.borderWidthBox = new pInput({
      parent: row,
      className: 'right',
      unit: 'w',
      section: this.borderPropertiesDiv
    });
    row = new pRow({
      text: 'Radius',
      parent: this.borderPropertiesDiv
    });
    this.borderRadiusBox = new pInput({
      parent: row,
      className: 'left',
      unit: '',
      section: this.borderPropertiesDiv
    });
    this.shadowPropertiesDiv = new pDiv;
    row = new pRow({
      parent: this.shadowPropertiesDiv,
      text: 'Shadow'
    });
    this.shadowColorBox = new pColor({
      parent: row,
      section: this.shadowPropertiesDiv,
      className: 'left'
    });
    this.shadowSpreadBox = new pInput({
      parent: row,
      section: this.shadowPropertiesDiv,
      className: 'right',
      unit: 's',
      "default": '0'
    });
    row = new pRow({
      parent: this.shadowPropertiesDiv,
      text: ''
    });
    this.shadowXBox = new pInput({
      parent: row,
      section: this.shadowPropertiesDiv,
      className: 'left',
      unit: 'x',
      "default": '0'
    });
    this.shadowYBox = new pInput({
      parent: row,
      section: this.shadowPropertiesDiv,
      className: 'right',
      unit: 'y',
      "default": '0'
    });
    row = new pRow({
      parent: this.shadowPropertiesDiv,
      text: ''
    });
    this.shadowBlurBox = new pInput({
      parent: row,
      section: this.shadowPropertiesDiv,
      className: 'left',
      unit: 'b',
      "default": '0'
    });
    this.textPropertiesDiv = new pDiv;
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Font'
    });
    this.fontFamilyBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'full',
      unit: ''
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Color'
    });
    this.colorBox = new pColor({
      parent: row,
      className: 'left'
    });
    this.fontSizeBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'right',
      unit: ''
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Style'
    });
    this.fontStyleBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'left',
      unit: ''
    });
    this.fontWeightBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'right',
      unit: 'w'
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Align'
    });
    this.textAlignBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'full',
      unit: '',
      "default": 'left'
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Spacing'
    });
    this.letterSpacingBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'left',
      unit: 'lt',
      "default": '1'
    });
    this.lineHeightBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'right',
      unit: 'ln'
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Text'
    });
    this.textBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'full',
      unit: ''
    });
    this.transformsDiv = new pDiv;
    this.transformsAcco = new pAccordian({
      text: 'Transforms',
      parent: this.transformsDiv
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Scale'
    });
    this.scaleBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: '',
      "default": '1'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: ''
    });
    this.scaleXBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: 'x',
      "default": '1'
    });
    this.scaleYBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'right',
      unit: 'y',
      "default": '1'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Rotate'
    });
    this.rotationBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: ''
    });
    this.rotationXBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: 'x',
      "default": '0'
    });
    this.rotationYBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'right',
      unit: 'y',
      "default": '0'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Origin'
    });
    this.originXBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: 'x',
      "default": '0.50'
    });
    this.originYBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'right',
      unit: 'y',
      "default": '0.50'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Skew'
    });
    this.skewBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: ''
    });
    this.skewXBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: 'x',
      "default": '0'
    });
    this.skewYBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'right',
      unit: 'y',
      "default": '0'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Perspective'
    });
    this.perspectiveBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    this.filtersDiv = new pDiv;
    this.filtersAcco = new pAccordian({
      parent: this.filtersDiv,
      text: 'Filters'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Blur'
    });
    this.blurBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Brightness'
    });
    this.brightnessBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: '',
      "default": '100'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Contrast'
    });
    this.contrastBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: '',
      "default": '100'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Grayscale'
    });
    this.grayscaleBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'hueRotate'
    });
    this.hueRotateBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Invert'
    });
    this.invertBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Saturate'
    });
    this.saturateBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: '',
      "default": '100'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Sepia'
    });
    this.sepiaBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    this.effectsDiv = new pDiv;
    this.effectsAcco = new pAccordian({
      text: 'Effects',
      parent: this.effectsDiv
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Blending'
    });
    this.blendingBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'full',
      unit: '',
      "default": 'normal'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Blur'
    });
    this.backgroundBlurBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Brightness'
    });
    this.backgroundBrightnessBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: '',
      "default": '100'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Saturate'
    });
    this.backgroundSaturateBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: '',
      "default": '100'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'hueRotate'
    });
    this.backgroundHueRotateBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Contrast'
    });
    this.backgroundContrastBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: '',
      "default": '100'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Invert'
    });
    this.backgroundInvertBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Grayscale'
    });
    this.backgroundGrayscaleBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Sepia'
    });
    this.backgroundSepiaBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    this.animsDiv = new pDiv;
    this.animsAcco = new pAccordian({
      text: 'Animations',
      parent: this.animsDiv
    });
    this.eventListenersDiv = new pDiv;
    this.eventListenersAcco = new pAccordian({
      text: 'Event Listeners',
      parent: this.eventListenersDiv
    });
    this.imagePropertiesDiv = new pDiv;
    new pDivider({
      parent: this.imagePropertiesDiv
    });
    this.imageBox = new pImage({
      parent: this.imagePropertiesDiv,
      section: this.imagePropertiesDiv
    });
    this.screenshotDiv = new pDiv;
    this.screenshotBox = new pImage({
      parent: this.screenshotDiv,
      section: this.screenshotDiv
    });
    row = new pRow({
      text: ''
    });
    row.element.style.height = '64px';
    this.socialMediaRow = new pRow({
      parent: this.textPropertiesDiv.body,
      text: ''
    });
    this.linkedinIcon = document.createElement('a');
    _.assign(this.linkedinIcon, {
      href: "http://www.linkedin.com/in/steveruizok",
      innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" id="linkedin_logo" class="logo" width="20" height="20" fill="rgba(91, 91, 91, 1.000)" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>'
    });
    this.githubIcon = document.createElement('a');
    _.assign(this.githubIcon, {
      href: "http://github.com/steveruizok/gotcha",
      innerHTML: '<svg height="20px" width="20px" id="github_logo" class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="rgba(91, 91, 91, 1.000)" d="M512 0C229.25 0 0 229.25 0 512c0 226.25 146.688 418.125 350.156 485.812 25.594 4.688 34.938-11.125 34.938-24.625 0-12.188-0.469-52.562-0.719-95.312C242 908.812 211.906 817.5 211.906 817.5c-23.312-59.125-56.844-74.875-56.844-74.875-46.531-31.75 3.53-31.125 3.53-31.125 51.406 3.562 78.47 52.75 78.47 52.75 45.688 78.25 119.875 55.625 149 42.5 4.654-33 17.904-55.625 32.5-68.375C304.906 725.438 185.344 681.5 185.344 485.312c0-55.938 19.969-101.562 52.656-137.406-5.219-13-22.844-65.094 5.062-135.562 0 0 42.938-13.75 140.812 52.5 40.812-11.406 84.594-17.031 128.125-17.219 43.5 0.188 87.312 5.875 128.188 17.281 97.688-66.312 140.688-52.5 140.688-52.5 28 70.531 10.375 122.562 5.125 135.5 32.812 35.844 52.625 81.469 52.625 137.406 0 196.688-119.75 240-233.812 252.688 18.438 15.875 34.75 47 34.75 94.75 0 68.438-0.688 123.625-0.688 140.5 0 13.625 9.312 29.562 35.25 24.562C877.438 930 1024 738.125 1024 512 1024 229.25 794.75 0 512 0z" /></svg>'
    });
    this.twitterIcon = document.createElement('a');
    _.assign(this.twitterIcon, {
      href: "http://twitter.com/steveruizok",
      innerHTML: '<svg height="28px" width="28px" id="twitter_logo" class="logo" data-name="Logo — FIXED" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><style>.cls-1{fill:none;}.cls-2{fill:rgba(91, 91, 91, 1.000);}</style></defs><title>Twitter_Logo_Blue</title><rect class="cls-1" width="400" height="400"/><path class="cls-2" d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/></svg>'
    });
    ref2 = [this.linkedinIcon, this.githubIcon, this.twitterIcon];
    for (j = 0, len = ref2.length; j < len; j++) {
      element = ref2[j];
      this.socialMediaRow.element.appendChild(element);
      this.socialMediaRow.element.classList.add('socialLinks');
    }
    this.hideDivs();
  }

  SpecPanel.prototype.clearChildrenThenShowAnimations = function(animations) {
    var child;
    child = this.animsAcco.body.element.childNodes[0];
    if (child == null) {
      this.showAnimations(animations);
      return;
    }
    this.animsAcco.body.element.removeChild(child);
    return this.clearChildrenThenShowAnimations(animations);
  };

  SpecPanel.prototype.clearChildrenThenShowEventListeners = function(eventListeners) {
    var child;
    child = this.eventListenersAcco.body.element.childNodes[0];
    if (child == null) {
      this.showEventListeners(eventListeners);
      return;
    }
    this.eventListenersAcco.body.element.removeChild(child);
    return this.clearChildrenThenShowEventListeners(eventListeners);
  };

  SpecPanel.prototype.showEventListeners = function(eventListeners) {
    var box, defaults, e, event, i, j, k, len, len1, listener, realListeners, ref1, ref2, row;
    if (eventListeners == null) {
      eventListeners = [];
    }
    defaults = ["function (){return fn.apply(me,arguments)}", "function (){return fn.apply(me, arguments)}", "function (event){return event.preventDefault()}", "function (){ return fn.apply(me, arguments); }", 'function debounced(){var time=now(),isInvoking=shouldInvoke(time);if(lastArgs=arguments,lastThis=this,lastCallTime=time,isInvoking){if(timerId===undefined)return leadingEdge(lastCallTime);if(maxing)return timerId=setTimeout(timerExpired,wait),invokeFunc(lastCallTime)}return timerId===undefined&&(timerId=setTimeout(timerExpired,wait)),result}', 'function (value){if(null!==value)return"fontSize"!==property&&"font"!==property&&_this._styledText.resetStyle(property),_this.renderText()}'];
    realListeners = 0;
    for (i = j = 0, len = eventListeners.length; j < len; i = ++j) {
      listener = eventListeners[i];
      if (_.every(listener.events, function(e) {
        return _.includes(defaults, e["function"]);
      })) {
        continue;
      }
      row = new pRow({
        parent: this.eventListenersAcco.body,
        text: '"' + listener.listener + '"',
        bold: true
      });
      ref1 = listener.events;
      for (e = k = 0, len1 = ref1.length; k < len1; e = ++k) {
        event = ref1[e];
        if (_.includes(defaults, event["function"])) {
          continue;
        }
        realListeners++;
        row = new pRow({
          parent: this.eventListenersAcco.body,
          text: 'Name'
        });
        box = new pInput({
          parent: row,
          className: 'full',
          unit: '',
          value: (ref2 = event.name) != null ? ref2 : '',
          isDefault: event.name !== 'undefined'
        });
        row = new pRow({
          parent: this.eventListenersAcco.body,
          text: 'Function'
        });
        box = new pInput({
          parent: row,
          className: 'full',
          unit: '',
          value: event["function"],
          isDefault: false
        });
        row = new pRow({
          parent: this.eventListenersAcco.body,
          text: 'Once'
        });
        box = new pInput({
          parent: row,
          className: 'left',
          unit: '',
          value: event.once,
          isDefault: event.name !== 'false'
        });
        if (e !== listener.events.length - 1) {
          new pDivider({
            parent: this.eventListenersAcco.body
          });
        }
      }
      if (i !== eventListeners.length - 1) {
        new pDivider({
          parent: this.eventListenersAcco.body
        });
      }
    }
    if (realListeners === 0) {
      this.eventListenersAcco.color = '#888888';
      return;
    }
    return this.eventListenersAcco.color = '#FFFFFF';
  };

  SpecPanel.prototype.showAnimations = function(animations) {
    var anim, box, element, fromUnit, i, j, k, key, len, len1, options, properties, ref1, ref2, ref3, ref4, ref5, ref6, ref7, results, row, stateA, stateB, toUnit, value;
    this.animsAcco.color = animations.length > 0 ? '#FFF' : '#888888';
    results = [];
    for (i = j = 0, len = animations.length; j < len; i = ++j) {
      anim = animations[i];
      properties = anim.properties;
      options = anim.options;
      stateA = anim._stateA;
      stateB = anim._stateB;
      row = new pRow({
        parent: this.animsAcco.body,
        text: 'Animation ' + (i + 1),
        bold: true
      });
      fromUnit = new pLabel({
        parent: row,
        className: 'left',
        text: 'from'
      });
      toUnit = new pLabel({
        parent: row,
        className: 'right',
        text: 'to'
      });
      ref1 = [fromUnit.element, toUnit.element];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        element = ref1[k];
        element.classList.add('alignLeft');
      }
      for (key in properties) {
        value = properties[key];
        if (Color.isColorObject(value) || Color.isColor(value)) {
          row = new pRow({
            parent: this.animsAcco.body,
            text: _.startCase(key)
          });
          box = new pColor({
            parent: row,
            className: 'left',
            unit: '',
            value: stateA != null ? stateA[key] : void 0,
            isDefault: false
          });
          box = new pColor({
            parent: row,
            className: 'right',
            unit: '',
            value: stateB != null ? stateB[key] : void 0,
            isDefault: false
          });
        } else if (key === 'gradient') {
          row = new pRow({
            parent: this.animsAcco.body,
            text: 'Grad Start'
          });
          box = new pColor({
            parent: row,
            className: 'left',
            unit: '',
            value: stateA != null ? (ref2 = stateA[key]) != null ? ref2.start : void 0 : void 0,
            isDefault: false
          });
          box = new pColor({
            parent: row,
            className: 'right',
            unit: '',
            value: stateB != null ? (ref3 = stateB[key]) != null ? ref3.start : void 0 : void 0,
            isDefault: false
          });
          row = new pRow({
            parent: this.animsAcco.body,
            text: 'Grad End'
          });
          box = new pColor({
            parent: row,
            className: 'left',
            unit: '',
            value: stateA != null ? (ref4 = stateA[key]) != null ? ref4.end : void 0 : void 0,
            isDefault: false
          });
          box = new pColor({
            parent: row,
            className: 'right',
            unit: '',
            value: stateB != null ? (ref5 = stateB[key]) != null ? ref5.end : void 0 : void 0,
            isDefault: false
          });
          row = new pRow({
            parent: this.animsAcco.body,
            text: 'Grad Angle'
          });
          box = new pInput({
            parent: row,
            className: 'left',
            unit: '',
            value: stateA != null ? (ref6 = stateA[key]) != null ? ref6.angle : void 0 : void 0,
            isDefault: false
          });
          box = new pInput({
            parent: row,
            className: 'right',
            unit: '',
            value: stateB != null ? (ref7 = stateB[key]) != null ? ref7.angle : void 0 : void 0,
            isDefault: false
          });
        } else {
          row = new pRow({
            parent: this.animsAcco.body,
            text: _.startCase(key)
          });
          box = new pInput({
            parent: row,
            className: 'left',
            unit: '',
            value: stateA != null ? stateA[key] : void 0,
            isDefault: false
          });
          box = new pInput({
            parent: row,
            className: 'right',
            unit: '',
            value: stateB != null ? stateB[key] : void 0,
            isDefault: false
          });
        }
      }
      row = new pRow({
        parent: this.animsAcco.body,
        text: 'Options'
      });
      box = new pInput({
        parent: row,
        className: 'left',
        unit: 's',
        value: options.time,
        isDefault: false
      });
      box = new pInput({
        parent: row,
        className: 'right',
        unit: 'd',
        value: options.delay,
        isDefault: false
      });
      row = new pRow({
        parent: this.animsAcco.body,
        text: ''
      });
      box = new pInput({
        parent: row,
        className: 'left',
        unit: 'r',
        value: options.repeat,
        isDefault: false
      });
      box = new pInput({
        parent: row,
        className: 'right',
        unit: 'l',
        value: options.looping,
        isDefault: false
      });
      if (i !== animations.length - 1) {
        results.push(new pDivider({
          parent: this.animsAcco.body
        }));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  SpecPanel.prototype.showProperties = function(layer, customProps) {
    var def, defaults, key, propLayer, props, ref1, ref2, value;
    this.scrollTop = this.element.scrollTop;
    props = layer.props;
    _.assign(props, customProps);
    defaults = layer._propertyList();
    _.assign(defaults, {
      rotation: defaults.rotationZ,
      blending: {
        "default": 'normal'
      }
    });
    this.hideDivs();
    ref1 = _.merge(layer.props, customProps);
    for (key in ref1) {
      value = ref1[key];
      propLayer = this[key + 'Box'];
      if (!propLayer) {
        continue;
      }
      def = (ref2 = defaults[key]) != null ? ref2["default"] : void 0;
      this.showProperty(key, value, propLayer, def);
    }
    this.showOverrideInAcco(this.effectsDiv, this.effectsAcco);
    this.showOverrideInAcco(this.filtersDiv, this.filtersAcco);
    this.showOverrideInAcco(this.transformsDiv, this.transformsAcco);
    return this.element.scrollTop = this.scrollTop;
  };

  SpecPanel.prototype.showOverrideInAcco = function(div, acco) {
    var j, len, propLayer, ref1, results;
    acco.color = '#888888';
    ref1 = div.properties;
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      propLayer = ref1[j];
      if ((propLayer.value != null) && propLayer.value !== propLayer["default"]) {
        results.push(acco.color = '#FFF');
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  SpecPanel.prototype.showProperty = function(key, value, propLayer, def) {
    var ref1;
    if (value === propLayer.value) {
      return;
    }
    propLayer.isDefault = false;
    if ((value == null) || _.isNaN(value) || value === def) {
      value = def != null ? def : '';
      propLayer.isDefault = true;
    }
    if (Color.isColorObject(value)) {
      value = value.toHslString();
    }
    if ((value != null ? (ref1 = value.constructor) != null ? ref1.name : void 0 : void 0) === 'Gradient') {
      propLayer.value = '';
      return;
    }
    if (typeof value === 'string') {
      propLayer.value = value;
      return;
    }
    value = value.toString();
    if (value.indexOf('.') !== -1) {
      propLayer.value = parseFloat(value).toFixed(2);
      return;
    }
    return propLayer.value = parseInt(value, 10).toFixed();
  };

  SpecPanel.prototype.hideDivs = function() {
    var div, j, len, ref1, results;
    ref1 = [this.gradientPropertiesDiv, this.textPropertiesDiv, this.shadowPropertiesDiv, this.borderPropertiesDiv, this.imagePropertiesDiv, this.screenshotDiv];
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      div = ref1[j];
      results.push(div.visible = false);
    }
    return results;
  };

  return SpecPanel;

})();

propLayers = [];


/* -------------------------------------------

	 .88888.             dP            dP
	d8'   `88            88            88
	88        .d8888b. d8888P .d8888b. 88d888b. .d8888b.
	88   YP88 88'  `88   88   88'  `"" 88'  `88 88'  `88
	Y8.   .88 88.  .88   88   88.  ... 88    88 88.  .88
	 `88888'  `88888P'   dP   `88888P' dP    dP `8888888
 */

Gotcha = (function() {
  function Gotcha(options) {
    if (options == null) {
      options = {};
    }
    this.unfocus = bind(this.unfocus, this);
    this.focus = bind(this.focus, this);
    this.tryFocus = bind(this.tryFocus, this);
    this.getComponentFromLayer = bind(this.getComponentFromLayer, this);
    this.getScreenshot = bind(this.getScreenshot, this);
    this.getLayerEventListeners = bind(this.getLayerEventListeners, this);
    this.getLayerIsVisible = bind(this.getLayerIsVisible, this);
    this.getLayerFromElement = bind(this.getLayerFromElement, this);
    this.unsetSelectedLayer = bind(this.unsetSelectedLayer, this);
    this.setSelectedLayer = bind(this.setSelectedLayer, this);
    this.unsetHoveredLayer = bind(this.unsetHoveredLayer, this);
    this.setHoveredLayer = bind(this.setHoveredLayer, this);
    this.setPanelProperties = bind(this.setPanelProperties, this);
    this.showDistances = bind(this.showDistances, this);
    this.makeDashedLines = bind(this.makeDashedLines, this);
    this.makeRectOverlays = bind(this.makeRectOverlays, this);
    this.makeLabel = bind(this.makeLabel, this);
    this.makeLine = bind(this.makeLine, this);
    this.getDimensions = bind(this.getDimensions, this);
    this.update = bind(this.update, this);
    this.showTransition = bind(this.showTransition, this);
    this.transition = bind(this.transition, this);
    this.disable = bind(this.disable, this);
    this.enable = bind(this.enable, this);
    this.toggle = bind(this.toggle, this);
    this.specPanel = new SpecPanel;
    _.defaults(options, {
      color: 'rgba(72, 207, 255, 1.000)',
      selectedColor: 'rgba(255, 1, 255, 1.000)',
      secondaryColor: '#FFFFFF',
      fontFamily: 'Menlo',
      fontSize: '10',
      fontWeight: '500',
      borderRadius: 4,
      padding: {
        top: 1,
        bottom: 1,
        left: 3,
        right: 3
      }
    });
    _.assign(this, {
      color: options.color,
      selectedColor: options.selectedColor,
      secondaryColor: options.secondaryColor,
      fontFamily: options.fontFamily,
      fontSize: options.fontSize,
      fontWeight: options.fontWeight,
      shapes: [],
      borderRadius: options.borderRadius,
      padding: options.padding,
      focusedElement: void 0,
      enabled: false,
      screenElement: document.getElementsByClassName('DeviceComponentPort')[0],
      layers: [],
      containers: [],
      timer: void 0,
      _onlyVisible: true
    });
    document.addEventListener('keyup', this.toggle);
    Framer.CurrentContext.domEventManager.wrap(window).addEventListener("resize", this.update);
    this.context = document.getElementsByClassName('framerLayer DeviceScreen')[0];
    this.context.classList.add('hoverContext');
    this.context.childNodes[2].classList.add('IgnorePointerEvents');
    Object.defineProperty(this, "onlyVisible", {
      get: function() {
        return this._onlyVisible;
      },
      set: function(bool) {
        if (typeof bool !== 'boolean') {
          return;
        }
        return this._onlyVisible = bool;
      }
    });
    Framer.Device.on("change:deviceType", (function(_this) {
      return function() {
        return Utils.delay(0, _this.update);
      };
    })(this));
  }

  Gotcha.prototype.toggle = function(event, open) {
    var ref1, thisSpeed;
    if (event.key === "`" || event.key === "<" || open === true) {
      if (this.opened) {
        this.disable();
      } else {
        this.enable();
      }
      this.opened = !this.opened;
      return;
    }
    if (!this.enabled) {
      return;
    }
    if (event.key === "/" || event.key === ">") {
      this.setSelectedLayer();
      return;
    }
    if (event.key === ".") {
      if ((ref1 = this.hoveredLayer) != null) {
        ref1.emit(Events.Tap);
      }
      return;
    }
    if (event.key === "\\") {
      if (this._lastSpeed == null) {
        this._lastSpeed = 1;
      }
      thisSpeed = this.specPanel.speedBox.element.value;
      if (thisSpeed === "0") {
        this.specPanel.speedBox.element.value = this._lastSpeed;
        return this.specPanel.speedBox.action(this._lastSpeed);
      } else {
        this.specPanel.speedBox.element.value = 0;
        Framer.Loop.delta = .000000000000000000001;
        return this._lastSpeed = thisSpeed;
      }
    }
  };

  Gotcha.prototype.enable = function() {
    this._canvasColor = Canvas.backgroundColor;
    svgContext.setContext();
    this.transition(true);
    if (this.timer != null) {
      clearInterval(this.timer);
    }
    return this.timer = Utils.interval(1 / 15, this.focus);
  };

  Gotcha.prototype.disable = function() {
    this.unfocus();
    this.enabled = false;
    this.transition(false);
    if (this.timer != null) {
      return clearInterval(this.timer);
    }
  };

  Gotcha.prototype.transition = function(open, seconds) {
    var hands, midX;
    if (open == null) {
      open = true;
    }
    if (seconds == null) {
      seconds = .5;
    }
    hands = Framer.Device.hands;
    hands.on("change:x", this.showTransition);
    hands.once(Events.AnimationEnd, (function(_this) {
      return function() {
        hands.off("change:x", _this.showTransition);
        _this.enabled = _this.opened = open;
        if (open) {
          Framer.Device.screen.on(Events.MouseOver, _this.setHoveredLayer);
          Framer.Device.screen.on(Events.MouseOut, _this.unsetHoveredLayer);
          Framer.Device.background.on(Events.MouseOver, _this.unsetHoveredLayer);
          Framer.Device.screen.on(Events.Click, _this.setSelectedLayer);
        } else {
          Framer.Device.screen.off(Events.MouseOver, _this.setHoveredLayer);
          Framer.Device.screen.off(Events.MouseOut, _this.unsetHoveredLayer);
          Framer.Device.background.off(Events.MouseOver, _this.unsetHoveredLayer);
          Framer.Device.screen.off(Events.Click, _this.setSelectedLayer);
        }
        return _this.focus();
      };
    })(this));
    this._startPosition = Framer.Device.hands.x;
    midX = hands._context.innerWidth / 2;
    return Framer.Device.hands.animate({
      midX: open ? midX - 112 : midX,
      options: {
        time: seconds,
        curve: Spring({
          damping: 10
        })
      }
    });
  };

  Gotcha.prototype.showTransition = function() {
    var factor, hands, midX, opacity;
    hands = Framer.Device.hands;
    midX = hands._context.innerWidth / 2;
    opacity = Utils.modulate(hands.midX, [midX - 56, midX - 112], [0, 1], true);
    factor = Utils.modulate(hands.midX, [midX, midX - 112], [0, 1], true);
    this.specPanel.element.style.opacity = opacity;
    return Canvas.backgroundColor = Color.mix(this._canvasColor, 'rgba(30, 30, 30, 1.000)', factor);
  };

  Gotcha.prototype.update = function() {
    if (!this.opened) {
      return;
    }
    Framer.Device.hands.midX -= 122;
    svgContext.setContext();
    return this.focus();
  };

  Gotcha.prototype.getDimensions = function(element) {
    var d, dimensions;
    if (!element) {
      return;
    }
    d = element.getBoundingClientRect();
    dimensions = {
      x: d.left,
      y: d.top,
      width: d.width,
      height: d.height,
      midX: d.left + (d.width / 2),
      midY: d.top + (d.height / 2),
      maxX: d.left + d.width,
      maxY: d.top + d.height,
      frame: d
    };
    return dimensions;
  };

  Gotcha.prototype.makeLine = function(pointA, pointB, label) {
    var capA, capB, color, line;
    if (label == null) {
      label = true;
    }
    color = this.selectedLayer != null ? this.selectedColor : this.color;
    line = new SVGShape({
      type: 'path',
      d: "M " + pointA[0] + " " + pointA[1] + " L " + pointB[0] + " " + pointB[1],
      stroke: color,
      'stroke-width': '1px'
    });
    if (pointA[0] === pointB[0]) {
      capA = new SVGShape({
        type: 'path',
        d: "M " + (pointA[0] - 5) + " " + pointA[1] + " L " + (pointA[0] + 5) + " " + pointA[1],
        stroke: color,
        'stroke-width': '1px'
      });
      return capB = new SVGShape({
        type: 'path',
        d: "M " + (pointB[0] - 5) + " " + pointB[1] + " L " + (pointB[0] + 5) + " " + pointB[1],
        stroke: color,
        'stroke-width': '1px'
      });
    } else if (pointA[1] === pointB[1]) {
      capA = new SVGShape({
        type: 'path',
        d: "M " + pointA[0] + " " + (pointA[1] - 5) + " L " + pointA[0] + " " + (pointA[1] + 5),
        stroke: color,
        'stroke-width': '1px'
      });
      return capB = new SVGShape({
        type: 'path',
        d: "M " + pointB[0] + " " + (pointB[1] - 5) + " L " + pointB[0] + " " + (pointB[1] + 5),
        stroke: color,
        'stroke-width': '1px'
      });
    }
  };

  Gotcha.prototype.makeLabel = function(x, y, text) {
    var box, color, label, w;
    color = this.selectedLayer != null ? this.selectedColor : this.color;
    label = new SVGShape({
      type: 'text',
      parent: svgContext,
      x: x,
      y: y + 4,
      'font-family': this.fontFamily,
      'font-size': this.fontSize,
      'font-weight': this.fontWeight,
      'text-anchor': "middle",
      fill: this.secondaryColor,
      text: Math.floor(text / this.ratio)
    });
    w = label.element.textLength.baseVal.value;
    box = new SVGShape({
      type: 'rect',
      parent: svgContext,
      x: x - (w / 2) - this.padding.left,
      y: y - 7,
      width: w + this.padding.left + this.padding.right,
      height: 15,
      rx: this.borderRadius,
      ry: this.borderRadius,
      fill: new Color(color).darken(40),
      stroke: color,
      'stroke-width': '1px'
    });
    return label.show();
  };

  Gotcha.prototype.makeRectOverlays = function(selectedLayer, s, hoveredLayer, h) {
    var hoverFill, hoveredRect, selectFill, selectedRect;
    if (!s || !h) {
      return;
    }
    if (hoveredLayer === selectedLayer) {
      hoveredLayer = Framer.Device.screen;
    }
    hoverFill = new Color(this.color).alpha(.2);
    if (hoveredLayer === Framer.Device.screen) {
      hoverFill = new Color(this.color).alpha(0);
    }
    hoveredRect = new SVGShape({
      type: 'rect',
      parent: svgContext,
      x: h.x,
      y: h.y,
      width: h.width,
      height: h.height,
      stroke: this.color,
      fill: hoverFill,
      'stroke-width': '1px'
    });
    selectFill = new Color(this.selectedColor).alpha(.2);
    if (selectedLayer === Framer.Device.screen) {
      selectFill = new Color(this.selectedColor).alpha(0);
    }
    return selectedRect = new SVGShape({
      type: 'rect',
      parent: svgContext,
      x: s.x,
      y: s.y,
      width: s.width,
      height: s.height,
      stroke: this.selectedColor,
      fill: selectFill,
      'stroke-width': '1px'
    });
  };

  Gotcha.prototype.makeDashedLines = function(e, f, color, offset) {
    if (!e) {
      return;
    }
    if (e === f) {
      return;
    }
    color = new Color(color).alpha(.8);
    new DashedLine({
      x: e.x,
      y: f.y
    }, {
      x: e.x,
      y: f.maxY
    }, color, offset);
    new DashedLine({
      x: e.maxX,
      y: f.y
    }, {
      x: e.maxX,
      y: f.maxY
    }, color, offset);
    new DashedLine({
      x: f.x,
      y: e.y
    }, {
      x: f.maxX,
      y: e.y
    }, color, offset);
    return new DashedLine({
      x: f.x,
      y: e.maxY
    }, {
      x: f.maxX,
      y: e.maxY
    }, color, offset);
  };

  Gotcha.prototype.showDistances = function(selectedLayer, hoveredLayer) {
    var d, f, h, m, s;
    if (!selectedLayer || !hoveredLayer) {
      return;
    }
    s = this.getDimensions(selectedLayer._element);
    h = this.getDimensions(hoveredLayer._element);
    f = this.getDimensions(Framer.Device.screen._element);
    this.makeDashedLines(s, f, this.selectedColor, 5);
    this.makeRectOverlays(selectedLayer, s, hoveredLayer, h);
    this.ratio = Framer.Device.screen._element.getBoundingClientRect().width / Screen.width;
    if (s.x < h.x && s.maxX > h.maxX && s.y < h.y && s.maxY > h.maxY) {
      d = Math.abs(s.y - h.y);
      m = s.y + d / 2;
      this.makeLine([h.midX, s.y + 5], [h.midX, h.y - 4]);
      this.makeLabel(h.midX, m, d);
      d = Math.abs(s.maxX - h.maxX);
      m = h.maxX + (d / 2);
      this.makeLine([h.maxX + 5, h.midY], [s.maxX - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
      d = Math.abs(s.maxY - h.maxY);
      m = h.maxY + (d / 2);
      this.makeLine([h.midX, h.maxY + 5], [h.midX, s.maxY - 4]);
      this.makeLabel(h.midX, m, d);
      d = Math.abs(s.x - h.x);
      m = s.x + d / 2;
      this.makeLine([s.x + 5, h.midY], [h.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
      return;
    }
    if (s.x > h.x && s.maxX < h.maxX && s.y > h.y && s.maxY < h.maxY) {
      d = Math.abs(h.y - s.y);
      m = h.y + d / 2;
      this.makeLine([s.midX, h.y + 5], [s.midX, s.y - 4]);
      this.makeLabel(s.midX, m, d);
      d = Math.abs(h.maxX - s.maxX);
      m = s.maxX + (d / 2);
      this.makeLine([s.maxX + 5, s.midY], [h.maxX - 4, s.midY]);
      this.makeLabel(m, s.midY, d);
      d = Math.abs(h.maxY - s.maxY);
      m = s.maxY + (d / 2);
      this.makeLine([s.midX, s.maxY + 5], [s.midX, h.maxY - 4]);
      this.makeLabel(s.midX, m, d);
      d = Math.abs(h.x - s.x);
      m = h.x + d / 2;
      this.makeLine([h.x + 5, s.midY], [s.x - 4, s.midY]);
      this.makeLabel(m, s.midY, d);
      return;
    }
    if (s.y > h.maxY) {
      d = Math.abs(s.y - h.maxY);
      m = s.y - (d / 2);
      this.makeLine([h.midX, h.maxY + 5], [h.midX, s.y - 4]);
      this.makeLabel(h.midX, m, d);
    } else if (s.y > h.y) {
      d = Math.abs(s.y - h.y);
      m = s.y - (d / 2);
      this.makeLine([h.midX, h.y + 5], [h.midX, s.y - 4]);
      this.makeLabel(h.midX, m, d);
    }
    if (h.maxX < s.x) {
      d = Math.abs(s.x - h.maxX);
      m = s.x - (d / 2);
      this.makeLine([h.maxX + 5, h.midY], [s.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
    } else if (h.x < s.x) {
      d = Math.abs(s.x - h.x);
      m = s.x - (d / 2);
      this.makeLine([h.x + 5, h.midY], [s.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
    }
    if (s.maxX < h.x) {
      d = Math.abs(h.x - s.maxX);
      m = s.maxX + (d / 2);
      this.makeLine([s.maxX + 5, h.midY], [h.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
    } else if (s.x < h.x) {
      d = Math.abs(h.x - s.x);
      m = s.x + (d / 2);
      this.makeLine([s.x + 5, h.midY], [h.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
    }
    if (s.maxY < h.y) {
      d = Math.abs(h.y - s.maxY);
      m = s.maxY + (d / 2);
      this.makeLine([h.midX, s.maxY + 5], [h.midX, h.y - 4]);
      return this.makeLabel(h.midX, m, d);
    } else if (s.y < h.y) {
      d = Math.abs(h.y - s.y);
      m = s.y + (d / 2);
      this.makeLine([h.midX, s.y + 5], [h.midX, h.y - 4]);
      return this.makeLabel(h.midX, m, d);
    }
  };

  Gotcha.prototype.setPanelProperties = function() {
    var animations, customProps, eventListeners, layer, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8;
    layer = (ref1 = this.selectedLayer) != null ? ref1 : this.hoveredLayer;
    if (layer === this.lastLayer && layer.isAnimating === false) {
      return;
    }
    this.lastLayer = layer;
    this.lastProps = layer.props;
    customProps = {
      x: layer.screenFrame.x,
      y: layer.screenFrame.y,
      componentName: layer.constructor.name,
      componentNames: this.getComponentFromLayer(layer.parent),
      parentName: (ref2 = layer.parent) != null ? ref2.name : void 0,
      rotation: layer.rotationZ,
      blending: layer.blending
    };
    if (layer.gradient != null) {
      _.assign(customProps, {
        gradientStart: layer.gradient.start,
        gradientEnd: layer.gradient.end,
        gradientAngle: layer.gradient.angle
      });
    }
    if (layer.shadows != null) {
      _.assign(customProps, {
        shadowX: (ref3 = layer.shadows[0]) != null ? ref3.x : void 0,
        shadowY: (ref4 = layer.shadows[0]) != null ? ref4.y : void 0,
        shadowSpread: (ref5 = layer.shadows[0]) != null ? ref5.spread : void 0,
        shadowColor: (ref6 = layer.shadows[0]) != null ? ref6.color : void 0,
        shadowType: (ref7 = layer.shadows[0]) != null ? ref7.type : void 0,
        shadowBlur: (ref8 = layer.shadows[0]) != null ? ref8.blur : void 0
      });
    }
    this.specPanel.showProperties(layer, customProps);
    eventListeners = this.getLayerEventListeners(layer);
    this.specPanel.clearChildrenThenShowEventListeners(eventListeners);
    animations = layer.animations();
    return this.specPanel.clearChildrenThenShowAnimations(animations);
  };

  Gotcha.prototype.setHoveredLayer = function(event) {
    var layer;
    if (!this.enabled) {
      return;
    }
    layer = this.getLayerFromElement(event != null ? event.target : void 0);
    if (!this.getLayerIsVisible(layer)) {
      return;
    }
    this.hoveredLayer = layer;
    this.tryFocus(event);
    return false;
  };

  Gotcha.prototype.unsetHoveredLayer = function(event) {
    this.hoveredLayer = void 0;
    return Utils.delay(.05, (function(_this) {
      return function() {
        if (!_this.hoveredLayer) {
          return _this.focus();
        }
      };
    })(this));
  };

  Gotcha.prototype.setSelectedLayer = function() {
    if (!this.hoveredLayer) {
      return;
    }
    if (this.selectedLayer === this.hoveredLayer) {
      this.unsetSelectedLayer();
      return;
    }
    this.selectedLayer = this.hoveredLayer;
    return this.focus();
  };

  Gotcha.prototype.unsetSelectedLayer = function() {
    this.selectedLayer = void 0;
    return this.focus();
  };

  Gotcha.prototype.findLayerElement = function(element) {
    if (!element) {
      return;
    }
    if (!element.classList) {
      return;
    }
    if (element.classList.contains('framerLayer')) {
      return element;
    }
    return this.findLayerElement(element.parentNode);
  };

  Gotcha.prototype.getLayerFromElement = function(element) {
    var layer;
    if (!element) {
      return;
    }
    element = this.findLayerElement(element);
    layer = _.find(Framer.CurrentContext._layers, ['_element', element]);
    return layer;
  };

  Gotcha.prototype.getLayerIsVisible = function(layer) {
    if (!this._onlyVisible) {
      return true;
    }
    if (!layer) {
      return true;
    }
    if (layer.opacity === 0 || layer.visible === false || layer.gotchaIgnore) {
      return false;
    }
    return this.getLayerIsVisible(layer.parent);
  };

  Gotcha.prototype.getLayerEventListeners = function(layer) {
    var listeners;
    listeners = _.map(layer._events, function(evs, listener, c) {
      if (!_.isArray(evs)) {
        evs = [evs];
      }
      return {
        listener: listener,
        events: _.map(evs, function(ev) {
          return {
            name: ev.fn.name,
            "function": ev.fn.toString(),
            context: ev.context,
            once: ev.once
          };
        })
      };
    });
    return listeners;
  };

  Gotcha.prototype.getScreenshot = function(element) {
    var DOMURL, ctx, data, foreignObject, rect, svg, url;
    foreignObject = new SVGShape({
      type: 'foreignObject'
    });
    rect = element.getBoundingClientRect();
    ctx = this.specPanel.canvas.getContext('2d');
    data = ("<svg xmlns='http://www.w3.org/2000/svg' width='" + rect.width + "' height='" + rect.height + "'>") + '<foreignObject width="100%" height="100%">' + '<div xmlns="http://www.w3.org/1999/xhtml">' + element.innerHTML + '</div>' + '</foreignObject>' + '</svg>';
    DOMURL = window.URL || window.webkitURL || window;
    svg = new Blob([data], {
      type: 'image/svg+xml'
    });
    url = DOMURL.createObjectURL(svg);
    return this.specPanel.screenshotBox.value = url;
  };

  Gotcha.prototype.getComponentFromLayer = function(layer, names) {
    if (names == null) {
      names = [];
    }
    if (!layer) {
      return names.join(', ');
    }
    if (!_.includes(["Layer", "TextLayer", "ScrollComponent"], layer.constructor.name)) {
      names.push(layer.constructor.name);
    }
    return this.getComponentFromLayer(layer.parent, names);
  };

  Gotcha.prototype.tryFocus = function(event) {
    if (!this.enabled) {
      return;
    }
    this.focusElement = event.target;
    return (function(_this) {
      return function(event) {
        return Utils.delay(.05, function() {
          if (_this.focusElement !== event.target) {
            return;
          }
          return _this.focus();
        });
      };
    })(this)(event);
  };

  Gotcha.prototype.focus = function() {
    var hoveredLayer, ref1, ref2, selectedLayer;
    if (!this.enabled) {
      return;
    }
    this.unfocus();
    if (this.hoveredLayer == null) {
      this.hoveredLayer = Framer.Device.screen;
    }
    hoveredLayer = (ref1 = this.hoveredLayer) != null ? ref1 : Framer.Device.screen;
    selectedLayer = (ref2 = this.selectedLayer) != null ? ref2 : Framer.Device.screen;
    if (selectedLayer === hoveredLayer) {
      hoveredLayer = Framer.Device.screen;
    }
    if (hoveredLayer === selectedLayer) {
      return;
    }
    this.showDistances(selectedLayer, hoveredLayer);
    return this.setPanelProperties(selectedLayer, hoveredLayer);
  };

  Gotcha.prototype.unfocus = function(event) {
    return svgContext.removeAll();
  };

  return Gotcha;

})();

panel = document.createElement('div');

panel.id = 'pContainer';

viewC = document.getElementById('FramerContextRoot-Default');

Utils.delay(0, (function(_this) {
  return function() {
    return viewC.appendChild(panel);
  };
})(this));

secretBox = document.createElement('input');

document.body.appendChild(secretBox);

svgContext = new SVGContext;

exports.gotcha = gotcha = new Gotcha;


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL25hdGFsaWUvRGVza3RvcC9jb3JlX25hdGFsaWUvZnJhbWVyX3RyYW5zaXRpb25zLzAwNF9jYW52YXMuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbmF0YWxpZS9EZXNrdG9wL2NvcmVfbmF0YWxpZS9mcmFtZXJfdHJhbnNpdGlvbnMvMDA0X2NhbnZhcy5mcmFtZXIvbW9kdWxlcy9nb3RjaGEvZ290Y2hhLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsIiMgXHQgLjg4ODg4LiAgICAgICAgICAgICBkUCAgICAgICAgICAgIGRQXG4jIFx0ZDgnICAgYDg4ICAgICAgICAgICAgODggICAgICAgICAgICA4OFxuIyBcdDg4ICAgICAgICAuZDg4ODhiLiBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi5cbiMgXHQ4OCAgIFlQODggODgnICBgODggICA4OCAgIDg4JyAgYFwiXCIgODgnICBgODggODgnICBgODhcbiMgXHRZOC4gICAuODggODguICAuODggICA4OCAgIDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4XG4jIFx0IGA4ODg4OCcgIGA4ODg4OFAnICAgZFAgICBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQOFxuIyBcdFxuIyBcdFxuIyBieSBAc3RldmVydWl6b2tcbiNcbiMgQSBGcmFtZXIgbW9kdWxlIGZvciBoYW5kb2ZmLiBJdCB3b3JrcyBraW5kIG9mIGxpa2UgdGhhdCBvdGhlciB0b29sLlxuXG5kZXZpY2VUeXBlID0gd2luZG93LmxvY2FsU3RvcmFnZS5kZXZpY2VUeXBlXG5cbmlmIGRldmljZVR5cGU/IFxuXHRkZXZpY2UgPSBGcmFtZXIuRGV2aWNlQ29tcG9uZW50LkRldmljZXNbZGV2aWNlVHlwZV1cblx0RnJhbWVyLkRldmljZS5fY29udGV4dC5kZXZpY2VQaXhlbFJhdGlvID0gZGV2aWNlLmRldmljZVBpeGVsUmF0aW9cblxuXHRGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgPSBkZXZpY2VUeXBlXG5cdHdpbmRvdy5sb2NhbFN0b3JhZ2UuZGV2aWNlID0gdW5kZWZpbmVkXG5cbkZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cbnN2Z0NvbnRleHQgPSB1bmRlZmluZWRcbnN0YXJ0T3BlbiA9IGZhbHNlXG5hY2NvcmRpb25zT3BlbiA9IGZhbHNlXG5cbiMgZGVidWdnaW5nXG5cbmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0RldmljZVBob25lJylbMF0/LmNsYXNzTGlzdC5hZGQoJ0lnbm9yZVBvaW50ZXJFdmVudHMnKVxuXG5cbiMjIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgXHQuZDg4ODg4YiAgZFAgICAgIGRQICAuODg4ODguICAgICAgYTg4ODg4Yi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4gIFx0ODguICAgIFwiJyA4OCAgICAgODggZDgnICAgYDg4ICAgIGQ4JyAgIGA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiAgXHRgWTg4ODg4Yi4gODggICAgLjhQIDg4ICAgICAgICAgICA4OCAgICAgICAgLmQ4ODg4Yi4gODhkOGIuZDhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiBkODg4OFAgLmQ4ODg4Yi5cbiAgXHQgICAgICBgOGIgODggICAgZDgnIDg4ICAgWVA4OCAgICA4OCAgICAgICAgODgnICBgODggODgnYDg4J2A4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGA4OCAgIDg4ICAgWThvb29vby5cbiAgXHRkOCcgICAuOFAgODggIC5kOFAgIFk4LiAgIC44OCAgICBZOC4gICAuODggODguICAuODggODggIDg4ICA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OCAgICA4OCAgIDg4ICAgICAgICAgODhcbiAgXHQgWTg4ODg4UCAgODg4ODg4JyAgICBgODg4ODgnICAgICAgWTg4ODg4UCcgYDg4ODg4UCcgZFAgIGRQICBkUCA4OFk4ODhQJyBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyBkUCAgICBkUCAgIGRQICAgYDg4ODg4UCdcbiAgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuICBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4jIyNcblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBTVkcgQ29udGV4dFxuXG5jbGFzcyBTVkdDb250ZXh0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEBfX2NvbnN0cnVjdG9yID0gdHJ1ZVxuXHRcdFxuXHRcdEBzaGFwZXMgPSBbXVxuXG5cdFx0c3ZnQ29udGV4dCA9IEBcblxuXHRcdCMgbmFtZXNwYWNlXG5cdFx0c3ZnTlMgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcblx0XHRcblx0XHQjIHNldCBhdHRyaWJ1dGVzIFxuXHRcdHNldEF0dHJpYnV0ZXMgPSAoZWxlbWVudCwgYXR0cmlidXRlcyA9IHt9KSAtPlxuXHRcdFx0Zm9yIGtleSwgdmFsdWUgb2YgYXR0cmlidXRlc1xuXHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXG5cblx0XHQjIENyZWF0ZSBTVkcgZWxlbWVudFxuXG5cdFx0QHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhzdmdOUywgJ3N2ZycpXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChAc3ZnKVxuXHRcdEBzdmcuc3R5bGVbJ3otaW5kZXgnXSA9ICc5OTknXG5cblx0XHRAZnJhbWVFbGVtZW50ID0gRnJhbWVyLkRldmljZS5zY3JlZW5CYWNrZ3JvdW5kLl9lbGVtZW50XG5cblx0XHRAc2V0Q29udGV4dCgpXG5cblx0XHQjIGRlZnNcblx0XHRcblx0XHRAc3ZnRGVmcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhzdmdOUywgJ2RlZnMnKVxuXHRcdEBzdmcuYXBwZW5kQ2hpbGQgQHN2Z0RlZnNcblx0XHRcblx0XHRkZWxldGUgQF9fY29uc3RydWN0b3JcblxuXHRzZXRBdHRyaWJ1dGVzOiAoZWxlbWVudCwgYXR0cmlidXRlcyA9IHt9KSAtPlxuXHRcdGZvciBrZXksIHZhbHVlIG9mIGF0dHJpYnV0ZXNcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblx0c2V0Q29udGV4dDogPT5cblxuXHRcdEBsRnJhbWUgPSBAZnJhbWVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0d2lkdGg6IEBsRnJhbWUud2lkdGgudG9GaXhlZCgpXG5cdFx0XHRoZWlnaHQ6IEBsRnJhbWUuaGVpZ2h0LnRvRml4ZWQoKVxuXHRcdFx0eDogQGxGcmFtZS5sZWZ0LnRvRml4ZWQoKVxuXHRcdFx0eTogQGxGcmFtZS50b3AudG9GaXhlZCgpXG5cblx0XHRAc2NyZWVuRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZyYW1lckNvbnRleHQnKVswXVxuXHRcdHNGcmFtZSA9IEBzY3JlZW5FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cblx0XHRAc2V0QXR0cmlidXRlcyBAc3ZnLFxuXHRcdFx0eDogMFxuXHRcdFx0eTogMFxuXHRcdFx0d2lkdGg6IHNGcmFtZS53aWR0aFxuXHRcdFx0aGVpZ2h0OiBzRnJhbWUuaGVpZ2h0XG5cdFx0XHR2aWV3Qm94OiBcIjAgMCAje3NGcmFtZS53aWR0aH0gI3tzRnJhbWUuaGVpZ2h0fVwiXG5cblx0XHRfLmFzc2lnbiBAc3ZnLnN0eWxlLFxuXHRcdFx0cG9zaXRpb246IFwiYWJzb2x1dGVcIlxuXHRcdFx0bGVmdDogMFxuXHRcdFx0dG9wOiAwXG5cdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRoZWlnaHQ6ICcxMDAlJ1xuXHRcdFx0J3BvaW50ZXItZXZlbnRzJzogJ25vbmUnXG5cblx0YWRkU2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc2hhcGVzLnB1c2goc2hhcGUpXG5cdFx0QHNob3dTaGFwZShzaGFwZSlcblx0XHRcblx0cmVtb3ZlU2hhcGU6IChzaGFwZSkgLT5cblx0XHRAaGlkZVNoYXBlKHNoYXBlKVxuXHRcdF8ucHVsbChAc2hhcGVzLCBzaGFwZSlcblx0XHRcblx0aGlkZVNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QHN2Zy5yZW1vdmVDaGlsZChzaGFwZS5lbGVtZW50KVxuXHRcblx0c2hvd1NoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QHN2Zy5hcHBlbmRDaGlsZChzaGFwZS5lbGVtZW50KVxuXHRcdFxuXHRhZGREZWY6IChkZWYpIC0+XG5cdFx0QHN2Z0RlZnMuYXBwZW5kQ2hpbGQoZGVmKVxuXG5cdHJlbW92ZUFsbDogPT5cblx0XHRmb3Igc2hhcGUgaW4gQHNoYXBlc1xuXHRcdFx0QHN2Zy5yZW1vdmVDaGlsZChzaGFwZS5lbGVtZW50KVxuXHRcdEBzaGFwZXMgPSBbXVxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBTVkcgU2hhcGVcblxuY2xhc3MgU1ZHU2hhcGVcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge3R5cGU6ICdjaXJjbGUnfSkgLT5cblx0XHRAX19jb25zdHJ1Y3RvciA9IHRydWVcblx0XHRcblx0XHRAcGFyZW50ID0gc3ZnQ29udGV4dFxuXHRcdFxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuXHRcdFx0XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcblx0XHRcdG9wdGlvbnMudHlwZVxuXHRcdFx0KVxuXG5cdFx0QHNldEN1c3RvbVByb3BlcnR5KCd0ZXh0JywgJ3RleHRDb250ZW50JywgJ3RleHRDb250ZW50Jywgb3B0aW9ucy50ZXh0KVxuXHRcdFx0XHRcblx0XHQjIGFzc2lnbiBhdHRyaWJ1dGVzIHNldCBieSBvcHRpb25zXG5cdFx0Zm9yIGtleSwgdmFsdWUgb2Ygb3B0aW9uc1xuXHRcdFx0QHNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXG5cdFx0QHBhcmVudC5hZGRTaGFwZShAKVxuXHRcdFxuXHRcdEBzaG93KClcblx0XHRcdFxuXHRzZXRBdHRyaWJ1dGU6IChrZXksIHZhbHVlKSA9PlxuXHRcdHJldHVybiBpZiBrZXkgaXMgJ3RleHQnXG5cdFx0aWYgbm90IEBba2V5XT9cblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0XHRrZXksXG5cdFx0XHRcdGdldDogPT5cblx0XHRcdFx0XHRyZXR1cm4gQGVsZW1lbnQuZ2V0QXR0cmlidXRlKGtleSlcblx0XHRcdFx0c2V0OiAodmFsdWUpID0+IFxuXHRcdFx0XHRcdEBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXHRcdFxuXHRcdEBba2V5XSA9IHZhbHVlXG5cdFxuXHRzZXRDdXN0b21Qcm9wZXJ0eTogKHZhcmlhYmxlTmFtZSwgcmV0dXJuVmFsdWUsIHNldFZhbHVlLCBzdGFydFZhbHVlKSAtPlxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0dmFyaWFibGVOYW1lLFxuXHRcdFx0Z2V0OiAtPlxuXHRcdFx0XHRyZXR1cm4gcmV0dXJuVmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRAZWxlbWVudFtzZXRWYWx1ZV0gPSB2YWx1ZVxuXG5cdFx0QFt2YXJpYWJsZU5hbWVdID0gc3RhcnRWYWx1ZVxuXG5cdGhpZGU6IC0+IFxuXHRcdEBwYXJlbnQuaGlkZVNoYXBlKEApXG5cdFxuXHRzaG93OiAtPiBcblx0XHRAcGFyZW50LnNob3dTaGFwZShAKVxuXHRcdFxuXHRyZW1vdmU6IC0+XG5cdFx0QHBhcmVudC5yZW1vdmVTaGFwZShAKVxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBEYXNoZWQgTGluZVxuXG5jbGFzcyBEYXNoZWRMaW5lIGV4dGVuZHMgU1ZHU2hhcGVcblx0Y29uc3RydWN0b3I6IChwb2ludEEsIHBvaW50QiwgY29sb3IgPSAnIzAwMCcsIG9mZnNldCA9IDAsIG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uYXNzaWduIG9wdGlvbnMsXG5cdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdGQ6IFwiTSAje3BvaW50QS54fSAje3BvaW50QS55fSBMICN7cG9pbnRCLnh9ICN7cG9pbnRCLnl9XCJcblx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXHRcdFx0J3N0cm9rZS1kYXNoYXJyYXknOiBcIjUsIDVcIlxuXHRcdFx0J3N0cm9rZS1kYXNob2Zmc2V0Jzogb2Zmc2V0XG5cblx0XHRzdXBlciBvcHRpb25zXG5cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFBhbmVsIENvbXBvbmVudHNcblxuVXRpbHMuaW5zZXJ0Q1NTIFwiXCJcIlxuXG5cdC5sb2dvIHtcblx0XHRvcGFjaXR5OiAuNDtcblx0fVxuXG5cdC5sb2dvOmhvdmVyIHtcblx0XHRvcGFjaXR5OiAxO1xuXHR9XG5cdFxuXHQjbGlua2VkaW5fbG9nbyB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvdHRvbTogOHB4O1xuXHRcdHJpZ2h0OiA2OHB4O1xuXHR9XG5cblx0XG5cdCN0d2l0dGVyX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDRweDtcblx0XHRyaWdodDogNHB4O1xuXHR9XG5cblx0I2dpdGh1Yl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA4cHg7XG5cdFx0cmlnaHQ6IDM2cHg7XG5cdH1cblxuXHQuZnJhbWVyTGF5ZXIgeyBcblx0XHRwb2ludGVyLWV2ZW50czogYWxsICFpbXBvcnRhbnQ7IFxuXHRcdH0gXG5cdFxuXHQuSWdub3JlUG9pbnRlckV2ZW50cyB7XG5cdFx0cG9pbnRlci1ldmVudHM6IG5vbmUgIWltcG9ydGFudDsgXG5cdH1cblxuXHQuZHJvcGRvd24ge1xuXHRcdG9wYWNpdHk6IDA7XG5cdH1cblxuXHQjcENvbnRhaW5lciB7XG5cdFx0cG9zaXRpb246IGZpeGVkO1xuXHRcdHJpZ2h0OiAwO1xuXHRcdHdpZHRoOiAyMjRweDtcblx0XHRoZWlnaHQ6IDEwMCU7XG5cdFx0Zm9udC1mYW1pbHk6ICdIZWx2ZXRpY2EgTmV1ZSc7XG5cdFx0Zm9udC1zaXplOiAxMXB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjAsIDIwLCAyMCwgMS4wMDApO1xuXHRcdGJvcmRlci1sZWZ0OiAxcHggc29saWQgcmdiYSg0NSwgNDUsIDQ1LCAxLjAwMCk7XG5cdFx0cG9pbnRlci1ldmVudHM6IGFsbDtcblx0XHR3aGl0ZS1zcGFjZTogbm93cmFwO1xuXHRcdGN1cnNvcjogZGVmYXVsdDtcblx0XHRvdmVyZmxvdzogc2Nyb2xsO1xuXHRcdHBhZGRpbmctdG9wOiA4cHg7XG5cdH1cblxuXHQucERpdiB7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0d2lkdGg6IDEwMCU7XG5cdH1cblxuXHQuaGlkZGVuIHtcblx0XHRkaXNwbGF5OiBub25lO1xuXHR9XG5cblx0LnBSb3cge1xuXHRcdHdpZHRoOiAxMDAlO1xuXHRcdGhlaWdodDogMzJweDtcblx0fVxuXG5cdC5wU3BhbiB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGNvbG9yOiAjODg4ODg4O1xuXHRcdGZvbnQtd2VpZ2h0OiA0MDA7XG5cdFx0bGV0dGVyLXNwYWNpbmc6IC41cHg7XG5cdFx0cGFkZGluZy1sZWZ0OiA4cHg7XG5cdFx0bWFyZ2luLXRvcDogMnB4O1xuXHR9XG5cblx0LnBMYWJlbCB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdHRleHQtYWxpZ246IHJpZ2h0O1xuXHRcdGZvbnQtc2l6ZTogMTBweDtcblx0XHR3aWR0aDogbm9uZTtcblx0XHRtYXJnaW4tdG9wOiAycHg7XG5cdFx0bWFyZ2luLXJpZ2h0OiA4cHg7XG5cdFx0ei1pbmRleDogMTA7XG5cdFx0cG9pbnRlci1ldmVudHM6IG5vbmU7XG5cdH1cblxuXHQucFJhbmdlIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdG1hcmdpbi10b3A6IDE1cHg7XG5cdFx0bWFyZ2luLXJpZ2h0OiA0cHg7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzAwMDtcblx0XHQtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7ICAvKiBPdmVycmlkZSBkZWZhdWx0IENTUyBzdHlsZXMgKi9cblx0XHRhcHBlYXJhbmNlOiBub25lO1xuXHRcdHdpZHRoOiAxMDAlOyBcblx0XHRoZWlnaHQ6IDRweDtcblx0XHRiYWNrZ3JvdW5kOiAjMzIzMjMyO1xuXHRcdG91dGxpbmU6IG5vbmU7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXG5cblx0LnBSYW5nZTo6LXdlYmtpdC1zbGlkZXItdGh1bWIge1xuXHRcdGJvcmRlci1yYWRpdXM6IDhweDtcblx0XHQtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG5cdFx0YXBwZWFyYW5jZTogbm9uZTtcblx0XHR3aWR0aDogMTZweDtcblx0XHRoZWlnaHQ6IDE2cHg7XG5cdFx0YmFja2dyb3VuZDogIzg4ODg4ODtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdGN1cnNvcjogcG9pbnRlcjtcblx0fVxuXG5cdC5wUmFuZ2U6Oi1tb3otcmFuZ2UtdGh1bWIge1xuXHRcdGJvcmRlci1yYWRpdXM6IDhweDtcblx0XHR3aWR0aDogMTZweDtcblx0XHRoZWlnaHQ6IDE2cHg7XG5cdFx0YmFja2dyb3VuZDogIzg4ODg4ODtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdGN1cnNvcjogcG9pbnRlcjtcblx0fVxuXG5cdC5wSW5wdXQge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMyOTI5Mjk7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzAwMDtcblx0XHRjb2xvcjogIzU1NTU1NTtcblx0XHRwYWRkaW5nOiA0cHg7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvcmRlci1yYWRpdXM6IDRweDtcblx0XHRvdXRsaW5lOiBub25lO1xuXHRcdG1hcmdpbi10b3A6IDRweDtcblx0fVxuXG5cdC5wSW5wdXQ6aG92ZXIge1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICM0OGNmZmY7XG5cdFx0Y29sb3I6ICM0OGNmZmY7XG5cdH1cblxuXHQucmlnaHQge1xuXHRcdHJpZ2h0OiA4cHg7XG5cdFx0d2lkdGg6IDQ4cHg7XG5cdH1cblxuXHQubGVmdCB7XG5cdFx0cmlnaHQ6IDcycHg7XG5cdFx0d2lkdGg6IDQ4cHg7XG5cdH1cblxuXHQuYWxpZ25MZWZ0IHtcblx0XHR0ZXh0LWFsaWduOiBsZWZ0O1xuXHR9XG5cblx0LmZ1bGwge1xuXHRcdHJpZ2h0OiA4cHg7XG5cdFx0d2lkdGg6IDExMnB4O1xuXHR9XG5cblx0LnBJbWFnZSB7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0bWFyZ2luLWxlZnQ6IDhweDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdFx0d2lkdGg6IDE5NnB4O1xuXHRcdG92ZXJmbG93OiBoaWRkZW47XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzI5MjkyOTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdGJvcmRlci1yYWRpdXM6IDRweDtcblx0XHRvdXRsaW5lOiA0cHggc29saWQgIzI5MjkyOTtcblx0XHRvdXRsaW5lLW9mZnNldDogLTRweDtcblx0XHRwYWRkaW5nOiA0cHg7XG5cdH1cblxuXHQucEltYWdlOmhvdmVyIHtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjNDhjZmZmO1xuXHRcdGNvbG9yOiAjNDhjZmZmO1xuXHRcdG91dGxpbmU6IDJweCBzb2xpZCAjMjkyOTI5O1xuXHR9XG5cblx0LnBDb2xvciB7XG5cdFx0b3V0bGluZTogNHB4IHNvbGlkICMyOTI5Mjk7XG5cdFx0b3V0bGluZS1vZmZzZXQ6IC00cHg7XG5cdH1cblxuXHQucENvbG9yOmhvdmVyIHtcblx0XHRvdXRsaW5lOiAycHggc29saWQgIzI5MjkyOTtcblx0XHRjb2xvcjogIzQ4Y2ZmZjtcblx0fVxuXG5cdC5wU2VsZWN0IHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0cmlnaHQ6IDhweDtcblx0XHR3aWR0aDogMTIycHg7XG5cdFx0Y29sb3I6ICM1NTU1NTU7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzI5MjkyOTtcblx0XHQtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzAwMDtcblx0XHRwYWRkaW5nOiA0cHg7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdG91dGxpbmU6IG5vbmU7XG5cdH1cblxuXHQucERpdmlkZXIge1xuXHRcdGhlaWdodDogMXB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG5cdFx0bWFyZ2luOiAxNnB4IDhweCAxNnB4IDhweDtcblx0fVxuXG5cdC5wQWNjb3JkaWFuIHtcblx0XHRib3JkZXItdG9wOiAxcHggc29saWQgIzE0MTQxNDtcblx0XHRib3JkZXItYm90dG9tOiAxcHggc29saWQgIzE0MTQxNDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdFx0bWluLWhlaWdodDogMzJweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMUQxRDFEO1xuXHRcdG1hcmdpbi10b3A6IDE2cHg7XG5cdH1cblxuXHQucEFjY29yZGlhbkJvZHkge1xuXHRcdGRpc3BsYXk6IG5vbmU7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHRcdG1hcmdpbi10b3A6IDMycHg7XG5cdFx0cGFkZGluZy10b3A6IDRweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMTQxNDE0O1xuXHR9XG5cblx0LmFjdGl2ZSB7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cblx0Lmhhc1ZhbHVlIHtcblx0XHRjb2xvcjogI0ZGRjtcblx0fVxuXG5cdC5zb2NpYWxMaW5rcyB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzE0MTQxNDtcblx0XHRwb3NpdGlvbjogZml4ZWQ7XG5cdFx0Ym90dG9tOiAwcHg7XG5cdFx0cmlnaHQ6IDBweDtcblx0XHRwYWRkaW5nLXRvcDogNHB4O1xuXHRcdHotaW5kZXg6IDEwMDtcblx0fVxuXG5cdC5zdHJvbmcge1xuXHRcdGZvbnQtd2VpZ2h0OiA2MDA7XG5cdH1cblxuXCJcIlwiXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIERpdlxuXG5jbGFzcyBwRGl2XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiB1bmRlZmluZWRcblxuXHRcdEBwcm9wZXJ0aWVzID0gW11cblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicERpdlwiKVxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0XCJ2aXNpYmxlXCIsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX3Zpc2libGVcblx0XHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRcdHJldHVybiBpZiBib29sIGlzIEBfdmlzaWJsZVxuXG5cdFx0XHRcdEBfdmlzaWJsZSA9IGJvb2xcblxuXHRcdFx0XHRpZiBib29sXG5cdFx0XHRcdFx0QGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFJvd1xuXG5jbGFzcyBwUm93IGV4dGVuZHMgcERpdlxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRleHQ6ICdMYWJlbCdcblx0XHRcdGJvbGQ6IGZhbHNlXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0Y2hpbGRyZW46IFtdXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwicERpdlwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwUm93XCIpXG5cblx0XHRAbGFiZWwgPSBuZXcgcFNwYW5cblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogb3B0aW9ucy50ZXh0XG5cdFx0XHRib2xkOiBvcHRpb25zLmJvbGRcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCAnY29sb3InLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQGxhYmVsLnN0eWxlLmNvbG9yXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0QGxhYmVsLmVsZW1lbnQuc3R5bGUuY29sb3IgPSB2YWx1ZVxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBEaXZpZGVyXG5cbmNsYXNzIHBEaXZpZGVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiB1bmRlZmluZWRcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicERpdmlkZXJcIilcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNwYW5cblxuY2xhc3MgcFNwYW5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXHRcdFx0dGV4dDogJ2hlbGxvIHdvcmxkJ1xuXHRcdFx0Ym9sZDogZmFsc2VcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBTcGFuXCIpXG5cdFx0QGVsZW1lbnQudGV4dENvbnRlbnQgPSBvcHRpb25zLnRleHRcblxuXHRcdGlmIG9wdGlvbnMuYm9sZFxuXHRcdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInN0cm9uZ1wiKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd0ZXh0Jyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBlbGVtZW50LnRleHRDb250ZW50XG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT4gQGVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZVxuXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFJhbmdlXG5cbmNsYXNzIHBSYW5nZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogbnVsbFxuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHZhbHVlOiAnJ1xuXHRcdFx0bWluOiAnMCdcblx0XHRcdG1heDogJzEwMCdcblx0XHRcdHZhbHVlOiAnMTAwJ1xuXHRcdFx0YWN0aW9uOiAodmFsdWUpID0+IG51bGxcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuXHRcdF8uYXNzaWduIEBlbGVtZW50LFxuXHRcdFx0dHlwZTogJ3JhbmdlJ1xuXHRcdFx0bWluOiBvcHRpb25zLm1pblxuXHRcdFx0bWF4OiBvcHRpb25zLm1heFxuXHRcdFx0dmFsdWU6IG9wdGlvbnMudmFsdWVcblx0XHRcdGFjdGlvbjogb3B0aW9ucy5hY3Rpb25cblxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwUmFuZ2VcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKVxuXG5cdFx0QGVsZW1lbnQub25pbnB1dCA9ID0+IEBhY3Rpb24oQHZhbHVlKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdHByb3BMYXllcnMucHVzaChAKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBlbGVtZW50LnZhbHVlXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0YWN0aW9uOiBvcHRpb25zLmFjdGlvblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBMYWJlbFxuXG5jbGFzcyBwTGFiZWxcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXHRcdFx0Y2xhc3NOYW1lOiBudWxsXG5cdFx0XHR0ZXh0OiAneCdcblx0XHRcdGZvcjogdW5kZWZpbmVkXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicExhYmVsXCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNsYXNzTmFtZSlcblx0XHRcblx0XHRfLmFzc2lnbiBAZWxlbWVudCxcblx0XHRcdHRleHRDb250ZW50OiBvcHRpb25zLnRleHRcblx0XHRcdGZvcjogb3B0aW9ucy5mb3JcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIElucHV0XG5cbmNsYXNzIHBJbnB1dFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogbnVsbFxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHZhbHVlOiAnJ1xuXHRcdFx0dW5pdDogJ3gnXG5cdFx0XHRkZWZhdWx0OiAnJ1xuXHRcdFx0aXNEZWZhdWx0OiB0cnVlXG5cdFx0XHRzZWN0aW9uOiB1bmRlZmluZWRcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwSW5wdXRcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdG9wdGlvbnMuc2VjdGlvbj8ucHJvcGVydGllcy5wdXNoKEApXG5cblx0XHRAdW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdHBhcmVudDogb3B0aW9ucy5wYXJlbnRcblx0XHRcdGNsYXNzTmFtZTogb3B0aW9ucy5jbGFzc05hbWVcblx0XHRcdHRleHQ6IG9wdGlvbnMudW5pdFxuXHRcdFx0Zm9yOiBAZWxlbWVudFxuXG5cdFx0cHJvcExheWVycy5wdXNoKEApXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQnZGVmYXVsdCcsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX2RlZmF1bHRcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRAX2RlZmF1bHQgPSB2YWx1ZVxuXG5cdFx0QGRlZmF1bHQgPSBvcHRpb25zLmRlZmF1bHQgPyAnJ1xuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdFx0aWYgbm90IHZhbHVlPyBvciB2YWx1ZSBpcyBcIlwiIG9yIHZhbHVlIGlzIFwidW5kZWZpbmVkXCJcblx0XHRcdFx0XHR2YWx1ZSA9IFN0cmluZyhAZGVmYXVsdClcblxuXHRcdFx0XHRAZWxlbWVudC52YWx1ZSA9IHZhbHVlID8gXCJcIlxuXG5cdFx0XHRcdGlmIHZhbHVlPyBhbmQgbm90IEBpc0RlZmF1bHQgYW5kIHZhbHVlIGlzbnQgXCJcIlxuXHRcdFx0XHRcdCMgQHNlY3Rpb24/LmNvbG9yID0gJyNGRkYnXG5cdFx0XHRcdFx0QHNlY3Rpb24/LnZpc2libGUgPSB0cnVlXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQnaXNEZWZhdWx0Jyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfaXNEZWZhdWx0XG5cdFx0XHRzZXQ6IChib29sKSAtPlxuXHRcdFx0XHRAX2lzRGVmYXVsdCA9IGJvb2xcblxuXHRcdFx0XHRpZiBib29sXG5cdFx0XHRcdFx0QGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGFzVmFsdWUnKVxuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdEAuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoYXNWYWx1ZScpXG5cblxuXHRcdEBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgPT5cblx0XHRcdGlmIG5vdCBzZWNyZXRCb3hcblx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdHNlY3JldEJveC52YWx1ZSA9IEB2YWx1ZVxuXHRcdFx0c2VjcmV0Qm94LnNlbGVjdCgpXG5cdFx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG5cdFx0XHRzZWNyZXRCb3guYmx1cigpXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0dmFsdWU6IG9wdGlvbnMudmFsdWVcblx0XHRcdGRlZmF1bHQ6IG9wdGlvbnMuZGVmYXVsdFxuXHRcdFx0c2VjdGlvbjogb3B0aW9ucy5zZWN0aW9uXG5cdFx0XHRpc0RlZmF1bHQ6IG9wdGlvbnMuaXNEZWZhdWx0XG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIEltYWdlXG5cbmNsYXNzIHBJbWFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogbnVsbFxuXHRcdFx0dmFsdWU6ICcnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0c2VjdGlvbjogdW5kZWZpbmVkXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBJbWFnZVwiKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdG9wdGlvbnMuc2VjdGlvbj8ucHJvcGVydGllcy5wdXNoKEApXG5cblx0XHRwcm9wTGF5ZXJzLnB1c2goQClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd2YWx1ZScsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX3ZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSA9ICcnKSAtPlxuXHRcdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdFx0QGVsZW1lbnQuc3JjID0gdmFsdWVcblx0XHRcdFx0QHNlY3Rpb24/LnZpc2libGUgPSB2YWx1ZSBpc250ICcnXG5cblxuXHRcdEBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgPT5cblx0XHRcdGlmIG5vdCBzZWNyZXRCb3hcblx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdHNlY3JldEJveC52YWx1ZSA9IEB2YWx1ZVxuXHRcdFx0c2VjcmV0Qm94LnNlbGVjdCgpXG5cdFx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG5cdFx0XHRzZWNyZXRCb3guYmx1cigpXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0dmFsdWU6IG9wdGlvbnMudmFsdWVcblx0XHRcdHNlY3Rpb246IG9wdGlvbnMuc2VjdGlvblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBDb2xvciBCb3hcblxuY2xhc3MgcENvbG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiBudWxsXG5cdFx0XHR2YWx1ZTogJyMyOTI5MjknXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicElucHV0XCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncENvbG9yJylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdG9wdGlvbnMuc2VjdGlvbj8ucHJvcGVydGllcy5wdXNoKEApXG5cblx0XHRwcm9wTGF5ZXJzLnB1c2goQClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd2YWx1ZScsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX3ZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblxuXHRcdFx0XHRpZiB2YWx1ZT8uY29sb3IgaXMgJ3RyYW5zcGFyZW50J1xuXHRcdFx0XHRcdHZhbHVlID0gbnVsbFxuXG5cdFx0XHRcdGlmIHZhbHVlPyBhbmQgdmFsdWUgaXNudCAnJ1xuXHRcdFx0XHRcdEBzZWN0aW9uPy52aXNpYmxlID0gdHJ1ZVxuXG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZSA/ICcnXG5cdFx0XHRcdEBlbGVtZW50LnN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSB2YWx1ZSA/ICdub25lJ1xuXG5cdFx0QGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHRcdFx0aWYgbm90IHNlY3JldEJveFxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0c2VjcmV0Qm94LnZhbHVlID0gQHZhbHVlXG5cdFx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jylcblx0XHRcdHNlY3JldEJveC5ibHVyKClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogb3B0aW9ucy52YWx1ZVxuXHRcdFx0c2VjdGlvbjogb3B0aW9ucy5zZWN0aW9uXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNlbGVjdFxuXG5jbGFzcyBwU2VsZWN0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiB1bmRlZmluZWRcblx0XHRcdHNlbGVjdGVkOiAwXG5cdFx0XHRvcHRpb25zOiBbJ3JlZCcsICd3aGl0ZScsICdibHVlJ11cblx0XHRcdGNhbGxiYWNrOiAodmFsdWUpIC0+IG51bGxcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicFNlbGVjdFwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hhc1ZhbHVlJylcblxuXHRcdEB1bml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0cGFyZW50OiBvcHRpb25zLnBhcmVudFxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR0ZXh0OiAn4pa+J1xuXHRcdFx0Zm9yOiBAZWxlbWVudFxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J29wdGlvbnMnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF9vcHRpb25zXG5cdFx0XHRzZXQ6IChhcnJheSkgLT5cblx0XHRcdFx0QF9vcHRpb25zID0gYXJyYXlcblx0XHRcdFx0QG1ha2VPcHRpb25zKClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J3NlbGVjdGVkJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfc2VsZWN0ZWRcblx0XHRcdHNldDogKG51bSkgLT5cblx0XHRcdFx0QF9zZWxlY3RlZCA9IG51bVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdF9vcHRpb25zOiBbXVxuXHRcdFx0X29wdGlvbkVsZW1lbnRzOiBbXVxuXHRcdFx0b3B0aW9uczogb3B0aW9ucy5vcHRpb25zXG5cdFx0XHRjYWxsYmFjazogb3B0aW9ucy5jYWxsYmFja1xuXHRcdFx0c2VsZWN0ZWQ6IG9wdGlvbnMuc2VsZWN0ZWRcblxuXHRcdEBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSBvcHRpb25zLnNlbGVjdGVkXG5cblx0XHRAZWxlbWVudC5vbmNoYW5nZSA9ID0+IFxuXHRcdFx0QHNlbGVjdGVkID0gQGVsZW1lbnQuc2VsZWN0ZWRJbmRleFxuXHRcdFx0QGNhbGxiYWNrKEBlbGVtZW50LnNlbGVjdGVkSW5kZXgpXG5cdFx0XG5cblx0bWFrZU9wdGlvbnM6ID0+XG5cdFx0Zm9yIG9wdGlvbiwgaSBpbiBAX29wdGlvbkVsZW1lbnRzXG5cdFx0XHRAZWxlbWVudC5yZW1vdmVDaGlsZChvcHRpb24pXG5cblx0XHRAX29wdGlvbkVsZW1lbnRzID0gW11cblxuXHRcdGZvciBvcHRpb24sIGkgaW4gQG9wdGlvbnNcblx0XHRcdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuXHRcdFx0by52YWx1ZSA9IG9wdGlvblxuXHRcdFx0by5sYWJlbCA9IG9wdGlvblxuXHRcdFx0by5pbm5lckhUTUwgPSBvcHRpb25cblx0XHRcdEBlbGVtZW50LmFwcGVuZENoaWxkKG8pXG5cblx0XHRcdEBfb3B0aW9uRWxlbWVudHMucHVzaChvKVxuXG5cdFx0XHRpZiBpIGlzIEBzZWxlY3RlZFxuXHRcdFx0XHRAdmFsdWUgPSBAZWxlbWVudC5vcHRpb25zW0BlbGVtZW50LnNlbGVjdGVkSW5kZXhdLmxhYmVsXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIEFjY29yZGlhblxuXG5jbGFzcyBwQWNjb3JkaWFuIGV4dGVuZHMgcFJvd1xuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdHN1cGVyIG9wdGlvbnNcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwQWNjb3JkaWFuJylcblx0XHRAZWxlbWVudC5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgQHRvZ2dsZVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHRvZ2dsZWQ6IGZhbHNlXG5cblx0XHRAdW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR0ZXh0OiAn4pa/J1xuXHRcdFx0Zm9yOiBAZWxlbWVudFxuXG5cdFx0QGJvZHkgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR0ZXh0OiAnJ1xuXHRcdEBib2R5LmVsZW1lbnQucmVtb3ZlQ2hpbGQoQGJvZHkubGFiZWwuZWxlbWVudClcblxuXHRcdEBlbGVtZW50LmFwcGVuZENoaWxkKEBib2R5LmVsZW1lbnQpXG5cdFx0QGJvZHkuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwQWNjb3JkaWFuQm9keScpXG5cblx0XHRAYm9keS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGV2ZW50KSAtPiBcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRpZiBhY2NvcmRpb25zT3BlbiB0aGVuIEB0b2dnbGUoKSAjIHN0YXJ0IG9wZW5cblxuXHR0b2dnbGU6ID0+XG5cdFx0QHRvZ2dsZWQgPSAhQHRvZ2dsZWRcblxuXHRcdGlmIEB0b2dnbGVkXG5cdFx0XHRAYm9keS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG5cdFx0XHRAdW5pdC5lbGVtZW50LnRleHRDb250ZW50ID0gJ+KWvidcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgQGJvZHkuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpXG5cdFx0XHRAYm9keS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG5cdFx0XHRAdW5pdC5lbGVtZW50LnRleHRDb250ZW50ID0gJ+KWvydcblxuXG4jIyMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gXHQuZDg4ODg4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIFx0ODguICAgIFwiJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gXHRgWTg4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gICAgYTg4YWFhYThQJyAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OFxuIFx0ICAgICAgYDhiIDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYFwiXCIgICAgIDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OFxuIFx0ZDgnICAgLjhQIDg4LiAgLjg4IDg4LiAgLi4uIDg4LiAgLi4uICAgICA4OCAgICAgICAgODguICAuODggODggICAgODggODguICAuLi4gODhcbiBcdCBZODg4ODhQICA4OFk4ODhQJyBgODg4ODhQJyBgODg4ODhQJyAgICAgZFAgICAgICAgIGA4ODg4OFA4IGRQICAgIGRQIGA4ODg4OFAnIGRQXG4gXHQgICAgICAgICAgODhcbiBcdCAgICAgICAgICBkUFxuXG4jIyNcblxuY2xhc3MgU3BlY1BhbmVsXG5cdGNvbnN0cnVjdG9yOiAtPlxuXG5cdFx0QGVsZW1lbnQgPSBwYW5lbFxuXHRcdEBwcm9wTGF5ZXJzID0gW11cblx0XHRAX3Byb3BzID0ge31cblx0XHRAZnJhbWUgPSBAZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXHRcdEBkZWZhdWx0cyA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuLl9wcm9wZXJ0eUxpc3QoKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHQncHJvcHMnLFxuXHRcdFx0Z2V0OiAtPlxuXHRcdFx0XHRyZXR1cm4gQF9wcm9wc1xuXHRcdFx0c2V0OiAob2JqKSAtPlxuXHRcdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBvYmpcblx0XHRcdFx0XHRpZiBfLmhhcyhAcHJvcHMsIGtleSlcblx0XHRcdFx0XHRcdEBwcm9wc1trZXldID0gdmFsdWVcblxuXHRcdEBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBpZiBzdGFydE9wZW4gdGhlbiAnMScgZWxzZSAnMCdcblx0XHRAY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGRldmljZVxuXG5cdFx0IyBTZXQgRGV2aWNlIE9wdGlvbnNcblxuXHRcdGRldmljZU9wdGlvbnMgPSBbJ2Z1bGxzY3JlZW4nXVxuXHRcdGN1cnJlbnRTZWxlY3RlZCA9IHVuZGVmaW5lZFxuXG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgRnJhbWVyLkRldmljZUNvbXBvbmVudC5EZXZpY2VzXG5cdFx0XHRpZiBfLmVuZHNXaXRoKGtleSwgJ2hhbmQnKVxuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRpZiBub3QgdmFsdWUubWluU3R1ZGlvVmVyc2lvbj9cblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0aWYgVXRpbHMuZnJhbWVyU3R1ZGlvVmVyc2lvbigpID4gdmFsdWUubWF4U3R1ZGlvVmVyc2lvblxuXHRcdFx0XHRjb250aW51ZSBcblxuXHRcdFx0aWYgVXRpbHMuZnJhbWVyU3R1ZGlvVmVyc2lvbigpIDwgdmFsdWUubWluU3R1ZGlvVmVyc2lvblxuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRkZXZpY2VPcHRpb25zLnB1c2ggKGtleSlcblxuXHRcdFx0aWYga2V5IGlzIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZVxuXHRcdFx0XHRjdXJyZW50U2VsZWN0ZWQgPSBkZXZpY2VPcHRpb25zLmxlbmd0aCAtIDFcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBmcmFtZXIgc2V0dGluZ3NcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBkZXZpY2VcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnRGV2aWNlJ1xuXG5cdFx0QGRldmljZUJveCA9IG5ldyBwU2VsZWN0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0dW5pdDogJydcblx0XHRcdG9wdGlvbnM6IGRldmljZU9wdGlvbnNcblx0XHRcdHNlbGVjdGVkOiBjdXJyZW50U2VsZWN0ZWRcblx0XHRcdGNhbGxiYWNrOiAoaW5kZXgpID0+XG5cdFx0XHRcdGRldmljZVR5cGUgPSBkZXZpY2VPcHRpb25zW2luZGV4XVxuXHRcdFx0XHRkZXZpY2UgPSBGcmFtZXIuRGV2aWNlQ29tcG9uZW50LkRldmljZXNbZGV2aWNlVHlwZV1cblx0XHRcdFx0XG5cdFx0XHRcdF8uYXNzaWduIHdpbmRvdy5sb2NhbFN0b3JhZ2UsXG5cdFx0XHRcdFx0ZGV2aWNlVHlwZTogZGV2aWNlVHlwZVxuXHRcdFx0XHRcdGRldmljZTogZGV2aWNlXG5cdFx0XHRcdFx0Ymc6IFNjcmVlbi5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBhbmltYXRpb24gc3BlZWRcblxuXHRcdEBzcGVlZFJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnU3BlZWQgMTAwJSdcblxuXHRcdG1pbnAgPSBwYXJzZUludCgwLCAxMClcblx0XHRtYXhwID0gcGFyc2VJbnQoMTAwLCAxMClcblx0XHRcblx0XHRtaW52ID0gTWF0aC5sb2coMC4wMDAwMSlcblx0XHRtYXh2ID0gTWF0aC5sb2coMC4wMTY2NjY2NjY2NylcblxuXHRcdHZTY2FsZSA9IChtYXh2LW1pbnYpIC8gKG1heHAtbWlucClcblxuXHRcdEBzcGVlZEJveCA9IG5ldyBwUmFuZ2Vcblx0XHRcdHBhcmVudDogQHNwZWVkUm93XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGFjdGlvbjogKHZhbHVlKSA9PlxuXG5cdFx0XHRcdGRlbHRhID0gTWF0aC5leHAobWludiArIHZTY2FsZSoodmFsdWUtbWlucCkpXG5cdFx0XHRcdHJhdGUgPSAoZGVsdGEvKDEvNjApKSoxMDBcblx0XHRcdFx0c3BhY2VzID0gaWYgcmF0ZSA8IDEgdGhlbiAyIGVsc2UgaWYgcmF0ZSA8IDEwIHRoZW4gMSBlbHNlIDBcblxuXHRcdFx0XHRAc3BlZWRSb3cubGFiZWwudGV4dCA9ICdTcGVlZCAnICsgcmF0ZS50b0ZpeGVkKHNwYWNlcykgKyAnJSdcblxuXHRcdFx0XHRGcmFtZXIuTG9vcC5kZWx0YSA9IGRlbHRhXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgbGF5ZXIgZGV0YWlsc1xuXG5cdFx0bmV3IHBEaXZpZGVyXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ05hbWUnXG5cblx0XHRAbmFtZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnQ29tcG9uZW50J1xuXG5cdFx0QGNvbXBvbmVudE5hbWVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHRAY29tcG9uZW50TmFtZXNSb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ1BhcnQgb2YnXG5cblx0XHRAY29tcG9uZW50TmFtZXNCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IEBjb21wb25lbnROYW1lc1Jvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgcG9zaXRpb24gZGV0YWlsc1xuXG5cdFx0bmV3IHBEaXZpZGVyXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgcG9zaXRpb25cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnUG9zaXRpb24nXG5cblx0XHRAeEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93LCBcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAneCdcblxuXHRcdEB5Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3csIFxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzaXplXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ1NpemUnXG5cblx0XHRAd2lkdGhCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHRAaGVpZ2h0Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3csIFxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAnaCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBiYWNrZ3JvdW5kIGNvbG9yXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ0JhY2tncm91bmQnXG5cblx0XHRAYmFja2dyb3VuZENvbG9yQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3csIFxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZ3JhZGllbnRcblxuXHRcdEBncmFkaWVudFByb3BlcnRpZXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ0dyYWRpZW50J1xuXG5cdFx0QGdyYWRpZW50U3RhcnRCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHNlY3Rpb246IEBncmFkaWVudFByb3BlcnRpZXNEaXZcblx0XHRcdGRlZmF1bHQ6IG51bGxcblxuXHRcdEBncmFkaWVudEVuZEJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHNlY3Rpb246IEBncmFkaWVudFByb3BlcnRpZXNEaXZcblx0XHRcdGRlZmF1bHQ6IG51bGxcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBncmFkaWVudCBhbmdsZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJydcblxuXHRcdEBncmFkaWVudEFuZ2xlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnYSdcblx0XHRcdHNlY3Rpb246IEBncmFkaWVudFByb3BlcnRpZXNEaXZcblx0XHRcdGRlZmF1bHQ6IG51bGxcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBvcGFjaXR5XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ09wYWNpdHknXG5cblx0XHRAb3BhY2l0eUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXG5cdFx0bmV3IHBEaXZpZGVyXG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYm9yZGVyIHByb3BlcnRpZXNcblxuXHRcdEBib3JkZXJQcm9wZXJ0aWVzRGl2ID0gbmV3IHBEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBib3JkZXJcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnQm9yZGVyJ1xuXHRcdFx0cGFyZW50OiBAYm9yZGVyUHJvcGVydGllc0RpdlxuXG5cdFx0QGJvcmRlckNvbG9yQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cblx0XHRAYm9yZGVyV2lkdGhCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAndydcblx0XHRcdHNlY3Rpb246IEBib3JkZXJQcm9wZXJ0aWVzRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgcmFkaXVzXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ1JhZGl1cydcblx0XHRcdHBhcmVudDogQGJvcmRlclByb3BlcnRpZXNEaXZcblxuXHRcdEBib3JkZXJSYWRpdXNCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRzZWN0aW9uOiBAYm9yZGVyUHJvcGVydGllc0RpdlxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNoYWRvd1xuXG5cblx0XHRAc2hhZG93UHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ1NoYWRvdydcblxuXHRcdEBzaGFkb3dDb2xvckJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblxuXHRcdEBzaGFkb3dTcHJlYWRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3MnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QHNoYWRvd1hCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAneCdcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0QHNoYWRvd1lCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3knXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QHNoYWRvd0JsdXJCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnYidcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHRleHQgc3R5bGVzXG5cblx0XHRAdGV4dFByb3BlcnRpZXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGZvbnQgZmFtaWx5XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdGb250J1xuXG5cdFx0QGZvbnRGYW1pbHlCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBjb2xvclxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnQ29sb3InXG5cblx0XHRAY29sb3JCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblxuXHRcdEBmb250U2l6ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyB3ZWlnaHRcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ1N0eWxlJ1xuXG5cdFx0QGZvbnRTdHlsZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0QGZvbnRXZWlnaHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd3J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGFsaWduXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdBbGlnbidcblxuXHRcdEB0ZXh0QWxpZ25Cb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICdsZWZ0J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNwYWNpbmdcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ1NwYWNpbmcnXG5cblx0XHRAbGV0dGVyU3BhY2luZ0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnbHQnXG5cdFx0XHRkZWZhdWx0OiAnMSdcblxuXHRcdEBsaW5lSGVpZ2h0Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAnbG4nXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgdGV4dFxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnVGV4dCdcblxuXHRcdEB0ZXh0Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHVuaXQ6ICcnXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyB0cmFuc2Zvcm0gcHJvcGVydGllc1xuXG5cblx0XHRAdHJhbnNmb3Jtc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRAdHJhbnNmb3Jtc0FjY28gPSBuZXcgcEFjY29yZGlhblxuXHRcdFx0dGV4dDogJ1RyYW5zZm9ybXMnXG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zRGl2XG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzY2FsZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTY2FsZSdcblxuXHRcdEBzY2FsZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMSdcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QHNjYWxlWEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXHRcdFx0ZGVmYXVsdDogJzEnXG5cblx0XHRAc2NhbGVZQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXHRcdFx0ZGVmYXVsdDogJzEnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgcm90YXRpb25cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnUm90YXRlJ1xuXG5cdFx0QHJvdGF0aW9uQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAcm90YXRpb25YQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdEByb3RhdGlvbllCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3knXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIG9yaWdpblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdPcmlnaW4nXG5cblx0XHRAb3JpZ2luWEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXHRcdFx0ZGVmYXVsdDogJzAuNTAnXG5cblx0XHRAb3JpZ2luWUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblx0XHRcdGRlZmF1bHQ6ICcwLjUwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNrZXdcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnU2tldydcblxuXHRcdEBza2V3Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAc2tld1hCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAneCdcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0QHNrZXdZQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgcGVyc3BlY3RpdmVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnUGVyc3BlY3RpdmUnXG5cblx0XHRAcGVyc3BlY3RpdmVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBmaWx0ZXJzIHByb3BlcnRpZXNcblxuXHRcdEBmaWx0ZXJzRGl2ID0gbmV3IHBEaXZcblxuXHRcdEBmaWx0ZXJzQWNjbyA9IG5ldyBwQWNjb3JkaWFuXG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzRGl2XG5cdFx0XHR0ZXh0OiAnRmlsdGVycydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBibHVyXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JsdXInXG5cblx0XHRAYmx1ckJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBicmlnaHRuZXNzXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JyaWdodG5lc3MnXG5cblx0XHRAYnJpZ2h0bmVzc0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMTAwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGNvbnRyYXN0XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0NvbnRyYXN0J1xuXG5cdFx0QGNvbnRyYXN0Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcxMDAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZ3JheXNjYWxlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0dyYXlzY2FsZSdcblxuXHRcdEBncmF5c2NhbGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgaHVlcm90YXRlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ2h1ZVJvdGF0ZSdcblxuXHRcdEBodWVSb3RhdGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgaW52ZXJ0XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0ludmVydCdcblxuXHRcdEBpbnZlcnRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2F0dXJhdGVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnU2F0dXJhdGUnXG5cblx0XHRAc2F0dXJhdGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzEwMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzZXBpYVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTZXBpYSdcblxuXHRcdEBzZXBpYUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZW5kIGZpbHRlcnNcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGVmZmVjdHMgcHJvcGVydGllc1xuXG5cblx0XHRAZWZmZWN0c0RpdiA9IG5ldyBwRGl2XG5cblx0XHRAZWZmZWN0c0FjY28gPSBuZXcgcEFjY29yZGlhblxuXHRcdFx0dGV4dDogJ0VmZmVjdHMnXG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzRGl2XG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBiYWNrZ3JvdW5kIGZpbHRlcnNcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQmxlbmRpbmcnXG5cblx0XHRAYmxlbmRpbmdCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJ25vcm1hbCdcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQmx1cidcblxuXHRcdEBiYWNrZ3JvdW5kQmx1ckJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdCcmlnaHRuZXNzJ1xuXG5cdFx0QGJhY2tncm91bmRCcmlnaHRuZXNzQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcxMDAnXG5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnU2F0dXJhdGUnXG5cblx0XHRAYmFja2dyb3VuZFNhdHVyYXRlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcxMDAnXG5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnaHVlUm90YXRlJ1xuXG5cdFx0QGJhY2tncm91bmRIdWVSb3RhdGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQ29udHJhc3QnXG5cblx0XHRAYmFja2dyb3VuZENvbnRyYXN0Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcxMDAnXG5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnSW52ZXJ0J1xuXG5cdFx0QGJhY2tncm91bmRJbnZlcnRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnR3JheXNjYWxlJ1xuXG5cdFx0QGJhY2tncm91bmRHcmF5c2NhbGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnU2VwaWEnXG5cblx0XHRAYmFja2dyb3VuZFNlcGlhQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBhbmltYXRpb24gcHJvcGVydGllc1xuXG5cblx0XHRAYW5pbXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QGFuaW1zQWNjbyA9IG5ldyBwQWNjb3JkaWFuXG5cdFx0XHR0ZXh0OiAnQW5pbWF0aW9ucydcblx0XHRcdHBhcmVudDogQGFuaW1zRGl2XG5cblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGV2ZW50IGxpc3RlbmVyIHByb3BlcnRpZXNcblxuXG5cdFx0QGV2ZW50TGlzdGVuZXJzRGl2ID0gbmV3IHBEaXZcblxuXHRcdEBldmVudExpc3RlbmVyc0FjY28gPSBuZXcgcEFjY29yZGlhblxuXHRcdFx0dGV4dDogJ0V2ZW50IExpc3RlbmVycydcblx0XHRcdHBhcmVudDogQGV2ZW50TGlzdGVuZXJzRGl2XG5cblxuXG5cdFx0IyBpbWFnZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QGltYWdlUHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRuZXcgcERpdmlkZXJcblx0XHRcdHBhcmVudDogQGltYWdlUHJvcGVydGllc0RpdlxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGltYWdlXG5cblx0XHRAaW1hZ2VCb3ggPSBuZXcgcEltYWdlXG5cdFx0XHRwYXJlbnQ6IEBpbWFnZVByb3BlcnRpZXNEaXZcblx0XHRcdHNlY3Rpb246IEBpbWFnZVByb3BlcnRpZXNEaXZcblxuXG5cdFx0IyBzY3JlZW5zaG90IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QHNjcmVlbnNob3REaXYgPSBuZXcgcERpdlxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNjcmVlbnNob3RcblxuXHRcdEBzY3JlZW5zaG90Qm94ID0gbmV3IHBJbWFnZVxuXHRcdFx0cGFyZW50OiBAc2NyZWVuc2hvdERpdlxuXHRcdFx0c2VjdGlvbjogQHNjcmVlbnNob3REaXZcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHBsYWNlaG9sZGVyc1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICcnXG5cdFx0cm93LmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzY0cHgnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc29jaWFsIG1lZGlhIGxpbmtzXG5cblx0XHRAc29jaWFsTWVkaWFSb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXYuYm9keVxuXHRcdFx0dGV4dDogJydcblxuXHRcdEBsaW5rZWRpbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRfLmFzc2lnbiBAbGlua2VkaW5JY29uLFxuXHRcdFx0aHJlZjogXCJodHRwOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9zdGV2ZXJ1aXpva1wiXG5cdFx0XHRpbm5lckhUTUw6ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBpZD1cImxpbmtlZGluX2xvZ29cIiBjbGFzcz1cImxvZ29cIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiBmaWxsPVwicmdiYSg5MSwgOTEsIDkxLCAxLjAwMClcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSAwaC0xNGMtMi43NjEgMC01IDIuMjM5LTUgNXYxNGMwIDIuNzYxIDIuMjM5IDUgNSA1aDE0YzIuNzYyIDAgNS0yLjIzOSA1LTV2LTE0YzAtMi43NjEtMi4yMzgtNS01LTV6bS0xMSAxOWgtM3YtMTFoM3YxMXptLTEuNS0xMi4yNjhjLS45NjYgMC0xLjc1LS43OS0xLjc1LTEuNzY0cy43ODQtMS43NjQgMS43NS0xLjc2NCAxLjc1Ljc5IDEuNzUgMS43NjQtLjc4MyAxLjc2NC0xLjc1IDEuNzY0em0xMy41IDEyLjI2OGgtM3YtNS42MDRjMC0zLjM2OC00LTMuMTEzLTQgMHY1LjYwNGgtM3YtMTFoM3YxLjc2NWMxLjM5Ni0yLjU4NiA3LTIuNzc3IDcgMi40NzZ2Ni43NTl6XCIvPjwvc3ZnPidcblxuXHRcdEBnaXRodWJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0Xy5hc3NpZ24gQGdpdGh1Ykljb24sXG5cdFx0XHRocmVmOiBcImh0dHA6Ly9naXRodWIuY29tL3N0ZXZlcnVpem9rL2dvdGNoYVwiXG5cdFx0XHRpbm5lckhUTUw6ICc8c3ZnIGhlaWdodD1cIjIwcHhcIiB3aWR0aD1cIjIwcHhcIiBpZD1cImdpdGh1Yl9sb2dvXCIgY2xhc3M9XCJsb2dvXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMTAyNCAxMDI0XCI+PHBhdGggZmlsbD1cInJnYmEoOTEsIDkxLCA5MSwgMS4wMDApXCIgZD1cIk01MTIgMEMyMjkuMjUgMCAwIDIyOS4yNSAwIDUxMmMwIDIyNi4yNSAxNDYuNjg4IDQxOC4xMjUgMzUwLjE1NiA0ODUuODEyIDI1LjU5NCA0LjY4OCAzNC45MzgtMTEuMTI1IDM0LjkzOC0yNC42MjUgMC0xMi4xODgtMC40NjktNTIuNTYyLTAuNzE5LTk1LjMxMkMyNDIgOTA4LjgxMiAyMTEuOTA2IDgxNy41IDIxMS45MDYgODE3LjVjLTIzLjMxMi01OS4xMjUtNTYuODQ0LTc0Ljg3NS01Ni44NDQtNzQuODc1LTQ2LjUzMS0zMS43NSAzLjUzLTMxLjEyNSAzLjUzLTMxLjEyNSA1MS40MDYgMy41NjIgNzguNDcgNTIuNzUgNzguNDcgNTIuNzUgNDUuNjg4IDc4LjI1IDExOS44NzUgNTUuNjI1IDE0OSA0Mi41IDQuNjU0LTMzIDE3LjkwNC01NS42MjUgMzIuNS02OC4zNzVDMzA0LjkwNiA3MjUuNDM4IDE4NS4zNDQgNjgxLjUgMTg1LjM0NCA0ODUuMzEyYzAtNTUuOTM4IDE5Ljk2OS0xMDEuNTYyIDUyLjY1Ni0xMzcuNDA2LTUuMjE5LTEzLTIyLjg0NC02NS4wOTQgNS4wNjItMTM1LjU2MiAwIDAgNDIuOTM4LTEzLjc1IDE0MC44MTIgNTIuNSA0MC44MTItMTEuNDA2IDg0LjU5NC0xNy4wMzEgMTI4LjEyNS0xNy4yMTkgNDMuNSAwLjE4OCA4Ny4zMTIgNS44NzUgMTI4LjE4OCAxNy4yODEgOTcuNjg4LTY2LjMxMiAxNDAuNjg4LTUyLjUgMTQwLjY4OC01Mi41IDI4IDcwLjUzMSAxMC4zNzUgMTIyLjU2MiA1LjEyNSAxMzUuNSAzMi44MTIgMzUuODQ0IDUyLjYyNSA4MS40NjkgNTIuNjI1IDEzNy40MDYgMCAxOTYuNjg4LTExOS43NSAyNDAtMjMzLjgxMiAyNTIuNjg4IDE4LjQzOCAxNS44NzUgMzQuNzUgNDcgMzQuNzUgOTQuNzUgMCA2OC40MzgtMC42ODggMTIzLjYyNS0wLjY4OCAxNDAuNSAwIDEzLjYyNSA5LjMxMiAyOS41NjIgMzUuMjUgMjQuNTYyQzg3Ny40MzggOTMwIDEwMjQgNzM4LjEyNSAxMDI0IDUxMiAxMDI0IDIyOS4yNSA3OTQuNzUgMCA1MTIgMHpcIiAvPjwvc3ZnPidcblxuXHRcdEB0d2l0dGVySWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdF8uYXNzaWduIEB0d2l0dGVySWNvbixcblx0XHRcdGhyZWY6IFwiaHR0cDovL3R3aXR0ZXIuY29tL3N0ZXZlcnVpem9rXCJcblx0XHRcdGlubmVySFRNTDogJzxzdmcgaGVpZ2h0PVwiMjhweFwiIHdpZHRoPVwiMjhweFwiIGlkPVwidHdpdHRlcl9sb2dvXCIgY2xhc3M9XCJsb2dvXCIgZGF0YS1uYW1lPVwiTG9nbyDigJQgRklYRURcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0MDAgNDAwXCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOm5vbmU7fS5jbHMtMntmaWxsOnJnYmEoOTEsIDkxLCA5MSwgMS4wMDApO308L3N0eWxlPjwvZGVmcz48dGl0bGU+VHdpdHRlcl9Mb2dvX0JsdWU8L3RpdGxlPjxyZWN0IGNsYXNzPVwiY2xzLTFcIiB3aWR0aD1cIjQwMFwiIGhlaWdodD1cIjQwMFwiLz48cGF0aCBjbGFzcz1cImNscy0yXCIgZD1cIk0xNTMuNjIsMzAxLjU5Yzk0LjM0LDAsMTQ1Ljk0LTc4LjE2LDE0NS45NC0xNDUuOTQsMC0yLjIyLDAtNC40My0uMTUtNi42M0ExMDQuMzYsMTA0LjM2LDAsMCwwLDMyNSwxMjIuNDdhMTAyLjM4LDEwMi4zOCwwLDAsMS0yOS40Niw4LjA3LDUxLjQ3LDUxLjQ3LDAsMCwwLDIyLjU1LTI4LjM3LDEwMi43OSwxMDIuNzksMCwwLDEtMzIuNTcsMTIuNDUsNTEuMzQsNTEuMzQsMCwwLDAtODcuNDEsNDYuNzhBMTQ1LjYyLDE0NS42MiwwLDAsMSw5Mi40LDEwNy44MWE1MS4zMyw1MS4zMywwLDAsMCwxNS44OCw2OC40N0E1MC45MSw1MC45MSwwLDAsMSw4NSwxNjkuODZjMCwuMjEsMCwuNDMsMCwuNjVhNTEuMzEsNTEuMzEsMCwwLDAsNDEuMTUsNTAuMjgsNTEuMjEsNTEuMjEsMCwwLDEtMjMuMTYuODgsNTEuMzUsNTEuMzUsMCwwLDAsNDcuOTIsMzUuNjIsMTAyLjkyLDEwMi45MiwwLDAsMS02My43LDIyQTEwNC40MSwxMDQuNDEsMCwwLDEsNzUsMjc4LjU1YTE0NS4yMSwxNDUuMjEsMCwwLDAsNzguNjIsMjNcIi8+PC9zdmc+J1xuXG5cdFx0Zm9yIGVsZW1lbnQgaW4gW0BsaW5rZWRpbkljb24sIEBnaXRodWJJY29uLCBAdHdpdHRlckljb25dXG5cdFx0XHRAc29jaWFsTWVkaWFSb3cuZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KVxuXHRcdFx0QHNvY2lhbE1lZGlhUm93LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc29jaWFsTGlua3MnKVxuXG5cdFx0QGhpZGVEaXZzKClcblxuXHRjbGVhckNoaWxkcmVuVGhlblNob3dBbmltYXRpb25zOiAoYW5pbWF0aW9ucykgPT5cblx0XHRjaGlsZCA9IEBhbmltc0FjY28uYm9keS5lbGVtZW50LmNoaWxkTm9kZXNbMF1cblxuXHRcdGlmIG5vdCBjaGlsZD9cblx0XHRcdEBzaG93QW5pbWF0aW9ucyhhbmltYXRpb25zKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRAYW5pbXNBY2NvLmJvZHkuZWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZClcblx0XHRAY2xlYXJDaGlsZHJlblRoZW5TaG93QW5pbWF0aW9ucyhhbmltYXRpb25zKVxuXG5cdGNsZWFyQ2hpbGRyZW5UaGVuU2hvd0V2ZW50TGlzdGVuZXJzOiAoZXZlbnRMaXN0ZW5lcnMpID0+XG5cblx0XHRjaGlsZCA9IEBldmVudExpc3RlbmVyc0FjY28uYm9keS5lbGVtZW50LmNoaWxkTm9kZXNbMF1cblxuXHRcdGlmIG5vdCBjaGlsZD9cblx0XHRcdEBzaG93RXZlbnRMaXN0ZW5lcnMoZXZlbnRMaXN0ZW5lcnMpXG5cdFx0XHRyZXR1cm5cblxuXHRcdEBldmVudExpc3RlbmVyc0FjY28uYm9keS5lbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkKVxuXHRcdEBjbGVhckNoaWxkcmVuVGhlblNob3dFdmVudExpc3RlbmVycyhldmVudExpc3RlbmVycylcblxuXHRzaG93RXZlbnRMaXN0ZW5lcnM6IChldmVudExpc3RlbmVycyA9IFtdKSA9PlxuXG5cdFx0ZGVmYXVsdHMgPSBbXG5cdFx0XHRcImZ1bmN0aW9uICgpe3JldHVybiBmbi5hcHBseShtZSxhcmd1bWVudHMpfVwiLCBcblx0XHRcdFwiZnVuY3Rpb24gKCl7cmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpfVwiLCBcblx0XHRcdFwiZnVuY3Rpb24gKGV2ZW50KXtyZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKX1cIixcblx0XHRcdFwiZnVuY3Rpb24gKCl7IHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTsgfVwiLFxuXHRcdFx0J2Z1bmN0aW9uIGRlYm91bmNlZCgpe3ZhciB0aW1lPW5vdygpLGlzSW52b2tpbmc9c2hvdWxkSW52b2tlKHRpbWUpO2lmKGxhc3RBcmdzPWFyZ3VtZW50cyxsYXN0VGhpcz10aGlzLGxhc3RDYWxsVGltZT10aW1lLGlzSW52b2tpbmcpe2lmKHRpbWVySWQ9PT11bmRlZmluZWQpcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7aWYobWF4aW5nKXJldHVybiB0aW1lcklkPXNldFRpbWVvdXQodGltZXJFeHBpcmVkLHdhaXQpLGludm9rZUZ1bmMobGFzdENhbGxUaW1lKX1yZXR1cm4gdGltZXJJZD09PXVuZGVmaW5lZCYmKHRpbWVySWQ9c2V0VGltZW91dCh0aW1lckV4cGlyZWQsd2FpdCkpLHJlc3VsdH0nLFxuXHRcdFx0J2Z1bmN0aW9uICh2YWx1ZSl7aWYobnVsbCE9PXZhbHVlKXJldHVyblwiZm9udFNpemVcIiE9PXByb3BlcnR5JiZcImZvbnRcIiE9PXByb3BlcnR5JiZfdGhpcy5fc3R5bGVkVGV4dC5yZXNldFN0eWxlKHByb3BlcnR5KSxfdGhpcy5yZW5kZXJUZXh0KCl9Jyxcblx0XHRdXG5cblx0XHRyZWFsTGlzdGVuZXJzID0gMFxuXG5cdFx0Zm9yIGxpc3RlbmVyLCBpIGluIGV2ZW50TGlzdGVuZXJzXG5cblx0XHRcdGNvbnRpbnVlIGlmIF8uZXZlcnkobGlzdGVuZXIuZXZlbnRzLCAoZSkgLT4gXy5pbmNsdWRlcyhkZWZhdWx0cywgZS5mdW5jdGlvbikpXG5cblx0XHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdCMgbGlzdGVuZXJcblxuXHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0cGFyZW50OiBAZXZlbnRMaXN0ZW5lcnNBY2NvLmJvZHlcblx0XHRcdFx0dGV4dDogJ1wiJyArIGxpc3RlbmVyLmxpc3RlbmVyICsgJ1wiJ1xuXHRcdFx0XHRib2xkOiB0cnVlXG5cblx0XHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdCMgZXZlbnRzXG5cblx0XHRcdGZvciBldmVudCwgZSBpbiBsaXN0ZW5lci5ldmVudHNcblxuXHRcdFx0XHRjb250aW51ZSBpZiBfLmluY2x1ZGVzKGRlZmF1bHRzLCBldmVudC5mdW5jdGlvbilcblxuXHRcdFx0XHRyZWFsTGlzdGVuZXJzKytcblxuXHRcdFx0XHQjIG5hbWVcblxuXHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdHBhcmVudDogQGV2ZW50TGlzdGVuZXJzQWNjby5ib2R5XG5cdFx0XHRcdFx0dGV4dDogJ05hbWUnXG5cdFx0XHRcdFxuXHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0dmFsdWU6IGV2ZW50Lm5hbWUgPyAnJ1xuXHRcdFx0XHRcdGlzRGVmYXVsdDogZXZlbnQubmFtZSBpc250ICd1bmRlZmluZWQnXG5cblx0XHRcdFx0IyBmdW5jdGlvblxuXG5cdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0cGFyZW50OiBAZXZlbnRMaXN0ZW5lcnNBY2NvLmJvZHlcblx0XHRcdFx0XHR0ZXh0OiAnRnVuY3Rpb24nXG5cdFx0XHRcdFxuXHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0dmFsdWU6IGV2ZW50LmZ1bmN0aW9uXG5cdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdCMgT25jZVxuXG5cdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0cGFyZW50OiBAZXZlbnRMaXN0ZW5lcnNBY2NvLmJvZHlcblx0XHRcdFx0XHR0ZXh0OiAnT25jZSdcblx0XHRcdFx0XG5cdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHR2YWx1ZTogZXZlbnQub25jZVxuXHRcdFx0XHRcdGlzRGVmYXVsdDogZXZlbnQubmFtZSBpc250ICdmYWxzZSdcblxuXHRcdFx0XHR1bmxlc3MgZSBpcyBsaXN0ZW5lci5ldmVudHMubGVuZ3RoIC0gMVxuXHRcdFx0XHRcdG5ldyBwRGl2aWRlclxuXHRcdFx0XHRcdFx0cGFyZW50OiBAZXZlbnRMaXN0ZW5lcnNBY2NvLmJvZHlcblxuXHRcdFx0dW5sZXNzIGkgaXMgZXZlbnRMaXN0ZW5lcnMubGVuZ3RoIC0gMVxuXHRcdFx0XHRuZXcgcERpdmlkZXJcblx0XHRcdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0FjY28uYm9keVxuXG5cblx0XHQjIHNldCBjb2xvclxuXG5cdFx0aWYgcmVhbExpc3RlbmVycyBpcyAwXG5cdFx0XHRAZXZlbnRMaXN0ZW5lcnNBY2NvLmNvbG9yID0gJyM4ODg4ODgnXG5cdFx0XHRyZXR1cm5cblxuXHRcdEBldmVudExpc3RlbmVyc0FjY28uY29sb3IgPSAnI0ZGRkZGRidcblxuXHRzaG93QW5pbWF0aW9uczogKGFuaW1hdGlvbnMpID0+XG5cdFx0XG5cdFx0QGFuaW1zQWNjby5jb2xvciA9IGlmIGFuaW1hdGlvbnMubGVuZ3RoID4gMCB0aGVuICcjRkZGJyBlbHNlICcjODg4ODg4J1xuXHRcblx0XHRmb3IgYW5pbSwgaSBpbiBhbmltYXRpb25zXG5cblx0XHRcdHByb3BlcnRpZXMgPSBhbmltLnByb3BlcnRpZXNcblx0XHRcdG9wdGlvbnMgPSBhbmltLm9wdGlvbnNcblx0XHRcdHN0YXRlQSA9IGFuaW0uX3N0YXRlQVxuXHRcdFx0c3RhdGVCID0gYW5pbS5fc3RhdGVCXG5cblx0XHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdFx0IyBhbmltYXRpb25cblxuXHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0dGV4dDogJ0FuaW1hdGlvbiAnICsgKGkgKyAxKVxuXHRcdFx0XHRib2xkOiB0cnVlXG5cblx0XHRcdGZyb21Vbml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0XHRwYXJlbnQ6IHJvdyBcblx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0dGV4dDogJ2Zyb20nXG5cblx0XHRcdHRvVW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdFx0cGFyZW50OiByb3cgXG5cdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHR0ZXh0OiAndG8nXG5cblx0XHRcdGZvciBlbGVtZW50IGluIFtmcm9tVW5pdC5lbGVtZW50LCB0b1VuaXQuZWxlbWVudF1cblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhbGlnbkxlZnQnKVxuXG5cdFx0XHQjIC0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0IyBwcm9wZXJ0aWVzXG5cblx0XHRcdGZvciBrZXksIHZhbHVlIG9mIHByb3BlcnRpZXNcblxuXHRcdFx0XHRpZiBDb2xvci5pc0NvbG9yT2JqZWN0KHZhbHVlKSBvciBDb2xvci5pc0NvbG9yKHZhbHVlKVxuXG5cdFx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cdFx0XHRcdFx0XHR0ZXh0OiBfLnN0YXJ0Q2FzZShrZXkpXG5cblx0XHRcdFx0XHQjIGZyb21cblx0XHRcdFx0XHRib3ggPSBuZXcgcENvbG9yXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVBP1trZXldXG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdFx0XHQjIHRvXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBDb2xvclxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUI/W2tleV1cblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRlbHNlIGlmIGtleSBpcyAnZ3JhZGllbnQnXG5cblx0XHRcdFx0XHQjIHN0YXJ0XG5cdFx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cdFx0XHRcdFx0XHR0ZXh0OiAnR3JhZCBTdGFydCdcblx0XHRcdFx0XG5cdFx0XHRcdFx0IyBmcm9tXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBDb2xvclxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQT9ba2V5XT8uc3RhcnRcblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdCMgdG9cblx0XHRcdFx0XHRib3ggPSBuZXcgcENvbG9yXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQj9ba2V5XT8uc3RhcnRcblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdCMgZW5kXG5cdFx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cdFx0XHRcdFx0XHR0ZXh0OiAnR3JhZCBFbmQnXG5cdFx0XHRcdFxuXHRcdFx0XHRcdCMgZnJvbVxuXHRcdFx0XHRcdGJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUE/W2tleV0/LmVuZFxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyB0b1xuXHRcdFx0XHRcdGJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVCP1trZXldPy5lbmRcblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdCMgYW5nbGVcblx0XHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdHRleHQ6ICdHcmFkIEFuZ2xlJ1xuXHRcdFx0XHRcblx0XHRcdFx0XHQjIGZyb20gXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQT9ba2V5XT8uYW5nbGVcblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdCMgdG9cblx0XHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQj9ba2V5XT8uYW5nbGVcblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRlbHNlXG5cblx0XHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdHRleHQ6IF8uc3RhcnRDYXNlKGtleSlcblxuXHRcdFx0XHRcdCMgZnJvbVxuXHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUE/W2tleV1cblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdCMgdG9cblx0XHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQj9ba2V5XVxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHQjIC0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0IyBvcHRpb25zXG5cblx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cdFx0XHRcdHRleHQ6ICdPcHRpb25zJ1xuXG5cdFx0XHQjIHRpbWVcblx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0dW5pdDogJ3MnXG5cdFx0XHRcdHZhbHVlOiBvcHRpb25zLnRpbWVcblx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHQjIHRpbWVcblx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdHVuaXQ6ICdkJ1xuXHRcdFx0XHR2YWx1ZTogb3B0aW9ucy5kZWxheVxuXHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cdFx0XHRcdHRleHQ6ICcnXG5cblx0XHRcdCMgcmVwZWF0XG5cdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdHVuaXQ6ICdyJ1xuXHRcdFx0XHR2YWx1ZTogb3B0aW9ucy5yZXBlYXRcblx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHQjIHRpbWVcblx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdHVuaXQ6ICdsJ1xuXHRcdFx0XHR2YWx1ZTogb3B0aW9ucy5sb29waW5nXG5cdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0dW5sZXNzIGkgaXMgYW5pbWF0aW9ucy5sZW5ndGggLSAxXG5cdFx0XHRcdG5ldyBwRGl2aWRlclxuXHRcdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cblx0XHRcblx0c2hvd1Byb3BlcnRpZXM6IChsYXllciwgY3VzdG9tUHJvcHMpID0+XG5cblx0XHRAc2Nyb2xsVG9wID0gQGVsZW1lbnQuc2Nyb2xsVG9wXG5cblx0XHRwcm9wcyA9IGxheWVyLnByb3BzXG5cdFx0Xy5hc3NpZ24gcHJvcHMsIGN1c3RvbVByb3BzXG5cblx0XHRkZWZhdWx0cyA9IGxheWVyLl9wcm9wZXJ0eUxpc3QoKVxuXG5cdFx0Xy5hc3NpZ24gZGVmYXVsdHMsXG5cdFx0XHRyb3RhdGlvbjogZGVmYXVsdHMucm90YXRpb25aXG5cdFx0XHRibGVuZGluZzoge2RlZmF1bHQ6ICdub3JtYWwnfVxuXG5cdFx0QGhpZGVEaXZzKClcblxuXHRcdGZvciBrZXksIHZhbHVlIG9mIF8ubWVyZ2UobGF5ZXIucHJvcHMsIGN1c3RvbVByb3BzKVxuXG5cdFx0XHRwcm9wTGF5ZXIgPSBAW2tleSArICdCb3gnXVxuXG5cdFx0XHRpZiBub3QgcHJvcExheWVyXG5cdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdGRlZiA9IGRlZmF1bHRzW2tleV0/LmRlZmF1bHRcblx0XHRcdFxuXHRcdFx0QHNob3dQcm9wZXJ0eShrZXksIHZhbHVlLCBwcm9wTGF5ZXIsIGRlZilcblxuXHRcdEBzaG93T3ZlcnJpZGVJbkFjY28oQGVmZmVjdHNEaXYsIEBlZmZlY3RzQWNjbylcblx0XHRAc2hvd092ZXJyaWRlSW5BY2NvKEBmaWx0ZXJzRGl2LCBAZmlsdGVyc0FjY28pXG5cdFx0QHNob3dPdmVycmlkZUluQWNjbyhAdHJhbnNmb3Jtc0RpdiwgQHRyYW5zZm9ybXNBY2NvKVxuXHRcdFx0XHRcblx0XHRAZWxlbWVudC5zY3JvbGxUb3AgPSBAc2Nyb2xsVG9wXG5cblx0c2hvd092ZXJyaWRlSW5BY2NvOiAoZGl2LCBhY2NvKSAtPlxuXHRcdGFjY28uY29sb3IgPSAnIzg4ODg4OCdcblx0XHRmb3IgcHJvcExheWVyIGluIGRpdi5wcm9wZXJ0aWVzXG5cdFx0XHRpZiBwcm9wTGF5ZXIudmFsdWU/IGFuZCBwcm9wTGF5ZXIudmFsdWUgaXNudCBwcm9wTGF5ZXIuZGVmYXVsdFxuXHRcdFx0XHRhY2NvLmNvbG9yID0gJyNGRkYnXG5cblx0c2hvd1Byb3BlcnR5OiAoa2V5LCB2YWx1ZSwgcHJvcExheWVyLCBkZWYpID0+XG5cblx0XHRyZXR1cm4gaWYgdmFsdWUgaXMgcHJvcExheWVyLnZhbHVlXG5cblx0XHRwcm9wTGF5ZXIuaXNEZWZhdWx0ID0gZmFsc2VcblxuXHRcdGlmIG5vdCB2YWx1ZT8gb3IgXy5pc05hTih2YWx1ZSkgb3IgdmFsdWUgaXMgZGVmXG5cdFx0XHR2YWx1ZSA9IGRlZiA/ICcnXG5cdFx0XHRwcm9wTGF5ZXIuaXNEZWZhdWx0ID0gdHJ1ZVxuXG5cdFx0IyBjb2xvclxuXHRcdGlmIENvbG9yLmlzQ29sb3JPYmplY3QodmFsdWUpXG5cdFx0XHR2YWx1ZSA9IHZhbHVlLnRvSHNsU3RyaW5nKClcblxuXHRcdCMgZ3JhZGllbnRcblx0XHRpZiB2YWx1ZT8uY29uc3RydWN0b3I/Lm5hbWUgaXMgJ0dyYWRpZW50J1xuXHRcdFx0cHJvcExheWVyLnZhbHVlID0gJydcblx0XHRcdHJldHVyblxuXG5cdFx0IyBzdHJpbmdcblx0XHRpZiB0eXBlb2YgdmFsdWUgaXMgJ3N0cmluZydcblx0XHRcdHByb3BMYXllci52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm5cblxuXHRcdHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKVxuXG5cdFx0IyBmbG9hdFxuXHRcdGlmIHZhbHVlLmluZGV4T2YoJy4nKSBpc250IC0xXG5cdFx0XHRwcm9wTGF5ZXIudmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKS50b0ZpeGVkKDIpXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgbnVtZXJcblx0XHRwcm9wTGF5ZXIudmFsdWUgPSBwYXJzZUludCh2YWx1ZSwgMTApLnRvRml4ZWQoKVxuXG5cdGhpZGVEaXZzOiA9PlxuXHRcdGZvciBkaXYgaW4gW1xuXHRcdFx0QGdyYWRpZW50UHJvcGVydGllc0Rpdixcblx0XHRcdEB0ZXh0UHJvcGVydGllc0Rpdixcblx0XHRcdEBzaGFkb3dQcm9wZXJ0aWVzRGl2LFxuXHRcdFx0QGJvcmRlclByb3BlcnRpZXNEaXYsXG5cdFx0XHRAaW1hZ2VQcm9wZXJ0aWVzRGl2LFxuXHRcdFx0QHNjcmVlbnNob3REaXZcblx0XHRdXG5cdFx0XHRkaXYudmlzaWJsZSA9IGZhbHNlXG5cblxuXG5cblxuXG5cblxucHJvcExheWVycyA9IFtdXG5cbiMjIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0IC44ODg4OC4gICAgICAgICAgICAgZFAgICAgICAgICAgICBkUFxuXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG5cdDg4ICAgICAgICAuZDg4ODhiLiBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi5cblx0ODggICBZUDg4IDg4JyAgYDg4ICAgODggICA4OCcgIGBcIlwiIDg4JyAgYDg4IDg4JyAgYDg4XG5cdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcblx0IGA4ODg4OCcgIGA4ODg4OFAnICAgZFAgICBgODg4ODhQJyBkUCAgICBkUCBgODg4ODg4OFxuXG4jIyMgXG5cblxuY2xhc3MgR290Y2hhXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QHNwZWNQYW5lbCA9IG5ldyBTcGVjUGFuZWxcblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGNvbG9yOiAncmdiYSg3MiwgMjA3LCAyNTUsIDEuMDAwKSdcblx0XHRcdHNlbGVjdGVkQ29sb3I6ICdyZ2JhKDI1NSwgMSwgMjU1LCAxLjAwMCknXG5cdFx0XHRzZWNvbmRhcnlDb2xvcjogJyNGRkZGRkYnXG5cdFx0XHRmb250RmFtaWx5OiAnTWVubG8nXG5cdFx0XHRmb250U2l6ZTogJzEwJ1xuXHRcdFx0Zm9udFdlaWdodDogJzUwMCdcblx0XHRcdGJvcmRlclJhZGl1czogNFxuXHRcdFx0cGFkZGluZzoge3RvcDogMSwgYm90dG9tOiAxLCBsZWZ0OiAzLCByaWdodDogM31cblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHRjb2xvcjogb3B0aW9ucy5jb2xvclxuXHRcdFx0c2VsZWN0ZWRDb2xvcjogb3B0aW9ucy5zZWxlY3RlZENvbG9yXG5cdFx0XHRzZWNvbmRhcnlDb2xvcjogb3B0aW9ucy5zZWNvbmRhcnlDb2xvclxuXHRcdFx0Zm9udEZhbWlseTogb3B0aW9ucy5mb250RmFtaWx5XG5cdFx0XHRmb250U2l6ZTogb3B0aW9ucy5mb250U2l6ZVxuXHRcdFx0Zm9udFdlaWdodDogb3B0aW9ucy5mb250V2VpZ2h0XG5cdFx0XHRzaGFwZXM6IFtdXG5cdFx0XHRib3JkZXJSYWRpdXM6IG9wdGlvbnMuYm9yZGVyUmFkaXVzXG5cdFx0XHRwYWRkaW5nOiBvcHRpb25zLnBhZGRpbmdcblx0XHRcdGZvY3VzZWRFbGVtZW50OiB1bmRlZmluZWRcblx0XHRcdGVuYWJsZWQ6IGZhbHNlXG5cdFx0XHRzY3JlZW5FbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdEZXZpY2VDb21wb25lbnRQb3J0JylbMF1cblx0XHRcdGxheWVyczogW11cblx0XHRcdGNvbnRhaW5lcnM6IFtdXG5cdFx0XHR0aW1lcjogdW5kZWZpbmVkXG5cdFx0XHRfb25seVZpc2libGU6IHRydWVcblxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgQHRvZ2dsZSlcblx0XHRGcmFtZXIuQ3VycmVudENvbnRleHQuZG9tRXZlbnRNYW5hZ2VyLndyYXAod2luZG93KS5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIEB1cGRhdGUpXG5cblx0XHRAY29udGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZyYW1lckxheWVyIERldmljZVNjcmVlbicpWzBdXG5cdFx0QGNvbnRleHQuY2xhc3NMaXN0LmFkZCgnaG92ZXJDb250ZXh0Jylcblx0XHRAY29udGV4dC5jaGlsZE5vZGVzWzJdLmNsYXNzTGlzdC5hZGQoJ0lnbm9yZVBvaW50ZXJFdmVudHMnKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHRcIm9ubHlWaXNpYmxlXCIsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX29ubHlWaXNpYmxlXG5cdFx0XHRzZXQ6IChib29sKSAtPlxuXHRcdFx0XHRyZXR1cm4gaWYgdHlwZW9mIGJvb2wgaXNudCAnYm9vbGVhbidcblx0XHRcdFx0QF9vbmx5VmlzaWJsZSA9IGJvb2xcblxuXHRcdEZyYW1lci5EZXZpY2Uub24gXCJjaGFuZ2U6ZGV2aWNlVHlwZVwiLCA9PlxuXHRcdFx0VXRpbHMuZGVsYXkgMCwgQHVwZGF0ZVxuXG5cdHRvZ2dsZTogKGV2ZW50LCBvcGVuKSA9PlxuXHRcdCMgcmV0dXJuIGlmIEZyYW1lci5EZXZpY2UuaGFuZHMuaXNBbmltYXRpbmdcblxuXHRcdGlmIGV2ZW50LmtleSBpcyBcImBcIiBvciBldmVudC5rZXkgaXMgXCI8XCIgb3Igb3BlbiBpcyB0cnVlXG5cdFx0XHRpZiBAb3BlbmVkIHRoZW4gQGRpc2FibGUoKSBlbHNlIEBlbmFibGUoKVxuXHRcdFx0QG9wZW5lZCA9ICFAb3BlbmVkXG5cdFx0XHRyZXR1cm5cblxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdGlmIGV2ZW50LmtleSBpcyBcIi9cIiBvciBldmVudC5rZXkgaXMgXCI+XCJcblx0XHRcdEBzZXRTZWxlY3RlZExheWVyKClcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiLlwiXG5cdFx0XHRAaG92ZXJlZExheWVyPy5lbWl0IEV2ZW50cy5UYXBcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiXFxcXFwiXG5cdFx0XHRAX2xhc3RTcGVlZCA/PSAxXG5cdFx0XHR0aGlzU3BlZWQgPSBAc3BlY1BhbmVsLnNwZWVkQm94LmVsZW1lbnQudmFsdWVcblxuXHRcdFx0aWYgdGhpc1NwZWVkIGlzIFwiMFwiXG5cdFx0XHRcdEBzcGVjUGFuZWwuc3BlZWRCb3guZWxlbWVudC52YWx1ZSA9IEBfbGFzdFNwZWVkXG5cdFx0XHRcdEBzcGVjUGFuZWwuc3BlZWRCb3guYWN0aW9uKEBfbGFzdFNwZWVkKVxuXHRcdFx0ZWxzZSBcblx0XHRcdFx0QHNwZWNQYW5lbC5zcGVlZEJveC5lbGVtZW50LnZhbHVlID0gMFxuXHRcdFx0XHRGcmFtZXIuTG9vcC5kZWx0YSA9IC4wMDAwMDAwMDAwMDAwMDAwMDAwMDFcblx0XHRcdFx0QF9sYXN0U3BlZWQgPSB0aGlzU3BlZWRcblxuXHQjIG9wZW4gdGhlIHBhbmVsLCBzdGFydCBsaXN0ZW5pbmcgZm9yIGV2ZW50c1xuXHRlbmFibGU6ID0+XG5cdFx0QF9jYW52YXNDb2xvciA9IENhbnZhcy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRzdmdDb250ZXh0LnNldENvbnRleHQoKVxuXG5cdFx0QHRyYW5zaXRpb24odHJ1ZSlcblxuXHRcdGlmIEB0aW1lcj8gdGhlbiBjbGVhckludGVydmFsIEB0aW1lclxuXHRcdEB0aW1lciA9IFV0aWxzLmludGVydmFsIDEvMTUsIEBmb2N1c1xuXG5cdGRpc2FibGU6ID0+XG5cdFx0QHVuZm9jdXMoKVxuXHRcdEBlbmFibGVkID0gZmFsc2VcblxuXHRcdEB0cmFuc2l0aW9uKGZhbHNlKVxuXG5cdFx0aWYgQHRpbWVyPyB0aGVuIGNsZWFySW50ZXJ2YWwgQHRpbWVyXG5cblx0dHJhbnNpdGlvbjogKG9wZW4gPSB0cnVlLCBzZWNvbmRzID0gLjUpID0+XG5cdFx0aGFuZHMgPSBGcmFtZXIuRGV2aWNlLmhhbmRzXG5cblx0XHRoYW5kcy5vbiBcImNoYW5nZTp4XCIsIEBzaG93VHJhbnNpdGlvblxuXG5cdFx0aGFuZHMub25jZSBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PlxuXHRcdFx0aGFuZHMub2ZmIFwiY2hhbmdlOnhcIiwgQHNob3dUcmFuc2l0aW9uXG5cdFx0XHRAZW5hYmxlZCA9IEBvcGVuZWQgPSBvcGVuXG5cblx0XHRcdGlmIG9wZW5cblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub24gRXZlbnRzLk1vdXNlT3ZlciwgQHNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vbiBFdmVudHMuTW91c2VPdXQsIEB1bnNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLmJhY2tncm91bmQub24gRXZlbnRzLk1vdXNlT3ZlciwgQHVuc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9uIEV2ZW50cy5DbGljaywgQHNldFNlbGVjdGVkTGF5ZXJcblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vZmYgRXZlbnRzLk1vdXNlT3ZlciwgQHNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vZmYgRXZlbnRzLk1vdXNlT3V0LCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5iYWNrZ3JvdW5kLm9mZiBFdmVudHMuTW91c2VPdmVyLCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub2ZmIEV2ZW50cy5DbGljaywgQHNldFNlbGVjdGVkTGF5ZXJcblxuXHRcdFx0QGZvY3VzKClcblxuXHRcdEBfc3RhcnRQb3NpdGlvbiA9IEZyYW1lci5EZXZpY2UuaGFuZHMueFxuXG5cdFx0bWlkWCA9IGhhbmRzLl9jb250ZXh0LmlubmVyV2lkdGggLyAyXG5cblx0XHRGcmFtZXIuRGV2aWNlLmhhbmRzLmFuaW1hdGVcblx0XHRcdG1pZFg6IGlmIG9wZW4gdGhlbiBtaWRYIC0gMTEyIGVsc2UgbWlkWFxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogc2Vjb25kc1xuXHRcdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEwKVxuXG5cdHNob3dUcmFuc2l0aW9uOiA9PlxuXHRcdGhhbmRzID0gRnJhbWVyLkRldmljZS5oYW5kc1xuXHRcdG1pZFggPSBoYW5kcy5fY29udGV4dC5pbm5lcldpZHRoIC8gMlxuXG5cdFx0b3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKFxuXHRcdFx0aGFuZHMubWlkWCxcblx0XHRcdFttaWRYIC0gNTYsIG1pZFggLSAxMTJdLCBcblx0XHRcdFswLCAxXSwgXG5cdFx0XHR0cnVlXG5cdFx0KVxuXG5cdFx0ZmFjdG9yID0gVXRpbHMubW9kdWxhdGUoXG5cdFx0XHRoYW5kcy5taWRYLFxuXHRcdFx0W21pZFgsIG1pZFggLSAxMTJdLFxuXHRcdFx0WzAsIDFdLFxuXHRcdFx0dHJ1ZVxuXHRcdClcblxuXHRcdEBzcGVjUGFuZWwuZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eVxuXHRcdENhbnZhcy5iYWNrZ3JvdW5kQ29sb3IgPSBDb2xvci5taXggQF9jYW52YXNDb2xvciwncmdiYSgzMCwgMzAsIDMwLCAxLjAwMCknLCBmYWN0b3JcblxuXHQjIHVwZGF0ZSB3aGVuIHNjcmVlbiBzaXplIGNoYW5nZXNcblx0dXBkYXRlOiA9PlxuXHRcdHJldHVybiBpZiBub3QgQG9wZW5lZFxuXG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy5taWRYIC09IDEyMlxuXG5cdFx0c3ZnQ29udGV4dC5zZXRDb250ZXh0KClcblx0XHRAZm9jdXMoKVxuXG5cdCMgZ2V0IHRoZSBkaW1lbnNpb25zIG9mIGFuIGVsZW1lbnRcblx0Z2V0RGltZW5zaW9uczogKGVsZW1lbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50XG5cdFx0ZCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdGRpbWVuc2lvbnMgPSB7XG5cdFx0XHR4OiBkLmxlZnRcblx0XHRcdHk6IGQudG9wXG5cdFx0XHR3aWR0aDogZC53aWR0aFxuXHRcdFx0aGVpZ2h0OiBkLmhlaWdodFxuXHRcdFx0bWlkWDogZC5sZWZ0ICsgKGQud2lkdGggLyAyKVxuXHRcdFx0bWlkWTogZC50b3AgKyAoZC5oZWlnaHQgLyAyKVxuXHRcdFx0bWF4WDogZC5sZWZ0ICsgZC53aWR0aFxuXHRcdFx0bWF4WTogZC50b3AgKyBkLmhlaWdodFxuXHRcdFx0ZnJhbWU6IGRcblx0XHR9XG5cblx0XHRyZXR1cm4gZGltZW5zaW9uc1xuXG5cdCMgbWFrZSBhIHJlbGF0aXZlIGRpc3RhbmNlIGxpbmVcblx0bWFrZUxpbmU6IChwb2ludEEsIHBvaW50QiwgbGFiZWwgPSB0cnVlKSA9PlxuXG5cdFx0Y29sb3IgPSBpZiBAc2VsZWN0ZWRMYXllcj8gdGhlbiBAc2VsZWN0ZWRDb2xvciBlbHNlIEBjb2xvclxuXG5cdFx0bGluZSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRkOiBcIk0gI3twb2ludEFbMF19ICN7cG9pbnRBWzFdfSBMICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXX1cIlxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRpZiBwb2ludEFbMF0gaXMgcG9pbnRCWzBdXG5cblx0XHRcdGNhcEEgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QVswXSAtIDV9ICN7cG9pbnRBWzFdfSBMICN7cG9pbnRBWzBdICsgNX0gI3twb2ludEFbMV19XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdFx0Y2FwQiA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRCWzBdIC0gNX0gI3twb2ludEJbMV19IEwgI3twb2ludEJbMF0gKyA1fSAje3BvaW50QlsxXX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0ZWxzZSBpZiBwb2ludEFbMV0gaXMgcG9pbnRCWzFdXG5cblx0XHRcdGNhcEEgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QVswXX0gI3twb2ludEFbMV0gLSA1fSBMICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXSArIDV9XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdFx0Y2FwQiA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXSAtIDV9IEwgI3twb2ludEJbMF19ICN7cG9pbnRCWzFdICsgNX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdCMgbWFrZSB0aGUgbGFiZWwgYm94IGZvciBkaXN0YW5jZSBsaW5lc1xuXHRtYWtlTGFiZWw6ICh4LCB5LCB0ZXh0KSA9PlxuXG5cdFx0Y29sb3IgPSBpZiBAc2VsZWN0ZWRMYXllcj8gdGhlbiBAc2VsZWN0ZWRDb2xvciBlbHNlIEBjb2xvclxuXG5cdFx0bGFiZWwgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICd0ZXh0J1xuXHRcdFx0cGFyZW50OiBzdmdDb250ZXh0XG5cdFx0XHR4OiB4XG5cdFx0XHR5OiB5ICsgNFxuXHRcdFx0J2ZvbnQtZmFtaWx5JzogQGZvbnRGYW1pbHlcblx0XHRcdCdmb250LXNpemUnOiBAZm9udFNpemVcblx0XHRcdCdmb250LXdlaWdodCc6IEBmb250V2VpZ2h0XG5cdFx0XHQndGV4dC1hbmNob3InOiBcIm1pZGRsZVwiXG5cdFx0XHRmaWxsOiBAc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdHRleHQ6IE1hdGguZmxvb3IodGV4dCAvIEByYXRpbylcblxuXHRcdHcgPSBsYWJlbC5lbGVtZW50LnRleHRMZW5ndGguYmFzZVZhbC52YWx1ZVxuXG5cdFx0Ym94ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogc3ZnQ29udGV4dFxuXHRcdFx0eDogeCAtICh3IC8gMikgLSBAcGFkZGluZy5sZWZ0XG5cdFx0XHR5OiB5IC0gN1xuXHRcdFx0d2lkdGg6IHcgKyBAcGFkZGluZy5sZWZ0ICsgQHBhZGRpbmcucmlnaHRcblx0XHRcdGhlaWdodDogMTVcblx0XHRcdHJ4OiBAYm9yZGVyUmFkaXVzXG5cdFx0XHRyeTogQGJvcmRlclJhZGl1c1xuXHRcdFx0ZmlsbDogbmV3IENvbG9yKGNvbG9yKS5kYXJrZW4oNDApXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGxhYmVsLnNob3coKVxuXG5cdCMgbWFrZSB0aGUgYm91bmRpbmcgcmVjdGFuZ2xlIGZvciBzZWxlY3RlZCAvIGhvdmVyZWQgZWxlbWVudHNcblx0bWFrZVJlY3RPdmVybGF5czogKHNlbGVjdGVkTGF5ZXIsIHMsIGhvdmVyZWRMYXllciwgaCkgPT5cblx0XHRpZiBub3QgcyBvciBub3QgaFxuXHRcdFx0cmV0dXJuXG5cblx0XHRpZiBob3ZlcmVkTGF5ZXIgaXMgc2VsZWN0ZWRMYXllclxuXHRcdFx0aG92ZXJlZExheWVyID0gRnJhbWVyLkRldmljZS5zY3JlZW5cblxuXHRcdGhvdmVyRmlsbCA9IG5ldyBDb2xvcihAY29sb3IpLmFscGhhKC4yKVxuXG5cdFx0aWYgaG92ZXJlZExheWVyIGlzIEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cdFx0XHRob3ZlckZpbGwgPSBuZXcgQ29sb3IoQGNvbG9yKS5hbHBoYSgwKVxuXG5cdFx0aG92ZXJlZFJlY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBzdmdDb250ZXh0XG5cdFx0XHR4OiBoLnhcblx0XHRcdHk6IGgueVxuXHRcdFx0d2lkdGg6IGgud2lkdGhcblx0XHRcdGhlaWdodDogaC5oZWlnaHRcblx0XHRcdHN0cm9rZTogQGNvbG9yXG5cdFx0XHRmaWxsOiBob3ZlckZpbGxcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0c2VsZWN0RmlsbCA9IG5ldyBDb2xvcihAc2VsZWN0ZWRDb2xvcikuYWxwaGEoLjIpXG5cdFx0XG5cdFx0aWYgc2VsZWN0ZWRMYXllciBpcyBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdFx0c2VsZWN0RmlsbCA9IG5ldyBDb2xvcihAc2VsZWN0ZWRDb2xvcikuYWxwaGEoMClcblxuXHRcdHNlbGVjdGVkUmVjdCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IHN2Z0NvbnRleHRcblx0XHRcdHg6IHMueFxuXHRcdFx0eTogcy55XG5cdFx0XHR3aWR0aDogcy53aWR0aFxuXHRcdFx0aGVpZ2h0OiBzLmhlaWdodFxuXHRcdFx0c3Ryb2tlOiBAc2VsZWN0ZWRDb2xvclxuXHRcdFx0ZmlsbDogc2VsZWN0RmlsbFxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0IyBtYWtlIGRhc2hlZCBsaW5lcyBmcm9tIGJvdW5kaW5nIHJlY3QgdG8gc2NyZWVuIGVkZ2Vcblx0bWFrZURhc2hlZExpbmVzOiAoZSwgZiwgY29sb3IsIG9mZnNldCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVcblx0XHRyZXR1cm4gaWYgZSBpcyBmXG5cblx0XHRjb2xvciA9IG5ldyBDb2xvcihjb2xvcikuYWxwaGEoLjgpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBlLngsIHk6IGYueX0sXG5cdFx0XHR7eDogZS54LCB5OiBmLm1heFl9XG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZS5tYXhYLCB5OiBmLnl9LFxuXHRcdFx0e3g6IGUubWF4WCwgeTogZi5tYXhZfSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBmLngsIFx0eTogZS55fSxcblx0XHRcdHt4OiBmLm1heFgsIHk6IGUueX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZi54LCBcdHk6IGUubWF4WX0sXG5cdFx0XHR7eDogZi5tYXhYLCB5OiBlLm1heFl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRzaG93RGlzdGFuY2VzOiAoc2VsZWN0ZWRMYXllciwgaG92ZXJlZExheWVyKSA9PlxuXG5cdFx0cmV0dXJuIGlmIG5vdCBzZWxlY3RlZExheWVyIG9yIG5vdCBob3ZlcmVkTGF5ZXJcblxuXHRcdHMgPSBAZ2V0RGltZW5zaW9ucyhzZWxlY3RlZExheWVyLl9lbGVtZW50KVxuXHRcdGggPSBAZ2V0RGltZW5zaW9ucyhob3ZlcmVkTGF5ZXIuX2VsZW1lbnQpXG5cdFx0ZiA9IEBnZXREaW1lbnNpb25zKEZyYW1lci5EZXZpY2Uuc2NyZWVuLl9lbGVtZW50KVxuXG5cdFx0QG1ha2VEYXNoZWRMaW5lcyhzLCBmLCBAc2VsZWN0ZWRDb2xvciwgNSlcblxuXHRcdEBtYWtlUmVjdE92ZXJsYXlzKHNlbGVjdGVkTGF5ZXIsIHMsIGhvdmVyZWRMYXllciwgaClcblxuXHRcdCMgV2hlbiBzZWxlY3RlZCBlbGVtZW50IGNvbnRhaW5zIGhvdmVyZWQgZWxlbWVudFxuXG5cdFx0QHJhdGlvID0gRnJhbWVyLkRldmljZS5zY3JlZW4uX2VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLyBTY3JlZW4ud2lkdGhcblxuXHRcdGlmIHMueCA8IGgueCBhbmQgcy5tYXhYID4gaC5tYXhYIGFuZCBzLnkgPCBoLnkgYW5kIHMubWF4WSA+IGgubWF4WVxuXHRcdFx0XG5cdFx0XHQjIHRvcFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC55KVxuXHRcdFx0bSA9IHMueSArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBzLnkgKyA1XSwgW2gubWlkWCwgaC55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdFx0IyByaWdodFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy5tYXhYIC0gaC5tYXhYKVxuXHRcdFx0bSA9IGgubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1heFggKyA1LCBoLm1pZFldLCBbcy5tYXhYIC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0XHQjIGJvdHRvbVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy5tYXhZIC0gaC5tYXhZKVxuXHRcdFx0bSA9IGgubWF4WSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgubWF4WSArIDVdLCBbaC5taWRYLCBzLm1heFkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIGxlZnRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgueClcblx0XHRcdG0gPSBzLnggKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW3MueCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHRcdHJldHVyblxuXG5cdFx0IyBXaGVuIGhvdmVyZWQgZWxlbWVudCBjb250YWlucyBzZWxlY3RlZCBlbGVtZW50XG5cblx0XHRpZiBzLnggPiBoLnggYW5kIHMubWF4WCA8IGgubWF4WCBhbmQgcy55ID4gaC55IGFuZCBzLm1heFkgPCBoLm1heFlcblx0XHRcdFxuXHRcdFx0IyB0b3BcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueSAtIHMueSlcblx0XHRcdG0gPSBoLnkgKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgaC55ICsgNV0sIFtzLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgcmlnaHRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgubWF4WCAtIHMubWF4WClcblx0XHRcdG0gPSBzLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5tYXhYICsgNSwgcy5taWRZXSwgW2gubWF4WCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXHRcdFx0IyBib3R0b21cblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgubWF4WSAtIHMubWF4WSlcblx0XHRcdG0gPSBzLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5taWRYLCBzLm1heFkgKyA1XSwgW3MubWlkWCwgaC5tYXhZIC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKHMubWlkWCwgbSwgZClcblxuXHRcdFx0IyBsZWZ0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLngpXG5cdFx0XHRtID0gaC54ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtoLnggKyA1LCBzLm1pZFldLCBbcy54IC0gNCwgcy5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgcy5taWRZLCBkKVxuXG5cblx0XHRcdHJldHVyblxuXG5cdFx0IyBXaGVuIHNlbGVjdGVkIGVsZW1lbnQgZG9lc24ndCBjb250YWluIGhvdmVyZWQgZWxlbWVudFxuXHRcdFxuXHRcdCMgdG9wXG5cblx0XHRpZiBzLnkgPiBoLm1heFlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgubWF4WSlcblx0XHRcdG0gPSBzLnkgLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLm1heFkgKyA1XSwgW2gubWlkWCwgcy55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdGVsc2UgaWYgcy55ID4gaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLnkpXG5cdFx0XHRtID0gcy55IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC55ICsgNV0sIFtoLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHQjIGxlZnRcblxuXHRcdGlmIGgubWF4WCA8IHMueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy54IC0gaC5tYXhYKVxuXHRcdFx0bSA9IHMueCAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1heFggKyA1LCBoLm1pZFldLCBbcy54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0ZWxzZSBpZiBoLnggPCBzLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgueClcblx0XHRcdG0gPSBzLnggLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgaC5taWRZXSwgW3MueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdCMgcmlnaHRcblxuXHRcdGlmIHMubWF4WCA8IGgueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy5tYXhYKVxuXHRcdFx0bSA9IHMubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1heFggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0ZWxzZSBpZiBzLnggPCBoLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMueClcblx0XHRcdG0gPSBzLnggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy54ICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdCMgYm90dG9tXG5cblx0XHRpZiBzLm1heFkgPCBoLnlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueSAtIHMubWF4WSlcblx0XHRcdG0gPSBzLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBzLm1heFkgKyA1XSwgW2gubWlkWCwgaC55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdGVsc2UgaWYgcy55IDwgaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLnkpXG5cdFx0XHRtID0gcy55ICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0IyBzZXQgdGhlIHBhbmVsIHdpdGggY3VycmVudCBwcm9wZXJ0aWVzXG5cdHNldFBhbmVsUHJvcGVydGllczogKCkgPT5cblxuXHRcdGxheWVyID0gQHNlbGVjdGVkTGF5ZXIgPyBAaG92ZXJlZExheWVyXG5cblx0XHRpZiBsYXllciBpcyBAbGFzdExheWVyIGFuZCBsYXllci5pc0FuaW1hdGluZyBpcyBmYWxzZVxuXHRcdFx0cmV0dXJuXG5cblx0XHRAbGFzdExheWVyID0gbGF5ZXJcblx0XHRAbGFzdFByb3BzID0gbGF5ZXIucHJvcHNcblx0XHRcblx0XHQjIHByb3BlcnRpZXMgdG8gYXNzaWduZWQgdG8gbGF5ZXIucHJvcHNcblx0XHRjdXN0b21Qcm9wcyA9XG5cdFx0XHR4OiBsYXllci5zY3JlZW5GcmFtZS54XG5cdFx0XHR5OiBsYXllci5zY3JlZW5GcmFtZS55XG5cdFx0XHRjb21wb25lbnROYW1lOiBsYXllci5jb25zdHJ1Y3Rvci5uYW1lXG5cdFx0XHRjb21wb25lbnROYW1lczogQGdldENvbXBvbmVudEZyb21MYXllcihsYXllci5wYXJlbnQpXG5cdFx0XHRwYXJlbnROYW1lOiBsYXllci5wYXJlbnQ/Lm5hbWVcblx0XHRcdHJvdGF0aW9uOiBsYXllci5yb3RhdGlvblpcblx0XHRcdCMgdGV4dEFsaWduOiBsYXllci5wcm9wcy5zdHlsZWRUZXh0T3B0aW9ucz8uYWxpZ25tZW50XG5cdFx0XHRibGVuZGluZzogbGF5ZXIuYmxlbmRpbmdcblx0XHRcdCMgc2NyZWVuc2hvdDogQGdldFNjcmVlbnNob3QobGF5ZXIuX2VsZW1lbnQpXG5cdFx0XG5cdFx0aWYgbGF5ZXIuZ3JhZGllbnQ/XG5cdFx0XHRfLmFzc2lnbiBjdXN0b21Qcm9wcyxcblx0XHRcdFx0Z3JhZGllbnRTdGFydDogbGF5ZXIuZ3JhZGllbnQuc3RhcnRcblx0XHRcdFx0Z3JhZGllbnRFbmQ6IGxheWVyLmdyYWRpZW50LmVuZFxuXHRcdFx0XHRncmFkaWVudEFuZ2xlOiBsYXllci5ncmFkaWVudC5hbmdsZVxuXG5cdFx0aWYgbGF5ZXIuc2hhZG93cz9cblx0XHRcdF8uYXNzaWduIGN1c3RvbVByb3BzLFxuXHRcdFx0XHRzaGFkb3dYOiBsYXllci5zaGFkb3dzWzBdPy54XG5cdFx0XHRcdHNoYWRvd1k6IGxheWVyLnNoYWRvd3NbMF0/Lnlcblx0XHRcdFx0c2hhZG93U3ByZWFkOiBsYXllci5zaGFkb3dzWzBdPy5zcHJlYWRcblx0XHRcdFx0c2hhZG93Q29sb3I6IGxheWVyLnNoYWRvd3NbMF0/LmNvbG9yXG5cdFx0XHRcdHNoYWRvd1R5cGU6IGxheWVyLnNoYWRvd3NbMF0/LnR5cGVcblx0XHRcdFx0c2hhZG93Qmx1cjogbGF5ZXIuc2hhZG93c1swXT8uYmx1clxuXG5cdFx0QHNwZWNQYW5lbC5zaG93UHJvcGVydGllcyhsYXllciwgY3VzdG9tUHJvcHMpXG5cdFx0XG5cdFx0ZXZlbnRMaXN0ZW5lcnMgPSBAZ2V0TGF5ZXJFdmVudExpc3RlbmVycyhsYXllcilcblx0XHRAc3BlY1BhbmVsLmNsZWFyQ2hpbGRyZW5UaGVuU2hvd0V2ZW50TGlzdGVuZXJzKGV2ZW50TGlzdGVuZXJzKVxuXG5cdFx0YW5pbWF0aW9ucyA9IGxheWVyLmFuaW1hdGlvbnMoKVxuXHRcdEBzcGVjUGFuZWwuY2xlYXJDaGlsZHJlblRoZW5TaG93QW5pbWF0aW9ucyhhbmltYXRpb25zKVxuXG5cblx0c2V0SG92ZXJlZExheWVyOiAoZXZlbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0bGF5ZXIgPSBAZ2V0TGF5ZXJGcm9tRWxlbWVudChldmVudD8udGFyZ2V0KVxuXHRcdHJldHVybiBpZiBub3QgQGdldExheWVySXNWaXNpYmxlKGxheWVyKVxuXG5cdFx0QGhvdmVyZWRMYXllciA9IGxheWVyXG5cblx0XHRAdHJ5Rm9jdXMoZXZlbnQpXG5cblx0XHRyZXR1cm4gZmFsc2VcblxuXHR1bnNldEhvdmVyZWRMYXllcjogKGV2ZW50KSA9PlxuXHRcdEBob3ZlcmVkTGF5ZXIgPSB1bmRlZmluZWRcblx0XHRVdGlscy5kZWxheSAuMDUsID0+XG5cdFx0XHRpZiBub3QgQGhvdmVyZWRMYXllciB0aGVuIEBmb2N1cygpXG5cblx0c2V0U2VsZWN0ZWRMYXllcjogPT5cblx0XHRyZXR1cm4gaWYgbm90IEBob3ZlcmVkTGF5ZXJcblxuXHRcdGlmIEBzZWxlY3RlZExheWVyIGlzIEBob3ZlcmVkTGF5ZXJcblx0XHRcdEB1bnNldFNlbGVjdGVkTGF5ZXIoKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRAc2VsZWN0ZWRMYXllciA9IEBob3ZlcmVkTGF5ZXJcblx0XHRAZm9jdXMoKVxuXG5cdHVuc2V0U2VsZWN0ZWRMYXllcjogPT5cblx0XHRAc2VsZWN0ZWRMYXllciA9IHVuZGVmaW5lZFxuXHRcdEBmb2N1cygpXG5cblxuXHQjIEZpbmQgYW4gZWxlbWVudCB0aGF0IGJlbG9uZ3MgdG8gYSBGcmFtZXIgTGF5ZXJcblx0ZmluZExheWVyRWxlbWVudDogKGVsZW1lbnQpIC0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50LmNsYXNzTGlzdFxuXG5cdFx0aWYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZyYW1lckxheWVyJylcblx0XHRcdHJldHVybiBlbGVtZW50XG5cblx0XHRAZmluZExheWVyRWxlbWVudChlbGVtZW50LnBhcmVudE5vZGUpXG5cblx0IyBGaW5kIGEgRnJhbWVyIExheWVyIHRoYXQgbWF0Y2hlcyBhIEZyYW1lciBMYXllciBlbGVtZW50XG5cdGdldExheWVyRnJvbUVsZW1lbnQ6IChlbGVtZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudFxuXG5cdFx0ZWxlbWVudCA9IEBmaW5kTGF5ZXJFbGVtZW50KGVsZW1lbnQpXG5cdFx0bGF5ZXIgPSBfLmZpbmQoRnJhbWVyLkN1cnJlbnRDb250ZXh0Ll9sYXllcnMsIFsnX2VsZW1lbnQnLCBlbGVtZW50XSlcblxuXHRcdHJldHVybiBsYXllclxuXG5cdGdldExheWVySXNWaXNpYmxlOiAobGF5ZXIpID0+XG5cdFx0aWYgbm90IEBfb25seVZpc2libGVcblx0XHRcdHJldHVybiB0cnVlXG5cblx0XHRpZiBub3QgbGF5ZXJcblx0XHRcdHJldHVybiB0cnVlXG5cblx0XHRpZiBsYXllci5vcGFjaXR5IGlzIDAgb3IgbGF5ZXIudmlzaWJsZSBpcyBmYWxzZSBvciBsYXllci5nb3RjaGFJZ25vcmVcblx0XHRcdHJldHVybiBmYWxzZVxuXG5cdFx0QGdldExheWVySXNWaXNpYmxlKGxheWVyLnBhcmVudClcblxuXHRnZXRMYXllckV2ZW50TGlzdGVuZXJzOiAobGF5ZXIpID0+XG5cblx0XHRsaXN0ZW5lcnMgPSBfLm1hcChsYXllci5fZXZlbnRzLCAoZXZzLCBsaXN0ZW5lciwgYykgLT5cblx0XHRcdGlmIG5vdCBfLmlzQXJyYXkoZXZzKSB0aGVuIGV2cyA9IFtldnNdXG5cdFx0XHRcblx0XHRcdHtcblx0XHRcdFx0bGlzdGVuZXI6IGxpc3RlbmVyXG5cdFx0XHRcdGV2ZW50czogXy5tYXAgZXZzLCAoZXYpIC0+XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZTogZXYuZm4ubmFtZVxuXHRcdFx0XHRcdFx0ZnVuY3Rpb246IGV2LmZuLnRvU3RyaW5nKClcblx0XHRcdFx0XHRcdGNvbnRleHQ6IGV2LmNvbnRleHQgXG5cdFx0XHRcdFx0XHRvbmNlOiBldi5vbmNlXG5cdFx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdClcblxuXHRcdHJldHVybiBsaXN0ZW5lcnNcblxuXHRnZXRTY3JlZW5zaG90OiAoZWxlbWVudCkgPT5cblxuXHRcdGZvcmVpZ25PYmplY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdmb3JlaWduT2JqZWN0J1xuXG5cdFx0IyBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyTGF5ZXIgRGV2aWNlQ29tcG9uZW50UG9ydCcpWzBdXG5cdFx0XG5cdFx0cmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0XHRjdHggPSBAc3BlY1BhbmVsLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5cdFx0ZGF0YSA9IFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScje3JlY3Qud2lkdGh9JyBoZWlnaHQ9JyN7cmVjdC5oZWlnaHR9Jz5cIiArXG5cdFx0XHQnPGZvcmVpZ25PYmplY3Qgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPicgK1xuXHRcdFx0JzxkaXYgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI+JyArXG5cdFx0XHRlbGVtZW50LmlubmVySFRNTCArXG5cdFx0XHQnPC9kaXY+JyArXG5cdFx0XHQnPC9mb3JlaWduT2JqZWN0PicgK1xuXHRcdFx0Jzwvc3ZnPidcblxuXHRcdERPTVVSTCA9IHdpbmRvdy5VUkwgb3Igd2luZG93LndlYmtpdFVSTCBvciB3aW5kb3dcblxuXHRcdHN2ZyA9IG5ldyBCbG9iKFtkYXRhXSwge3R5cGU6ICdpbWFnZS9zdmcreG1sJ30pXG5cdFx0dXJsID0gRE9NVVJMLmNyZWF0ZU9iamVjdFVSTChzdmcpXG5cdFx0QHNwZWNQYW5lbC5zY3JlZW5zaG90Qm94LnZhbHVlID0gdXJsXG5cblxuXHQjIEZpbmQgYSBub24tc3RhbmRhcmQgQ29tcG9uZW50IHRoYXQgaW5jbHVkZXMgYSBMYXllclxuXHRnZXRDb21wb25lbnRGcm9tTGF5ZXI6IChsYXllciwgbmFtZXMgPSBbXSkgPT5cblx0XHRpZiBub3QgbGF5ZXJcblx0XHRcdHJldHVybiBuYW1lcy5qb2luKCcsICcpXG5cblx0XHRpZiBub3QgXy5pbmNsdWRlcyhbXCJMYXllclwiLCBcIlRleHRMYXllclwiLCBcIlNjcm9sbENvbXBvbmVudFwiXSwgbGF5ZXIuY29uc3RydWN0b3IubmFtZSlcblx0XHRcdG5hbWVzLnB1c2gobGF5ZXIuY29uc3RydWN0b3IubmFtZSlcblxuXHRcdEBnZXRDb21wb25lbnRGcm9tTGF5ZXIobGF5ZXIucGFyZW50LCBuYW1lcylcblxuXG5cdCMgRGVsYXkgZm9jdXMgYnkgYSBzbWFsbCBhbW91bnQgdG8gcHJldmVudCBmbGFzaGluZ1xuXHR0cnlGb2N1czogKGV2ZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdEBmb2N1c0VsZW1lbnQgPSBldmVudC50YXJnZXRcblx0XHRkbyAoZXZlbnQpID0+XG5cdFx0XHRVdGlscy5kZWxheSAuMDUsID0+XG5cdFx0XHRcdGlmIEBmb2N1c0VsZW1lbnQgaXNudCBldmVudC50YXJnZXRcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0XG5cdFx0XHRcdEBmb2N1cygpXG5cblx0IyBDaGFuZ2UgZm9jdXMgdG8gYSBuZXcgaG92ZXJlZCBvciBzZWxlY3RlZCBlbGVtZW50XG5cdGZvY3VzOiA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdEB1bmZvY3VzKClcblxuXHRcdCMgQHNlbGVjdGVkTGF5ZXIgPz0gRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRAaG92ZXJlZExheWVyID89IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cblx0XHRob3ZlcmVkTGF5ZXIgPSBAaG92ZXJlZExheWVyID8gRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRzZWxlY3RlZExheWVyID0gQHNlbGVjdGVkTGF5ZXIgPyBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXG5cdFx0aWYgc2VsZWN0ZWRMYXllciBpcyBob3ZlcmVkTGF5ZXJcblx0XHRcdGhvdmVyZWRMYXllciA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cblx0XHRpZiBob3ZlcmVkTGF5ZXIgaXMgc2VsZWN0ZWRMYXllclxuXHRcdFx0cmV0dXJuXG5cblx0XHRAc2hvd0Rpc3RhbmNlcyhzZWxlY3RlZExheWVyLCBob3ZlcmVkTGF5ZXIpXG5cdFx0QHNldFBhbmVsUHJvcGVydGllcyhzZWxlY3RlZExheWVyLCBob3ZlcmVkTGF5ZXIpXG5cblx0dW5mb2N1czogKGV2ZW50KSA9PlxuXHRcdHN2Z0NvbnRleHQucmVtb3ZlQWxsKClcblxuXG4jIGtpY2tvZmZcblxucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxucGFuZWwuaWQgPSAncENvbnRhaW5lcidcbnZpZXdDID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ZyYW1lckNvbnRleHRSb290LURlZmF1bHQnKVxuVXRpbHMuZGVsYXkgMCwgPT4gdmlld0MuYXBwZW5kQ2hpbGQocGFuZWwpXG5cbnNlY3JldEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VjcmV0Qm94KVxuXG5cbnN2Z0NvbnRleHQgPSBuZXcgU1ZHQ29udGV4dFxuXG5leHBvcnRzLmdvdGNoYSA9IGdvdGNoYSA9IG5ldyBHb3RjaGFcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBRUFBO0FEWUEsSUFBQSwwUEFBQTtFQUFBOzs7O0FBQUEsVUFBQSxHQUFhLE1BQU0sQ0FBQyxZQUFZLENBQUM7O0FBRWpDLElBQUcsa0JBQUg7RUFDQyxNQUFBLEdBQVMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFRLENBQUEsVUFBQTtFQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBdkIsR0FBMEMsTUFBTSxDQUFDO0VBRWpELE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBZCxHQUEyQjtFQUMzQixNQUFNLENBQUMsWUFBWSxDQUFDLE1BQXBCLEdBQTZCLE9BTDlCOzs7QUFPQSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFwQixDQUFBOztBQUVBLFVBQUEsR0FBYTs7QUFDYixTQUFBLEdBQVk7O0FBQ1osY0FBQSxHQUFpQjs7O0tBSWdDLENBQUUsU0FBUyxDQUFDLEdBQTdELENBQWlFLHFCQUFqRTs7OztBQUdBOzs7Ozs7Ozs7Ozs7QUFnQk07RUFDUSxv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QUFBLEdBQVUsSUFBQSxJQUFBLENBQ1Q7WUFBQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFuQjtZQUNBLElBQUEsRUFBTSxZQUROO1dBRFM7VUFLVixHQUFBLEdBQVUsSUFBQSxNQUFBLENBQ1Q7WUFBQSxNQUFBLEVBQVEsR0FBUjtZQUNBLFNBQUEsRUFBVyxNQURYO1lBRUEsSUFBQSxFQUFNLEVBRk47WUFHQSxLQUFBLHNEQUFtQixDQUFFLHVCQUhyQjtZQUlBLFNBQUEsRUFBVyxLQUpYO1dBRFM7VUFRVixHQUFBLEdBQVUsSUFBQSxNQUFBLENBQ1Q7WUFBQSxNQUFBLEVBQVEsR0FBUjtZQUNBLFNBQUEsRUFBVyxPQURYO1lBRUEsSUFBQSxFQUFNLEVBRk47WUFHQSxLQUFBLHNEQUFtQixDQUFFLHVCQUhyQjtZQUlBLFNBQUEsRUFBVyxLQUpYO1dBRFM7VUFRVixHQUFBLEdBQVUsSUFBQSxJQUFBLENBQ1Q7WUFBQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFuQjtZQUNBLElBQUEsRUFBTSxVQUROO1dBRFM7VUFLVixHQUFBLEdBQVUsSUFBQSxNQUFBLENBQ1Q7WUFBQSxNQUFBLEVBQVEsR0FBUjtZQUNBLFNBQUEsRUFBVyxNQURYO1lBRUEsSUFBQSxFQUFNLEVBRk47WUFHQSxLQUFBLHNEQUFtQixDQUFFLHFCQUhyQjtZQUlBLFNBQUEsRUFBVyxLQUpYO1dBRFM7VUFRVixHQUFBLEdBQVUsSUFBQSxNQUFBLENBQ1Q7WUFBQSxNQUFBLEVBQVEsR0FBUjtZQUNBLFNBQUEsRUFBVyxPQURYO1lBRUEsSUFBQSxFQUFNLEVBRk47WUFHQSxLQUFBLHNEQUFtQixDQUFFLHFCQUhyQjtZQUlBLFNBQUEsRUFBVyxLQUpYO1dBRFM7VUFRVixHQUFBLEdBQVUsSUFBQSxJQUFBLENBQ1Q7WUFBQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFuQjtZQUNBLElBQUEsRUFBTSxZQUROO1dBRFM7VUFLVixHQUFBLEdBQVUsSUFBQSxNQUFBLENBQ1Q7WUFBQSxNQUFBLEVB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
