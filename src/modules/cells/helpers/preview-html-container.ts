export const previewHTMLContainer: string = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      const _log = console.log;

      console.log = function (...args) {
        window.parent.postMessage(
          {
            source: 'iframe',
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
          eval(event.data)
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
