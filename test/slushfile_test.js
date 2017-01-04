'use strict'

const join = require('path').join
const deleteDir = require('rimraf')
const gulp = require('gulp')
const inquirer = require('inquirer')
const mockirer = require('mockirer')
const mockGulpDest = require('mock-gulp-dest')(gulp)

const mocha = require('mocha')
const assert = require('assert')

const { it, describe, before, after, beforeEach } = mocha

require('../slushfile')

describe('react-component-generator', () => {
  before(() => {
    process.chdir(__dirname)
  })

  after((done) => {
    deleteDir(join(process.cwd(), '.git'), () => done())
  })

  describe('should be not created the files', () => {
    it('when not confirm', (done) => {
      mockirer(inquirer, { ci: 'travis', confirm: false })
      gulp.start('default').once('task_stop', () => {
        assert.equal(mockGulpDest.files().length, 0)
        done()
      })
    })
  })

  describe('default generator', () => {
    describe('should be created all continuous integration files', () => {
      it('scrutinizer', (done) => {
        mockirer(inquirer, {
          ci: 'scrutinizer',
          confirm: true,
          NPM_TOKEN: 'mock' // prevent ReferenceError: NPM_TOKEN is not defined from `gulp-template`
        })

        gulp.start('default').once('task_stop', () => {
          mockGulpDest.assertDestContains(['.scrutinizer.yml'])
          done()
        })
      })

      it('travis', (done) => {
        mockirer(inquirer, { ci: 'travis', confirm: true })

        gulp.start('default').once('task_stop', () => {
          mockGulpDest.assertDestContains(['.travis.yml'])
          done()
        })
      })

      it('circle', (done) => {
        mockirer(inquirer, { ci: 'circle', confirm: true })

        gulp.start('default').once('task_stop', () => {
          mockGulpDest.assertDestContains(['circle.yml'])
          done()
        })
      })
    })

    describe('should be created the default files', () => {
      beforeEach(() => {
        mockirer(inquirer, {
          name: 'slush-test',
          description: 'Unit tests',
          version: '1.0.0',
          ci: 'travis',
          confirm: true
        })
      })

      it('should be created the .github/ files', done => {
        gulp.start('default').once('task_stop', () => {
          mockGulpDest.assertDestContains([
            '.github/ISSUE_TEMPLATE.md',
            '.github/PULL_REQUEST_TEMPLATE.md'
          ])
          done()
        })
      })

      it('should be created the storybook/ files', done => {
        gulp.start('default').once('task_stop', () => {
          mockGulpDest.assertDestContains([
            'storybook/config.js',
            'storybook/webpack.config.js',
            'storybook/webpack.dist.config.js'
          ])
          done()
        })
      })

      it('should be created the src/ files with the correct name', done => {
        gulp.start('default').once('task_stop', () => {
          mockGulpDest.assertDestContains([
            'src/SlushTest.js',
            'src/SlushTest.css',
            'src/SlushTest.story.js'
          ])
          done()
        })
      })

      it('should be created the root path files', done => {
        gulp.start('default').once('task_stop', () => {
          mockGulpDest.assertDestContains([
            '.babelrc',
            '.editorconfig',
            '.gitignore',
            '.eslintrc.json',
            'contributing.md',
            'package.json',
            'README.md'
          ])
          done()
        })
      })
    })
  })
})
