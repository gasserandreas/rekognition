# AWS Rekognition
The AWS Rekognition projects allows users to simple use Facial regkontion feature powered by AWS Rekognition on their own pictures. Any uploaded picture will be processed by AWS to detect labels and faces including emotion and facial attributes.

**Used frameworks / libraries:**
- ReactJS
- Redux / Reselect
- GraphQL by Apollo
- styled-comonents
- Grommet
- Formit

## Getting started

### Installation
Following packages are used in development environment:
- node8 & npm 6
- git
- VisualStudio Code

### Start development
1. Install package dependencies: `npm install`
2. Start project: `npm start`

## Deployment

Deployment is only supported by automated `Codebuild` deployment by AWS Codebuild. After merge on `develop` branch, Codebuild will automatically build and deploy to test environment. On merge on `master` production build will be deployed to prod environment.
