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
  type: 'checkbox',
  name: 'choice',
  message: 'Pick a color!!',
  choices: ['Island', 'Mountain', 'Swamp', 'Forest', 'Plains', 'Artifact']
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
      console.log(`Look for the card by ${answers.value}`);
      // databaseSearch();
      nameSearch();
    } else {
      console.log(`Look for the card by ${answers.value}`);
      // portfolioSearch();
      nameSearch();
    };
  });
}

function nameSearch() {
  inquirer.prompt(searchNameQuery).then((answers) => {
    if (answers.choice === 'Island') {
      console.log(`You are looking at Island Card`);
    } 
    if (answers.choice === 'Mountain') {
      console.log(`You are looking at Mountain Card`);
    } 
  });
};
// --------------------------------------------------------

// inquirer
// .prompt([
//   // {
//   //   name: 'menu',
//   //   type: 'list',
//   //   message: 'Search database or personal cards',
//   //   choices: ['search database', 'search my cards']
//   // },
//   {
//     name: 'search',
//     type: 'list',
//     message: 'Search By',
//     choices: ['name', 'color(s)']
//   },
//   {
//     name: 'cardName',
//     type: 'text',
//     message: 'Type in search',
//   },
//   {
//     name: 'color',
//     type: 'list',
//     message: 'Search By',
//     choices: ['name', 'color(s)']
//   },
// ])
// .then((answers) => {
//     console.log(answers.menu);
    // console.log(answers.search);
    // console.log(answers.name);

// });



