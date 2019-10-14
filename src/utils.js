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

module.exports = { isNumber, isInteger }
