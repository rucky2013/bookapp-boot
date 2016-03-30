'use strict';

import config from './index.config';
import run from './index.run';

require('../assets/images/books.png');

const App = angular.module(
    "bookapp-ui", [
    // plugins
    require('angular-ui-router'),
    "ngResource",

    // routes
    require("./index.routes").name,

    // modules
    require("./bookapp/bookapp.module").name
  ]
);

App
  .config(config)
  .run(run);

export default App;