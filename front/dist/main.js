/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/logo.png":
/*!*************************!*\
  !*** ./assets/logo.png ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"72f350a5d0dec8dac6e2fa23280445cc.png\");\n\n//# sourceURL=webpack:///./assets/logo.png?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fabric__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fabric */ \"../node_modules/fabric/dist/fabric.js\");\n/* harmony import */ var fabric__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fabric__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/style.css */ \"./styles/style.css\");\n/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_style_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/styles/style.scss */ \"./styles/style.scss\");\n/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_style_scss__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _assets_logo_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/assets/logo.png */ \"./assets/logo.png\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(n); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n // create a wrapper around native canvas element (with id='c')\n\nvar canvas = new fabric__WEBPACK_IMPORTED_MODULE_0__[\"Canvas\"]('c');\ncanvas.selection = false;\ncanvas.setDimensions({\n  width: window.innerWidth,\n  height: window.innerHeight\n});\nvar RADIUS = 50;\nvar RADIUSANT = 20;\nvar LEFT = 500;\nvar TOP = 200;\nvar COLORMAIN = '#FF652F';\nvar COLOR = '#FFE400';\nvar COLORANT = '#14A76C';\nvar CONNECTION = '#747474';\nvar animationText = 'Animation in progress';\nvar rooms = {};\nvar connections = {};\nvar data = {};\ndata.ants = 1;\nvar selected = false;\nvar id = 0;\nvar animation = false;\nnewRoom(LEFT - 200, TOP, COLORMAIN);\nnewRoom(LEFT + 200, TOP, COLORMAIN);\ndocument.getElementById('add-room').addEventListener('click', function () {\n  if (animation) {\n    show(animationText);\n    return;\n  }\n\n  newRoom(LEFT, TOP, COLOR);\n});\n\nfunction newRoom(left, top, color) {\n  var c = new fabric__WEBPACK_IMPORTED_MODULE_0__[\"Circle\"]({\n    radius: RADIUS,\n    fill: color,\n    left: left,\n    top: top,\n    id: id\n  });\n  console.log(c);\n  c.hasControls = false;\n  c.lines1 = [];\n  c.lines2 = [];\n  canvas.add(c);\n  canvas.bringToFront(c);\n  rooms[id] = c;\n\n  if (id != 0 && id != 1) {\n    canvas.setActiveObject(c);\n  }\n\n  id++;\n  clickRoom(c);\n}\n\nfunction clickRoom(c) {\n  c.on('mousedown', function (e) {\n    if (selected && selected != c) {\n      var temp = order(selected.id, c.id);\n      console.log(connections);\n\n      if (!(temp in connections)) {\n        if (selected.id < c.id) {\n          var line = new fabric__WEBPACK_IMPORTED_MODULE_0__[\"Line\"]([selected.left + RADIUS, selected.top + RADIUS, c.left + RADIUS, c.top + RADIUS], {\n            stroke: CONNECTION,\n            strokeWidth: 10,\n            id: temp\n          });\n          selected.lines1.push(line);\n          c.lines2.push(line);\n        } else {\n          var line = new fabric__WEBPACK_IMPORTED_MODULE_0__[\"Line\"]([c.left + RADIUS, c.top + RADIUS, selected.left + RADIUS, selected.top + RADIUS], {\n            stroke: CONNECTION,\n            strokeWidth: 10,\n            id: temp\n          });\n          c.lines1.push(line);\n          selected.lines2.push(line);\n        }\n\n        line.room1 = c;\n        line.room2 = selected;\n        console.log(line);\n        line.lockMovementX = true;\n        line.lockMovementY = true;\n        line.lockScalingX = true;\n        line.lockScalingY = true;\n        line.lockUniScaling = true;\n        line.lockRotation = true;\n        line.hasControls = false;\n        canvas.add(line);\n        canvas.sendToBack(line);\n        var name = order(selected.id, c.id);\n        connections[name] = line;\n        selected = false;\n        canvas.discardActiveObject();\n        canvas.requestRenderAll();\n      }\n    } else {\n      selected = c;\n    }\n  });\n}\n\ncanvas.on('mouse:up', function (e) {\n  var p = e.target;\n\n  if (p) {\n    if (p.type != 'circle') {\n      selected = false;\n    }\n  } else {\n    selected = false;\n  }\n});\ncanvas.on('object:moving', function (e) {\n  var p = e.target;\n  var length1 = 0;\n  var length2 = 0;\n\n  if (p.lines1) {\n    length1 = p.lines1.length;\n  }\n\n  if (p.lines2) {\n    length2 = p.lines2.length;\n  }\n\n  var length = Math.max(length1, length2);\n\n  for (var i = 0; i < length; i++) {\n    p.lines1[i] && p.lines1[i].set({\n      'x1': p.left + RADIUS,\n      'y1': p.top + RADIUS\n    });\n    p.lines1[i] && p.lines1[i].setCoords();\n    p.lines2[i] && p.lines2[i].set({\n      'x2': p.left + RADIUS,\n      'y2': p.top + RADIUS\n    });\n    p.lines2[i] && p.lines2[i].setCoords();\n  }\n\n  canvas.renderAll();\n});\n\nfunction order(num1, num2) {\n  var str1 = num1.toString();\n  var str2 = num2.toString();\n\n  if (num1 < num2) {\n    return str1 + str2;\n  }\n\n  return str2 + str1;\n}\n\ndocument.getElementById('rangePicker').addEventListener('input', function (event) {\n  var value = event.target.value;\n  data.ants = parseInt(value);\n  var ants = document.getElementById('ants');\n  ants.textContent = value;\n});\ndocument.getElementById('delete').addEventListener('click', function () {\n  if (animation) {\n    show(animationText);\n    return;\n  }\n\n  var act = canvas.getActiveObject();\n\n  if (act) {\n    if (act.type == 'line') {\n      deleteLine(act);\n    } else {\n      if (act.id == 0 || act.id == 1) {\n        show('Cannot delete main rooms');\n      } else {\n        canvas.remove(act);\n        selected = false; // rooms = rooms.filter(item => item.id !== act.id)\n\n        delete rooms[act.id]; // Delete line\n\n        if (act.lines1) {\n          for (var i = 0; i < act.lines1.length; i++) {\n            deleteLine(act.lines1[i]);\n          }\n        }\n\n        if (act.lines2) {\n          for (var i = 0; i < act.lines2.length; i++) {\n            deleteLine(act.lines2[i]);\n          }\n        }\n      }\n    }\n  } else {\n    show('No object selected');\n  }\n});\n\nfunction deleteLine(act) {\n  canvas.remove(act);\n  var room1 = act.room1;\n  var room2 = act.room2;\n  room1.lines1 = room1.lines1.filter(function (line) {\n    return line.id !== act.id;\n  });\n  room1.lines2 = room1.lines2.filter(function (line) {\n    return line.id !== act.id;\n  });\n  room2.lines1 = room2.lines1.filter(function (line) {\n    return line.id !== act.id;\n  });\n  room2.lines2 = room2.lines2.filter(function (line) {\n    return line.id !== act.id;\n  });\n  delete connections[act.id];\n}\n\nvar output = {};\ndocument.getElementById('start').addEventListener('click', function () {\n  if (animation) {\n    show(animationText);\n    return;\n  }\n\n  console.log(data);\n  data.rooms = [];\n\n  for (var id in rooms) {\n    data.rooms.push(parseInt(id));\n  }\n\n  data.connections = [];\n\n  for (var connection in connections) {\n    data.connections.push(connection);\n  }\n\n  console.log(data);\n  var URL = 'http://localhost:8081/algo'; // const URL = 'http://localhost:8080/algo'\n\n  fetch(URL, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  }).then(function (response) {\n    return response.json();\n  }).then(function (newData) {\n    console.log('Success:', newData);\n    output = newData;\n    animateSetup();\n  }).catch(function (error) {\n    console.error('Error:', error);\n    show('Error from server');\n  });\n});\nvar pressed = false;\n\nfunction show(textShow) {\n  if (pressed) {\n    return;\n  }\n\n  pressed = true;\n  var span = document.createElement('span');\n  span.classList.add('tag', 'is-large', 'is-warning');\n  var text = document.createTextNode(textShow);\n  span.appendChild(text);\n  var div = document.getElementById('show');\n  div.appendChild(span);\n  div.style.position = 'absolute';\n  div.style.left = '50%';\n  div.style.zIndex = 100;\n  div.style.paddingTop = '5em';\n  setTimeout(function () {\n    var op = 1; // initial opacity\n\n    var timer = setInterval(function () {\n      if (op <= 0.1) {\n        clearInterval(timer);\n        span.remove();\n        div.removeAttribute('style');\n        pressed = false;\n      }\n\n      span.style.opacity = op;\n      span.style.filter = 'alpha(opacity=' + op * 100 + ')';\n      op -= op * 0.1;\n    }, 30);\n  }, 2000);\n}\n\nvar ants = {};\nvar antPrevRoom = {};\nvar end = 100;\nvar animated = [];\n\nfunction animateSetup() {\n  if (output.Error) {\n    show(output.ErrorMessage);\n  } else {\n    console.log(output.Steps);\n    animation = true;\n    lockCanvas();\n    var left = rooms[0].left + RADIUS - RADIUSANT;\n    var top = rooms[0].top + RADIUS - RADIUSANT;\n\n    for (var i = 0; i < data.ants; i++) {\n      var ant = new fabric__WEBPACK_IMPORTED_MODULE_0__[\"Circle\"]({\n        radius: RADIUSANT,\n        fill: COLORANT,\n        left: left,\n        top: top,\n        hasControls: false,\n        evented: false\n      });\n      ants[i + 1] = ant;\n      antPrevRoom[i + 1] = rooms[0];\n      canvas.add(ant);\n    }\n\n    for (var i = 0; i <= output.Steps.length; i++) {\n      animated.push(false);\n    }\n\n    setTimeout(animate(0), 1000);\n  }\n}\n\nfunction animate(i) {\n  var len = 0;\n\n  for (var o in output.Steps[i]) {\n    len++;\n  }\n\n  var curr = 0;\n\n  for (var _i = 0, _Object$entries = Object.entries(output.Steps[i]); _i < _Object$entries.length; _i++) {\n    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),\n        ant = _Object$entries$_i[0],\n        room = _Object$entries$_i[1];\n\n    curr++;\n    animateAnt(ant, room, i, curr == len);\n  }\n}\n\nfunction animateAnt(ant, room, i, last) {\n  var fromX = antPrevRoom[ant].left + RADIUS - RADIUSANT;\n  var fromY = antPrevRoom[ant].top + RADIUS - RADIUSANT;\n  var toX = rooms[room].left + RADIUS - RADIUSANT;\n  var toY = rooms[room].top + RADIUS - RADIUSANT;\n  var dx = (toX - fromX) / end;\n  var dy = (toY - fromY) / end;\n  fabric__WEBPACK_IMPORTED_MODULE_0__[\"util\"].animate({\n    startValue: 0,\n    endValue: end,\n    duration: 1000,\n    onChange: function onChange(value) {\n      var x = dx * value;\n      var y = dy * value;\n      ants[ant].set({\n        left: fromX + x,\n        top: fromY + y\n      });\n\n      if (last) {\n        ants[ant].setCoords();\n        canvas.renderAll();\n      }\n    },\n    onComplete: function onComplete() {\n      if (output.Steps[i] && !animated[i]) {\n        for (var _i2 = 0, _Object$entries2 = Object.entries(output.Steps[i]); _i2 < _Object$entries2.length; _i2++) {\n          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),\n              _ant = _Object$entries2$_i[0],\n              _room = _Object$entries2$_i[1];\n\n          antPrevRoom[_ant] = rooms[_room];\n        }\n\n        animated[i] = true;\n\n        if (output.Steps[i + 1]) {\n          setTimeout(animate(i + 1), 1000);\n        } else {\n          completed();\n        }\n      }\n    }\n  });\n}\n\nfunction lockCanvas() {\n  for (var id in rooms) {\n    rooms[id].hasControls = false;\n    rooms[id].evented = false;\n  }\n\n  for (var link in connections) {\n    connections[link].hasControls = false;\n    connections[link].evented = false;\n  }\n}\n\nfunction completed() {\n  animation = false;\n  unlockCanvas();\n\n  for (var i = 0; i < data.ants; i++) {\n    canvas.remove(ants[i + 1]);\n  }\n\n  ants = {};\n  antPrevRoom = {};\n  animated = [];\n}\n\nfunction unlockCanvas() {\n  for (var id in rooms) {\n    rooms[id].evented = true;\n  }\n\n  for (var link in connections) {\n    connections[link].evented = true;\n  }\n}\n\n//# sourceURL=webpack:///./script.js?");

/***/ }),

/***/ "./styles/style.css":
/*!**************************!*\
  !*** ./styles/style.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  \n\n//# sourceURL=webpack:///./styles/style.css?");

/***/ }),

/***/ "./styles/style.scss":
/*!***************************!*\
  !*** ./styles/style.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./styles/style.scss?");

/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi @babel/polyfill ./script.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! @babel/polyfill */\"../node_modules/@babel/polyfill/lib/index.js\");\nmodule.exports = __webpack_require__(/*! ./script.js */\"./script.js\");\n\n\n//# sourceURL=webpack:///multi_@babel/polyfill_./script.js?");

/***/ }),

/***/ 1:
/*!***********************!*\
  !*** jsdom (ignored) ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///jsdom_(ignored)?");

/***/ }),

/***/ 2:
/*!********************************************************!*\
  !*** jsdom/lib/jsdom/living/generated/utils (ignored) ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///jsdom/lib/jsdom/living/generated/utils_(ignored)?");

/***/ }),

/***/ 3:
/*!***************************************!*\
  !*** jsdom/lib/jsdom/utils (ignored) ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///jsdom/lib/jsdom/utils_(ignored)?");

/***/ })

/******/ });