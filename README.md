# JFrog Pipelines Task Hello World

This repo contains a basic Pipelines Task and Pipelines definitions to help test and publish it. 
Developers can use this to learn about Pipelines Tasks and as a reference to create their own Pipelines tasks.

The task available in this repo was developed using the Pipelines Tasks Node.js SDK. 
It shows how to use the following features available to Pipelines Tasks:

- Read task input arguments.
- Log info and error messages.
- Create new file at current step working directory.
- Save and restoring information to task state.
- Export new environment variable.
- Set task output values.
- Using task post hooks.

Pipelines definitions are also available to help developers with the following activities:

- Build and run Pipelines Task from source to validate changes.
- Build and publish Pipelines Task to Artifactory.
- Run task from Artifactory to validate published task.

## Using this repo

### Environment Setup

Before using the contents of this repo, make sure you have the following configurations done in your environment.

- Pipelines Project Integrations:
  - Artifactory project integration pointing to your Artifactory instance.
  - Git project integration according to the Git provider you are using.
- Artifactory Repositories:
  - Auto Setup
    - Export the following environment variables:
      - ```
        ENTPLUS_PASSWORD
        ENTPLUS_USER
        JPD_URL
        JPD_PASSWORD # (defaults to 'password')
        JPD_USER # (defaults to 'admin')"
      - Run [boostrapHelloWorldRepos.sh](./bootstrapRepos/bootstrapHelloWorldRepos.sh)
  - Manual Setup
    - **pipelines-tasks-local**: local generic repo. This repo will be the target for your published task.
    - **pipelines-tasks-remote**: remote generic repo pointing to https://entplus.jfrog.io/artifactory/pipe-dev-tasks-local. **Don't forget to add your credentials.**
    This repo will be used to resolve common tasks maintained by JFrog, like the `publish-task` task used here to publish a task to Artifactory.
    - **pipelines-tasks-virtual**: virtual generic repo composed by _pipelines-tasks-local_ and _pipelines-tasks-remote_.
  This is the repo used by default by Pipelines to resolve tasks.
    - **npm-remote**: remote npm repo pointing to https://entplus.jfrog.io/artifactory/api/npm/npm-virtual. **Don't forget to add your credentials.**
    - **npm-virtual**: virtual npm repo composed by _npm-remote_.

### Pipelines Tasks in Action!

To see this Pipelines Task in action, do the following:

- Fork this repo.
- Change [values.yml](.jfrog-pipelines/values.yml) contents to reflect your settings and source code location.
- Add a Pipelines Source pointing to your forked repo.

After Pipelines Sync succeeds you should see and trigger the following Pipelines:

- **hello_world_task_test**: This Pipeline can be used to run this Pipelines Task from source on a Bash step and check
if the task is producing the expected behavior. This pipeline will trigger automatically every time you push changes to
the source code.
- **hello_world_task_publish**: This Pipeline can be used to build and publish the task to Artifactory. 
After publishing is done it will also run the recently published task to make sure the published package works as expected
and can be used by others.

## Important Files

- [task.yml](task.yml): Pipelines Task descriptor file. Contains the details 
about the task, including name, description, inputs, outputs and commands to be executed.
- [package.json](package.json): Since this is a Node.js task, it uses npm to describe itself and declare dependencies.
The only runtime dependency used here is the _jfrog-pipelines-tasks_ Node.js SDK. The dependency listed there is the 
development tool _@vercel/ncc_, which is used to build a distributable javascript file bundled with all npm dependencies.
- [index.js](src/index.js): The javascript entrypoint where the task logic starts.
- [test-task-pipeline.yaml](.jfrog-pipelines/test-task-pipeline.yaml): Pipelines definition declaring
the _hello_world_task_test_ pipeline.
- [publish-task-pipeline.yaml](.jfrog-pipelines/publish-task-pipeline.yaml): Pipelines definition declaring
the _hello_world_task_publish_ pipeline.

## TO-DO

- [ ] Add step to test task on Windows node
