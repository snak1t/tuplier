// Symbols

const fstVal = Symbol('fstVal');
const sndVal = Symbol('sndVal');
const otherVal = Symbol('otherVal');

/**
 * Check if the value is instance of type
 * 
 * @param {object} type 
 * @param {any} value 
 * @throws Error if value is not an instance of type
 * @returns bool | error
 */
const typeValueCheker = (type, value) => {
  if (type.name.toLowerCase() === 'array') {
    if (Array.isArray(value)) {
      return true;
    }
  }
  if (typeof value === 'object' && type.name !== 'Object') {
    if (value instanceof type) return true;
    throw new Error(
      `${JSON.stringify(value)} is not an instance of ${type.name}`
    );
  }
  if (type.name.toLowerCase() !== typeof value)
    throw new Error(`${value} is not an instance of ${type.name}`);
  return true;
};

/**
 * Creates a tuple with specified types
 * Allowed arguments are Number | String | Boolean ... etc
 * 
 * @param {object} type1 
 * @param {object} type2 
 * @param {any} otherTypes 
 * @returns {function} TupleConstructor
 */
export const Tuple = (type1, type2, ...otherTypes) => {
  if (typeof type1 === 'undefined' || typeof type2 === 'undefined') {
    throw new Error('Tuple constructor must at least contains of two types');
  }

  function Tuple(val1, val2, ...otherValues) {
    if (!this || !(this instanceof Tuple)) {
      return new Tuple(val1, val2, ...otherValues);
    }
    const allTypes = [type1, type2, ...otherTypes];
    const allValues = [val1, val2, ...otherValues];

    if (allTypes.length !== allValues.length) {
      throw new Error(
        'Length of values must be equal to length of Types used in constructor'
      );
    }

    allTypes.forEach((t, idx) => {
      typeValueCheker(t, allValues[idx]);
    });

    this[fstVal] = val1;
    this[sndVal] = val2;
    this[otherVal] = otherValues;
  }

  Tuple.of = function(val1, val2, ...otherValues) {
    return new Tuple(val1, val2, ...otherValues);
  };

  Tuple.getInitTypes = function() {
    return [type1, type2, ...otherTypes];
  };

  const fn = Tuple.prototype;

  fn.getFst = function() {
    return this[fstVal];
  };

  fn.getSnd = function() {
    return this[sndVal];
  };

  fn.getN = function(n) {
    return this[otherVal][n - 2];
  };

  fn.setFst = function(value) {
    return Tuple.of(value, this[sndVal], ...this[otherVal]);
  };

  fn.setSnd = function(value) {
    return Tuple.of(this[fstVal], value, ...this[otherVal]);
  };

  fn.setN = function(n, value) {
    if (n === 0) {
      console.warn(
        'setN for tuple was invoked for first element. Use setFst instead'
      );
      return this.setFst(value);
    }
    if (n === 1) {
      console.warn(
        'setN for tuple was invoked for second element. Use setSnd instead'
      );
      return this.setSnd(value);
    }
    const others = this[otherVal].map(
      (val, idx) => (idx === n - 2 ? value : val)
    );
    return Tuple.of(this[fstVal], this[sndVal], ...others);
  };

  fn.is = function(tupleConstructor) {
    const tcTypes = tupleConstructor.getInitTypes();
    const ownTypes = this.getTypeRepresentaion();
    return tcTypes.every(
      (t, id) => t.name.toLowerCase() === ownTypes[id].name.toLowerCase()
    );
  };

  fn.toArray = function() {
    return [this[fstVal], this[sndVal], ...this[otherVal]];
  };

  fn.getTypeRepresentaion = function() {
    return [type1, type2, ...otherTypes];
  };

  fn.toObject = function() {
    const stringified = {
      first: this[fstVal],
      second: this[sndVal]
    };
    if (this[otherVal].length !== 0) {
      stringified.others = this[otherVal];
    }

    return stringified;
  };

  fn.toJSON = function() {
    return this.toObject();
  };

  return Tuple;
};
