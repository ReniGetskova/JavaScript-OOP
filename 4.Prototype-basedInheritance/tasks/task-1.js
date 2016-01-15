/* Task Description */
/*
 * Create an object domElement, that has the following properties and methods:
 * use prototypal inheritance, without function constructors
 * method init() that gets the domElement type
 * i.e. `Object.create(domElement).init('div')`
 * property type that is the type of the domElement
 * a valid type is any non-empty string that contains only Latin letters and digits
 * property innerHTML of type string
 * gets the domElement, parsed as valid HTML
 * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
 * property content of type string
 * sets the content of the element
 * works only if there are no children
 * property attributes
 * each attribute has name and value
 * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
 * property children
 * each child is a domElement or a string
 * property parent
 * parent is a domElement
 * method appendChild(domElement / string)
 * appends to the end of children list
 * method addAttribute(name, value)
 * throw Error if type is not valid
 * // method removeAttribute(attribute)
 */


/* Example

 var meta = Object.create(domElement)
 .init('meta')
 .addAttribute('charset', 'utf-8');

 var head = Object.create(domElement)
 .init('head')
 .appendChild(meta)

 var div = Object.create(domElement)
 .init('div')
 .addAttribute('style', 'font-size: 42px');

 div.content = 'Hello, world!';

 var body = Object.create(domElement)
 .init('body')
 .appendChild(div)
 .addAttribute('id', 'cuki')
 .addAttribute('bgcolor', '#012345');

 var root = Object.create(domElement)
 .init('html')
 .appendChild(head)
 .appendChild(body);

 console.log(root.innerHTML);
 Outputs:
 <html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
 */


function solve() {
    var domElement = (function () {
        function getSortedAttributes(attributes){
            var result = '';
            var keys = Object.keys(attributes).sort(); // return sorted array of keys
            for(var i = 0; i < keys.length; i += 1){
                result += keys[i] + '=' + '"' + attributes[keys[i]] + '"';
                if (i !== keys.length - 1) {
                    result += ' ';
                }
            }
            return result;
        }
        var domElement = {
            //Methods
            init: function(type) {
                this.type = type;
                this.parent;
                this.content = '';
                this.children = [];
                this.attributes = {};
                this.innerHTML;

                return this;
            },
            appendChild: function(child) {
                if (typeof child !== 'string' && typeof child !== 'object') {
                    throw new Error('Invalid child!');
                }
                this.children.push(child);
                if (typeof child === 'object') {
                    child.parent = this;
                }
                child.parent = this;
                return this;
            },
            addAttribute: function(name, value) {
                var regex = /^[A-Za-z0-9\-]+$/g;
                if (typeof name !== 'string' || !(name.match(regex))) {
                    throw new Error('Invalid name attribute!');
                }
                this.attributes[name] = value;
                return this;
            },
            removeAttribute: function(name){
                if(!this.attributes.hasOwnProperty(name)){
                    throw new Error('There no such attribute!');
                }
                delete this.attributes[name];
                return this;
            },

            //Properties
            get type() {
                return this._type;
            },
            set type(value){
                var regex = /^[A-Za-z0-9]+$/g;
                if (!value.match(regex)) {
                    throw new Error('Invalid type!');
                }
                this._type = value;
            },
            get children(){
                return this._children;
            },
            set children(child){
                this._children = child;
            },
            get content(){
                if(this.children.length){
                    return '';
                }
                return this._content;
            },
            set content(value){
                if (typeof(value) !== 'string'){
                    throw new Error('Content must be a string!');
                }
                this._content = value;
            },
            get parent(){
                return this._parent || 'Element has not parent';
            },
            set parent(value){
                this._parent = value;
            },
            get attributes(){
                return this._attributes;
            },

            set attributes(value){
                this._attributes = value;
            },
            get innerHTML() {
                var result = '<' + this.type;
                //check if object attributes is empty
                if (Object.keys(this.attributes).length !== 0) {
                    result += ' ' + getSortedAttributes(this.attributes);
                }
                result += '>' + this.content;
                if (this.children.length !== 0) {
                    for(var i = 0; i < this.children.length; i+=1){
                        if (typeof  this.children[i] === 'string') {
                            result += this.children[i];
                        } else {
                            result += this.children[i].innerHTML;
                        }
                    }
                }
                result += '</' + this.type + '>';
                return result;
            }
        };
        return domElement;
    } ());

    /*var meta = Object.create(domElement)
     .init('meta')
     .addAttribute('charset', 'utf-8');

     var head = Object.create(domElement)
     .init('head')
     .appendChild(meta)

     var div = Object.create(domElement)
     .init('div')
     .addAttribute('style', 'font-size: 42px');

     div.content = 'Hello, world!';

     var body = Object.create(domElement)
     .init('body')
     .appendChild(div)
     .addAttribute('id', 'myid')
     .addAttribute('bgcolor', '#012345');

     var root = Object.create(domElement)
     .init('html')
     .appendChild(head)
     .appendChild(body);

     console.log(root.innerHTML);*/

    return domElement;
}

module.exports = solve;

