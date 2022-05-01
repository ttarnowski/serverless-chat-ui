# Build a Realtime Web Chat and deploy to AWS - TypeScript, Node, React & TailwindCSS - Frontend

This repository has been created as a part of the YouTube video:
[Build a Realtime Web Chat and deploy to AWS - TypeScript, Node, React & TailwindCSS](https://youtu.be/82Geq2Jq0pg)

It is a frontend part of a simple web chat application using API Gateway Webosockets with Serverless Framework Infrastructure as a Code
to easily deploy it to AWS.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

- AWS CLI installed and configured
- [`serverless-framework`](https://github.com/serverless/serverless)
- [`node.js`](https://nodejs.org)

## Installation

Run:

```bash
npm install
```

or

```
yarn install
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Deployment

Follow the instructions on the video to create and configure AWS S3 Bucket.

To synchronize changes with S3 bucket run:

```bash
npm run build && aws s3 sync ./build s3://your_bucket_name/
```

where `your_bucket_name` is the name of the S3 bucket created and configured to serve content as static web server.

## Licence

MIT.
