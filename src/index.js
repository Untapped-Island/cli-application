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

const searchColorQuery = {
  type: 'checkbox',
  name: 'choice',
  message: 'Pick a color!!',
  choices: ['Island', 'Mountain', 'Swamp', 'Forest', 'Plains', 'Artifact']
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

// const restartSearch = {
//   type: 'list',
//   name: 'Look for another card',
//   message: 'Add to portfolio?',
//   choices: ['yes', 'no']
// }

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
    if (answers.choice === 'Island') {
      console.log(`You are looking at Island Card`);
      selectedColorSearch();
    }
    if (answers.choice === 'Mountain') {
      console.log(`You are looking at Mountain Card`);
      selectedColorSearch();
    }
    if (answers.choice === 'Swamp') {
      console.log(`You are looking at Island Card`);
      selectedColorSearch();
    }
    if (answers.choice === 'Forest') {
      console.log(`You are looking at Forest Card`);
      selectedColorSearch();
    }
    if (answers.choice === 'Plains') {
      console.log(`You are looking at Plains Card`);
      selectedColorSearch();
    }
    if (answers.choice === 'Artifact') {
      console.log(`You are looking at Artifact Card`);
      selectedColorSearch();
    }
  });
};


function selectedColorSearch() {
  inquirer.prompt(colorConfirmation).then((answers) => {
    console.log(answers);
  })
}