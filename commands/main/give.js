let BaseCommand = require('../../classes/BaseCommand');
const Discord = require('discord.js');
module.exports = class GiveCommand extends BaseCommand {
   constructor() {
      super({
         name: "give",
         aliases: [],
         category: "ADMINISTRATION",
         usage: `${client.prefix}give @Role_ID`,
         description: "Роль при присоединении к серверу",
         guildOnly: "true",
         allowed_guilds: [],
         cooldown: 0,
         invisible: true
      });

      this.execute = (client, message, args, ...params) => {

      }
   }
}