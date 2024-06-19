/*
import OpenAI from 'openai'
import { OpenAIStream } from 'ai'

const config = useRuntimeConfig()

const openai = new OpenAI({
  apiKey: process.env.openaiApiKey || config.openaiApiKey
})

export const getChatStream = async ({ messages, temperature }) => {
  const response = await openai.chat.completions.create(
    {
      max_tokens: 2048,
      model: 'gpt-3.5-turbo',
      temperature,
      messages,
      stream: true
    }
  )
  return OpenAIStream(response)
}
*/
