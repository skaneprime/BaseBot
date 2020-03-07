import getData from "./GetData";
/**
 * 
 * @param {
    * { //Example Object for LoadData from API
        SubObj1: {
            SubSubObj: {
                SubSubSubObj : {}
            },
            SubSubObj2: {}
        },
        SubObj2: { 
            SubSubObj: {}
        }, //etc..
        SubObj3: {}
    };
 * } dataStyle 
 */

export default function (dataStyle) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(Object.keys(dataStyle).map(async key => RecursiveCheckObjectKeys(dataStyle, key)));
            
            resolve(data);
        } catch (err) {
            reject(err)
        }
    });
}



function RecursiveCheckObjectKeys(Obj, key, Arr) {
    Arr.push(key);
    if(Object.keys(Obj[key]).length < 1) {
        let url = Arr.join('/');
        Arr = [];
        return getData(url);
    }
    else {
        return Object.keys(Obj[key]).map(SubKey => RecursiveCheckObjectKeys(Obj[key], SubKey, Arr));
    };
}