'use strict';

require('dotenv').config()

const inquirer = require('inquirer');
const axios = require('axios')
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

async function addCardToProfile(cardId, username) {
  try {
    console.log(username)
    const response = await axios.post(`users/${username}/cards`, {
      card: cardId
    })
    return response
  } catch (err) {
    console.error(err)
  }
}

async function getEntirePortfolio(username) {
  try {
    const response = await axios.get(`/users/${username}/cards`);
    return response
  } catch (err) {
    console.error(err)
  }
}

const userData = {
  userId: null,
  username: null,
  token: null,
};


const searchCardQuery = {
  type: 'list',
  name: 'searchBy',
  message: 'How do you want to search?',
  choices: ['name', 'color']
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
  console.log('Welcome to Untapped Island!');
  mainMenu();
}
main();

async function credentialsPrompt(isRegistering) {
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
    let response;
    if (isRegistering) {
      response = await axios.post('/signup', {
        username: answers.username,
        password: answers.password
      })
    } else {
      response = await axios({
        method: 'post',
        url: '/signin',
        auth: {
          username: answers.username,
          password: answers.password
        }
      })
    }
    userData.userId = response.data.id;
    userData.username = response.data.user;
    userData.token = response.data.accessToken;
    console.log(userData)
    console.log(response.data)
    axios.defaults.headers.common['Authorization'] = userData.token
  } catch (err) {
    console.error(err.response?.data.message || err)
  }
}


async function mainMenu() {
  while (!userData.token) {
    const signinOrRegister = await inquirer.prompt({
      type: 'list',
      name: 'choice',
      message: 'Login or register for a new account?',
      choices: [{name: 'Login', value: false}, {name: 'Register', value: true}]
    })
    await credentialsPrompt(signinOrRegister.choice)
  }

  inquirer.prompt(
    {
      type: 'list',
      name: 'where',
      message: 'Select an option -',
      choices: [{name: 'Search all cards', value: 'database'}, {name: 'Search my portfolio', value: 'portfolio'}]
    })
    .then(async (answers) => {
      if (answers.where === 'database') {
        console.log(answers);
        cardSearch();
      } else if (answers.where === 'portfolio') {
        try {
          const portfolio = await getEntirePortfolio(userData.username)
          for (let data of portfolio.data) {
            console.log(data.card.name)
          }
        } catch (err) {
          console.error(err)
        }
        // console.log('Look inside your portfolio');
        // portfolioSearch();
      };
    });
}

function cardSearch() {
  inquirer.prompt(searchCardQuery).then((answers) => {
    if (answers.searchBy === 'name') {
      console.log(answers);
      nameSearch();
    } else if (answers.searchBy === 'color') {
      console.log(`Look for the card by color`);
      colorSearch();
    };
  });
}

function nameSearch() {
  inquirer.prompt({
    type: 'input',
    name: 'cardNameQuery',
    message: 'type the name of card',
    choices: 'input'
  }).then(async (answers) => {
    try {
      const results = await getCardsByName(answers.cardNameQuery)
      if (results.data.length !== 0) {
        const parsedResults = results.data.map(result => {
          return {
            value: result.id,
            name: result.name
          }
        })
        nameListSearch(parsedResults);
      } else {
        nameSearch()
      }
    } catch (err) {
      console.error(err)
    }
  });
};

function nameListSearch(list) {
  inquirer.prompt({
    type: 'list',
    name: 'card',
    message: 'List of card(s) with similar name',
    loop: false,
    choices: list
  }).then((answers) => {
    selectFromList(answers.card);
  })
}

async function selectFromList(cardId) {
  const result = await getCardById(cardId)
  console.log(result.data)
  inquirer.prompt({
    type: 'confirm',
    name: 'confirmed',
    message: 'Add card to portfolio?',
  }).then((answers) => {
    console.log(answers)
    if (answers.confirmed) {
      addCardToProfile(cardId, userData.username)
    }
    mainMenu()
  })
}

// function anotherCardSearch() {
//   inquirer.prompt(confirmCardtoPortfolio).then((answers) => {
//     console.log(answers)
//     mainMenu()
//   })
// }

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