$(document).ready(function() {
  // Grab the total allowed tweet text counts
  const totalAllowedCount = $('.counter').val();
  
  // Read tweet input and update the remaining character
  $('#tweet-text').on('input', function() {
    const typeCount = this.value.length;
    const remainingCount = totalAllowedCount - typeCount;

    (typeCount > totalAllowedCount) ? $('.counter').css({'color': 'red'}) : $('.counter').css('color', '#545149');

    $('#counter').text(remainingCount);
  })
});