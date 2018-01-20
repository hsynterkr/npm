/* eslint-env mocha */

var expect = require('chai').expect
var Utopian = require('../api.js')
describe('Utopian Moderator Endpoint test', () => {
  it('Should return a JSON', () => {
    return Utopian.getModerators().then(function (data) {
      expect(data.total).to.be.an('number')
    })
  })
})

describe('Utopian Sponsor Endpoint test', () => {
  it('Should return a JSON', () => {
    return Utopian.getSponsors().then(function (data) {
      expect(data.total).to.be.an('number')
    })
  })
})

describe('Utopian Posts Endpoint test', () => {
  it('Should return a JSON', () => {
    return Utopian.getTotalPostCount().then(function (data) {
      expect(data).to.be.an('number')
    })
  })
})
