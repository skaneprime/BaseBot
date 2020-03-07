const axios = require('axios');

let GetData = (link) => {
    return axios.get('http://localhost:5000/api/'+link).then(res => res.data);
};

/**
 * 
 * @param { Array<Link> } ArrayOfLink 
 */
let LoadData = (ArrayOfLink, Obj) => {
    if(!Obj)
        Obj = {};
    return new Promise((resolve, reject) => {
        try {
            let object = Obj;
            ArrayOfLink.forEach(async (link, i) => {
                if(link.includes('/')) {
                    let Data = await GetData(link);
                    let element = link.split('/').pop()
                    if(['cache', 'rbi'].includes(element))
                        element = link.split('/')[link.split('/').indexOf(element)-1];
                    console.log(element);
                    object[element] = Data;
                } else
                    object = {...object, ...await GetData(link)};
                if(i === ArrayOfLink.length-1)
                    resolve(object);
            });
        } catch (err) {
            reject(err)
        }
    });
}

LoadData([
    'client',
    'client/guilds/rbi/620246440631074836',
])
// .then(console.log);