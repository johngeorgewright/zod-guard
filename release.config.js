module.exports = {
  branches: ['master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/exec',
      {
        verifyConditionsCmd: 'yarn npm whoami --publish',
        prepareCmd: 'yarn version ${nextRelease.version}',
        publishCmd:
          "yarn npm publish --access public && echo '::set-output name=version::${nextRelease.version}'",
      },
    ],
    [
      '@semantic-release/git',
      {
        message: 'chore(release): ${nextRelease.version} [skip ci]',
      },
    ],
    '@semantic-release/github',
  ],
}
