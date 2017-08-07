export default function rollbar(RollbarProvider){
  "ngInject";

  console.log('relse rollbar ocnfig ----', window._release);
    RollbarProvider.init({
      accessToken: '7368f1bdec554a9dade4166ab5d7425d',
      captureUncaught: true,
      payload: {
        environment: 'dev',
        client: {
              javascript: {
                source_map_enabled: true,
                code_version: window._release,
                // Optionally have Rollbar guess which frames the error was thrown from
                // when the browser does not provide line and column numbers.
                guess_uncaught_frames: true
              }
            }
      }
    });
}