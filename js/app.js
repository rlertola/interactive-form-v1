const $container = $('.container');

$(function() {
  $('#name').focus();
  $('#other-title').hide();
  $('#colors-js-puns').hide();
  showAndHide('credit-card', 'bitcoinOption', 'paypalOption');
  $('#mailTip').hide();
  $('#registerButton').attr('disabled', true);
  $('#ccNumTip').hide();
  $('#ccZipTip').hide();
  $('#ccCvvTip').hide();
})

// Job Role
$('#title').on('change', (e) => {
  if (e.target.value === 'other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
})

// T-Shirt
$('#design').on('change', (e) => {
  if (e.target.value === 'js puns') {
    $('#colors-js-puns').show();
    displayColors('#color', 'JS Puns shirt only')
  }

  if (e.target.value === 'heart js') {
    $('#colors-js-puns').show();
    displayColors('#color', 'JS shirt only')
  }

  if (e.target.value === 'Select Theme') {
    $('#colors-js-puns').hide();
  }
})

const displayColors = (id, string) => {
  $('#defaultOption').text('Select Color');
  $(id).children().each((i, item) => {
    if (!item.text.includes(string)) {
      $(item).hide();
    } else {
      $(item).show();
    }
  })
}

let amountArray = [];
// Register for Activities
$('.activities').on('change', (e) => {
  const parent = e.target.parentElement;
  const string = parent.textContent;

  const amountRegex = /\d{3}/;
  const amount = string.match(amountRegex)[0];
  const amountInt = parseInt(amount);

  let day;
  const dayRegex = /(mon|tues|wed|thur|fri)(\w+)/i;
  if (dayRegex.test(string)) {
    day = string.match(dayRegex)[0];
  };

  let time;
  const timeRegex = /\d\d?(am|pm)-?\d\d?(am|pm)?/;
  if (timeRegex.test(string)) {
    time = string.match(timeRegex)[0];
  }

  const $labels = $('.activities').children();

  if (e.target.checked) {
    amountArray.push(amountInt);
  } else {
    amountArray.pop(amountInt);
  }

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
  $('#total').text(`Total: $${getTotal(amountArray)}`);
})

// Gets total of things checked.
const getTotal = (amtsArray) => {
  if (amtsArray.length > 0) {
    $('#registerButton').attr('disabled', false);
    return amtsArray.reduce((a, b) => {
      return a + b;
    })
  } else {
    $('#registerButton').attr('disabled', true);
    return 0;
  }
}

// Payment Info Section
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

const showAndHide = (show, hide1, hide2) => {
  $(`#${show}`).show();
  $(`#${hide1}`).hide();
  $(`#${hide2}`).hide();
}

// Form Validation

// Name field can't be blank
$('#name')
  .blur((e) => {
    if (e.target.value === '') {
      $('#nameTip').show();
      $('#registerButton').attr('disabled', true);
    } else {
      $('#nameTip').hide();
      $('#registerButton').attr('disabled', false);
    }
  })
  .focus((e) => {
    $('#nameTip').hide();
    $('#registerButton').attr('disabled', true);
  })

// Must be a valid email address
const isValidEmail = (email) => {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

$('#mail').on('input', (e) => {
  const valid = isValidEmail(e.target.value);
  if (valid) {
    $('#mailTip').hide();
    $('#registerButton').attr('disabled', false);
  } else {
    $('#mailTip').show();
    $('#registerButton').attr('disabled', true);
  }
})

// Credit card field should be a number between 13-16 digits
const isValidCreditCard = (ccNumber) => {
  return checkCCInfo(ccNumber, 13, 16);
}

// The Zip Code field should be a 5-digit number
const isValidZip = (zipCode) => {
  return checkCCInfo(zipCode, 5, 5);
}

// The CVV should be 3 digits long
const isValidCVV = (CVV) => {
  return checkCCInfo(CVV, 3, 3);
}

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

$('#cc-num').blur((e) => {
  const valid = isValidCreditCard(e.target.value);
  if (valid) {
    $('#ccNumTip').hide();
    $('#registerButton').attr('disabled', false);
  } else {
    $('#ccNumTip').show();
    $('#registerButton').attr('disabled', true);
  }
})

$('#zip').blur((e) => {
  const valid = isValidZip(e.target.value);
  if (valid) {
    $('#ccZipTip').hide();
    $('#registerButton').attr('disabled', false);
  } else {
    $('#ccZipTip').show();
    $('#registerButton').attr('disabled', true);
  }
});

$('#cvv').blur((e) => {
  const valid = isValidCVV(e.target.value);
  if (valid) {
    $('#ccCvvTip').hide();
    $('#registerButton').attr('disabled', false);
  } else {
    $('#ccCvvTip').show();
    $('#registerButton').attr('disabled', true);
  }
});

$('#registerButton').on('click', () => {
  if (amountArray.length === 0) {
    $('#registerButton').attr('disabled', true);
  }
});


















