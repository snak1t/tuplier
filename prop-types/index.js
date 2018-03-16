export const propTypeTuple = (...types) => {
  const typeCheck = required => (props, propName, componentName) => {
    const createError = () =>
      new Error(
        `${propName} in ${componentName} doesnt meet type expectaion:
      Expected types: ${types.reduce((acc, t) => acc + t.name + ' ', '')}
      Actual types  : ${tupleTypes.reduce((acc, t) => acc + t.name + ' ', '')}`
      );

    const tuple = props[propName];
    if (!tuple) {
      return required
        ? new Error(`${propName} in ${componentName} mark as required field`)
        : null;
    }
    const tupleTypes = tuple.getTypeRepresentaion();

    if (types.length !== tupleTypes.length) {
      return createError();
    }

    if (types.reduce((acc, t, idx) => t.name !== tupleTypes[idx].name, false)) {
      return createError();
    }

    return null;
  };

  const typeChecker = typeCheck(false);
  typeChecker.isRequired = typeCheck(true);
  return typeChecker;
};
