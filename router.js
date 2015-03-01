/**
 * Router Constructor
 * @params {object} [options] - Router Options
 *    @property {String} [defaultRoute] The default route for the router to load
 *    @property {Object} [routes] (optional) An object with a set of routes  
 *    @property {String} [mode] (default: state) The router mode (either url or state) 
 *    @property {Boolean} [templating] (default: true) Whether to use router layout/template features or not
 */
Router = function(options){

	var 
	self = this,
  defaultOptions = {
		routes: {},
		mode: "state",
		templating: true
	};

	options = _.extend(defaultOptions, options);

	// Options check
	if (!options) {
		Logger.log("Router", "No router options provided!");
		return false;
	}

	// Default route check
	if (!options.defaultRoute) {
		Logger.log("Router", "No default route provided!");
		return false;
	}

	/**
	 * The reactive current route name
	 * @type {ReactiveVar}
	 */
	this._currentRoute = new ReactiveVar(options.defaultRoute);

	/**
	 * Available routes
	 * @type {Object}
	 */
	this._routes = options.routes;

	/**
	 * History of routes
	 * @type {Array}
	 */
	this._history = [];
	 
	/**
	 * This flag turns internal router templating on or off 
	 * @type {Boolean}
	 */
	this._templating = options.templating;

	/**
	 * Template for if no layout is defined
	 * @return {string}
	 */
	Template['Router'].__helpers[" template"] = function() {
		return self.getRoute().template;
	}

	/**
	 * Template of the layout
	 * @return {string}
	 */
	Template['Router'].__helpers[" layoutTemplate"] = function() {
		return self.getRoute().layoutTemplate;
	}

	/**
	 * Templates object which is used if using a layout
	 * @return {object}
	 */
	Template['Router'].__helpers[" childTemplates"] = function() {
		if (self.getRoute().templates) {
			return self.getRoute().templates;
		}
		else {
			return {
				main: self.getRoute().template
			};
		}
	}
}

Router.prototype.constructor = Router;

/**
 * Add a new route
 * @param  {string} [name] - Name of the router
 * @param  {object} [options] - Object with templates
 * @return {[type]}
 */
Router.prototype.route = function(name, options) {
	this._routes[name] = options;
}

/**
 * Get the current route
 * @return {[object]}
 */
Router.prototype.getRoute = function() {
	var route = this._routes[this._currentRoute.get()];

	route.name = this._currentRoute.get();
	return route;
}

/**
 * Get the previous route
 * @return {[object]}
 */
Router.prototype.getLastRoute = function() {
	if (this._history.length > 0) {

		var lastRoute = this._history[this._history.length - 1],
				route = this._routes[lastRoute];

		route.name = lastRoute;
		return route;
	}
	else {
		return false;
	}
}

/**
 * Get the array of history
 * @return {[type]}
 */
Router.prototype.getHistory = function() {
	return this._history;
}

/**
 * Go back to the previous route
 */
Router.prototype.back = function() {
	if (this._history.length > 0) {
		this.go(this._history[this._history.length - 1], false);
		this._history.pop()
	}
	else {
		return false;
	}
}

/**
 * Go the the specified route
 * @param  {string} [name] - Name of the route
 */
Router.prototype.go = function(name, logHistory) {

	if (logHistory !== false) {
		var logHistory = true;
	}

	if (this._routes[name]) {

		// Check if already on the route
		if (name == this._currentRoute.get()){
			return false;
		}

		// Log new route in history
		if (logHistory) {
			this._history.push(this._currentRoute.get());
		}
		
		// Before route hook
		if (this._routes[name].onBeforeRoute && typeof this._routes[name].onBeforeRoute == "function") {
			this._routes[name].onBeforeRoute();
		}

		// Change route
		if (this._templating) {
			this._currentRoute.set(name);
		}

		// On route hook
		if (this._routes[name].onRoute && typeof this._routes[name].onRoute == "function") {
			this._routes[name].onRoute();
		}

		// After route hook
		if (this._routes[name].onAfterRoute && typeof this._routes[name].onAfterRoute == "function") {
			this._routes[name].onAfterRoute();
		}
	}
	else {
		Logger.log("Router", "Route does not exist!", name);
	}
}

this.Router = Router;