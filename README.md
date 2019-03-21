# AWS Rekognition

![Build Status Master](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiVi9hUU9aMjdhVEltbDB0a3RvMjV2ME01bFQ5S29RTVpaRHNpZjRhK3JrNXMvQ1N0VTZyVzBLU25CS0E2UVNpLzRhK25wazlkV0pnN3hvVTMxTVNQaUVJPSIsIml2UGFyYW1ldGVyU3BlYyI6Im80ejZZZENnaU9KVldiWFgiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

The AWS Rekognition projects allows users to simple use Facial regkontion feature powered by AWS Rekognition on their own pictures. Any uploaded picture will be processed by AWS to detect labels and faces including emotion and facial attributes.

**Used frameworks / libraries:**
- ReactJS
- Redux / reselect
- Jest
- GraphQL by Apollo
- styled-comonents
- Grommet
- Formik
- Semantic-Release

## Getting started

### Installation
Following packages are used in development environment:
- node8 & npm 6
- git
- VisualStudio Code
- Jest

### Start development
1. Install package dependencies: `npm install`
2. Start project: `npm start`

## Deployment

Deployment is only supported by automated `Codebuild` deployment by AWS Codebuild. After merge on `develop` branch, Codebuild will automatically build and deploy to test environment. On merge on `master` production build will be deployed to prod environment.
