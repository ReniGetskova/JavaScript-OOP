/* Task Description */
/* 
 Create a function constructor for Person. Each Person must have:
 *	properties `firstname`, `lastname` and `age`
 *	firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
 *	age must always be a number in the range 0 150
 *	the setter of age can receive a convertible-to-number value
 *	if any of the above is not met, throw Error
 *	property `fullname`
 *	the getter returns a string in the format 'FIRST_NAME LAST_NAME'
 *	the setter receives a string is the format 'FIRST_NAME LAST_NAME'
 *	it must parse it and set `firstname` and `lastname`
 *	method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
 *	all methods and properties must be attached to the prototype of the Person
 *	all methods and property setters must return this, if they are not supposed to return other value
 *	enables method-chaining
 */
function solve() {
    var Person = (function () {
        var PERSON_CONSTANTS = {
            MIN_NAME: 3,
            MAX_NAME: 20,
            MIN_AGE: 0,
            MAX_AGE: 150
        };

        function Person(firstname, lastname, age) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.age = age;
        }

        Object.defineProperty(Person.prototype, 'firstname',{
            get: function(){
                return this._firstname;
            },
            set: function(value){
                var regex = /[^A-z]+/g;
                if (typeof(value) !== 'string') {
                    throw new Error('First name must be a string!');
                }
                if (value.match(regex)) {
                    throw new Error('First name must consist only latin letters!');
                }
                if (value.length < PERSON_CONSTANTS.MIN_NAME || value.length > PERSON_CONSTANTS.MAX_NAME) {
                    throw  new Error('Invalid first name length!');
                }
                this._firstname = value;
            }
        });

        Object.defineProperty(Person.prototype, 'lastname', {
            get: function(){
                return this._lastname;
            },
            set: function (value) {
                var regex = /[^A-z]+/g;
                if (typeof(value) !== 'string') {
                    throw new Error('Last name must be a string!');
                }
                if (value.match(regex)) {
                    throw new Error('Last name must consist only latin letters!');
                }
                if (value.length < PERSON_CONSTANTS.MIN_NAME || value.length > PERSON_CONSTANTS.MAX_NAME) {
                    throw new Error('Invalid last name length!');
                }
                this._lastname = value;
            }
        });

        Object.defineProperty(Person.prototype, 'age', {
            get: function(){
                return this._age;
            },
            set: function(value){
                var toNumber = + value;
                if (!(+toNumber)) {
                    throw new Error('Age must be a number');
                }
                if (toNumber < PERSON_CONSTANTS.MIN_AGE || toNumber > PERSON_CONSTANTS.MAX_AGE) {
                    throw new Error('Invalid age');
                }
                this._age = value;
            }
        });

        Object.defineProperty(Person.prototype, 'fullname', {
            get: function(){
                return this._firstname + ' ' + this._lastname;
            },
            set: function(value){
                var splitNames = value.split(' ');
                this._firstname = splitNames[0];
                this._lastname = splitNames[1];
            }
        });

        Person.prototype.introduce = function(){
            return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
        };

        return Person;
    } ());
    return Person;
}
module.exports = solve;

//var person = new Person('Maria', 'Ivanova', 12);
//person.fullname = 'Maria Ivanova';
//console.log(person.fullname);
