# CLI Application
<!-- Enter a description for the repository -->
This repository is to run our CLI interface. This repo specifically allows users to search cards from the command line.

The cli is intended to help search the database and make api calls to get the specific card or cards. Once the card(s) are found user can add them to their portfolio and either quit out of the application or continue to add more cards to their profile.

## Documentation
<!-- What does this repository do? Is there anything the user needs to do? Is there an end-user? -->
We used [inquirer](https://www.npmjs.com/package/inquirer) to build our CLI.

Inquirer provides the user interface and the inquiry session flow.

- providing error feedback
- asking questions
- parsing input
- validating answers
- managing hierarchical prompts

Inquirers question objects can contain:

type:
name:
message:
choices:

  ``` 
inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
  ```

- [https://github.com/SBoudrias/Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
- [https://www.npmjs.com/package/inquirer](https://www.npmjs.com/package/inquirer)

![UML](./assets/UntappedIsland%20(3).png)

## Setup

  ```
    npm install inquirer@^8.0.0
    npm install axios
  ```

  ```
    const inquirer = require('inquirer');
    const axios = require('axios');
  ```
  
## Tests
<!-- Are there any tests? How was it tested? -->
No Tests for the CLI

## Further Goals
<!-- Any further goals -->
Stretch Goals would be to create routes for all colors (cards with dual or more than one color type), create a route for all types, subtypes, and manacost.

## Structure Diagram
<!-- Is there a diagram for this project? Should there be one? -->
![UML](./assets/UntappedIsland%20(2).png)

