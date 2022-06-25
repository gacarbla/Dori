const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
    run: async (client, interaction) => {
        const cantidad = interaction.options.getInteger('cantidad');
        var usuario = interaction.member
        var servidorId = interaction.guild.id
        if(!usuarios.has(`${usuario.id}.dinero.${servidorId}`)){
            var embed = new Discord.MessageEmbed()
                .setDescription('**ERROR 74**\nSi el error persiste, envíe un mensaje normal y vuelva a probar')
                .setFooter('Para ver la definición concreta del error, use el comando /error')
                .setColor(0xed4245)
            await interaction.reply({embeds: [embed], ephemeral: true})
        } else {
            var banco = await usuarios.obtener(`${usuario.id}.dinero.${servidorId}.banco`)
            if(banco<cantidad){
                var embed = new Discord.MessageEmbed()
                    .setDescription('**ERROR 14**\nNo tienes tanto dinero en el banco')
                    .setFooter('Para ver la definición concreta del error, use el comando /error')
                    .setColor(0xed4245)
                await interaction.reply({embeds: [embed], ephemeral: true})
            } else if (cantidad<1){
                var embed = new Discord.MessageEmbed()
                    .setDescription('**ERROR 13**\nNo puedo ingresar esta cantidad de dinero')
                    .setFooter('Para ver la definición concreta del error, use el comando /error')
                    .setColor(0xed4245)
                await interaction.reply({embeds: [embed], ephemeral: true})
            } else {
                try{
                usuarios.restar(`${usuario.id}.dinero.${servidorId}.banco`, cantidad)
                usuarios.sumar(`${usuario.id}.dinero.${servidorId}.cartera`, cantidad)
                var dinero = await usuarios.obtener(`${usuario.id}.dinero.${servidorId}.cartera`)
                var banco = await usuarios.obtener(`${usuario.id}.dinero.${servidorId}.banco`)
                var embed = new Discord.MessageEmbed()
                    .setDescription(`Has retirado ${cantidad} ₪ de tu cuenta`)
                    .addField(`:moneybag: Dinero`, `${dinero} ₪`, false)
                    .addField(`:atm: Banco`, `${banco} ₪`, false)
                    .setColor(0x5865f2)
                await interaction.reply({embeds: [embed], ephemeral: true})
                } catch {
                    var embed = new Discord.MessageEmbed()
                        .setDescription('**ERROR 1**')
                        .setFooter('Para ver la definición concreta del error, use el comando /error')
                        .setColor(0xed4245)
                    await interaction.reply({embeds: [embed], ephemeral: true})
                }
            }
        }
    }
}