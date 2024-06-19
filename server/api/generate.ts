/*
import { getChatStream } from '@/server/utils/ai'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { prompt } = JSON.parse(JSON.stringify(body))

    // @ts-ignore
    const stream = await getChatStream({
        messages: [
            {
                role: 'system',
                content:
                    'You are an AI writing assistant for teachers that continues existing text based on context from prior text. ' +
                    'Give more weight/priority to the later characters than the beginning ones. ' +
                    'Limit your response to no more than 200 characters, but make sure to construct complete sentences.'
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        temperature: 0.5
    })
    return sendStream(event, stream)
})
*/
