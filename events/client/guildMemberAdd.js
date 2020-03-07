module.exports = async (client, [newMember]) => {
   const GuildSchema = await require('../../database/model/Guild');
   let GuildSettings = await GuildSchema.findOne({ _id: newMember.guild.id})

   if(newMember.guild.roles.cache.get(GuildSettings.autoRoleID)){
      newMember.roles.add(GuildSettings.autoRoleID)
   }
}