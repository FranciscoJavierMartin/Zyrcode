export function getPreviewHTMLContainer(id: string): string {
  return `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      const _log = console.log;





      console.log = function (...args) {
        const error = new Error();
        const stackLines = error.stack.split('\\n');
        console.warn(stackLines);

        window.parent.postMessage(
          {
            id: '${id}',
            source: 'code-preview',
            message: args,
          },
          '*',
        );

        _log.apply(console, args);
      };

      window.addEventListener('message', (event) => {
        const handleError = (error) => {
          const root = document.getElementById('root');
          root.innerHTML = '<div style="color: red;">' + error + '</div>';
          console.error(error);
        };

        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error)
        });

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

// (() => {
//   const enhanceConsoleMethod = (method) => {
//     const originalMethod = console[method];
//     const logger = (...args) => {
//       // const stackTrace = new Error().stack?.split(c);

//       const errors =
//         'Error\n    at console.logger [as log] (about:srcdoc…2:11), <anonymous>:4:3)\n    at about:srcdoc:37:11'
//           // .replaceAll('\n', '\n')

//           .split(':');
//       const line = errors[errors.length - 2];

//       // console.log(stackTrace)
//     };

//     console[method] = logger;
//   };
//   const consoleMethods = ['log', 'error', 'warn', 'debug'];
//   consoleMethods.forEach((method) => enhanceConsoleMethod(method));
// })();

// (() => {
//   const enhanceConsoleMethod = (method) => {
//     console.debug(method);
//     const originalMethod = console[method];
//     const meto = (...args) => {
//       const stackTrace = new Error().stack?.split('\n');
//       const callerLine = stackTrace?.[2].trim();
//       const line = callerLine?.split(':')[1] ?? '';

//       window.parent.postMessage(
//         {
//           id: '${id}',
//           source: 'code-preview',
//           line,
//           method,
//           message: args,
//         },
//         '*',
//       );

//       originalMethod(...args);
//     };

//     console[method] = meto;
//   };
//   const consoleMethods = ['log', 'error', 'warn', 'debug'];
//   consoleMethods.forEach((method) => enhanceConsoleMethod(method));
// })();

// (() => {
//   const enhanceConsoleMethod = (method) => {
//     const originalMethod = console[method];
//     console.debug(method);
//     const meto = (...args) => {
//       const stackTrace = new Error().stack?.split('\n');
//       const callerLine = stackTrace?.[2].trim();
//       const line = callerLine?.split(':')[1] ?? '';

//       window.parent.postMessage(
//         {
//           id: '${id}',
//           source: 'code-preview',
//           line,
//           method,
//           message: args,
//         },
//         '*',
//       );

//       originalMethod(...args);
//     };

//     console[method] = meto;
//   };
//   const consoleMethods = ['log', 'error', 'warn', 'debug'];
//   consoleMethods.forEach((method) => enhanceConsoleMethod(method));
// })();

// (() => {
//   const enhanceConsoleMethod = (method) => {
//     const originalMethod = console[method];
//     console.debug(method);
//     console[method] = (...args) => {
//       const stackTrace = new Error().stack?.split('\n');
//       const callerLine = stackTrace?.[2].trim();
//       const line = callerLine?.split(':')[1] ?? '';

//       window.parent.postMessage(
//         {
//           id: '${id}',
//           source: 'code-preview',
//           line,
//           method,
//           message: args,
//         },
//         '*',
//       );

//       originalMethod(...args);
//     };
//   };
//   const consoleMethods = ['log', 'error', 'warn', 'debug'];
//   consoleMethods.forEach((method) => enhanceConsoleMethod(method));
// })();

// (function () {
//   function enhanceConsoleMethod(method) {
//     const originalMethod = console[method];

//     console[method] = function (...args) {
//       const stackTrace = new Error().stack?.split('\n');
//       const callerLine = stackTrace?.[2].trim();
//       const line = callerLine?.split(':')[1] ?? '';

//       window.parent.postMessage(
//         {
//           id: '${id}',
//           source: 'code-preview',
//           line,
//           method,
//           message: args,
//         },
//         '*',
//       );

//       originalMethod(...args);
//     };
//   }
//   const consoleMethods = ['log', 'error', 'warn', 'info', 'debug'];
//   consoleMethods.forEach((method) => enhanceConsoleMethod(method));
// })();
