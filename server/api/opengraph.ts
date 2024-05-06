export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const response = await fetch(body.url)

        if (!response.ok) return new Error(`Error fetching URL. Status: ${response.status}`)

        const htmlContent = await response.text()
        const metadata = {}

        // Extraction des balises Open Graph
        const ogTagRegex = /property="og:([^"]+)"\s+content="([^"]*)"/gi
        let matchResult

        while ((matchResult = ogTagRegex.exec(htmlContent)) !== null) {
            const key = matchResult[1].trim()
            // @ts-ignore
            metadata[key] = decodeHtmlEntities(matchResult[2].trim())
        }

        // Extraction du titre du site
        const titleTagRegex = /<title>([^<]*)<\/title>/gi
        const titleMatch = titleTagRegex.exec(htmlContent)
        // @ts-ignore
        metadata['site_title'] = titleMatch ? decodeHtmlEntities(titleMatch[1].trim()) : ''

        // Extraction de la description du site
        const descriptionTagRegex = /<meta\s+name="description"\s+content="([^"]*)"/gi
        const descriptionMatch = descriptionTagRegex.exec(htmlContent)
        // @ts-ignore
        metadata['site_description'] = descriptionMatch ? decodeHtmlEntities(descriptionMatch[1].trim()) : ''

        return metadata
    } catch (error: any) {
        return { error: error.message || 'An error occurred.' }
    }
})

// Fonction utilitaire pour décoder les entités HTML courantes
function decodeHtmlEntities(text: string) {
    return text
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/';/g, "'");
}
