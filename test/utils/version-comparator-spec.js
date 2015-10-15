"use strict";

var VersionComparator = require('../../src/utils/version-comparator');

describe("VersionComparator test", () => {
    it("compare", () => {
        expect(VersionComparator.compare('1', '2')).toEqual(-1);
        expect(VersionComparator.compare('1', '1')).toEqual(0);
        expect(VersionComparator.compare('1', '0')).toEqual(1);
    });
});
