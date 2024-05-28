export const useLessonsStore = defineStore('lessons', () => {
  const client = useSanctumClient()
  const lessons = ref({})
  const isLessonEdited = ref(false)
  const pending = ref(false)
  const error = ref<Error | null>(null)

  const refresh = async (page = 1) => {
    try {
      lessons.value = await client('/api/teacher/lessons', { method: 'GET', query: { page } })
      isLessonEdited.value = false
      pending.value = false
    } catch (e) {
      error.value = e
    }
  }

  const fetchLessons = async () => {
    pending.value = true
    error.value = null

    if (!isLessonEdited.value && lessons.value?.data?.length) return pending.value = false

    await refresh()
  }

  const fetchLesson = async (id) => {
    pending.value = true
    error.value = null

    try {
      return await client(`/api/teacher/lessons/${id}`)
    } catch (e) {
      error.value = e
    }
  }

  const addLesson = async (lesson) => {
    error.value = null

    try {
      const response = await client('/api/teacher/lessons', { method: 'POST', body: lesson })
      await refresh()
      return response
    } catch (e) {
      error.value = e
    }
  }

  const updateLesson = async (lesson) => {
    error.value = null

    try {
      const response = await client(`/api/teacher/lessons/${lesson.id}`, { method: 'PATCH', body: lesson })
      isLessonEdited.value = true
      return response
    } catch (e) {
      error.value = e
    }
  }

  const reset = (localStorage) => {
    lessons.value = {}
    isLessonEdited.value = false
    pending.value = false
    error.value = null
    localStorage.removeItem('lessons')
  }

  return {
    lessons,
    pending,
    error,
    reset,
    fetchLessons,
    refresh,
    addLesson,
    fetchLesson,
    updateLesson
  }
}, { persist: { storage: persistedState.localStorage } })

export const useThemesStore = defineStore('themes', () => {
  const client = useSanctumClient()
  const themes = ref({})
  const pending = ref(false)
  const error = ref<Error | null>(null)

  const refresh = async (page = 1) => {
    try {
      themes.value = await client('/api/teacher/themes', { method: 'GET', query: { page } })
      pending.value = false
    } catch (e) {
      error.value = e
    }
  }

  const fetchThemes = async () => {
    pending.value = true
    error.value = null

    if (themes.value?.data?.length) return pending.value = false

    await refresh()
  }

  const addTheme = async (theme) => {
    error.value = null

    try {
      const response = await client('/api/teacher/themes', { method: 'POST', body: theme })
      await refresh()
      return response
    } catch (e) {
      error.value = e
    }
  }

  const reset = (localStorage) => {
    themes.value = {}
    pending.value = false
    error.value = null
    localStorage.removeItem('themes')
  }

  return {
    themes,
    pending,
    error,
    reset,
    fetchThemes,
    refresh,
    addTheme
  }
}, { persist: { storage: persistedState.localStorage } })

export const useChaptersStore = defineStore('chapters', () => {
  const client = useSanctumClient()
  const chapters = ref({})
  const pending = ref(false)
  const error = ref<Error | null>(null)

  const refresh = async (page = 1) => {
    try {
      chapters.value = await client('/api/teacher/chapters-paginate', { method: 'GET', query: { page } })
      pending.value = false
    } catch (e) {
      error.value = e
    }
  }

  const fetchChapters = async () => {
    pending.value = true
    error.value = null

    if (chapters.value?.data?.length) return pending.value = false

    await refresh()
  }

  const fetchChapter = async (id) => {
    pending.value = true
    error.value = null

    try {
      return await client(`/api/teacher/chapters/${id}`)
    } catch (e) {
      error.value = e
    }
  }

  const addChapter = async (chapter) => {
    error.value = null

    try {
      const response = await client('/api/teacher/chapters', { method: 'POST', body: chapter })
      await refresh()
      return response
    } catch (e) {
      error.value = e
    }
  }

  const reset = (localStorage) => {
    chapters.value = {}
    pending.value = false
    error.value = null
    localStorage.removeItem('chapters')
  }

  return {
    chapters,
    pending,
    error,
    reset,
    fetchChapters,
    refresh,
    addChapter,
    fetchChapter
  }
}, { persist: { storage: persistedState.localStorage } })

export const resetStores = (localStorage) => {
  useLessonsStore().reset(localStorage)
  useThemesStore().reset(localStorage)
  useChaptersStore().reset(localStorage)
}
