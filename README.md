# Generator React Component

> A slush generator for create a React component in isolation

The idea of creating this generator components was based on the design structure them in isolation. Where **we believe** the web should be built this way. It is customized based on some current needs and preferences of Personare but you can easily change. 

Feel free to suggest improvements =]

## How we made

### The structure

```bash
├── .babelrc
├── .editorconfig
├── .eslintrc.json
├── .gitignore
├── .scrutinizer.yml | .travis.yml | circle.yml
├── .storybook
│   └── config.js
├── README.md
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
[sudo] npm i -g @Personare/slush-generator-react-component
```

## Usage

Create a new folder for your project:
```bash
mkdir my-first-component && cd my-first-component
```

Run the generator:
```bash
slush generator-react-component
```

## Team

This generator was made with love by [contributors](https://github.com/Personare/generator-react-component/graphs/contributors).

### Creator

[![Profile image of Cauê Alves](https://s.gravatar.com/avatar/00ef47231ad53e5a68e4524bfdb0ecf2?s=70)](https://github.com/cauealves) |
--- | --- | --- | --- | --- | --- | ---
[Cauê Alves](https://github.com/cauealves) |

## License

MIT © [Personare](http://www.personare.com.br)
