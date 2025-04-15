// const originalLog = console.log;

// console.log = function (...args) {
//   const error = new Error();
//   const stackLines = error.stack?.split('\n');
//   const callingLine = stackLines?.[2].trim();
//   const lineNumber = callingLine?.split(':')[3];

//   console.info(lineNumber);

//   originalLog.apply(console, [...args, lineNumber]);
// };

const code = `
const originalLog = console.log;

console.log = function (...args) {
  const error = new Error();
  const stackLines = error.stack?.split('\\n');
  const callingLine = stackLines?.[2].trim();
  const lineNumber = callingLine?.split(':')[3];

  console.info(stackLines)
  console.info(lineNumber);

  originalLog.apply(console, [...args, lineNumber]);
};

console.log('Third');
console.log('Fifth');
`;

eval(code);
