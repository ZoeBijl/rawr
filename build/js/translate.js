(function(){
  var data;

  var input = document.getElementById('translation-input');
  var output = document.getElementById('translation-output');

  var detectButton = document.getElementById('detect-button');
  var submitButton = document.querySelectorAll('[type="submit"]')[0];

  var languageToolbar = document.getElementById('translation-result');
  var languageButtons = Array.prototype.slice.call(languageToolbar.querySelectorAll('[data-lang]'), 0);
  var selectedToLanguage = languageToolbar.querySelectorAll('[aria-pressed="true"]')[0].getAttribute('data-lang');

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
    element.setAttribute('aria-pressed', 'true');
    inputChangeHandler();
  };

  function resetAriaSelected() {
    languageButtons.forEach(function(button) {
      button.removeAttribute('aria-pressed');
    });
  };

  function inputChangeHandler() {
    var value = input.value;

    var valueStart = value.split(' ', 2)[0].toLowerCase();
    var valuePlus = value.split(' ', 2)[1];

    switch (valueStart) {
      case 'rawr':
      case 'roar':
      case 'grrr':
      case 'gro':
        translate(valueStart, valuePlus);
        break;
      default:
        clearTranslation();
        break;
    }
  };

  function translate(valueStart, valuePlus) {
    var key = data[valueStart];
    var translation = key[selectedToLanguage];

    if (valuePlus) {
      key = data[valueStart + '+'];
      translation = key[selectedToLanguage].replace('%s', valuePlus);
    }

    output.innerHTML = translation;
    detectButton.innerHTML = "Dinosaur - detected";
  };

  function clearTranslation() {
    output.innerHTML = "";
    detectButton.innerHTML = "Detect language";
  }
})();
