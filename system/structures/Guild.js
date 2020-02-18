const { Structures } = require('discord.js');

Structures.extend('Guild', Guild => {
    class SupaGuild extends Guild {
        constructor(client, data) {
            super(client, data);

            this.cool = true;
        }
    }

    return SupaGuild;
});