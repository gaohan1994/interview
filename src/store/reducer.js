const initState = {
  value: 0,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case 'Increment': {
      return {
        ...state,
        value: state.value + 1,
      };
    }

    case 'Decrement': {
      return {
        ...state,
        value: state.value - 1,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
}

export { initState, reducer };
