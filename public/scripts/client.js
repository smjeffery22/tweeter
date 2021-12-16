/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Escape function for XSS
  const escape = function (str) {
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
        renderTweets(tweetPosts)
      },
      error: (err) => {
        console.log('error:', err);
      }
    })
  };

  // Take an array of tweet objects
  // Append each one to #tweet-post-container 
  const renderTweets = function(tweets) {
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
  }

  loadTweets();

  // Evenet listener for submit and prevent its default behaviour
  // Serialize the form data and send it to the server
  const totalAllowedCount = $('.counter').val();

  $('form').on('submit', function(event) {
    event.preventDefault();

    // Store the user input
    const tweetInput = $(this).find('#tweet-text').val();
    const tweetInputCounter = $(this).find('#tweet-text').val().length;
    
    // Tweet checks and validations
    if (tweetInput === '' || tweetInput === null) return alert('Your tweet cannot be empty!');
    if (tweetInputCounter > totalAllowedCount) return alert(`Tweet message cannot be more than ${totalAllowedCount} characters!`);

    const serializedData = $(this).serialize();
    
    $.post('/tweets', serializedData, (response) => {
      loadTweets();
      $('#tweet-text').val('');
    })
    alert('Your tweet has been submitted!');
  })
})