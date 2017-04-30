// UI Utils set
import StorageSystem from './../classes/storagesystem.js';

export function slideToggleCp(targetID, map, heightSetterID = 'arrowPointerWrapper', cpDefaultHeight = "35%", ...rest) {
    const cpNavHeight = document.getElementById(heightSetterID).offsetHeight.toString();
    const cpWrapperHeight = document.getElementById(targetID).offsetHeight.toString();
    const slidingTime = 270;
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
        $slideSwitchIcon.addClass('fa-caret-down').removeClass('fa-caret-up');
        storageSystem.setItem("cpOpen", true);
    }
    else {
        $body.css({"overflowY": "hidden"});
        $target.animate({height: cpNavHeight}, slidingTime);
        $querySearchForm.animate({
            top: "-37px"
        }, slidingTime);
        map.invalidateSize();
        $slideSwitchIcon.addClass('fa-caret-up').removeClass('fa-caret-down');
        storageSystem.setItem("cpOpen", false);
    }
}

/**
*  Helper UI method that will keep the
*  control panel closed faster.
*/
export function setCpCss(target, height, body=$('body')) {
    body.css({"overflowY": "auto"});
    $target.css({height: cpDefaultHeight});
}

/**
*   Based on the given target (div) and data (list of
*   available options), place a table (or list) of
*   widgets.
*/
export function generateCpRightPanel(target, data) {
    let $target = $(target);

    for(let i = 0; i < 10; i++) {
        $target.append
        (
            '<div class="col-lg-4">' +
                '<div class="menu">' +
                    "Something" +
                '</div>' +
            '</div>'
        );
    }
}

export function addElementToPanel(
    panel,
    eventListener,
    htmlItemName = '',
    htmlItem = $('<button type="button"></button>'),
    htmlItemClass = 'menu',
    columnSize = 'col-lg-4') {

    let $panel = $(panel);
    let $htmlItem = htmlItem;
    let $divCol = $('<div></div>');

    $htmlItem.addClass(htmlItemClass);
    $htmlItem.html('<span class="right-cp-name">'
                   + htmlItemName + '</span>')
    $divCol.addClass(columnSize);

    $divCol.append($htmlItem);
    $panel.append($divCol);
}

export function addElementTo(target, element=$('<div></div>')) {
    if(typeof target == 'object') {
        target.append(element);
        return target;
    }

    return $(`${target}`).append(element);
}

export function addContainerToContainer(panel, id='', container=$(`<div id=${id}></div>`), classes='') {
    let addId = container.attr('id') ? container.attr('id') : container.attr('id', `#${id}`);
    addClass(container, classes);
    $(panel).append(container);
    console.log('container', container);
    return container;
}

export function addClass(target, className) {
    $(target).addClass(className);
}

export function addTextTo(target, text) {
    if(typeof target == 'object') {
        console.log("Jquery should be applied directly");
        target.html(text);
    } else if(typeof target == 'string') {
        console.log("It's id", target);
        $(target).html(text);
    }
}

export function removeClass(target, className) {
    $(target).removeClass(className);
}

// export function fadeOut(target, type, callbackHandler = function(){}) {
//     $(target).fadeOut(type, callbackHandler);
// }

export function addEventListenerTo(target, type, fn) {
    document.getElementById(target).addEventListener(type, fn);
}

export function removeElement(target) {
    $(target).remove();
}

export function style(target, styleObject, ...rest) {
    return $(target).css(styleObject);
}

export function fadeOut(target, timer, callback) {
    $(target).fadeOut(timer, function() {
        // $('#initLoader').remove();
        // $('#mainWrapper').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1}, 1000);
        callback();
    });
}

export function makeVisible(target, timer) {
    $(target).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1}, timer)
}

export function appendDropDownTo(target, dropdownName, dropdownID, actionsList) {
    // console.log("HERE", dropdownName, " HERE ", dropdownID, " HERE ", actionsList);
    let $targetRef = $(target).append(`<div class="dropdown" id=${dropdownID}></div>`);
    let $dropdown = $(target).find(`#${dropdownID}`);
    $dropdown.append(`<button class='btn btn-secondary dropdown-toggle' type='button' data-toggle="dropdown">` + dropdownName + `</button>`);
    let $dropdownRef = $dropdown.append(`<div class='dropdown-menu' </div>`);
    let $listDiv = $dropdownRef.find('.dropdown-menu');

    actionsList.map((action, index) => {
        $listDiv.append
        (`
            <a class ='dropdown-item' id='${action.id}' href='#'> ${action.name} </a>
        `)
    });
    $dropdown.append($listDiv);
    $(target).append($dropdown);
}

export function appendRangeSlider(container, divClass, inputId, params) {
    let newRangeSlider = $(
                       `<div class='${divClass}'>
                            <input id='${inputId}' type='text'
                             />
                       </div>`);
    let rangeInput = newRangeSlider.find('input');
    rangeInput.slider({
        ticks: params.ticks,
        ticks_labels: params.ticksLabels,
        min: params.min,
        max: params.max,
        step: params.step,
        value: params.value,
        tooltip: params.tooltip
    });

    for(let [key, value] of Object.entries(params.eventHandlers)) {
        // key == event and value == handler
        rangeInput.on(key, value);
    };

    appendTo(container, newRangeSlider);
    rangeInput.slider('refresh');

    console.log(`Range slider with divClass '${divClass}'' is appended to '${container}'`, appendTo(`${container}`, newRangeSlider));
}

export function keypress(target, callback) {
    $(target).keypress(callback);
}

export function appendTo(container, element) {
    return !!$(`${container}`).append(element);
}

export function appendDropDownToPanel(target, componentsClass) {
    console.log("componentsClass.list:", componentsClass.list);
    appendDropDownTo(target, componentsClass.name, componentsClass.id, componentsClass.list);
}

export function onSubmit(target, callback) {
    $(target).submit(callback);
}

export function getInputValue(target) {
    return $(target).val();
}



