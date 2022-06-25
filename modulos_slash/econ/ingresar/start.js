const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
    run: async (client, interaction) => {
        const cantidad = interaction.options.getInteger('cantidad');
        if(!usuarios.has(`${interaction.member.id}.dinero.${interaction.guild.id}`)){
            var embed = new Discord.MessageEmbed()
                .setDescription('**ERROR 74**\nSi el error persiste, envíe un mensaje normal y vuelva a probar')
                .setFooter('Para ver la definición concreta del error, use el comando /error')
                .setColor(0xed4245)
            await interaction.reply({embeds: [embed], ephemeral: true})
        } else {
            var dinero = await usuarios.obtener(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`)
            if(dinero<cantidad){
                var embed = new Discord.MessageEmbed()
                    .setDescription('**ERROR 14**\nNo tienes tanto dinero en efectivo')
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
                usuarios.restar(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`, cantidad)
                usuarios.sumar(`${interaction.member.id}.dinero.${interaction.guild.id}.banco`, cantidad)
                var dinero = await usuarios.obtener(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`)
                var banco = await usuarios.obtener(`${interaction.member.id}.dinero.${interaction.guild.id}.banco`)
                var embed = new Discord.MessageEmbed()
                    .setDescription(`Has ingresado ${cantidad} ₪ en tu cuenta`)
                    .addField(`:moneybag: Dinero`, `${dinero} ₪`, false)
                    .addField(`:atm: Banco`, `${banco}$`, false)
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