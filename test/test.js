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

describe('Utopian Posts by Author Function test', () => {
  it('Should return a JSON', () => {
    return Utopian.getPostByAuthor('ms10398').then(function (data) {
      expect(data.total).to.be.an('number')
    })
  })
})

describe('Utopian Post URL Function test', () => {
  it('Should return a string', () => {
    return Utopian.getPostURL('26763950').then(function (data) {
      expect(data).to.be.a('string')
    })
  })
})

describe.only('Utopian Project Posts by Github Repository Name test', () => {
  it('Should return a JSON', () => {
    return Utopian.getPostsByGithubProject('utopian-io/utopian-api-npm', {
      limit: 1
    }).then(data => {
      expect(data.results.length).to.equal(1)
      expect(data.total).to.be.an('number')
    })
  })
})
