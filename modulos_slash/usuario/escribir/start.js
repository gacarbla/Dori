const Discord = require('discord.js')
const megadb = require("megadb")
const usuarios = new megadb.crearDB('usuarios')
const notes = new megadb.crearDB('notas')

module.exports = {
  run: async (client, interaction) => {
    try {
      let cantidad = 0
      let max = 11
      if(usuarios.has(`${interaction.member.id}.notas.cantidad`)){
        cantidad = await usuarios.obtener(`${interaction.member.id}.notas.cantidad`)
        max = await usuarios.obtener(`${interaction.member.id}.notas.max`)
      } else {
        usuarios.establecer(`${interaction.member.id}.notas.propiedad`, [])
        usuarios.establecer(`${interaction.member.id}.notas.cantidad`, 0)
        usuarios.establecer(`${interaction.member.id}.notas.max`, 11)
      }
      if(cantidad<max){
        const text = interaction.options.getString('texto');
        const access = interaction.options.getString('acceso');
        var text_array = text.toUpperCase().split(/ /g)
        let palabrotas = ["puto", "puta", "puticlub", "putero", "putera", "putita", "putito","fucking", "cona", "follar", "fuchicar", "put*", "pu**", "chingar", "chinga", "coño", "polla", "bitch"]
        var i = 0
        let apto = true
        for (i=0;i<palabrotas.length;i++){
          if(text_array.includes(palabrotas[i].toUpperCase())){
            apto = false;
            break;
          }
        }
        if(apto){
          var n = "ABCDEFGHIKLMNÑOPQRSTUVWXYZ1234567890"
          let c1 = "";let c2 = "";let c3 = "";let c4 = "";let c5 = "";let clave = ""
          var i = 0
          for (i=0;i>-1;i++){
            c1 = n.charAt(Math.floor(Math.random() * n.length));
            c2 = n.charAt(Math.floor(Math.random() * n.length));
            c3 = n.charAt(Math.floor(Math.random() * n.length));
            c4 = n.charAt(Math.floor(Math.random() * n.length));
            c5 = n.charAt(Math.floor(Math.random() * n.length));
            clave = `${c1}${c2}${c3}${c4}${c5}`;
            if(!notes.has(clave)){
              break
            }
          }
          notes.establecer(`${clave}`, {ajustes: {contraseña:``, seguridad: `${access=="pública"?"privada":access}`, servidor: `${interaction.guild.id}`, autor: `${interaction.member.id}`}, mensaje: {título: `Nota de ${interaction.user.tag}`, texto: `${text}`, fecha: `${Date.now()}`}})
          usuarios.push(`${interaction.member.id}.notas.propiedad`, `${clave}`)
          usuarios.sumar(`${interaction.member.id}.notas.cantidad`, 1)
          var botons = new Discord.MessageActionRow()
			      .addComponents(
				      new Discord.MessageButton()
					      .setCustomId('eliminar_'+clave)
					      .setLabel('Eliminar')
					      .setStyle('DANGER'),
			      );
          var embed = new Discord.MessageEmbed()
            .setDescription("**NUEVA NOTA**")
            .addField("Texto:", `${text}`)
            .addField("Autor/a:", `id -> \`${interaction.member.id}\`\nservidor -> \`${interaction.guild.id}\``)
            .addField("Ajustes:", `Seguridad -> \`${access=="pública"?"privada":access}\``)
          client.channels.resolve("898689223601827891").send({embeds: [embed], components: [botons]}).then(async m => {
            if(access=="pública"){
              var botons = new Discord.MessageActionRow()
			          .addComponents(
	  			        new Discord.MessageButton()
  		  			      .setCustomId('publicar_'+clave+'_'+m.id)
	  		  		      .setLabel('Publicar de todas formas')
		  		  	      .setStyle('SUCCESS'),
                  new Discord.MessageButton()
				  	        .setCustomId('nopublicar_'+clave+'_'+m.id)
					          .setLabel('Mejor no la publico')
					          .setStyle('SECONDARY'),
                  new Discord.MessageButton()
					          .setCustomId('borrar_'+clave+'_'+m.id)
					          .setLabel('Bórrala')
  					        .setStyle('DANGER'),
                  new Discord.MessageButton()
		  			        .setCustomId('normas-notas_'+clave+'_'+m.id)
			  		        .setLabel('Normas')
				  	        .setStyle('PRIMARY'),
                );
              var embed = new Discord.MessageEmbed()
                .setDescription("Estás a punto de publicar una nota para que cualquier persona pueda verla.\nSegúrate de que sumple con las normas de Dori antes de publicarla.")
                .addField("Contenido:", `${text}`)
                .setColor(0xfee75c)
              await interaction.reply({embeds: [embed], components: [botons], ephemeral: true})
            } else {
              var embed = new Discord.MessageEmbed()
                .setDescription(`**NOTA CREADA EXITOSAMENTE**\nClave: ${clave}`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true})
            }
          });
        } else {
          var embed = new Discord.MessageEmbed()
            .setDescription("He detectado que tu mensaje no cumple con las normas.\nRevisa tu mensaje y haz las modificaciones oportunas si quieres publicarlo.")
            .addField("Mensaje deneado:", `\`\`\`txt\n${text}\`\`\`** **`)
            .setColor(0xed4245)
          await interaction.reply({embeds: [embed], ephemeral: true})
        }
      } else {
        var embed = new Discord.MessageEmbed()
          .setDescription("Ya has alcanzado el máximo de notas que puedes crear.\nElimina alguna para poder crear más.")
          .setColor(0xed4245)
        await interaction.reply({embeds: [embed], ephemeral: true}).catch(async()=>{
          var embed = new Discord.MessageEmbed()
            .setDescription(`**ERROR 1**\nSe ha producido un error al intentar enviar el mensaje`)
            .setFooter('Para ver la definición concreta del error, use el comando /error')
            .setColor(0x5865f2)
          await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
        })
      }
    } catch {
      async (e) => {
        /* No caso de que falle, indicar erro e envialo á canle de erros */
        var embed = new Discord.MessageEmbed() // Crea o embed co erro
          .setDescription(`**ERROR 1**\nSe le ha enviado el error a mis desarrolladores para que lo solucionen.`)
          .setFooter('Para ver la definición concreta del error, use el comando /error')
          .setColor(0x5865f2)
        await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return}) // Envíalle o embed ao usuario que sufriu o erro
        var embed = new Discord.MessageEmbed() // Crea un novo embed co erro pero extendido
          .setTitle(`ERROR AUTO-REPORTADO`)
          .setFooter(`Usuario:`, `<@!${interaction.member.id}>\n${interaction.user.username}#${interaction.user.discriminator}\n${interaction.member.id}`, true)
          .addField('Servidor:', `${interaction.guild.name}\n${interaction.guild.id}`, true)
          .addField(`Error reportado:`, `\`/${interaction.commandName} ${interaction.options.getSubcommand()}\`\n\`\`\`\n${e}\n\`\`\``) // Consta o erro aquí
          .setColor(0x5865f2)
        client.channels.resolve(`851207782464094299`).send({content: `<@!643575943289634836>`, embeds: [embed]}).catch(()=>{return}) // Envía o embed na canle de erros mencionando a gacarbla
      }
    }
  }
}