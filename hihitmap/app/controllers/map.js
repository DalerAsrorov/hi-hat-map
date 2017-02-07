import Ember from 'ember';

const zoomDefaultVal = 3;

export default Ember.Controller.extend({
  lat: 45.519743,
  lng: -122.680522,
  zoom: zoomDefaultVal,
  actions: {
    updateCenter(e) {
      let center = e.target.getCenter();
      console.log('lat', center.lat);
    }
  }
});
