module.exports = function (price) {
  if (typeof price !== "number") return "This is not a valid value";

  return `US$ ${price.toFixed(2)}`;
};
