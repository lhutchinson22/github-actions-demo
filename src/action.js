const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  console.log("Hello World");
  const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");

  const octokit = github.getOctokit(GITHUB_TOKEN);

  const { context = {} } = github;
  const { pull_request } = context.payload;

  if (pull_request) {
    await octokit.issues.createComment({
      ...context.repo,
      issue_number: pull_request.number,
      body: "thank you for submitting a pull request. We will try to review this as soon as possible.",
    });
  } else {
    console.log("This action was not triggered by a pull request.");
  }
}

run();
