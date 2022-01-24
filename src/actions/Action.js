import { DECREMENT, INCREMENT, PRODUCTLIST, REMOVELIST, TOGGLELIST} from "../constants/ActionType";

export const ProductAction = (val) => {
  // localStorage.setItem("Products", JSON.stringify(val));
    return {
      type: PRODUCTLIST,
      payload:val
    };
};
export const IncrementAction = (val) => {
  console.log(val,'dfsfsfsfsdfsdf');
    return {
      type: INCREMENT,
      payload:val
    };
};
export const DecrementAction = (val) => {
  return {
    type: DECREMENT,
    payload: val,
  };
};
export const ToggleAction = (val) => {
  return {
    type: TOGGLELIST,
    payload: val,
  };
};
// export const RemoveListAction = (val) => {
//   alert('test')
//   console.log(val, 'val::::::::');
//   return {
//     type: REMOVELIST,
//     payload: val,
//   };
// };

export const RemoveListAction = (val) => {
  return {
    type: REMOVELIST,
    payload: val,
  };
};