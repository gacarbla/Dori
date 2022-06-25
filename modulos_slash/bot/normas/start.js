const Discord = require('discord.js')

module.exports = {
    run: async (client, interaction) => {
      try {

        // Establecemos un botón con link a la página de topgg del bot
        const row = new Discord.MessageActionRow()
          .addComponents(
            new Discord.MessageButton()
              .setURL("https://web.doribot.repl.co/Términos-y-condiciones.html")
              .setLabel('Términos y condiciones')
              .setStyle('LINK'),
          )
          .addComponents(
		  		  new Discord.MessageButton()
              .setURL("https://web.doribot.repl.co/Política-de-privacidad.html")
				  	  .setLabel('Política de privacidad')
					    .setStyle('LINK'),
			    );

        // Establecemos las normas
        let array = [
          {
            title: "referente al servidor",
            normas: [
              "Dori no estará presente en servidores con contenido ilegal",
              "Dori no estará presente en servidores que envíen contenido NSFW en canales no NSFW",
              "Dori se guarda el derecho de realizar un análisis anónimo completo del servidor para comprobar si se cumplen los términos y condiciones",
              "Dori podrá bloquear el acceso a servidores que incumplan las normas"
            ]
          },
          {
            title: "referente a los usuarios",
            normas: [
              "Dori se guarda el derecho a bloquear el uso de comandos a un usuario por incumplir los términos y condiciones",
              "En caso de que un usuario incumplas los términos y condiciones de Discord, y Dori lo detecte, este reportará automáticamente el usuario",
              "Todo usuario que se encuentre regustrado en la base de datos de Dori podrá solicitar en el servidor de soporte del bot los datos que han sido recolectados sobre su persona",
              "Está determinantemente prohibido el acoso, intimidación, cyberbulling o la ignorancia ante estos casos. El incumplimiento de esta norma podrá suponer un gran daño al servidor por la ira del bot"
            ]
          },
          {
            title: "referente a los comandos del bot",
            normas: [
              "Cada categoría de comandos posee sus propias normas, términos y condiciones de uso",
              "Ninguna otra norma o condición referente a los comandos puede indicar algo contrario a lo aquí establecido",
              "Todo comando estará habilitado el 100% del tiempo, exceptuando casos de actualizaciones o reparaciones",
              "No se usarán cooldowns en los comandos, a no ser que se emplee de forma abusiva los comandos y en ese caso se establecerá un cooldown general por servidor"
            ]
          },
          {
            title: "referente a los errores",
            normas: [
              "Dori permite que cualquier usuario no bloqueado reporte errores",
              "Todo usuario no bloqueado tiene derecho a que se inicie el proceso de resolución del error que haya reportado en menos de 24 horas",
              "Ningún usuario podrá reportar más de un error por minuto con motivo de evitar SPAM",
              "El mal uso del comando \`/error reportar\` supondrá un severo castigo",
              "Todo usuario tiene derecho a reportar un error por privado al creador del bot",
            ]
          },
          {
            title: "referente a la economía",
            normas: [
              "Está completamente prohibido el intercambio de Dorimonedas (₪) por una pertenencia de valor diferente a 0; sea una moneda virtual o real, un objeto físico o digital; no está permitido el trueque de la Dorimoneda (₪)",
              "No está permitido por parte de la administración abusar del poder del comando de \`/staff dinero\`, de darse la situación, se establecerá un cooldown",
              "Todo usuario no bloqueado tiene derecho al uso libre y gratuíto de la economía si la administración del servidor la ha habilitado",
              "Será bloqueado cualquier usuario que encuentre un error en el sistema de economía y lo use a su favor",
              "Está prohibido el uso de multicuentas para la obtención de más monedas en un servidor",
            ]
          },
          {
            title: "referente a los gifs",
            normas: [
              "Está prohibido el uso abusivo de estos comandos en cualquier canal o servidor",
              "Está prohibido el uso de los gifs como medio de acoso o cyberbulling a cualquier usuario",
              "Todo usuario tiene derecho a **NO** ser acosad@ con los gifs ni con otro comando",
            ]
          },
          {
            title: "referente a los comandos miscelánicos",
            normas: [
              "No está permitido el uso de la opción que permite a todos los usuarios la visualización del contenido en canales restringidos",
              "Está determinantemente prohibido el uso abusivo de los comandos referentes a Minecraft®, Roblox®, MAL® u otras APIs",
              "Los comandos referentes a colores no están pensados para un uso contínuo. Abusar de su uso podrá desencadenar en la implementación de un cooldown"
            ]
          },
          {
            title: "referente a los comandos para staff",
            normas: [
              "Está prohibido emplear los comandos de staff si no se poseen los permisos necesarios aún que Dori haya sufrido un error",
              "No está permitido el uso del comando \`/staff usuarios whitelist\` como medio de SPAM e invitación a tu servidor",
            ]
          },
          {
            title: "referente a las notas",
            normas: [
              "Las notas no pueden contener datos de carácter personal o privado",
              "No está permitido anotar contraseñas, números de teléfono, e-mails u otra información de contacto",
              "Está prohibido el uso de notas como medio de envío de contenido ilegal, violento o pornográfico",
              "Dori se reserva el derecho a leer el contenido de todas las notas enviadas",
              "Es obligatorio que todas las notas públicas u ocultas se encuentren en uno de los siguientes idiomas: `Chino`, `Español`, `Inglés`, `Francés`, `Portugês`",
              "Prohibido texto gravemente ofensivo para un individuo o colectivo, incluyendo así incitaciones al odio, violencia, maltrato, abuso, etc...",
              "Prohibido el uso de \"palabrotas\" haciendo así referencia aun individuo o colectivo, nos da igual que sea de broma, PROHIBIDO (No podemos distinguir las bromas del resto, con lo que tomamos esta medida)",
              "Prohibido el uso de texto ZALGO",
              "Prohibido su uso como medio publicitario o de SPAM"
            ]
          },
          {
            title: "referente al xp",
            normas: [
              "Está prohibido el SPAM o flood (Envío masivo de mensajes no necesarios para la conversación) para conseguir mayor XP",
              "Ningún usuario tiene permitido el traspaso de puntos de experiencia",
              "No se permite el canjeo de los puntos XP"
            ]
          }
        ]

        // Establecemos un nuevo embed
        var embed = new Discord.MessageEmbed()
          .setAuthor(`${client.user.username}#${client.user.discriminator}`, `${client.user.avatarURL()}`)
          .setTitle('NORMAS, TÉRMINOS Y CONDICIONES DE USO DE DORI, BOT DE DISCORD')
          .setURL('https://web.doribot.repl.co/Términos-y-condiciones.html')
          .setDescription("Dori posee unas normas, términos y condiciones de uso como cualquier otro bot. En la mayoría se limitan a los términos y condiciones de uso de Discord pues la cantidad de servidores y usuarios a supervisar es demasiado grande para poder hacer un seguimiento eficaz.\n\n\n** **")
          .setColor(0x5865f2)

        array.forEach( n => {
          embed.addField(`${n.title.toUpperCase()}`, `${n.normas.join(`\n\n`)}\n\n\n** **`)
        })

        // Intenta enviar el embed y si no puede envía error 05
        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true }).catch((e)=>{
          require("../../../modulos_error/start").interact(client, interaction, "05", "no",  e, "reply");
        })
      } catch (e) {
        // Envía un mensaje de error
        require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
      }
    }
}