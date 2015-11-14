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