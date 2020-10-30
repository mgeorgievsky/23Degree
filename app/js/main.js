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

    const packageButtons = document.getElementsByClassName("calculator__controls-package-button");

    for (let button of packageButtons) {
        button.addEventListener('click', function() { 
            if (!this.classList.contains("calculator__controls-package-button--active")) {
                document.getElementsByClassName("calculator__controls-package-button--active")[0].classList.remove("calculator__controls-package-button--active")
                this.classList.add("calculator__controls-package-button--active")
            }
        })
    }

    let min = 100
    let max = 500000
    const $input = $("#area-input");
    const $buffer = $('#area-input-buffer');

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

            $buffer.text($input.val());
            $input.width($buffer.width());
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

    $buffer.text($input.val());
    $input.width($buffer.width());

    $input.on('input', function() {
        $buffer.text($input.val());
        $input.width($buffer.width());
    });

    $(".tabs-stage .tab").hide();
    $(".tabs-stage .tab:first-child").show();
    $(".tabs-nav li:first").addClass("tab-active");

    // Change tab class and display content
    $(".tabs-nav a").on("click", function (event) {
    event.preventDefault();
    let parent = $(this).parents(".tabs-container");
    $(".tabs-nav li" , parent).removeClass("tab-active");
    $(this)
        .parent()
        .addClass("tab-active");
    $(".tabs-stage .tab", parent).hide();
    $($(this).attr("href")).show();
});

const scrollbar = windows.Scrollbar
Scrollbar.init(document.querySelector('#companies-scroll'))

});
