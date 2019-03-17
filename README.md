
A series of functions for converting unix time to Jalali date-time and converting Jalali date-time to Gregorian and vice versa.

## Test

* After cloning the repository and installing the dependencies, you can use `jest` or `npm run test` to test the codes. 

## Usage

```javascript
import  { 
            jalaliToGregorian, 
            gregorianToJalali,
            unixTimeToGregorianArray, 
            unixTimeToGregorianString,
            unixTimeToJalaliArray, 
            unixTimeToJalaliString 
        } from "jalali";

console.log(gregorianToJalali([2019, 2, 12]));         // [1397, 11, 23]
console.log(jalaliToGregorian([1397, 11, 16]));        // [2019, 2, 5]

console.log(unixTimeToGregorianArray(1549955188474));  // [2019, 2, 12, 10, 36, 28]
console.log(unixTimeToJalaliArray(1549955188474));     // [1397, 11, 23, 10, 36, 28]

console.log(unixTimeToGregorianString(1549955188474)); // 2019/02/12 10:36:28
console.log(unixTimeToJalaliString(1549955188474));    // 1397/11/23 10:36:28
```
