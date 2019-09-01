$('document').ready(function () {

    let rotation_leaf = 0;
    let spinner_length = $('.main_container [class*=spnr_container]').length;
    let n = 0;
    let nsel;
    let c = 4;
    let cn = 1;
    let rotation_clover = 0;
    let cc = 0;
    let wdt = $('.clover_spinner .clover_dot').css('width');
    let ht = $('.clover_spinner .clover_dot').css('height');
    let bg_massive = ['linear-gradient(-105deg, #006761, #18193d)',
        'linear-gradient(-105deg, #671d00, #3d0021)',
        'linear-gradient(-105deg, #000a10, #1f002d)',
        'linear-gradient(-105deg, #191919, #191919)',
        'linear-gradient(-105deg, #57697e, #37003d)',
        'linear-gradient(-105deg, #56CCF2, #2F80ED)',
        'linear-gradient(-105deg, #FF0099, #493240)',
        'linear-gradient(-105deg, #8E2DE2, #4A00E0)',
        'linear-gradient(-105deg, #ffd452, #544a7d)',
        'linear-gradient(-105deg, #00bf8f, #001510)'];
    let mc = 1;
    let nc = 8;
    let d1c = 0;
    let c1c =0;
    let clock_rotation = 0;
    let oe = 0;



    // ======================spinner rotation======================

    $.fn.rotate = function (degrees) {

        $(this).css({'transform' : 'rotate('+ degrees +'deg)'});

        return $(this)

    };

    let spinner_2_rotation = setInterval(function () {

        rotation_leaf += 45;

        $('.spnr_container_2 .leaf_spnr').rotate(rotation_leaf)

    }, 100);

    spinner_2_rotation


    // ======================spinner loading======================


    load_spinners();

    function load_spinners_w_fadeout() {
        $('.main_container [class*=spnr_container]').stop().fadeOut(150).promise().done(
            function () {
                load_spinners()
            });
    }

    function load_spinners(e) {

        for (let i = 1; i <= c; i++) {

            $('.main_container [class*=spnr_container]').eq(n).stop().fadeIn(1500);
            n++;
            console.log(i);
            if (n >= spinner_length && nc !== 2) {
                nsel = Math.ceil(n/4)*4;
                n = 0;
                return(e)
            } else if (n >= spinner_length && nc === 2) {
                nsel = n;
                n = 0;
            } else {nsel = n}
        }

    }

    $('.left_nav_container, .right_nav_container').click(function (e) {

        if ($(e.target).is('.fa-angle-left')) {
            $('.main_container [class*=spnr_container]').stop().fadeOut(150).promise().done(
                function () {
                    n = nsel;
                    n -= nc;
                    if (n < 0) {n = 0}
                    load_spinners_w_fadeout();
                }
            );

        } else {
            load_spinners_w_fadeout();
        }

    });


    // ======================header buttons======================


    $('.header .header_button').click(function (e) {

        if ($(e.target).is('#multi')) {
            $(this).attr('id', 'single');
            nc = 2
        } else {
            $(this).attr('id', 'multi');
            nc = 8
        }

        if (c === 4) {
            n = Math.floor(nsel/4 - 1)*4;
            c = 1;
            load_spinners_w_fadeout()
        } else {
            c = 4;
            n = Math.floor(nsel/4)*4;
            load_spinners_w_fadeout()
        }

    });

    $('.header .bg_header_button').click(function () {
        $('.main_container').css('backgroundImage', bg_massive[mc]);
        mc++;
        if (mc === bg_massive.length) {
            mc = 0;
        }
    });




    // ======================clover spinner======================

    $.fn.clover = function (length, wdt, ht) {

        $(this).css('backgroundColor', 'rgba(255,255,255,0.2)')
            .css('width', wdt)
            .css('height', ht);
            // .css('borderRadius', '50%');
        $(this).eq(length).css('backgroundColor', "rgba(255,255,255,0.7)")
            // .css('width', parseInt(wdt)*0.8)
            // .css('borderRadius', '0')
            .css('height', parseInt(ht)*0.05);
    };

    let clover_inteval = setInterval(function () {

        if (cc === 3) {
            rotation_clover += 90;
            $('.clover_spinner').rotate(rotation_clover);
            cc = 0
        } else {
            $('.clover_spinner .clover_dot').clover(cn, wdt, ht);
            cn++;
            cc++;
            if (cn === 4) {
                cn = 0;
            }
        }
    }, 500);


    // ======================domino spinner 1======================

    $.fn.domino = function (hgt1, hgt2, easing, length) {

        $(this).css('backgroundColor', 'rgba(255,255,255,0.2)')
            .stop().animate({height:hgt1},easing);

        $(this).eq(length).css('backgroundColor', 'rgba(255,255,255,0.7)')
            .stop().animate({height:hgt2},easing);

    };

    let domino_1_interval = setInterval(function () {

        let hgt1 = 20 + '%';
        let hgt2 = 30 + '%';

        let dc = $('.domino_1').length;

        $('.domino_1').domino(hgt1, hgt2, 200, d1c);

        d1c++;

        if (d1c === dc) {
            d1c = 0
        }

    },200);

    // ======================clock spinner 1======================

    // $.fn.animateRotate = function(angle, duration, easing, complete) {
    //     var args = $.speed(duration, easing, complete);
    //     var step = args.step;
    //     return this.each(function(i, e) {
    //         args.complete = $.proxy(args.complete, e);
    //         args.step = function(now) {
    //             $.style(e, 'transform', 'rotate(' + now + 'deg)');
    //             if (step) return step.apply(e, arguments);
    //         };
    //
    //         $({deg: 0}).animate({deg: angle}, args);
    //     });
    // };


    let ch;

    $.fn.spinner_rotate = function (length, eq, angle) {

        // let angle = eq*(360/length);
        // let angle_2 = 360;

        // $(this).eq(eq).stop().animate({deg: angle}, 500).animate({deg: angle_2},500)

        // $(this).eq(eq).animateRotate(angle, 500);
        // $(this).eq(eq).animateRotate(angle_2, 500)

        $(this).eq(eq).css({'transform' : 'rotate('+ angle +'deg)'});

        return $(this)

    };




    let clock_spinner_inteval = setInterval(function () {

        let cc = $('.dot_1').length;
        let angle = 360/cc;
        if (oe % 2 === 0) {
            clock_rotation = clock_rotation + angle
        } else if (oe % 2 !== 0) {
            clock_rotation = Math.ceil(clock_rotation/360)*360
        }

        console.log(angle + ' ' + clock_rotation);

        $('.dot_1').spinner_rotate(cc, c1c, clock_rotation);

        c1c++;

        console.log(c1c);

        if (c1c === cc) {
            c1c = 0;
            oe++
        }

    },250)


});