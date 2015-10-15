"use strict";

class ArrayUtils {
    static union(x, y) {
        var obj = {};
        for (var i = x.length-1; i >= 0; -- i)
            obj[x[i]] = x[i];
        for (var j = y.length-1; j >= 0; -- j)
            obj[y[j]] = y[j];
        var res = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k))  // <-- optional
                res.push(obj[k]);
        }
        return res;
    }
}

module.exports = ArrayUtils;
