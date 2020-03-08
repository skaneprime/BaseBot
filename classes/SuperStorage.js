/**
 * SuperStorage is extended Collection class from discord.js
 * It includes some useful functionality which is going to make more easier to work with code
 */

const { Collection } = require('discord.js') // Requiring discord.js Collection 
module.exports = class SuperStorage extends Collection {
    constructor(data) {
        super(data); // Default data of Collection
    };

    /**
     * @param {Number} [ChunkLength=Number] Length of each chunk 
     */
    toChunks(ChunkLength) { // Divide SuperStorage into little chunks which are also SuperStorage. It can be useful if there a lot of data.
        let i, j, ChunkedArrays = [];
        for (i = 0, j = this.array().length; i<j; i+=ChunkLength) {
            let chuSS = new SuperStorage();
            this.array().slice(i, i+ChunkLength).map(element => chuSS.set(this.findKey(Ce => Ce === element), element))
            ChunkedArrays.push(chuSS);
            if(ChunkLength+ChunkedArrays.length + ([1,4].includes(ChunkLength) ? -1 : 0) > j-1) {
                return ChunkedArrays
            }
        }
    }
};


