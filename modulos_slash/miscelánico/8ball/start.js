const Discord = require("discord.js")

module.exports = {
    run: async (client, interaction) => {
      try{
        const q = interaction.options.getString('pregunta');
        let respuestas = [
          "En mi opinion, si",
          "Si",
          "La respuesta es obvia",
          "Probablemente",
          "No lo tengo muy claro...",
          "Todo apunta a que tienes razón",
          "Sin duda",
          "Si",
          "Si, definitivamente",
          "Debes confiar en ello",
          "Sera mejor que no te lo diga ahora",
          "No puedo predecirlo ahora",
          "Puede ser",
          "No cuentes con ello",
          "Mi respuesta es no",
          "Mis fuentes me dicen que no",
          "Las perspectivas no son buenas",
          "Muy dudoso"
        ]
        let preguntas_1 = [ "¿a qué le tienes miedo?", "a qué le tienes miedo?", "tienes miedo", "tienes miedo?", "¿tienes miedo?",
          "¿a que le tienes miedo?", "a que le tienes miedo?", "a que le tienes miedo", "a qué le tienes miedo", "tu mayor miedo", "cuál es tu mayor miedo?", "cual es tu mayor miedo?",
          "¿cuál es tu mayor miedo?","¿cual es tu mayor miedo?", "cuál es tu mallor miedo?", "cual es tu mallor miedo?", "¿cuál es tu mallor miedo?", "¿cual es tu mallor miedo?",
        ]
        if (preguntas_1.includes(q.toLowerCase())){
          respuestas = "Mi mayor miedo...\nSupongo que ver como el tiempo avanza de forma constante e imparable ante nuestros ojos mientras estamos felices sin darnos de cuénta de la triste realidad en la cuál todas aquellas personas que amamos morirán tarde o temprano...\nNah, no te creas, me dan miedo las arañas."
        } else {
          respuestas = respuestas[Math.floor(Math.random()*respuestas.length)]
        }
        var embed = new Discord.MessageEmbed()
          .setTitle("8ball")
          .addField("Tu pregunta", `${q}`)
          .addField("Mi respuesta", `${respuestas}`)
          .setColor(0x5865f2)
        await interaction.reply({embeds: [embed], ephemeral: true})
      } catch (e) {
        
        // Enviar mensaje de error
        require("../../../modulos_error/start").interact(client, interaction, "01", "no",  e, "reply");
      
      };
    }
  }