
$(function() {
    var degree = 90, // starting position
        $element = $('#meter'),
        timer,
        speed = 10, // update rate in milli sec. higher is slower
        length = 0.1;

    json = {
        "Highest": [
            {
                "id": 1,
                "x": 150,
                "y": 300,
                "name": "item one",
                "info": "some info"
            }
        ],
        "High": [
            {
                "id": 1,
                "x": 150,
                "y": 100,
                "name": "item one",
                "info": "some info"
            },
            {
                "id": 2,
                "x": 200,
                "y": 100,
                "name": "item two",
                "info": "some info"
            }
        ],
        "Medium": [
            {
                "id": 1,
                "x": 100,
                "y": 100,
                "name": "item one",
                "info": "some info"
            },
            {
                "id": 2,
                "x": 200,
                "y": 200,
                "name": "item two",
                "info": "some info"
            }
        ]
    };

    rotate();

    function rotate() {
        $element.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
        $element.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
        timer = setTimeout(function() {
            degree = degree + length;
            rotate();
        },speed);
    }

    $.each(json, function(id, group) {

        $(".data ul").append("<li>"+id+"</li>")
            // select div and make a copy

            $.each(group, function(id, data) {
                $(".data ul").append("<p>"+data.name +" : " + data.info+" | position: " + data.x + " x " +data.y+"</p>")

            });

    });
});
