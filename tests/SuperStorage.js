let SS = require('../classes/SuperStorage')
let TestSS = new SS();

TestSS.set('f', { t:1 });
TestSS.set('f2', { t:2 });
TestSS.set('f3', { t:3 });
TestSS.set('f4', { t:4 });
TestSS.set('f5', { t:5 });

// console.log(TestSS)
console.log("--------------------------------------");
for(i = 1; i < 6; i++)
    if(TestSS.toChunks(i)) {
        console.log(TestSS.toChunks(i));
        console.log("--------------------------------------")
    }
    else console.log(false)

// console.log(TestSS.toChunks(3))