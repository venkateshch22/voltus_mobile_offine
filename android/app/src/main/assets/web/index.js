window.addEventListener('load', function () {

  if (window.ReactNativeWebView.injectedObjectJson()) {

    const surveyJson = JSON.parse(
      window.ReactNativeWebView.injectedObjectJson(),
    ).form;

    const themeJson = JSON.parse(
      window.ReactNativeWebView.injectedObjectJson(),
    ).theme;
    
    const survey = new Survey.Model(surveyJson);

    function alertResults(sender) {
      const results = JSON.stringify(sender.data);
      alert(results);
      window.ReactNativeWebView.postMessage(results);
    }

    survey.onComplete.add(alertResults);
    survey.applyTheme(themeJson);

    $(function () {
      $('#surveyContainer').Survey({model: survey});
    });
  }
});
