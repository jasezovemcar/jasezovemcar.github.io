var userInput = "";

function restrictInput(event) {
    var inputElement = event.target;
    var inputValue = inputElement.value;
    var numericValue = inputValue.replace(/[^0-9]/g, '');
    var warningElement = document.getElementById('warning');
    var submitButton = document.getElementById('submitButton');
  
    //ogranicava na 13 cifri input
    if (numericValue.length > 13) {
      numericValue = numericValue.slice(0, 13);
    }
  
    inputElement.value = numericValue;
    userInput = numericValue;

    if (numericValue.length === 13) {
      submitButton.classList.remove('hidden');
    } else {
      submitButton.classList.add('hidden');
    }

    if (inputValue !== numericValue) {
      warningElement.style.display = 'block';
      submitButton.disabled = true;
    } else {
      warningElement.style.display = 'none';
      submitButton.disabled = false;
    }
  }
