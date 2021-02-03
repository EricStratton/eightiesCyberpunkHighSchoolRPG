
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
  return(value) => {
    return (state) => ({
      ...state,
      [prop]: value
    });
  };
};

const canCallTheCops = (char) => ({
  callTheCops: () => {
    return `${char} calls the cops`;
  }
});



const charStateControl = storeState();

const evilPrincipalInitialValues = { tech: 2, speed: 2, constitution: 4, authority: 5, looks: 1, principles: 1 };

const joeTheEvilPrincipal = addCharacterToState(evilPrincipalInitialValues)("Joe");
const helenTheEvilPrincipal = addCharacterToState(evilPrincipalInitialValues)("Helen");


const addJoeToState = charStateControl(joeTheEvilPrincipal); // this represents a state that contains Joe
const addHelenToState = charStateControl(helenTheEvilPrincipal); // this represents a state that contains Joe & Helen

const addOneCon = changeState("constitution")(1)

const helenConUp = charStateControl(addOneCon, "Helen");

const joeNewAbility = gainAbility(canCallTheCops(addJoeToState.name)); // try passing newState.name

const newerState = charStateControl(joeNewAbility);

console.log(addJoeToState);
console.log(addHelenToState);
console.log(helenConUp);
console.log(joeNewAbility);
console.log(newerState);