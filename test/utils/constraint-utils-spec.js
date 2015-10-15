"use strict";

var ConstraintUtils = require('../../src/utils/constraint-utils');

describe("ConstraintUtils test", () => {
    it("doIntersect", () => {
        expect(ConstraintUtils.doIntersect({ min: '1', max: '2' }, { min: '3', max: '4' })).toEqual(false);
        expect(ConstraintUtils.doIntersect({ min: '1', max: '2' }, { min: '2', max: '3' })).toEqual(false);
        expect(ConstraintUtils.doIntersect({ min: '1', max: '3' }, { min: '2', max: '4' })).toEqual(true);
        expect(ConstraintUtils.doIntersect({ min: '1', max: '4' }, { min: '2', max: '3' })).toEqual(true);
    });

    it("intersect", () => {
        expect(ConstraintUtils.intersect({ min: '1', max: '3' }, { min: '2', max: '4' })).toEqual({ min: '2', max: '3' });
        expect(ConstraintUtils.intersect({ min: '1', max: '4' }, { min: '2', max: '3' })).toEqual({ min: '2', max: '3' });
    });


    it("merge", () => {
        let constraints1 = {
            a: { min: '1', max: '3' },
            b: { min: '2', max: '4' }
        };
        let constraints2 = {
            b: { min: '1', max: '3' },
            c: { min: '2', max: '4' }
        };

        expect(ConstraintUtils.merge(constraints1)).toEqual(constraints1);
        expect(ConstraintUtils.merge(undefined, constraints1)).toEqual(constraints1);
        expect(ConstraintUtils.merge(constraints1, constraints2)).toEqual({
            a: { min: '1', max: '3' },
            b: { min: '2', max: '3' },
            c: { min: '2', max: '4' }
        });
    });
});
