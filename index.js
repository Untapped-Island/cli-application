const inquirer = require('inquirer');

inquirer.prompt([
  {
    type: 'list',
    name: 'Pick from the following ',
    message: 'Search database or personal cards',
    choices: ['search database', 'search my cards']
  },
  {
    type: 'list',
    name: 'Pick from the following ',
    message: 'Search database or personal cards',
    choices: ['search database', 'search my cards']
  },
  {
    type: 'list',
    name: 'Pick from the following ',
    message: 'Search database or personal cards',
    choices: ['search database', 'search my cards']
  },
  {
    type: 'list',
    name: 'Pick from the following ',
    message: 'Search database or personal cards',
    choices: ['search database', 'search my cards']
  },
])
  .then(function (answers) {
    console.log(answers);
  });
