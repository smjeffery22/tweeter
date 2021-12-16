/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

// Take in a tweet object
// Return a tweet <article> element containing the entire HTML structure of the tweet
const createTweetElement = function(data) {
  const $tweet = $(`
  <article class="tweet">
    <header class="content-header">
      <span class="tweeter-name">${data.user.avatars} ${data.user.name}</span>
      <span class="tweeter-id">${data.user.handle}</span>
    </header>
    <p class="tweet-content">${data.content.text}</p>
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

const $tweet = createTweetElement(tweetData);

$('#tweet-post-container').append($tweet);
})