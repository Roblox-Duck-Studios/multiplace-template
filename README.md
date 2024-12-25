This template aims to provide stricter coding styles and is stolen from some internal code I worked on for free but the project has discontinued. I have decided to take this internal code out and removed any code related to the game since its actually a really nice setup.

# Instructions
I am currently using a linux machine so there are some specific commands in scripts that require you to be on linux. It is fine to tweak it such as `xdg-open` command for your own use. This repository has very strict eslint rules

## Naming Conventions
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