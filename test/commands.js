/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import { expect, assert } from 'chai';
import { Fetch } from '../src/command';
import Command from '../src/Command';

describe('Commands Tests', () => {
  describe('Class Command', () => {
    it('init object with empty action. throw type error', () => {
      assert.throw(function () {
        new Command()
      }, ReferenceError, 'Empty action string');
    });
    it('init object with empty params. throw type error', () => {
      assert.throw(function () {
        new Command('asds')
      }, ReferenceError, 'Empty params object');
    });
  });
  describe('Class FetchCommand', () => {
    it('init object with empty params', () => {
      assert.throw(function () {
        new Fetch()
      }, ReferenceError, 'Empty params object');
    });
  });
});
