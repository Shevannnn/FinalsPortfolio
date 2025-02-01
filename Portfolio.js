$(document).ready(function() {
  let preloadedPages = {};

  let pages = ['index.html', 'About.html', 'Contact.html', 'Projects.html'];
  
  pages.forEach(function(page) {
      fetch(page)
          .then(response => response.text())
          .then(data => {
              preloadedPages[page] = data;
          })
          .catch(error => console.error('Error preloading page: ' + page, error));
  });


  $('.preload-link').on('click', function(e) {
      e.preventDefault();
      let page = $(this).data('page');

      if (preloadedPages[page]) {
          $('#content').html(preloadedPages[page]);
      } else {
          $('#content').load(page);
      }
  });
});

$(window).on('popstate', function(e) {
    let state = e.originalEvent.state;
    if (state && state.page) {
        let page = state.page;
        $('#content').fadeOut(300, function() {
            if (preloadedPages[page]) {
                $('#content').html(preloadedPages[page]);
            } else {
                $('#content').load(page);
            }
            $('#content').fadeIn(300);
        });
    }
});


$('.preload-link').on('click', function(e) {
  e.preventDefault(); // Prevent default link behavior
  let page = $(this).data('page'); // Get the page to load

  // Update the URL in the browser
  history.pushState({ page: page }, '', page);

  // Fade out the current content first
  $('#content').fadeOut(300, function() {
      // Inject preloaded content into the #content div
      if (preloadedPages[page]) {
          $('#content').html(preloadedPages[page]);
      } else {
          // Fallback to loading the page content if not preloaded
          $('#content').load(page);
      }

      // Fade in the new content after it has been loaded
      $('#content').fadeIn(300);
  });
});
