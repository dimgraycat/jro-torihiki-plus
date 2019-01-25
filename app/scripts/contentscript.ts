class TorihikiPlus {
  worlds = [
    [
      {"Breidablik": 13},
      {"Noatun": 15},
      {"Urdr": 14}
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
    ]
  ];
  uri;

  constructor() {
    // add world change
    this.uri = new URL(location.href);
    this.worldChange();

    // add options
    this.detail();
  }

  worldChange() {
    if (document.getElementById('searchresult') != null) {
      var worldElement = $('<div>', {id: 'plus-worldSelect'});
      worldElement.append($('<p>', {
        class: 'plus-worldSelect-description',
        text: 'ワールド変更'
      }));

      var groupElement = $('<p>', {class: 'plus-worlds'});
      for (group in this.worlds) {
        for (world in this.worlds[group]) {
          for (name in this.worlds[group][world]) {
            this.uri.searchParams.set("world", this.worlds[group][world][name]);
            groupElement.append($('<a>', {
              href: this.uri.toString(),
              text: name
            }));
          }
        }
        groupElement.append($('<br>'));
      }
      worldElement.append(groupElement);
      $('#searchresult').prepend(worldElement);
    }
  }

  detail() {
    _this = this;
    $.each($('.tradedetail.clearfix'), function() {
      var table = this;
      if (!$(table).find('#plus').size()) {
        $(table).find('.link').each(function() {
          var linkElement = this;
          // href: log_detail.php?log=xxxxx
          var href = $(linkElement).find('a').attr('href');
          $.ajax({type: 'get', url: href})
            .done(function(data) {
              _this.parse(linkElement, data);
            });
        });
      }
    });
  }

  parse(linkElement, data:string) {
    $(data).find('.datatable').each(function() {
      var params = {};
      $(this).find('td').each(function(i:number, td:string) {
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
      var tags = $('<ul>', {id: 'plus'});
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
}

var plus = new TorihikiPlus();

var addDetail = (): void {
  plus.detail();
}
$(document).on('click', '.more > a', function() {
  setTimeout(addDetail, 1000);
});
