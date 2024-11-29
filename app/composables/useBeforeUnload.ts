const useSaveOnLeave = (callback: () => Promise<void>) => {
  const router = useRouter()

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault()
    event.returnValue = ''
    return callback()
  }

  const navigationGuard = async (_to: any, _from: any, next: any) => {
    try {
      await callback()
      next()
    } catch (error) {
      next(false)
    }
  }

  onMounted(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)
    router.beforeResolve(navigationGuard)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
  })
}

export default useSaveOnLeave
