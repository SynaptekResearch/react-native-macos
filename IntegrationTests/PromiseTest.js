/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

var React = require('React');
var ReactNative = require('react-native-macos');
var { View } = ReactNative;
var { TestModule } = ReactNative.NativeModules;

var PromiseTest = React.createClass({
  shouldResolve: false,
  shouldReject: false,
  shouldSucceedAsync: false,
  shouldThrowAsync: false,

  componentDidMount() {
    Promise.all([
      this.testShouldResolve(),
      this.testShouldReject(),
      this.testShouldSucceedAsync(),
      this.testShouldThrowAsync(),
    ]).then(() => TestModule.markTestPassed(
      this.shouldResolve && this.shouldReject &&
      this.shouldSucceedAsync && this.shouldThrowAsync
    ));
  },

  testShouldResolve() {
    return TestModule
      .shouldResolve()
      .then(() => this.shouldResolve = true)
      .catch(() => this.shouldResolve = false);
  },

  testShouldReject() {
    return TestModule
      .shouldReject()
      .then(() => this.shouldReject = false)
      .catch(() => this.shouldReject = true);
  },

  async testShouldSucceedAsync() : Promise {
    try {
      await TestModule.shouldResolve();
      this.shouldSucceedAsync = true;
    } catch (e) {
      this.shouldSucceedAsync = false;
    }
  },

  async testShouldThrowAsync() : Promise {
    try {
      await TestModule.shouldReject();
      this.shouldThrowAsync = false;
    } catch (e) {
      this.shouldThrowAsync = true;
    }
  },

  render() : ReactElement {
    return <View />;
  }

});

PromiseTest.displayName = 'PromiseTest';

module.exports = PromiseTest;
