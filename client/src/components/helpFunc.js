
//a function to return a random number between min and max
const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};





export { rand };