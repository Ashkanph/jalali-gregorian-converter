
import {  gregorianToJalali, 
          jalaliToGregorian,
          unixTimeToGregorianString,
          unixTimeToJalaliString 
       }  from "../src/jalali";
import { testCases }  from "../__mocks__/dates";

describe('Testing unixTimeToGregorianString and unixTimeToJalaliString', () => {
    testCases.forEach(function (testCase) {
      if(testCase.ut != null){
        it(`case ${testCase.gregorian}`, () => {
          expect(unixTimeToGregorianString(testCase.ut)).toBe(testCase.gregorian);
        });
        it(`case ${testCase.jalali}`, () => {
          expect(unixTimeToJalaliString(testCase.ut)).toBe(testCase.jalali);
        });
      }
    });
  });

describe('Testing gregorianToJalali and jalaliToGregorian', () => {
    testCases.forEach(function (testCase) {
      it(`case ${testCase.gregorian}`, () => {
        expect(gregorianToJalali(testCase.ga[0], testCase.ga[1], testCase.ga[2])).toEqual(testCase.ja);
      });
      it(`case ${testCase.jalali}`, () => {
        expect(jalaliToGregorian(testCase.ja[0], testCase.ja[1], testCase.ja[2])).toEqual(testCase.ga);
      });
    });
});