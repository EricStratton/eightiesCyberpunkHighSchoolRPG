
export const storeState = (initialState = {}) => {
  let currentState = initialState;
  return (stateChangeFunction = (state) => state) => {
    const newState = stateChangeFunction(currentState);
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
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    });
  };
};


// const canCallTheCops = (char) => ({
//   callTheCops: () => {
//     return `${char} calls the cops`;
//   }
// });

const updateStateObject = storeState();

const evilPrincipalInitialValues = { tech: 2, speed: 2, constitution: 4, authority: 5, looks: 1, principles: 1 };

const joeTheEvilPrincipal = addCharacterToState(evilPrincipalInitialValues)("Joe");

const newState = updateStateObject(joeTheEvilPrincipal);

console.log(newState);


