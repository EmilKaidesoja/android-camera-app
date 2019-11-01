
export default function reducer(
    state = {
      hasCameraPermission: false,
      pictureSent: false,
      takingPicture: false,
      prediction: "",
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
  