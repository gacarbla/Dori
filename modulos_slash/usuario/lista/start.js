const Discord = require('discord.js')
const megadb = require("megadb")
const usuarios = new megadb.crearDB('usuarios')
const notes = new megadb.crearDB('notas')

module.exports = {
  run: async (client, interaction) => {
    try {
      var id = interaction.member.id
      var array = await usuarios.obtener(`${id}.notas.propiedad`)
      if (!array) var array = []
      if (!array.length) var array = []
      var i = 0
      let msg = ["Vaya, al parecer no tienes ninguna nota"]
      for(i=0;i<array.length;i++){
        var estado = await notes.obtener(`${array[i]}.ajustes.seguridad`)
        msg[i] = `\`${array[i]} - ${estado}\``
      }
      var embed = new Discord.MessageEmbed()
        .setDescription("**Tus notas:**\n"+msg.join("\n"))
        .setColor(0x5865f2)
      await interaction.reply({embeds: [embed], ephemeral: true})
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}