import { createSharedComposable } from '@vueuse/core'
import { CommentSlideover } from '#components'

const _useCommentSlideover = () => {
  const slideover = useSlideover()
  const comments = reactive([])

  const mergeComments = (existing, newComments) => {
    const commentMap = new Map(existing.map(comment => [comment.id, comment]))
    newComments.forEach(comment => commentMap.set(comment.id, comment))
    return Array.from(commentMap.values())
  }

  const syncComments = (updatedComments) => {
    Object.assign(comments, mergeComments(comments, updatedComments))
  }

  const addComment = (comment) => {
    console.log('create')
    comments.push(comment)
  }

  const deleteComment = (comment_id) => {
    const index = comments.findIndex(c => c.id === comment_id)
    if (index !== -1) {
      comments.splice(index, 1)
    }
  }

  const updateComment = (updatedComment) => {
    console.log('update')
    const index = comments.findIndex(c => c.id === updatedComment.id)
    if (index !== -1) {
      comments[index] = updatedComment
    }
  }

  const replyToComment = (comment_id, reply) => {
    console.log('Réponse ajoutée :', reply)

    const index = comments.findIndex(c => c.id === comment_id)
    if (index !== -1) {
      comments[index].replies.push(reply)
    }
  }

  const openCommentSlideover = ({ onAdded = null, onDeleted = null, onUpdated = null, onReplied = null, ...options }) => {
    slideover.open(CommentSlideover, {
      overlay: false,
      'onComment:added': (comment) => {
        addComment(comment)
        onAdded?.(comment)
      },
      'onComment:deleted': (comment_id) => {
        deleteComment(comment_id)
        onDeleted?.(comment_id)
      },
      'onComment:updated': (comment) => {
        updateComment(comment)
        onUpdated?.(comment)
      },
      'onComment:replied': ({ comment, reply }) => {
        replyToComment(comment.id, reply)
        onReplied?.(comment, reply)
      },
      ...options
    })
  }

  const closeCommentSlideover = () => {
    slideover.close()
  }

  return {
    comments,
    syncComments,
    addComment,
    deleteComment,
    updateComment,
    replyToComment,
    openCommentSlideover,
    closeCommentSlideover
  }
}

export const useCommentSlideover = createSharedComposable(_useCommentSlideover)
