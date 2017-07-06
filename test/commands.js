/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import { expect, assert } from 'chai';
import { Fetch as FetchCommand } from '../src/command';
import Command from '../src/Command';

describe('Commands Tests', () => {
  describe('Class Command', () => {
    it('init object with empty action. throw type error', () => {
      assert.throw(function () {
        new Command()
      }, ReferenceError, 'Empty action string argument');
    });
    it('init object with invalid action type. throw type error', () => {
      assert.throw(function () {
        new Command({})
      }, ReferenceError, 'Invalid action type');
    });
    it('init object with empty params. throw type error', () => {
      assert.throw(function () {
        new Command('asds')
      }, ReferenceError, 'Empty params object argument');
    });
    it('init object with invalid params type. throw type error', () => {
      assert.throw(function () {
        new Command('asds', 'test')
      }, ReferenceError, 'Invalid params type');
    });
    it('init object with empty options. throw type error', () => {
      assert.throw(function () {
        new Command('asds', {})
      }, ReferenceError, 'Empty params object');
    });
    it('init object with invalid action. throw type error', () => {
      assert.throw(function () {
        new Command('asds', {
          url: '',
        })
      }, ReferenceError, 'Action not found');
    });
    // it('init object with valid action and empty required param', () => {
    //   assert.throw(function () {
    //     new Command('fetch', {
    //       method: '',
    //     })
    //   }, TypeError, 'Empty required param \'method\'');
    // });
    it('init object with valid action and required params', () => {
      assert.doesNotThrow(() => {
        new Command('fetch', {})
      }, ReferenceError, 'Action not found');
      let command = new Command('fetch', {
        method: 'ip',
      });
      assert.instanceOf(command.instance, FetchCommand, 'command instance is an instance of FetchCommand');
    });
  });
  describe('Class FetchCommand', () => {
    it('init object with empty params', () => {
      assert.throw(function () {
        new FetchCommand()
      }, ReferenceError, 'Empty params object');
    });
  });
});
