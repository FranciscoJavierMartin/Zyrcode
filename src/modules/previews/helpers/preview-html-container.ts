export function getPreviewHTMLContainer(id: string): string {
  return `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      const enhanceConsoleMethod = (method) => {
        const originalMethod = console[method];
        console[method] = function (...args) {
          const error = new Error();
          const stackLines = error.stack.split('\\n');
          const location = stackLines[2].trim().split(':');
          const lineNumber = location[location.length - 2];
          window.parent.postMessage(
            {
              id: '${id}',
              source: 'code-preview',
              message: args,
              method,
              lineNumber: +lineNumber,
            },
            '*',
          );
          originalMethod.apply(console, args);
        };
      };
      const consoleMethods = ['log', 'error', 'warn', 'debug', 'info'];
      consoleMethods.forEach((method) => enhanceConsoleMethod(method));

      const handleError = (error) => {
        const root = document.getElementById('root');
        root.innerHTML = '<div style="color: red;">' + error + '</div>';
        console.error(error);
      };

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch(error){
          if(error instanceof Error){
            return {
              code: '',
              error: error.message
            }
          } else {
            throw error;
          }
        }
      }, false);
    </script>
  </body>
</html>
`;
}
