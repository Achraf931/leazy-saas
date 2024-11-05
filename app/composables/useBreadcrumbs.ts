export const useBreadcrumbs = () => {
    const route = useRoute()
    const localePath = useLocalePath()

    const breadcrumbs = computed(() => {
        return (route.meta.breadcrumb || []).map((breadcrumb: { to: any; label: string }) => ({
            to: localePath(breadcrumb.to),
            label: breadcrumb.label
        }))
    })

    return {
        breadcrumbs
    }
}