const Discord = require("discord.js")

module.exports = {
    run: async (client, interaction) => {
      try{

        // Establece el usuario como el especificado por el usuario
        var usuario = interaction.options.getString('usuario')

        // Obtiene la url de la foto
        let url = `http://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&Format=Png&username=${usuario}`

        // Establece un nuevo embed
        var embed = new Discord.MessageEmbed()
          .setTitle("AVATAR DE "+usuario.toUpperCase())
          .setImage(url)
          .setColor(0x5865f2)
          .setFooter("¿No aparece ninguna imágen? Eso es que el usuario no existe")

        // Envía el embed como respuesta del comando
        await interaction.reply({embeds: [embed]})
        
      } catch (e) {
        
        // Enviar mensaje de error
        require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
      
      };
    }
  }