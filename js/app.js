const $container = $('.container');

$(function() {
  $('#name').focus();
  $('#other-title').hide();
  $('#colors-js-puns').hide();
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
    return amtsArray.reduce((a, b) => {
      return a + b;
    })
  } else {
    return 0;
  }
}




