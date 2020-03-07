const { Collection } = require('discord.js')
module.exports = class SuperStorage extends Collection {
    constructor(data) {
        super(data);
    };

    /**
     * 
     * @param {Number} [ChunkLength=Number] Length of each chunk 
     */
    toChunks(ChunkLength) {
        let i, j, ChunkedArrays = [];
        for (i = 0, j = this.array().length; i<j; i+=ChunkLength) {
            let chuSS = new SuperStorage();
            this.array().slice(i, i+ChunkLength).map(element => chuSS.set(this.findKey(Ce => Ce === element), element))
            ChunkedArrays.push(chuSS);
            // console.log(ChunkedArrays.length, ChunkLength, j)
            if(ChunkLength+ChunkedArrays.length + ([1,4].includes(ChunkLength) ? -1 : 0) > j-1) {
                return ChunkedArrays
            }
        }
    }
};


