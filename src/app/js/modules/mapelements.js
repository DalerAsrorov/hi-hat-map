/*eslint no-undef: "off"*/

export function createIcon(
    iconUrl,
    shadowUrl = '',
    iconSize = [38, 95],
    shadowSize = [50, 64],
    iconAnchor = [22, 94],
    shadowIcon = [4, 62],
    popupAnchor = [-3, -76]
) {
    let twitterIcon = L.icon({
        iconUrl: iconUrl,
        // shadowUrl: IMAGES.SOC_MEDIA_ICONS.TWITTER,

        iconSize: iconSize, // size of the icon
        shadowSize: shadowSize, // size of the shadow
        iconAnchor: iconAnchor, // point of the icon which will correspond to marker's location
        shadowAnchor: shadowIcon, // the same for the shadow
        popupAnchor: popupAnchor // point from which the popup should open relative to the iconAnchor
    });

    return twitterIcon;
}
