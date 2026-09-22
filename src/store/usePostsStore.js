import { create } from 'zustand'

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

export const usePostsStore = create((set, get) => ({
  posts: [],
  status: 'idle',
  error: '',
  search: '',
  fetchPosts: async () => {
    if (get().status === 'loading') return

    set({ status: 'loading', error: '' })

    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Error loading.')

      const posts = await response.json()
      set({ posts, status: 'success' })
    } catch (error) {
      set({
        status: 'error',
        error: error instanceof Error ? error.message : 'An unexpected error occurred.',
      })
    }
  },
  addPost: async ({ title, body }) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId: 1 }),
    })

    if (!response.ok) throw new Error('The new post was not saved.')

    const post = await response.json()
    set((state) => ({ posts: [{ ...post, isLocal: true }, ...state.posts] }))
  },
  setSearch: (search) => set({ search }),
}))