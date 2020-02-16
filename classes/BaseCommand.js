module.exports = class BaseCommand {
    constructor(data) {
        this.name = data.name || 'unnamed'; // Название комманды
        this.aliases = data.aliases || []; // Второстепенное название комманды
        this.category = data.category || "Не указано"; // Категория комманды
        this.cache = data.cache || {}; // Не нужный кеш
        this.usage = data.usage || "Не указано"; // Для комманды help
        this.description = data.description || "Не указано"; // Описание комманды
        this.guildOnly = data.guildOnly || "true"; // Полезно :3
        this.allowed_guilds = data.allowed_guilds || []; // Полезно
        this.cooldown = data.cooldown || 0; // Колдаун
    };
};