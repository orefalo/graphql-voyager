const { version } = require('../package.json');

export interface MiddlewareOptions {
  sdl: string;
  displayOptions?: object;
  headersJS?: string;
}

export default function renderVoyagerPage(options: MiddlewareOptions) {
  const { sdl, displayOptions } = options;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset=utf-8 />
  <meta name="viewport" content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
  <title>GraphQL Voyager</title>
  <style>
    body {
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }
    #voyager {
      height: 100vh;
    }
  </style>
  <link rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/graphql-voyager@${version}/dist/voyager.css"
  />

</head>
<body>
  <main id="voyager">
    <h1 style="text-align: center; color: #5d7e86;"></h1>
  </main>
</body>
<script src="https://cdn.jsdelivr.net/npm/react@16/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@16/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/graphql-voyager@${version}/dist/voyager.min.js"></script>
<script>
  window.addEventListener('load', function(event) {
    var sdl = "${sdl}"
    GraphQLVoyager.init(document.getElementById('voyager'), {
      sdl,
      displayOptions: ${JSON.stringify(displayOptions)},
    })
  })
</script>
</html>
`;
}
