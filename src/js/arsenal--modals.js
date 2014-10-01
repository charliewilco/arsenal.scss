var modal = $('.modal');

$( "#modal--open" ).on( "click", function() {
  $( modal ).toggleClass('modal--show');
});

$( ".overlay" ).on( "click", function() {
  $( modal ).toggleClass('modal--show');
});

$( ".modal--close" ).on( "click", function() {
  $( modal ).toggleClass('modal--show');
});


// Forked from http://codepen.io/clintonhalpin/pen/cgbmk
