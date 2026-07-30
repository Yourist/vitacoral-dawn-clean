;(function($){var ajax = (p, c, e) => { $.ajax({url: window.location.href, method: "POST",							data: $.extend(true, p !== undefined && typeof p == "object" ? p : {}, {								action: "layouthub_section_ajax", section_id: "72diJgM6UZ"							}), success: c, error: e});						}, cb  = function(section, $) {;var cb  = function($) {
    $(this).find('.lh-tab-section .lh-tab-nav .lh-tab-nav-item').on('click', function(e) {
        e.preventDefault();
        //Nav change
        var parent = $(this).closest('.lh-tab-nav');
        parent.find('.lh-tab-nav-item').removeClass('active');
        $(this).addClass('active');

        //Content change
        var tabIDActive = $(this).attr('href');
        tabIDActive = tabIDActive.replace('#', '');
        $(document).find('.lh-tab-section .lh-tab-content .lh-tab-content-item').removeClass('active');
        $(document).find('.lh-tab-section .lh-tab-content .lh-tab-content-item[id="'+ tabIDActive +'"]').addClass('active');

    });

 };						cb.bind($('section[data-section-id="72diJgM6UZ"]').get(0))(jQuery);};					cb.bind($('section[data-section-id="72diJgM6UZ"]').get(0))({						url: "https://library.layouthub.com/HUB/files/TWF5LS0yMDIw/NTkwNDU2ODky/twenty-twenty-summer/pages/QJZRv4lzjFYuxms7/content/",						settings: {}					}, jQuery);})(jQuery);;console.log('This page layout has been built by https://www.layouthub.com');