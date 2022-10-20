'use strict';

require('dotenv').config()

const inquirer = require('inquirer');
const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3000'

async function getCardsByName(query) {
  try {
    const response = await axios.get(`/cards?search=${query}`);
    return response
  } catch (err) {
    console.error(err)
  }
}

async function getCardsByColor(colorInt) {
  try {
    const response = await axios.get(`/cards?colors=${colorInt}`);
    return response
  } catch (err) {
    console.error(err)
  }
}

async function getCardById(id) {
  try {
    const response = await axios.get(`/cards/${id}`);
    return response
  } catch (err) {
    console.error(err)
  }
}

const userData = {};

// const magicTheGathering = {
//   type: 'list',
//   name: 'where',
//   message: 'Where are we looking?',
//   choices: ['database', 'portfolio']
// }

const searchCardQuery = {
  type: 'list',
  name: 'searchBy',
  message: 'How do you want to search?',
  choices: ['name', 'color']
}


const searchNameQuery = {
  type: 'input',
  name: 'cardNameQuery',
  message: 'type the name of card',
  choices: 'input'
}

const confirmCard = {
  type: 'confirm',
  name: 'confirmed',
  message: 'Is this the card you are looking for?',
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

async function userSignIn() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Enter a username:'
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter a password:'
    }
  ])

  try {
    const response = await axios({
      method: 'post',
      url: '/signin',
      auth: {
        username: answers.username,
        password: answers.password
      }
    })
    userData.user = response.user
    userData.token = response.accessToken
  } catch (err) {
    console.error(err.response.data)
  }
}

async function userRegister() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Enter a username:'
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter a password:'
    }
  ])

  const response = await axios.post('/signup', {
    username: answers.username,
    password: answers.password
  })


  userData.user = response.user
  userData.token = response.accessToken
}

async function mainMenu() {
  if (!userData.token) {
    await userSignIn()
  }
  inquirer.prompt(
    {
      type: 'list',
      name: 'where',
      message: 'Where are we looking?',
      choices: ['database', 'portfolio']
    })
    .then((answers) => {
      if (answers.where === 'database') {
        console.log(answers);
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
    if (answers.searchBy === 'name') {
      console.log(answers);
      // databaseSearch();
      nameSearch();
    } else if (answers.searchBy === 'color') {
      console.log(`Look for the card by color`);
      // portfolioSearch();
      colorSearch();
    };
  });
}

function nameSearch() {
  inquirer.prompt(searchNameQuery).then(async (answers) => {
    console.log('search query', answers)
    const results = await getCardsByName(answers.cardNameQuery)
    const parsedResults = results.data.map(result => {
      return {
        value: result.id,
        name: result.name
      }
    })
    nameListSearch(parsedResults);
  });
};

const searchNameListQuery = { // Needs cards from database------->
  type: 'list',
  name: 'card',
  message: 'List of card(s) with similar name',
  loop: false,
}

function nameListSearch(list) {
  inquirer.prompt({
    ...searchNameListQuery,
    choices: list
  }).then((answers) => {
    selectFromList(answers.card);
  })
}

async function selectFromList(cardId) {
  const result = await getCardById(cardId)
  console.log(result.data)
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
  inquirer.prompt(searchColorQuery).then(async (answers) => {
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
    const results = await getCardsByColor(colors)
    const parsedResults = results.data.map(result => {
      return {
        value: result.id,
        name: result.name
      }
    })
    selectedColorSearch(parsedResults);
  });
};

const cardsByColorList = {   // Needs api call to database ---------------------------------------------
  type: 'list',
  name: 'List of cards with the same color',
  message: 'List of card(s) with the same color selected',
  // choices: [`${choice1}, ${choice2}, ${choice3}, ${choice4}, ${choice5}`]
  // choices: ['Bathazar', 'MegaMan', 'Diablo', 'Boy', 'Dog']
}

function selectedColorSearch(list) {
  // API CALL ---> Need the list of cards with the color selected..... The list of cards might be very very very long....
  inquirer.prompt({
    ...cardsByColorList,
    choices: list
  }).then((answers) => {
    console.log(answers);
  })
}