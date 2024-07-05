window.addEventListener('load', function () {
  if (window.ReactNativeWebView.injectedObjectJson()) {
    const surveyJson = JSON.parse(
      window.ReactNativeWebView.injectedObjectJson(),
    ).form;

    const themeJson = JSON.parse(
      window.ReactNativeWebView.injectedObjectJson(),
    ).theme;

    const responseJson = JSON.parse(window.ReactNativeWebView.injectedObjectJson())?.response;

    const survey = new Survey.Model(surveyJson);

    if(responseJson){
      survey.data = responseJson;
      survey.mode = 'display';
    }
    
    function alertResults(sender) {
      // survey.data = sender.data
      const results = JSON.stringify(sender.data);
      window.ReactNativeWebView.postMessage(results);
    }

    survey.onComplete.add(alertResults);
    survey.applyTheme(themeJson);

    $(function () {
      $('#surveyContainer').Survey({model: survey});
    });
  }
});
