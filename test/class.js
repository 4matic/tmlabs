/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import { expect } from 'chai';
import TmLabs from '../src/index';

describe('Class Tests', () => {
  describe('Main class object initialization', () => {
    it('Empty constructor', () => {
      const tmLabs = new TmLabs();
      expect(tmLabs).to.not.be.null;
    });
    describe('Constructor Fail data', () => {
      ([false, null, undefined, '']).forEach((data) => {
        it(`Constructor data=${JSON.stringify(data)}`, () => {
          const tmLabs = new TmLabs(data);
          expect(tmLabs).to.not.be.null;
        });
      });
    });
  });
});
