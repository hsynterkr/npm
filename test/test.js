/* eslint-env mocha */

const expect = require('chai').expect
const Utopian = require('../api.js')

const TEST_TIMEOUT_MS = 3000

describe('Utopian', function () {
  this.timeout(TEST_TIMEOUT_MS)

  describe('Moderator Endpoint test', () => {
    it('Should return a JSON', () => {
      return Utopian.getModerators().then(function (data) {
        expect(data.total).to.be.an('number')
      })
    })
  })

  describe('Sponsor Endpoint test', () => {
    it('Should return a JSON', () => {
      return Utopian.getSponsors().then(function (data) {
        expect(data.total).to.be.an('number')
      })
    })
  })

  describe('Posts Endpoint test', () => {
    it('Should return a JSON', () => {
      return Utopian.getTotalPostCount().then(function (data) {
        expect(data).to.be.an('number')
      })
    })
  })

  describe('Posts by Author Function test', () => {
    it('Should return a JSON', () => {
      return Utopian.getPostByAuthor('ms10398').then(function (data) {
        expect(data.total).to.be.an('number')
      })
    })
  })

  describe('Post URL Function test', () => {
    it('Should return a string', () => {
      return Utopian.getPostURL('26763950').then(function (data) {
        expect(data).to.be.a('string')
      })
    })
  })

  describe('Project Posts by Github Repository Name test', () => {
    it('Should return a JSON', () => {
      return Utopian.getPostsByGithubProject('utopian-io/utopian-api-npm', {
        limit: 1
      }).then(data => {
        expect(data.results.length).to.equal(1)
        expect(data.total).to.be.an('number')
      })
    })
  })
})
