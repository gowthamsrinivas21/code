// Running the lightbox plugin for images
window.addEventListener("load", function () {
  baguetteBox.run(".gallery", {
    captions: true,
    buttons: "auto",
    fullScreen: false,
    noScrollbars: false,
    titleTag: true,
    async: false,
    preload: 2,
    animation: "slideIn",
    onChange: null,
  });
});


// Seatch Filter
const search = new Filter('search', 'data-caption');
