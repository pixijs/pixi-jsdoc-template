$(function () {

    var $nav = $('.navigation');
    var $list = $nav.find('.list');
    var $search = $('.search');

    // Search input
    $('#search').on('keyup', function (e) {
        var value = this.value.trim();
        if (value) {
            var regexp = new RegExp(value, 'i');
            $nav.addClass('searching')
                .removeClass('not-searching')
                .find('li, .itemMembers')
                .removeClass('match');

            $nav.find('li').each(function (i, v) {
                var $item = $(v);
                if ($item.data('name') && regexp.test($item.data('name'))) {
                    $item.addClass('match');
                    $item.closest('.itemMembers').addClass('match');
                    $item.closest('.item').addClass('match');
                }
            });
        } else {
            $nav.removeClass('searching')
                .addClass('not-searching')
                .find('.item, .itemMembers')
                .removeClass('match');
        }
        $list.scrollTop(0);
    });

    $('#menuToggle').click(function() {
        $list.toggleClass('show');
        $search.toggleClass('show');
    });

    // Show an item related a current documentation automatically
    $nav.addClass('not-searching');
    var filename = $('.page-title').data('filename').replace(/\.[a-z]+$/, '');
    var $currentItem = $nav.find('.item[data-name*="' + filename + '"]:eq(0)');

    if ($currentItem.length) {
        // if a child then show the top level parent and highlight the
        // current item.
        if ($currentItem.parents('.children').length) {
            $currentItem.addClass('current');
            $currentItem = $currentItem.parents('ul.list>li.item');
        }
        $currentItem
            .remove()
            .prependTo($list)
            .addClass('current');
    }

    // disqus code
    if (config.disqus) {
        $(window).on('load', function () {
            var disqus_shortname = config.disqus; // required: replace example with your forum shortname
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            var s = document.createElement('script'); s.async = true;
            s.type = 'text/javascript';
            s.src = 'http://' + disqus_shortname + '.disqus.com/count.js';
            document.getElementsByTagName('BODY')[0].appendChild(s);
        });
    }
});