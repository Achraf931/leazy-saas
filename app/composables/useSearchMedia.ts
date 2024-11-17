export default ((params: null | undefined = null) => {
  const page = ref(1)
  const perPage = ref(10)
  const results = ref([])
  const total = ref(0)
  const loading = ref(false)
  const error = ref(null)

  const fetchResults = async (query: string, provider: string) => {
    loading.value = true
    try {
      let response: Response
      switch (provider) {
        case 'unsplash':
          response = await fetch(
            `https://api.unsplash.com/search/photos?lang=fr&query=${query}&page=${page.value}&per_page=${perPage.value}`,
            {
              headers: {
                Authorization: `Client-ID LaM-gWUV5DCcsNJugz2Ne0kwaV6OnOAjr879lqPjvcg`,
              },
            }
          )
          const unsplashData = await response.json()
          results.value = unsplashData.results || []
          total.value = unsplashData.total
          break
        case 'pexels':
          response = await fetch(
            `https://api.pexels.com/v1/search?locale=fr-FR&query=${query}&per_page=${perPage.value}`,
            {
              headers: {
                Authorization: `LIa1K3Kh8xNT1GfDSB54Sya5h6ZTl21o6yDh2nY1gwBWaCz9irQNwJ2N`,
              },
            }
          )
          const pexelsData = await response.json()
          results.value = pexelsData.photos || []
          total.value = pexelsData.total_results
          break
        case 'pixabay':
          response = await fetch(
            `https://pixabay.com/api/?key=2778993-0d12bdd6df9eb23263eb4e60c&lang=fr&q=${query}&per_page=${perPage.value}&page=${page.value}`
          )
          const pixabayData = await response.json()
          results.value = pixabayData.hits || []
          total.value = pixabayData.total
          break
        case 'giphy':
          response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=XZCb6YM0i35nWuplG5lY6VrrKmmHPHlg&q=${query}&limit=${perPage.value}&offset=${page.value}`
          )
          const giphyData = await response.json()
          results.value = giphyData.data || []
          total.value = giphyData.pagination.total_count
          break
        default:
          throw new Error(`Invalid media provider: ${provider}`)
      }
    } catch (e) {
      error.value = e
    }
    loading.value = false
  }

  const getImageSource = (item: any, provider: string) => {
    switch (provider) {
      case 'unsplash':
        return {
          preview: item?.urls?.thumb,
          src: item?.urls?.full,
          label: item?.alt_description,
          author: { url: item?.user?.links?.html, name: item?.user?.name },
        }
      case 'pexels':
        return {
          preview: item?.src?.tiny,
          src: item?.src?.original,
          label: item?.alt,
          author: { url: item?.photographer_url, name: item?.photographer },
        }
      case 'pixabay':
        return {
          preview: item?.previewURL,
          src: item?.largeImageURL,
          label: item?.tags,
          author: { url: item?.pageURL, name: item?.user },
        }
      case 'giphy':
        return {
          preview: item?.images?.preview_gif?.url,
          src: item?.images?.original?.url,
          label: item?.title,
          author: { url: item?.user?.profile_url, name: item?.user?.username },
        }
    }
  }

  return {
    page,
    perPage,
    results,
    total,
    loading,
    error,
    fetchResults,
    getImageSource
  }
})
