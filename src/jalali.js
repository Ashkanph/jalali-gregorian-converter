
export { 
    jalaliToGregorian, 
    gregorianToJalali,
    unixTimeToGregorianArray, 
    unixTimeToGregorianString,
    unixTimeToJalaliArray, 
    unixTimeToJalaliString 
}

/**
 * Check if the given year, month and day number is valid.
 * 
 * @param {number} year 
 * @param {number} month 
 * @param {number} day 
 */
function is_valid(year, month, day){
    if( typeof year  != "number" || 
        typeof month != "number" || 
        typeof day   != "number" )
        return false;
    
    return  year > -1 && 
                month > 0 && 
                month <= 12 && 
                day > 0 && 
                day <= 31;
}

/**
 * Convert Gregorian date to jalali
 * 
 * @param {number} gy 
 * @param {number} gm 
 * @param {number} gd 
 */
function gregorianToJalali(gy,gm,gd){
    if(!is_valid(gy, gm, gd))
        return [0, 0, 0]; 

    var g_d_m=[0,31,59,90,120,151,181,212,243,273,304,334];
    var jy=(gy<=1600)?0:979;
    gy-=(gy<=1600)?621:1600;
    var gy2=(gm>2)?(gy+1):gy;
    var days=(365*gy) +(parseInt((gy2+3)/4)) -(parseInt((gy2+99)/100))
            +(parseInt((gy2+399)/400)) -80 +gd +g_d_m[gm-1];
    jy+=33*(parseInt(days/12053));
    days%=12053;
    jy+=4*(parseInt(days/1461));
    days%=1461;
    jy+=parseInt((days-1)/365);
    if(days > 365)days=(days-1)%365;
    var jm=(days < 186)?1+parseInt(days/31):7+parseInt((days-186)/30);
    var jd=1+((days < 186)?(days%31):((days-186)%30));
    return [jy,jm,jd];
}

/**
 * Convert Jalali date to Gregorian
 * 
 * @param {number} jy 
 * @param {number} jm 
 * @param {number} jd 
 */
function jalaliToGregorian(jy,jm,jd){
    if(!is_valid(jy, jm, jd))
        return [0, 0, 0]; 

    var gy=(jy<=979)?621:1600;
    jy-=(jy<=979)?0:979;
    var days=(365*jy) +((parseInt(jy/33))*8) +(parseInt(((jy%33)+3)/4))
            +78 +jd +((jm<7)?(jm-1)*31:((jm-7)*30)+186);
    gy+=400*(parseInt(days/146097));
    days%=146097;
    if(days > 36524){
        gy+=100*(parseInt(--days/36524));
        days%=36524;
        if(days >= 365)days++;
    }
    gy+=4*(parseInt((days)/1461));
    days%=1461;
    gy+=parseInt((days-1)/365);
    if(days > 365)days=(days-1)%365;
    var gd=days+1;
    var sal_a=[0,31,((gy%4==0 && gy%100!=0) || (gy%400==0))?29:28,31,30,31,30,31,31,30,31,30,31];
    var gm
    for(gm=0;gm<13;gm++){
        var v=sal_a[gm];
        if(gd <= v)break;
        gd-=v;
    }
    return [gy,gm,gd];
}

/**
 * Returns the Gregorian equivalent of the given unixTime
 * 
 * @param {number} ut
 */
function unixTimeToGregorianArray(ut) {
    if(ut == null || ut == '' || isNaN(ut) || ut < 1){
        console.log("There is a problem with the given unixtime \
                        (null, empty, NuN, 0 or negative): ", ut);

        return "";
    }
    ut = Number(ut);

    let gregorianDate = new Date(ut),
        year          = gregorianDate.getFullYear(),
        month         = gregorianDate.getMonth()+1,
        day           = gregorianDate.getDate(),
        hour          = gregorianDate.getHours(),
        mins          = gregorianDate.getMinutes(),
        secs          = gregorianDate.getSeconds();
        
    return [year, month, day, hour, mins, secs];
}

/**
 * Returns the Gregorian equivalent of the given unixTime
 * 
 * @param {number} ut 
 * @param {string} dateDelimeter 
 * @param {string} timeDelimiter 
 */
function unixTimeToGregorianString(ut, dateDelimeter, timeDelimiter) {
    let gregorian = unixTimeToGregorianArray(ut);

    if(gregorian === "")
        return "";
    
    dateDelimeter = dateDelimeter || "/";
    timeDelimiter = timeDelimiter || ":";

    var day     = gregorian[1],
        month   = gregorian[2],
        hour    = gregorian[3],
        mins    = gregorian[4],
        secs    = gregorian[5];

    day     = addZero(day);
    month   = addZero(month);
    hour    = addZero(hour);
    mins    = addZero(mins);
    secs    = addZero(secs);
    
    return gregorian[0] + dateDelimeter + day + dateDelimeter + 
            month + " " + hour + timeDelimiter + mins + timeDelimiter + secs;
}

/**
 * Returns the Gregorian Array equivalent of the given unixTime
 * 
 * @param {number} ut
 */
function unixTimeToJalaliArray(ut) {
    if(ut == null || ut == '' || isNaN(ut) || ut < 1){
        console.log("There is a problem with the given unixtime \
                        (null, empty, NaN, 0, or negative): ", ut);

        return "";
    }
    ut = Number(ut);

    let gregorianDate = new Date(ut),
        hour          = gregorianDate.getHours(),
        mins          = gregorianDate.getMinutes(),
        secs          = gregorianDate.getSeconds(),
        result        = gregorianToJalali(gregorianDate.getFullYear(),
                                            gregorianDate.getMonth()+1,
                                            gregorianDate.getDate());
    return [
                result[0],
                result[1],
                result[2],
                hour,
                mins,
                secs
           ];
}

/**
 * Returns the jalali equivalent of the given unixTime
 * 
 * @param {number} ut 
 * @param {string} dateDelimeter 
 * @param {string} timeDelimiter 
 */
function unixTimeToJalaliString(ut, dateDelimeter, timeDelimiter) {
    let jalali = unixTimeToJalaliArray(ut);

    if(jalali === "")
        return "";
    
    dateDelimeter = dateDelimeter || "/";
    timeDelimiter = timeDelimiter || ":";

    var month   = addZero(jalali[1]),
        day     = addZero(jalali[2]),
        hour    = addZero(jalali[3]),
        mins    = addZero(jalali[4]),
        secs    = addZero(jalali[5]);

    month   = addZero(month);
    day     = addZero(day);
    hour    = addZero(hour);
    mins    = addZero(mins);
    secs    = addZero(secs);
    
    return jalali[0] + dateDelimeter + month + dateDelimeter + day +
            " " + hour + timeDelimiter + mins + timeDelimiter + secs;
}

/**
 * Add zero to the beginning of a number if it is less than 10 and return the string
 * 
 * @param {number} number 
 */
function addZero(number) {
    if(typeof number === "number")
        return number < 10 ? "0" + number : number;
    else 
        return number;
}