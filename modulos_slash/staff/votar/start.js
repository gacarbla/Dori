const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    try{
      let perm = interaction.member.permissions.has('MANAGE_MESSAGES')||interaction.member.id==='643575943289634836'
      if(perm){
        const texto = interaction.options.getString('texto');
        const o1 = interaction.options.getString('opción1');
        const o2 = interaction.options.getString('opción2');
        const o3 = interaction.options.getString('opción3');
        const o4 = interaction.options.getString('opción4');
        const o5 = interaction.options.getString('opción5');
        const o6 = interaction.options.getString('opción6');
        const o7 = interaction.options.getString('opción7');
        const o8 = interaction.options.getString('opción8');
        const o9 = interaction.options.getString('opción9');
        const mencionar = interaction.options.getRole('mencionar');
        let opciones = [ "", o1, o2, o3, o4, o5, o6, o7, o8, o9]
        const votación = new Discord.MessageEmbed()
          .setAuthor(`VOTACIÓN`)
          .setTitle(`${texto}`)
          .setDescription(`${opciones[1]?`🇦 ${opciones[1]}`: ``}\n${opciones[2]?`🇧 ${opciones[2]}`: ``}\n${opciones[3]?`🇨 ${opciones[3]}`: ``}\n${opciones[4]?`🇩 ${opciones[4]}`: ``}\n${opciones[5]?`🇪 ${opciones[5]}`: ``}\n${opciones[6]?`🇫 ${opciones[6]}`: ``}\n${opciones[7]?`🇬 ${opciones[7]}`: ``}\n${opciones[8]?`🇭 ${opciones[8]}`: ``}\n${opciones[9]?`🇮 ${opciones[9]}`: ``}\n`)
          .setFooter(`Votación realizada por ${interaction.user.username}#${interaction.user.discriminator}`)
          .setColor(0x5865f2)
        interaction.channel.send({content: `${mencionar?`<@&${mencionar.id}>`:``}** **`,embeds: [votación]}).catch(()=>{
          return
        }).then(m=>{
          try{
              m.react("🇦");
              m.react("🇧");
              if(opciones[3]) m.react("🇨")
              if(opciones[4]) m.react("🇩")
              if(opciones[5]) m.react("🇪")
              if(opciones[6]) m.react("🇫")
              if(opciones[7]) m.react("🇬")
              if(opciones[8]) m.react("🇭")
              if(opciones[9]) m.react("🇮")
          } catch (e) {
            require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply", "Algo raro ha sucedido y no puedo reaccionar al mensaje.")
          }
        })
        var embed = new Discord.MessageEmbed()
          .setDescription(`Votación creada`)
          .setColor(0x5865f2)
        await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{
          return
        })
      } else {
        require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}