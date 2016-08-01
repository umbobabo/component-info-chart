import 'babel-polyfill';
import InfoChart from '../src';
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme()).should();
describe('InfoChart', () => {
  it('renders a React element', () => {
    React.isValidElement(<InfoChart />).should.equal(true);
  });
});
