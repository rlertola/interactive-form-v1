
// On startup.
$(function() {
  $('#name').focus();
  showAndHide('credit-card', 'bitcoinOption', 'paypalOption');
  hideIt('#other-title');
  hideIt('#colors-js-puns');
  hideIt('#mailTip');
  hideIt('#ccNumTip');
  hideIt('#ccZipTip');
  hideIt('#ccCvvTip');
  hideIt('#altTip');
  hideIt('#activityTip');
  hideIt('#registerTip');
  // disableRegisterButton();
})

// Helper functions for showing/hiding.
const showIt = (id) => {
  $(id).show();
}
const hideIt = (id) => {
  $(id).hide();
}

/* Helper function for enabling/disabling the register button.
Disabled when any field is empty or invalid. */
const enableRegisterButton = () => {
  hideIt('#registerTip');
  $('#registerButton').attr('disabled', false);
}
const disableRegisterButton = () => {
  showIt('#registerTip');
  $('#registerButton').attr('disabled', true);
}


// JOB ROLE SECTION
// When 'other' is selected, a box to enter a role appears.
$('#title').on('change', (e) => {
  if (e.target.value === 'other') {
    showIt('#other-title');
  } else {
    hideIt('#other-title');
  }
})

// T-SHIRT INFO SECTION
// Shows different shirt options based on the theme selected.
$('#design').on('change', (e) => {
  if (e.target.value === 'js puns') {
    showIt('#colors-js-puns');
    displayColors('#color', 'JS Puns shirt only')
  }
  if (e.target.value === 'heart js') {
    showIt('#colors-js-puns');
    displayColors('#color', 'JS shirt only')
  }
  if (e.target.value === 'Select Theme') {
    hideIt('#colors-js-puns');
  }
})

// Helper function for displaying shirt options.
const displayColors = (id, string) => {
  $('#defaultOption').text('Select Color');
  $(id).children().each((i, item) => {
    if (!item.text.includes(string)) {
      hideIt(item);
    } else {
      showIt(item);
    }
  })
}

// REGISTER FOR ACTIVITIES SECTION
/* Gets the string with the activity info, extracts the amount,
day and time, and blocks out any time conflicts. */
let amountArray = [];
$('.activities').on('change', (e) => {
  hideIt('#activityTip')
  const parent = e.target.parentElement;
  const string = parent.textContent;

  // Gets the amount
  const amountRegex = /\d{3}/;
  const amount = string.match(amountRegex)[0];
  const amountInt = parseInt(amount);
  // Gets the day
  let day;
  const dayRegex = /(mon|tues|wed|thur|fri)(\w+)/i;
  const dayTest = dayRegex.test(string);
  if (dayTest) {
    day = string.match(dayRegex)[0];
  };
  // Gets the time
  let time;
  const timeRegex = /\d\d?(am|pm)-?\d\d?(am|pm)?/;
  const timeTest = timeRegex.test(string);
  if (timeTest) {
    time = string.match(timeRegex)[0];
  }

  // When activity is checked, puts the cost in an array.
  if (e.target.checked) {
    amountArray.push(amountInt);
  } else {
    amountArray.pop(amountInt);
  }

  // Blocks out the activities that conflict with checked ones.
  const $labels = $('.activities').children();
  $labels.each((i, label) => {
    let string = label.textContent;
    let timeLabel = string.match(timeRegex);
    let dayLabel = string.match(dayRegex);
    if (timeLabel !== null) {
      timeLabel = string.match(timeRegex)[0];
      dayLabel = string.match(dayRegex)[0];
      if (timeLabel === time && dayLabel === day) {
        if (e.target.checked === true) {
          label.className = 'timeConflict';
          parent.className = 'inherit';
        } else {
          label.className = 'inherit';
        }
      }
    }
  })
  // Displays the total cost of activities checked.
  $('#total').text(`Total: $${getTotal(amountArray)}`);
})

// Gets total cost of activities checked.
const getTotal = (amtsArray) => {
  if (amtsArray.length > 0) {
    // enableRegisterButton();
    return amtsArray.reduce((a, b) => {
      return a + b;
    })
  } else {
    // disableRegisterButton();
    return 0;
  }
}


// PAYMENT INFO SECTION
// Displays CC by default. When one is selected, hides the others.
$('#payment').on('change', (e) => {
  if (e.target.value === 'credit card') {
    showAndHide('credit-card', 'bitcoinOption', 'paypalOption');
  }
  if (e.target.value === 'paypal') {
    showAndHide('paypalOption', 'credit-card', 'bitcoinOption');
  }
  if (e.target.value === 'bitcoin') {
    showAndHide('bitcoinOption', 'credit-card', 'paypalOption');
  }
});

// Helper function for showing and hiding payment options.
const showAndHide = (show, hide1, hide2) => {
  showIt(`#${show}`);
  hideIt(`#${hide1}`);
  hideIt(`#${hide2}`);
}


// FORM VALIDATION

// Name field can't be blank.
$('#name')
  .blur((e) => {
    if (e.target.value === '') {
      showIt('#nameTip');
      // disableRegisterButton();
    } else {
      hideIt('#nameTip');
      // enableRegisterButton();
    }
  })
  .focus(() => {
    hideIt('#nameTip');
    // disableRegisterButton();
  })

// Must be a valid email address.
const isValidEmail = (email) => {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

// Helper function to show error messages.
const displayErrors = (e, id, checkerFunc) => {
  const valid = checkerFunc(e.target.value);
  if (valid) {
    hideIt(id);
    // enableRegisterButton();
  } else {
    showIt(id);
    // disableRegisterButton();
  }
}

/* Hides the alt tip and shows the valid email tip if field isn't empty.
If empty, shows the alt tip and hides the valid email tip. */
$('#mail')
  .on('input', (e) => {
    hideIt('#altTip');
    displayErrors(e, '#mailTip', isValidEmail);
  })
  .blur((e) => {
    if (e.target.value === '') {
      hideIt('#mailTip');
      showIt('#altTip');
      // disableRegisterButton();
    }
  })


// PAYMENT INFO SECTION
// Credit card field should be a number between 13-16 digits.
const isValidCreditCard = (ccNumber) => {
  return checkCCInfo(ccNumber, 13, 16);
}

// The Zip Code field should be a 5-digit number.
const isValidZip = (zipCode) => {
  return checkCCInfo(zipCode, 5, 5);
}

// The CVV should be 3 digits long.
const isValidCVV = (CVV) => {
  return checkCCInfo(CVV, 3, 3);
}

// Helper function to validate cc number, zip and cvv.
const checkCCInfo = (numType, min, max) => {
  const isNumber = parseInt(numType);
  if (isNumber) {
    const length = numType.toString().length;
    if (min === max) {
      if (length === min) {
        return true;
      } else {
        return false;
      }
    }
    if (length >= min && length <= max) {
      return true;
    } else {
      return false;
    }
  }
}

// Shows error messages for cc number, zip and cvv.
$('#cc-num').blur((e) => {
  displayErrors(e, '#ccNumTip', isValidCreditCard);
})
$('#zip').blur((e) => {
  displayErrors(e, '#ccZipTip', isValidZip);
});
$('#cvv').blur((e) => {
  displayErrors(e, '#ccCvvTip', isValidCVV);
});


/* At least one activity must be selected or
register button will be disabled. */
$('#registerButton').on('click', (e) => {
  if (amountArray.length === 0) {
    e.preventDefault();
    showIt('#activityTip');
    showIt('#registerTip')
  }
  checkTip(e, '#nameTip');
  checkTip(e, '#altTip');
  checkTip(e, '#ccNumTip');
  checkTip(e, '#ccZipTip');
  checkTip(e, '#ccCvvTip');
})

const checkTip = (e, id) => {
  if ($(id).css('display') !== 'none') {
    showIt(id);
    showIt('#registerTip')
    e.preventDefault();
  }
}



















