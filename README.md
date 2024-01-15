# portkey-bingo-game

A minimalistic game demo with @portkey/did-ui-react

## Introduction

This project is a @portkey/did-ui-react Game demo. Through did-ui-react, login and registration UI is provided to obtain DID accounts to participate in Bingo Game

## How to use

In the project directory, you can run:

### `yarn`

Install dependencies.

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `.next` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn start`

Start the application in production mode. The application should be compiled with `yarn build` first.

## How to use @portkey/did-ui-react

### Install

```bash
npm install "@portkey/did-ui-react
```

```bash
yarn add "@portkey/did-ui-react
```

### Usage

```jsx
import { SignIn } from '@portkey/did-ui-react';
import { useState, useEffect } from 'react';

const App = () => {
  const signInRef = useRef<SignInInterface>();

  useEffect(() => {
    signInRef.current?.setOpen(true);
  }, []);

  return (
    <>
      <SignIn ref={signInRef.current} />
    </>
  );
};

```

If you want to set global proxy, modify the settings at /build/rewrites/development

### More

For more detailed usage and abnormal conditions, please refer to [@portkey/did-ui-react](https://github.com/Portkey-Wallet/portkey-wallet/tree/feature/react-did-ui)
