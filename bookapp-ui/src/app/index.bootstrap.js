'use strict';

// favicon to target folder
import '!!file-loader?name=[name].[ext]!../favicon.ico';

// main App module
import "./index.module";
import "../assets/styles/sass/index.scss";

angular.element(document).ready(function () {
  angular.bootstrap(document, ['bookapp-ui'], {
    strictDi: true
  });
});
