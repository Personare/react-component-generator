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
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: 'It\'s all correct?'
        }
    ]).then(answers => {
        if (false === answers.confirm) {
            console.error('Scaffolding canceled.');
            done();
            process.exit(1);
        }

        let files = [
            __dirname + '/templates/**/*'
        ];

        answers.name = _.humanize(answers.name);
        answers.slugName = 'react-' + _.slugify(answers.name);
        answers.camelName = _.camelize(answers.name);

        return gulp.src(files)
            .pipe(template(answers))
            .pipe(rename(file => {
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                } else if (file.dirname[0] === '_') {
                    file.dirname = '.' + file.dirname.slice(1);
                }

                if (file.basename.indexOf('MyComponent') > -1) {
                    file.basename = file.basename.replace('MyComponent', answers.camelName);
                }
            }))
            .pipe(conflict('./', {
                defaultChoice: 'd'
            }))
            .pipe(gulp.dest('./'))
            .pipe(install())
            .on('finish', function(){
                done();
            })
            .resume();
    });
});

function getSuggestName () {
    return require('path').basename(process.cwd());
}