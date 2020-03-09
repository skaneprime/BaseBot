/* eslint-disable no-undef */
let chalk = require('chalk');


module.exports = {
    findMember: function(message, user) {
        return new Promise(function(resolve, reject) {
            let target = message.mentions.members.first();
            if(!target && user)
                target = message.guild.members.cache.get(user) || message.guild.members.resolve(user)
            if(!target)
                target = message.guild.members.cache.find(member => member.name === user) || message.guild.members.cache.find(member => member.user.username === user) || message.guild.members.cache.find(member => member.user.id === user)
            if(target)
                resolve(target)
            else
                reject(`User not found`)
        })
    },
    randomInt: function (min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
};