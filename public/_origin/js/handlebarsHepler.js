//handlebar Template 바인딩
function fnSetTemplate(id, data, obj){ 
	//console.log('>> id.html: ', $(id).html(), '>> handlebar Data:' , data);
	var template = Handlebars.compile($(id).html());
    var tempHtml = template(data);
    if ( typeof obj == 'undefined') {
    	$(tempHtml).insertBefore(tempHtml); 
    } else {
    	obj.append(tempHtml);
    }
}

//handlebar helper
Handlebars.registerHelper("switch", function(value,options){		
    this.switch_value = value;
    var html = options.fn(this);
    delete this.switch_value;
    return html;
});
Handlebars.registerHelper("case", function(value,options){
    if(value == this.switch_value){
    	return options.fn(this);
    }
});
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});