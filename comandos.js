const Discord = require('discord.js')

module.exports = {
  run: async (client, message) => {
    if(!message.guild){return}
    else if(!message.content){return}
    else if(message.author.bot){return}
    else {
      if (!client.application?.owner) await client.application?.fetch();
      if (message.channel.id === '876928261333061662' && message.author.id === client.application?.owner.id) {
        const data = [
        { // Bot
          name: 'bot',
          description: 'Todos los comandos referentes al bot',
          options: [
            { // Ping
              name: 'ping',
              description: 'Muestra el ping de la API de Discord',
              type: 'SUB_COMMAND'
            },
            { // Versión
              name: 'versión',
              description: `Muestra la versión de ${client.user.username}`,
              type: 'SUB_COMMAND'
            },
            { // Info
              name: 'info',
              description: 'Muestra la información del bot',
              type: 'SUB_COMMAND'
            },
            { // Invitar
              name: 'invitar',
              description: 'Muestra el enlace para invitar al bot a tu servidor',
              type: 'SUB_COMMAND',
            },
            { // TopGG
              name: 'topgg',
              description: '¿Sabías que Dori está en top.gg?',
              type: 'SUB_COMMAND',
            },
            { // Sugerencia
              name: 'sugerencia',
              description: 'Envía una sugerencia a los desarrolladores del bot',
              type: 'SUB_COMMAND',
              options: [{
                name: 'texto',
                description: 'Introduzca la sugerencia que quiere enviar',
                type: 'STRING',
                required: true
              }]
            },
            { // Normas
              name: "normas",
              description: "Normas y condiciones de uso de Dori",
              type: "SUB_COMMAND"
            }
          ]
        },
        { // Econ
          name: 'econ',
          description: 'Economía avanzada y "real"',
          options: [
            { // Balance
              name: 'balance',
              description: 'Observa la cantidad de dinero que posees en estos momentos',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: '¿Quieres ver la cuenta bancaria de alguien?',
                  type: 'USER',
                  required: false
                },
              ]
            },
            { // Ranking
              name: "ranking",
              description: "Observa las personas con más dinero del servidor",
              type: "SUB_COMMAND",
              options: [
                {
                  name: "visibilidad",
                  description: "¿Quién podrá ver el uso del comando?",
                  required: true,
                  type: "STRING",
                  choices: [
                    {
                      name: "Sólo yo",
                      value: "true"
                    },
                    {
                      name: "Todo el mundo",
                      value: "false"
                    }
                  ]
                }
              ]
            },
            { // Ingresar
              name: 'ingresar',
              description: 'Ingresa dinero para que nadie te lo pueda robar',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'cantidad',
                  description: 'Indica la cantidad de dinero que deseas ingresar',
                  type: 'INTEGER',
                  min_value: 1,
                  required: true
                },
              ]
            },
            { // Retirar
              name: 'retirar',
              description: 'Retira dinero si quieres comprar algo',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'cantidad',
                  description: 'Indica la cantidad de dinero que deseas retirar',
                  type: 'INTEGER',
                  min_value: 1,
                  required: true
                },
              ]
            },
            { // Transferir
              name: 'transferir',
              description: 'Transfiere dinero de tu cuenta bancaria a la de otro usuario',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'cantidad',
                  description: 'Indica la cantidad de dinero que deseas transferir',
                  type: 'INTEGER',
                  min_value: 1,
                  required: true
                },
                {
                  name: 'usuario',
                  description: '¿A quién quieres transferir este dinero?',
                  type: 'USER',
                  required: true,
                }
              ]
            },
            { // Robar
              name: 'robar',
              description: 'Roba dinero a alguien para hacerte más ric@',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: '¿A quién quieres robar?',
                  type: 'USER',
                  required: true
                },
              ]
            },
            { // Mochila
              name: "mochila",
              description: "Obtén una lista de los items de los que dispones tú u otra persona",
              type: "SUB_COMMAND",
              options: [
                {
                  name: "usuario",
                  description: "¿Quieres ver los items de alguien?",
                  type: "USER",
                  required: false
                }
              ]
            },
            { // Usar
              name: "usar",
              description: "Utiliza un item de tu mochila",
              type: "SUB_COMMAND",
              options: [
                {
                  name: "item",
                  description: "Recuerda que el hecho de aparecer aquí, no significa que tengas ese item",
                  type: "STRING",
                  required: true,
                  choices: [
                    {
                      name: "Galleta",
                      value: "galleta"
                    },
                  ]
                }
              ]
            },
            { // Regalar
              name: "regalar",
              description: "Regala un item a alguien",
              type: "SUB_COMMAND",
              options: [
                {
                  name: "item",
                  description: "Recuerda que el hecho de aparecer aquí, no significa que tengas ese item",
                  type: "STRING",
                  required: true,
                  choices: [
                    {
                      name: "Galleta",
                      value: "galleta"
                    },
                    {
                      name: "Soborno",
                      value: "soborno"
                    },
                    {
                      name: "Material escolar",
                      value: "material_escolar"
                    },
                    {
                      name: "Amuleto de la suerte",
                      value: "amuleto"
                    },                
                  ]
                },
                {
                  name: "usuario",
                  description: "¿A quién se lo quieres regalar?",
                  type: "USER",
                  required: true
                }
              ]
            },
            { // Comprar
              name: 'comprar',
              description: 'Compra un item en la tienda de Dori',
              type: 'SUB_COMMAND'
            },
            { // Trabajar
              name: "trabajar",
              description: "¿Ya tienes un empleo y quieres trabajar? ¡Adelante!",
              type: "SUB_COMMAND"
            },
            { // Buscar trabajo
              name: "buscar-trabajo",
              description: "¿Quieres buscar un empleo? Usa este comando y encuentra el trabajo de tus sueños",
              type: "SUB_COMMAND",
              options:[
                {
                  name: "profesión",
                  description: "¿De qué quieres trabajar?",
                  type: "STRING",
                  required: true,
                  choices: [
                    {
                      name: "Cajer@ en un supermercado (400 ₪)",
                      value: "cajero_supermercado"
                    },
                    {
                      name: "Camarer@ en un bar (400 ₪)",
                      value: "camarero"
                    },
                    {
                      name: "Basurer@ (400 ₪)",
                      value: "basurero"
                    },
                    {
                      name: "Carpinter@ (500 ₪)",
                      value: "carpintero"
                    },
                    {
                      name: "Mecánic@ (800 ₪)",
                      value: "mecanico"
                    },
                    {
                      name: "Electricista (1000 ₪)",
                      value: "electricista"
                    },
                    {
                      name: "Fontaner@ (1000 ₪)",
                      value: "fontanero"
                    },
                    {
                      name: "Policía (1200 ₪)",
                      value: "policia"
                    },
                    {
                      name: "Doctor/a (1500 ₪)",
                      value: "doctor"
                    },
                    {
                      name: "Informátic@ (1800 ₪)",
                      value: "informatico"
                    },
                    {
                      name: "Ingenier@ (2000 ₪)",
                      value: "ingeniero"
                    },
                    {
                      name: "Programador/a de bots (1 ₪)",
                      value: "programador_bots"
                    },
                  ]
                }
              ]
            },
            { // Estudiar
              name: "estudiar",
              description: "Consigue un título profesional",
              type: "SUB_COMMAND",
              options: [
                {
                  name: "profesión",
                  description: "¿A qué aspiras?",
                  type: "STRING",
                  required: true,
                  choices: [
                    {
                      name: "Carpinter@ ( Matrícula: 5000 ₪ )",
                      value: "carpintero"
                    },
                    {
                      name: "Mecánic@ ( Matrícula: 8000 ₪ )",
                      value: "mecanico"
                    },
                    {
                      name: "Electricista ( Matrícula: 10000 ₪ )",
                      value: "electricista"
                    },
                    {
                      name: "Fontaner@ ( Matrícula: 10000 ₪ )",
                      value: "fontanero"
                    },
                    {
                      name: "Policía ( Matrícula: 12000 ₪ )",
                      value: "policia"
                    },
                    {
                      name: "Doctor/a ( Matrícula: 15000 ₪ )",
                      value: "doctor"
                    },
                    {
                      name: "Informátic@ ( Matrícula: 18000 ₪ )",
                      value: "informatico"
                    },
                    {
                      name: "Ingenier@ ( Matrícula: 20000 ₪ )",
                      value: "ingeniero"
                    },
                  ]
                }
              ]
            }
          ]
        },
        { // GIF
          name: 'gif',
          description: 'Encuentra el gif ideal para expresarte',
          options: [
            { // Abrazar
              name: 'abrazar',
              description: 'Muestra tu cariño con un abrazo',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: '¿A quién quieres abrazar?',
                  type: 'USER',
                  required: true
                },
              ]
            },
            { // Aburrido
              name: 'aburrido',
              description: 'Si te aburres, este es tu comando',
              type: 'SUB_COMMAND',
            },
            { // Bailar
              name: 'bailar',
              description: 'Baila y que nada te pare',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: '¿Quieres dedicarle un baile a alguien?',
                  type: 'USER',
                  required: false
                },
              ]
            },
            { // Besar
              name: 'besar',
              description: 'Dale un besito a alguien   nwn',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: '¿A quién quieres besar?',
                  type: 'USER',
                  required: true
                },
              ]
            },
            { // Bofetada
              name: 'bofetada',
              description: 'Dale una bofetada a alguien',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: '¿A quién quieres darle una bofetada?',
                  type: 'USER',
                  required: true
                },
              ]
            },
            { // Cantar
              name: 'cantar',
              description: 'Canta y que nada te pare',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: '¿Quieres dedicarle una canción a alguien?',
                  type: 'USER',
                  required: false
                },
              ]
            },
            { // Comer
              name: 'comer',
              description: 'Comer es mi pasión',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: '¿No tienes ganas de probar a que sabe alguien?',
                  type: 'USER',
                  required: false
                },
              ]
            },
            { // Dedito
              name: 'dedito',
              description: 'Enséñale a alguien el dedito mágico',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: '¿A quién quieres enseñarle el dedito?',
                  type: 'USER',
                  required: true
                },
              ]
            },
            { // Disparar
              name: 'disparar',
              description: 'Dispara a alguien',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: '¿A quién quieres disparar?',
                  type: 'USER',
                  required: true
                },
              ]
            },
            { // Dormir
              name: 'dormir',
              description: 'Dormir, me gusta dormir, ¿A quién no?',
              type: 'SUB_COMMAND',
            },
            { // Enfadarse
              name: 'enfadarse',
              description: 'Si estás enfadad@, este es tu comando',
              type: 'SUB_COMMAND',
            },
            { // Feliz
              name: 'feliz',
              description: 'Muestra tu felicidad con un simple comando',
              type: 'SUB_COMMAND',
            },
            { // Hambre
              name: 'hambre',
              description: 'Tengo hambreeeee',
              type: 'SUB_COMMAND',
            },
            { // Lamer
              name: 'lamer',
              description: 'No pienso comentar este comando   -_-',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: '¿Quién va a sufrirlo?',
                  type: 'USER',
                  required: true
                },
              ]
            },
            { // Miedo
              name: 'miedo',
              description: 'Si tienes miedo, este es tu comando',
              type: 'SUB_COMMAND',
            },
            { // Patada
              name: 'patada',
              description: 'Dale una "patadita" a alguien',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: '¿A quién quieres partirle la pierna?',
                  type: 'USER',
                  required: true
                },
              ]
            },
            { // Pegar
              name: 'pegar',
              description: 'Dale una buena ensalada de puños a alguien',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: '¿A quién le vas a hacer la comida?',
                  type: 'USER',
                  required: true
                },
              ]
            },
            { // Pensar
              name: 'pensar',
              description: 'Es complicado, pero se puede',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: '¿Estás pensando en alguien?',
                  type: 'USER',
                  required: false
                },
              ]
            },
            { // Saludar
              name: 'saludar',
              description: 'Saludaaaa',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: '¿Estás saludando a alguien en específico?',
                  type: 'USER',
                  required: false
                },
              ]
            },
            { // Sonrojado
              name: 'sonrojado',
              description: 'Muestra que te has sonrojado',
              type: 'SUB_COMMAND',
            },
            { // Sueño
              name: 'sueño',
              description: 'Tengo sueño... ¿Y tú?',
              type: 'SUB_COMMAND',
            },
            { // Triste
              name: 'triste',
              description: 'Si te sientes triste, este es tu comando  UnU',
              type: 'SUB_COMMAND',
            },
          ]
        },
        { // Error
          name: 'error',
          description: `¿Algún error? Este es tu comando`,
          options: [
            { // Significado
              name: 'significado',
              description: `Averigue lo que significa esos códigos de error que ${client.user.user} te dice a veces`,
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'código',
                  description: `Inserte el código de error (Min. 1, Máx. 999)`,
                  type: 'INTEGER',
                  min_value: 0,
                  max_value: 999,
                  required: true
                }
              ]
            },
            { // Reportar
              name: 'reportar',
              description: 'Reporta un error que hayas visto',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'descripción',
                  description: 'Describe el error',
                  type: 'STRING',
                  required: true
                }
              ]
            }
          ]
        },
        { // Staff
          name: 'staff',
          description: 'Accede a los comandos de staff',
          options: [
            { // Servidor
              name: "servidor",
              description: "Accede a los ajustes del servidor como staff",
              type: "SUB_COMMAND_GROUP",
              options: [
                {
                  name: "niveles",
                  description: "Gestiona el sistema de niveles de tu servidor",
                  type: "SUB_COMMAND",
                  options: [
                    {
                      name: "estado",
                      description: "Estado del sistema de niveles en tu servidor",
                      type: "STRING",
                      required: true,
                      choices: [
                        {
                          name: "Encendido",
                          value: "on"
                        },
                        {
                          name: "Apagado",
                          value: "off"
                        }
                      ]
                    },
                    {
                      name: "máximo",
                      description: "Máximo XP que podrán obtener por mensaje",
                      type: "INTEGER"
                    },
                    {
                      name: "mínimo",
                      description: "Mínimo XP que podrán obtener por mensaje",
                      type: "INTEGER"
                    }
                  ]
                },
                { // Votar
                  name: "votar",
                  description: "Permisos necesarios: Gestionar mensajes",
                  type: "SUB_COMMAND",
                  options: [
                    {
                      name: "texto",
                      description: "¿Qué quieres votar?",
                      type: "STRING",
                      required: true
                    },
                    {
                      name: "opción1",
                      description: "¿Cuál es la primera opción?",
                      type: "STRING",
                      required: true
                    },
                    {
                      name: "opción2",
                      description: "¿Cuál es la segunda opción?",
                      type: "STRING",
                      required: true
                    },
                    {
                      name: "opción3",
                      description: "¿Cuál es la tercera opción?",
                      type: "STRING",
                      required: false
                    },
                    {
                      name: "opción4",
                      description: "¿Cuál es la cuarta opción?",
                      type: "STRING",
                      required: false
                    },
                    {
                      name: "opción5",
                      description: "¿Cuál es la quinta opción?",
                      type: "STRING",
                      required: false
                    },
                    {
                      name: "opción6",
                      description: "¿Cuál es la sexta opción?",
                      type: "STRING",
                      required: false
                    },
                    {
                      name: "opción7",
                      description: "¿Cuál es la séptima opción?",
                      type: "STRING",
                      required: false
                    },
                    {
                      name: "opción8",
                      description: "¿Cuál es la octava opción?",
                      type: "STRING",
                      required: false
                    },
                    {
                      name: "opción9",
                      description: "¿Cuál es la novena opción?",
                      type: "STRING",
                      required: false
                    },
                    {
                      name: "mencionar",
                      description: "¿Quires que Dori mencione algún rol?",
                      type: "ROLE",
                      required: false
                    }
                  ]
                },
                { // Anunciar
                  name: 'anunciar',
                  description: 'Permisos necesarios: Gestionar mensajes',
                  type: 'SUB_COMMAND',
                  options: [
                    {
                      name: 'título',
                      description: '¿Cuál va a ser el título del anuncio?',
                      type: 'STRING',
                      required: true
                    },
                    {
                      name: 'texto',
                      description: '¿Qué quieres anunciar?',
                      type: 'STRING',
                      required: true
                    },
                    {
                      name: 'canal',
                      description: '¿Dónde quieres emitir el anuncio?',
                      type: 'CHANNEL',
                      required: true,
                      channel_types: [0, 5, 6, 10, 11, 12]
                    },
                  ]
                },
                { // Set-Canal
                  name: "set-canal",
                  description: "Permisos necesarios: Administrador/a",
                  type: "SUB_COMMAND",
                  options: [
                    {
                      name: "acción",
                      description: "¿Qué se va a realizar en el canal?",
                      type: "STRING",
                      required: true,
                      choices: [
                        {
                          name: "Confesiones",
                          value: "confesion"
                        },
                        {
                          name: "No comandos",
                          value: "no_cmd"
                        },
                        {
                          name: "Sólo gifs",
                          value: "gifs"
                        },
                        {
                          name: "Sólo economía",
                          value: "econ"
                        },
                        {
                          name: "No notificaciones",
                          value: "no_notify"
                        },
                        {
                          name: "Notificaciones",
                          value: "notificaciones"
                        },
                      ]
                    },
                    {
                      name: "canal",
                      description: "¿Qué canal has escogido?",
                      type: "CHANNEL",
                      required: true,
                      channel_types: [0, 5, 6, 10, 11, 12]
                    }
                  ]
                },
                { // unset-Canal
                  name: "unset-canal",
                  description: "Permisos necesarios: Admninistrador/a",
                  type: "SUB_COMMAND",
                  options: [
                    {
                      name: "acción",
                      description: "¿Qué acción quieres deshabilitar?",
                      type: "STRING",
                      required: true,
                      choices: [
                        {
                          name: "Confesiones",
                          value: "confesion"
                        },
                        {
                          name: "No comandos",
                          value: "no_cmd"
                        },
                        {
                          name: "Sólo gifs",
                          value: "gifs"
                        },
                        {
                          name: "Sólo economía",
                          value: "econ"
                        },
                        {
                          name: "No notificaciones",
                          value: "no_notify"
                        },
                        {
                          name: "Notificaciones",
                          value: "notificaciones"
                        },
                      ]
                    }
                  ]
                },
                { // Verify-activar
                  name: 'verify-activar',
                  description: 'Permisos necesarios: Administrador/a',
                  type: 'SUB_COMMAND',
                  options: [
                    {
                      name: 'rol',
                      description: '¿Cuál es el rol de verificad@?',
                      type: 'ROLE',
                      required: true
                    },
                    {
                      name: 'nivel',
                      description: '¿Cuál quieres que sea el nivel de seguridad de tu servidor?',
                      type: 'STRING',
                      required: true,
                      choices: [
                        {
                          name: 'Sin seguridad',
                          value: 'NULA'
                        },
                        {
                          name: '4 dígitos (1234)',
                          value: 'BAJA'
                        },
                        {
                          name: '6 dígitos (1A2BC3)',
                          value: 'MEDIA'
                        },
                        {
                          name: '8 dígitos (1A2bc34D)',
                          value: 'ALTA'
                        },
                        {
                          name: '8 dígitos (#A2b$34D)',
                          value: 'EXTREMA'
                        },
                        {
                          name: '12 dígitos (1A2#c3?D1$2b)',
                          value: 'LOCURA'
                        },
                      ]
                    }
                  ]
                },
                { // Verify-desactivar
                  name: 'verify-desactivar',
                  description: 'Permisos necesarios: Administrador/a',
                  type: 'SUB_COMMAND',
                }
              ]
            },
            { // Comandos
              name: "comandos",
              description: "Gestiona los comandos del bot en tu servidor",
              type: "SUB_COMMAND_GROUP",
              options: [
                { // Habilitar
                  name: 'habilitar',
                  description: 'Permisos necesarios: Administrador/a',
                  type: 'SUB_COMMAND',
                  options: [
                    {
                      name: 'categoría',
                      description: '¿Qué categoría quieres habilitar?',
                      required: true,
                      type: 'STRING',
                      choices: [
                        {
                          name: '/econ',
                          value: 'econ'
                        },
                        {
                          name: '/gif',
                          value: 'gif'
                        },
                        {
                          name: '/bot',
                          value: 'bot'
                        },
                        {
                          name: '/miscelánico',
                          value: 'miscelánico'
                        },
                        {
                          name: '/servidor',
                          value: 'servidor'
                        },
                        {
                          name: '/usuario',
                          value: 'usuario'
                        }
                      ]
                    },
                  ]
                },
                { // Deshabilitar
                  name: 'deshabilitar',
                  description: 'Permisos necesarios: Administrador/a',
                  type: 'SUB_COMMAND',
                  options: [
                    {
                      name: "rol",
                      description: "¿Qué rol no podrá usar el comando? Puedes especificar @everyone",
                      required: true,
                      type: "ROLE"
                    },
                    {
                      name: 'módulo',
                      description: '¿Qué categoría quieres deshabilitar?',
                      required: true,
                      type: 'STRING',
                      choices: [
                        {
                          name: '/econ',
                          value: 'econ'
                        },
                        {
                          name: '/gif',
                          value: 'gif'
                        },
                        {
                          name: '/bot',
                          value: 'bot'
                        },
                        {
                          name: '/miscelánico',
                          value: 'miscelánico'
                        },
                        {
                          name: '/servidor',
                          value: 'servidor'
                        },
                        {
                          name: '/usuario',
                          value: 'usuario'
                        }
                      ]
                    }, /*
                    {
                      name: "comando",
                      description: "¿Deseas desactivar un comando en específico?",
                      type: "STRING",
                      required: false
                    } */
                  ]
                },
              ]
            },
            { // Usuarios
              name: "usuarios",
              description: "Gestiona los usuarios del servidor",
              type: "SUB_COMMAND_GROUP",
              options: [ 
                { // XP
                  name: "xp",
                  description: "Gestiona los puntos de experiencia",
                  type: "SUB_COMMAND",
                  options: [
                    {
                      name: "acción",
                      description: "¿Qué debo hacer?",
                      type: "STRING",
                      required: true,
                      choices: [
                        {
                          name: "Sumar",
                          value: "sumar"
                        },
                        {
                          name: "Establecer",
                          value: "establecer"
                        },
                        {
                          name: "Restar",
                          value: "restar"
                        },
                        {
                          name: "Multiplicar por...",
                          value: "multiplicar"
                        },
                        {
                          name: "Dividir entre...",
                          value: "dividir"
                        }
                      ]
                    },
                    {
                      name: "cantidad",
                      description: "¿Cuál es la cantidad?",
                      type: "INTEGER",
                      required: true,
                    },
                    {
                      name: "usuario",
                      description: "¿A quién debo aplicar estos cambios?",
                      type: "USER",
                      required: true
                    }
                  ]
                },
                { // Blacklist
                  name: "blacklist",
                  description: "Gestiona la lista negra de tu servidor",
                  type: "SUB_COMMAND",
                  options: [
                    {
                      name: "acción",
                      description: "¿Qué cambio quieres hacer en la lista negra?",
                      type: "STRING",
                      required: true,
                      choices: [
                        {
                          name: "Añadir usuario",
                          value: "añadir"
                        },
                        {
                          name: "Eliminar usuario",
                          value: "eliminar"
                        },
                        {
                          name: "Comprobar usuario",
                          value: "comprobar"
                        }
                      ]
                    },
                    {
                      name: "id",
                      description: "Introduce la ID del usuario a gestionar",
                      type: "STRING",
                      required: true
                    }
                  ]
                },
                { // Whitelist
                  name: "whitelist",
                  description: "Gestiona la lista blanca de tu servidor",
                  type: "SUB_COMMAND",
                  options: [
                    {
                      name: "acción",
                      description: "¿Qué cambio quieres hacer en la lista blanca?",
                      type: "STRING",
                      required: true,
                      choices: [
                        {
                          name: "Añadir usuario",
                          value: "añadir"
                        },
                        {
                          name: "Eliminar usuario",
                          value: "eliminar"
                        },
                        {
                          name: "Comprobar usuario",
                          value: "comprobar"
                        }
                      ]
                    },
                    {
                      name: "id",
                      description: "Introduce la ID del usuario a gestionar",
                      type: "STRING",
                      required: true
                    }
                  ]
                },
                { // Info
                  name: 'info',
                  description: 'Permisos necesarios: Gestionar mensajes',
                  type: 'SUB_COMMAND',
                  options: [
                    {
                      name: 'usuario',
                      description: '¿De quién deseas obtener los datos?',
                      type: 'USER',
                      required: true
                    }
                  ]
                },
                { // Advertencias
                  name: 'advertencias',
                  description: 'Permisos necesarios: Expulsar miembros',
                  type: 'SUB_COMMAND',
                  options: [
                    {
                      name: 'usuario',
                      description: 'Mencione un usuario',
                      type: 'USER',
                      required: true
                    }
                  ]
                },
                { // Advertir
                  name: 'advertir',
                  description: 'Permisos necesarios: Expulsar miembros',
                  type: 'SUB_COMMAND',
                  options: [
                    {
                      name: 'usuario',
                      description: '¿A quién deseas advertir?',
                      type: 'USER',
                      required: true
                    },
                    {
                      name: 'razón',
                      description: '¿Cuál es el motivo de su advertencia?',
                      type: 'STRING',
                      required: false
                    }
                  ]
                },
                {
                  name: "limpiar",
                  description: "Elimina las advertencias de un usuario",
                  type: "SUB_COMMAND",
                  options: [
                    {
                      name: "usuario",
                      description: "¿A quién quieres borrarle las advertencias?",
                      type: "USER",
                      required: true
                    }
                  ]
                },
                { // Banear
                  name: 'banear',
                  description: 'Permisos necesarios: Banear usuarios',
                  type: 'SUB_COMMAND',
                  options: [
                    {
                      name: 'usuario',
                      description: '¿A quién deseas banear?',
                      type: 'USER',
                      required: true,
                    }
                  ]
                },
                { // Expulsar
                  name: 'expulsar',
                  description: 'Permisos necesarios: Expulsar usuarios',
                  type: 'SUB_COMMAND',
                  options: [
                    {
                      name: 'usuario',
                      description: '¿A quién deseas expulsar?',
                      type: 'USER',
                      required: true,
                    },
                    {
                      name: 'razón',
                      description: '¿Cuál es el motivo de su expulsión?',
                      type: 'STRING',
                      required: false
                    }
                  ]
                },
                { // Dinero
                  name: "dinero",
                  description: "Gestiona el dinero de los usuarios del servidor",
                  type: "SUB_COMMAND",
                  options: [
                    { 
                      name: "acción",
                      description: "¿Qué quieres hacer con el dinero?",
                      type: "STRING",
                      required: true,
                      choices: [
                        {
                          name: "Sumar",
                          value: "sumar"
                        },
                        {
                          name: "Establecer",
                          value: "establecer"
                        },
                        {
                          name: "Restar",
                          value: "restar"
                        },
                        {
                          name: "Multiplicar por...",
                          value: "multiplicar"
                        },
                        {
                          name: "Dividir entre...",
                          value: "dividir"
                        }
                      ]
                    },
                    {
                      name: "cantidad",
                      description: "Especifique la cantidad",
                      type: "INTEGER",
                      required: true,
                      min_value: 0,
                      max_value: 999999
                    },
                    {
                      name: "usuario",
                      description: "¿A qué usuario deseas aplicarle los cambios?",
                      required: true,
                      type: "USER"
                    },
                    {
                      name: "lugar",
                      description: "¿Dónde deseas aplicar los cambios?",
                      type: "STRING",
                      required: true,
                      choices: [
                        {
                          name: "En su cartera",
                          value: "cartera"
                        },
                        {
                          name: "En su cuenta bancaria",
                          value: "banco"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            { // Borrar
              name: 'borrar',
              description: 'Permisos necesarios: Gestionar mensajes',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'cantidad',
                  description: 'Cantidad de mensajes que se quieren eliminar',
                  type: 'INTEGER',
                  required: true,
                }
              ]
            },
            { // Repite
              name: 'repite',
              description: 'Permisos necesarios: Gestionar mensajes',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'texto',
                  description: '¿Qué deseas que repita?',
                  type: 'STRING',
                  required: true,
                },
                {
                  name: 'canal',
                  description: '¿Dónde quieres que repita el mensaje?',
                  type: 'CHANNEL',
                  required: true,
                  channel_types: [0, 5, 6, 10, 11, 12]
                },
              ]
            },
          ]
        },
        { // Verificar
          name: 'verificar',
          description: 'Si el servidor tiene sistema de verificación, te otorgará el rol de verificado',
          options: [
            {
              name: 'clave',
              description: 'Una vez hayas usado el comando verificar introduce aquí la clave que se te enviará por DM',
              type: 'STRING',
              required: false
            }
          ]
        },
        { // Miscelánico
          name: 'miscelánico',
          description: 'Cositas varias que no sabemos dónde poner ¯\\_(ツ)_/¯',
          options: [
            { // 8ball
              name: "8ball",
              description: "Haz una pregunta y Dori, fuente de toda sabiduría de responderá",
              type: "SUB_COMMAND",
              options: [
                {
                  name: "pregunta",
                  description: "¿Qué quieres preguntarle al bot?",
                  type: "STRING",
                  required: true
                }
              ]
            },
            { // Aleatorio
              name: 'aleatorio',
              description: 'Escoge un número aleatorio entre dos números',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'mínimo',
                  description: 'Número más pequeño posible de obtener',
                  type: 'INTEGER',
                  required: true
                },
                {
                  name: 'máximo',
                  description: 'Número más grande posible de obtener',
                  type: 'INTEGER',
                  required: true
                }
              ]
            },
            { // Escoge
              name: 'escoge',
              description: 'Escoge entre dos opciones una aleatoria',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'opción1',
                  description: 'Primera opción',
                  type: 'STRING',
                  required: true
                },
                {
                  name: 'opción2',
                  description: 'Segunda opción',
                  type: 'STRING',
                  required: true
                },
                {
                  name: 'opción3',
                  description: 'Segunda opción',
                  type: 'STRING',
                  required: false
                },
                {
                  name: 'opción4',
                  description: 'Segunda opción',
                  type: 'STRING',
                  required: false
                },
                {
                  name: 'opción5',
                  description: 'Segunda opción',
                  type: 'STRING',
                  required: false
                },
              ]
            },
            { // Anime
              name: 'anime',
              description: 'Busca tu anime favorito con este comando',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'nombre',
                  description: 'Especifique el nombre del anime que quiere buscar',
                  type: 'STRING',
                  required: true
                }
              ]
            },
            { // Minecraft Servidor
              name: 'minecraft-servidor',
              description: 'Obtén la información de un servidor de minecraft',
              type: 'SUB_COMMAND',
              options:[
                {
                  name: 'ip',
                  description: 'Indica la IP del servidor',
                  type: 'STRING',
                  required: true
                }
              ]
            },
            { // Minecraft Skin
              name: 'minecraft-skin',
              description: 'Obtén la skin de minecraft de un usuario',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: 'Indica el nombre de usuario en minecraft',
                  type: 'STRING',
                  required: true
                }
              ]
            },
            { // Roblox Avatar
              name: 'roblox-avatar',
              description: 'Obtén el avatar de roblox de un usuario',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario',
                  description: 'Indica el nombre de usuario en roblox',
                  type: 'STRING',
                  required: true
                }
              ]
            },
            { // Color
              name: "color",
              type: "SUB_COMMAND_GROUP",
              description: "Obtén una vista previa de un color hex",
              options: [
                { // hex
                  name: "hex",
                  description: "Obtén colores hex",
                  type: "SUB_COMMAND",
                  options: [
                    {
                      name: "código",
                      description: "Introduce el código hex del color",
                      type: "STRING",
                      required: true
                    },
                    {
                      name: "visibilidad",
                      description: "¿Quién podrá ver el color?",
                      type: "STRING",
                      required: true,
                      choices: [
                        {
                          name: "Sólo yo",
                          value: "true",
                          focussed: true
                        },
                        {
                          name: "Todo el mundo",
                          value: "false"
                        }
                      ]
                    }
                  ]
                },
                { // rgb
                  name: "rgb",
                  description: "Obtén colores rgb",
                  type: "SUB_COMMAND",
                  options: [
                    {
                      name: "rojo",
                      description: "Introduce el código rgb del color",
                      type: "INTEGER",
                      required: true
                    },
                    {
                      name: "verde",
                      description: "Introduce el código rgb del color",
                      type: "INTEGER",
                      required: true
                    },
                    {
                      name: "azul",
                      description: "Introduce el código rgb del color",
                      type: "INTEGER",
                      required: true
                    },
                    {
                      name: "visibilidad",
                      description: "¿Quién podrá ver el color?",
                      type: "STRING",
                      required: true,
                      choices: [
                        {
                          name: "Sólo yo",
                          value: "true",
                          focussed: true
                        },
                        {
                          name: "Todo el mundo",
                          value: "false"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            { // Amor
              name: 'amor',
              description: '¿Quieres hacer un shipeo?  7w7',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'usuario1',
                  description: 'Primera persona del ship',
                  type: 'USER',
                  required: true
                },
                {
                  name: 'usuario2',
                  description: 'Segunda persona del ship',
                  type: 'USER',
                  required: true
                },
              ]
            },
          ]
        },
        { // Ayuda
          name: 'ayuda',
          description: '¿Necesitas una lista completa de los comandos?',
          options: [
            {
              name: 'módulo',
              description: 'Si quieres, obtén los comandos de un módulo específico',
              required: false,
              type: 'STRING',
              choices: [
                {
                  name: "/bot",
                  value: "bot"
                },
                {
                  name: '/econ',
                  value: 'econ'
                },
                {
                  name: '/error',
                  value: 'error'
                },
                {
                  name: '/gif',
                  value: 'gif'
                },
                {
                  name: '/miscelánico',
                  value: 'miscelánico'
                },
                {
                  name: '/servidor',
                  value: 'servidor'
                },
                {
                  name: '/staff',
                  value: 'staff'
                },
                {
                  name: "/usuario",
                  value: "usuario"
                },
                {
                  name: "/xp",
                  value: "xp"
                }
              ]
            }
          ]
        },
        { // Usuario
          name: "usuario",
          description: "Obtén, gestiona y modifica tus datos de usuario",
          options: [
            { // notificaciones
              name: "notificaciones",
              description: "Gestiona tus notificaciones y preferencias referentes a ellas",
              type: "SUB_COMMAND_GROUP",
              options: [
                { // Ajustes
                  name: "ajustes",
                  description: "Cambia los ajustes del sistema de notificaciones a tu gusto",
                  type: "SUB_COMMAND",
                  options: [
                    {
                      name: "enviar",
                      description: "¿A dónde se deben enviar las notificaciones?",
                      type: "STRING",
                      required: true,
                      choices: [
                        {
                          name: "al servidor en el que esté hablando",
                          value: "S"
                        },
                        {
                          name: "por privado",
                          value: "P"
                        },
                        {
                          name: "a través del panel de notificaciones de Dori",
                          value: "N"
                        },
                      ]
                    }
                  ]
                },
                { // Ver
                  name: "ver",
                  description: "Accede a tus notificaciones de Dori más recientes",
                  type: "SUB_COMMAND"
                }
              ]
            },
            { // Notas
              name: "notas",
              description: "Gestiona tus notas",
              type: "SUB_COMMAND_GROUP",
              options: [
                { // Lista
                  name: "lista",
                  description: "Obtén una lista de tus notas",
                  type: "SUB_COMMAND"
                },
                { // Escribir
                  name: "escribir",
                  description: "Escribe una nueva nota",
                  type: "SUB_COMMAND",
                  options: [
                    {
                      name: "texto",
                      description: "Especifica el texto que quieres guardar en tu nota",
                      type: "STRING",
                      required: true
                    },
                    {
                      name: "acceso",
                      description: "Especifica quién tendrá acceso a la nota",
                      type: "STRING",
                      required: true,
                      choices: [
                        {
                          name: "Todo el mundo",
                          value: "pública"
                        },
                        {
                          name: "Sólo este servidor",
                          value: "oculta",
                          focussed: true
                        },
                        {
                          name: "Sólo yo",
                          value: "privada"
                        }
                      ]
                    }
                  ]
                },
                { // Leer
                  name: "leer",
                  description: "Muestra una nota",
                  type: "SUB_COMMAND",
                  options: [
                    {
                      name: "código",
                      description: "Especifica el código de acceso a la nota",
                      type: "STRING",
                      required: true
                    },
                    {
                      name: "visibilidad",
                      description: "¿Quién podrá ver la nota?",
                      type: "STRING",
                      required: true,
                      choices: [
                        {
                          name: "Sólo yo",
                          value: "priv",
                          focussed: true
                        },
                        {
                          name: "Todo el mundo",
                          value: "pub"
                        }
                      ]
                    }
                  ]
                },
                { // Eliminar
                  name: "eliminar",
                  description: "Elimina una nota de la base de datos",
                  type: "SUB_COMMAND",
                  options: [
                    {
                      name: "código",
                      description: "Código de la nota a eliminar",
                      type: "STRING",
                      required: true
                    }
                  ]
                }
              ]
            },
            { // Confesión
              name: "confesión",
              description: "Confiesa algo que te haya pasado de forma 100% anónima, ni Dori guarda datos",
              type: "SUB_COMMAND",
              options: [
                {
                  name: "texto",
                  description: "¿Cuál es la confesión?",
                  type: "STRING",
                  required: true
                },
                {
                  name: "género",
                  description: "¿Con que género te identificas?",
                  type: "STRING",
                  required: true,
                  choices: [
                    {
                      name: "Quiero ser anónim@",
                      value: "una persona",
                      focussed: true
                    },
                    {
                      name: "Hombre",
                      value: "un hombre"
                    },
                    {
                      name: "Mujer",
                      value: "una mujer"
                    }
                  ]
                },
                {
                  name: "edad",
                  description: "¿Cuántos años tienes?",
                  type: "INTEGER",
                  required: false
                }
              ]
            }
          ]
        },
        { // Servidor
          name: 'servidor',
          description: '¿Necesitas ver algún dato del servidor?',
          options: [
            { // Yo
              name: 'yo',
              description: 'Obtén tu información en el servidor',
              type: 'SUB_COMMAND',
            },
            { // Info
              name: "info",
              description: "Obtén la información del servidor",
              type: "SUB_COMMAND"
            }
          ]
        },
        { // XP
          name: "xp",
          description: "Obtén la información de tus puntos XP",
          options: [
            { // Ver
              name: "ver",
              description: "Obtén el nivel de XP que posee un usuario",
              type: "SUB_COMMAND",
              options: [
                {
                  name: "usuario",
                  description: "¿De quién quieres obtener el dato?",
                  type: "USER"
                }
              ]
            },
            { // Ranking
              name: "ranking",
              description: "Obtén el ranking del servidor",
              type: "SUB_COMMAND",
            },
            { // Reiniciar
              name: "reiniciar",
              description: "Reinicia tus puntos de experiencia",
              type: "SUB_COMMAND"
            }
          ]
        }
        ]
          try {
            message.delete()
            var embed = new Discord.MessageEmbed()
              .setDescription('Los slash commands han sido recargados')
              .setColor(0x5865f2)
            try {
              await client.application?.commands.set(data).catch((e)=>{
                embed = new Discord.MessageEmbed()
                .setDescription("No ha sido posible recargar los comandos")
                .setColor(0xed4245)
                .addField(`ERROR:`, `${e}`)
              })
            } catch (e) { 
              embed = new Discord.MessageEmbed()
                .setDescription("No ha sido posible recargar los comandos")
                .setColor(0xed4245)
                .addField(`ERROR:`, `${e}`)
            }
            message.channel.send({embeds: [embed]})
          } catch (e){
            require("./modulos_error/start").interact(client, message, "109", "no",  e, "reply")
          }
        } else if (message.channel.id === '876928261333061662') {
        message.delete()
        var embed = new Discord.MessageEmbed()
          .setDescription(`**Error 41**\nSólo el duño del bot puede usar este canal.`)
          .setFooter('Para ver la definición concreta del error, use el comando /error')
          .setColor(0xed4245)
        message.channel.send({embeds: [embed]}).then(m=>{
          try{ setTimeout(()=>{m.delete(), 5000}) } catch { return }
        })
      }
    }
  }
}