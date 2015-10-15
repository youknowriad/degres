"use strict";

var ArrayUtils = require('../../src/utils/array-utils');

describe("ArrayUtils test", () => {
    it("union", () => {
        expect(ArrayUtils.union(['a', 'b'], ['c'])).toEqual(['b', 'a', 'c']);
        expect(ArrayUtils.union(['a', 'b'], ['a', 'c'])).toEqual(['b', 'a', 'c']);
        expect(ArrayUtils.union([], ['a', 'c'])).toEqual(['c', 'a']);
    });
});
