let BaseCommand = require('../../classes/BaseCommand');
const Discord = require('discord.js');
module.exports = class HelpCommand extends BaseCommand {
    constructor() {
        super({
            name: "help",
            aliases: ["помощь", "helpme", "command", "hello"],
            category: "main",
            usage: `${client.prefix}help [команда или категория]`,
            description: "Получить список команд",
            guildOnly: "true",
            allowed_guilds: [],
            cooldown: 0
        });

        this.execute = async (client, message, args, ...params) => {
            let helpStr = ""; //creating universal string for contain lines in embed
            let categories = {}; //creating object {category_name:[cmd1, cmd2...], cat_name2:...}

            //filling object and str above
            client.commands.forEach(cmd => {
                if(!cmd.invisible) { // if cmd invisible will not included
                    if (!categories.hasOwnProperty(cmd.category)) { //if new category adding to list
                        helpStr += `\n- ${cmd.category}`;
                        categories[cmd.category] = [];
                    };
                    categories[cmd.category].push(cmd.name); //adding cmd to category
                };
            });

            let command = client.commands.find(elem => elem.name == args[0]); //if in first help args indicated command name returns command
            let embed = new Discord.MessageEmbed(); //creating main embed

            // if args is empty will output categories list
            if (args.length == 0) {
                embed.setTitle(`Категории`)
                embed.setDescription(`Использование: ${client.prefix}${this.name} [категория]\n**Категории:** ${helpStr}`)
                message.channel.send(embed);
            };

            // if args is category name will output commands list in this category
            if (categories.hasOwnProperty(args[0]) == true) {
                commandList(1, true) //executing func below with 1st page and creating
                async function commandList(page, status, msg) {
                    helpStr = '' //clearing lines container
                    let maxP = Math.ceil(categories[args[0]].length / 10) //finding max possible page

                    let i = (page - 1) * 10 + 1; //index of cmd in list
                    //making list
                    categories[args[0]].slice((page - 1) * 10, page * 10).forEach(command => {
                        let res = client.commands.find(elem => elem.name == command);
                        helpStr += `\n**${i}.**  ${command} — *${res.description}*`;
                        i++;
                    });

                    //base embed settings
                    embed.setTitle(`Команды`);
                    embed.setDescription(`Использование: ${client.prefix}help [команда]\nКоманды:${helpStr}`);
                    embed.setFooter(`Страница: ${page}/${maxP}`);
                    embed.setAuthor(`Категория: ${args[0]}`);

                    //setting msg, msg is embedMessage that sending or editing bot
                    if (status == true)
                        msg = await message.channel.send(embed);
                    else
                        msg = await msg.edit(embed);

                    let ignore = 0; //для костылей фикса

                    if (categories[args[0]].length <= 10) // if less than 10 cmds we dont need make control
                        return; 

                    if (status == true) { //if new message add reactions for control
                        msg.react("⏪");
                        msg.react("⏩");
                        ignore = 2;
                    }

                    //creating reactionCollector
                    const filter = (reaction, user) => reaction.emoji.name === '⏩' || reaction.emoji.name === '⏪' && user == message.author;
                    const collector = msg.createReactionCollector(filter, {
                        time: 60000
                    });

                    //will execute when user clicked reaction
                    collector.on('collect', (reaction, user) => {
                        if (ignore > 0) {
                            ignore--;
                            return;
                        } //фикс бага когда бот ставит реакцию потом создает коллектор и считываеит её

                        //removing pressed by user emoji
                        msg.reactions.resolve('⏩').users.remove(user);
                        msg.reactions.resolve('⏪').users.remove(user);

                        //executing
                        if (reaction.emoji.name === '⏩') 
                            nextPage();
                        if (reaction.emoji.name === '⏪') 
                            previousPage();

                        function nextPage() {
                            if (page != maxP) {
                                collector.stop();
                                commandList(page + 1, false, msg);
                            };
                        };

                        function previousPage() {
                            if (page != 1) {
                                collector.stop();
                                commandList(page - 1, false, msg);
                            };
                        };
                    });
                };
            } 
            else if (command) { //if args was a command name
                if(command.invisible) 
                    return;
                embed.setTitle(`Информация о команде ${args[0]}`);
                embed.setDescription(`Команда: ${args[0]}\nОписание: ${command.description}\nИспользование: ${command.usage}\nПерезарядка: ${command.cooldown} сек\nВарианты: ${command.aliases}\nКатегория: **${command.category}**`);
                message.channel.send(embed);
            };
        };
    };
};