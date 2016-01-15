/* Task description */
/*
 Write a function that finds all the prime numbers in a range
 1) it should return the prime numbers in an array
 2) it must throw an Error if any on the range params is not convertible to `Number`
 3) it must throw an Error if any of the range params is missing
 */

function findPrimes(from, to){
    var divisor,
        maxDivisor,
        n,
        isPrime,
        primes = [];

    from = +from;
    to = +to;

    if (arguments.length < 2) {
        throw 'Error! Pass 2 arguments!';
    } else if (isNaN(arguments[0]) || isNaN(arguments[1])) {
        throw 'Error! Arguments must be convertible to numbers.';
    }else if (from > to){
        throw 'Error! Wrong interval.';
    }else if (from < 0 || to < 0)
        throw 'Error! Must be positive numbers';

    for (n = from; n <= to; n+=1) {
        maxDivisor = Math.sqrt(n);
        isPrime = true;
        for (divisor = 2; divisor <= maxDivisor; divisor+=1) {
            var obj = arguments[divisor];
            if (n % divisor === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime && n > 1) {
            primes.push(n);
        }

    }
    return primes;
}

module.exports = findPrimes;
