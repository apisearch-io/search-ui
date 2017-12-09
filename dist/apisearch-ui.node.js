(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["apisearchUI"] = factory();
	else
		root["apisearchUI"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return rerender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/** Virtual DOM Node */
function VNode() {}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
var options = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	//syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	//vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
};

var stack = [];

var EMPTY_CHILDREN = [];

/** JSX/hyperscript reviver
*	Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *	@see http://jasonformat.com/wtf-is-jsx
 *	@public
 */
function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	// if a "vnode hook" is defined, pass every created VNode to it
	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

/** Copy own-properties from `props` onto `obj`.
 *	@returns obj
 *	@private
 */
function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

/** Call a function asynchronously, as soon as possible.
 *	@param {Function} callback
 */
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

function cloneElement(vnode, props) {
	return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

/** Check if two nodes are equivalent.
 *	@param {Element} node
 *	@param {VNode} vnode
 *	@private
 */
function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

/** Check if an Element has a given normalized name.
*	@param {Element} node
*	@param {String} nodeName
 */
function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {
		// ignore
	} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, value == null ? '' : value);
		if (value == null || value === false) node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!diffLevel++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		// hydration is indicated by the existing element to be diffed not having a prop cache
		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	// append the element if its a new parent
	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	// diffLevel being reduced to 0 means we're exiting the diff
	if (! --diffLevel) {
		hydrating = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts();
	}

	return ret;
}

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	// empty values (null, undefined, booleans) render as empty Text nodes
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	// Fast case: Strings & Numbers create/update Text nodes.
	if (typeof vnode === 'string' || typeof vnode === 'number') {

		// update if it's already a Text node:
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	// If the VNode represents a Component, perform a component diff:
	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	// If there's no existing element or it's the wrong type, create a new one:
	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			// move children into the replacement node
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			} // if the previous Element was mounted into the DOM, replace it inline
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			// recycle the old element (skips non-Element node types)
			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes(out, vnode.attributes, props);

	// restore previous SVG mode: (in case we're exiting an SVG namespace)
	isSvgMode = prevSvgMode;

	return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	// Build up a map of keyed children and an Array of unkeyed children:
	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			// attempt to find a node based on key matching
			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	// remove unused keyed children:
	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	// remove orphaned unkeyed children:
	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		unmountComponent(component);
	} else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
	var name;

	// remove attributes no longer present on the vnode by setting them to undefined
	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	// add new & update changed attributes
	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

/** Reclaim a component for later re-use by the recycler. */
function collectComponent(component) {
	var name = component.constructor.name;
	(components[name] || (components[name] = [])).push(component);
}

/** Create a component. Normalizes differences between PFC's and classful Components. */
function createComponent(Ctor, props, context) {
	var list = components[Ctor.name],
	    inst;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props, state, context) {
	return this.constructor(props, context);
}

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (!component.base || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (opts !== 0) {
		if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    rendered,
	    inst,
	    cbase;

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {
			// set up high order component link

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	if (component._renderCallbacks != null) {
		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}
	}

	if (!diffLevel && !isChild) flushMounts();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		collectComponent(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
function Component(props, context) {
	this._dirty = true;

	/** @public
  *	@type {object}
  */
	this.context = context;

	/** @public
  *	@type {object}
  */
	this.props = props;

	/** @public
  *	@type {object}
  */
	this.state = this.state || {};
}

extend(Component.prototype, {

	/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */

	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  *	@param {function} callback	A function to be called once component state is updated
  */
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = extend({}, s);
		extend(s, typeof state === 'function' ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		enqueueRender(this);
	},


	/** Immediately perform a synchronous re-render of the component.
  *	@param {function} callback		A function to be called after component is re-rendered.
  *	@private
  */
	forceUpdate: function forceUpdate(callback) {
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		renderComponent(this, 2);
	},


	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
	render: function render() {}
});

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};


/* harmony default export */ __webpack_exports__["default"] = (preact);
//# sourceMappingURL=preact.esm.js.map


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Apisearch Dependency Injection Container
 */
var Container = function () {
    /**
     * Constructor.
     */
    function Container() {
        _classCallCheck(this, Container);

        this.services = {};
    }

    /**
     * Get service
     */


    _createClass(Container, [{
        key: "get",
        value: function get(id) {
            if (this.services[id]) {
                return this.services[id];
            }

            throw new Error("Service with id (" + id + ") is not registered.");
        }

        /**
         * Register service
         */

    }, {
        key: "register",
        value: function register(id, serviceCallback) {
            var currentServiceIds = Object.keys(this.services);
            var serviceExists = currentServiceIds.some(function (serviceId) {
                return id === serviceId;
            });

            if (false === serviceExists) {
                this.services = _extends({}, this.services, _defineProperty({}, id, serviceCallback()));
            }
        }
    }]);

    return Container;
}();

exports.default = new Container();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Service constants
 */
var APISEARCH_CLIENT = exports.APISEARCH_CLIENT = 'apisearch_client';
var APISEARCH_STORE = exports.APISEARCH_STORE = 'apisearch_store';
var APISEARCH_DISPATCHER = exports.APISEARCH_DISPATCHER = 'apisearch_dispatcher';
var APISEARCH_UI = exports.APISEARCH_UI = 'apisearch_ui';

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _hogan = __webpack_require__(26);

var _hogan2 = _interopRequireDefault(_hogan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @jsx h */


var Template = function (_Component) {
    _inherits(Template, _Component);

    function Template() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Template);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Template.__proto__ || Object.getPrototypeOf(Template)).call.apply(_ref, [this].concat(args))), _this), _this.renderTemplate = function (template, data) {
            /**
             * Compile template using hogan.js
             */
            var compiledTemplate = _hogan2.default.compile(template);
            var output = compiledTemplate.render(data);

            return {
                __html: output
            };
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Template, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                template = _props.template,
                data = _props.data,
                className = _props.className;


            return template ? (0, _preact.h)('div', {
                className: className,
                dangerouslySetInnerHTML: this.renderTemplate(template, data)
            }) : null;
        }
    }]);

    return Template;
}(_preact.Component);

exports.default = Template;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependenices
 */

var isObject = __webpack_require__(20);
var clone = __webpack_require__(22);
var typeOf = __webpack_require__(8);
var forOwn = __webpack_require__(25);

/**
 * Recursively clone native types.
 */

function cloneDeep(val, instanceClone) {
  switch (typeOf(val)) {
    case 'object':
      return cloneObjectDeep(val, instanceClone);
    case 'array':
      return cloneArrayDeep(val, instanceClone);
    default: {
      return clone(val);
    }
  }
}

function cloneObjectDeep(obj, instanceClone) {
  if (isObject(obj)) {
    var res = {};
    forOwn(obj, function(obj, key) {
      this[key] = cloneDeep(obj, instanceClone);
    }, res);
    return res;
  } else if (instanceClone) {
    return instanceClone(obj);
  } else {
    return obj;
  }
}

function cloneArrayDeep(arr, instanceClone) {
  var len = arr.length, res = [];
  var i = -1;
  while (++i < len) {
    res[i] = cloneDeep(arr[i], instanceClone);
  }
  return res;
}

/**
 * Expose `cloneDeep`
 */

module.exports = cloneDeep;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



module.exports = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null
    && (typeof val === 'object' || typeof val === 'function');
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * for-in <https://github.com/jonschlinkert/for-in>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function forIn(obj, fn, thisArg) {
  for (var key in obj) {
    if (fn.call(thisArg, obj[key], key, obj) === false) {
      break;
    }
  }
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isBuffer = __webpack_require__(24);
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);

var _bootstrap = __webpack_require__(11);

var _container = __webpack_require__(1);

var _container2 = _interopRequireDefault(_container);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Apisearch Entry point
 */

/**
 * Bootstrapping
 *
 * @param appId
 * @param apiKey
 * @param options
 *
 * @returns {ApisearchUI}
 */
/**
 * @jsx h
 */

/**
 * Styles
 */
module.exports = function (_ref) {
  var appId = _ref.appId,
      apiKey = _ref.apiKey,
      options = _ref.options;

  /**
   * Build environment Id
   */
  var environmentId = "env_" + Math.ceil(Math.random() * (9999999 - 1) + 1);

  /**
   * Bootstrapping ApisearchUI application
   */
  (0, _bootstrap.bootstrap)({
    environmentId: environmentId,
    appId: appId,
    apiKey: apiKey,
    options: options
  });

  /**
   * Register handleActions method (store reducer)
   * into the event dispatcher
   */
  var apisearchUI = _container2.default.get(_constants.APISEARCH_UI + "__" + environmentId);
  var dispatcher = _container2.default.get(_constants.APISEARCH_DISPATCHER + "__" + environmentId);
  dispatcher.register(apisearchUI.store.handleActions.bind(apisearchUI.store));

  /**
   * Return ApisearchUI instance
   */
  return apisearchUI;
};

/**
 * Locals
 */

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bootstrap = bootstrap;

var _flux = __webpack_require__(12);

var _ApisearchUI = __webpack_require__(15);

var _ApisearchUI2 = _interopRequireDefault(_ApisearchUI);

var _apisearch = __webpack_require__(49);

var _apisearch2 = _interopRequireDefault(_apisearch);

var _Store = __webpack_require__(50);

var _Store2 = _interopRequireDefault(_Store);

var _container = __webpack_require__(1);

var _container2 = _interopRequireDefault(_container);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Bootstrap application
 */
function bootstrap(_ref) {
    var environmentId = _ref.environmentId,
        appId = _ref.appId,
        apiKey = _ref.apiKey,
        options = _ref.options;

    var clientId = _constants.APISEARCH_CLIENT + '__' + appId + '_' + apiKey;
    var storeId = _constants.APISEARCH_STORE + '__' + environmentId;
    var dispatcherId = _constants.APISEARCH_DISPATCHER + '__' + environmentId;
    var asuiId = _constants.APISEARCH_UI + '__' + environmentId;

    /**
     * Register Apisearch client
     */
    _container2.default.register(clientId, function () {
        return (0, _apisearch2.default)({
            appId: appId,
            apiKey: apiKey,
            options: options
        });
    });

    /**
     * Register apisearch store
     */
    _container2.default.register(storeId, function () {
        return new _Store2.default(_container2.default.get(clientId));
    });

    /**
     * Register an event dispatcher
     */
    _container2.default.register(dispatcherId, function () {
        return new _flux.Dispatcher();
    });

    /**
     * Apisearch UI Instance
     */
    _container2.default.register(asuiId, function () {
        return new _ApisearchUI2.default(environmentId, _container2.default.get(clientId), _container2.default.get(storeId));
    });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = __webpack_require__(13);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * 
 * @preventMunge
 */



exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var invariant = __webpack_require__(14);

var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *         case 'city-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */

  Dispatcher.prototype.register = function register(callback) {
    var id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   */

  Dispatcher.prototype.unregister = function unregister(id) {
    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
    delete this._callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */

  Dispatcher.prototype.waitFor = function waitFor(ids) {
    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this._isPending[id]) {
        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
        continue;
      }
      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
      this._invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   */

  Dispatcher.prototype.dispatch = function dispatch(payload) {
    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
    this._startDispatching(payload);
    try {
      for (var id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   */

  Dispatcher.prototype.isDispatching = function isDispatching() {
    return this._isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */

  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
    for (var id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
    delete this._pendingPayload;
    this._isDispatching = false;
  };

  return Dispatcher;
})();

module.exports = Dispatcher;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _apisearchActions = __webpack_require__(16);

var _WidgetFactory = __webpack_require__(17);

var _WidgetFactory2 = _interopRequireDefault(_WidgetFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ApisearchUI class
 */
var ApisearchUI = function () {
    /**
     * Constructor.
     */
    function ApisearchUI(environmentId, client, store) {
        _classCallCheck(this, ApisearchUI);

        /**
         * Environment Id
         */
        this.environmentId = environmentId;

        /**
         * UI related properties
         */
        this.client = client;
        this.widgets = _WidgetFactory2.default;
        this.activeWidgets = [];

        /**
         * Store related properties
         */
        this.store = store;
    }

    /**
     * Initialize components
     */


    _createClass(ApisearchUI, [{
        key: "init",
        value: function init() {
            var _this = this;

            /**
             * 1.- Register all events on the store
             */
            this.store.on('render', function () {
                return _this.render();
            });

            /**
             * 2.- Trigger the initial render: (Mount the components)
             *     To let components setup its configuration on componentWillMount()
             */
            this.render();

            /**
             * 3.- Dispatch the initial data request
             *     With all widget previous initial configurations
             */
            (0, _apisearchActions.initialDataFetchAction)(this.environmentId, this.store.currentQuery, this.client);
        }

        /**
         * Add new widget
         */

    }, {
        key: "addWidget",
        value: function addWidget(widget) {
            this.activeWidgets = [].concat(_toConsumableArray(this.activeWidgets), [widget]);
            return this;
        }

        /**
         * Add widgets in bulk mode
         */

    }, {
        key: "addWidgets",
        value: function addWidgets() {
            var _this2 = this;

            for (var _len = arguments.length, widgets = Array(_len), _key = 0; _key < _len; _key++) {
                widgets[_key] = arguments[_key];
            }

            widgets.map(function (widget) {
                return _this2.addWidget(widget);
            });
            return this;
        }

        /**
         * Render.
         *
         * Loop all active widgets
         * Hydrate them with new props
         * And render them.
         */

    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            this.activeWidgets.map(function (widget) {
                var hydratedWidget = hydrateWidget(_this3.environmentId, _this3.store, _this3.client, widget);
                var targetNode = document.querySelector(widget.attributes.target);

                if (null === targetNode) {
                    throw new Error("Widget (" + hydratedWidget.nodeName.name + ") must have a valid DOM target");
                }

                (0, _preact.render)(hydratedWidget, targetNode, targetNode.lastChild);
            });
        }
    }]);

    return ApisearchUI;
}();

function hydrateWidget(environmentId, currentStore, client, widget) {
    /**
     * Pass ApisearchClient, current Query, and data received
     * as a component attributes. There will be accessible
     * on component props.
     */
    widget.attributes.environmentId = environmentId;
    widget.attributes.dirty = currentStore.dirty;
    widget.attributes.data = currentStore.data;
    widget.attributes.currentQuery = currentStore.currentQuery;
    widget.attributes.client = client;

    return widget;
}

exports.default = ApisearchUI;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initialDataFetchAction = initialDataFetchAction;

var _container = __webpack_require__(1);

var _container2 = _interopRequireDefault(_container);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Initial data fetching action
 *
 * This action is triggered on the first time ApisearchUI is initialized:
 *   @param environmentId -> the environment identifier of the ApisearchUI instance
 *   @param initialQuery  -> initial application query
 *   @param client        -> apisearch client to trigger a search
 *
 * Finally dispatches an event with the search result and
 * the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        result,
 *        updatedQuery
 *     }
 *   }}
 */
function initialDataFetchAction(environmentId, initialQuery, client) {
    client.search(initialQuery, function (initialResult) {
        var dispatcher = _container2.default.get(_constants.APISEARCH_DISPATCHER + '__' + environmentId);

        dispatcher.dispatch({
            type: 'RENDER_INITIAL_DATA',
            payload: {
                initialResult: initialResult,
                initialQuery: initialQuery
            }
        });
    });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @jsx h
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

/**
 * Vendors
 */


/**
 * Locals
 */


var _preact = __webpack_require__(0);

var _SimpleSearchComponent = __webpack_require__(18);

var _SimpleSearchComponent2 = _interopRequireDefault(_SimpleSearchComponent);

var _SuggestedSearchComponent = __webpack_require__(29);

var _SuggestedSearchComponent2 = _interopRequireDefault(_SuggestedSearchComponent);

var _SortByComponent = __webpack_require__(32);

var _SortByComponent2 = _interopRequireDefault(_SortByComponent);

var _MultipleFilterComponent = __webpack_require__(34);

var _MultipleFilterComponent2 = _interopRequireDefault(_MultipleFilterComponent);

var _ResultComponent = __webpack_require__(39);

var _ResultComponent2 = _interopRequireDefault(_ResultComponent);

var _InformationComponent = __webpack_require__(42);

var _InformationComponent2 = _interopRequireDefault(_InformationComponent);

var _ClearFiltersComponent = __webpack_require__(43);

var _ClearFiltersComponent2 = _interopRequireDefault(_ClearFiltersComponent);

var _PaginationComponent = __webpack_require__(45);

var _PaginationComponent2 = _interopRequireDefault(_PaginationComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Widgets factory class
 *
 * @info
 *   The className object merge is because react does not
 *   merge the defaultProps deep objects with the custom
 *   props object passed to the component.
 *     @see https://github.com/facebook/react/issues/2568
 *     @see https://stackoverflow.com/questions/40428847/react-component-defaultprops-objects-are-overridden-not-merged
 */
var WidgetFactory = function () {
    function WidgetFactory() {
        _classCallCheck(this, WidgetFactory);
    }

    _createClass(WidgetFactory, null, [{
        key: "simpleSearch",


        /**
         * Simple search input
         */
        value: function simpleSearch(_ref) {
            var target = _ref.target,
                placeholder = _ref.placeholder,
                startSearchOn = _ref.startSearchOn,
                autofocus = _ref.autofocus,
                classNames = _ref.classNames,
                template = _ref.template;

            return (0, _preact.h)(_SimpleSearchComponent2.default, {
                target: target,
                placeholder: placeholder,
                autofocus: autofocus,
                startSearchOn: startSearchOn,
                classNames: _extends({}, _SimpleSearchComponent2.default.defaultProps.classNames, classNames),
                template: _extends({}, _SimpleSearchComponent2.default.defaultProps.template, template)
            });
        }
    }, {
        key: "suggestedSearch",


        /**
         * Suggested Search input
         */
        value: function suggestedSearch(_ref2) {
            var target = _ref2.target,
                placeholder = _ref2.placeholder,
                autofocus = _ref2.autofocus,
                startSearchOn = _ref2.startSearchOn,
                classNames = _ref2.classNames,
                template = _ref2.template;

            return (0, _preact.h)(_SuggestedSearchComponent2.default, {
                target: target,
                placeholder: placeholder,
                autofocus: autofocus,
                startSearchOn: startSearchOn,
                classNames: _extends({}, _SuggestedSearchComponent2.default.defaultProps.classNames, classNames),
                template: template
            });
        }

        /**
         * Sort By
         */

    }, {
        key: "sortBy",
        value: function sortBy(_ref3) {
            var target = _ref3.target,
                classNames = _ref3.classNames,
                options = _ref3.options;

            return (0, _preact.h)(_SortByComponent2.default, {
                target: target,
                classNames: _extends({}, _SortByComponent2.default.defaultProps.classNames, classNames),
                options: options
            });
        }

        /**
         * Multiple filter
         */

    }, {
        key: "multipleFilter",
        value: function multipleFilter(_ref4) {
            var target = _ref4.target,
                name = _ref4.name,
                filterField = _ref4.filterField,
                aggregationField = _ref4.aggregationField,
                applicationType = _ref4.applicationType,
                fetchLimit = _ref4.fetchLimit,
                viewLimit = _ref4.viewLimit,
                sortBy = _ref4.sortBy,
                classNames = _ref4.classNames,
                template = _ref4.template,
                formatData = _ref4.formatData;

            return (0, _preact.h)(_MultipleFilterComponent2.default, {
                target: target,
                name: name,
                filterField: filterField,
                aggregationField: aggregationField,
                applicationType: applicationType,
                fetchLimit: fetchLimit,
                viewLimit: viewLimit,
                sortBy: sortBy,
                classNames: _extends({}, _MultipleFilterComponent2.default.defaultProps.classNames, classNames),
                template: _extends({}, _MultipleFilterComponent2.default.defaultProps.template, template),
                formatData: formatData
            });
        }

        /**
         * Clear filters button
         */

    }, {
        key: "clearFilters",
        value: function clearFilters(_ref5) {
            var target = _ref5.target,
                classNames = _ref5.classNames,
                template = _ref5.template;

            return (0, _preact.h)(_ClearFiltersComponent2.default, {
                target: target,
                classNames: _extends({}, _InformationComponent2.default.defaultProps.classNames, classNames),
                template: template
            });
        }

        /**
         * Search result
         */

    }, {
        key: "result",
        value: function result(_ref6) {
            var target = _ref6.target,
                itemsPerPage = _ref6.itemsPerPage,
                promote = _ref6.promote,
                exclude = _ref6.exclude,
                highlightsEnabled = _ref6.highlightsEnabled,
                classNames = _ref6.classNames,
                template = _ref6.template,
                formatData = _ref6.formatData;

            return (0, _preact.h)(_ResultComponent2.default, {
                target: target,
                itemsPerPage: itemsPerPage,
                promote: promote,
                exclude: exclude,
                highlightsEnabled: highlightsEnabled,
                classNames: _extends({}, _ResultComponent2.default.defaultProps.classNames, classNames),
                template: template,
                formatData: formatData
            });
        }

        /**
         * Search result information
         */

    }, {
        key: "information",
        value: function information(_ref7) {
            var target = _ref7.target,
                classNames = _ref7.classNames,
                template = _ref7.template,
                formatData = _ref7.formatData;

            return (0, _preact.h)(_InformationComponent2.default, {
                target: target,
                classNames: _extends({}, _InformationComponent2.default.defaultProps.classNames, classNames),
                template: template,
                formatData: formatData
            });
        }

        /**
         * Search result information
         */

    }, {
        key: "pagination",
        value: function pagination(_ref8) {
            var target = _ref8.target,
                padding = _ref8.padding,
                goFirstLast = _ref8.goFirstLast,
                classNames = _ref8.classNames,
                template = _ref8.template;

            return (0, _preact.h)(_PaginationComponent2.default, {
                target: target,
                padding: padding,
                goFirstLast: goFirstLast,
                classNames: _extends({}, _PaginationComponent2.default.defaultProps.classNames, classNames),
                template: _extends({}, _PaginationComponent2.default.defaultProps.template, template)
            });
        }
    }]);

    return WidgetFactory;
}();

exports.default = WidgetFactory;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _simpleSearchActions = __webpack_require__(19);

var _Template = __webpack_require__(3);

var _Template2 = _interopRequireDefault(_Template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @jsx h
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * SimpleSearch Component
 */
var SimpleSearchComponent = function (_Component) {
    _inherits(SimpleSearchComponent, _Component);

    function SimpleSearchComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SimpleSearchComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SimpleSearchComponent.__proto__ || Object.getPrototypeOf(SimpleSearchComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleSearch = function (e) {
            var _this$props = _this.props,
                startSearchOn = _this$props.startSearchOn,
                environmentId = _this$props.environmentId,
                currentQuery = _this$props.currentQuery,
                client = _this$props.client;

            /**
             * Search when string is bigger than {startSearchOn}
             */

            if (e.target.value.length < startSearchOn) return;

            /**
             * Dispatch input search action
             */
            (0, _simpleSearchActions.simpleSearchAction)({
                queryText: e.target.value
            }, {
                environmentId: environmentId,
                currentQuery: currentQuery,
                client: client
            });
        }, _this.clearSearch = function () {
            var _this$props2 = _this.props,
                environmentId = _this$props2.environmentId,
                currentQuery = _this$props2.currentQuery,
                client = _this$props2.client;


            (0, _simpleSearchActions.simpleSearchAction)({
                queryText: ''
            }, {
                environmentId: environmentId,
                currentQuery: currentQuery,
                client: client
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SimpleSearchComponent, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                placeholder = _props.placeholder,
                autofocus = _props.autofocus,
                _props$classNames = _props.classNames,
                containerClassName = _props$classNames.container,
                inputClassName = _props$classNames.input,
                clearSearchClassName = _props$classNames.clearSearch,
                clearSearchTemplate = _props.template.clearSearch,
                currentQueryText = _props.currentQuery.q;


            return (0, _preact.h)(
                "div",
                { className: "as-simpleSearch " + containerClassName },
                (0, _preact.h)("input", {
                    type: "text",
                    className: "as-simpleSearch__input " + inputClassName,
                    autofocus: autofocus,
                    placeholder: placeholder,
                    onInput: this.handleSearch,
                    value: currentQueryText
                }),
                currentQueryText.length !== 0 ? (0, _preact.h)(
                    "div",
                    {
                        className: "as-simpleSearch__clearSearch " + clearSearchClassName,
                        onClick: this.clearSearch
                    },
                    (0, _preact.h)(_Template2.default, { template: clearSearchTemplate })
                ) : null
            );
        }
    }]);

    return SimpleSearchComponent;
}(_preact.Component);

SimpleSearchComponent.defaultProps = {
    placeholder: '',
    autofocus: false,
    startSearchOn: 0,
    classNames: {
        container: '',
        input: '',
        clearSearch: ''
    },
    template: {
        clearSearch: 'x'
    }
};

exports.default = SimpleSearchComponent;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.simpleSearchAction = simpleSearchAction;

var _cloneDeep = __webpack_require__(4);

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _container = __webpack_require__(1);

var _container2 = _interopRequireDefault(_container);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Keyup simple search action
 *
 * This action is triggered when a text input changes
 * receives two parameters:
 *   @param queryOptions -> query given options
 *   @param appOptions   -> current application options
 *
 * Finally dispatches an event with the search result and
 * the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        result,
 *        updatedQuery
 *     }
 *   }}
 */
function simpleSearchAction(_ref, _ref2) {
    var queryText = _ref.queryText;
    var environmentId = _ref2.environmentId,
        currentQuery = _ref2.currentQuery,
        client = _ref2.client;

    var clonedQuery = (0, _cloneDeep2.default)(currentQuery);

    clonedQuery.setQueryText(queryText).setPage(1);

    var dispatcher = _container2.default.get(_constants.APISEARCH_DISPATCHER + '__' + environmentId);
    client.search(clonedQuery, function (result, error) {
        if (error) return;

        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                result: result,
                updatedQuery: clonedQuery
            }
        });
    });
} /**
   * Search actions
   */

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(21);

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * shallow-clone <https://github.com/jonschlinkert/shallow-clone>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(6);
var mixin = __webpack_require__(23);
var typeOf = __webpack_require__(8);

/**
 * Shallow copy an object, array or primitive.
 *
 * @param  {any} `val`
 * @return {any}
 */

function clone(val) {
  var type = typeOf(val);
  if (clone.hasOwnProperty(type)) {
    return clone[type](val);
  }
  return val;
}

clone.array = function cloneArray(arr) {
  return arr.slice();
};

clone.date = function cloneDate(date) {
  return new Date(+date);
};

clone.object = function cloneObject(obj) {
  if (isObject(obj)) {
    return mixin({}, obj);
  } else {
    return obj;
  }
};

clone.regexp = function cloneRegExp(re) {
  var flags = '';
  flags += re.multiline ? 'm' : '';
  flags += re.global ? 'g' : '';
  flags += re.ignorecase ? 'i' : '';
  return new RegExp(re.source, flags);
};

/**
 * Expose `clone`
 */

module.exports = clone;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(6);
var forIn = __webpack_require__(7);

function mixin(target, objects) {
  if (!isObject(target)) {
    throw new TypeError('mixin-object expects the first argument to be an object.');
  }
  var len = arguments.length, i = 0;
  while (++i < len) {
    var obj = arguments[i];
    if (isObject(obj)) {
      forIn(obj, copy, target);
    }
  }
  return target;
}

/**
 * copy properties from the source object to the
 * target object.
 *
 * @param  {*} `value`
 * @param  {String} `key`
 */

function copy(value, key) {
  this[key] = value;
}

/**
 * Expose `mixin`
 */

module.exports = mixin;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * for-own <https://github.com/jonschlinkert/for-own>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var forIn = __webpack_require__(7);
var hasOwn = Object.prototype.hasOwnProperty;

module.exports = function forOwn(obj, fn, thisArg) {
  forIn(obj, function(val, key) {
    if (hasOwn.call(obj, key)) {
      return fn.call(thisArg, obj[key], key, obj);
    }
  });
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// This file is for use with Node.js. See dist/ for browser files.

var Hogan = __webpack_require__(27);
Hogan.Template = __webpack_require__(28).Template;
Hogan.template = Hogan.Template;
module.exports = Hogan;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function (Hogan) {
  // Setup regex  assignments
  // remove whitespace according to Mustache spec
  var rIsWhitespace = /\S/,
      rQuot = /\"/g,
      rNewline =  /\n/g,
      rCr = /\r/g,
      rSlash = /\\/g,
      rLineSep = /\u2028/,
      rParagraphSep = /\u2029/;

  Hogan.tags = {
    '#': 1, '^': 2, '<': 3, '$': 4,
    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
    '{': 10, '&': 11, '_t': 12
  };

  Hogan.scan = function scan(text, delimiters) {
    var len = text.length,
        IN_TEXT = 0,
        IN_TAG_TYPE = 1,
        IN_TAG = 2,
        state = IN_TEXT,
        tagType = null,
        tag = null,
        buf = '',
        tokens = [],
        seenTag = false,
        i = 0,
        lineStart = 0,
        otag = '{{',
        ctag = '}}';

    function addBuf() {
      if (buf.length > 0) {
        tokens.push({tag: '_t', text: new String(buf)});
        buf = '';
      }
    }

    function lineIsWhitespace() {
      var isAllWhitespace = true;
      for (var j = lineStart; j < tokens.length; j++) {
        isAllWhitespace =
          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
        if (!isAllWhitespace) {
          return false;
        }
      }

      return isAllWhitespace;
    }

    function filterLine(haveSeenTag, noNewLine) {
      addBuf();

      if (haveSeenTag && lineIsWhitespace()) {
        for (var j = lineStart, next; j < tokens.length; j++) {
          if (tokens[j].text) {
            if ((next = tokens[j+1]) && next.tag == '>') {
              // set indent to token value
              next.indent = tokens[j].text.toString()
            }
            tokens.splice(j, 1);
          }
        }
      } else if (!noNewLine) {
        tokens.push({tag:'\n'});
      }

      seenTag = false;
      lineStart = tokens.length;
    }

    function changeDelimiters(text, index) {
      var close = '=' + ctag,
          closeIndex = text.indexOf(close, index),
          delimiters = trim(
            text.substring(text.indexOf('=', index) + 1, closeIndex)
          ).split(' ');

      otag = delimiters[0];
      ctag = delimiters[delimiters.length - 1];

      return closeIndex + close.length - 1;
    }

    if (delimiters) {
      delimiters = delimiters.split(' ');
      otag = delimiters[0];
      ctag = delimiters[1];
    }

    for (i = 0; i < len; i++) {
      if (state == IN_TEXT) {
        if (tagChange(otag, text, i)) {
          --i;
          addBuf();
          state = IN_TAG_TYPE;
        } else {
          if (text.charAt(i) == '\n') {
            filterLine(seenTag);
          } else {
            buf += text.charAt(i);
          }
        }
      } else if (state == IN_TAG_TYPE) {
        i += otag.length - 1;
        tag = Hogan.tags[text.charAt(i + 1)];
        tagType = tag ? text.charAt(i + 1) : '_v';
        if (tagType == '=') {
          i = changeDelimiters(text, i);
          state = IN_TEXT;
        } else {
          if (tag) {
            i++;
          }
          state = IN_TAG;
        }
        seenTag = i;
      } else {
        if (tagChange(ctag, text, i)) {
          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
          buf = '';
          i += ctag.length - 1;
          state = IN_TEXT;
          if (tagType == '{') {
            if (ctag == '}}') {
              i++;
            } else {
              cleanTripleStache(tokens[tokens.length - 1]);
            }
          }
        } else {
          buf += text.charAt(i);
        }
      }
    }

    filterLine(seenTag, true);

    return tokens;
  }

  function cleanTripleStache(token) {
    if (token.n.substr(token.n.length - 1) === '}') {
      token.n = token.n.substring(0, token.n.length - 1);
    }
  }

  function trim(s) {
    if (s.trim) {
      return s.trim();
    }

    return s.replace(/^\s*|\s*$/g, '');
  }

  function tagChange(tag, text, index) {
    if (text.charAt(index) != tag.charAt(0)) {
      return false;
    }

    for (var i = 1, l = tag.length; i < l; i++) {
      if (text.charAt(index + i) != tag.charAt(i)) {
        return false;
      }
    }

    return true;
  }

  // the tags allowed inside super templates
  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

  function buildTree(tokens, kind, stack, customTags) {
    var instructions = [],
        opener = null,
        tail = null,
        token = null;

    tail = stack[stack.length - 1];

    while (tokens.length > 0) {
      token = tokens.shift();

      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
        throw new Error('Illegal content in < super tag.');
      }

      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
        stack.push(token);
        token.nodes = buildTree(tokens, token.tag, stack, customTags);
      } else if (token.tag == '/') {
        if (stack.length === 0) {
          throw new Error('Closing tag without opener: /' + token.n);
        }
        opener = stack.pop();
        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
        }
        opener.end = token.i;
        return instructions;
      } else if (token.tag == '\n') {
        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
      }

      instructions.push(token);
    }

    if (stack.length > 0) {
      throw new Error('missing closing tag: ' + stack.pop().n);
    }

    return instructions;
  }

  function isOpener(token, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].o == token.n) {
        token.tag = '#';
        return true;
      }
    }
  }

  function isCloser(close, open, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].c == close && tags[i].o == open) {
        return true;
      }
    }
  }

  function stringifySubstitutions(obj) {
    var items = [];
    for (var key in obj) {
      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
    }
    return "{ " + items.join(",") + " }";
  }

  function stringifyPartials(codeObj) {
    var partials = [];
    for (var key in codeObj.partials) {
      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
    }
    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
  }

  Hogan.stringify = function(codeObj, text, options) {
    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
  }

  var serialNo = 0;
  Hogan.generate = function(tree, text, options) {
    serialNo = 0;
    var context = { code: '', subs: {}, partials: {} };
    Hogan.walk(tree, context);

    if (options.asString) {
      return this.stringify(context, text, options);
    }

    return this.makeTemplate(context, text, options);
  }

  Hogan.wrapMain = function(code) {
    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
  }

  Hogan.template = Hogan.Template;

  Hogan.makeTemplate = function(codeObj, text, options) {
    var template = this.makePartials(codeObj);
    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
    return new this.template(template, text, this, options);
  }

  Hogan.makePartials = function(codeObj) {
    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
    for (key in template.partials) {
      template.partials[key] = this.makePartials(template.partials[key]);
    }
    for (key in codeObj.subs) {
      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
    }
    return template;
  }

  function esc(s) {
    return s.replace(rSlash, '\\\\')
            .replace(rQuot, '\\\"')
            .replace(rNewline, '\\n')
            .replace(rCr, '\\r')
            .replace(rLineSep, '\\u2028')
            .replace(rParagraphSep, '\\u2029');
  }

  function chooseMethod(s) {
    return (~s.indexOf('.')) ? 'd' : 'f';
  }

  function createPartial(node, context) {
    var prefix = "<" + (context.prefix || "");
    var sym = prefix + node.n + serialNo++;
    context.partials[sym] = {name: node.n, partials: {}};
    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
    return sym;
  }

  Hogan.codegen = {
    '#': function(node, context) {
      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
                      't.rs(c,p,' + 'function(c,p,t){';
      Hogan.walk(node.nodes, context);
      context.code += '});c.pop();}';
    },

    '^': function(node, context) {
      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
      Hogan.walk(node.nodes, context);
      context.code += '};';
    },

    '>': createPartial,
    '<': function(node, context) {
      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
      Hogan.walk(node.nodes, ctx);
      var template = context.partials[createPartial(node, context)];
      template.subs = ctx.subs;
      template.partials = ctx.partials;
    },

    '$': function(node, context) {
      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
      Hogan.walk(node.nodes, ctx);
      context.subs[node.n] = ctx.code;
      if (!context.inPartial) {
        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
      }
    },

    '\n': function(node, context) {
      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
    },

    '_v': function(node, context) {
      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
    },

    '_t': function(node, context) {
      context.code += write('"' + esc(node.text) + '"');
    },

    '{': tripleStache,

    '&': tripleStache
  }

  function tripleStache(node, context) {
    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
  }

  function write(s) {
    return 't.b(' + s + ');';
  }

  Hogan.walk = function(nodelist, context) {
    var func;
    for (var i = 0, l = nodelist.length; i < l; i++) {
      func = Hogan.codegen[nodelist[i].tag];
      func && func(nodelist[i], context);
    }
    return context;
  }

  Hogan.parse = function(tokens, text, options) {
    options = options || {};
    return buildTree(tokens, '', [], options.sectionTags || []);
  }

  Hogan.cache = {};

  Hogan.cacheKey = function(text, options) {
    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
  }

  Hogan.compile = function(text, options) {
    options = options || {};
    var key = Hogan.cacheKey(text, options);
    var template = this.cache[key];

    if (template) {
      var partials = template.partials;
      for (var name in partials) {
        delete partials[name].instance;
      }
      return template;
    }

    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
    return this.cache[key] = template;
  }
})( true ? exports : Hogan);


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var Hogan = {};

(function (Hogan) {
  Hogan.Template = function (codeObj, text, compiler, options) {
    codeObj = codeObj || {};
    this.r = codeObj.code || this.r;
    this.c = compiler;
    this.options = options || {};
    this.text = text || '';
    this.partials = codeObj.partials || {};
    this.subs = codeObj.subs || {};
    this.buf = '';
  }

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    // triple stache
    t: coerceToString,

    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },

    // render internal -- a hook for overrides that catches partials too
    ri: function (context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // ensurePartial
    ep: function(symbol, partials) {
      var partial = this.partials[symbol];

      // check to see that if we've instantiated this partial before
      var template = partials[partial.name];
      if (partial.instance && partial.base == template) {
        return partial.instance;
      }

      if (typeof template == 'string') {
        if (!this.c) {
          throw new Error("No compiler available.");
        }
        template = this.c.compile(template, this.options);
      }

      if (!template) {
        return null;
      }

      // We use this to check whether the partials dictionary has changed
      this.partials[symbol].base = template;

      if (partial.subs) {
        // Make sure we consider parent template now
        if (!partials.stackText) partials.stackText = {};
        for (key in partial.subs) {
          if (!partials.stackText[key]) {
            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
          }
        }
        template = createSpecializedPartial(template, partial.subs, partial.partials,
          this.stackSubs, this.stackPartials, partials.stackText);
      }
      this.partials[symbol].instance = template;

      return template;
    },

    // tries to find a partial in the current scope and render it
    rp: function(symbol, context, partials, indent) {
      var partial = this.ep(symbol, partials);
      if (!partial) {
        return '';
      }

      return partial.ri(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var tail = context[context.length - 1];

      if (!isArray(tail)) {
        section(context, partials, this);
        return;
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        section(context, partials, this);
        context.pop();
      }
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ms(val, ctx, partials, inverted, start, end, tags);
      }

      pass = !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {
      var found,
          names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          doModelGet = this.options.modelGet,
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        val = ctx[ctx.length - 1];
      } else {
        for (var i = 1; i < names.length; i++) {
          found = findInScope(names[i], val, doModelGet);
          if (found !== undefined) {
            cx = val;
            val = found;
          } else {
            val = '';
          }
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.mv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false,
          doModelGet = this.options.modelGet;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        val = findInScope(key, v, doModelGet);
        if (val !== undefined) {
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.mv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ls: function(func, cx, partials, text, tags) {
      var oldTags = this.options.delimiters;

      this.options.delimiters = tags;
      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
      this.options.delimiters = oldTags;

      return false;
    },

    // compile text
    ct: function(text, cx, partials) {
      if (this.options.disableLambda) {
        throw new Error('Lambda features disabled.');
      }
      return this.c.compile(text, this.options).render(cx, partials);
    },

    // template result buffering
    b: function(s) { this.buf += s; },

    fl: function() { var r = this.buf; this.buf = ''; return r; },

    // method replace section
    ms: function(func, ctx, partials, inverted, start, end, tags) {
      var textSource,
          cx = ctx[ctx.length - 1],
          result = func.call(cx);

      if (typeof result == 'function') {
        if (inverted) {
          return true;
        } else {
          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
        }
      }

      return result;
    },

    // method replace variable
    mv: function(func, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = func.call(cx);

      if (typeof result == 'function') {
        return this.ct(coerceToString(result.call(cx)), cx, partials);
      }

      return result;
    },

    sub: function(name, context, partials, indent) {
      var f = this.subs[name];
      if (f) {
        this.activeSub = name;
        f(context, partials, this, indent);
        this.activeSub = false;
      }
    }

  };

  //Find a key in an object
  function findInScope(key, scope, doModelGet) {
    var val;

    if (scope && typeof scope == 'object') {

      if (scope[key] !== undefined) {
        val = scope[key];

      // try lookup with get for backbone or similar model data
      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
        val = scope.get(key);
      }
    }

    return val;
  }

  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
    function PartialTemplate() {};
    PartialTemplate.prototype = instance;
    function Substitutions() {};
    Substitutions.prototype = instance.subs;
    var key;
    var partial = new PartialTemplate();
    partial.subs = new Substitutions();
    partial.subsText = {};  //hehe. substext.
    partial.buf = '';

    stackSubs = stackSubs || {};
    partial.stackSubs = stackSubs;
    partial.subsText = stackText;
    for (key in subs) {
      if (!stackSubs[key]) stackSubs[key] = subs[key];
    }
    for (key in stackSubs) {
      partial.subs[key] = stackSubs[key];
    }

    stackPartials = stackPartials || {};
    partial.stackPartials = stackPartials;
    for (key in partials) {
      if (!stackPartials[key]) stackPartials[key] = partials[key];
    }
    for (key in stackPartials) {
      partial.partials[key] = stackPartials[key];
    }

    return partial;
  }

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos = /\'/g,
      rQuot = /\"/g,
      hChars = /[&<>\"\']/;

  function coerceToString(val) {
    return String((val === null || val === undefined) ? '' : val);
  }

  function hoganEscape(str) {
    str = coerceToString(str);
    return hChars.test(str) ?
      str
        .replace(rAmp, '&amp;')
        .replace(rLt, '&lt;')
        .replace(rGt, '&gt;')
        .replace(rApos, '&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

})( true ? exports : Hogan);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _helpers = __webpack_require__(30);

var _suggestedSearchActions = __webpack_require__(31);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @jsx h
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Actions
 */


/**
 * Suggested Search Component
 */
var SuggestedSearchComponent = function (_Component) {
    _inherits(SuggestedSearchComponent, _Component);

    function SuggestedSearchComponent() {
        _classCallCheck(this, SuggestedSearchComponent);

        var _this = _possibleConstructorReturn(this, (SuggestedSearchComponent.__proto__ || Object.getPrototypeOf(SuggestedSearchComponent)).call(this));

        _this.handleSearch = function (e) {
            var _this$props = _this.props,
                startSearchOn = _this$props.startSearchOn,
                environmentId = _this$props.environmentId,
                currentQuery = _this$props.currentQuery,
                client = _this$props.client;

            /**
             * Set the current query text
             */

            _this.setState({ q: e.target.value });

            /**
             * Search when string is bigger than {startSearchOn}
             */
            if (e.target.value.length < startSearchOn) {
                _this.setState({ currentSuggestions: [] });
                return;
            }

            /**
             * Dispatch suggested search action
             */
            (0, _suggestedSearchActions.suggestedSearchAction)({
                queryText: e.target.value
            }, {
                environmentId: environmentId,
                currentQuery: currentQuery,
                client: client
            });
        };

        _this.handleSuggestionsNavigation = function (e) {
            /**
             * When user hits arrow down
             */
            if (e.code === 'ArrowDown') {
                _this.setState({
                    currentSuggestions: (0, _helpers.selectNextSuggestion)(_this.state.currentSuggestions),
                    q: (0, _helpers.selectActiveSuggestion)(_this.state.currentSuggestions)
                });
            }

            /**
             * When user hits arrow up
             */
            if (e.code === 'ArrowUp') {
                /**
                 * Prevent cursor to go at the starting point of the line
                 */
                e.preventDefault();

                _this.setState({
                    currentSuggestions: (0, _helpers.selectPreviousSuggestion)(_this.state.currentSuggestions),
                    q: (0, _helpers.selectActiveSuggestion)(_this.state.currentSuggestions)
                });
            }

            /**
             * When user hits enter
             */
            if (e.code === 'Enter') {
                _this.setState({
                    q: (0, _helpers.selectActiveSuggestion)(_this.state.currentSuggestions),
                    currentSuggestions: []
                });

                var _this$props2 = _this.props,
                    environmentId = _this$props2.environmentId,
                    currentQuery = _this$props2.currentQuery,
                    client = _this$props2.client;


                (0, _suggestedSearchActions.simpleSearchAction)({
                    queryText: _this.state.q
                }, {
                    environmentId: environmentId,
                    currentQuery: currentQuery,
                    client: client
                });
            }
        };

        _this.handleSuggestionClick = function (e) {
            _this.setState({
                q: e.target.innerText,
                currentSuggestions: []
            });

            var _this$props3 = _this.props,
                environmentId = _this$props3.environmentId,
                currentQuery = _this$props3.currentQuery,
                client = _this$props3.client;


            (0, _suggestedSearchActions.simpleSearchAction)({
                queryText: e.target.innerText
            }, {
                environmentId: environmentId,
                currentQuery: currentQuery,
                client: client
            });
        };

        _this.handleSearchInputFocusedOut = function (e) {
            /**
             * It handles when a user focuses out the search input
             * If is not clicking on the suggestions box
             * The suggestions are cleared and panel closes
             */
            if (null === e.relatedTarget || false === e.relatedTarget.classList.contains('as-suggestedSearch__box')) {
                _this.setState({ currentSuggestions: [] });
            }

            return false;
        };

        _this.state = {
            q: '',
            currentSuggestions: []
        };
        return _this;
    }

    _createClass(SuggestedSearchComponent, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            var _this2 = this;

            /**
             * Check suggestions available
             * if some, prepend the current query to the other suggestions array
             * else, only append the current query to the suggestions array
             */
            var suggests = props.data && props.data.suggests ? [this.state.q].concat(_toConsumableArray(props.data.suggests)) : [this.state.q];

            /**
             * Prepare suggestions array
             */
            this.setState({
                currentSuggestions: suggests.map(function (suggest, key) {
                    return {
                        isActive: 0 === key,
                        name: suggest,
                        htmlName: (0, _helpers.highlightSuggestion)(_this2.state.q, suggest)
                    };
                })
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                dirty = _props.dirty,
                placeholder = _props.placeholder,
                autofocus = _props.autofocus,
                _props$classNames = _props.classNames,
                containerClassName = _props$classNames.container,
                inputClassName = _props$classNames.input,
                boxClassName = _props$classNames.box,
                suggestionClassName = _props$classNames.suggestion,
                activeSuggestionClassName = _props$classNames.activeSuggestion;
            var currentSuggestions = this.state.currentSuggestions;


            return (0, _preact.h)(
                'div',
                { className: 'as-suggestedSearch ' + containerClassName },
                (0, _preact.h)('input', {
                    type: 'text',
                    value: this.state.q,
                    className: 'as-suggestedSearch__input ' + inputClassName,
                    placeholder: placeholder,
                    autofocus: autofocus,

                    onInput: this.handleSearch,
                    onKeyDown: this.handleSuggestionsNavigation,
                    onBlur: this.handleSearchInputFocusedOut
                }),
                (0, _preact.h)(
                    'div',
                    {
                        tabIndex: '0',
                        className: 'as-suggestedSearch__box ' + boxClassName,
                        style: {
                            display: currentSuggestions.length > 1 && !dirty ? 'block' : 'none'
                        }
                    },
                    currentSuggestions.map(function (suggestion, key) {
                        return 0 !== key ? (0, _preact.h)('div', {
                            className: 'as-suggestedSearch__suggestion ' + (suggestionClassName + ' ') + ('' + (suggestion.isActive ? activeSuggestionClassName : '')),
                            dangerouslySetInnerHTML: {
                                __html: suggestion.htmlName
                            },
                            onClick: _this3.handleSuggestionClick
                        }) : null;
                    })
                )
            );
        }
    }]);

    return SuggestedSearchComponent;
}(_preact.Component);

SuggestedSearchComponent.defaultProps = {
    placeholder: '',
    autofocus: false,
    startSearchOn: 0,
    classNames: {
        container: '',
        input: '',
        box: '',
        suggestion: '',
        activeSuggestion: 'as-suggestedSearch__suggestion--active'
    }
};

exports.default = SuggestedSearchComponent;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.highlightSuggestion = highlightSuggestion;
exports.selectNextSuggestion = selectNextSuggestion;
exports.selectPreviousSuggestion = selectPreviousSuggestion;
exports.selectActiveSuggestion = selectActiveSuggestion;
/**
 * Set of helpers for the suggestions widget
 */

/**
 * Highlight text
 */
function highlightSuggestion(currentQueryText, suggestion) {
    var regex = new RegExp('(' + currentQueryText + ')', 'gi');
    var highlightedSuggestion = suggestion.replace(regex, "<em>$1</em>");
    var sanitizedSpaces = highlightedSuggestion.split(' ');

    return sanitizedSpaces.join('&nbsp;');
}

/**
 * Mark as active the item next
 * to the last active item
 * on a given array of items
 *
 * @example when a user press a key arrow down
 */
function selectNextSuggestion(suggestionsArray) {
    var currentActiveSuggestionKey = void 0;

    return suggestionsArray.map(function (suggestion, key) {
        /**
         * Detect current active suggestion
         */
        if (suggestion.isActive && key + 1 < suggestionsArray.length) {
            currentActiveSuggestionKey = key;
            suggestion.isActive = false;
        }

        /**
         * Modify the first suggestion next to
         * the current active suggestion
         */
        if (key === currentActiveSuggestionKey + 1 && key + 1 <= suggestionsArray.length) {
            suggestion.isActive = true;
        }

        return suggestion;
    });
}

/**
 * Mark as active the item previous
 * to the last active item
 * on a given array of items
 *
 * @example when a user press a key arrow up
 */
function selectPreviousSuggestion(suggestionsArray) {
    /**
     * Find the current active suggestion key
     */
    var currentActiveSuggestionKey = suggestionsArray.findIndex(function (suggestion) {
        if (suggestion.isActive) {
            return suggestion;
        }
    });

    return suggestionsArray.map(function (suggestion, key) {
        /**
         * Set the current active suggestion as false
         * if is Active AND is not the last one
         */
        if (suggestion.isActive && currentActiveSuggestionKey - 1 >= 0) {
            suggestion.isActive = false;
        }

        /**
         * Set active the suggestion previous to
         * the current active suggestion
         */
        if (currentActiveSuggestionKey - 1 === key && currentActiveSuggestionKey - 1 >= 0) {
            suggestion.isActive = true;
        }

        return suggestion;
    });
}

/**
 * Return the active item of an array
 */
function selectActiveSuggestion(suggestionsArray) {
    var selectedSuggestion = suggestionsArray.filter(function (suggestion) {
        if (suggestion.isActive) {
            return suggestion;
        }
    });

    return selectedSuggestion[0].name;
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.simpleSearchAction = simpleSearchAction;
exports.suggestedSearchAction = suggestedSearchAction;

var _cloneDeep = __webpack_require__(4);

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _container = __webpack_require__(1);

var _container2 = _interopRequireDefault(_container);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This actions are triggered when a text input changes
 * receives two parameters:
 *   @param queryOptions -> query given options
 *   @param appOptions   -> current application options
 *
 * Finally dispatches an event with the search result and
 * the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        result,
 *        updatedQuery
 *     }
 *   }}
 */

/**
 * Simple search action
 * Builds a query disabling suggested searches flag
 */
function simpleSearchAction(_ref, _ref2) {
    var queryText = _ref.queryText;
    var environmentId = _ref2.environmentId,
        currentQuery = _ref2.currentQuery,
        client = _ref2.client;

    var clonedQuery = (0, _cloneDeep2.default)(currentQuery);

    clonedQuery.setQueryText(queryText).setPage(1).enableResults().disableSuggestions();

    client.search(clonedQuery, function (result, error) {
        if (error) return;

        var dispatcher = _container2.default.get(_constants.APISEARCH_DISPATCHER + '__' + environmentId);
        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                result: result,
                updatedQuery: clonedQuery
            }
        });
    });
}

/**
 * Suggested Search Action
 * Builds a query using suggested search flag active
 */
/**
 * Search actions
 */
function suggestedSearchAction(_ref3, _ref4) {
    var queryText = _ref3.queryText;
    var environmentId = _ref4.environmentId,
        currentQuery = _ref4.currentQuery,
        client = _ref4.client;

    var clonedQuery = (0, _cloneDeep2.default)(currentQuery);

    clonedQuery.setQueryText(queryText).setPage(1).disableResults().enableSuggestions();

    client.search(clonedQuery, function (result, error) {
        if (error) return;

        var dispatcher = _container2.default.get(_constants.APISEARCH_DISPATCHER + '__' + environmentId);
        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                result: result,
                updatedQuery: clonedQuery
            }
        });
    });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _sortByActions = __webpack_require__(33);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @jsx h
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * SortBy Filter Component
 */
var SortByComponent = function (_Component) {
    _inherits(SortByComponent, _Component);

    function SortByComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SortByComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SortByComponent.__proto__ || Object.getPrototypeOf(SortByComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (e) {
            var _this$props = _this.props,
                environmentId = _this$props.environmentId,
                currentQuery = _this$props.currentQuery,
                client = _this$props.client;

            /**
             * Dispatch action
             */

            (0, _sortByActions.onChangeSearchAction)({
                selectedOption: e.target.value
            }, {
                environmentId: environmentId,
                currentQuery: currentQuery,
                client: client
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SortByComponent, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$classNames = _props.classNames,
                containerClassName = _props$classNames.container,
                selectClassName = _props$classNames.select,
                options = _props.options;


            return (0, _preact.h)(
                'div',
                { className: 'as-sortBy ' + containerClassName },
                (0, _preact.h)(
                    'select',
                    {
                        className: 'as-sortBy__selector ' + selectClassName,
                        onChange: this.handleChange
                    },
                    options.map(function (option) {
                        return (0, _preact.h)(
                            'option',
                            { value: option.value },
                            option.name
                        );
                    })
                )
            );
        }
    }]);

    return SortByComponent;
}(_preact.Component);

SortByComponent.defaultProps = {
    classNames: {
        container: '',
        select: ''
    }
};

exports.default = SortByComponent;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onChangeSearchAction = onChangeSearchAction;

var _cloneDeep = __webpack_require__(4);

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _container = __webpack_require__(1);

var _container2 = _interopRequireDefault(_container);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * SortBy actions
                                                                                                                                                                                                                   */


/**
 * On change action
 *
 * This action is triggered when a sortBy filter changes
 * receives two parameters:
 *   @param queryOptions -> query given options
 *   @param appOptions   -> current application options
 *
 * Finally dispatches an event with the search result and
 * the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        result,
 *        updatedQuery
 *     }
 *   }}
 */
function onChangeSearchAction(_ref, _ref2) {
    var selectedOption = _ref.selectedOption;
    var environmentId = _ref2.environmentId,
        currentQuery = _ref2.currentQuery,
        client = _ref2.client;

    var clonedQuery = (0, _cloneDeep2.default)(currentQuery);
    var filterData = splitQueryValue(selectedOption);

    clonedQuery.sortBy(_defineProperty({}, 'indexed_metadata.' + filterData.field, {
        order: filterData.value
    }));
    clonedQuery.setPage(1);

    client.search(clonedQuery, function (result, error) {
        if (error) return;

        var dispatcher = _container2.default.get(_constants.APISEARCH_DISPATCHER + '__' + environmentId);
        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                result: result,
                updatedQuery: clonedQuery
            }
        });
    });
}

function splitQueryValue(string) {
    var queryValue = string.split(':');

    return {
        field: queryValue[0],
        value: queryValue[1]
    };
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _multipleFilterActions = __webpack_require__(35);

var _helpers = __webpack_require__(36);

var _Template = __webpack_require__(3);

var _Template2 = _interopRequireDefault(_Template);

var _ShowMoreComponent = __webpack_require__(37);

var _ShowMoreComponent2 = _interopRequireDefault(_ShowMoreComponent);

var _defaultTemplates = __webpack_require__(38);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @jsx h
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Filter Component
 */
var MultipleFilterComponent = function (_Component) {
    _inherits(MultipleFilterComponent, _Component);

    function MultipleFilterComponent() {
        _classCallCheck(this, MultipleFilterComponent);

        var _this = _possibleConstructorReturn(this, (MultipleFilterComponent.__proto__ || Object.getPrototypeOf(MultipleFilterComponent)).call(this));

        _this.handleClick = function (selectedFilter) {
            var _this$props = _this.props,
                environmentId = _this$props.environmentId,
                filterName = _this$props.name,
                filterField = _this$props.filterField,
                aggregationField = _this$props.aggregationField,
                applicationType = _this$props.applicationType,
                sortBy = _this$props.sortBy,
                fetchLimit = _this$props.fetchLimit,
                currentQuery = _this$props.currentQuery,
                client = _this$props.client,
                aggregations = _this$props.data.aggregations.aggregations;


            var activeElements = aggregations[filterName].active_elements;
            var currentActiveFilterValues = typeof activeElements !== 'undefined' ? activeElements : [];

            /**
             * Dispatch filter action
             */
            (0, _multipleFilterActions.filterAction)({
                filterName: filterName,
                filterField: filterField,
                applicationType: applicationType,
                sortBy: sortBy,
                fetchLimit: fetchLimit,
                aggregationField: aggregationField ? aggregationField : filterField,

                filterValues: (0, _helpers.manageCurrentFilterItems)(selectedFilter, currentActiveFilterValues)
            }, {
                environmentId: environmentId,
                currentQuery: currentQuery,
                client: client
            });
        };

        _this.handleShowMore = function () {
            var _this$state = _this.state,
                activeAggregations = _this$state.activeAggregations,
                currentAggregations = _this$state.currentAggregations;


            var viewLimit = activeAggregations.length + currentAggregations.length;
            _this.setState({ viewLimit: viewLimit });
        };

        _this.handleShowLess = function () {
            var viewLimit = _this.props.viewLimit;

            _this.setState({ viewLimit: viewLimit });
        };

        _this.state = {
            viewLimit: 0,
            activeAggregations: [],
            currentAggregations: []
        };
        return _this;
    }

    _createClass(MultipleFilterComponent, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _props = this.props,
                environmentId = _props.environmentId,
                filterName = _props.name,
                filterField = _props.filterField,
                aggregationField = _props.aggregationField,
                applicationType = _props.applicationType,
                sortBy = _props.sortBy,
                fetchLimit = _props.fetchLimit,
                viewLimit = _props.viewLimit,
                currentQuery = _props.currentQuery;

            /**
             * Set view items limit
             */

            var isViewLimitProperlySet = viewLimit && viewLimit < fetchLimit;
            this.setState({
                viewLimit: isViewLimitProperlySet ? viewLimit : fetchLimit
            });

            /**
             * Dispatch action
             */
            (0, _multipleFilterActions.aggregationSetup)({
                filterName: filterName,
                applicationType: applicationType,
                sortBy: sortBy,
                fetchLimit: fetchLimit,
                aggregationField: aggregationField ? aggregationField : filterField
            }, {
                environmentId: environmentId,
                currentQuery: currentQuery
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            var filterName = props.name,
                aggregations = props.data.aggregations.aggregations;


            if (typeof aggregations[filterName] !== 'undefined') {
                /**
                 * Getting aggregation from aggregations
                 */
                var aggregation = aggregations[filterName];
                var counters = aggregation.counters ? aggregation.counters : [];

                this.setState({
                    /**
                     * Current used aggregations
                     */
                    activeAggregations: counters.filter(function (item) {
                        return item.used;
                    }),
                    /**
                     * Current inactive aggregations
                     */
                    currentAggregations: counters.filter(function (item) {
                        return null === item.used;
                    })
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                viewLimit = _props2.viewLimit,
                fetchLimit = _props2.fetchLimit,
                _props2$classNames = _props2.classNames,
                containerClassName = _props2$classNames.container,
                topClassName = _props2$classNames.top,
                itemsListClassName = _props2$classNames.itemsList,
                itemClassName = _props2$classNames.item,
                activeClassName = _props2$classNames.active,
                showMoreContainerClassName = _props2$classNames.showMoreContainer,
                _props2$template = _props2.template,
                topTemplate = _props2$template.top,
                itemTemplate = _props2$template.item,
                showMoreTemplate = _props2$template.showMore,
                showLessTemplate = _props2$template.showLess,
                formatData = _props2.formatData;

            /**
             * Get aggregation items
             */

            var allItems = [].concat(_toConsumableArray(this.state.activeAggregations), _toConsumableArray(this.state.currentAggregations));
            var allItemsLength = allItems.length;
            var items = allItems.slice(0, this.state.viewLimit);

            /**
             * Check available view limit
             */
            var isViewLimitProperlySet = viewLimit && viewLimit < fetchLimit;

            return (0, _preact.h)(
                "div",
                { className: "as-multipleFilter " + containerClassName },
                (0, _preact.h)(_Template2.default, {
                    template: topTemplate,
                    className: "as-multipleFilter__top " + topClassName
                }),
                (0, _preact.h)(
                    "div",
                    { className: "as-multipleFilter__itemsList " + itemsListClassName },
                    items.map(function (item) {
                        var reducedTemplateData = {
                            n: parseInt(item.n).toLocaleString('de-DE'),
                            isActive: item.used,
                            values: item.values
                        };
                        var formattedTemplateData = formatData(reducedTemplateData);

                        return (0, _preact.h)(
                            "div",
                            {
                                className: "as-multipleFilter__item " + (itemClassName + " ") + ("" + (item.used ? activeClassName : '')),
                                onClick: function onClick() {
                                    return _this2.handleClick(item.values.id);
                                }
                            },
                            (0, _preact.h)(_Template2.default, {
                                template: itemTemplate,
                                data: formattedTemplateData
                            })
                        );
                    })
                ),
                isViewLimitProperlySet ? (0, _preact.h)(_ShowMoreComponent2.default, {
                    allItemsLength: allItemsLength,
                    currentLimit: this.state.viewLimit,
                    handleShowMore: this.handleShowMore,
                    handleShowLess: this.handleShowLess,
                    showMoreContainerClassName: showMoreContainerClassName,
                    showMoreTemplate: showMoreTemplate,
                    showLessTemplate: showLessTemplate
                }) : null
            );
        }
    }]);

    return MultipleFilterComponent;
}(_preact.Component);

MultipleFilterComponent.defaultProps = {
    aggregationField: null,
    applicationType: 8, // FILTER_MUST_ALL
    fetchLimit: 10,
    viewLimit: null,
    sortBy: ['_term', 'desc'],
    classNames: {
        container: '',
        top: '',
        itemsList: '',
        item: '',
        active: 'as-multipleFilter__item--active',
        showMoreContainer: ''
    },
    template: {
        top: null,
        item: _defaultTemplates.defaultItemTemplate,
        showMore: '+ Show more',
        showLess: '- Show less'
    },
    formatData: function formatData(data) {
        return data;
    }
};

exports.default = MultipleFilterComponent;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.aggregationSetup = aggregationSetup;
exports.filterAction = filterAction;

var _cloneDeep = __webpack_require__(4);

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _container = __webpack_require__(1);

var _container2 = _interopRequireDefault(_container);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Define aggregations setup
 *
 * This setup action is triggered when mounting a component
 * receives two parameters:
 *   @param queryOptions -> query given options
 *   @param appOptions   -> current application options
 *
 * Finally dispatches an event with the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        updatedQuery
 *     }
 *   }}
 */
function aggregationSetup(_ref, _ref2) {
    var filterName = _ref.filterName,
        aggregationField = _ref.aggregationField,
        applicationType = _ref.applicationType,
        sortBy = _ref.sortBy,
        fetchLimit = _ref.fetchLimit;
    var environmentId = _ref2.environmentId,
        currentQuery = _ref2.currentQuery;

    var clonedQuery = (0, _cloneDeep2.default)(currentQuery);

    clonedQuery.aggregateBy(filterName, aggregationField, applicationType, sortBy, fetchLimit);

    var dispatcher = _container2.default.get(_constants.APISEARCH_DISPATCHER + "__" + environmentId);
    dispatcher.dispatch({
        type: 'UPDATE_APISEARCH_SETUP',
        payload: {
            updatedQuery: clonedQuery
        }
    });
}

/**
 * Filter action
 *
 * This setup action is triggered when mounting a component
 * receives two parameters:
 *   @param queryOptions -> query given options
 *   @param appOptions   -> current application options
 *
 * Finally dispatches an event with the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        updatedQuery,
 *        result
 *     }
 *   }}
 */
/**
 * Multiple filter actions
 */
function filterAction(_ref3, _ref4) {
    var filterName = _ref3.filterName,
        filterField = _ref3.filterField,
        aggregationField = _ref3.aggregationField,
        filterValues = _ref3.filterValues,
        applicationType = _ref3.applicationType,
        sortBy = _ref3.sortBy,
        fetchLimit = _ref3.fetchLimit;
    var environmentId = _ref4.environmentId,
        currentQuery = _ref4.currentQuery,
        client = _ref4.client;

    var clonedQuery = (0, _cloneDeep2.default)(currentQuery);

    clonedQuery.filterBy(filterName, filterField, filterValues, applicationType, false, sortBy);
    clonedQuery.aggregateBy(filterName, aggregationField, applicationType, sortBy, fetchLimit);
    clonedQuery.setPage(1);

    client.search(clonedQuery, function (result, error) {
        if (error) return;

        var dispatcher = _container2.default.get(_constants.APISEARCH_DISPATCHER + "__" + environmentId);
        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                updatedQuery: clonedQuery,
                result: result
            }
        });
    });
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.manageCurrentFilterItems = manageCurrentFilterItems;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Manage filter items
 *
 * If an item is on the list, remove it
 * else, add it!
 *
 * @param selectedItem
 * @param currentItems
 * @returns {[null,null]}
 */
function manageCurrentFilterItems(selectedItem, currentItems) {
    var isElementActive = currentItems.some(function (item) {
        return item === selectedItem;
    });

    if (isElementActive) {
        return currentItems.filter(function (item) {
            return item !== selectedItem;
        });
    } else {
        return [].concat(_toConsumableArray(currentItems), [selectedItem]);
    }
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _Template = __webpack_require__(3);

var _Template2 = _interopRequireDefault(_Template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Show more component
 *
 * Provides two items
 *   -> Show more element
 *   -> Show less element
 */
/**
 * @jsx h
 */
var ShowMoreComponent = function ShowMoreComponent(_ref) {
    var allItemsLength = _ref.allItemsLength,
        currentLimit = _ref.currentLimit,
        handleShowMore = _ref.handleShowMore,
        handleShowLess = _ref.handleShowLess,
        showMoreContainerClassName = _ref.showMoreContainerClassName,
        showMoreTemplate = _ref.showMoreTemplate,
        showLessTemplate = _ref.showLessTemplate;

    return allItemsLength > currentLimit ? (0, _preact.h)(
        "div",
        { className: "as-showMore " + showMoreContainerClassName,
            onClick: handleShowMore
        },
        (0, _preact.h)(_Template2.default, {
            template: showMoreTemplate,
            className: "as-showMore--more"
        })
    ) : allItemsLength === currentLimit ? (0, _preact.h)(
        "div",
        { className: "as-showMore " + showMoreContainerClassName,
            onClick: handleShowLess
        },
        (0, _preact.h)(_Template2.default, {
            template: showLessTemplate,
            className: "as-showMore--less"
        })
    ) : null;
};

exports.default = ShowMoreComponent;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var defaultItemTemplate = exports.defaultItemTemplate = "\n    <input \n        type=\"checkbox\" \n        id=\"filter_{{values.id}}\"\n        class=\"as-multipleFilter__itemCheckbox\" \n        {{#isActive}}checked=\"checked\"{{/isActive}}\n    >\n    <label \n        class=\"as-multipleFilter__itemName\"\n        for=\"filter_{{values.id}}\"\n    >\n        {{{values.name}}}\n    </label>\n    <span class=\"as-multipleFilter__itemNumber\">\n        {{n}}\n    </span>\n";

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _Template = __webpack_require__(3);

var _Template2 = _interopRequireDefault(_Template);

var _defaultTemplates = __webpack_require__(40);

var _resultActions = __webpack_require__(41);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @jsx h
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Actions
 */


/**
 * Result Component
 */
var ResultComponent = function (_Component) {
    _inherits(ResultComponent, _Component);

    function ResultComponent() {
        _classCallCheck(this, ResultComponent);

        return _possibleConstructorReturn(this, (ResultComponent.__proto__ || Object.getPrototypeOf(ResultComponent)).apply(this, arguments));
    }

    _createClass(ResultComponent, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            /**
             * Define initial Setup on component mounting
             * that refers to the store configuration
             * and affects other widgets
             */

            var _props = this.props,
                environmentId = _props.environmentId,
                itemsPerPage = _props.itemsPerPage,
                promote = _props.promote,
                exclude = _props.exclude,
                highlightsEnabled = _props.highlightsEnabled,
                currentQuery = _props.currentQuery,
                client = _props.client;

            /**
             * Dispatch action
             */

            (0, _resultActions.changeItemsPerResultPageSetup)({
                itemsPerPage: itemsPerPage,
                highlightsEnabled: highlightsEnabled,
                promotedUUIDs: promote,
                excludedUUIDs: exclude
            }, {
                environmentId: environmentId,
                currentQuery: currentQuery,
                client: client
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props,
                dirty = _props2.dirty,
                containerClassName = _props2.classNames.container,
                _props2$template = _props2.template,
                bodyTemplate = _props2$template.itemsList,
                placeholderTemplate = _props2$template.placeholder,
                formatData = _props2.formatData,
                data = _props2.data;

            /**
             * Data accessible to the template
             */

            var reducedTemplateData = {
                query: data ? data.query.q : '',
                items: data ? data.items : []
            };

            var formattedTemplateData = formatData(reducedTemplateData);

            return (0, _preact.h)(
                "div",
                { className: "as-result " + containerClassName },
                placeholderTemplate && dirty ? (0, _preact.h)(_Template2.default, {
                    template: placeholderTemplate,
                    className: "as-result__placeholder"
                }) : (0, _preact.h)(_Template2.default, {
                    template: bodyTemplate,
                    data: formattedTemplateData,
                    className: "as-result__itemsList"
                })
            );
        }
    }]);

    return ResultComponent;
}(_preact.Component);

ResultComponent.defaultProps = {
    itemsPerPage: 10,
    highlightsEnabled: false,
    promote: [],
    exclude: [],
    classNames: {
        container: ''
    },
    template: {
        itemsList: _defaultTemplates.defaultItemsListTemplate,
        placeholder: null
    },
    formatData: function formatData(data) {
        return data;
    }
};

exports.default = ResultComponent;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var defaultItemsListTemplate = exports.defaultItemsListTemplate = "\n    <ul>\n    {{#items}}\n        <li class=\"as-result__item\">\n            <strong>Uuid:</strong> {{uuid.type}} - {{uuid.id}} <br />\n            <strong>Metadata:</strong> {{metadata}} <br />\n            <strong>Indexed metadata:</strong> {{indexed_metadata}}\n        </li>\n    {{/items}}\n    </ul>\n    {{^items}}No result{{/items}}\n";

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeItemsPerResultPageSetup = changeItemsPerResultPageSetup;

var _cloneDeep = __webpack_require__(4);

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _container = __webpack_require__(1);

var _container2 = _interopRequireDefault(_container);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Search actions
                                                                                                                                                                                                     */


/**
 * Define items per page on result
 *
 * This action is triggered when mounting a component
 * receives two parameters:
 *   @param queryOptions -> given new query options
 *   @param appOptions   -> current application options
 *
 * Finally dispatches an event with the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        updatedQuery
 *     }
 *   }}
 */
function changeItemsPerResultPageSetup(_ref, _ref2) {
    var itemsPerPage = _ref.itemsPerPage,
        highlightsEnabled = _ref.highlightsEnabled,
        promotedUUIDs = _ref.promotedUUIDs,
        excludedUUIDs = _ref.excludedUUIDs;
    var environmentId = _ref2.environmentId,
        currentQuery = _ref2.currentQuery,
        client = _ref2.client;

    var clonedQuery = (0, _cloneDeep2.default)(currentQuery);

    /**
     * Set result size
     */
    clonedQuery.setResultSize(itemsPerPage);

    /**
     * Enabling highlights on query result
     */
    if (highlightsEnabled) {
        clonedQuery.enableHighlights();
    }

    /**
     * Promoted uuids
     */
    if (promotedUUIDs.length !== 0) {
        clonedQuery.promoteUUIDs.apply(clonedQuery, _toConsumableArray(promotedUUIDs.map(function (uuid) {
            return client.createObject.uuid(uuid.id, uuid.type);
        })));
    }

    /**
     * excluded uuids
     */
    if (excludedUUIDs.length !== 0) {
        clonedQuery.excludeUUIDs.apply(clonedQuery, _toConsumableArray(excludedUUIDs.map(function (uuid) {
            return client.createObject.uuid(uuid.id, uuid.type);
        })));
    }

    var dispatcher = _container2.default.get(_constants.APISEARCH_DISPATCHER + '__' + environmentId);
    dispatcher.dispatch({
        type: 'UPDATE_APISEARCH_SETUP',
        payload: {
            updatedQuery: clonedQuery
        }
    });
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _Template = __webpack_require__(3);

var _Template2 = _interopRequireDefault(_Template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @jsx h
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Result Information Component
 */
var InformationComponent = function (_Component) {
    _inherits(InformationComponent, _Component);

    function InformationComponent() {
        _classCallCheck(this, InformationComponent);

        return _possibleConstructorReturn(this, (InformationComponent.__proto__ || Object.getPrototypeOf(InformationComponent)).apply(this, arguments));
    }

    _createClass(InformationComponent, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                containerClassName = _props.classNames.container,
                containerTemplate = _props.template.container,
                formatData = _props.formatData,
                data = _props.data;

            /**
             * Data accessible to the template
             */

            var reducedTemplateData = {
                total_hits: parseInt(data.total_hits).toLocaleString('de-DE'),
                total_items: parseInt(data.total_items).toLocaleString('de-DE')
            };

            var formattedTemplateData = formatData(reducedTemplateData);

            return (0, _preact.h)(_Template2.default, {
                template: containerTemplate,
                data: formattedTemplateData,
                className: 'as-information ' + containerClassName
            });
        }
    }]);

    return InformationComponent;
}(_preact.Component);

InformationComponent.defaultProps = {
    classNames: {
        container: ''
    },
    template: {
        container: 'Found {{total_hits}}/{{total_items}}'
    },
    formatData: function formatData(data) {
        return data;
    }
};

exports.default = InformationComponent;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _Template = __webpack_require__(3);

var _Template2 = _interopRequireDefault(_Template);

var _clearFiltersActions = __webpack_require__(44);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @jsx h
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Result Information Component
 */
var ClearFiltersComponent = function (_Component) {
    _inherits(ClearFiltersComponent, _Component);

    function ClearFiltersComponent() {
        _classCallCheck(this, ClearFiltersComponent);

        var _this = _possibleConstructorReturn(this, (ClearFiltersComponent.__proto__ || Object.getPrototypeOf(ClearFiltersComponent)).call(this));

        _this.handleClick = function () {
            var _this$props = _this.props,
                environmentId = _this$props.environmentId,
                currentQuery = _this$props.currentQuery,
                client = _this$props.client;


            _this.setState({ showClearFilters: false });

            /**
             * Dispatch a clear filter action
             */
            (0, _clearFiltersActions.clearFiltersAction)({}, {
                environmentId: environmentId,
                currentQuery: currentQuery,
                client: client
            });
        };

        _this.state = { showClearFilters: false };
        return _this;
    }

    _createClass(ClearFiltersComponent, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            var filters = props.currentQuery.filters;
            var areFiltersActive = Object.keys(filters).length !== 0 && filters.length !== 0;

            this.setState({ showClearFilters: areFiltersActive });
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                containerClassName = _props.classNames.container,
                containerTemplate = _props.template.container;


            return this.state.showClearFilters ? (0, _preact.h)(
                "div",
                { className: "as-clearFilters " + containerClassName,
                    onClick: this.handleClick
                },
                (0, _preact.h)(_Template2.default, { template: containerTemplate })
            ) : null;
        }
    }]);

    return ClearFiltersComponent;
}(_preact.Component);

ClearFiltersComponent.defaultProps = {
    classNames: {
        container: ''
    },
    template: {
        container: 'Clear filters'
    }
};

exports.default = ClearFiltersComponent;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clearFiltersAction = clearFiltersAction;

var _cloneDeep = __webpack_require__(4);

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _container = __webpack_require__(1);

var _container2 = _interopRequireDefault(_container);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); } /**
                                                                                                                   * Clear filters actions
                                                                                                                   */


/**
 * Clear filters action
 *
 * This action is triggered when the component is clicked
 * receives two parameters:
 *   @param queryOptions -> query given options
 *   @param appOptions   -> current application options
 *
 * Finally dispatches an event with the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        updatedQuery,
 *        result
 *     }
 *   }}
 */
function clearFiltersAction(_ref, _ref2) {
    var environmentId = _ref2.environmentId,
        currentQuery = _ref2.currentQuery,
        client = _ref2.client;

    _objectDestructuringEmpty(_ref);

    var clonedQuery = (0, _cloneDeep2.default)(currentQuery);

    clonedQuery.filters = [];
    clonedQuery.setPage(1);

    client.search(clonedQuery, function (result, error) {
        if (error) return;

        var dispatcher = _container2.default.get(_constants.APISEARCH_DISPATCHER + "__" + environmentId);
        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                updatedQuery: clonedQuery,
                result: result
            }
        });
    });
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _Template = __webpack_require__(3);

var _Template2 = _interopRequireDefault(_Template);

var _paginationActions = __webpack_require__(46);

var _NavigationComponent = __webpack_require__(47);

var _NavigationComponent2 = _interopRequireDefault(_NavigationComponent);

var _helpers = __webpack_require__(48);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @jsx h
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Pagination Component
 */
var PaginationComponent = function (_Component) {
    _inherits(PaginationComponent, _Component);

    function PaginationComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PaginationComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PaginationComponent.__proto__ || Object.getPrototypeOf(PaginationComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (page) {
            var _this$props = _this.props,
                data = _this$props.data,
                environmentId = _this$props.environmentId,
                currentQuery = _this$props.currentQuery,
                client = _this$props.client;


            var totalPages = (0, _helpers.getTotalPages)({
                totalHits: data.total_hits,
                hitsPerPage: currentQuery.size
            });

            /**
             * Do not let go further
             */
            if (page <= 0) page = 1;
            if (page >= totalPages) page = totalPages;

            /**
             * Dispatch change page action
             */
            (0, _paginationActions.paginationChangeAction)({
                selectedPage: page
            }, {
                environmentId: environmentId,
                currentQuery: currentQuery,
                client: client
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(PaginationComponent, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                padding = _props.padding,
                goFirstLast = _props.goFirstLast,
                _props$classNames = _props.classNames,
                containerClassName = _props$classNames.container,
                itemClassName = _props$classNames.item,
                activeClassName = _props$classNames.active,
                disabledClassName = _props$classNames.disabled,
                nextClassName = _props$classNames.next,
                previousClassName = _props$classNames.previous,
                lastClassName = _props$classNames.last,
                firstClassName = _props$classNames.first,
                _props$template = _props.template,
                itemTemplate = _props$template.item,
                nextTemplate = _props$template.next,
                previousTemplate = _props$template.previous,
                firstTemplate = _props$template.first,
                lastTemplate = _props$template.last,
                _props$currentQuery = _props.currentQuery,
                currentQueryPage = _props$currentQuery.page,
                currentQuerySize = _props$currentQuery.size,
                data = _props.data;

            /**
             * Get Total pages
             */

            var totalPages = (0, _helpers.getTotalPages)({
                totalHits: data.total_hits,
                hitsPerPage: currentQuerySize
            });
            var pages = (0, _helpers.totalPagesToArray)(totalPages);

            /**
             *  Get pages spectre
             */
            var paginationSettings = {
                totalPages: totalPages,
                padding: padding,
                currentPage: currentQueryPage,
                spectreSize: padding * 2 + 1,
                isTouchingLeft: currentQueryPage <= padding + 1,
                isTouchingRight: currentQueryPage + padding >= totalPages
            };
            var spectre = pages.slice((0, _helpers.getStart)(paginationSettings), (0, _helpers.getEnd)(paginationSettings));

            /**
             * Dynamic disabled classes
             */
            var previousDisabledClass = currentQueryPage === 1 ? disabledClassName : '';
            var nextDisabledClass = currentQueryPage === totalPages ? disabledClassName : '';

            /**
             * Hide container if hits are empty
             */
            if (data.total_hits === 0) return null;

            return (0, _preact.h)(
                "ul",
                { className: "as-pagination " + containerClassName },
                (0, _preact.h)(_NavigationComponent2.default, {
                    isVisible: goFirstLast,
                    classNames: "as-pagination__item as-pagination__item--first " + firstClassName + " " + previousDisabledClass,
                    template: firstTemplate,
                    handleClick: function handleClick() {
                        return _this2.handleClick(1);
                    }
                }),
                (0, _preact.h)(_NavigationComponent2.default, {
                    isVisible: true,
                    classNames: "as-pagination__item as-pagination__item--previous " + previousClassName + " " + previousDisabledClass,
                    template: previousTemplate,
                    handleClick: function handleClick() {
                        return _this2.handleClick(currentQueryPage - 1);
                    }
                }),
                spectre.map(function (page) {
                    return (0, _preact.h)(
                        "li",
                        {
                            className: "as-pagination__item as-pagination__item--link " + itemClassName + " " + (currentQueryPage === page ? activeClassName : ''),
                            onClick: function onClick() {
                                return _this2.handleClick(page);
                            }
                        },
                        (0, _preact.h)(_Template2.default, {
                            template: itemTemplate,
                            data: { page: parseInt(page).toLocaleString('de-DE') }
                        })
                    );
                }),
                (0, _preact.h)(_NavigationComponent2.default, {
                    isVisible: true,
                    classNames: "as-pagination__item as-pagination__item--next " + nextClassName + " " + nextDisabledClass,
                    template: nextTemplate,
                    handleClick: function handleClick() {
                        return _this2.handleClick(currentQueryPage + 1);
                    }
                }),
                (0, _preact.h)(_NavigationComponent2.default, {
                    isVisible: goFirstLast,
                    classNames: "as-pagination__item as-pagination__item--last " + lastClassName + " " + nextDisabledClass,
                    template: lastTemplate,
                    handleClick: function handleClick() {
                        return _this2.handleClick(totalPages);
                    }
                })
            );
        }
    }]);

    return PaginationComponent;
}(_preact.Component);

PaginationComponent.defaultProps = {
    padding: 3,
    goFirstLast: false,
    classNames: {
        container: '',
        item: '',
        active: 'as-pagination__item--active',
        disabled: 'as-pagination__item--disabled',
        next: '',
        first: '',
        previous: '',
        last: ''
    },
    template: {
        item: '{{page}}',
        next: '>',
        previous: '<',
        first: '<<',
        last: '>>'
    }
};

exports.default = PaginationComponent;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.paginationChangeAction = paginationChangeAction;

var _cloneDeep = __webpack_require__(4);

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _container = __webpack_require__(1);

var _container2 = _interopRequireDefault(_container);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Pagination change
 *
 * This action is triggered when a sortBy filter changes
 * receives two parameters:
 *   @param queryOptions -> query given options
 *   @param appOptions   -> current application options
 *
 * Finally dispatches an event with the search result and
 * the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        result,
 *        updatedQuery
 *     }
 *   }}
 */
function paginationChangeAction(_ref, _ref2) {
    var selectedPage = _ref.selectedPage;
    var environmentId = _ref2.environmentId,
        currentQuery = _ref2.currentQuery,
        client = _ref2.client;

    var clonedQuery = (0, _cloneDeep2.default)(currentQuery);
    clonedQuery.page = selectedPage;

    client.search(clonedQuery, function (result, error) {
        if (error) return;

        var dispatcher = _container2.default.get(_constants.APISEARCH_DISPATCHER + '__' + environmentId);
        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                result: result,
                updatedQuery: clonedQuery
            }
        });
    });
} /**
   * Pagination actions
   */

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _Template = __webpack_require__(3);

var _Template2 = _interopRequireDefault(_Template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Arrow navigation component
 */
function NavigationComponent(_ref) {
    var isVisible = _ref.isVisible,
        classNames = _ref.classNames,
        template = _ref.template,
        handleClick = _ref.handleClick;

    return isVisible ? (0, _preact.h)(
        "li",
        {
            className: classNames,
            onClick: handleClick
        },
        (0, _preact.h)(_Template2.default, { template: template })
    ) : null;
}

exports.default = NavigationComponent;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTotalPages = getTotalPages;
exports.totalPagesToArray = totalPagesToArray;
exports.getStart = getStart;
exports.getEnd = getEnd;
/**
 * Get total pages from the total reached hits
 * divided by the hits per page configured
 *
 * If there are more than 10.000 items
 * We reduce the max num of items to 9.999
 * to take care of performance
 *
 * If total resulted pages are bigger than 999
 * we set 999 as the max number of pages
 */
function getTotalPages(_ref) {
    var totalHits = _ref.totalHits,
        hitsPerPage = _ref.hitsPerPage;

    totalHits = totalHits >= 10000 ? 9999 : totalHits;

    var totalPages = Math.ceil(parseInt(totalHits) / parseInt(hitsPerPage));

    return totalPages > 999 ? 999 : totalPages;
}

/**
 * Pass total pages number into an array of numbers
 */
function totalPagesToArray(totalPages) {
    var pages = [];
    for (var index = 1; index <= totalPages; index++) {
        pages.push(index);
    }

    return pages;
}

/**
 * Get the starting point of the pages spectre
 */
function getStart(_ref2) {
    var totalPages = _ref2.totalPages,
        padding = _ref2.padding,
        currentPage = _ref2.currentPage,
        spectreSize = _ref2.spectreSize,
        isTouchingLeft = _ref2.isTouchingLeft,
        isTouchingRight = _ref2.isTouchingRight;

    if (isTouchingLeft) {
        return currentPage - currentPage % spectreSize;
    }
    if (isTouchingRight) {
        var start = currentPage - (spectreSize - totalPages % currentPage);
        return start > 0 ? start : 0;
    }

    return currentPage - (padding + 1);
}

/**
 * Get the ending point of the pages spectre
 */
function getEnd(_ref3) {
    var totalPages = _ref3.totalPages,
        padding = _ref3.padding,
        currentPage = _ref3.currentPage,
        spectreSize = _ref3.spectreSize,
        isTouchingLeft = _ref3.isTouchingLeft,
        isTouchingRight = _ref3.isTouchingRight;

    if (isTouchingLeft) {
        return spectreSize;
    }
    if (isTouchingRight) {
        return totalPages;
    }

    return currentPage + padding;
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["apisearch"] = factory();
	else
		root["apisearch"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(5);
var isBuffer = __webpack_require__(18);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Coordinate Type cast
 * @param coordinate
 */
var Coordinate = function Coordinate(latitude, longitude) {
    _classCallCheck(this, Coordinate);

    if (typeof latitude === 'undefined' || typeof latitude === 'undefined') {
        throw new Error('Not valid coordinates object type given.');
    }

    this.lat = latitude;
    this.lon = longitude;
};

exports.default = Coordinate;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Abstract Location Range class
 */
var AbstractLocationRange = function AbstractLocationRange() {
    _classCallCheck(this, AbstractLocationRange);

    if (this.constructor.name === AbstractLocationRange) {
        throw TypeError('You can\'t instantiate an Abstract class');
    }

    if (typeof this.toFilterObject === 'undefined') {
        throw new TypeError('toFilterObject() method must be implemented.');
    }
};

exports.default = AbstractLocationRange;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Typechecking
 */
var TypeChecker = function () {
    function TypeChecker() {
        _classCallCheck(this, TypeChecker);
    }

    _createClass(TypeChecker, null, [{
        key: 'isDefined',
        value: function isDefined(value) {
            if (typeof value === 'undefined') {
                throw new TypeError('Method parameter must be defined.');
            }
        }
    }, {
        key: 'isInteger',
        value: function isInteger(integer) {
            if (typeof integer !== 'number') {
                throw new TypeError('\n                "' + integer + '" must be type of Integer, \n                "' + integer.constructor.name + '" given.\n            ');
            }
        }
    }, {
        key: 'isBool',
        value: function isBool(bool) {
            if (typeof bool !== 'boolean') {
                throw new TypeError('\n                "' + bool + '" must be type of Boolean, \n                "' + bool.constructor.name + '" given.\n            ');
            }
        }
    }, {
        key: 'isString',
        value: function isString(string) {
            if (typeof string !== 'string') {
                throw new TypeError('\n                "' + string + '" must be type of String, \n                "' + string.constructor.name + '" given.\n            ');
            }
        }
    }, {
        key: 'isArray',
        value: function isArray(array) {
            if (array instanceof Array === false) {
                throw new TypeError('\n                "' + array + '" must be type of Array, \n                "' + array.constructor.name + '" given.\n            ');
            }
        }
    }, {
        key: 'isObjectTypeOf',
        value: function isObjectTypeOf(givenObject, mustBe) {
            if (givenObject instanceof mustBe !== true) {
                throw new TypeError('\n                "' + givenObject.constructor.name + '" must be type ' + mustBe.name + ', \n                "' + givenObject.constructor.name + '" given.\n            ');
            }
        }
    }]);

    return TypeChecker;
}();

exports.default = TypeChecker;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(20);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(7);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(7);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var settle = __webpack_require__(21);
var buildURL = __webpack_require__(23);
var parseHeaders = __webpack_require__(24);
var isURLSameOrigin = __webpack_require__(25);
var createError = __webpack_require__(8);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(26);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(27);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(22);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(10);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ItemUUID class
 */
var ItemUUID = function () {
    function ItemUUID(id, type) {
        _classCallCheck(this, ItemUUID);

        this.id = id;
        this.type = type;
    }

    _createClass(ItemUUID, [{
        key: "composedUUID",
        value: function composedUUID() {
            return this.type + "~" + this.id;
        }
    }]);

    return ItemUUID;
}();

exports.default = ItemUUID;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * filter constants
 */
var FILTER_IT_DOESNT_MATTER = exports.FILTER_IT_DOESNT_MATTER = 0;
var FILTER_MUST_ALL = exports.FILTER_MUST_ALL = 4;
var FILTER_MUST_ALL_WITH_LEVELS = exports.FILTER_MUST_ALL_WITH_LEVELS = 5;
var FILTER_AT_LEAST_ONE = exports.FILTER_AT_LEAST_ONE = 8;
var FILTER_EXCLUDE = exports.FILTER_EXCLUDE = 16;
var FILTER_PROMOTE = exports.FILTER_PROMOTE = 32;
var FILTER_TYPE_FIELD = exports.FILTER_TYPE_FIELD = 'field';
var FILTER_TYPE_RANGE = exports.FILTER_TYPE_RANGE = 'range';
var FILTER_TYPE_DATE_RANGE = exports.FILTER_TYPE_DATE_RANGE = 'date_range';
var FILTER_TYPE_GEO = exports.FILTER_TYPE_GEO = 'geo';
var FILTER_TYPE_QUERY = exports.FILTER_TYPE_QUERY = 'query';

/**
 * Filter class
 */

var Filter = function () {
    function Filter(field, values, applicationType, filterType) {
        var filterTerms = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

        _classCallCheck(this, Filter);

        this.field = field;
        this.values = values;
        this.application_type = applicationType;
        this.filter_type = filterType;
        this.filter_terms = filterTerms;

        return this;
    }

    _createClass(Filter, null, [{
        key: 'getFilterPathByField',
        value: function getFilterPathByField(field) {
            return ['id', 'type'].indexOf(field) > -1 ? 'uuid.' + field : 'indexed_metadata.' + field;
        }
    }]);

    return Filter;
}();

exports.default = Filter;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Apisearch = __webpack_require__(15);

var _Apisearch2 = _interopRequireDefault(_Apisearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Entry point for the Apisearch client
 *
 * @param appId
 * @param apiKey
 * @param options
 *
 * @returns {Apisearch}
 */

module.exports = function (_ref) {
    var appId = _ref.appId,
        apiKey = _ref.apiKey,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? {} : _ref$options;

    checkAppId(appId);
    checkApiKey(apiKey);

    options = _extends({
        endpoint: 'api.apisear.ch',
        apiVersion: 'v1',
        protocol: 'http',
        timeout: 10000,
        overrideQueries: true,
        cache: true
    }, options);

    return new _Apisearch2.default({
        appId: appId,
        apiKey: apiKey,
        options: options
    });
};

function checkAppId(appId) {
    if (typeof appId === 'undefined') {
        throw new TypeError('appId parameter must be defined.');
    }
}

function checkApiKey(apiKey) {
    if (typeof apiKey === 'undefined') {
        throw new TypeError('apiKey parameter must be defined.');
    }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HttpClient = __webpack_require__(16);

var _HttpClient2 = _interopRequireDefault(_HttpClient);

var _SecureObjectFactory = __webpack_require__(34);

var _SecureObjectFactory2 = _interopRequireDefault(_SecureObjectFactory);

var _QueryFactory = __webpack_require__(38);

var _QueryFactory2 = _interopRequireDefault(_QueryFactory);

var _MemoryCache = __webpack_require__(43);

var _MemoryCache2 = _interopRequireDefault(_MemoryCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Apisearch class
 */
var Apisearch = function () {
    /**
     * Constructor.
     */
    function Apisearch(_ref) {
        var appId = _ref.appId,
            apiKey = _ref.apiKey,
            _ref$options = _ref.options,
            endpoint = _ref$options.endpoint,
            apiVersion = _ref$options.apiVersion,
            protocol = _ref$options.protocol,
            timeout = _ref$options.timeout,
            overrideQueries = _ref$options.overrideQueries,
            inMemoryCache = _ref$options.cache;

        _classCallCheck(this, Apisearch);

        /**
         * Api
         */
        this.appId = appId;
        this.apiKey = apiKey;
        this.apiVersion = apiVersion;
        this.endpoint = endpoint;
        this.protocol = protocol;
        this.timeout = timeout;
        this.overrideQueries = overrideQueries;

        /**
         * Query
         */
        this.query = _QueryFactory2.default;
        this.createObject = _SecureObjectFactory2.default;

        /**
         * HttpClient
         */
        this.repository = new _HttpClient2.default(inMemoryCache ? new _MemoryCache2.default() : false);
    }

    /**
     * Search entry point
     *
     * @param query
     * @param callback
     * @returns {Promise}
     */


    _createClass(Apisearch, [{
        key: "search",
        value: function search(query, callback) {
            var encodedQuery = encodeURIComponent(JSON.stringify(query));
            var composedQuery = {
                url: this.protocol + "://" + this.endpoint + "/" + this.apiVersion + "?app_id=" + this.appId + "&key=" + this.apiKey + "&query=" + encodedQuery,
                options: {
                    timeout: this.timeout
                }
            };

            /**
             * Abort any previous existing request
             */
            if (this.overrideQueries) {
                this.repository.abort();
            }

            /**
             * Start new request
             */
            return this.repository.query(composedQuery).then(function (response) {
                return callback(response, null);
            }).catch(function (error) {
                return callback(null, error);
            });
        }
    }]);

    return Apisearch;
}();

exports.default = Apisearch;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = __webpack_require__(17);
var CancelToken = __webpack_require__(11);

/**
 * Http class
 */

var HttpClient = function () {
    /**
     * Constructor
     * @param cache
     */
    function HttpClient(cache) {
        _classCallCheck(this, HttpClient);

        this.cache = cache;
        this.cancelToken = CancelToken.source();
    }

    /**
     * Make query against the server
     * @param query
     * @returns {Promise}
     */


    _createClass(HttpClient, [{
        key: 'query',
        value: function query(_query) {
            /**
             * Check if query exists in cache store
             * return promise with the cached value if key exists
             * if not exists, fetch the data
             */
            if (this.cache) {
                var cachedResponse = this.cache.get(_query.url);
                if (cachedResponse) {
                    return new Promise(function (resolve) {
                        return resolve(cachedResponse);
                    });
                }
            }

            return this.fetchData(_query);
        }

        /**
         * Fetch data using Axios
         * @param query
         * @returns {Promise}
         */

    }, {
        key: 'fetchData',
        value: function fetchData(query) {
            /**
             * Attach new cancellation token
             */
            query.options = _extends({}, query.options, {
                cancelToken: this.cancelToken.token
            });

            /**
             * Request promise
             */
            var self = this;
            return new Promise(function (resolve, reject) {
                axios.get(query.url, query.options).then(function (response) {
                    /**
                     * Check if cache is enabled
                     * set the query as a cache key
                     * and the valid response as a cache value
                     */
                    if (self.cache) {
                        self.cache.set(query.url, response.data);
                    }

                    return resolve(response.data);
                }).catch(function (thrown) {
                    return reject(thrown);
                });
            });
        }

        /**
         * Abort current request
         * And regenerate the cancellation token
         */

    }, {
        key: 'abort',
        value: function abort() {
            this.cancelToken.cancel();
            this.cancelToken = CancelToken.source();
        }
    }]);

    return HttpClient;
}();

exports.default = HttpClient;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(5);
var Axios = __webpack_require__(19);
var defaults = __webpack_require__(4);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(10);
axios.CancelToken = __webpack_require__(11);
axios.isCancel = __webpack_require__(9);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(33);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(4);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(28);
var dispatchRequest = __webpack_require__(29);
var isAbsoluteURL = __webpack_require__(31);
var combineURLs = __webpack_require__(32);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(8);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(30);
var isCancel = __webpack_require__(9);
var defaults = __webpack_require__(4);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ItemUUID = __webpack_require__(12);

var _ItemUUID2 = _interopRequireDefault(_ItemUUID);

var _Coordinate = __webpack_require__(1);

var _Coordinate2 = _interopRequireDefault(_Coordinate);

var _CoordinateAndDistance = __webpack_require__(35);

var _CoordinateAndDistance2 = _interopRequireDefault(_CoordinateAndDistance);

var _Square = __webpack_require__(36);

var _Square2 = _interopRequireDefault(_Square);

var _Polygon = __webpack_require__(37);

var _Polygon2 = _interopRequireDefault(_Polygon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * SecureObjectFactory class.
 */
var SecureObjectFactory = function () {
    function SecureObjectFactory() {
        _classCallCheck(this, SecureObjectFactory);
    }

    _createClass(SecureObjectFactory, null, [{
        key: "uuid",
        value: function uuid(id, type) {
            return new _ItemUUID2.default(id, type);
        }
    }, {
        key: "coordinate",
        value: function coordinate(lat, lon) {
            return new _Coordinate2.default(lat, lon);
        }
    }, {
        key: "coordinateAndDistance",
        value: function coordinateAndDistance(coordinate, distance) {
            return new _CoordinateAndDistance2.default(coordinate, distance);
        }
    }, {
        key: "square",
        value: function square(topLeftCoordinate, bottomRightCoordinate) {
            return new _Square2.default(topLeftCoordinate, bottomRightCoordinate);
        }
    }, {
        key: "polygon",
        value: function polygon() {
            for (var _len = arguments.length, coordinates = Array(_len), _key = 0; _key < _len; _key++) {
                coordinates[_key] = arguments[_key];
            }

            return new (Function.prototype.bind.apply(_Polygon2.default, [null].concat(coordinates)))();
        }
    }]);

    return SecureObjectFactory;
}();

exports.default = SecureObjectFactory;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractLocationRange = __webpack_require__(2);

var _AbstractLocationRange2 = _interopRequireDefault(_AbstractLocationRange);

var _Coordinate = __webpack_require__(1);

var _Coordinate2 = _interopRequireDefault(_Coordinate);

var _TypeChecker = __webpack_require__(3);

var _TypeChecker2 = _interopRequireDefault(_TypeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CoordinateAndDistance = function (_AbstractLocationRang) {
    _inherits(CoordinateAndDistance, _AbstractLocationRang);

    function CoordinateAndDistance(coordinate, distance) {
        var _ret;

        _classCallCheck(this, CoordinateAndDistance);

        var _this = _possibleConstructorReturn(this, (CoordinateAndDistance.__proto__ || Object.getPrototypeOf(CoordinateAndDistance)).call(this));

        _TypeChecker2.default.isObjectTypeOf(coordinate, _Coordinate2.default);
        _TypeChecker2.default.isString(distance);

        _this.coordinate = coordinate;
        _this.distance = distance;

        return _ret = _this, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CoordinateAndDistance, [{
        key: "toFilterObject",
        value: function toFilterObject() {
            return {
                type: this.constructor.name,
                data: {
                    coordinate: this.coordinate,
                    distance: this.distance
                }
            };
        }
    }]);

    return CoordinateAndDistance;
}(_AbstractLocationRange2.default);

exports.default = CoordinateAndDistance;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractLocationRange = __webpack_require__(2);

var _AbstractLocationRange2 = _interopRequireDefault(_AbstractLocationRange);

var _Coordinate = __webpack_require__(1);

var _Coordinate2 = _interopRequireDefault(_Coordinate);

var _TypeChecker = __webpack_require__(3);

var _TypeChecker2 = _interopRequireDefault(_TypeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Square = function (_AbstractLocationRang) {
    _inherits(Square, _AbstractLocationRang);

    function Square(topLeftCoordinate, bottomRightCoordinate) {
        var _ret;

        _classCallCheck(this, Square);

        _TypeChecker2.default.isObjectTypeOf(topLeftCoordinate, _Coordinate2.default);
        _TypeChecker2.default.isObjectTypeOf(bottomRightCoordinate, _Coordinate2.default);

        var _this = _possibleConstructorReturn(this, (Square.__proto__ || Object.getPrototypeOf(Square)).call(this));

        _this.topLeftCoordinate = topLeftCoordinate;
        _this.bottomRightCoordinate = bottomRightCoordinate;

        return _ret = _this, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Square, [{
        key: "toFilterObject",
        value: function toFilterObject() {
            return {
                type: this.constructor.name,
                data: {
                    0: this.topLeftCoordinate,
                    1: this.bottomRightCoordinate
                }
            };
        }
    }]);

    return Square;
}(_AbstractLocationRange2.default);

exports.default = Square;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractLocationRange = __webpack_require__(2);

var _AbstractLocationRange2 = _interopRequireDefault(_AbstractLocationRange);

var _Coordinate = __webpack_require__(1);

var _Coordinate2 = _interopRequireDefault(_Coordinate);

var _TypeChecker = __webpack_require__(3);

var _TypeChecker2 = _interopRequireDefault(_TypeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Polygon = function (_AbstractLocationRang) {
    _inherits(Polygon, _AbstractLocationRang);

    function Polygon() {
        var _ret;

        _classCallCheck(this, Polygon);

        var _this = _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this));

        for (var _len = arguments.length, coordinates = Array(_len), _key = 0; _key < _len; _key++) {
            coordinates[_key] = arguments[_key];
        }

        if (coordinates.length < 3) {
            throw new Error("A polygon needs more than two coordinates.");
        }

        _this.coordinates = coordinates.map(function (coordinate) {
            _TypeChecker2.default.isObjectTypeOf(coordinate, _Coordinate2.default);

            return coordinate;
        });

        return _ret = _this, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Polygon, [{
        key: "toFilterObject",
        value: function toFilterObject() {
            return {
                type: this.constructor.name,
                data: this.coordinates
            };
        }
    }]);

    return Polygon;
}(_AbstractLocationRange2.default);

exports.default = Polygon;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Query = __webpack_require__(39);

var _Query2 = _interopRequireDefault(_Query);

var _Filter = __webpack_require__(13);

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * QueryFactory class
 */
var QueryFactory = function () {
    function QueryFactory() {
        _classCallCheck(this, QueryFactory);
    }

    _createClass(QueryFactory, null, [{
        key: "create",
        value: function create(q) {
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Query.QUERY_DEFAULT_PAGE;
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Query.QUERY_DEFAULT_SIZE;

            return new _Query2.default({
                q: q,
                from: (page - 1) * size,
                page: page,
                size: size
            });
        }
    }, {
        key: "createMatchAll",
        value: function createMatchAll() {
            return new _Query2.default({
                q: '',
                page: _Query.QUERY_DEFAULT_PAGE,
                size: _Query.QUERY_INFINITE_SIZE
            });
        }
    }, {
        key: "createLocated",
        value: function createLocated(coordinate, queryText) {
            var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Query.QUERY_DEFAULT_PAGE;
            var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Query.QUERY_DEFAULT_SIZE;

            return new _Query2.default({
                coordinate: coordinate,
                page: page,
                size: size,
                q: queryText
            });
        }
    }, {
        key: "createByUUID",
        value: function createByUUID(uuid) {
            return this.createByUUIDs(uuid);
        }
    }, {
        key: "createByUUIDs",
        value: function createByUUIDs() {
            for (var _len = arguments.length, uuids = Array(_len), _key = 0; _key < _len; _key++) {
                uuids[_key] = arguments[_key];
            }

            var ids = uuids.map(function (uuid) {
                return uuid.composedUUID();
            });
            var query = new _Query2.default({
                q: '',
                page: _Query.QUERY_DEFAULT_PAGE,
                size: _Query.QUERY_INFINITE_SIZE
            });

            query.disableAggregations().disableSuggestions();

            query.filters = _extends({}, query.filters, _defineProperty({}, '_id', new _Filter2.default('_id', ids.filter(function (item, pos) {
                return ids.indexOf(item) === pos;
            }), _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD)));

            return query;
        }
    }]);

    return QueryFactory;
}();

exports.default = QueryFactory;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QUERY_INFINITE_SIZE = exports.QUERY_DEFAULT_SIZE = exports.QUERY_DEFAULT_PAGE = exports.QUERY_DEFAULT_FROM = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ItemUUID = __webpack_require__(12);

var _ItemUUID2 = _interopRequireDefault(_ItemUUID);

var _Coordinate = __webpack_require__(1);

var _Coordinate2 = _interopRequireDefault(_Coordinate);

var _TypeChecker = __webpack_require__(3);

var _TypeChecker2 = _interopRequireDefault(_TypeChecker);

var _User = __webpack_require__(40);

var _User2 = _interopRequireDefault(_User);

var _Aggregation = __webpack_require__(41);

var _Aggregation2 = _interopRequireDefault(_Aggregation);

var _Filter = __webpack_require__(13);

var _Filter2 = _interopRequireDefault(_Filter);

var _AbstractLocationRange = __webpack_require__(2);

var _AbstractLocationRange2 = _interopRequireDefault(_AbstractLocationRange);

var _SortBy = __webpack_require__(42);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Query constants
 */
var QUERY_DEFAULT_FROM = exports.QUERY_DEFAULT_FROM = 0;
var QUERY_DEFAULT_PAGE = exports.QUERY_DEFAULT_PAGE = 1;
var QUERY_DEFAULT_SIZE = exports.QUERY_DEFAULT_SIZE = 10;
var QUERY_INFINITE_SIZE = exports.QUERY_INFINITE_SIZE = 1000;

/**
 * Query class
 */

var Query = function () {
    function Query(params) {
        _classCallCheck(this, Query);

        this.q = params.q;
        this.universe_filters = params.universe_filters || [];
        this.filters = params.filters || [];
        this.items_promoted = params.items_promoted || [];
        this.aggregations = params.aggregations || [];
        this.page = params.page || QUERY_DEFAULT_PAGE;
        this.size = params.size || QUERY_DEFAULT_SIZE;
        this.from = params.from || QUERY_DEFAULT_FROM;
        this.results_enabled = params.results_enabled || true;
        this.aggregations_enabled = params.aggregations_enabled || true;
        this.suggestions_enabled = params.suggestions_enabled || false;
        this.highlight_enabled = params.highlight_enabled || false;
        this.filter_fields = params.filter_fields || [];
        this.user = params.user || null;
        this.coordinate = typeof params.coordinate !== 'undefined' ? new _Coordinate2.default(params.coordinate.lat, params.coordinate.lon) : null;
        this.sort = {};
        this.sortBy(_SortBy.SORT_BY_SCORE);

        return this;
    }

    _createClass(Query, [{
        key: "setQueryText",
        value: function setQueryText(text) {
            this.q = text;

            return this;
        }
    }, {
        key: "setPage",
        value: function setPage(page) {
            this.page = page;

            return this;
        }
    }, {
        key: "setResultSize",
        value: function setResultSize(size) {
            _TypeChecker2.default.isInteger(size);
            this.size = size;

            return this;
        }
    }, {
        key: "filterBy",
        value: function filterBy(filterName, field, values) {
            var applicationType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Filter.FILTER_AT_LEAST_ONE;
            var aggregate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
            var aggregationSort = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;

            _TypeChecker2.default.isArray(values);
            _TypeChecker2.default.isArray(aggregationSort);

            var fieldPath = _Filter2.default.getFilterPathByField(field);
            if (values.length !== 0) {
                this.filters = _extends({}, this.filters, _defineProperty({}, filterName, new _Filter2.default(fieldPath, values, applicationType, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.filters[filterName];
            }

            if (aggregate) {
                this.aggregateBy(filterName, field, applicationType, aggregationSort);
            }

            return this;
        }
    }, {
        key: "filterByTypes",
        value: function filterByTypes(values) {
            var aggregate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var aggregationSort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;

            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField('type');
            if (values.length !== 0) {
                this.filters = _extends({}, this.filters, _defineProperty({}, 'type', new _Filter2.default(fieldPath, values, _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.filters['type'];
            }

            if (aggregate) {
                this.aggregations = _extends({}, this.aggregations, _defineProperty({}, 'type', new _Aggregation2.default('type', fieldPath, _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD, [], aggregationSort)));
            }

            return this;
        }
    }, {
        key: "filterByIds",
        value: function filterByIds(values) {
            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField('id');
            if (values.length !== 0) {
                this.filters = _extends({}, this.filters, _defineProperty({}, 'id', new _Filter2.default(fieldPath, values, _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.filters['id'];
            }

            return this;
        }
    }, {
        key: "filterByRange",
        value: function filterByRange(filterName, field, options, values) {
            var applicationType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Filter.FILTER_AT_LEAST_ONE;
            var rangeType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _Filter.FILTER_TYPE_RANGE;
            var aggregate = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
            var aggregationSort = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;

            _TypeChecker2.default.isArray(options);
            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField(field);
            if (values.length !== 0) {
                this.filters = _extends({}, this.filters, _defineProperty({}, filterName, new _Filter2.default(fieldPath, values, applicationType, rangeType)));
            } else {
                delete this.filters[filterName];
            }

            if (aggregate) {
                this.aggregateByRange(filterName, fieldPath, options, applicationType, rangeType, aggregationSort);
            }

            return this;
        }
    }, {
        key: "filterByDateRange",
        value: function filterByDateRange(filterName, field, options, values) {
            var applicationType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Filter.FILTER_AT_LEAST_ONE;
            var aggregate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
            var aggregationSort = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;

            return this.filterByRange(filterName, field, options, values, applicationType, _Filter.FILTER_TYPE_DATE_RANGE, aggregate, aggregationSort);
        }
    }, {
        key: "filterUniverseBy",
        value: function filterUniverseBy(field, values) {
            var applicationType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Filter.FILTER_AT_LEAST_ONE;

            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField(field);
            if (values.length !== 0) {
                this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, field, new _Filter2.default(fieldPath, values, applicationType, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.universe_filters[field];
            }

            return this;
        }
    }, {
        key: "filterUniverseByTypes",
        value: function filterUniverseByTypes(values) {
            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField('type');
            if (values.length !== 0) {
                this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, 'type', new _Filter2.default(fieldPath, values, _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.universe_filters['type'];
            }

            return this;
        }
    }, {
        key: "filterUniverseByIds",
        value: function filterUniverseByIds(values) {
            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField('id');
            if (values.length !== 0) {
                this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, 'id', new _Filter2.default(fieldPath, values, _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_FIELD)));
            } else {
                delete this.universe_filters['id'];
            }

            return this;
        }
    }, {
        key: "filterUniverseByRange",
        value: function filterUniverseByRange(field, values) {
            var applicationType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Filter.FILTER_AT_LEAST_ONE;
            var rangeType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Filter.FILTER_TYPE_RANGE;

            _TypeChecker2.default.isArray(values);

            var fieldPath = _Filter2.default.getFilterPathByField(field);
            if (values.length !== 0) {
                this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, field, new _Filter2.default(fieldPath, values, applicationType, rangeType)));
            } else {
                delete this.universe_filters[field];
            }

            return this;
        }
    }, {
        key: "filterUniverseByDateRange",
        value: function filterUniverseByDateRange(field, values) {
            var applicationType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Filter.FILTER_AT_LEAST_ONE;

            return this.filterUniverseByRange(field, values, applicationType, _Filter.FILTER_TYPE_DATE_RANGE);
        }
    }, {
        key: "filterUniverseByLocation",
        value: function filterUniverseByLocation(locationRange) {
            _TypeChecker2.default.isObjectTypeOf(locationRange, _AbstractLocationRange2.default);

            this.universe_filters = _extends({}, this.universe_filters, _defineProperty({}, 'coordinate', new _Filter2.default('coordinate', locationRange.toFilterObject(), _Filter.FILTER_AT_LEAST_ONE, _Filter.FILTER_TYPE_GEO)));

            return this;
        }
    }, {
        key: "setFilterFields",
        value: function setFilterFields(fields) {
            var _this = this;

            _TypeChecker2.default.isArray(fields);

            if (fields.length === 0) {
                this.filter_fields = [].concat(_toConsumableArray(fields));

                return this;
            }

            fields.map(function (field) {
                _this.filter_fields = [].concat(_toConsumableArray(_this.filter_fields), [field]);
            });

            return this;
        }
    }, {
        key: "sortBy",
        value: function sortBy(sort) {
            var _this2 = this;

            _TypeChecker2.default.isDefined(sort);

            if (typeof sort['_geo_distance'] !== 'undefined') {
                var _geo_distance;

                if (this.coordinate instanceof _Coordinate2.default === false) {
                    throw new Error("\n                    In order to be able to sort by coordinates, you need to \n                    create a Query by using apisearch.query.createLocated(...) \n                    instead of apisearch.query.create(...)\n                ");
                }
                this.sort = _defineProperty({}, '_geo_distance', (_geo_distance = {}, _defineProperty(_geo_distance, 'coordinate', this.coordinate), _defineProperty(_geo_distance, 'order', sort._geo_distance.order), _defineProperty(_geo_distance, 'unit', sort._geo_distance.unit), _geo_distance));
            } else {
                Object.keys(sort).map(function (field) {
                    var direction = sort[field].order;
                    _this2.sort = _defineProperty({}, field, _defineProperty({}, 'order', direction));
                });
            }

            return this;
        }
    }, {
        key: "aggregateBy",
        value: function aggregateBy(filterName, field, applicationType) {
            var aggregationSort = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;
            var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Aggregation.AGGREGATION_NO_LIMIT;

            _TypeChecker2.default.isDefined(applicationType);
            _TypeChecker2.default.isInteger(applicationType);

            this.aggregations = _extends({}, this.aggregations, _defineProperty({}, filterName, new _Aggregation2.default(filterName, _Filter2.default.getFilterPathByField(field), applicationType, _Filter.FILTER_TYPE_FIELD, [], aggregationSort, limit)));

            return this;
        }
    }, {
        key: "aggregateByRange",
        value: function aggregateByRange(filterName, field, options, applicationType) {
            var rangeType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Filter.FILTER_TYPE_RANGE;
            var aggregationSort = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;
            var limit = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : _Aggregation.AGGREGATION_NO_LIMIT;

            _TypeChecker2.default.isArray(options);

            if (options.length === 0) {
                return this;
            }

            this.aggregations = _extends({}, this.aggregations, _defineProperty({}, filterName, new _Aggregation2.default(filterName, _Filter2.default.getFilterPathByField(field), applicationType, rangeType, aggregationSort, limit)));

            return this;
        }
    }, {
        key: "aggregateByDateRange",
        value: function aggregateByDateRange(filterName, field, options, applicationType) {
            var aggregationSort = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Aggregation.AGGREGATION_SORT_BY_COUNT_DESC;
            var limit = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _Aggregation.AGGREGATION_NO_LIMIT;

            _TypeChecker2.default.isArray(options);

            if (options.length === 0) {
                return this;
            }

            this.aggregations = _extends({}, this.aggregations, _defineProperty({}, filterName, new _Aggregation2.default(filterName, _Filter2.default.getFilterPathByField(field), applicationType, _Filter.FILTER_TYPE_DATE_RANGE, aggregationSort, limit)));

            return this;
        }
    }, {
        key: "enableResults",
        value: function enableResults() {
            this.results_enabled = true;
            return this;
        }
    }, {
        key: "disableResults",
        value: function disableResults() {
            this.results_enabled = false;
            return this;
        }
    }, {
        key: "enableAggregations",
        value: function enableAggregations() {
            this.aggregations_enabled = true;
            return this;
        }
    }, {
        key: "disableAggregations",
        value: function disableAggregations() {
            this.aggregations_enabled = false;
            return this;
        }
    }, {
        key: "enableSuggestions",
        value: function enableSuggestions() {
            this.suggestions_enabled = true;
            return this;
        }
    }, {
        key: "disableSuggestions",
        value: function disableSuggestions() {
            this.suggestions_enabled = false;
            return this;
        }
    }, {
        key: "enableHighlights",
        value: function enableHighlights() {
            this.highlight_enabled = true;
            return this;
        }
    }, {
        key: "disableHighlights",
        value: function disableHighlights() {
            this.highlight_enabled = false;
            return this;
        }
    }, {
        key: "promoteUUID",
        value: function promoteUUID(itemUUID) {
            if (itemUUID instanceof _ItemUUID2.default === false) {
                throw new Error("Excluded item must be type \"ItemUUID\", \"" + itemUUID.constructor.name + "\" given.");
            }
            this.items_promoted = [].concat(_toConsumableArray(this.items_promoted), [itemUUID]);

            return this;
        }
    }, {
        key: "promoteUUIDs",
        value: function promoteUUIDs() {
            var _this3 = this;

            for (var _len = arguments.length, uuids = Array(_len), _key = 0; _key < _len; _key++) {
                uuids[_key] = arguments[_key];
            }

            uuids.forEach(function (uuid) {
                return _this3.promoteUUID(uuid);
            });

            return this;
        }
    }, {
        key: "excludeUUID",
        value: function excludeUUID(itemUUID) {
            _TypeChecker2.default.isObjectTypeOf(itemUUID, _ItemUUID2.default);
            this.excludeUUIDs(itemUUID);

            return this;
        }
    }, {
        key: "excludeUUIDs",
        value: function excludeUUIDs() {
            for (var _len2 = arguments.length, uuids = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                uuids[_key2] = arguments[_key2];
            }

            this.filters = _extends({}, this.filters, _defineProperty({}, 'excluded_ids', new _Filter2.default('_id', uuids.map(function (uuid) {
                return uuid.composedUUID();
            }), _Filter.FILTER_EXCLUDE, _Filter.FILTER_TYPE_FIELD)));

            return this;
        }
    }, {
        key: "byUser",
        value: function byUser(user) {
            _TypeChecker2.default.isObjectTypeOf(user, _User2.default);
            this.user = user;

            return this;
        }
    }, {
        key: "anonymously",
        value: function anonymously() {
            this.user = null;

            return null;
        }
    }]);

    return Query;
}();

exports.default = Query;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * User class
 */
var User = function User(id) {
    _classCallCheck(this, User);

    this.id = id;
};

exports.default = User;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Aggregation constants
 */
var AGGREGATION_SORT_BY_COUNT_ASC = exports.AGGREGATION_SORT_BY_COUNT_ASC = ['_count', 'asc'];
var AGGREGATION_SORT_BY_COUNT_DESC = exports.AGGREGATION_SORT_BY_COUNT_DESC = ['_count', 'desc'];
var AGGREGATION_SORT_BY_NAME_ASC = exports.AGGREGATION_SORT_BY_NAME_ASC = ['_term', 'asc'];
var AGGREGATION_SORT_BY_NAME_DESC = exports.AGGREGATION_SORT_BY_NAME_DESC = ['_term', 'desc'];
var AGGREGATION_NO_LIMIT = exports.AGGREGATION_NO_LIMIT = 0;

/**
 * Aggregation class
 */

var Aggregation = function Aggregation(name, field, applicationType, filterType, subgroup, sort, limit) {
    _classCallCheck(this, Aggregation);

    this.name = name;
    this.field = field;
    this.applicationType = applicationType;
    this.filterType = filterType;
    this.subgroup = subgroup;
    this.sort = sort || AGGREGATION_SORT_BY_COUNT_DESC;
    this.limit = limit || AGGREGATION_NO_LIMIT;
};

exports.default = Aggregation;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 export * Sort by constants
 */

var SORT_BY_SCORE = exports.SORT_BY_SCORE = {
    '_score': {
        'order': 'asc'
    }
};
var SORT_BY_RANDOM = exports.SORT_BY_RANDOM = {
    'random': {
        'order': 'asc'
    }
};
var SORT_BY_ID_ASC = exports.SORT_BY_ID_ASC = {
    'uuid.id': {
        'order': 'asc'
    }
};
var SORT_BY_ID_DESC = exports.SORT_BY_ID_DESC = {
    'uuid.id': {
        'order': 'desc'
    }
};
var SORT_BY_TYPE_ASC = exports.SORT_BY_TYPE_ASC = {
    'uuid.type': {
        'order': 'asc'
    }
};
var SORT_BY_TYPE_DESC = exports.SORT_BY_TYPE_DESC = {
    'uuid.type': {
        'order': 'desc'
    }
};
var SORT_BY_LOCATION_KM_ASC = exports.SORT_BY_LOCATION_KM_ASC = {
    '_geo_distance': {
        'order': 'asc',
        'unit': 'km'
    }
};
var SORT_BY_LOCATION_MI_ASC = exports.SORT_BY_LOCATION_MI_ASC = {
    '_geo_distance': {
        'order': 'asc',
        'unit': 'mi'
    }
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Cache class
 */
var MemoryCache = function () {
    function MemoryCache() {
        _classCallCheck(this, MemoryCache);

        this.cache = {};
        this.size = 0;

        return this;
    }

    _createClass(MemoryCache, [{
        key: "set",
        value: function set(key, value) {
            this.cache = _extends({}, this.cache, _defineProperty({}, key, value));
            this.size = this.size + 1;

            return this;
        }
    }, {
        key: "get",
        value: function get(key) {
            return this.cache[key];
        }
    }, {
        key: "clear",
        value: function clear() {
            this.cache = {};
            this.size = 0;
        }
    }]);

    return MemoryCache;
}();

exports.default = MemoryCache;

/***/ })
/******/ ]);
});
//# sourceMappingURL=apisearch.node.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(51);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Flux pattern store class
 */
var Store = function (_EventEmitter) {
  _inherits(Store, _EventEmitter);

  function Store(client) {
    _classCallCheck(this, Store);

    /**
     * Store initial state
     */
    var _this = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this));

    _this.dirty = true;

    /**
     * Current query instance
     */
    _this.currentQuery = client.query.create('');

    /**
     * Data received
     */
    _this.data = {
      query: { q: '' },
      aggregations: { total_elements: 0 },
      items: [],
      total_hits: 0,
      total_items: 0
    };
    return _this;
  }

  /**
   * Handle Dispatched actions
   *
   * This is what we call a reducer
   * on a Redux architecture
   */


  _createClass(Store, [{
    key: 'handleActions',
    value: function handleActions(action) {
      /**
       * When action only sets up store definitions
       * Does not dispatch any event
       */
      if (action.type === 'UPDATE_APISEARCH_SETUP') {
        this.currentQuery = action.payload.updatedQuery;
      }

      /**
       * Is triggered when a initial data is received
       * Dispatches an 'render' event
       */
      if (action.type === 'RENDER_INITIAL_DATA') {
        var _action$payload = action.payload,
            initialResult = _action$payload.initialResult,
            initialQuery = _action$payload.initialQuery;


        this.data = initialResult;
        this.currentQuery = initialQuery;

        this.emit('render');
      }

      /**
       * When action triggers a re-rendering
       * Dispatches a 'render' event
       */
      if (action.type === 'RENDER_FETCHED_DATA') {
        var _action$payload2 = action.payload,
            result = _action$payload2.result,
            updatedQuery = _action$payload2.updatedQuery;


        this.dirty = false;
        this.data = result;
        this.currentQuery = updatedQuery;

        this.emit('render');
      }
    }
  }]);

  return Store;
}(_events.EventEmitter);

exports.default = Store;

/***/ }),
/* 51 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=apisearch-ui.node.js.map