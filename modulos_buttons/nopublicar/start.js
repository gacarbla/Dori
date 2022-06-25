// Consta todo lo necesario
const Discord = require('discord.js');
const megadb = require("megadb");
const notes = new megadb.crearDB('notas');

// Inicia el módulo
module.exports = {

  // Inicia "run"
  run: async (client, interaction) => {
    
    // Inicia el try
    try {

      // Establecemos mediante qué están divididas las claves en el botón
      var claves = interaction.customId.trim().split(/_+/g);

      // Establecemos que el texto se obtendrá de la base de datos
      var text = await notes.obtener(`${claves[1]}.mensaje.texto`);

      // Cambia la información de la nota para hacerla privada
      notes.establecer(`${claves[1]}.ajustes.seguridad`, "privada");

      // Establece un nuevo embed
      var embed = new Discord.MessageEmbed()
        .setDescription("**NUEVA NOTA**")
        .addField("Texto:", `${text}`)
        .addField("Autor/a:", `id -> \`${interaction.member.id}\`\nservidor -> \`${interaction.guild.id}\``)
        .addField("Ajustes:", `Seguridad -> \`privada\``);

      // Actualiza el embed del canal de notas referente a la nota
      client.channels.resolve("898689223601827891").messages.edit(`${claves[2]}`, {embeds: [embed]});

      // Establece un nuevo embed
      var embed = new Discord.MessageEmbed()
        .setDescription(`**NOTA CREADA EXITOSAMENTE**\nClave: ${claves[1]}`)
        .setColor(0x5865f2);

      // Actualiza el anterior mensaje para ahora sólo mostrarse el nuevo embed
      await interaction.update({ embeds: [embed], components: [], ephemeral: true});

    } catch (e) {
      // Envía un mensaje de error
      require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}