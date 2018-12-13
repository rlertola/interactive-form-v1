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

