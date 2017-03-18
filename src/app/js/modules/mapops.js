

// export function generateResults(data) {
//     console.log('Data', data);
// }

// export function animateTransition(data) {
//     console.log("")
// }

export const generateResults = R.curry(function(data, geo) {
    R.pipe(
        R.map(console.log), // render points with animations
    )(data);
});