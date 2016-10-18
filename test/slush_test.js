'use strict'

const chai = require('chai')
const inquirer = require('inquirer')
const mockirer = require('mockirer')

const mocha = require('mocha')
const describe = mocha.describe
const before = mocha.before
const beforeEach = mocha.beforeEach

chai.should()

require('../slushfile')

describe('react-component-generator', () => {
  before(() => {
    process.chdir(__dirname)
  })

  describe('should work with confirm answers', () => {
    beforeEach(() => {
      mockirer(inquirer, {
        name: 'unit',
        description: 'Simple test',
        version: '0.1.0',
        ci: 'scrutinizer',
        confirm: true
      })
    })
  })
})
