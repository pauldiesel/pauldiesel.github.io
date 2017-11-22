//= require_tree ./material-kit
//= require_tree ./controllers

$(document).ready(function () {
  $(window).on('scroll', materialKit.checkScrollForTransparentNavbar)
  materialKit.checkScrollForTransparentNavbar()
})
