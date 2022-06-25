const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    try{
      var apodo = interaction.member.nickname || '*(No tienes apodo)*'
      var advertencias_n_bruto = await usuarios.obtener(`${interaction.member.id}.advertencias.${interaction.guild.id}.numero`)
      var advertencias_n = advertencias_n_bruto || "0"
      let galletas = 0
      let amuletos = 0
      let material_escolar = 0
      let sobornos = 0
      if(usuarios.has(`${interaction.member.id}.items.${interaction.guild.id}.galleta`)){
        try { galletas = await usuarios.obtener(`${interaction.member.id}.items.${interaction.guild.id}.galleta`) }
        catch { return }
      }
      if(usuarios.has(`${interaction.member.id}.items.${interaction.guild.id}.amuleto`)){
        try { amuletos = await usuarios.obtener(`${interaction.member.id}.items.${interaction.guild.id}.amuleto`) }
        catch { return }
      }
      if(usuarios.has(`${interaction.member.id}.items.${interaction.guild.id}.material_escolar`)){
        try { material_escolar = await usuarios.obtener(`${interaction.member.id}.items.${interaction.guild.id}.material_escolar`) }
        catch { return }
      }
      if(usuarios.has(`${interaction.member.id}.items.${interaction.guild.id}.soborno`)){
        try { sobornos = await usuarios.obtener(`${interaction.member.id}.items.${interaction.guild.id}.soborno`) }
        catch { return }
      }
      var embed = new Discord.MessageEmbed()
        .setTitle('TUS DATOS EN EL SERVIDOR')
        .addField('Apodo:', apodo, true)
        .addField('Advertid@:', `${advertencias_n} veces`, true)
        .addField('Roles:', interaction.member.roles.cache.map(role => role.toString()).join(" | "), false)
        .addField('Economía:', `:moneybag: **Cartera**\n${await usuarios.obtener(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`)}$\n\n:atm: **Banco**\n${await usuarios.obtener(`${interaction.member.id}.dinero.${interaction.guild.id}.banco`)}$`, true)
        .addField('Items:', `:cookie: Galletas: ${galletas}\n:money_with_wings: Sobornos: ${sobornos}\n:school_satchel: Material escolar: ${material_escolar}\n:diamond_shape_with_a_dot_inside: Amuletos: ${amuletos}`, true)
        .addField('** **', '** **')
        .setColor(0x5865f2)
      await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
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