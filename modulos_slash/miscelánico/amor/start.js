const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction)=>{
    const usuario1 = interaction.options.getUser('usuario1');
    const usuario2 = interaction.options.getUser('usuario2');
    var valor_bruto = Math.floor(Math.random()*80)
    var valor = Math.floor(valor_bruto+20)
    let mensaje = "Como que algo raro ha pasado"
    let emoji = ""
    if(usuario1.id===usuario2.id===interaction.member.id){
      mensaje = "Quiérete tal y como eres";
      emoji = ":sparkling_heart:";
    } else if (usuario1.id===usuario2) {
      let palabra_var = ["guap@", "hermos@", "cosita hermosa", "cosita linda", "", "besllesón", ":wink:"]
      var aleatorio = Math.floor(Math.random()*palabra_var.length)
      mensaje = `${usuario1} quiérete tal y como eres ${palabra_var[aleatorio]}`
      emoji = ":sparkling_heart:"
    } else if ((usuario1.id === usuario2.id) && (usuario1.id===client.user.id)){
      mensaje = "¿Qué intentas lograr con esto?"
      emoji = ""
    } else if (((usuario1.id===client.user.id)&&usuario2.bot)||((usuario2.id===client.user.id)&&usuario1.bot)) {
      mensaje = "Es mi competencia  . _.\n¿Cómo te atreves a shiperme con...? ¡ESO!"
      emoji = ""
    } else if (usuario1.bot||usuario2.bot) {
      mensaje = `¿Porqué los bots tenemos que soportar esto?\nNo, olvídate, 0%   >:v`
      emoji = ""
    } else if ( valor < 50 ) {
      let mensaje_var = ["Creo que esto ha fallado...", "Ehmmm..."]
      var aleatorio = Math.floor(Math.random()*mensaje_var.length)
      mensaje = `${ensaje_var[aleatorio]} Al parecer teneis un ${valor}% de compatibilidad`
      emoji = ':broken_heart:'
    } else if ( valor < 80 ) {
      let mensaje_var = ["Más de lo que esperaba:", "Uhhhhh...", ""]
      var aleatorio = Math.floor(Math.random()*mensaje_var.length)
      mensaje = `${mensaje_var[aleatorio]} Al parecer teneis un ${valor}% de compatibilidad`
      emoji = ':heart: '
    } else {
      let mensaje_var = ["¿Para cuándo la boda?", "Ojoooooooo...", "Uhhhhh...", "Yo no digo nada, pero...", "  :smirk:"]
      var aleatorio = Math.floor(Math.random()*mensaje_var.length)
      mensaje = `${mensaje_var[aleatorio]} Al parecer teneis un ${valor}% de compatibilidad`
      emoji = ':sparkling_heart:'
    }
    var embed = new Discord.MessageEmbed()
      .setAuthor(`Ship entre ${usuario1.username}#${usuario1.discriminator} y ${usuario2.username}#${usuario2.discriminator}`)
      .setDescription(emoji+mensaje+emoji)
      .setColor(0x5865f2)
    await interaction.reply({embeds: [embed]})
  }
}