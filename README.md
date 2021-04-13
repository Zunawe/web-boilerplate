# Web Boilerplate

This repo is all the directory structure, dev tools, boilerplate, and pipeline stuff that I find myself doing every time I make a new web app. It's intended to be copied as the initial commit to a new repo.

## Tech Stack

Here's a quick list of the big players at work here in vague order of most significant to least:

- Typescript
- Express
- React
- React context (instead of Redux)
- Less
- Jest
- Webpack
- Babel
- ts-standard
- Webpack Hot Module Replacement
- Husky
- Winston

Everything except configuration files and scripts is written in Typescript. I use Express for the server, but there are no opinions on exposing an api (REST, GraphQL, etc...) or using a database or similar (Mongo, Redis, etc...). React on the frontend (always use hooks and functional components). Global state on the frontend is managed by React's context hooks (plus some upgrades). Less for styles. Jest (with typescript support) for tests. Webpack to build the client side code (including Typescript compilation, less compilation, and Babel transpilation). Babel to ensure compatibility. ts-standard as a heavily opinionated linter. Hot module replacement to make development on the frontend easier. Husky to manage git hooks. And a built-in Winston logger already configured for http logging.

## Project Structure

Below is a layout of the directory tree with quick one-liners for the various folders and files included. There is both boilerplate, scaffolding code and example code to be found. As usual, modify and delete at your will, but you may find even some of the example code worth keeping.

In the context folder in the client side code, you'll find an example action which is handled by the example reducer. That reducer is given to an example context provider (`context/app.tsx`). That context is used in `App.tsx` to display a counter, and dispatches the action when a button is clicked (a button which is an example component). There's also an example hook which upgrades the React context api to be able to use middlewares, and an example middleware to handle thunks. And then back in `actions/`, there's an example thunk which is also used within `App.tsx`.

Some of these are more likely to be worth keeping than others. For example, you'll probably end up making or using your own Button component rather than using the barebones one here. And the example actions aren't worth keeping at all. But on the other end, the `useEnhancedReducer` hook, while technically an example, is the only way to use middlewares in React context. And the `thunkMiddleware` example, while not necessary, is an extremely useful middleware. So don't just delete the example code unless you know what it's doing and that it's not usesful for your project. But there's no reason to keep it if it's not relevant.

```
/
├── .husky/                       Scripts run as git hooks (see Husky docs)
│   └── pre-commit                Runs tests and linter
├── client/                       
│   ├── css/                      All styles go here, not in the components
│   ├── js/
│   │   ├── components/           Reusable components
│   │   ├── context/              Context providers separated by purpose and combined into a master provider
│   │   │   ├── actions/          Actions used to indicate state changes in the app
│   │   │   │   └── Action.ts     A class definition of an Action which actions should extend (for type safety)
│   │   │   ├── middlewares/      Dispatch middlewares for handling actions before the reducer
│   │   │   └── reducers/         Reducers to modify context based on actions
│   │   ├── hooks/                Any custom React hooks you want to use
│   │   ├── lib/                  Code not directly related to rendering that must be executed on the client
│   │   ├── types/                Type definitions for the client
│   │   ├── App.tsx               The React component rendered to the root
│   │   └── index.tsx             Attaches context provider to app and renders to DOM
│   ├── public/                   Public resources
│   │   └── index.html
│   └── tsconfig.json             Typescript config for the client side code
├── config/                       Configuration files for malleable but permanent data
├── scripts/                      Any scripts too complex for package.json
│   └── build-dist.js             Builds and ejects a release version of this app
│                                 (try npm run build:dist and give it a look)
├── server/                       Stuff that runs on the server
│   ├── controllers/              Behaviors to be attached to routes
│   ├── lib/                      Any significant chunks of code or modules required by the server which are
│   │                             too big or complex for controllers/ or utils/
│   ├── middleware/               Any custom middleware
│   │   ├── errorLogger.ts        Logs uncaught errors during a request
│   │   └── httpLogger.ts         Logs incoming requests
│   ├── routes/                   Routes attach controllers to paths
│   ├── services/                 Interfaces for interacting with anything not in this codebase
│   │                             (REST api wrappers, database access, etc...)
│   ├── util/                     Pure, reusable functions
│   │   └── logger.ts             A Winston logger (see docs and/or look at examples in this repo)
│   └── index.ts                  Creates the server, attaches middleware and routes, and should connect to db
├── test/                         Tests structured in the same manner as the repo; one file gets one test file
├── .babelrc
├── .env                          Environment config (create this yourself from example.env)
│                                 for NODE_ENV, database url, credentials, etc...
├── .gitignore
├── index.ts                      Loads the environment config and starts the server. This is
│                                 where you'd spawn any other necessary processes that are separate from the server.
├── package-lock.json
├── package.json
├── README.md                     Hello
├── tsconfig.base.json            Common Typescript configuration between the server and client
├── tsconfig.json                 Server-side Typescript config (does NOT affect client/)
├── webpack.common.js             Common webpack configuration
├── webpack.dev.js                Dev-specific webpack config (i.e. hot module replacement and source maps)
└── webpack.prod.js               Production webpack config
```

## Usage

Copy the repo and run `npm setup` to make sure everything is installed correctly. This entire repository is nothing but a manifestation of my opinions, so feel free to disagree with, tweak, or embrace anything. You could even fork it and make your own.

Remember to create a `.env` file with `NODE_ENV` set to `development`. Otherwise you'll probably have build issues, or at the very least you won't get things like hot module replacement and debug logging. This file shouldn't be committed. You should also go through `package.json` and make sure all the fields are filled and correct.

### Import/Export Pattern

This is pure opinion, but might be a good pattern to follow. When you're in a directory that exports an arbitrary number of similar things, you should not use default exports. This may sound questionable at first, but it enforces stricter conventions when it comes to importing. A directory should have an `index.ts` file which re-exports all the other stuff in its directory. Then another file can import the whole group of related functions or objects or whatever and destructure them out of the imported object. For example, this
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

Another benefit is that the names of exported objects are enforced. Someone can't accidentally `import Buton from '../components/Button` anymore because `import { Buton } from '../components'` won't work in the first place. And finally, since there are no default exports to have to finagle through an `index.ts`, every `index.ts` just looks like this:
```ts
export * from './Button'
export * from './Checkbox'
export * from './Card'
```

### Scripts

Here's a quick overview of everything under `npm run <script name>`

Managing the repo itself
- `setup` - Installs dependencies and makes sure Husky is set up
- `clean` - Remove build files
- `clean:all` - Remove build files, node modules, and Husky scripts

Running the app
- `start` - Starts the server using `ts-node`. If you're using this, you should have `NODE_ENV` set to `development` so that the webpack dev middleware can compile the client code into memory. When running this command, all code should run from source (or with source maps), so it is not necessary to build the app before running this.

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
- `build:dist` - Creates a built app that doesn't know about build tools or dev dependencies. Just unpack and run `npm start`.
- `build:client` - Runs webpack, which will compile typescript, transpile to es5, and bundle. Also grabs other resources like images or stylesheets. Outputs to `dist/client/`
- `build:server` - Runs the typescript compiler and outputs to `dist/server` (plus the root `index.ts`)

## Why is [module] a devDependency? It should be a direct dependency since it's used at runtime.

Normally I'd be okay putting client side dependencies in the `dependencies` and making a production server build the client code, but since the server code is Typescript, I think we've tipped over a line. The code written using this boilerplate isn't a web app, it's the source code for a web app. That source code needs to be compiled into a distributable, and then that distributable can be run. On the client side, the `bundle.js` that is produced by webpack is akin to a binary executable, and React is already packaged within it. So to list React as a dependency of the _product_ is extraneous. React is like a static library that was added directly into our "executable". Modules like Express or Winston, however, are like dynamically linked libraries that need to be loaded at runtime, and so have to be listed as dependencies.

In short, dependencies are things required at runtime by the compiled product whereas devDependencies are only required to write and test the source code. This repo contains the source code to an executable web application, not a web application itself.
