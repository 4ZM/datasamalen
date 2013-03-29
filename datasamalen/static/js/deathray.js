$(function() {

    $.get("http://0.0.0.0:5000/json", function(data) {
        $.each(data, function(id, group) {
            $(".data ul").append("<li>"+id+"</li>")
                $(".data ul").append("<p>"+group.power +" : " + group.angel+" | " + group.bssid+"</p>")
        });
    });

    var degree = 90, // starting position
        $element = $('#meter'),
        timer,
        speed = 10, // update rate in milli sec. higher is slower
        length = 0.1;

    rotate();

    function rotate() {
        $element.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
        $element.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
        timer = setTimeout(function() {
            degree = degree + length;
            rotate();
        },speed);
    }
});
