const gulp = require('gulp');
const install = require('gulp-install');
const rename = require('gulp-rename');
const template = require('gulp-template');
const conflict = require('gulp-conflict');
const inquirer = require('inquirer');
const git = require('gulp-git');
const _ = require('underscore.string');

gulp.task('default', done => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: 'What is the type of component you will need?',
            choices: [
                { name: 'Stateful (Create a class and extends the React.Component)', value: 'stateful' },
                { name: 'Stateless (Pure function without state, backing instances or lifecycle methods)', value: 'stateless' }
            ]
        },
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
        if (false === answers.confirm) {
            console.error('Scaffolding canceled.');
            done();
            process.exit(1);
        }

        let files = [
            __dirname + '/templates/**/*'
        ];

        if ('circle' === answers.ci) {
            files.push('!' + __dirname + '/templates/_scrutinizer.yml');
            files.push('!' + __dirname + '/templates/_travis.yml');
        } else if ('travis' === answers.ci) {
            files.push('!' + __dirname + '/templates/_scrutinizer.yml');
            files.push('!' + __dirname + '/templates/circle.yml');
        } else {
            files.push('!' + __dirname + '/templates/_travis.yml');
            files.push('!' + __dirname + '/templates/circle.yml');
        }

        if ('stateless' === answers.type) {
            files.push('!' + __dirname + '/templates/*/{stateful,stateful/**}');
        } else {
            files.push('!' + __dirname + '/templates/*/{stateless,stateless/**}');
        }

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

                if (file.dirname == 'src/stateless' || file.dirname == 'src/stateful') {
                    file.dirname = 'src';
                }

                if (file.dirname == 'tests/stateless' || file.dirname == 'tests/stateful') {
                    file.dirname = 'tests';
                }
            }))
            .pipe(conflict('./', {
                defaultChoice: 'd'
            }))
            .pipe(gulp.dest('./'))
            .pipe(git.init({
                args: '--quiet'
            }))
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
