const { green, yellow } = require('chalk');
module.exports = (client) => {
    console.log(green(`[ЗАГРУЗКА]`), `Успешно выполнен логин из под ${client.user.tag}`);
	console.log(green(`[ЗАГРУЗКА]`), `Загружено за ${Date.now().getSeconds - Date.now(client.startAt).getSeconds || "0"}sec`);
    console.log(green(`[ЗАГРУЗКА]`), "Гильдии:");
    client.guilds.cache.forEach(g => console.log(green(`[ЗАГРУЗКА]`), `${g.name} найдена!`));

    client.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(yellow('[Приглашение]'), `${link}`);
    });
};