// UI Utils set

export function slideToggleCp(targetID, heightSetterID = 'arrowPointerWrapper', cpDefaultHeight = "35%", ...rest) {
    const cpNavHeight = document.getElementById(heightSetterID).offsetHeight.toString();
    const cpWrapperHeight = document.getElementById(targetID).offsetHeight.toString();

    if(cpWrapperHeight === cpNavHeight) {
       $(`#${targetID}`).animate({height: cpDefaultHeight}, 200);
   } else {
        $(`#${targetID}`).animate({height: cpNavHeight}, 200);
   }
};