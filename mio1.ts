(function () {
  // Save the original console.log method
  const originalLog = console.log;

  // Override console.log with a custom function
  console.log = function (...args) {
    // Get the stack trace
    const stackTrace = new Error().stack?.split('\n');

    // Extract the line number and file name from the stack trace
    const callerLine = stackTrace?.[2].trim();
    const line = callerLine?.split(':')[1];

    // Call the original console.log method with the additional information
    originalLog(`[Line ${line}]`, ...args);
  };
})();

// Example usage
console.log('This is a test message.');
