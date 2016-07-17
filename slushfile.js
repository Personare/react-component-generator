'use strict';

const gulp = require('gulp');
const install = require('gulp-install');
const rename = require('gulp-rename');
const template = require('gulp-template');
const inquirer = require('inquirer');
const _ = require('underscore.string');

gulp.task('default', done => {
    let prompts = [
        {
            name: 'componentName',
            message: 'What is the name of component?'
        },
        {
            name: 'componentVersion',
            message: 'What is the version?',
            default: '0.1.0'
        }
    ];

    inquirer.prompt(prompts, answers => {
        let files = [
            __dirname + '/templates/**'
        ];

        if (!answers.componentName) {

            return done();
        }

        answers.componentName = _.humanize(answers.componentName);
        answers.componentSlugName = _.slugify(answers.componentName);

        gulp.src(files)
            .pipe(template(answers))
            .pipe(rename(file => {
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                }
            }))
            .pipe(conflict('./'))
            .pipe(gulp.dest('./'))
            .pipe(install())
            .on('end', () => {
                done();
            });
    });
});