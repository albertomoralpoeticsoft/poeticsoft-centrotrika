import analytics from './js/analytics'

(function ($) {

  analytics($) 

  const $bodynoadmin = $('body').not('.logged-in.admin-bar')

  if($bodynoadmin.length) {

    const $desktopheader = $('#ast-desktop-header')
    const $mobileheader = $('#ast-mobile-header')
    let height

    const setbodypadding = () => {

      if($desktopheader.is(':visible')) {

        height = $desktopheader.height()
      }

      if($mobileheader.is(':visible')) {

        height = $mobileheader.height()
      }

      $bodynoadmin.css('padding-top', Math.round(height) + 'px')
    }

    window.addEventListener('resize', setbodypadding)

    setbodypadding()
  }


})(jQuery);