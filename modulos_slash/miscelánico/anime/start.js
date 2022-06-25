const Discord = require('discord.js')
const mal = require('mal-scraper')

module.exports = {
    run: async (client, interaction) => {
        const nombre = interaction.options.getString('nombre')
        var embed = new Discord.MessageEmbed()
            .setColor(0x5865f2)
            .setTitle(`<a:rem_baile:883000049750122546> Buscando ${nombre}`)
        await interaction.reply({embeds: [embed], ephemeral: true}).then(async (message)=>{
            mal.getInfoFromName(nombre).then(async (data) => {    
                var embed = new Discord.MessageEmbed()
                    .setColor(0x5865f2)
                    .setTitle("Resultados de la Busqueda")
                    .addField("Titulo: ", `[${data.title}](${data.url})`)
                    .setImage(`${data.picture}`)
                await interaction.followUp({embeds: [embed]})
            })
        })
    }
}