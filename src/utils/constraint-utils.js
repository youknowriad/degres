"use strict";

var VersionComparator = require('./version-comparator');
var ArrayUtils = require('./array-utils');

class ConstraintUtils {
    static doIntersect(constraint1, constraint2) {
        return VersionComparator.compare(constraint1.max, constraint2.min) > 0
            && VersionComparator.compare(constraint1.min, constraint2.max) < 0;
    }

    static intersect(constraint1, constraint2) {
        return {
            min: VersionComparator.compare(constraint1.min, constraint2.min) > 0 ? constraint1.min : constraint2.min,
            max: VersionComparator.compare(constraint1.max, constraint2.max) < 0 ? constraint1.max : constraint2.max
        }
    }

    static merge(constraints1, constraints2) {
        constraints1 = constraints1 || {};
        constraints2 = constraints2 || {};
        var newConstraints = {};
        ArrayUtils.union(Object.keys(constraints1), Object.keys(constraints2)).forEach(project => {
            if (!constraints1[project]) {
                newConstraints[project] = constraints2[project];
            } else if (!constraints2[project]) {
                newConstraints[project] = constraints1[project];
            } else {
                newConstraints[project] = ConstraintUtils.intersect(constraints1[project], constraints2[project]);
            }
        });

        return newConstraints;
    }
}

module.exports = ConstraintUtils;
