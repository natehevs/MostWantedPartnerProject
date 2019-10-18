"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

    // eye color, height, weight

//Create a working app to search a database to find people.
  //Create search by name function
    //find person using name they entered
  //search by trait function Prompt("Would you like to search for any traits like 'gender', 'weight', 'height', 'eye color', or 'occupation'. Type in which one you would like to search for.")
    //gender
    //weight
    //height
    //eye color
    //occupation

  //display options/main menu function
    //prompt for option to display info
    // prompt to see family/descendants




// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults[0], people);
}

//Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people, person){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  });
  // TODO: find the person using the name they entered
  return foundPerson;
}

function searchByTraits(people, person){
  // let gender = promptFor("What is the person's gender? Type 'male' 'female' 'unknown'", chars);
  // let weight = promptFor("What is the person's weight? If you don't know type 'unknown'", chars);
  // let height = promptFor("What is the person's height? If you don't know type 'unknown'", chars);
  // let eyeColor = promptFor("What is the person's eye color? If you don't know type 'unknown'", chars);
  // let occupation = promptFor("What is the person's occupation? If you don't know type 'unknown'", chars);


  // alert("Here is everyone with the gender you are looking for.");
  // displayPeople(foundGender);
  let filterResult = people;
  let searchingByTraits = true;
  while(searchingByTraits === true){
  let traitResponse = promptFor("Which trait would you like to search for? 'gender' 'weight' 'height' 'eye color' 'occupation' 'quit'", chars);

  switch(traitResponse){
    case "gender":
      filterResult = genderFunction(filterResult);
    break;
    case "weight":
      filterResult = weightFunction(filterResult);
    break;
    case "height":
      filterResult = heightFunction(filterResult);
    break;
    case "eyeColor":
      filterResult = eyeColorFunction(filterResult);
    break;
    case "occupation":
      filterResult = occupationFunction(filterResult);
    break;
    case "quit":
      searchingByTraits = false;
    return; //stop execution
  }
}
}
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date Of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Current Spouse: " + person.currentSpouse + "\n";
  
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  let response;
  do{
    response = prompt(question).trim();
    } while(!response || !valid(response));
    return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function genderFunction(people, person){
  let genderOfPerson = promptFor("What is the person's gender? Type in 'male' or 'female'", chars);

  let foundGender = people.filter(function(person){
    if(person.gender === genderOfPerson){
      return true;
    } else {
      return false;
    }
  });

  return foundGender;
}

function weightFunction(people, person){
  let weightOfPerson = promptFor("What is the person's weight?", chars);

  let foundWeight = people.filter(function(person){
    if(person.weight === weightOfPerson){
      return true;
    } else {
      return false;
    }
  });
  return foundWeight;
}

function heightFunction(people, person){
  let heightOfPerson = promptFor("What is the person's height?", chars);

  let foundHeight = people.filter(function(person){
    if(person.height === heightOfPerson){
      return true;
    } else {
      return false;
    }
  });
  return foundHeight;
}

function eyeColorFunction(people, person){
  let eyeColorOfPerson = promptFor("What is the person's eye color?", chars);

  let foundEyeColor = people.filter(function(person){
    if(person.eyeColor === eyeColorOfPerson){
      return true;
    } else {
      return false;
    }
  });
  return foundEyeColor;
}

function occupationFunction(people, person){
  let occupationOfPerson = promptFor("What is the person's occupation?", chars);

  let foundOccupation = people.filter(function(person){
    if(person.occupation === occupationOfPerson){
      return true;
    } else {
      return false;
    }
  });
  return foundOccupation;
}

