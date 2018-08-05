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
                    var text = $.trim($(td).text());
                    if (text.match(/・/)) {
                        params.options = text.split('・');
                        params.options.shift();
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
                tags.append(
                    $('<li>', {class: 'data badge badge-success', text: '・精錬値 + ' + params.refined})
                );
            }
            if ('options' in params) {
                $.each(params.options, function(j, option) {
                    tags.append(
                        $('<li>', {class: 'data badge badge-primary', text: '・' + option})
                    );
                });
            }
            $(linkElement).before(tags);
        });
    }
});

