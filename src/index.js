const inquirer = require('inquirer');

const colorList = {
  type: 'list',
  name: 'listofcolors',
  message: 'Which color is your card?',
  choices: ['white', 'blue', 'black', 'red', 'green']
};

const magicTheGathering = {
  type: 'list',
  name: 'search',
  message: 'Where are we looking?',
  choices: ['database', 'portfolio']
}

const searchCardQuery = {
  type: 'list',
  name: 'card',
  message: 'How do you want to search?',
  choices: ['name', 'color']
}


const searchNameQuery = {
  type: 'input',
  name: 'input',
  message: 'type the name of card',
  choices: 'input'
}

const searchNameListQuery = {
  type: 'list',
  name: 'List of cards with input',
  message: 'List of card(s) with similar name',
  choices: ['{choice1}, {choice2}, {choice3}, {choice4}, {choice5}']
}

const confirmCard = {
  type: 'confirm',
  name: 'Is this the card?',
  message: 'Is this the card you are looking for',
}

const confirmCardtoPortfolio = {
  type: 'confirm',
  name: 'Add to portfolio',
  message: 'Add card to portfolio?',
}

  const searchColorQuery = {
    type: 'checkbox',
    name: 'choice',
    message: 'Pick a color!!',
    choices: ['Red', 'Green', 'Blue', 'White', 'Black']
  }

const colorConfirmation = {
  type: 'confirm',
  name: 'do you want to add it to your portfolio?',
  message: 'Add to portfolio',
}

function main() {
  console.log('Welcome to the Untapped Island, Gather your cards and prepare for battle!');
  mainMenu();
}
main();

function mainMenu() {
  inquirer.prompt(magicTheGathering).then((answers) => {
    if (answers.search === 'database') {
      console.log('Look inside the database');
      cardSearch();
      // databaseSearch(‘https://ourislandsapi.com/cards/’);
    } else {
      console.log('Look inside your portfolio');
      cardSearch();
      // portfolioSearch();
    };
  });
}

function cardSearch() {
  inquirer.prompt(searchCardQuery).then((answers) => {
    if (answers.card === 'name') {
      console.log(`Look for the card by name`);
      // databaseSearch();
      nameSearch();
    } else if (answers.card === 'color') {
      console.log(`Look for the card by color`);
      // portfolioSearch();
      colorSearch();
    };
  });
}

function nameSearch() { // name
  inquirer.prompt(searchNameQuery).then((answers) => {
    console.log(answers)
    nameListSearch();
  });
};

function nameListSearch() {
  inquirer.prompt(searchNameListQuery).then((answers) => {
    console.log(answers)
    selectFromList();
  })
}

function selectFromList() {
  inquirer.prompt(confirmCard).then((answers) => {
    console.log(answers)
    cardFound();
  })
}
function cardFound() {
  inquirer.prompt(confirmCardtoPortfolio).then((answers) => {
    console.log(answers)
    anotherCardSearch()
  })
}
function anotherCardSearch() {
  inquirer.prompt(confirmCardtoPortfolio).then((answers) => {
    console.log(answers)
    mainMenu()
  })
}

function colorSearch() { // color
  inquirer.prompt(searchColorQuery).then((answers) => {
    console.log(answers.choice)
    const colorsEnum = {
      'Red': 1 << 0,
      'Green': 1 << 1,
      'Blue': 1 << 2,
      'White': 1 << 3,
      'Black': 1 << 4,
    }
    let colors = 0;
    answers.choice.forEach((color) => {
      colors = colors | colorsEnum[color]
    })
    console.log(colors);
  });
};


function selectedColorSearch() {
  inquirer.prompt(colorConfirmation).then((answers) => {
    console.log(answers);
  })
}