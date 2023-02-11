# Web Boilerplate

All the directory structure, dev tools, boilerplate, and pipeline stuff that I find myself doing every time I make a new web app. This is a template repo from which you can build your own app.

## Tech Stack

In approximate order of significance:

- [TypeScript](https://www.typescriptlang.org/)
  - All code except the `scripts/` directory and some configuration files are to be written in TypeScript instead of JavaScript.
- [React](https://reactjs.org/)
  - Always use functional components and hooks.
  - Version 18 here, but downgradable if necessary. You may run into issues with peer dependencies when trying to downgrade. You'll have to force npm to install the desired version, or remove a couple packages, downgrade, and reinstall them.
- [Express](http://expressjs.com/)
  - Not much to say here. See [project structure](#project-structure) below for more details on how server code is organized.
- [React Context](https://beta.reactjs.org/reference/react/useContext) (as primary global state management)
  - The `useContext` and `useReducer` hooks are used to keep track of app-level state. You can define actions in `client/js/context/actions/` and dispatch them from any component to update the context.
  - Also included is a special reducer which can run middlewares, and a middleware for handling thunks, actions which are functions so that you can, for example, do an api call between calling `dispatch` and updating state.
  - Multiple stores using different chains of middlewares can be used in the same app.
- [Webpack](https://webpack.js.org/)
  - Comes fully configured for typescript, babel, and less in separate development and production builds
  - In development, typescript files include source maps and hot module replacement
- [Babel](https://babeljs.io/)
  - `.babelrc` is picked up by webpack and comes with react preset, but fairly rudimentary as-is.
- [Less](https://lesscss.org/)
  - For styling with imports/variables/etc...
  - Strongly prefer all styles to go in less files in `client/css/`, and only set class names in code.
  - Easily swapped out for sass or scss other by modifying `webpack.common.js`.
- [Jest](https://jestjs.io/)
  - All tests go in a parallel folder structure within `test/`.
  - Separately configured for client and server.
  - Uses `ts-jest`, so code can be imported directly as TypeScript.
- [ts-standard](https://github.com/standard/ts-standard#readme)
  - An extremely opinionated linter. Sometimes frustrating in how oppressive it is, but for good reason.
- [Webpack Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/)
  - Also necessarily including `webpack-dev-middleware`
    - All client-side code is compiled by webpack into memory, and served from memory instead of disk, so there is no need to build before running.
    - Only imported in development environment
  - Will watch for changes in the `client/` directory and if any are detected, will recompile into code and send the updated code to the client automatically, meaning as soon as you save a file, the updates will be reflected in your browser instantly without restarting the server or refreshing.
- [Husky](https://typicode.github.io/husky/#/)
  - A tool for easily managing git hooks so they can be checked in per-repository and enforce, for example, running tests and linting in a pre-commit hook.
- [Winston](https://github.com/winstonjs/winston#readme)
  - Includes a built-in logger already configured for http logging.
- [Docker](https://docs.docker.com/get-started/overview/)
  - Just a Dockerfile doing the bare minimum, but a good reference and foundation.

## Project Structure

Below is a layout of the directory tree with quick one-liners for the various folders and files included. Some files are scaffolding and some are examples. Modify and delete at your will, but it may be worth keeping even some of the example code around for reference until you've effectively replaced it.

```
/
├── .husky/                       Scripts run as git hooks (see Husky docs)
│   └── pre-commit                Runs tests and linter
├── client/                       
│   ├── css/                      All styles go here, not in the components
│   │   └── components/           Try to separate styles by component
│   ├── js/
│   │   ├── components/           Reusable components
│   │   ├── context/              Context providers
│   │   │   ├── actions/          Actions used to indicate state changes in the app
│   │   │   │   └── Action.ts     A class definition of an Action which actions should extend
│   │   │   ├── middlewares/      Middlewares to handle actions before the reducer is called
│   │   │   └── reducers/         Reducers to modify context based on actions
│   │   ├── hooks/                Any custom React hooks you want to use
│   │   ├── lib/                  Client-side code not directly related to rendering
│   │   ├── routes/               Pages to be plugged into the router
│   │   ├── types/                Type definitions for the client
│   │   ├── App.tsx               Maps routes to components with `react-router-dom`
│   │   └── index.tsx             Attaches context providers
│   ├── public/                   Static resources like images
│   │   └── index.html            The html file the app will be rendered into
│   └── tsconfig.json             Client-side TypeScript config
├── config/                       Configuration files for malleable but permanent data
├── scripts/                      Any scripts too complex for package.json
├── server/
│   ├── controllers/              Behaviors to be attached to routes
│   ├── lib/                      Code or modules required by the server which are
│   │                             too big or complex for controllers/ or utils/
│   ├── middleware/               Any custom middleware
│   │   ├── errorLogger.ts        Logs uncaught errors during a request
│   │   └── httpLogger.ts         Logs incoming requests and info about their responses
│   ├── routes/                   Routes attach controllers to paths
│   ├── services/                 Interfaces for interacting with anything not in this codebase
│   │                             (REST api wrappers, database access, etc...)
│   ├── util/                     Pure, reusable functions
│   │   └── logger.ts             A Winston logger (see docs and/or look at examples in this repo)
│   └── index.ts                  Starts the server, attaches middleware and routes
├── test/                         Tests structured in the same manner as the project
├── .babelrc
├── .dockerignore
├── .env                          Environment config (create this yourself from example.env)
│                                 for NODE_ENV, database url, credentials, etc...
├── .gitignore
├── Dockerfile                    Very barebones for creating docker containers
├── index.ts                      Loads the environment config and starts the server
│                                 This is where you'd spawn any other necessary
│                                 processes that are separate from the server
├── package-lock.json
├── package.json
├── README.md                     Hello
├── tsconfig.base.json            Common Typescript configuration between the server and client
├── tsconfig.json                 Server-side Typescript config (does NOT affect client/)
├── webpack.common.js             Common webpack configuration
├── webpack.dev.js                Dev-specific webpack config
└── webpack.prod.js               Production webpack config
```

## Usage

Remember to create a `.env` file with `NODE_ENV` set to `development`. Otherwise you'll probably have build issues, or at the very least you won't get things like hot module replacement and debug logging. The `.env` file shouldn't be committed, it should be used for configuration specific to the system running the server. You should also go through `package.json` and make sure all the fields are filled and correct.

This entire repository is nothing but a manifestation of my opinions, so feel free to disagree with, tweak, or embrace anything. You could even fork it and make your own.

### Import/Export Pattern

When you're in a directory that exports an arbitrary number of similar things, you should not use default exports. This may sound questionable at first, but it enforces stricter conventions when it comes to importing. A directory should have an `index.ts` file which re-exports all the other stuff in its directory. Then another file can import the whole group of related functions and objects, and destructure them out of the imported object. For example, this
```ts
import { Button, Checkbox, Card } from '../components'
import { base64Encode, base64Decode, isUnicorn } from '../util'
```
is more convenient and readable than this
```ts
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import Card from '../components/Card'
import base64Encode from '../util/base64Encode'
import base64Decode from '../util/base64Decode'
import isUnicorn from '../util/isUnicorn'
```

Another benefit is that the names of exported objects are enforced. Someone can't accidentally `import Buton from '../components/Button` anymore because `import { Buton } from '../components'` will fail.

### Scripts

This section is for the scripts in `package.json`.

Project management
- `postinstall` - Sets up `husky` on `npm install`
- `clean` - Removes build files
- `clean:all` - Removes build files, node modules, and Husky scripts. Essentially reset to a fresh `git clone` (with the notable exception of `.env`)

Running the app
- `dev` - Starts the server (development). All server code will be run directly from source using `ts-node`, and all client-side code will be compiled on the fly and served from memory, so it is not necessary to build anything before running this command. It's expected that `NODE_ENV` is set to `development` or this will not work as expected.
- `start` - Starts the server (production). You must run `npm run build` before running this command, as it will only use files in `dist/`. It's generally expected that if you're running this command, you're in a production setting and `NODE_ENV` is set to `production`, but it will still work and still have some development features enabled if `NODE_ENV` is set to `development`.

Tests
- `test` - Runs both client and server tests
- `test:client`
- `test:server`

Linting
- `lint` - Find linting errors in server and client code
- `lint:fix` - Find linting errors and also try to fix them
- `lint:client` - Find linting errors in client code (try `npm run lint:client -- --fix` to fix only client errors)
- `lint:server` - Find linting errors in server code (try `npm run lint:server -- --fix` to fix only server errors)

Building
- `build` - Builds client and server code into the `dist/` directory
- `build:client` - Runs webpack, which will compile typescript, transpile to es5, and bundle. Also grabs other resources like images or stylesheets. Outputs to `dist/client/`
- `build:server` - Runs the typescript compiler on server code and outputs to `dist/server` (plus the root `index.ts`)

## FAQ

### What is `basepath`?

I often run or test web apps at subroutes of one domain, so this `basepath` config is a singular location to keep that subroute in line for the whole app. For example:

```
https://domain.tld/           - App A
https://domain.tld/foo        - App A

https://domain.tld/bar        - App B

https://domain.tld/baz        - App C
https://domain.tld/baz/test   - App C
```

Here, `App A` would have a `basepath` of `""`, `App B` would have a `basepath` of `"/bar"`, and `App C` would have a `basepath` of `"/baz"`. I can have a reverse router point incoming traffic to the correct app, and each app is individually able to keep `webpack`, `react-router`, and `express` in line with each other based on the value of `basepath` in the config.

If you don't intend your app to run under some subroute, it's probably easier to keep it set to an empty string than to try to remove `basepath` and its uses from the code.

NOTE: Setting `basepath` to `"/"` is not the same as setting it to `""` and will cause issues.

### Why is [module] a devDependency? It should be a direct dependency since it's used at runtime.

The code in this project is not a web app, it is the source code to a web app. That code needs to be compiled into a distributable which is then run in production.

Client-side code is compiled into bundles akin to a binary executable which `axios` is already included in. So to list `axios` as a dependency of the web app is unnecessary. Once the build is complete, `axios` no longer needs to be installed for the app to function. In that sense, `axios` is like a static library that was packaged into our "executable".

Server-side code is also compiled into an "executable". It so happens that this executable is more or less readable by humans and still has to be run through an interpreter, but it isn't intended to be modified or inherently readable, it's just the stuff that runs in production which was produced by compiling source code. However, unlike on the client, packages like `express` and `winston` are not included in this build. These are like dynamically linked libraries, and our production app is dependent on them in order to function.

In short, `dependencies` are packages that are absolutely required at runtime whereas `devDependencies` are only required to write and test the source code. This creates a material difference between the two. Once the app is built, you can remove the packages required by `devDependencies` and still have a perfectly functional app, something the Dockerfile does.

You can make an argument for instead delineating between them by whether something is a "development tool" or "code that runs in production", but there is no function to that separation aside from making that distinction for its own sake. This basically only letsyou answer the question "Do we use this package in the client-side code, or only in our development scripts?" You're welcome to make that change yourself anyway if you like. It will not affect anything except the size of the resulting Docker image.
