// add world change
$(function() {
    if (document.getElementById('searchresult') != null) {
        var uri = new URL(location.href);
        var worldElement = $('<div>', {id: 'torihikiEx-worldSelect'});
        worldElement.append($('<p>', {
            class: 'torihikiEx-worldSelect-description',
            text: 'ワールド変更'
        }));
        worldSelect(worldElement, uri);
        $('#searchresult').prepend(worldElement);
    }

    function worldSelect(worldElement, uri) {
        var worlds = [
            [
                {"Breidablik": 13},
                {"Noatun": 15},
                {"Urdr": 14},
            ],
            [
                {"Lif": 12},
                {"Mimir": 11},
                {"Olrun": 6},
                {"Sigrun": 1},
                {"Alvitr": 2},
                {"Hervor": 8},
                {"Idavoll": 9},
                {"Trudr": 4},
                {"Frigg": 10},
                {"Gimle": 7},
                {"Radgrid": 5},
                {"Vali": 3}
            ],
        ];

        for (group in worlds) {
            var groupElement = $('<p>', {class: 'torihikiEx-worlds'});
            for (world in worlds[group]) {
                for (name in worlds[group][world]) {
                    uri.searchParams.set("world", worlds[group][world][name]);
                    groupElement.append($('<a>', {
                        href: uri.toString(),
                        text: name
                    }));
                }
            }
            worldElement.append(groupElement);
        }
    }
});

// add options
$(function() {
    addDetails();

    $(document).on('click', '.more > a', function() {
        setTimeout(addDetails, 1000);
    });

    function addDetails() {
        $.each($('.tradedetail.clearfix'), function() {
            var table = this;
            if (!$(table).find('#torihikiEx').size()) {
                $(table).find('.link').each(function() {
                    var linkElement = this;
                    // href: log_detail.php?log=xxxxx
                    var href = $(linkElement).find('a').attr('href');
                    $.ajax({type: 'get', url: href})
                    .done(function(data) {
                        parse(linkElement, data);
                    });
                });
            }
        });
    }

    function parse(linkElement, data) {
        $(data).find('.datatable').each(function() {
            var params = {};
            $(this).find('td').each(function(i, td) {
                // i=0: zeny, i=1: count
                if (i > 1) {
                    var text = $.trim($(td).html());
                    if (text.match(/・/)) {
                        if (text.match(/<br>/)) {
                            params.options = text.split('<br>');
                        }
                        else {
                            params.options = [];
                            params.options.push(text);
                        }
                    }
                    else {
                        params.refined = text;
                        if (params.refined === '0') {
                            delete params.refined;
                        }
                    }
                }
            });
            var tags = $('<ul>', {id: 'torihikiEx'});
            if ('refined' in params) {
                tags.append($('<li>', {class: 'plus-li'}).append(
                    $('<span>', {
                        class: 'plus-badge',
                        text: '・精錬値 + ' + params.refined
                    })
                ));
            }
            if ('options' in params) {
                $.each(params.options, function(j, option) {
                    tags.append($('<li>', {class: 'plus-li'}).append(
                        $('<span>', {
                            class: 'plus-badge',
                            text: option
                        })
                    ));
                });
            }
            $(linkElement).before(tags);
        });
    }
});

