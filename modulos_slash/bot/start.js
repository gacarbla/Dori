const Discord = require("discord.js")
const megadb = require("megadb");
const comandos_slash = new megadb.crearDB('comandos_slash');
const servidores = new megadb.crearDB('servidores');

module.exports = {
    run: async (client, interaction) => {
      try {
        var subcommand = interaction.options.getSubcommand()
        if (!interaction.guild) { require("../../modulos_error/start").interact(client, interaction, "46", "no", "", "reply") }
        else if(!comandos_slash.has(`${interaction.commandName}.comandos.${subcommand}`)){
          comandos_slash.establecer(`${interaction.commandName}.comandos.${subcommand}`, {estado: "on", motivo: ""})
        }
          var estado = await comandos_slash.obtener(`${interaction.commandName}.comandos.${subcommand}.estado`)
          if(estado==='on'){
            if (!servidores.has(`${interaction.guild.id}.deshabilitado.cmd`)) {
              servidores.establecer(`${interaction.guild.id}.deshabilitado.cmd`, {})
            }
            if (servidores.has(`${interaction.guild.id}.deshabilitado.cmd.${subcommand}`)) {
              var rol = await servidores.obtener(`${interaction.guild.id}.deshabilitado.cmd.${subcommand}`)
              var perm = "si"
              var i = 0
              for (i=0;i<rol.length;i++){
                if (interaction.member.roles.cache.has(rol[i])) {
                  perm = "no"
                  break;
                }
              }
              if (perm=="si"){
                require(`./${subcommand}/start`).run(client, interaction)
              } else {
                var embed = new Discord.MessageEmbed()
                  .setDescription("Este comando ha sido deshabilitado por un administrador/a")
                  .setColor(0xed4245)
                await interaction.reply({embeds: [embed], ephemeral: true})
              }
            } else {
              require(`./${subcommand}/start`).run(client, interaction)
            }
          } else if (estado=='err') {
            var command = interaction.commandName
            var incidencia = await comandos_slash.obtener(`${command}.comandos.${subcommand}.motivo`)
            var embed = new Discord.MessageEmbed()
              .setTitle("Este comando ha reportado un error")
              .setDescription("Este comando ha causado un error y mientras no seamos capaces de localizarlo ha sido deshabilitado por seguridad.\nDori mantiene seguro tu servidor.")
              .setColor(0xed4245)
            await interaction.reply({embeds: [embed], ephemeral: true})
          } else {
            var command = interaction.commandName
            var incidencia = await comandos_slash.obtener(`${command}.comandos.${subcommand}.motivo`)
            try {
              require("../../modulos_error/start").interact(client, interaction, "102", "no",  "", "reply", incidencia)
            } catch (e) {
              require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
            }
          }
      } catch (e) {
        require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
      }
  }
}