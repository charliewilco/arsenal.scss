var modal = (function(){
    var
    method = {},
    $overlay,
    $modal,
    $content,
    $close;

    // Append the HTML

    // Center the modal in the viewport
    method.center = function () {};

    // Open the modal
    method.open = function (settings) {};

    // Close the modal
    method.close = function () {};

    return method;
}());
$overlay = $('<div id="overlay"></div>');
$modal = $('<div id="modal"></div>');
$content = $('<div id="content"></div>');
$close = $('<a id="close" href="#">close</a>');

$modal.hide();
$overlay.hide();
$modal.append($content, $close);

$(document).ready(function(){
    $('body').append($overlay, $modal);
});
