isNumber = (str) => {
    return !isNaN(str) && (str !== '');
}

isInteger = (str) => {
    if (!isNumber(str)) {
        return false;
    }
    let n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}

fixedLengthStr = (str, len) => {
    if (str.length <= len) {
        return str.padEnd(len);
    }
    if (len < 4) {
        return str.slice(0, len);
    }
    truncateStr = str.slice(0, len-3) + '...'
    return truncateStr;
}

strFormatter = (arr, lenArr) => {
    res = '';
    for (let i = 0; i < arr.length; i++) {
        res += fixedLengthStr(arr[i], lenArr[i]);
    }
    return res;
}

module.exports = { isNumber, isInteger, strFormatter }
