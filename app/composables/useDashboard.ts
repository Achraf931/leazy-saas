import { createSharedComposable } from '@vueuse/core'

const _useDashboard = () => {
    const route = useRoute()
    const router = useRouter()
    const isHelpSlideoverOpen = ref(false)
    const isNotificationsSlideoverOpen = ref(false)
    const isDrawerSlideoverMode = ref(false)
    const isDrawerSlideoverOpen = ref(false)
    const breadcrumbs = ref([])

    defineShortcuts({
        'g-h': () => router.push('/'),
        'g-i': () => router.push('/inbox'),
        'g-u': () => router.push('/users'),
        'g-s': () => router.push('/settings'),
        'g-l': () => router.push('/lessons'),
        'g-m': () => router.push('/media'),
        'g-b': () => router.push('/landing'),
        '?': () => isHelpSlideoverOpen.value = true,
        n: () => isNotificationsSlideoverOpen.value = true
    })

    const setBreadcrumbs = (newBreadcrumbs) => {
        breadcrumbs.value = newBreadcrumbs
    }

    const handleDrawerMode = () => {
        isDrawerSlideoverMode.value = !isDrawerSlideoverMode.value
    }

    const handleDrawer = () => {
        isDrawerSlideoverOpen.value = !isDrawerSlideoverOpen.value
    }

    watch(() => route.fullPath, () => {
        isHelpSlideoverOpen.value = false
        isNotificationsSlideoverOpen.value = false
    })



    return {
        breadcrumbs,
        isHelpSlideoverOpen,
        isNotificationsSlideoverOpen,
        isDrawerSlideoverMode,
        isDrawerSlideoverOpen,
        handleDrawerMode,
        handleDrawer,
        setBreadcrumbs
    }
}

export const useDashboard = createSharedComposable(_useDashboard)
