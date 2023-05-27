import produce from "immer";
import { ITEM_ADDED, ITEM_REMOVED,ITEM_PRICE_UPDATED,ITEM_QUANTITY_UPDATED} from "./actions";

let id = 1;

export const initialItems = [
  { uuid: id++, name: 'Awesome Tofu Roast', price: 14, quantity: 1 },
  { uuid: id++, name: 'Vegan Ham Sandwitch', price: 12, quantity: 1 }
];

export const reducer = (state = initialItems, action) => {

  // Without Immer
  // if (action.type === ITEM_ADDED) {
  //   const item = {uuid: id++, quantity: 1, ...action.payload};
  //   return [...state,item]
  // }


  // With Immer
  // Use immer's one of the function called produce
  if(action.type === ITEM_ADDED) {
    produce(state, (draftState)=> {
      const item = {uuid: id++, quantity: 1, ...action.payload};
    })
  }

  if (action.type === ITEM_REMOVED) {
    return state.filter((item)=> item.uuid !== action.payload.uuid);
  }

  // Without Immer npm package
  // if(action.type === ITEM_PRICE_UPDATED){
  //   return state.map((item) => {
  //     if(item.uuid === action.payload.uuid){
  //       return {...item, price: action.payload.price}
  //     }
  //     return item;
  //   })
  // }

  if(action.type === ITEM_PRICE_UPDATED) {
    produce(state, (draftState) => {
      const item = state.find((item) => item.uuid === action.payload.price);
      item.price = parseInt(action.payload.price,10)
    })
  }

  // Without Immer npm package
  // if(action.type === ITEM_QUANTITY_UPDATED){
  //   return state.map((item) => {
  //     if(item.uuid === action.payload.uuid){
  //       return {...item, quantity: action.payload.quantity}
  //     }
  //     return item;
  //   })
  // }


  // With Immer
  if (action.type === ITEM_QUANTITY_UPDATED) {
    produce(state, (draftState) => {
      const item = state.find((item) => item.uuid === action.payload.quantity);
      item.quantity = parseInt(action.payload.quantity,10)
    })
  }
  return state;
};

export default reducer;
