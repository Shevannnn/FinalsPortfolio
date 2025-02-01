$(document).ready(function() {
  // Object to store the preloaded HTML files
  let preloadedPages = {};

  // Preload the HTML files
  let pages = ['index.html', 'about.html', 'contact.html', 'projects.html'];
  
  pages.forEach(function(page) {
      // Fetch each page and store it in preloadedPages
      fetch(page)
          .then(response => response.text())
          .then(data => {
              preloadedPages[page] = data;
          })
          .catch(error => console.error('Error preloading page: ' + page, error));
  });

  // Handle navigation when a link is clicked
  $('.preload-link').on('click', function(e) {
      e.preventDefault(); // Prevent the default behavior (reloading the page)
      let page = $(this).data('page'); // Get the page to load

      // Inject preloaded content into the #content div
      if (preloadedPages[page]) {
          $('#content').html(preloadedPages[page]);
      } else {
          // Fallback to loading the page content if not preloaded
          $('#content').load(page);
      }
  });
});

$('.preload-link').on('click', function(e) {
  e.preventDefault(); // Prevent default link behavior
  let page = $(this).data('page'); // Get the page to load

  // Update the URL in the browser
  history.pushState({ page: page }, '', page);

  // Inject preloaded content into the #content div
  if (preloadedPages[page]) {
      $('#content').html(preloadedPages[page]);
  } else {
      // Fallback to loading the page content if not preloaded
      $('#content').load(page);
  }
});