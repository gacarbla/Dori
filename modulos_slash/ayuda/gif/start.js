const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    try {
      const lista = new Discord.MessageActionRow()
  			.addComponents(
  				new Discord.MessageSelectMenu()
  					.setCustomId('ayudalist')
  					.setPlaceholder('Comando')
  					.addOptions([
              {
                label: 'Volver',
                description: 'Volver al menú principal',
  						  value: 'volver',
  						  emoji: {
  							id: "892449750538924032",
  							name: "atras"
  						  }
              },{
                label: '/gif abrazar',
  						  value: 'gif_abrazar',
              },{
                label: '/gif aburrido',
  						  value: 'gif_aburrido',
              },{
                label: '/gif bailar',
  						  value: 'gif_bailar',
              },{
                label: '/gif besar',
  						  value: 'gif_besar',
              },{
                label: '/gif bofetada',
  						  value: 'gif_bofetada',
              },{
                label: '/gif cantar',
  						  value: 'gif_cantar',
              },{
                label: '/gif comer',
  						  value: 'gif_comer',
              },{
                label: '/gif dedito',
  						  value: 'gif_dedito',
              },{
                label: '/gif disparar',
  						  value: 'gif_disparar',
              },{
                label: '/gif dormir',
  						  value: 'gif_dormir',
              },{
                label: '/gif enfadarse',
  						  value: 'gif_enfadarse',
              },{
                label: '/gif feliz',
  						  value: 'gif_feliz',
              },{
                label: '/gif hambre',
  						  value: 'gif_hambre',
              },{
                label: '/gif lamer',
  						  value: 'gif_lamer',
              },{
                label: '/gif miedo',
  						  value: 'gif_miedo',
              },{
                label: '/gif patada',
  						  value: 'gif_patada',
              },{
                label: '/gif pegar',
  						  value: 'gif_pegar',
              },{
                label: '/gif pensar',
  						  value: 'gif_pensar',
              },{
                label: '/gif saludar',
  						  value: 'gif_saludar',
              },{
                label: '/gif sonrojado',
  						  value: 'gif_sonrojado',
              },{
                label: '/gif sueño',
  						  value: 'gif_sueño',
              },{
                label: '/gif triste',
  						  value: 'gif_triste',
              },
  					]),
  			);
      var titulo = "**CUADRO DE AYUDA**"
      let texto =   [
        "\`/gif abrazar\` **::** Da un abrazo",
        "\`/gif aburrido\` **::** Muestra aburrimiento",
        "\`/gif bailar\` **::** Ponte a bailar",
        "\`/gif besar\` **::** Besa a alguien",
        "\`/gif bofetada\` **::** Da una bofetada",
        "\`/gif cantar\` **::** Canta y no pares",
        "\`/gif comer\` **::** Comer, sin más",
        "\`/gif dedito\` **::** Mostrar el :sparkles: dedito :sparkles:",
        "\`/gif disparar\` **::** Dispara a alguien",
        "\`/gif dormir\` **::** Dormir, sin más",
        "\`/gif enfadarse\` **::** Enfadarse, sin más",
        "\`/gif feliz\` **::** Muestr tu felicidad",
        "\`/gif hambre\` **::** Muestra tu hambre",
        "\`/gif lamer\` **::** Lame a alguien",
        "\`/gif miedo\` **::** Muestra tu miedo",
        "\`/gif patada\` **::** Da una patada",
        "\`/gif pegar\` **::** Pégale a alguien",
        "\`/gif pensar\` **::** Pensar, sin más",
        "\`/gif saludar\` **::** Saluda, sin más",
        "\`/gif sonrojado\` **::** Muestra que estás sonrojad@",
        "\`/gif sueño\` **::** Muestra tu sueño",
        "\`/gif triste\` **::** Muestra que estás triste",
      ]
      texto = texto.sort()
      var embed = new Discord.MessageEmbed()
        .setDescription(titulo+`\n**Categoría \`/gif\`**\n\n`+texto.join("\n"))
        .setFooter(`${texto.length} comandos`)
        .setColor(0xfee75c)
      await interaction.reply({embeds: [embed], components:[lista], ephemeral: true}).catch((e)=>{
        require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply")
      })
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply")
    }
  }
}