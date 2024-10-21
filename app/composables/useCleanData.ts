import { isEmpty } from '@vueuse/core'

export function useCleanData() {
  const cleanData = (data) => {
    if (Array.isArray(data)) return data.filter(item => !isEmpty(item))
    else if (typeof data === 'object' && data !== null) {
      Object.keys(data).forEach(key => {
        if (isEmpty(data[key])) delete data[key]
      });
      return data;
    }
    return data;
  }

  return { cleanData }
}
