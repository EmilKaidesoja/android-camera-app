
export default function reducer(
    state = {

    },
    action
  ) {
    switch (action.type) {
 
      default: {
        return state;
      }
    }
  }
  
  export const update = (state, mutations) => {
    return Object.assign({}, state, mutations);
  };
  