/**
 * Method to get the Select options in the multi select element.
 */
export const getMultiSelectedValues = (dropDown) => {
    const selectedOptionValueArray = [];
    if (dropDown) {
        for (let i = 0, dropDownOptionLen = dropDown.options.length; i < dropDownOptionLen; i += 1) {
            if (dropDown.options[i].selected) {
                selectedOptionValueArray.push(dropDown.options[i].value);
            }
        }
        console.log('selectedOptionValueArray', selectedOptionValueArray);
    }
    return selectedOptionValueArray;
};
