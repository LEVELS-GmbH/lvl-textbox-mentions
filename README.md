# Textbox Mentions
[![Build Status](https://travis-ci.org/jeffersonsouza/textbox-mentions.svg?branch=master)](https://travis-ci.org/jeffersonsouza/textbox-mentions)
[![codecov](https://codecov.io/gh/jeffersonsouza/textbox-mentions/branch/master/graph/badge.svg)](https://codecov.io/gh/jeffersonsouza/textbox-mentions)
[![npm version](https://badge.fury.io/js/textbox-mentions.svg)](http://badge.fury.io/js/textbox-mentions)
[![devDependency Status](https://david-dm.org/jeffersonsouza/textbox-mentions/dev-status.svg)](https://david-dm.org/jeffersonsouza/textbox-mentions?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/jeffersonsouza/textbox-mentions.svg)](https://github.com/jeffersonsouza/textbox-mentions/issues)
[![GitHub stars](https://img.shields.io/github/stars/jeffersonsouza/textbox-mentions.svg)](https://github.com/jeffersonsouza/textbox-mentions/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jeffersonsouza/textbox-mentions/master/LICENSE)

## Demo
https://jeffersonsouza.github.io/textbox-mentions/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## About

Angular mentions for textarea fields.

## Installation

Install through npm:
```
npm install --save textbox-mentions
```

Then include in your apps module:

```typescript
import { NgModule } from '@angular/core';
import { TextboxMentionsModule } from 'textbox-mentions';

@NgModule({
  imports: [
    TextboxMentionsModule.forRoot()
  ]
})
export class MyModule {}
```

Finally use in one of your apps components:
```typescript
import { Component } from '@angular/core';

@Component({
  template: '<hello-world></hello-world>'
})
export class MyComponent {}
```

You may also find it useful to view the [demo source](https://github.com/jeffersonsouza/textbox-mentions/blob/master/demo/demo.component.ts).

## Documentation
All documentation is auto-generated from the source via [compodoc](https://compodoc.github.io/compodoc/) and can be viewed here:
https://jeffersonsouza.github.io/textbox-mentions/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and [yarn](https://yarnpkg.com/en/docs/install)
* Install local dev dependencies: `yarn` while current directory is this repo

### Development server
Run `yarn start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `yarn test` to run tests once or `yarn run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
yarn run release
```

## License

MIT
