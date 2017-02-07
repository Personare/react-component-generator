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

gulp.task('default', () => {
  return new Promise((resolve, reject) => {
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
    ]).then((answers) => {
      if (answers.confirm === false) {
        return reject()
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

      const isToAddReactPrefix = (
        answers.name.indexOf('react-') === -1 ||
        answers.name.indexOf('react-') !== 0
      )

      answers.name = _.humanize(answers.name)
      answers.slugName = _.slugify(answers.name)

      if (isToAddReactPrefix) {
        answers.slugName = 'react-' + answers.slugName
      }

      answers.camelName = _.camelize(answers.name)
      answers.NPM_TOKEN = process.env.NPM_TOKEN || 'PLEASE_ADD_A_TOKEN'

      git.init({ args: '--quiet' })

      return gulp.src(files)
        .pipe(template(answers))
        .on('error', (error) => console.log('template(answers) error:', error))
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
        .on('error', (error) => console.log('rename(file) error:', error))
        .pipe(conflict('./', { defaultChoice: 'd' }))
        .on('error', (error) => console.log('conflict error:', error))
        .pipe(gulp.dest('./'))
        .on('error', (error) => console.log('gulp.dest error:', error))
        .on('finish', () => resolve())
        .resume()
    })
  })
})
