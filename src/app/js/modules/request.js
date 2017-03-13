
export function getRequest(url) {
    return new Promise((res, rej) => {
        $.get(url, (data, status) => {

            if(status === 'success') {
                console.log("Success");
                res(data);
            } else {
                rej("Couldn't get the file.");
            }
        });
    });
};