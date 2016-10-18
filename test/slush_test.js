'use strict';

const gulp = require('gulp');
const chai =  require('chai');
const mocha = require('mocha');
const inquirer = require('inquirer');
const mockirer = require('mockirer');
const mockGulpDest = require('mock-gulp-dest')(gulp);

chai.should();

require('../slushfile');

describe('react-component-generator', function() {
    before(function() {
      process.chdir(__dirname);
    });

    describe('should work with confirm answers', function(){
      beforeEach(() => {
        mockirer(inquirer, {
          name: 'unit',
          description: 'Simple test',
          version: '0.1.0',
          ci: 'scrutinizer',
          confirm: true
        })
      })
    });
});
