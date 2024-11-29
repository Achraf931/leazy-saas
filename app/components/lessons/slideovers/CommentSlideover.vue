<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

defineProps<{
  overlay: boolean
}>()

const { comments } = useCommentSlideover()

const { user } = useSanctumAuth()
const emit = defineEmits(['comment:added', 'comment:deleted', 'comment:updated', 'comment:replied'])

const items = ref([
  [
    { id: 'edit', label: 'Modifier', icon: 'i-heroicons-pencil-20-solid' },
    { id: 'remove', label: 'Supprimer', icon: 'i-heroicons-trash-20-solid' },
  ]
])

const newReplies = ref<Record<string, string>>({})

const handleComment = (comment: any) => {
  const updatedComment = {
    ...comment,
    author: {
      id: user.value.id,
      name: `${user.value.firstname} ${user.value.lastname}`
    }
  }
  
  emit('comment:updated', updatedComment)
}

const handleDeleteComment = (comment_id) => {
  emit('comment:deleted', comment_id)
}

const handleReply = (comment) => {
  const replyContent = newReplies.value[comment.id]
  if (!replyContent) return
  
  const reply = {
    id: `${comment.id}-reply-${Date.now()}`,
    content: replyContent,
    author: {
      id: user.value.id,
      name: `${user.value.firstname} ${user.value.lastname}`
    },
    createdAt: new Date(),
  }
  
  emit('comment:replied', { comment, reply })
  newReplies.value[comment.id] = ''
}

const activeEditMode = (comment: any) => {
  comment.originalContent = comment.content
  comment.edit_mode = true
}

const handleCancelEdit = (comment: any) => {
  console.log('comment', comment)
  if (!comment.validated) {
    console.log('delete comment', comment)
    handleDeleteComment(comment.id)
  }
  else {
    console.log('cancel edit', comment)
    comment.content = comment.originalContent
    comment.edit_mode = false
  }
}
</script>

<template>
  <UDashboardSlideover title="Commentaires & suggestions" :ui="{ wrapper: 'top-[--header-height] h-[calc(100vh-var(--header-height))] ', header: { base: 'border-l border-gray-200 dark:border-gray-800' }, body: { base: 'border-l border-gray-200 dark:border-gray-800' }, footer: { base: 'border-l border-gray-200 dark:border-gray-800' } }" :overlay>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="bg-gray-50 dark:bg-gray-800/75 border border-gray-200 dark:border-gray-700 p-2 rounded-lg space-y-2 hover:border-primary dark:hover:border-primary"
    >
      <template v-if="comment.validated">
        <div class="flex items-center justify-between gap-2">
          <UButton v-if="!comment.resolved" label="Résoudre" leading-icon="i-lucide-circle-check" size="2xs" variant="ghost" color="gray" @click="handleComment({ ...comment, resolved: true })" />
          <UBadge v-else label="Résolu" size="xs" variant="soft" color="green" />
          
          <UDropdown :items="items" :popper="{ placement: 'bottom-start' }" :ui="{ width: 'w-max', item: { disabled: 'cursor-text select-text' } }">
            <UButton color="gray" variant="ghost" size="xs" trailing-icon="i-heroicons-ellipsis-horizontal-20-solid" />
            
            <template #item="{ item }">
              <div class="flex items-center gap-2" @click="() => item.id === 'remove' ? handleDeleteComment(comment.id) : activeEditMode(comment)">
                <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span class="text-xs truncate">{{ item.label }}</span>
              </div>
            </template>
          </UDropdown>
        </div>
        
        <UDivider />
      </template>
      
      <div class="flex items-center gap-2">
        <p class="text-xs font-semibold">{{ comment.author.name }}</p>
        <span class="text-xs text-gray-500">{{ formatDistanceToNow(new Date(comment.createdAt), { locale: frLocale, addSuffix: true }) }}</span>
      </div>
      
      <p v-if="comment.target" class="border-l-2 border-primary pl-2 text-xs text-gray-400">{{ comment.target }}</p>
      <UTextarea v-if="!comment.validated || comment.edit_mode" v-model="comment.content" :id="comment.id" autofocus class="text-xs" />
      <p v-else class="text-sm">{{ comment.content }}</p>
      
      <div v-if="!comment.validated || (comment.validated && comment.edit_mode)" class="grid grid-cols-2 gap-2 pt-2">
        <UButton @click="handleCancelEdit(comment)" label="Annuler" size="2xs" variant="ghost" color="red" block />
        <UButton @click="handleComment({ ...comment, validated: true, edit_mode: false })" :disabled="!comment.content || comment.content.trim() === ''" label="Enregistrer" size="2xs" block />
      </div>
      
      <div v-if="comment.replies.length" class="mt-2 space-y-1 pl-4">
        <div v-for="reply in comment.replies" :key="reply.id" class="text-sm text-gray-600 dark:text-gray-300">
          <div class="flex items-center gap-2">
            <p class="text-xs font-semibold">{{ reply.author.name }}</p>
            <span class="text-xs text-gray-500">{{ formatDistanceToNow(new Date(reply.createdAt), { locale: frLocale, addSuffix: true }) }}</span>
          </div>
          <p class="text-xs">{{ reply.content }}</p>
        </div>
      </div>
      
      <div v-if="comment.validated" class="group flex flex-col items-start gap-2">
        <UTextarea v-model="newReplies[comment.id]" maxrows="3" rows="1" class="w-full" placeholder="Répondre..." size="xs" autoresize />
        <UButton @click="handleReply(comment)" label="Envoyer" class="hidden group-focus-within:flex" size="2xs" />
      </div>
    </div>
  </UDashboardSlideover>
</template>
