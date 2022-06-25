const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
    run: async (client, interaction) => {
        var usuario = interaction.options.getUser('usuario') || interaction.member
        let galletas = 0
        let amuletos = 0
        let material_escolar = 0
        let sobornos = 0
        if(usuarios.has(`${usuario.id}.items.${interaction.guild.id}.galleta`)){
            galletas = await usuarios.obtener(`${usuario.id}.items.${interaction.guild.id}.galleta`)
        }
        if(usuarios.has(`${usuario.id}.items.${interaction.guild.id}.amuleto`)){
            amuletos = await usuarios.obtener(`${usuario.id}.items.${interaction.guild.id}.amuleto`)
        }
        if(usuarios.has(`${usuario.id}.items.${interaction.guild.id}.material_escolar`)){
            material_escolar = await usuarios.obtener(`${usuario.id}.items.${interaction.guild.id}.material_escolar`)
        }
        if(usuarios.has(`${usuario.id}.items.${interaction.guild.id}.soborno`)){
            sobornos = await usuarios.obtener(`${usuario.id}.items.${interaction.guild.id}.soborno`)
        }
        var embed = new Discord.MessageEmbed()
            .setDescription(`<@!${usuario.id}>\n\n:cookie: Galletas: ${galletas}\n:money_with_wings: Sobornos: ${sobornos}\n:school_satchel: Material escolar: ${material_escolar}\n:diamond_shape_with_a_dot_inside: Amuletos: ${amuletos}`)
            .setColor(0x5865f2)
        await interaction.reply({embeds: [embed], ephemeral: true})
    }
}