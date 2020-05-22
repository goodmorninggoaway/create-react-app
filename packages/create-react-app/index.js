#!/usr/bin/env node

// People creating new microapps should NEVER use this public npm registry version.
console.error(
  'You are using the public npm registry rather than hpe artifactory. ' +
  'Please change your npm registry for all @infosight packages to hpe artifactory. ' +
  'https://github.hpe.com/infosight/application-platform-meta/blob/master/docs/artifactory-setup.md'
);
process.exit(1);
