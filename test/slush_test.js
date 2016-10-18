'use strict'

const gulp = require('gulp')
const inquirer = require('inquirer')
const mockirer = require('mockirer')
const mockGulpDest = require('mock-gulp-dest')(gulp)

const mocha = require('mocha')
const it = mocha.it
const describe = mocha.describe
const before = mocha.before
const beforeEach = mocha.beforeEach

require('../slushfile')

describe('react-component-generator', () => {
  before(() => {
    process.chdir(__dirname)
  })

  describe('default answers', () => {

    describe('should be created the continuous integration files', () => {

      it('scrutinizer', done => {
        mockirer(inquirer, {
          ci: 'scrutinizer',
          confirm: true
        })

        gulp.start('default').once('stop', () => {
          mockGulpDest.assertDestContains([
            '.scrutinizer.yml'
          ])
          done()
        })
      })

      it('travis', done => {
        mockirer(inquirer, {
          ci: 'travis',
          confirm: true
        })

        gulp.start('default').once('stop', () => {
          mockGulpDest.assertDestContains([
            '.travis.yml'
          ])
          done()
        })
      })

      it('circle', done => {
        mockirer(inquirer, {
          ci: 'circle',
          confirm: true
        })

        gulp.start('default').once('stop', () => {
          mockGulpDest.assertDestContains([
            'circle.yml'
          ])
          done()
        })
      })
    })

  })
})
