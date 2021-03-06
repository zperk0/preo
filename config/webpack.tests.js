// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.

import 'angular';
import 'angular-mocks/angular-mocks';

import '../client/app/vendor';
import '../client/app/app';

var testsContext = require.context("../client/app", true, /.test.js$/);
// var testsContext = require.context("../client/app/features/main/dashboard/outlets", true, /.test.js$/);
testsContext.keys().forEach(testsContext);
