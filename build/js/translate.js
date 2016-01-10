(function(){
  var data;

  var input = document.getElementById('translation-input');
  var output = document.getElementById('translation-output');

  var detectButton = document.getElementById('detect-button');
  var submitButton = document.querySelectorAll('[type="submit"]')[0];

  var languageToolbar = document.getElementById('translation-result');
  var languageButtons = Array.prototype.slice.call(languageToolbar.querySelectorAll('[data-lang]'), 0);
  var selectedToLanguage = languageToolbar.querySelectorAll('[aria-selected="true"]')[0].getAttribute('data-lang');

  var request = new XMLHttpRequest();
  request.open('GET', '../data/translate.json', true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      data = JSON.parse(this.response);
    } else {
      // We reached our target server, but it returned an error
      throw new Error('You fucked up');
    }
  };

  request.send();

  languageButtons.forEach(languageButtonsEventAdder);

  submitButton.addEventListener('click', submitButtonClickHandler);

  input.addEventListener('change', inputChangeHandler);
  input.addEventListener('keyup', inputChangeHandler);

  function submitButtonClickHandler(event) {
    event.preventDefault();
  };

  function languageButtonsEventAdder(button) {
    button.addEventListener('click', changeLanguage);
  };

  function changeLanguage(event) {
    var element = this;
    selectedToLanguage = element.getAttribute('data-lang');
    resetAriaSelected();
    element.setAttribute('aria-selected', 'true');
    inputChangeHandler();
  };

  function resetAriaSelected() {
    languageButtons.forEach(function(button) {
      button.removeAttribute('aria-selected');
    });
  };

  function inputChangeHandler() {
    var value = input.value.toLowerCase();

    switch (value) {
      case 'rawr':
      case 'rawrrr':
      case 'grrr':
        translate(value);
        break;
      default:
        clearTranslation();
        break;
    }
  };

  function translate(value) {
    var key = data[value];
    var translation = key[selectedToLanguage];
    output.innerHTML = translation;
    detectButton.innerHTML = "Dinosaur - detected";
  };

  function clearTranslation() {
    output.innerHTML = "";
    detectButton.innerHTML = "Detect language";
  }
})();
