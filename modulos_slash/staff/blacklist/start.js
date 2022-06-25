const Discord = require("discord.js")
const megadb = require("megadb")
const servidores = new megadb.crearDB('servidores')

module.exports = {
  run: async (client, interaction) => {
    try {
      let perm = interaction.member.permissions.has('ADMINISTRATOR')||interaction.member.id==='643575943289634836'
      if(!perm){
        require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
      } else {
        const act = interaction.options.getString('acción');
        const id = interaction.options.getString('id');

        // AÑADIR A LA LISTA
        if (act == "añadir") {
          try {
            if (isNaN(id)) { require("../../../modulos_error/start").interact(client, interaction, "22", "no",  "", "reply", "Las IDs sólo pueden contener números") } 
            else if (parseInt(id)<10000000000000000) { require("../../../modulos_error/start").interact(client, interaction, "24", "no",  "", "reply", "Esta ID no existe") }
            else if (parseInt(id)>1000000000000000000) { require("../../../modulos_error/start").interact(client, interaction, "23", "no",  "", "reply", "Esta ID no existe") }
            else {
              if (servidores.has(`${interaction.guild.id}.blacklist.${id}`)) {
                var embed = new Discord.MessageEmbed()
                  .setDescription("Este usuario ya se encontraba en la lista negra")
                  .setColor(0xed4245)
                await interaction.reply({embeds: [embed], ephemeral: true})
              } else {
                var embed = new Discord.MessageEmbed()
                  .setDescription(`El usuario con id \`${id}\` ha sido añadido a la lista negra del servidor.\nMientras se encuentre en ella no podrá acceder al servidor.`)
                  .addField("Usuario:", `ID: ${id}`)
                  .setColor(0xed4245)
                if (servidores.has(`${interaction.guild.id}.whitelist.${id}`)) {
                  servidores.eliminar(`${interaction.guild.id}.whitelist.${id}`)
                  embed = embed.setFooter("El usuario ha sido eliminado de la lista blanca automáticamente")
                }
                servidores.establecer(`${interaction.guild.id}.blacklist.${id}`, {admin: interaction.member.id, time: Date.now()})
                try {
                  let member = await interaction.guild.members.cache.get(id)
                  if (member && member.bannable){
                    var embed4user = new Discord.MessageEmbed()
                      .setTitle("HAS SIDO BANEAD@")
                      .setDescription(`Alguien ha decidido banearte en el servidor ${interaction.guild.name} con id \`${interaction.guild.id}\`.`)
                      .setColor(0x5865f2)
                    client.users.resolve(id).send({embeds: [embed4user]}).catch(()=>{return})
                    interaction.guild.members.ban(member.id)
                  } else {
                    servidores.eliminar(`${member.guild.id}.blacklist.${member.id}`)
                    embed = new Discord.MessageEmbed().setDescription("El bot no tiene permisos para banear a este usuario").setColor(0xed4245)
                  }
                } catch {}
                await interaction.reply({embeds: [embed], ephemeral: true})
              }
            }
          } catch (e) {
            require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
          }
        }
        
        // ELIMINAR DE LA LISTA
        if (act == "eliminar") {
          try {
            if (isNaN(id)) { require("../../../modulos_error/start").interact(client, interaction, "22", "no",  "", "reply", "Las IDs sólo pueden contener números") }
            else if (parseInt(id)<10000000000000000) { require("../../../modulos_error/start").interact(client, interaction, "24", "no",  "", "reply", "Esta ID no existe") }
            else if (parseInt(id)>1000000000000000000) { require("../../../modulos_error/start").interact(client, interaction, "23", "no",  "", "reply", "Esta ID no existe") }
            else {
              if (servidores.has(`${interaction.guild.id}.blacklist.${id}`)) {
                var embed = new Discord.MessageEmbed()
                  .setDescription(`El usuario con id \`${id}\` ha sido eliminado de la lista negra del servidor.\nAhora podrá acceder al servidor.`)
                  .addField("Usuario:", `ID: ${id}`).setColor(0x5865f2)
                servidores.eliminar(`${interaction.guild.id}.blacklist.${id}`)
                try {
                  interaction.guild.bans.fetch().then(bans=> {
                    if(bans.size == 0) return
                    let bUser = bans.find(b => b.user.id == id)
                    if(!bUser) return
                    interaction.guild.members.unban(bUser.user)
                  })
                  var embed4user = new Discord.MessageEmbed()
                    .setTitle("HAS SIDO DESBANEAD@")
                    .setDescription(`Alguien ha decidido desbanearte y retirarte de la lista negra en el servidor ${interaction.guild.name} con id \`${interaction.guild.id}\`.`)
                    .setColor(0x5865f2)
                  client.users.resolve(id).send({embeds: [embed4user]}).catch(()=>{return})
                } catch {}
                await interaction.reply({embeds: [embed], ephemeral: true})
              } else {
                var embed = new Discord.MessageEmbed()
                  .setDescription(`No hay ningún usuario con esta ID (\`${id}\`) en la lista negra.`)
                  .setColor(0xed4245)
                await interaction.reply({embeds: [embed], ephemeral: true})
              }
            }
          } catch (e) {
            require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
          }
        }
        
        // COMPROBAR SU ESTADO EN LA LISTA
        if (act == "comprobar") {
          try {  
            if (isNaN(id)) { require("../../../modulos_error/start").interact(client, interaction, "22", "no",  "", "reply", "Las IDs sólo pueden contener números") } 
            else if (parseInt(id)<10000000000000000) { require("../../../modulos_error/start").interact(client, interaction, "24", "no",  "", "reply", "Esta ID no existe") }
            else if (parseInt(id)>1000000000000000000) { require("../../../modulos_error/start").interact(client, interaction, "23", "no",  "", "reply", "Esta ID no existe") }
            else {
              var embed = new Discord.MessageEmbed()
                .setDescription("Este usuario no se encuentra en la lista negra")
                .setColor(0xfee45c)
              if (servidores.has(`${interaction.guild.id}.blacklist.${id}`)) {
                var admin = await servidores.obtener(`${interaction.guild.id}.blacklist.${id}.admin`)
                var tempo = await servidores.obtener(`${interaction.guild.id}.blacklist.${id}.time`)
                embed = new Discord.MessageEmbed()
                  .setColor(0x5865f2)
                  .addField("Estado", "En la lista negra")
                  .addField("Administrador/a", `<@!${admin}>`)
                  .addField("Tiempo", `<t:${Math.floor(tempo/1000)}:D> (<t:${Math.floor(tempo/1000)}:R>)`)
              } else if (servidores.has(`${interaction.guild.id}.whitelist.${id}`)) {
                var admin = await servidores.obtener(`${interaction.guild.id}.whitelist.${id}.admin`)
                var tempo = await servidores.obtener(`${interaction.guild.id}.whitelist.${id}.time`)
                embed = new Discord.MessageEmbed()
                  .addField("Estado", "En la lista blanca")
                  .addField("Administrador/a", `<@!${admin}>`)
                  .addField("Tiempo", `<t:${Math.floor(tempo/1000)}:D> (<t:${Math.floor(tempo/1000)}:R>)`)
                  .setColor(0xfee45c)
              }
              await interaction.reply({embeds: [embed], ephemeral: true})
            }
          } catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply") }
        }
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}