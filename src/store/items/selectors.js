import { createSelector } from "reselect";

// A selector is basically something that takes your large state tree and get the parts that you need of.

export const selectItems = (state) => state.items;
export const selectTipPercentage = (state) => state.tipPercentage;


export const selectItem = (state,props) => {
    return state.items.find((item) => item.uuid === props.uuid);    
}

export const selectItemTotal = createSelector(
    [selectItem],
    (item)=> item.price * item.quantity
);

export const selectSubtotal = createSelector([selectItems], (items) => 
    items.reduce((sum,item) => sum + item.price * item.quantity, 0)
);

/**
 * Calculates the tip amount based on the subtotal and tip percentage.
 * @returns {number} The tip amount.
 */
export const selectTipAmount = createSelector(
    [selectSubtotal, selectTipPercentage],
     (subtotal, tipPercentage) => subtotal * (tipPercentage / 100)
);



/**
 * Calculates the total amount based on the subtotal and tip amount.
 * @returns {number} The total amount.
 */
export const selectTotal = createSelector(
    [selectSubtotal, selectTipAmount],
    (subtotal, tipAmount) => subtotal + tipAmount
);