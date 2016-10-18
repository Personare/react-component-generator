'use strict'

const path = require('path')
const gulp = require('gulp')
const rename = require('gulp-rename')
const template = require('gulp-template')
const conflict = require('gulp-conflict')
const inquirer = require('inquirer')
const git = require('gulp-git')
const _ = require('underscore.string')

function getSuggestName () {
  return path.basename(process.cwd())
}

gulp.task('default', done => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What do you want to name your component?',
      default: getSuggestName()
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please, enter a description about that.',
      default: ''
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version',
      default: '1.0.0'
    },
    {
      type: 'list',
      name: 'ci',
      message: 'What Continuous Integration do you want to use?',
      default: 'scrutinizer',
      choices: [
        { name: 'Scrutinizer', value: 'scrutinizer' },
        { name: 'Travis', value: 'travis' },
        { name: 'Circle', value: 'circle' }
      ]
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'It\'s all correct?'
    }
  ]).then(answers => {
    if (answers.confirm === false) {
      console.error('Scaffolding canceled.')
      done()
      process.exit(1)
    }

    let files = [
      path.join(__dirname, 'templates', '**'),
      `!${path.join(__dirname, 'templates', 'src')}`
    ]

    if (answers.ci === 'circle') {
      files.push(`!${path.join(__dirname, 'templates', '_scrutinizer.yml')}`)
      files.push(`!${path.join(__dirname, 'templates', '_travis.yml')}`)
    } else if (answers.ci === 'travis') {
      files.push(`!${path.join(__dirname, 'templates', '_scrutinizer.yml')}`)
      files.push(`!${path.join(__dirname, 'templates', 'circle.yml')}`)
    } else {
      files.push(`!${path.join(__dirname, 'templates', '_travis.yml')}`)
      files.push(`!${path.join(__dirname, 'templates', 'circle.yml')}`)
    }

    answers.name = _.humanize(answers.name)
    answers.slugName = 'react-' + _.slugify(answers.name)
    answers.camelName = _.camelize(answers.name)

    git.init({ args: '--quiet' })

    return gulp.src(files)
      .pipe(template(answers))
      .pipe(rename(file => {
        if (file.basename[0] === '_') {
          file.basename = '.' + file.basename.slice(1)
        } else if (file.dirname[0] === '_') {
          file.dirname = '.' + file.dirname.slice(1)
        }

        if (file.basename.indexOf('MyComponent') > -1) {
          file.basename = file.basename.replace('MyComponent', answers.camelName)
        }
      }))
      .pipe(conflict('./', {
        defaultChoice: 'd'
      }))
      .pipe(gulp.dest('./'))
      .on('finish', function () {
        done()
      })
      .resume()
  })
})
