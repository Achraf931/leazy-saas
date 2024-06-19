/*
import { getChatStream } from '@/server/utils/ai'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { prompt } = JSON.parse(JSON.stringify(body))

  const stream = await getChatStream({
    messages: [
      {
        role: 'system',
        content:
          'Tu es un assistant AI chargé d\'extraire des entités nommées d\'un texte donné. ' +
          'Ne renvoie que des entités correspondant à des noms de personnes, des entreprises, des lieux, des produits ou des organisations bien connus. ' +
          'Ne renvoie pas de noms de fichiers, de fonctions, de classes, ou tout autre élément technique. ' +
          'Assure-toi que les entités renvoyées peuvent avoir une page Wikipédia associée. ' +
          'Le format de la réponse doit être un tableau simple en JavaScript, comme ceci : ["Steve Jobs", "Apple", "San Francisco"].' +
          'Ne renvoie rien d\'autre que ce qui correspond à ces critères.'
      },
      {
        role: 'user',
        content: `Voici le texte à analyser : ${prompt}. Extrait les entités nommées selon les critères ci-dessus et renvoie-les sous forme de tableau simple.`
      }
    ],
    temperature: 0.2
  })

  return sendStream(event, stream)
})
*/
