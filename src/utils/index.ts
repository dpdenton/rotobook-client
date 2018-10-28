export const parseFormData = (formData: any) => {

    return Object.keys(formData).reduce((prevValue, currentValue) => {
        const field = formData[currentValue];
        prevValue[currentValue] = field.value;
        return prevValue;
    }, {})
};

