const { cyan } = require('chalk');
module.exports = (client) => {
    console.log(cyan(`[ЗАГРУЗКА]`), `Успешно выполнен логин из под ${client.user.tag}`);
	console.log(cyan(`[ЗАГРУЗКА]`), `Загружено за ${Date.now().getSeconds - Date.now(client.startAt).getSeconds || "0"}sec`);
    console.log("Гильдии:");
    client.guilds.cache.forEach(g => console.log(`${g.name} найдена!`));

    client.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(cyan('Invite:'), link);
    });
};