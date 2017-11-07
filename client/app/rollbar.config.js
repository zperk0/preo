export default function rollbar(RollbarProvider){
  "ngInject";
  // if (window._PREO_DATA._ROLLBAR_ENV && window._PREO_DATA._ROLLBAR_CLIENT_TOKEN) {
  //   RollbarProvider.init({
  //     accessToken: window._PREO_DATA._ROLLBAR_CLIENT_TOKEN,
  //     captureUncaught: true,
  //     payload: {
  //       environment: window._PREO_DATA._ROLLBAR_ENV,
  //       client: {
  //             javascript: {
  //               source_map_enabled: true,
  //               code_version: window._release,
  //               // Optionally have Rollbar guess which frames the error was thrown from
  //               // when the browser does not provide line and column numbers.
  //               guess_uncaught_frames: true
  //             }
  //           }
  //     }
  //   });
  // } else {
  //   RollbarProvider.init({enabled: false});
  // }
}