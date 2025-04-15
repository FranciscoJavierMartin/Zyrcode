(function () {
  // Function to enhance console methods
  function enhanceConsoleMethod(method) {
    // Save the original method
    const originalMethod = console[method];

    // Override the method with a custom function
    console[method] = function (...args) {
      // Get the stack trace
      const stackTrace = new Error().stack?.split('\n');

      // Extract the line number and file name from the stack trace
      const callerLine = stackTrace?.[2].trim();
      const line = callerLine?.split(':')[1];

      // Call the original method with the additional information
      originalMethod(`[${method.toUpperCase()} Line ${line}]`, ...args);
    };
  }

  // List of console methods to enhance
  const consoleMethods = ['log', 'error', 'warn', 'info', 'debug'];

  // Enhance each console method
  consoleMethods.forEach((method) => enhanceConsoleMethod(method));
})();

// Example usage
console.log('This is a test message.');
console.error('This is an error message.');
console.warn('This is a warning message.');
console.info('This is an info message.');
console.debug('This is a debug message.');
