
# Cypress testing for Aten Drupal Project

This project contains elements to set up your Lando-based local dev environment to use Cypress for testing.

## Getting started

1. Copy the following files from /tests/cypress into the root directory of your project, removing the 'example.' prefix from each filename:
    1. example.cypress.config.js
    1. example.cypress.env.json
    1. example.package.json
1. Edit the resulting `cypress.env.json` file, adding the base url for your project in your local dev environment (e.g. `https://aten-drupal.lndo.site`.)
1. Edit the resulting cypress.config.js and add the base url in the e2e section as well.
1. Navigate to the project root in a terminal window and run `npm install cypress --save-dev`.
1. Optionally, install and enable video recording:
    1. Install the Cypress video recorder: `npm install --save-dev cypress-video-recorder`
    1. Uncomment the "video" section of cypress.config.js.
1. Start Cypress: `npx cypress open`
