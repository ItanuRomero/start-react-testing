# start-react-testing
Practicing with rules and concepts of testing react components using Jest + React Testing Library


# Creating the environment
```
npm install vite

npm create vite@latest .
```

# Installing Jest
```
npm i jest -D

npx jest --init

npm i ts-node

npm i @types/jest -D

npm i jest-environment-jsdom -D
```

# testing
```
npm test
```
# Jest does not understand react as default
So we gonna use swc (like babel but written in rust)
```
npm i @swc/core @swc/jest -D
```
# Configuring to transform (t/j)sx files

``` js
transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
            decorators: true,
          },
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
            react: {
              runtime: "automatic",
            },
          },
        },
        module: {
          type: "es6",
          noInterop: false,
        },
      },
    ],
  },
```

# Now we use react-testing-library as a helper to test react

```
npm i @testing-library/react @testing-library/jest-dom @testing-library/user-event -D
```

# Now we can create tests on `App.spec.tsx`
And run them with `npm test`

To have a better experience, change the package.json command "test" to have the --watchAll flag

# To use other types of assertions
Create a test directory with a setup.ts file in it, then add the import to the file

```
import '@testing-library/jest-dom'
```

Then on the jest.config.ts, add the setup file in the setupFilesAfterEnv property

(you need to rerun the npm test to apply the changes on the setup)
