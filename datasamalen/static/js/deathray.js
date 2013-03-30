$(function() {

    var rotation = 0,
        show_data_list = 0;

    $.get("json", function(data) {
        $.each(data, function(id, group) {

            if (show_data_list == 1) {
                $(".data ul").append("<li>"+id+"</li>");
                $(".data ul").append("<p>"+group.power +" : " + group.angel+" | " + group.bssid+"</p>");
            }

            // show visualization
            var angel = group.angel
            var x_y =  x_y_from_angel(angel);
            var power = group.power
            indicator(x_y, power)
        });
    });

    function x_y_from_angel(angle) {
        var x = 0 + 400 * Math.cos(angle);
        var y = 0 + 400 * Math.sin(angle);
        return { 'x':x, 'y':y }
    }

    function indicator(x_y, power){
        var x = x_y.x
        var y = x_y.y

        if (power > 79) {
            var level = "highest",
                size = 100,
                color = "red";
        } else if (power > 60) {
            var level = "high",
                size = 60,
                color = "#ff6e00";
        } else if (power > 40) {
            var level = "medium",
                size = 40,
                color = "#f6e016";
        } else if (power > 20) {
            var level = "low",
                size = 32,
                color = "#0051ff";
        } else {
            var level = "minor",
                size = 16,
                color = "#22ff00";
        }

        $('.'+level).clone().css({
            position: "absolute",
            opacity: "0.9",
            top: "500px",
            left: "500px",
            zIndex: "100",
            boxShadow: "0px 0px 10px #22ff00",
            width: size+"px",
            height: size+"px",
            backgroundColor: color,
            borderRadius: size/2+"px",
            marginLeft: y,
            marginTop: x
        }).appendTo('.container');

    }

        var degree = 90, // starting position
        $element = $('#meter'),
        timer,
        speed = 10, // update rate in milli sec. higher is slower
        length = 1;
    if (rotation == 1)
        rotate();
    else
        $('#meter').remove()


            function rotate() {
        $element.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
        $element.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
        timer = setTimeout(function() {
            degree = degree + length;
            rotate();
        },speed);
    }
});
