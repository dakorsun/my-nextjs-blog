const branchName = process.env.GITHUB_REF_NAME || process.env.CI_COMMIT_REF_NAME || 'main';

module.exports = {
  branches: [{ name: 'development', prerelease: 'dev' }, { name: 'staging', prerelease: 'stage' }, 'main'],
  tagFormat: 'v${version}',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        publish: false,
      },
    ],
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: `CHANGELOG.${branchName}.md`,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', `CHANGELOG.${branchName}.md`],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
