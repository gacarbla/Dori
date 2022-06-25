// Consta todo lo necesario: Discord y bases de datos
const Discord = require('discord.js');
const megadb = require("megadb");
const usuarios = new megadb.crearDB('usuarios');
const notes = new megadb.crearDB('notas');

// Inicia el módulo
module.exports = {
  
  // Inicia "run"
  run: async (client, interaction) => {
    
    // Inicia el try que se asegurará de que no existan errores
    try {

      //Establecemos mediante qué están divididas las claves en el botón
      var claves = interaction.customId.trim().split(/_+/g);

      // Indicamos que elimine de la base de datos la nota que coincida con el 2º elemento del
      // array "claves"
      notes.eliminar(`${claves[1]}`);

      // Accede al canal de notas del servidor de Dori e intenta borrar el mensaje de dicha
      // nota, la ID del mensaje se ve reflejada en el 3º elemento del arry "claves"
      try {
        client.channels.resolve("898689223601827891").messages.delete(claves[2]).catch((e)=>{
          // Si falla manda mensaje de error
          require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
        });
      } catch (e) {
        // Envía un mensaje de error
        require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
      };

      // Crea un nuevo embed indicando que se ha borrado la nota
      var embed = new Discord.MessageEmbed()
        .setDescription(`**NOTA BORRADA EXITOSAMENTE**`)
        .setColor(0x5865f2);

      // Actualiza el embed para que aparezca sólo el embed que acabos de indicar como "embed".
      // Se eliminarán los botones pero se mantendrá el mensaje en ephemeral
      await interaction.update({ embeds: [embed], components: [], ephemeral: true});
      
      // Intenta restarle al usuario "1" a la cantidad de notas que posee
      try {
        usuarios.restar(`${interaction.member.id}.notas.cantidad`, 1);
      } catch { return }
      
      // Intenta eliminar del registro de notas del usuario la nota que acaba de eliminar
      try {
        usuarios.extract(`${interaction.member.id}.notas.propiedad`, `${claves[1]}`);
      } catch { return }

    } catch (e) {
      // Envía un mensaje de error
      require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
    }
  }
}