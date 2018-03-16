/**
 * get the first element of a tuple
 * 
 * @param {object} tuple 
 * @return {any} primitive value
 */
export const fst = tuple => tuple.getFst();

/**
 * get the second element of a tuple
 * 
 * @param {object} tuple 
 * @return {any} primitive value
 */
export const snd = tuple => tuple.getSnd();

/**
 * get the element of a tuple specified by the number.
 * Note that elements are zero indexed.
 * 
 * @param {number} number
 * @param {object} tuple 
 * @return {any} primitive value
 */
export const getN = (n, tuple) => tuple.getN(n);

/**
 * set the value as the first element of a tuple.
 * Note that this method doesn't mutate original object;
 * 
 * @param {any} value
 * @param {object} tuple 
 * @return {any} primitive value
 */
export const setFst = (value, tuple) => tuple.setFst(value);

/**
 * set the value as the second element of a tuple.
 * Note that this method doesn't mutate original object;
 * 
 * @param {any} value
 * @param {object} tuple 
 * @return {any} primitive value
 */
export const setSnd = (value, tuple) => tuple.setSnd(value);

/**
 * set the value at specified position of a tuple.
 * Note that this method doesn't mutate original object;
 * Note that elements are zero indexed.
 * 
 * @param {any} value
 * @param {object} tuple 
 * @return {any} primitive value
 */
export const setN = (n, value, tuple) => tuple.setN(n, value);

/**
 * Casts a tuple to array
 * 
 * @param {object} tuple 
 * @return {array}
 */
export const toArray = tuple => tuple.toArray();

/**
 * Casts a tuple to object
 * 
 * @param {object} tuple 
 * @return {array}
 */
export const toObject = tuple => tuple.toObject();

export const is = (tupleConstructor, tuple) => tuple.is(tupleConstructor);

export const of = tupleConstructor => (...args) => {
  if (args.length === 1 && Array.isArray(args[0])) {
    return tupleConstructor.of(...args[0]);
  }
  return tupleConstructor.of(...args);
};

export const destructureTuple = fn => (...args) =>
  fn(
    ...args.map(
      arg =>
        arg.constructor.name.toLowerCase() === 'tuple' ? arg.toArray() : arg
    )
  );
