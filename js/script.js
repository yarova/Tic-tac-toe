$(function(){

    function htmlCubes(){
        var html = '';
        for (var i = 1; i <= 9; i++) {
             html = html + '<div class="cube" id="c' + i + '"></div>';
        }
        $('#center').html(html);

        $('#c1, #c4, #c7').addClass('leftCube');
        $('#c2, #c5, #c8').addClass('rightCube');
        $('#c3, #c6, #c9').addClass('centerCube');

    };

    htmlCubes();

    function getRandNumber(){
        var rand = Math.round((Math.random() * 8)) + 1;
        return rand;
    };
    window.getRandNumber = getRandNumber;

    function stroke(){
        var rand = getRandNumber();
        var $randCell = $('.cube:nth-of-type(' + rand + ')');
        if($randCell.hasClass('cross') || $randCell.hasClass('zero')){
            stroke();
        }
        else{
            if (isCross){
                $randCell.addClass('cross');
                isCross = false;
            } else {
                $randCell.addClass('zero');
                isCross = true;
            }
        }
        checkWinner();
    };

    var isCross = true;

    $('.cube').on('click', function(){
        var hasCrossClass = $(this).hasClass('cross'),
            hasZeroClass = $(this).hasClass('zero');

        if (hasCrossClass || hasZeroClass){
            return;
        }

        if (isCross){
            $(this).addClass('cross');
            isCross = false;
        } else {
            $(this).addClass('zero');
            isCross = true;
        }

        $('.transparent').show();
        checkWinner();
        setTimeout(stroke, 1000);
        setTimeout(function hideTransparent(){ $('.transparent').hide()}, 1000);

    });

    $('#button').on('click', function(){
        if ($('.cube').hasClass('cross') || $('.cube').hasClass('zero')){
            removeClasses();
            $('.petal').removeClass('redFlower').addClass('whiteFlower');
            $('#center').css({ visibility: 'visible' });
        }
    });

    $('.message button').on('click', function(){
        $('.petal').removeClass('redFlower').addClass('whiteFlower');
        removeClasses();
        $('#center').css({ visibility: 'visible' });
    });

    function removeClasses() {
        $('.cube').removeClass('cross').removeClass('zero');
        $('body').removeClass('winnerCat').removeClass('winnerDog');
        $('.wrapPetal').removeClass('rollingFlower');
        $('.message').fadeOut();
    }

    function showAnimalScreen (){
        $('.wrapPetal').addClass('rollingFlower');
        $('.petal').removeClass('whiteFlower').addClass('redFlower');
        $('#center').css({ visibility: 'hidden' });
    }

    function showCatScreen (){
        $('body').addClass('winnerCat');
        showAnimalScreen();
    }

    function showDogScreen (){
        $('body').addClass('winnerDog');
        showAnimalScreen();
    }

    function elementsHasClass ($cube1, $cube2, $cube3, cssClass){
        if($cube1.hasClass(cssClass) && $cube2.hasClass(cssClass) && $cube3.hasClass(cssClass)){
            return true;
        } else {
            return false;
        }
    }

    function hasWinLineWithClass (cssClass){
        var hasLine =   elementsHasClass ($('#c1'), $('#c2'), $('#c3'), cssClass) ||
            elementsHasClass ($('#c4'), $('#c5'), $('#c6'), cssClass) ||
            elementsHasClass ($('#c7'), $('#c8'), $('#c9'), cssClass) ||

            elementsHasClass ($('#c1'), $('#c4'), $('#c7'), cssClass) ||
            elementsHasClass ($('#c3'), $('#c6'), $('#c9'), cssClass) ||
            elementsHasClass ($('#c2'), $('#c5'), $('#c8'), cssClass) ||

            elementsHasClass ($('#c1'), $('#c6'), $('#c8'), cssClass) ||
            elementsHasClass ($('#c2'), $('#c6'), $('#c7'), cssClass);
        return hasLine;
    }

    function checkWinner(){
        if (hasWinLineWithClass('cross'))  {
            $('#crossIsWinner').fadeIn();
            showCatScreen();
        }
        else if(hasWinLineWithClass('zero')) {
            $('#knotIsWinner').fadeIn();
            showDogScreen();
        }
    };
});