# Hi-Hat-Map
A web app that analyzes the social media through maps and sentiment analysis that provides helpful features for inspecting the emotional side of posts throughout the world.

## Status
This project is currently under development. Any weird UI tweaks are expected until the end of the first build.

## Setup & Run
You can run the project by following steps:
1. `git clone https://github.com/DalerAsrorov/hi-hat-map.git`
2. `cd ./hi-hat-map/src`
3. `npm run setup`
    * For some terminals this command might not install either node or bower dependencies. In this case, just install them manually by running:
        1. `npm install`
        2. `bower install`
4. `npm run build` (don't wory about eslint errors)
    * Make sure you see this message in your terminal first:
        * `Listenning on port 8000`
5. Launch your favorite browser and navigate to `localhost:8000`

## Tests
1. `cd ./src`
2. `npm run test`  

## Tech Stack
* JavaScript (ES6)
* jQuery
* [Leaflet](http://leafletjs.com/)
* Bootstrap
* HTML5/CSS3

## APIs Used
* Twitter
* To be continued...

## License
* [MIT](LICENSE)
