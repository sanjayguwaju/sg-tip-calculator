import produce from "immer";
import { ITEM_ADDED, ITEM_REMOVED,ITEM_PRICE_UPDATED,ITEM_QUANTITY_UPDATED} from "./actions";

let id = 1;

export const initialItems = [
  { uuid: id++, name: 'Awesome Tofu Roast', price: 14, quantity: 1 },
  { uuid: id++, name: 'Vegan Ham Sandwitch', price: 12, quantity: 1 }
];

export const reducer = produce((state = initialItems, action) => {
  // With Immer
  // Use immer's one of the function called produce
  if(action.type === ITEM_ADDED) {
    const item = {uuid: id++, quantity: 1, ...action.payload};
    state.push(item);
  }

  if (action.type === ITEM_REMOVED) {
    return state.filter((item)=> item.uuid !== action.payload.uuid);
  }

  if(action.type === ITEM_PRICE_UPDATED) {
      const item = state.find((item) => item.uuid === action.payload.uuid);
      item.price = parseInt(action.payload.price,10)
  }
  
  // With Immer
  if (action.type === ITEM_QUANTITY_UPDATED) {
      const item = state.find((item) => item.uuid === action.payload.uuid);
      item.quantity = parseInt(action.payload.quantity,10)
  }
}, initialItems);

export default reducer;
