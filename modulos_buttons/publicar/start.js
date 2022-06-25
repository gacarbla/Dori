const Discord = require('discord.js')
const megadb = require("megadb")
const usuarios = new megadb.crearDB('usuarios')
const notes = new megadb.crearDB('notas')

module.exports = {
  run: async (client, interaction) => {

    // Inicia el try
    try {

      // Establecemos mediante qué están divididas las claves en el botón
      var claves = interaction.customId.trim().split(/_+/g);

      // Establece que el texto es obtenido de la base de datos
      var text = await notes.obtener(`${claves[1]}.mensaje.texto`)

      // Establece la accesibilidad de la nota como pública
      notes.establecer(`${claves[1]}.ajustes.seguridad`, "pública")

      // Establece un nuevo embed
      var embed = new Discord.MessageEmbed()
        .setDescription("**NUEVA NOTA**")
        .addField("Texto:", `${text}`)
        .addField("Autor/a:", `id -> \`${interaction.member.id}\`\nservidor -> \`${interaction.guild.id}\``)
        .addField("Ajustes:", `Seguridad -> \`pública\``)

      // Edita el mensaje de la nota actualizando los datos conforme a los cambios aplicados
      client.channels.resolve("898689223601827891").messages.edit(`${claves[2]}`, {embeds: [embed]})
      
      // Establece un nuevo embed
      var embed = new Discord.MessageEmbed()
        .setDescription(`**NOTA CREADA EXITOSAMENTE**\nClave: ${claves[1]}`)
        .setColor(0x5865f2)

      // Actualiza el mensaje que había recibido el usuario al embed que se ha especificado y se eliminan los botones
      await interaction.update({ embeds: [embed], components: [], ephemeral: true});
    } catch (e) {
      // Envía un mensaje de error
      require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}