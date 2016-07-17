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
            name: 'name',
            message: 'What do you want to name your component?',
            default: getSuggestName()
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please, enter a description about that.'
        },
        {
            type: 'input',
            name: 'version',
            message: 'Version',
            default: '0.1.0'
        }
    ]).then(answers => {
        if (!answers.name) {
            return done();
        }

        let files = [
            __dirname + '/templates/**/*'
        ];

        answers.name = _.humanize(answers.name);
        answers.slugName = _.slugify(answers.name);

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

function getSuggestName () {
    return require('path').basename(process.cwd());
}