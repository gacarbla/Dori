// Consta todo lo necesario para iniciar: Discord y bases de datos
const Discord = require("discord.js");
const megadb = require("megadb");
const usuarios = new megadb.crearDB('usuarios');
const notes = new megadb.crearDB('notas');

// Inicia el módulo
module.exports = {

  // Inicia "run"
  run: async (client, interaction) => {
    
    // Inicia el try
    try {

      //Establecemos mediante qué están divididas las claves en el botón
      var clave = interaction.customId.trim().split(/_+/g);

      // Sólo si la base de datos posee la nota
      if(notes.has(clave[1])){

        // Actualiza el mensaje a sin componentes
        await interaction.update({content: "**Nota eliminada por <@!"+interaction.member.id+">**", components: [] });

        // El autor será el registrado en la base de datos
        var autor = await notes.obtener(`${clave[1]}.ajustes.autor`);

        // El contenido se obtendrá también de la base de datos
        var contenido = await notes.obtener(`${clave[1]}.mensaje.texto`);

        // Elimina la nota de la lista de notas del usuario
        usuarios.extract(`${interaction.member.id}.notas.propiedad`, clave[1]);

        // Elimina la nota de forma definitiva
        notes.eliminar(clave[1]);

        // Resta al número de notas del usuario "1"
        usuarios.restar(`${interaction.member.id}.notas.cantidad`, 1);

        // Establece "embed" como un mensaje embedado de Discord
        var embed = new Discord.MessageEmbed()
          .setDescription("Un administrador o administradora del bot ha declarado que una de tus notas es inadecuada o incumple las normas y por lo tanto ha sido borrada.")
          .addField("Contenido de la nota:", `${contenido}`)
          .setFooter("Administrador/a: "+interaction.user.username+"#"+interaction.user.discriminator)
          .setColor(0xed4245);

        // Envía el embed al autor de la nota
        client.users.resolve(autor).send({embeds:[embed]}).catch(()=>{return});

        // Establece que ahora "embed" es un mensaje embedado diferente
        var embed = new Discord.MessageEmbed()
          .setDescription("Mensaje enviado")
          .setColor(0x5865f2);

      } else {

        // Actualiza el mensaje a sin componentes
        await interaction.update({content: "**Nota eliminada por el usuario.**", components: [] });
        
        var embed = new Discord.MessageEmbed()
          .setDescription("Esta nota ya había sido eliminada por el usuario")
          .setColor(0xed4245)
      }

      // Envía como respuesta a la interacción el embed especificado en "embed"
      await interaction.followUp({embeds: [embed], ephemeral: true});

    } catch (e) {
      // Envía un mensaje de error
      require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
    }
  }
}