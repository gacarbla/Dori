const Discord = require("discord.js")

module.exports = {
  run: async (client, interaction) => {
    try {
      var embed = new Discord.MessageEmbed()
        .setTitle("CUADRO DE AYUDA")
        .addField("¿Cómo busco un producto?", "Bajo el mensaje, al lado del botón de ayuda que has pulsado, hay varias flechas con las que puedes cambiar de sección.\nDirígete a la sección deseada y en el menú selecciona el producto que deseas comprar.")
        .addField("¿Cómo compro un producto?", "Todos los productos legales aparecen en el texto de cuánto cuestan. Aquellos que en la vida real serían ilegales sólo aparecen en la lista.\nEn la lista sólo van a aparecer los productos que puedas comprar con el dinero que posees (Recuerda que sólo puedes pagar con el dinero en efectivo).\nUna vez encuentres el producto en la lista, selecciónalo y ya lo habrás comprado. Si no aparece, a lo mejor es que no tienes el dinero necesario.")
        .addField("¿Porqué no puedo comprar un producto?", "Pueden existir dos razones: El producto en tu servidor no está habilitado, como puede ser el caso de los productos de XP si tu servidor no ha activado los niveles. O que no poseas el dinero necesario para comprarlo.")
        .addField("Tengo dinero pero no puedo comprarlo", "Revisa bien si el dinero es en efectivo, la tienda no tiene para pagar con tarjeta.\nSi aún así no te funciona, puedes usar el comando \`/error reportar\` y contarnos tu problema.")
        .setColor(0x57f287)
      await interaction.update({embeds: [embed], components: []})
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}