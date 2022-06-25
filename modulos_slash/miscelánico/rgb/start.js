const Discord = require("discord.js")
const superagent = require('superagent');
const rgb2hex = require('rgb2hex');
const canvas = require("canvas")

module.exports = {
    run: async (client, interaction) => {
      try{

        // Establecemos el color como el indicado por el usuario
        var red = interaction.options.getInteger('rojo')
        var green = interaction.options.getInteger('verde')
        var blue = interaction.options.getInteger('azul')

        if (red<0||blue<0||green<0) return require("../../../modulos_error/start").interact(client, interaction, "24", "no",  "", "reply", "Uno de los valores que has especificado es inferior a 0");
        if (red>255||blue>255||green>255) return require("../../../modulos_error/start").interact(client, interaction, "23", "no",  "", "reply", "Uno de los valores que has especificado es superior a 255");

        var color_bruto = rgb2hex(`rgb(${red},${green},${blue})`).hex
        var color = color_bruto.slice(1)

        // Establecemos la visibilidad del mensaje como la indicada por el usuario
        var state = interaction.options.getString('visibilidad')

        // Comprobamos si el color es un código hexadecimal de 6 dígitos
        var isOk = /^[0-9A-F]{6}$/i.test(color)

        // Si no lo es, devuelve error 13
        if (isOk === false) return require("../../../modulos_error/start").interact(client, interaction, "13", "no",  "", "reply", "El código debe ser válido");

        // Establece el "body"
        const { body } = await superagent.get(`https://api.alexflipnote.dev/color/` + color);

        const image = canvas.createCanvas(1000, 150)
        const ctx = image.getContext('2d')

        ctx.fillStyle = '#36393f';
        ctx.fillRect(0, 0, 1200, 150)

        ctx.fillStyle = `#${color}`
        ctx.font = `37px sans-serif`
        ctx.fillText(`${interaction.user.username}`, 165, 65)

        ctx.fillStyle = `white`
        ctx.font = `37px sans-serif`
        ctx.fillText(`Soy una hermosa mariposa`, 165, 115)

	      ctx.beginPath();
	      ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
	      ctx.closePath();
	      ctx.clip();

        const avatar = await canvas.loadImage(interaction.user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 25, 25, 100, 100);

        const attachment = new Discord.MessageAttachment(image.toBuffer(), `${color}.png`);


        // Establece un nuevo embed
        const embed = new Discord.MessageEmbed()
          .setColor("#"+color+"")
          .setTitle(body.name)
          .setDescription("Hex: " + body.hex + '\n' + "RGB: " + body.rgb)
          .setImage(body.image)

        // Si la visibilidad es privada, se envía con ephemeral
        if (state=="true"){
          await interaction.reply({embeds: [embed], ephemeral: true, files: [attachment]})
        
        // Si la visibildad es pública, se envía sin ephemeral
        } else {
          await interaction.reply({embeds: [embed], ephemeral: false, files: [attachment]})
        }
      } catch (e) {
        
        // Enviar mensaje de error
        require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
      
      };
    }
  }