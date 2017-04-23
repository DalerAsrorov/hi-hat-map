

module.exports = {
    logTree: (tree) => {
        return JSON.stringify(tree, null, 4);
    },

    addMetaDataTo: (object, params) => {
        const date = new Date();
        return new Promise((res, rej) => {
            if(object) {
                const metadata = {
                    params: params ? params : {},
                    time: {
                        utc: date.toUTCString(),
                        local: date.toLocaleString(),
                        seconds: date.getTime()
                    }
                };
                object.metadata = metadata;
                res(object);
            } else {
                rej(new Error('Can\'t add metadata to undefined object.'));
            }
        });
    },

    wrapWithObject: (objectKey, objectValue) => {
        return new Promise((res, rej) => {
            if(objectKey && objectValue) {
                let dataWrapper = {};
                dataWrapper[objectKey] = objectValue;
                res(dataWrapper);
            } else {
                rej(new Error('Couldn\'t create wrapper for the object.'));
            }
        });
    },

    addParamsTo: (object, params) => {

    }
}