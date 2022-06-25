const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios_db = new megadb.crearDB('usuarios')
const tabla_precios = new megadb.crearDB('productos')

module.exports = {
    run: async (client, interaction) => {
        const item = interaction.options.getString('item');
        if(!usuarios_db.has(`${interaction.member.id}.items.${interaction.guild.id}.${item}`)){
            var embed = new Discord.MessageEmbed()
                .setDescription('Vaya, parece ser que no tienes esto en tu inventario.')
                .setColor(0xed4245)
            await interaction.reply({embeds: [embed], ephemeral: true})
        } else {
            usuarios_db.restar(`${interaction.member.id}.items.${interaction.guild.id}.${item}`, 1)
            if(item==='galleta'){
                let mensaje = `<@!${interaction.member.id}> se ha comido una galleta`
                let dinero = 0
                var aleatorio = Math.floor(Math.random()*100)
                if(aleatorio>=70){
                    mensaje = `<@!${interaction.member.id}> se ha comido una galleta y dentro tenía 100$\n¿¡PERO QUE DE QUÉ!?`
                    dinero = 100
                }
                usuarios_db.sumar(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`, `${dinero}`)
                var embed = new Discord.MessageEmbed()
                    .setDescription(`${mensaje}`)
                    .setColor(0x5865f2)
                    .setImage("https://media.giphy.com/media/3owyplPY9gVLqBsXHW/giphy.gif?cid=ecf05e477lzzqlb0qz86ebl87eo86ac3w98iz6654iud3yhp&rid=giphy.gif&ct=g")
                await interaction.reply({embeds: [embed], ephemeral: false})
            }
            var cantidad = await usuarios_db.obtener(`${interaction.member.id}.items.${interaction.guild.id}.${item}`)
            if(cantidad===0){
                usuarios_db.eliminar(`${interaction.member.id}.items.${interaction.guild.id}.${item}`)
            }
        }
    }
}