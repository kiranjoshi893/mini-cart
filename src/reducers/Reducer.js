import { DECREMENT, INCREMENT, PRODUCTLIST, REMOVELIST, TOGGLELIST} from "../constants/ActionType";
const storeData = {};
const toggleData = {}

export const ListReducer = (state = toggleData, action) => {
  switch (action.type) {
    case TOGGLELIST:
      console.log(localStorage.getItem("removeList"), "test:::::::");
      return {
        ...state,
        toggleData: !localStorage.getItem("removeList") ? action.payload : JSON.parse(localStorage.getItem("removeList")),
      };
    case REMOVELIST:
      let remaningItems = state.toggleData.filter((key) => {
        return !action.payload.id.includes(key.id);
      });      
      localStorage.setItem("removeList", JSON.stringify(remaningItems));
      if (!localStorage.getItem("removeList")) {
        return {
          ...state,
          toggleData: JSON.parse(localStorage.getItem("removeList")),
        };
      } 
      return {
        ...state,
        toggleData: remaningItems,
      };

    default:
      return {
        ...state,
      };
  }
}; 
export const ProductReducer = (state = storeData, action) => {
  switch (action.type) {
    case PRODUCTLIST:
      return {
        ...state,
        storeData: action.payload,
    };
    case INCREMENT:
      state.storeData.map((data, i) => {
        console.log(data, "data:::::::::::::::::");
        if (data.id === action.payload.id) {
          localStorage.setItem(
            "quantity" + data.id,
            JSON.stringify(data.qty + 1)
          );
          if (action.payload.qty >= 10) {
            localStorage.setItem(
              "quantity" + data.id,
              JSON.stringify(data.qty >= 10 ? 10 : data.qty)
            );
            return {
              qty: 10,
            };
          }
          return {
            qty: (action.payload.qty += 1),
            price: (action.payload.price += 39),
            ...state,
          };
        }
        return data;
      });
      return {
        ...state,
        // storeData: state.storeData,
      };

    case DECREMENT:
      state.storeData.map((data, i) => {
        console.log(data, "data:::::::::::::::::1");
        if (data.id === action.payload.id) {
          localStorage.setItem(
            "quantity" + data.id,
            JSON.stringify(data.qty - 1)
          );
          if (action.payload.qty <= 1) {
            localStorage.setItem(
              "quantity" + data.id,
              JSON.stringify(data.qty <= 1 ? 1 : data.qty)
            );
            return {
              ...state,
              qty: 1,
            };
          }
          return {
            ...state,
            qty: (action.payload.qty -= 1),
            price: (action.payload.price -= 39),
          };
        }
        return data;
      });
      return {
        ...state,
        // storeData: state.storeData,
      };
    default:
      return {
        ...state,
      };
  }
}; 