
const request = async (url, { method = "GET", header, data, getResponse = false, getOrgin = false } = {}) => {
    return new Promise((resolve, reject) => {
        let response = {}
        fetch(url, { method, header, data })
            .then(r => {
                console.log(r)
                if(getResponse) {
                    response = {
                        url: r.url,
                        headers: r.headers,
                        status: r.status
                    }
                }
                if(getOrgin) resolve(r);
                return r.json()
            })
            .then(r => {
                let res = getResponse ? ({ ...response, data: r }) : r
                resolve(res)
            });
    })
};

export default request;