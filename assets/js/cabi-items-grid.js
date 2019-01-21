var logogrid_items = [];
var logogrid_rows = 0;

jQuery(document).ready(function($) {
    if ($('.logo-grid').length) {
        setInterval(function(){
            update_items();
        }, 1000);
        get_all_items();
    }    
});

window.onload = function() {
    get_rows();
}

function get_all_items() { 
    jQuery.ajax({
        type: "POST",
        url: "/wp-admin/admin-ajax.php",
        data: { 
          action: 'get_all_items'
        },
        dataType: "json"
    })
    .done(function(response) {
        logogrid_items = response;
        //console.log(logogrid_items);
    })
      .fail(function(){
        logogrid_items = false;
    });
}

function get_rows() { 
    jQuery.ajax({
        type: "POST",
        url: "/wp-admin/admin-ajax.php",
        data: { 
          action: 'get_rows'
        }
    })
    .done(function(response) {
        logogrid_rows = response;
        console.log(logogrid_rows);
    })
      .fail(function(){
        logogrid_rows = false;
    });
}

function update_items() {
    var item_position, item_id, item;
    do {
        var item_position = getRandomInt(0, logogrid_rows * 4);
        var item_id = getRandomInt(0, logogrid_items.length);
        var item = jQuery('#logo-grid_' + item_position).children('h3');
    } while (item.hasClass('logo-grid__item--void'));
    //console.log(item_position, item_id);
    if (!item.hasClass('logo-grid__item--void')) {
        item.fadeOut(300, function(){
            item.html(logogrid_items[item_id]).fadeIn(300);
        });
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}