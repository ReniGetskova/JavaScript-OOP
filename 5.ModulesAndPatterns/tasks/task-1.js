/* Task Description */
/*
 * Create a module for a Telerik Academy course
 * The course has a title and presentations
 * Each presentation also has a title
 * There is a homework for each presentation
 * There is a set of students listed for the course
 * Each student has firstname, lastname and an ID
 * IDs must be unique integer numbers which are at least 1
 * Each student can submit a homework for each presentation in the course
 * Create method init
 * Accepts a string - course title
 * Accepts an array of strings - presentation titles
 * Throws if there is an invalid title
 * Titles do not start or end with spaces
 * Titles do not have consecutive spaces
 * Titles have at least one character
 * Throws if there are no presentations
 * Create method addStudent which lists a student for the course
 * Accepts a string in the format 'Firstname Lastname'
 * Throws if any of the names are not valid
 * Names start with an upper case letter
 * All other symbols in the name (if any) are lowercase letters
 * Generates a unique student ID and returns it
 * Create method getAllStudents that returns an array of students in the format:
 * {firstname: 'string', lastname: 'string', id: StudentID}
 * Create method submitHomework
 * Accepts studentID and homeworkID
 * homeworkID 1 is for the first presentation
 * homeworkID 2 is for the second one
 * ...
 * Throws if any of the IDs are invalid
 * Create method pushExamResults
 * Accepts an array of items in the format {StudentID: ..., Score: ...}
 * StudentIDs which are not listed get 0 points
 * Throw if there is an invalid StudentID
 * Throw if same StudentID is given more than once ( he tried to cheat (: )
 * Throw if Score is not a number
 * Create method getTopStudents which returns an array of the top 10 performing students
 * Array must be sorted from best to worst
 * If there are less than 10, return them all
 * The final score that is used to calculate the top performing students is done as follows:
 * 75% of the exam result
 * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
 */

function solve() {
    var Course = {
        init: function(title, presentations) {
            this.title = title;
            this.presentations = presentations;
            this.students = [];
            return this;
        },
        addStudent: function(fullname) {
            var splitFullName = fullname.split(' '),
                studentsId = this.students.length + 1;
            if (splitFullName.length > 2) {
                throw new Error('Not accept more than two names!');
            }
            if (validateName(splitFullName[0]) && validateName(splitFullName[1])) {
                this.students.push({
                        firstname: splitFullName[0],
                        lastname: splitFullName[1],
                        id: studentsId
                    }
                )
            } else {
                throw new Error('Invalid student name!');
            }
            return studentsId;
        },
        getAllStudents: function() {
            return this.students.slice();
        },
        submitHomework: function(studentID, homeworkID) {
            validateIDs(this, studentID, homeworkID);
            return this;
        },
        pushExamResults: function(results) {
            if (!results ) {
                throw new Error('Not accept empty results!');
            }
            if (!Array.isArray(results)) {
                throw new Error('Results must be array of objects!');
            }
            validateResults(this, results);
            return this;
        },
        getTopStudents: function() {
        }
    };

    Object.defineProperty(Course, 'title',{
        get: function(){
            return Course._title;
        },
        set: function(value){
            var startWithSpace = /^[\s]+/g,
                endWithSpace = /[\s]+$/g;

            if( value.match(startWithSpace))
            {
                throw new Error('Course title can not start with spaces!');
            }
            if (value.match(endWithSpace))  {
                throw new Error('Course title can not start with spaces!');
            }

            Course._title = value;
        }
    });

    Object.defineProperty(Course, 'presentations', {
        get: function(){
            return Course._presentations;
        },
        set: function(value){
            if (!validateTitle(value)) {
                throw new Error('Invalid presentation title!');
            }
            Course._presentations = value;
        }
    });

    function validateName(name){
        var regexNames = /^[A-Z][a-z]*$/g;
        if(name.match(regexNames)) {
            return true;
        } else {
            return false;
        }
    }

    function validateTitle(title){
        var moreThanOneSpace = /[\s]{2,}/g,
            startWithSpace = /^[\s]+/g,
            endWithSpace = /[\s]+$/g;
        if (title.length === 0) {
            return false;
        }
        for (var i = 0; i < title.length; i++) {
            if (title[i] === '') {
                return false;
            }
            if (title[i].match(moreThanOneSpace)) {
                return false;
            }
            if( title[i].match(startWithSpace)){
                return false;
            }
            if (title[i].match(endWithSpace))  {
                return false;
            }
        }
        return true;
    }

    function validateIDs(object, studentID, homeworkID){
        if (studentID < 1 || studentID > object.students.length) {
            throw new Error('Invalid student ID!');
        }
        if (homeworkID < 1 || homeworkID > object.presentations.length) {
            throw new Error('Invalid homework ID!');
        }
    }

    function validateResults(object, results){
        for (var i = 0; i < results.length; i++) {
            if (results[i].StudentID < 1 || results[i].StudentID > object.students.length) {
                throw new Error('Invalid student ID!');
            }
            if (typeof(results[i].StudentID) !== 'number') {
                throw new Error('Student ID must be a number!');
            }
            if (typeof (results[i].score) !== 'number') {
                throw new Error('Student score must be a number!');
            }
            for (var j = i+1; j < results.length; j++) {
                if (results[i].StudentID === results[j].StudentID) {
                    throw new Error('There is same student twice in array of objects!');
                }

            }

        }
    }

    return Course;
}

/*var courseTest = solve();
 //console.log(courseTest);
 var course = courseTest.init('OOP', ['p1', 'p2', 'p3']);
 console.log(course.title, course.presentations);
 console.log(course.addStudent('Firstname Lastname'));
 console.log(course.getAllStudents());
 console.log(course.pushExamResults([{StudentID: 1, Score: 5}]));*/


module.exports = solve;
