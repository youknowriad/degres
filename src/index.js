"use strict";

var data = require('../config/data');
var Graph = require('./model/graph');
var Resolver = require('./resolver/resolver');

var graph = new Graph(data);
var output = Resolver.resolve(graph);

console.log("output : ", output);
