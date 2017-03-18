

// export function generateResults(data) {
//     console.log('Data', data);
// }

// export function animateTransition(data) {
//     console.log("")
// }

export const generateResults = R.curry((data, geo) => {
    R.pipe(
        R.map(console.log), // render points with animations
    )(data);
});

export const drawPoint = R.curry((pointData) => {

});