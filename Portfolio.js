$(document).ready(function() {
  $(".home-container, .project-container, .profile-page, .contact-container")
  .css("display", "none")
  .fadeIn(200);

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
    e.preventDefault(); // Prevent the default link behavior
    let page = $(this).data('page'); // Get the page to load

    // Update the URL in the browser
    history.pushState({ page: page }, '', page);

    // Inject preloaded content
    if (preloadedPages[page]) {
        $(".home-container, .project-container, .profile-page, .contact-container")
            .html(preloadedPages[page]); // Inject preloaded content
    } else {
        // Fallback: load the content from the server
        $(".home-container, .project-container, .profile-page, .contact-container")
            .load(page);
    }
  });

  $(window).on('popstate', function(e) {
    let state = e.originalEvent.state;
    if (state && state.page) {
        let page = state.page;

        // Inject preloaded content without fade effect
        if (preloadedPages[page]) {
            $(".home-container, .project-container, .profile-page, .contact-container")
                .html(preloadedPages[page]);
        } else {
            $(".home-container, .project-container, .profile-page, .contact-container")
                .load(page);
        }
    }
  });
});

function Toggle() {
  var panel = document.getElementById("navLinks");

  if (panel.classList.contains("show")) {
    panel.classList.remove("show");
  } else {
    panel.classList.add("show");
  }
}