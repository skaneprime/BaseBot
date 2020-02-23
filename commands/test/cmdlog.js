const ascii = require('ascii-table');
let BaseCommand = require('../../classes/BaseCommand');
module.exports = class extends BaseCommand {
    constructor() {
        super({
            name: "showcmd",
            aliases: [],
            category: "test",
            usage: "",
            description: "",
            guildOnly: false, // только на сервере, ЛС не используется!
            allowed_guilds: [],
            cooldown: 0 // кулдаун
        });

        this.execute = (client, message, args, ...params) => {
        //     // client.commands.forEach(cmd => {
        //     //     var cmd_table = new ascii() 
        //     //     cmd_table.setHeading(cmd.name, 'data')
        //     //     cmd_table.addRow('', JSON.stringify(cmd))
        //     //     console.log(cmd_table.toString())
        //     // });
        //     var Schema = mongoose.Schema;
        //     var cmdlist = new Schema({
        //         name: String,
        //         description: String,
        //         usage: String
        //     });
        //     var cmds = mongoose.model('cmds', cmdlist);
        //     client.commands.forEach(command => {
        //         if(cmds.findOne({
        //             name: command.name
        //         })) return cmd.log(`${command.name} уже в базе!`)
        //         SaveCommandToDB(command);
        //     })
        //     function SaveCommandToDB(cmd) { 

        //         let temp = new cmds({
        //         name: cmd.name,
        //         description: cmd.description,
        //         usage: cmd.usage
        //     })
        //     temp.save();
        }

        
    };
};

/*:Boi: :Boi: :Boi:                   :Boi:                   :Boi: :Boi: :Boi: 
:Boi:                               :Boi:                   :Boi:       :Boi: 
:Boi:                         :Boi:       :Boi:             :Boi: :Boi: :Boi: 
:Boi: :Boi: :Boi:             :Boi:       :Boi:                   :Boi: :Boi: 
:Boi:       :Boi:       :Boi:                   :Boi:       :Boi:       :Boi: 
:Boi: :Boi: :Boi:       :Boi:                   :Boi:       :Boi:       :Boi:  */