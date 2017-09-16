const { expect } = require('chai');
const plugin = require('../src');

describe('mysam-ui', () => {
  it('basic functionality', () => {
    expect(typeof plugin).to.equal('function', 'It worked');
    expect(plugin()).to.equal('mysam-ui');
  });
});
