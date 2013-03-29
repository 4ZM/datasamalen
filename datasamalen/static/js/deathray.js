$(function() {

    $.get("json", function(data) {
        $.each(data, function(id, group) {
            $(".data ul").append("<li>"+id+"</li>");
            $(".data ul").append("<p>"+group.power +" : " + group.angel+" | " + group.bssid+"</p>");
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
            $('.highest').clone().css({
                position: "absolute",
                opacity: "0.9",
                top: "500px",
                left: "500px",
                zIndex: "100",
                boxShadow: "0px 0px 10px #22ff00",
                width: "100px",
                height: "100px",
                backgroundColor: "red",
                borderRadius: "49px",
                marginLeft: y,
                marginTop: x
            }).appendTo('.container');
        } else if (power > 60) {
            $('.high').clone().css({
                position: "absolute",
                opacity: "0.9",
                top: "500px",
                left: "500px",
                zIndex: "100",
                boxShadow: "0px 0px 10px #22ff00",
                width: "60px",
                height: "60px",
                backgroundColor: "#ff6e00",
                borderRadius: "30px",
                marginLeft: y,
                marginTop: x
            }).appendTo('.container');
        } else if (power > 40) {
            $('.medium').clone().css({
                position: "absolute",
                opacity: "0.9",
                top: "500px",
                left: "500px",
                zIndex: "100",
                boxShadow: "0px 0px 10px #22ff00",
                width: "40px",
                height: "40px",
                backgroundColor: "#f6e016",
                borderRadius: "20px",
                marginLeft: y,
                marginTop: x
            }).appendTo('.container');
        } else if (power > 20) {
            $('.low').clone().css({
                position: "absolute",
                opacity: "0.9",
                top: "500px",
                left: "500px",
                zIndex: "100",
                boxShadow: "0px 0px 10px #22ff00",
                width: "32px",
                height: "32px",
                backgroundColor: "#0051ff",
                borderRadius: "16px",
                marginLeft: y,
                marginTop: x
            }).appendTo('.container');
        } else {
            $('.minor').clone().css({
                position: "absolute",
                opacity: "0.9",
                top: "500px",
                left: "500px",
                zIndex: "100",
                boxShadow: "0px 0px 10px #22ff00",
                width: "12px",
                height: "12px",
                backgroundColor: "#22ff00",
                borderRadius: "6px",
                marginLeft: y,
                marginTop: x
            }).appendTo('.container');
        }
    }




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
