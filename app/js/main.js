document.addEventListener("DOMContentLoaded", function() {

	document.getElementById("button-menu").addEventListener('click', function() { 
        if (this.classList.contains("first-screen__menu-icon--opened")) {
            this.classList.remove("first-screen__menu-icon--opened")
            document.getElementById("list-menu").classList.remove("first-screen__menu-list--opened")
        }
        else {
            this.classList.add("first-screen__menu-icon--opened")
            document.getElementById("list-menu").classList.add("first-screen__menu-list--opened")
        }
    })

    let min = 100
    let max = 500000
    const $input = $("#area-input");

    $(".js-range-slider").ionRangeSlider({
        skin: "round",
        min: min,
        max: max,
        from: 10000,
        prettify_enabled: true,
        prettify_separator: " ",
        postfix: "м<sup>2</sup>",
        onStart: function(data) {
            $input.prop("value", data.from);
        },
        onChange: function(data) {
            $input.prop("value", data.from);
        }
    });

    const instance = $(".js-range-slider").data("ionRangeSlider");

    $input.on("input", function() {
        var val = $(this).prop("value");
    
        // validate
        if (val < min) {
            val = min;
        } else if (val > max) {
            val = max;
        }
    
        instance.update({
            from: val
        });
    });

});
