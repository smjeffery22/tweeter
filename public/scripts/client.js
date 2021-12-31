/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Escape function for XSS
  const escape = function(str) {
    let div = document.createElement("div");

    div.appendChild(document.createTextNode(str));

    return div.innerHTML;
  };
  
  // Fetch tweets from /tweets page
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweetPosts) => {
        renderTweets(tweetPosts);
      },
      error: (err) => {
        console.log('error:', err);
      }
    });
  };

  // Take an array of tweet objects
  // Append each one to #tweet-post-container 
  const renderTweets = function(tweets) {
    $('#tweet-post-container').empty();
    
    for (const tweet of tweets) {
      $('#tweet-post-container').prepend(createTweetElement(tweet));
    }
  };

  // Take in a tweet object
  // Return a tweet <article> element containing the entire HTML structure of the tweet
  const createTweetElement = function(data) {
    const $tweet = $(`
    <article class="tweet">
      <header class="content-header">
        <span class="tweeter-name"><img src=${data.user.avatars}> ${data.user.name}</span>
        <span class="tweeter-id">${data.user.handle}</span>
      </header>
      <p class="tweet-content">${escape(data.content.text)}</p>
      <footer class="content-footer">
        <span class="date-count">${timeago.format(data.created_at)}</span>
        <div class="footer-icons">
          <div><i class="fas fa-flag"></i></div>
          <div><i class="fas fa-retweet"></i></div>
          <div><i class="fas fa-heart"></i></div>
        </div>
      </footer>
    </article>`);

    return $tweet;
  };

  loadTweets();

  // Event listener for toggle tweeter form
  $('label[id=navbar-tweet-compose]').on('click', function(event) {
    console.log(event);
    $('section.new-tweet').slideToggle();
  })

  const totalAllowedCount = $('.counter').val();
  
  // Event listener for submit and prevent its default behaviour
  $('form').on('submit', function(event) {
    event.preventDefault();

    // Store the user input
    const tweetInput = $(this).find('#tweet-text').val();
    const tweetInputCounter = $(this).find('#tweet-text').val().length;
    
    // Tweet checks and validations
    if (!tweetInput) {
      $('#submit-box').slideUp();
      $('#error-box-exceed').slideUp();
      $('#error-box-empty').slideDown();
      return;
    } else if (tweetInputCounter > totalAllowedCount) {
      $('#submit-box').slideUp();
      $('#error-box-empty').slideUp();
      $('#error-box-exceed').slideDown();
      return;
    } else {
      // Serialize the form data and send it to the server
      const serializedData = $(this).serialize();
      
      $.post('/tweets', serializedData, () => {
        loadTweets();

        // Clear textarea and reset the character counter
        $('#tweet-text').val('');
        $('.counter').val(totalAllowedCount);
      });

      $('#error-box-empty').slideUp();
      $('#error-box-exceed').slideUp();
      $('#submit-box').slideDown();
    }
  });
});