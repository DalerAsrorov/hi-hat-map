export function getRequest(url) {
    return new Promise((res, rej) => {
        $.get(url, (data, status) => {
            if (status === 'success') {
                console.log('Success');
                res(data);
            } else {
                rej('Couldn\'t get the file.');
            }
        });
    });
}

export function postRequest(url, info) {
    return new Promise((res, rej) => {
        $.post(url, info, (data, status) => {
            if (status === 'success') {
                res(data);
            } else {
                rej('Unsuccessful POST request.');
            }
        });
    });
}
