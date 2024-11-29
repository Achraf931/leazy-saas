export const useApi = (endpoint: string) => {
    const toast = useToast()
    const client = useSanctumClient()
    const baseURL = '/api/teacher'
    const localePath = useLocalePath()

    // GET Request
    const get = async (id?: string | number, query?: Record<string, any>, custom_endpoint?: string) => {
        try {
            if (id) return await client(`${baseURL}/${custom_endpoint ?? endpoint}/${id}`)
            return await client(`${baseURL}/${custom_endpoint ?? endpoint}`, { query })
        } catch (err) {
            if (id) toast.add({ icon: 'i-heroicons-x-circle', title: 'Page introuvable', color: 'red', timeout: 2000, callback: () => useRouter().push(localePath({ name: `library-${endpoint}` }))})
            else toast.add({ icon: 'i-heroicons-x-circle', title: 'Erreur de chargement', description: 'Veuillez réessayer plus tard', color: 'red' })
        }
    };

    // POST Request
    const post = async (body: any, custom_endpoint?: string) => {
        try {
            return await client(`${baseURL}/${custom_endpoint ?? endpoint}`, { method: 'POST', body })
        } catch (err) {
            toast.add({ icon: 'i-heroicons-x-circle', title: 'Erreur de chargement', description: 'Veuillez réessayer plus tard', color: 'red' })
        }
    };

    // PUT Request
    const put = async (lesson: object, custom_endpoint?: string) => {
        try {
            return await client(`${baseURL}/${custom_endpoint ?? endpoint}/${lesson.id}`, { method: 'PUT', body: lesson })
        } catch (err) {
            toast.add({ icon: 'i-heroicons-x-circle', title: 'Erreur de chargement', description: 'Veuillez réessayer plus tard', color: 'red' })
        }
    };

    // PATCH Request
    const patch = async (lesson: object, custom_endpoint?: string) => {
        console.log(lesson)
        try {
            return await client(`${baseURL}/${custom_endpoint ?? endpoint}/${lesson.id}`, { method: 'PATCH', body: lesson })
        } catch (err) {
            toast.add({ icon: 'i-heroicons-x-circle', title: 'Erreur de chargement', description: 'Veuillez réessayer plus tard', color: 'red' })
        }
    }

    // DELETE Request
    const del = async (id: number, custom_endpoint?: string) => {
        try {
            return await client(`${baseURL}/${custom_endpoint ?? endpoint}/${id}`, { method: 'DELETE' })
        } catch (err) {
            toast.add({ icon: 'i-heroicons-x-circle', title: 'Erreur de chargement', description: 'Veuillez réessayer plus tard', color: 'red' })
        }
    };

    return {
        get,
        post,
        put,
        patch,
        del
    }
}