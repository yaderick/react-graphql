/* eslint-disable no-param-reassign */
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function doAction(type, payload = {}) {
  return { type, ...payload };
}

export const createConstants = (...constants) =>
  constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});

export const createReducer = (initialState, reducerMap) => {
  if (typeof reducerMap !== 'object' || reducerMap === null) {
    throw new Error('Reducer map isn\'t valid');
  }

  return (state = initialState, action = null) => {
    if (action.type === undefined) {
      throw new Error('Property type in action === undefined');
    }
    const reducer = reducerMap[action.type];

    return reducer ? reducer(state, action) : state;
  };
};

export function createSerializedMap(map) {
  const extMap = map;
  extMap.toJSON = () => {
    const result = [];
    map.forEach((value, key) => {
      result.push([key, value]);
    });
    return { '@__Map': result };
  };
  return extMap;
}

export function deserializeJavascript(source) {
  if (typeof source !== 'object' || source === null) {
    return source;
  }

  let result;
  if (!Array.isArray(source)) {
    if (source['@__Map'] !== undefined) {
      result = createSerializedMap(new Map());
      source['@__Map'].forEach((value) => {
        if (typeof value[1] === 'object' && value[1] !== null) {
          result.set(value[0], deserializeJavascript(value[1]));
        } else {
          result.set(value[0], value[1]);
        }
      });
    } else {
      result = {};
      Object.keys(source).forEach((key) => {
        if (typeof source[key] === 'object' && source[key] !== null) {
          result[key] = deserializeJavascript(source[key]);
        } else {
          result[key] = source[key];
        }
      });
    }
  } else {
    result = [];
    source.forEach((value) => {
      if (typeof value === 'object' && value !== null) {
        result.push(deserializeJavascript(value));
      } else {
        result.push(value);
      }
    });
  }
  return result;
}

export function mapFromJS(source) {
  const result = createSerializedMap(new Map());
  if (Array.isArray(source)) {
    source.forEach((value, index) => {
      if (Array.isArray(value) && value.length === 2) {
        if (typeof value[1] === 'object' && value[1] !== null) {
          result.set(value[0], mapFromJS(value[1]));
        } else {
          result.set(value[0], value[1]);
        }
      } else if (typeof value === 'object' && value !== null) {
        result.set(index, mapFromJS(value));
      } else {
        result.set(index, value);
      }
    });
  } else if (typeof source === 'object' && source !== null) {
    Object.keys(source).forEach((key) => {
      if (typeof source[key] === 'object' && source[key] !== null) {
        result.set(key, mapFromJS(source[key]));
      } else {
        result.set(key, source[key]);
      }
    });
  }
  return result;
}
