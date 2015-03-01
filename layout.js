UI.registerHelper("Layout", function() {

	var self = this,
      templateNotFound = false;

  // Layout Template Check
  if (!Template[this.layoutTemplate]) {
  	Logger.log("Router", "Layout not found", this.layoutTemplate);
		return false;
  }

  // Child Templates Check
  _.each(this.childTemplates, function(template, area) {
  	if (!Template[template]) {
	  	Logger.log("Router", "Template not found", template);
			templateNotFound = true;
  	}
  })
  if (templateNotFound) {
    return false
  }

  // Yield Helper
  if (!Template[this.layoutTemplate].__helpers[" yield"]) {
    Template[this.layoutTemplate].__helpers[" yield"] = function(name) {
    	if (!name) {
    		return Template[this.childTemplates["main"]]
    	}
    	else {
    		return Template[this.childTemplates[name]]
    	}
    }
  }

  return Template[this.layoutTemplate]
});