const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')
const tabla_precios = new megadb.crearDB('productos')

module.exports = {
  run: async (client, interaction) => {
    try {
      if(!usuarios.has(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`)) {
        usuarios.establecer(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`, 0)
      }
      var carcel = await usuarios.obtener(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`)
      if(carcel>Date.now()){
        var ms_restante = Math.floor(carcel-Date.now())
        var días_restante = Math.floor(ms_restante/86400000)
        var horas_restante = Math.floor((ms_restante%86400000)/3600000)
        var minutos_restante = Math.floor(((ms_restante/1000)/60)%60)
        var segundos_restante = Math.floor((ms_restante/1000)%60)
        var embed = new Discord.MessageEmbed()
          .setDescription('Vaya, al parecer no hay tiendas en la cárcel')
          .setFooter('Tiempo restante: '+días_restante+' días '+horas_restante+' horas '+minutos_restante+' minutos '+segundos_restante+' segundos')
          .setColor(0xed4245)
        await interaction.reply({embeds: [embed], ephemeral: true})
      } else {
        require('./comprar').run(client, interaction)
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply")
    }
  }
}