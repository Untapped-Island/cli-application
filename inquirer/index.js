const inquirer = require('inquirer');

inquirer.prompt([
  {
    type: 'list',
    message: 'Pick from the following ',
    name: 'Search database or personal cards',
    choices: ['search database', 'search my cards']
  },
])
  .then(function (answers) {
    console.log(answers);
  });
