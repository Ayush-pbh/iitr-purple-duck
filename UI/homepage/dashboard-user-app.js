document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems, {});
  });

  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems);
  });

  document.addEventListener('DOMContentLoaded', function() {
var elems = document.querySelectorAll('.collapsible');
var instances = M.Collapsible.init(elems, {});
});




window.onload = setup();

function setup() {
  // Set userid in the black strip
  document.getElementsByClassName('custom-top-username-diplay')[0].innerHTML = localStorage.getItem('eth-wallet-add')
}