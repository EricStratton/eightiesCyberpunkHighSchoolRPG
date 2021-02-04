
export const storeState = (initialState = {}) => {
  let currentState = initialState;
  return (stateChangeFunction = state => state, name) => {
    const newState = stateChangeFunction(currentState, name);
    currentState = { ...newState };
    return newState;
  };
};

export const addCharacterToState = (charInitialObject) => {
  return (name) => {
    return (state) => ({
      ...state,
      [name] : charInitialObject
    });
  };
};

export const changeState = (prop) => { // basic numerical state update
  return(value) => {
    return (state, name) => ({
      ...state,
      [name]: { ...state[name], [prop]: (state[name][prop] || 0) + value }
    }); 
  };
};

export const gainAbility = (prop) => { // basic numerical state update
    return (state, name) => ({
      ...state,
      [name]: { ...state[name], ability: prop }
    });
};

const callTheCops = () => {
  return `The character calls the cops`;
}   

const charStateControl = storeState();

const evilPrincipalInitialValues = { tech: 2, speed: 2, constitution: 4, authority: 5, looks: 1, principles: 1 };
const undervaluedJanitorInitialValues = { tech: 5, speed: 2, constitution: 2, authority: 1, looks: 2, principles: 5 };

const joeTheEvilPrincipal = addCharacterToState(evilPrincipalInitialValues)("Joe");
const helenTheEvilPrincipal = addCharacterToState(evilPrincipalInitialValues)("Helen");
const xanderTheUndervaluedJanitor = addCharacterToState(undervaluedJanitorInitialValues)("Xander");

const addJoeToState = charStateControl(joeTheEvilPrincipal); // this represents a state that contains Joe
const addHelenToState = charStateControl(helenTheEvilPrincipal); // this represents a state that contains Joe & Helen
const addXanderToState = charStateControl(xanderTheUndervaluedJanitor);

const addOneCon = changeState("constitution")(1)
// const addOneSpeed = changeState("speed")(1)
// const addOneTech = changeState("tech")(1)
// const addOneAuth = changeState("authority")(1)
// const addOneLooks = changeState("looks")(1)
// const addOnePrinc = changeState("principles")(1)
// const minusOneCon = changeState("constitution")(-1)
const minusOneSpeed = changeState("speed")(-1)
const minusOneTech = changeState("tech")(-1)
// const minusOneAuth = changeState("authority")(-1)
// const minusOneLooks = changeState("constitution")(-1)
// const minusOnePrinc = changeState("principles")(-1)

const helenConUp = charStateControl(addOneCon, "Helen");

const gainCallTheCops = gainAbility(callTheCops); // try passing newState.name

const newerState = charStateControl(gainCallTheCops, "Joe");

console.log(addJoeToState);
console.log(addHelenToState);
console.log(addXanderToState);
console.log(helenConUp);
console.log(gainCallTheCops);
console.log(newerState.Joe.ability());

// User Interface //

$(document).ready(function() {

  $('#mutual-attack').click(function() {
    const joe = charStateControl(minusOneSpeed, "Joe");
    const xander = charStateControl(minusOneTech, "Xander");
    
    $('#joe-stats').text(`Joe's speed is now: ${joe.Joe.speed}`);
    $('#xander-stats').text(`Xander's tech is now: ${xander.Xander.tech}`);
  });
});