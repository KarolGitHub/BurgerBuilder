export const updateObject = (oldObject, ...updatedProps) => {
    let updatedObject = {};

    for (let props of updatedProps) {
        updatedObject = { ...updatedObject, ...props };
    }
    return {
        ...oldObject,
        ...updatedObject
    };
};
