// ponytail: no build step on this static site, so shared navbar/footer are
// injected client-side via fetch instead of duplicating markup in every page.
(function () {
  function include(id, url) {
    var el = document.getElementById(id);
    if (!el) return;
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) { el.outerHTML = html; });
  }
  include('navbar-include', './partials/navbar.html');
  include('footer-include', './partials/footer.html');
})();
