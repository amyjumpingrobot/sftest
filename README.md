# Salesforce UX Angular Foundation

You'll need to have [node.js](http://nodejs.org) and CoffeeScript (`sudo npm install -g coffee-script`) installed.

## Setup

    $ git clone https://github.com/salesforce-ux/ng-foundation.git
    $ cd ng-foundation
    $ npm install .
    $ grunt

The grunt task will never finish since it is watching the source files.
`Ctrl-c` to cancel.

## Test in Canary

    $ make canary
    $ coffee app.coffee

Open [localhost:5000](http://localhost:5000) in [Canary](https://www.google.com/intl/en/chrome/browser/canary.html).

Whenever a source file changes Canary should refresh automatically.

## Source

- HTML: `src/index.html`
- JavaScript: `src/javascript/main.js`
- Sass: `src/sass/styles.scss`
- Directives: `src/html/**`
- Assets: `assets/**`

## License

[BSD 2-Clause License](LICENSE)