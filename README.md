# React Component Generator

> A slush generator for create a React component in isolation

The idea of creating this generator components was based on the design structure them in isolation. Where **we believe** the web should be built this way. It is customized based on some current needs and preferences of Personare but you can easily change. 

Feel free to suggest improvements =]

## How we made

To define the structure we use an internal process called **DSS** (Design Structure Sprint) that through a short sprint it allows us to stay focused and aligned with the solution. 

#### Environment

[React Storybook](https://github.com/kadirahq/react-storybook) - *to tell stories with different behaviors of the component and provide an example page.*

#### Style Guide

- [EditorConfig](http://editorconfig.org/) - *standardize some general settings among multiple editors*
- [ESLint](http://eslint.org/) - *for reporting the patterns of code*
  - **Plugins**
  - [React](https://github.com/yannickcr/eslint-plugin-react)
  - [Snazzy](https://github.com/feross/snazzy)
  - [Standard](https://github.com/feross/standard)
  - [Standard Loader](https://github.com/timoxley/standard-loader)

#### Tests
- [Jest](https://facebook.github.io/jest/) - *test framework*
  
#### Compiler

- [babel](https://babeljs.io/)
  - **Plugins**
    - [ES2015](https://www.npmjs.com/package/babel-preset-es2015)
    - [stage-0](https://www.npmjs.com/package/babel-preset-stage-0)
    - [babel-jest](https://www.npmjs.com/package/babel-jest)
    - [React](https://www.npmjs.com/package/babel-preset-react)

### The structure

```bash
├── .babelrc
├── .editorconfig
├── .eslintrc.json
├── .github
│   ├── ISSUE_TEMPLATE.md
│   └── PULL_REQUEST_TEMPLATE.md
├── .gitignore
├── .scrutinizer.yml | .travis.yml | circle.yml
├── .storybook
│   ├── config.js
│   ├── webpack.config.js
│   └── webpack.dist.config.js
├── README.md
├── contributing.md
├── package.json
├── src
│   ├── MyFirstComponent.css
│   ├── MyFirstComponent.js
│   └── MyFirstComponent.story.js
└── tests
    ├── MyFirstComponent.test.js
    └── mock-browser.js
```

## Installation

- Requirements
  1. [Node >= 6.0](https://nodejs.org/en/)
  2. [Slush](http://slushjs.github.io/#/)

After install the requirements, run the following command:

```bash
[sudo] npm i -g @personare/slush-react-component-generator
```

## Usage

Create a new folder for your project:
```bash
mkdir my-first-component && cd my-first-component
```

Run the generator:
```bash
slush react-component-generator
```

## Team

This generator was made with love by [contributors](https://github.com/Personare/react-component-generator/graphs/contributors).

### Creator

[![Profile image of Cauê Alves](https://s.gravatar.com/avatar/00ef47231ad53e5a68e4524bfdb0ecf2?s=70)](https://github.com/cauealves) |
--- | --- | --- | --- | --- | --- | ---
[Cauê Alves](https://github.com/cauealves) |

### Participated in sprint

[![Profile image of Pedro Gustavo](https://s.gravatar.com/avatar/dae75a24d5c3a99827277cdc42390722?s=70)](https://github.com/pedrogustavo) | [![Profile image of Abilio Bittencurt](https://s.gravatar.com/avatar/9406e384856a497e7239669a2d90046f?s=70)](https://github.com/antigui22)
--- | --- | --- | --- | --- | --- | ---
[Pedro Gustavo](https://github.com/pedrogustavo) | [Abilio Bittencourt](https://github.com/antigui22)

## License

[MIT © Personare](./LICENSE)
