# Multiplace Template
This template aims to provide stricter coding styles and is stolen from some internal code I worked on for free but the project has discontinued. I have decided to take this internal code out and removed any code related to the game since its actually a really nice setup. **This setup is not recommended for beginners, as it requires a deep unnderstanding of lots of tools. Tweaking the configurations will take some effort**

# Features
* Dependency Injection in `deps` folder
* Create React App style of UI managment, inspired by [slither's](https://github.com/littensy/slither/tree/main/src/client/app) management style
* Common folder to share scripts used across different places
* Automatic charm state managment with flamework binary serializer (charm-service, charm-controller). Uses DI to handle different syncers
* CSpell with roblox-ts and roblox dictionary in eslint
* Very strict eslint rules with naming convetions in mind
* JunkService to store player signal connections
* Save service to handle player data
* Offline unit testing without opening studio using `bun test:base` (testez, lune)
* Full rojo managed workflow by extracting files every commit
* Husky hooks to fix fixable issues for eslint rules
* Enforces conventional commits with commitlint
* Dependency upgrade with dependabot
* Darklua code converter for production builds
* Asphalt image uploading on common folder
* Utility hooks for react
* `ScalerContext` for `usePx` or `useScaler` hooks to wrap around
* Storygroup utilities

# Getting Started
Make sure you have [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) installed. Its not suggested to install cspell plugin, roblox-ts plugin and prettier plugin as it may conflict with the setup.
* Clone this repository
* Run: `rokit install`
* Run: `bun i` or `npm i`
* Edit `asphalt.toml`'s `creator` group
* Edit `.github/workflows/push.yml` and setup environment secrets both on `.env` and on github to enable fully managed rojo workflow
### Utiltiy scripts declared in `package.json`
* `eslint`: strict version of running linter, errors when warnings pop up
* `lint`: more friendly version of linting, doesn't error when warning pops up
* `fix`: fixes all the problems eslint could fix by itself
* `watch`: watches the current directory, you should use it only the working directory
* `clean`: deletes all the `out` folder in all directories
* `compile:base`: compiles and processes files using darklua for `place/base` directory
* `watch:base`: roblox-ts watch mode
* `build:base`: builds developer version of the place
* `prod:base`: builds production version of the place using darklua processed files
* `open:base`: opens the place file for `base` folder with arch linux commands
* `test:base`: runs unit test based on your newest code offline without opening studio
You may modify any scripts for your own use but its suggested not unless you know what is going on

## Naming Conventions (outdated)
- **Classes**: `PascalCase`
- **Class Methods**: `PascalCase` or `camelCase`, allowing names like `onEvent` or `MyMethod`
- **Class Properties**: `PascalCase`
- **Enums**: `PascalCase`
- **Enum Members**: `PascalCase`
- **Functions (Exported)**: `PascalCase` or `camelCase`, supporting `useEffect`, `selectData`, etc.
- **Interfaces**: `PascalCase`, with optional underscores `_` for private properties
- **Object Literal Methods**: `PascalCase` or `camelCase`
- **Object Literal Properties**: `PascalCase` or `camelCase`
- **Parameters**: `camelCase`
- **Parameter Properties**: `camelCase`
- **Type Aliases**: `StrictPascalCase`
- **Type Methods**: `StrictPascalCase` or `strictCamelCase`, allowing `onEvent` or `MyTypeMethod`
- **Type Parameters**: `StrictPascalCase`
- **Type Properties**: `strictCamelCase`, `StrictPascalCase`, or `UPPER_CASE` with optional underscores `_`
- **Variables (Exported Constants)**: `UPPER_CASE` or `PascalCase`
- **Variables (Functions)**: `PascalCase` or `camelCase`, allowing `useFunctionName` or `customAtom`
- **Constants (Boolean, Number, String)**: `UPPER_CASE`
- **File names**: `kebab-case`

## Commit Conventions
* `build`: release the game
* `chore`: update documentation/code that is old/deprecated and doesn't effect anything
* `ci`: anything under `.github/workflows`
* `docs`: updating code comments or external documentation
* `feat`: a new feature in the code
* `fix`: fix a bug in the code
* `perf`: introduce performence gain, list why it gains it
* `refactor`: refactor ugly code with better practices
* `revert`: revert a git commit
* `test`: write unit tests
* `deps`: update dependencies
* `core`: update code related to the game
* `conf`: change configuration files
