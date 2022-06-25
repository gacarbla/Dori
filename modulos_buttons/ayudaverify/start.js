// Consta la librería principal de Discord
const Discord = require("discord.js");

module.exports = {
  
  // Inicia "run"
  run: async (client, interaction) => {
    
    // Inicia el try para comprobar si el bot puede enviar el mensaje.
    try {

      // Actualiza el mensaje a sin componentes, los embeds contenido y demás los deja igual
      await interaction.update({ components: [] });

      // Establecer embed on las instrucciones para verificarse
      var embed = new Discord.MessageEmbed()
        .setTitle("AYUDA PARA VERIFICARSE")
        .addField("PASO 1:", "Envíe el comando `/verificar`.\nObtendrá una clave, __NO BORRE EL MENSAJE__ aún que le aparezca justo debajo un texto que indica que puede hacerlo, necesiatarás la clave.", false)
        .addField("PASO 2:", "Vuelve a usar el comando `/verificar`, pero en esta ocasión seleccionarás en la barra que te aparezca encima del cuadro de texto la opción `clave` y escribirás justo después la clave que el primer paso te ha ofrecido.", false)
        .addField("PASO 3:", "Espere a que el bot le asigne el rol, si ocurre algún error se le notificará de ello.")
        .setImage("https://i.ibb.co/pKT8YbW/imagen-2021-10-16-151309.png")
        .setColor(0xfee75c);
      
      await interaction.followUp({embeds: [embed], ephemeral: true}).catch((e)=>{
        // Enviar mensaje de error
      require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
      });

    } catch (e) {
      
      // Enviar mensaje de error
      require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
    
    };
  },
};