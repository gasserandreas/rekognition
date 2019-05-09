workflow "Lint, Test, Coverage" {
  on = "pull_request"
  resolves = ["npm coverage"]
}

action "npm install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm install"
}

action "npm lint" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["npm install"]
  runs = "npm run lint"
}

action "npm test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["npm lint"]
  runs = "npm test"
  args = "CI=true"
}

action "npm coverage" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["npm test"]
  runs = "CI=true npm run test:coverage"
}
