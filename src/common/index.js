export const isEmpty = prop => {
  return (
    prop == null ||
    prop == undefined ||
    (prop.hasOwnProperty('length') && prop.length == 0) ||
    (prop.constructor == Object && Object.keys(prop).length == 0) ||
    (prop instanceof Date && isNaN(prop.getTime()))
  );
};
