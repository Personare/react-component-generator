const gulp = require('gulp');
const install = require('gulp-install');
const rename = require('gulp-rename');
const template = require('gulp-template');
const conflict = require('gulp-conflict');
const inquirer = require('inquirer');
const _ = require('underscore.string');

gulp.task('default', done => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'componentName',
            message: 'What is the name of component?'
        },
        {
            type: 'input',
            name: 'componentVersion',
            message: 'What is the version?',
            default: '0.1.0'
        }
    ]).then(answers => {
        if (!answers.componentName) {
            return done();
        }

        let files = [
            __dirname + '/templates/**/*'
        ];

        answers.componentName = _.humanize(answers.componentName);
        answers.componentSlugName = _.slugify(answers.componentName);

        return gulp.src(files)
            .pipe(template(answers))
            .pipe(rename(file => {
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                } else if (file.dirname[0] === '_') {
                    file.dirname = '.' + file.dirname.slice(1);
                }
            }))
            .pipe(conflict('./', {
                defaultChoice: 'd'
            }))
            .pipe(gulp.dest('./'))
            .pipe(install())
            .on('finish', function(){
                done();
            });
    });
});