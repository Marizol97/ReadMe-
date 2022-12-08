const inquirer = require('inquirer')
const fs = require ('fs');
// Question object arrays
// prompts for readme generator. 
// synthax from inquirer.js
const questions = [
    {
        name: 'projectTitle',
        message: 'What is the name of your project?'
    },
        {
        name: 'description',
        message: 'Please write a short description of your project'
    },
    {   
        name: 'differences',
        message:'What makes this project different from others?',
    },
    {
        name: 'username',
        message: 'What is your Github username?',
    },
    {   name: 'email',
        message: 'What is your email address?',
    },
    {
        name: 'additionalInstructions',
        message: 'Any additional instructions for contact?',
    },
    {
        name: 'dependencies',
        message: 'What command should be run to install dependencies?',
    },
    {
        name: 'installation',
        message:'Are there any special commands or cross platfrom interfaces to look out for?',
    },
    {
        name: 'tests',
        message: 'What command should be run to run tests?',
    },
    {
        name: 'usage',
        message: 'What does the user need to know about using the repo?',
    },
    {
        name:'contributing',
        message: 'What does the user need to know about contributing to the repo?',
    },
    {
        name:'license',
        message: 'Choose a license from the list:',
        type: 'rawlist',
        choices: ['Apache 2.0', 'BSD', 'Creative Commons', 'Eclipse', 'GNU', 'IBM', 'MIT', 'Mozilla', 'Open Data Commons', 'Other']
    }

]
// links each licesne to a corresponding badge link 
//  the value is then stored as a badge.
const badges = {
    'Apache 2.0': '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    'BSD': '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
     'Creative Commons': '[![License: CC BY 4.0](https://licensebuttons.net/l/by/4.0/80x15.png)](https://creativecommons.org/licenses/by/4.0/)',
     'Eclipse': '[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)',
     'GNU': '[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
     'IBM': '[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)',
     'MIT': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
     'Mozilla': '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)',
     'Open Data Commons': '[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)',
     'Other': ''
}


function parseAnswers(answers) {

    // We call the value of a key in a map by its name, like with answers.get('license') or fruits['apple']
    // We can assign the value of that key to a variable, like below
    const licenseChosen = answers.get('license')

    // The value of that variable, we can use to get a value of a key with the same name in a different map
    // for instance, if the user chose BSD, licenseChosen variable above would equal 'BSD'
    // We can call the value of the key BSD in the badges map by saying badges['BSD'], which would be the same as badges[licenseChosen] because licenseChosen = BSD
    const badge = badges[licenseChosen]
// getting the value of a key an a object, with method.get 
// markdown table of content produces clickable references 
    const document = `
# ${answers.get('projectTitle')}
${badge}

## Table of Content 
1. [Description](#description)
2. [Questions](#questions)
3. [Installation](#installation)
4. [Tests](#tests)
5. [Usage](#usage)
6. [Contribution](#contribution)
7. [License](#license)

<a name = "description"></a>
## Description
${answers.get('description')}

**What makes this project special?**
${answers.get('differences')}

<a name = "questions"></a>
## Questions
Github: <a href='https://github.com/${answers.get('username')}'>${answers.get('username')}</a>\n
Email: ${answers.get('email')}

Additional Contact Instructions: ${answers.get('additionalInstructions')} 

<a name = "installation"></a>
## Installation
${answers.get('installation')}
**Installing Depedencies**

<a name = "installation"></a>
## Tests
${answers.get('tests')}

<a name = "usage"></a>
## Usage
${answers.get('usage')}

<a name = "contribution"></a>
## Contribution
${answers.get('contributing')}

<a name = "license"></a>
## License
${licenseChosen}
`
    return document
}

// function to use inquirer 
async function getAnswersForQuestions(questions) {
    
    let answers =  await inquirer
  .prompt(
    questions
  )
  .then((answers) => {
    const dataMap = new Map(Object.entries(answers))
    return dataMap
  })
  .catch((error) => {
    console.log('There\'s an error')
    console.log(error)
  });

  return answers
}


async function init() {
    // initates functions 
    //  project title is created dynamically so users can change the name as needed
    let answers = await getAnswersForQuestions(questions)
    let parsedDocument = parseAnswers(answers) 
    fs.writeFileSync(`${answers.get('projectTitle')}_README.md`, parsedDocument) 
    console.log (answers)
}


init()


