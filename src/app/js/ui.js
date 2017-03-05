// UI Utils set
import StorageSystem from './storagesystem.js';

export function slideToggleCp(targetID, map, heightSetterID = 'arrowPointerWrapper', cpDefaultHeight = "35%", ...rest) {
    const cpNavHeight = document.getElementById(heightSetterID).offsetHeight.toString();
    const cpWrapperHeight = document.getElementById(targetID).offsetHeight.toString();
    const slidingTime = 300;
    const defaultTop = "-15px";
    const $querySearchForm = $('#querySearchForm');
    const $target = $(`#${targetID}`);
    const $body = $('body');
    const $slideSwitchIcon = $('#slideSwitchIcon');

    const storageSystem = new StorageSystem(window.localStorage);

    //
    if(cpWrapperHeight === cpNavHeight) {
        $body.css({"overflowY": "auto"});
        $target.animate({height: cpDefaultHeight}, slidingTime);
        $querySearchForm.animate({
            top: "-15px"
        }, slidingTime);
        $slideSwitchIcon.addClass('glyphicon-menu-down').removeClass('glyphicon-menu-up');
        storageSystem.setItem("cpOpen", true);
    }
    else {
        $body.css({"overflowY": "hidden"});
        $target.animate({height: cpNavHeight}, slidingTime);
        $querySearchForm.animate({
            top: "-34px"
        }, slidingTime);
        map.invalidateSize();
        $slideSwitchIcon.addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down');
        storageSystem.setItem("cpOpen", false);
    }
};