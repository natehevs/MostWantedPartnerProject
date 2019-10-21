"use strict"

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
    app(people);
      break;
  }

  mainMenu(searchResults[0], people);
}

function mainMenu(person, people){

  if(!person){
    alert("Could not find that individual.");
    return app(people); 
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      person = displayPerson(person, people);
    break;
    case "family":   
      person = displayFamily(person, people); 
    break;
    case "descendants":   
      person = displayDescendants(person, people); 
    break;
    case "restart":
    app(people); 
    break;
    case "quit":
    return; 
    default:
    return mainMenu(person, people); 
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
  
  return foundPerson;
}

function searchByTraits(people, person){
let filterResult = people;
let searchingByTraits = true;
  while(searchingByTraits === true){
    let traitResponse = promptFor("Which trait would you like to search for? 'gender' 'weight' 'height' 'eye color' 'occupation' 'results'", chars);

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
      case "eye color":
        filterResult = eyeColorFunction(filterResult);
      break;
      case "occupation":
        filterResult = occupationFunction(filterResult);
      break;
      case "results":
        searchingByTraits = false;
      break;
    }
  }
  alert("Here is everyone with the traits you are looking for.");
  if (filterResult.length >= 1) {
  displayPeople(filterResult);
  }
  return filterResult;
}

function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person, people){

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
  return mainMenu(person, people);
}

function promptFor(question, valid){
  let response;
  do{
    response = prompt(question).trim();
    } while(!response || !valid(response));
    return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input){
  return true; 
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
    if(person.weight == weightOfPerson){
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
    if(person.height == heightOfPerson){
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

function displayFamily(person, people){

  let allSpouse = findSpouse(person, people);
  let spouseName = "Spouse Name: ";
  let allParents = findParents(person, people);
  let parentsNames = "Parents Names: ";
  let allSiblings = findSiblings(person, people);
  let siblingNames = "Siblings Name(s): ";

  for(let i = 0; allSpouse.length > i; i++) {
    spouseName += allSpouse[i].firstName + " " + allSpouse[i].lastName + ", ";
  }

  alert(spouseName);

  for(let i = 0; allParents.length > i; i++) {
    parentsNames += allParents[i].firstName + " " + allParents[i].lastName + ", ";
  }

  alert(parentsNames);

  for(let i = 0; allSiblings.length > i; i++) {
    siblingNames += allSiblings[i].firstName + " " + allSiblings[i].lastName + ", ";
  }

  alert(siblingNames);
  return mainMenu(person, people);
}

function findSpouse(person, people){
  let spouse = people.filter(function(el){
    if(person.currentSpouse == el.id){
      return true;
    }
    else{
      return false;
    }
  });
  return spouse;
}

function findParents(person, people){
  let personParents = people.filter(function(el){
    if(el.id === person.parents[0] || el.id === person.parents[1]){
      return true;
    } 
    else {
      return false;
    }
  });
  return personParents;
}

function findSiblings(person, people){
  let foundSiblings = people.filter(function(el){
    if(person.parents.length === 0 || el.id === person.id){
      return false;
    }
    else if(el.parents[0] === person.parents[0] || el.parents[0] === person.parents[1] || el.parents[1] === person.parents[1] || el.parents[1] === person.parents[0]){
      return true;
    } 
    else {
      return false;
    }
  });
  return foundSiblings;
}

function findDescendants(person, people){
  let foundDescendants = people.filter(function(el){
    if(el.parents[0] === person.id || el.parents[1] === person.id){
      return true;
      } else {
        return false;
      }
      });
  for(let i = 0; i < foundDescendants.length; i++){
    foundDescendants = foundDescendants.concat(findDescendants(foundDescendants[i], people));

  }
  return foundDescendants;
  }

  function displayDescendants(person, people){
    let allDescendants = findDescendants(person, people);
    let descendantsName = "Descendants Name: ";

    for(let i = 0; allDescendants.length > i; i++) {
    descendantsName += allDescendants[i].firstName + " " + allDescendants[i].lastName + ", ";
    }

    alert(descendantsName);
    return mainMenu(person, people);
  }
 