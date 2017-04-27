

export default class Leaflet {

    constructor() {

    }

    createPopup(latlng, content) {
         return L.popup()
                .setLatLng(latlng)
                .setContent(content)
    }

}