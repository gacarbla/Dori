const Discord = require('discord.js')
const megadb = require('megadb')
const servidores = new megadb.crearDB('servidores')

module.exports = {
  run: async (client, interaction) => {
    try {
        let perm = interaction.member.permissions.has('ADMINISTRATOR')||interaction.member.id==='643575943289634836'
      if(!perm){
        require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
      } else {
        const estado = interaction.options.getString('estado');
        const max = interaction.options.getInteger('máximo');
        const min = interaction.options.getInteger('mínimo');
        if (estado=="off"){
          servidores.establecer(`${interaction.guild.id}.niveles`, {estado: `off`, max: 0, min: 0})
          var embed = new Discord.MessageEmbed()
            .setDescription("Se ha desactiado el sistema de niveles del servidor.\nSe ha guardado el nivel de experiencia de todos los usuarios y los comandos de staff referentes a los niveles continuarán operativos para poder recuperar los niveles cuándo la administración desee.")
            .setColor(0x5865f2)
          await interaction.reply({embeds: [embed], ephemeral: true})
        } else {
            servidores.establecer(`${interaction.guild.id}.niveles`, {estado: `on`, max: max?max:25, min: min?min:5})
            var embed = new Discord.MessageEmbed()
              .setDescription(`Se han modificado los ajustes del sistema de niveles`)
              .addField(`Estado actual:`, `**ENCENDIDO**`)
              .addField(`Máximo:`, `${max}`, true)
              .addField(`Mínimo:`, `${min}`, true)
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true }).catch(()=>{return})
          }
        }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}