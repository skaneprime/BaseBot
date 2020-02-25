
<template>
<div class="container">
  <h1>Client</h1>
  <p class="text" v-if="client.user">
    Tag: {{ client.user.tag }}
    <br>
    ID: {{ client.user.id }}
    <br>
    <!-- COMMANDS: {{ client.commands }} cmds. -->
  </p>
  <hr>
  <h1>Client Guilds</h1>
  <div v-if="guilds.length > 0" class="guild-container">
    <!-- <div class="guild"
      v-for="(guild) in guilds"
      v-bind:item="guild"
      v-bind:key="guild.id"
      v-on:click="getGuildMenu(guild.id)"
      >
      <img class="guildIcon" v-if="guild.iconURL && !OneGuild" :src="guild.iconURL"/>
      <img class="guildIcon" v-if="!guild.iconURL  && !OneGuild" :src="'https://cdn.discordapp.com/icons/657586144791363594/5f8627ef6dc69b914ed90c3e029a9fbc.webp?size=128'"/>
      <p class="text" v-if="guild">{{ guild.name }}</p>
      <div v-if="OneGuild" class="AdvancedGuild">
        <div class="Channels"></div>
        <div class="GuildChannels"
          v-for="(channel) in GuildChannels"
          v-bind:item="channel"
          v-bind:key="channel.id"
        >
          <p class="text">{{ channel.name }}</p>
      </div>
      </div>  
    </div> -->
    <div v-if="!OneGuild" class="guilds">
      <div v-for="(guild) in guilds" :key="guild.id">
        <div class="guild" v-on:click="OneGuild = true; gid = guild.id">
          <img class="guildIcon" v-if="guild.iconURL" :src="guild.iconURL"/>
          <img class="guildIcon" v-if="!guild.iconURL" :src="'https://cdn.discordapp.com/icons/657586144791363594/5f8627ef6dc69b914ed90c3e029a9fbc.webp?size=128'"/>
          <p class="text">{{ guild.name }}</p>
        </div>
      </div>
    </div>
    <div v-if="OneGuild" class="AdvancedGuild">
      <img class="returnToGuilds" v-on:click="updateGuilds()" src="https://cdn0.iconfinder.com/data/icons/controls-add-on/48/v-38-512.png"/>
      <div v-for="(guild) in guilds" :key="guild.id">
        <div v-if="guild.id === gid">
          <img class="guildIcon" style="margin-right: 300px;" v-if="guild.iconURL" :src="guild.iconURL"/>
          <img class="guildIcon"  style="margin-right: 300px;" v-if="!guild.iconURL" :src="'https://cdn.discordapp.com/icons/657586144791363594/5f8627ef6dc69b914ed90c3e029a9fbc.webp?size=128'"/>
          <p class="text" style="margin-right: 300px;"> {{ guild.name }} </p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="guilds.length === 2">
    <button class="addMeButton" v-on:click="redirect()">Add Me!</button>
  </div>
  <p class="error" v-if="err.length > 2">{{ err }}</p>
</div>
</template>

<script>

import ClientService from '../ClientService';

export default {
  name: 'Client',
  data() {
    return {
      guilds: [],
      client: [],
      OneGuild: false,
      gid: '',
      GuildChannels: [],
      err: ''
    }
  },
  async created() {
    try {
      this.client = await ClientService.getData('');
      this.client.user = await ClientService.getData('/user');
      this.client.commands = await ClientService.getData('/commands');
      this.guilds = await ClientService.getData(`/guilds/cache`);
      this.client.invite = await ClientService.getData(`/invite`);
    } catch (er) {
      this.err = er;
    }
  },
  methods: {
    async updateGuilds() {
      this.guilds = await ClientService.getData(`/guilds/cache`);
      this.OneGuild = false;
    },
    async getGuildMenu(id) {
      this.guilds.map(async guild => {
        if(guild.id === id) {
          this.guilds = [guild];
          this.OneGuild = true;
          this.GuildChannels = await ClientService.getData(`/guilds/cache/getbyID/${guild.id}/channels/cache`);
          console.log(this.GuildChannels);
        }
      });
    },
    async getData(str) {
      return await ClientService.getData(str);
    },
    redirect() {
      return window.location.href = this.client.invite;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div.container {
    margin: 0 auto;
}
div.guild-container {
  display: inline-flex;
  justify-self: center;
  align-self: center;
  /* width: 5em; */
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  color: #222222;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
  padding: 10px;
  margin-bottom: 15px;
}

div.guilds {
  display: inline-table;
  position: relative;
  border-radius: 10px;
  background-color: #5c5f5f;
  padding: 10px 10px 30px 10px;
  margin: 10px;
  transition: all 240ms;
  width: 10.6em;
  cursor: pointer;
}

div.guild {
  display: inline-flexbox;
  background-color: #585a5a;
  position: relative;
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px;
}

/* .guild.active {
  margin-right: 49.5em;
} */

div.guild:hover {
  background-color: #7e8181;
}

div.GuildChannels {
  background: #222222;
  border-radius: 10px;
  padding: 5px 5px 0px 5px;
  margin-bottom: 5px;
}

.returnToGuilds {
  border-radius: 10px;
  background: #6d6d6d;
  color: white;
  width: 55px;
  text-align: center;
  transition: all 240ms;
  margin-right: 100%;
  /* margin-bottom: 200%; */
}

.returnToGuilds:hover {
  background:#e6ff5b;
}

div.AdvancedGuild { 
  background-color: #585858;
  border-radius: 10px;
  width: 500px;
  padding: 1em 2em;
  margin-right: 12em;
}

img.guildIcon {
  border-radius: 30%
}

p.text {
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
} 

.addMeButton {
  border-radius: 10px;
  background-color: #5c5f5f;
  border: none;
  outline: none;
  color: white;
  margin-top: 20px;
  padding: 20px 40px;
  font-size: 30px;
  transition: all 240ms;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.addMeButton:hover {
  background: #7e8181;
  font-size: 35px;
}

.addMeButton:active {
  background: #51e226;
  color: #8b8b8b;
  font-size: 0px;
  padding: 1px;
}

h1 {
  color: #ffffff;
}
</style>
