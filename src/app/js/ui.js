// UI Utils set

export function slideToggleCp(targetID, heightSetterID = 'arrowPointerWrapper', cpDefaultHeight = "35%", ...rest) {
    const cpNavHeight = document.getElementById(heightSetterID).offsetHeight.toString();
    const cpWrapperHeight = document.getElementById(targetID).offsetHeight.toString();
    const slidingTime = 300;
    const defaultTop = "-15px";

    const $querySearchForm = $('#querySearchForm');
    const $target = $(`#${targetID}`);
    const $body = $('body');

    if(cpWrapperHeight === cpNavHeight) {
        $body.css({"overflowY": "auto"});
        $target.animate({height: cpDefaultHeight}, slidingTime);
        $querySearchForm.animate({
            top: "-15px"
        }, slidingTime);
    }
    else {
        $body.css({"overflowY": "hidden"});
        $target.animate({height: cpNavHeight}, slidingTime);
        $querySearchForm.animate({
            top: "-34px"
        }, slidingTime);
    }
};