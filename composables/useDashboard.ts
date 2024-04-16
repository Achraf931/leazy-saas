import { createSharedComposable } from '@vueuse/core'

const _useDashboard = () => {
    const route = useRoute()
    const router = useRouter()
    const isHelpSlideoverOpen = ref(false)
    const isNotificationsSlideoverOpen = ref(false)
    const isDrawerSlideoverMode = ref(false)
    const isDrawerSlideoverOpen = ref(false)

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

    const handleDrawerMode = () => {
        isDrawerSlideoverMode.value = !isDrawerSlideoverMode.value
        isDrawerSlideoverOpen.value = false
    }

    // @ts-ignore
    const handleDrawer = () => {
        if (isDrawerSlideoverMode.value && isDrawerSlideoverOpen.value) isDrawerSlideoverOpen.value = false
    }

    const openDrawer = () => {
        if (isDrawerSlideoverMode.value && !isDrawerSlideoverOpen.value) isDrawerSlideoverOpen.value = true
    }

    watch(() => route.fullPath, () => {
        isHelpSlideoverOpen.value = false
        isNotificationsSlideoverOpen.value = false
    })

    return {
        isHelpSlideoverOpen,
        isNotificationsSlideoverOpen,
        isDrawerSlideoverMode,
        isDrawerSlideoverOpen,
        openDrawer,
        handleDrawerMode,
        handleDrawer
    }
}

export const useDashboard = createSharedComposable(_useDashboard)
