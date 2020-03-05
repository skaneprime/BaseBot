import axios from 'axios';
export default (async function getData(link, options) {
    let proxyUrl = `http://localhost:5000/api/`;
    if(!options)
        options = { from: 0 };
    return new Promise((resolve, reject) => {
        try {
            axios.get(`${proxyUrl}${link}`)
            .then(({ data }) => {
                if(Array.isArray(data) && data.length > (options.maxSize ? options.maxSize+options.from : data.length))
                    data = data.slice(options.from, options.maxSize+options.from)
                resolve(data);
            })
            .catch(err => reject(err));
        } catch (err) {
            reject(err);
        }
    });
})