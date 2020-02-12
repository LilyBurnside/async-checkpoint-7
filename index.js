'use strict';

function displayResults(responseJson){
  $('.results').empty();
  for (let i = 0; i < responseJson.length; i++ ){
    $('.results').append(
      `<p> ${responseJson.full_name} </p>
      <p> ${responseJson.html_url} </p>`
    );
  }
}

function getResults(query) {
  const url = `https://api.github.com/orgs/${query}/repos`;
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function handleSubmit() {
  $('button').submit( function(event) {
    event.preventDefault();
    console.log('handlesubmitruns');
    const query = $('input').val();
    getResults(query);
  });
}

$(handleSubmit);