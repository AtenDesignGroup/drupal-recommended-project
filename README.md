# PROJECT NAME - Drupal 9

- Production URL: https://atendesigngroup.com/
- Aten Shortname: PROJECTCODE

## Overview

Description of project intention & goals.

## People & Roles in Project

**Aten**

- Jack Reacher (Project Manager)
- James Bond (Tech Lead)
- Jason Bourne (Developer)

## Communication

- Slack: #client-PROJECTCODE
- JIRA: https://atendesign.atlassian.net/jira/software/projects/PROJECTCODE/

## Code Repository

- Host: Pantheon/Platform.sh/Acquia
- Repo Name: Project Name
- Development URL: https://example.com/
- Repo URL: https://example.com/
- Default Branch: `master`
- Owner: Aten/Client

## Hosting

**Production**

- **Provider:** Pantheon/Platform.sh/Acquia
- **Owner:** Aten/Client

## Development Workflow

When adding new features to the project you'll need to create a feature branch, commonly this is the Jira ticket number (e.g. PROJECTCODE-XXX). You'll commit all your code changes to this feature branch and push the branch to the code repository. Once the ticket is ready for QA, it should be merged into the `master` branch. Which will then be deployed to the development instance on the hosting platform.

Assign the Jira ticket to the QA team member, provide the link to the develop environment, and include instructions on what should be tested. Also, please make sure to set up the environment with dummy data to make sure it's working for you prior to getting the QA team involved.

1. Hotfix/Non-Release Deployments
   1. Make sure your local environment does not have uncommitted changes
   2. If your local database is very outdated (over a month), import a new one from production
   3. On the master branch `git checkout master`
   4. VERY Important: Import configuration changes `drush cim sync -y` Failing to do so will result in overriding configuration
   5. Create a feature branch based on the Jira ticket name `git checkout -b PROJECTCODE-###`
   6. Make necessary code changes. If changing configuration remember to export configuration `drush cex sync -y`
      1. Review changes you've made with `git diff`
   7. Commit changes to your feature branch `git add .` and `git commit -m "PROJECTCODE-###: note about the change" and `git push`
   8. Merge into staging branch for testing on Acquia `git checkout staging` and `git merge PROJECTCODE-###`
   9. After your changes are approved on staging, merge your feature branch into the master branch and deploy
      1. `git checkout master` and `git merge PROJECTCODE-###` and `git push`
2. Using a Release/Sprint Branch - Useful if working on a bunch of features
   1. Create the release branch
      1. Do Once - `git checkout master` && `git checkout -b release-1`
      2. Push the release branch for everyone to work from
   2. Participating in the release
      1. Make sure your local environment does not have uncommitted changes
      2. If your local database is very outdated (over a month), import a new one from production
      3. On the master branch `git checkout release-1`
      4. VERY important: Import configuration changes `drush cim sync -y` Failing to do so will result in overriding configuration
      5. Create a feature branch of the release branch based on the Jira ticket name `git checkout -b PROJECTCODE-###`
      6. Make necessary code changes. If changing configuration remember to export configuration `drush cex sync -y`
         1. Review changes you've made with `git diff`
      7. Commit changes to your feature branch `git add .` and `git commit -m "PROJECTCODE-###: note about the change" and `git push`
      8. Merge into release branch for testing on Acquia `git checkout release-1` and `git merge PROJECTCODE-###`
         1. On Acquia use one environment dedicated to the release
      9. After your changes are approved on staging, merge your feature branch into the master branch and deploy
         1. `git checkout master` and `git merge PROJECTCODE-###` and `git push`
   3. Deploying the release
      1. You may want to merge master into your release branch to catch any divergence since the branch was created
      2. Merge your release branch into the staging branch to test the release
      3. Once tested, merge the release branch into master
   4. Caveats: If work has been started on the release branch but not finished, it will need to be manually removed

## Automated Testing

No testing:

- This project does not currently have automated testing configured.

Has testing:

- This project has automated testing configured.
- Type of testing: Cypress (https://www.cypress.io/)
- Location to READ.ME: `web/...`

## Theme Information

- Base Theme: Prototype
- Custom Theme: `THEME_NAME`
- Location to READ.ME: `web/themes/custom/THEME_NAME/README.md`

## Deployment / Configuration Management

It is HIGHLY recommended that database updates and configuration imports happen automatically so it is never forgotten.

1. Review configuration on production and make sure it is not out of sync `/admin/config/development/configuration`
2. If the configuration is out of sync you have a couple options:
   1. Export the single config(s) out of sync and make sure they are committed along with code being pushed
   2. Grab a fresh database from production and run a configuration export while on the master branch

Note: In an ideal world, configuration would not be changed on production directly.

## Local Development

The Drupal project was setup to support Lando out of the box. Developers can quickly get started setting up your local environment by following the instructions below. Please make sure you've installed [Lando](https://docs.lando.dev/basics/installation.html).

First, lets start by installing the project composer packages:

```
composer install
```

Now, you'll need to start up the Lando instance:

```
lando start
```

Now, you'll need to import the development database to the local environment:

```
lando db-import localdatabasename.sql
```

### Inital Drupal Configruation

```
composer create-project "aten/drupal-recommended-project" [SITE-NAME]
```

## Updating Drupal Core and Contrib modules with Composer

Following the development workflow, updates should be done exclusively with Composer (see https://www.drupal.org/docs/develop/using-composer/manage-dependencies)

1. Updating Drupal core - See https://www.drupal.org/docs/updating-drupal/updating-drupal-core-via-composer
   1. `composer update drupal/core --with-dependencies`
   2. `drush updatedb`
   3. `drush cache:rebuild`
2. Updating Drupal modules
   1. `composer update drupal/modulename --with-dependencies`
   2. `drush updatedb`
   3. `drush cache:rebuild`
3. Removing Drupal modules
   1. Note: Be careful doing this. A module MUST be uninstalled on production before you choose to remove from the code base via Composer (this would mean two deploys)
   2. Uninstall the module, export configuration, push code, and deploy to production
   3. After the module is uninstalled on production, you can remove it from the code base using Composer by `composer remove drupal/modulename`
4. Patches
   1. Patches should be done exclusively with Composer as well. It allows all developers to be aware of what modules are getting patched and if any of them fail to apply after an update
