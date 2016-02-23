$(function () {
  $('form').on('focus', 'input:last-of-type', function () {
    var $this = $(this);
    $this.clone().insertAfter($this);
  }).on('blur', 'input', function () {
    var $this = $(this);
    if ($this.val() === '') {
      $this.remove();
    }
  });
});

if (false) {
var $ad = $('<ins>').addClass('adsbygoogle').addClass('sideBanner').attr({
  'data-ad-client': 'ca-pub-5738874532953979',
  'data-ad-slot': '2316934440'
}).prependTo($('body'));

if ($ad.is(':visible')) {
  (adsbygoogle = window.adsbygoogle || []).push({});
  $('body').addClass('with-sidebar');
} else {
  $ad.remove();
}
}
