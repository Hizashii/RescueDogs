<template>
  <div class="p-6 bg-[#F8F6ED] min-h-screen">
    <h1 class="text-3xl font-bold text-[#3D4836] mb-4">Blog Management</h1>
    <div class="mb-6 flex justify-between items-center">
      <button @click="activeView = 'list'; selectedPost = null" class="px-4 py-2 bg-[#3D6625] text-white hover:bg-[#213D12]" :class="{ 'bg-[#3D6625]': activeView === 'list' }">
        View All Posts
      </button>
      <button @click="createNewPost" class="px-4 py-2 bg-[#3D6625] text-white hover:bg-[#213D12]">
        Create New Post
      </button>
    </div>
    <div v-if="activeView === 'list'" class="bg-white shadow p-6">
      <h2 class="text-xl font-semibold mb-4">All Blog Posts</h2>
      <p v-if="loading" class="text-gray-500">Loading blog posts...</p>
      <div v-else-if="blogPosts.length === 0" class="text-center py-8">
        <p class="text-gray-500 mb-4">No blog posts yet. Create your first post!</p>
        <button @click="createNewPost" class="px-4 py-2 bg-[#3D6625] text-white hover:bg-[#213D12]">
          Create New Post
        </button>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="bg-gray-50 border-b">
              <th class="py-2 px-4 text-left">Title</th>
              <th class="py-2 px-4 text-left">Status</th>
              <th class="py-2 px-4 text-left">Date</th>
              <th class="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in blogPosts" :key="post._id" class="border-b hover:bg-gray-50">
              <td class="py-3 px-4">
                <div class="flex items-center">
                  <div v-if="post.featuredImage" class="w-12 h-12 mr-3 bg-gray-200 overflow-hidden">
<img
  :src="getImageUrl(post.featuredImage)"
  :alt="post.title"
  class="w-full h-full object-cover"
/>
                  </div>
                  <div v-else class="w-12 h-12 mr-3 bg-gray-200 flex items-center justify-center">
                    <span class="text-gray-400 text-xs">No image</span>
                  </div>
                  <span class="font-medium">{{ post.title }}</span>
                </div>
              </td>
              <td class="py-3 px-4">
                <span class="px-2 py-1 text-xs font-medium" :class="{
                  'bg-green-100 text-green-800': post.status === 'published',
                  'bg-yellow-100 text-yellow-800': post.status === 'draft'
                }">{{ post.status }}</span>
              </td>
              <td class="py-3 px-4">{{ formatDate(post.createdAt) }}</td>
              <td class="py-3 px-4">
                <div class="flex space-x-2">
                  <button @click="editPost(post)" class="px-3 py-1 bg-[#3D6625] text-white hover:bg-[#213D12]">Edit</button>
                  <button @click="confirmDeletePost(post)" class="px-3 py-1 bg-[#3D6625] text-white hover:bg-[#213D12]">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else-if="activeView === 'editor'" class="bg-white shadow p-6">
      <h2 class="text-xl font-semibold mb-4">{{ selectedPost ? 'Edit Blog Post' : 'Create New Blog Post' }}</h2>
      <form @submit.prevent="savePost">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input id="title" v-model="editingPost.title" type="text" class="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter post title" required maxlength="4000" />
          <div class="text-sm mt-1 flex justify-end">
            <span :class="{'text-red-600': editingPost.title.length > CHARACTER_LIMIT}">
              {{ editingPost.title.length }} / {{ CHARACTER_LIMIT }} characters
            </span>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
          <div class="flex items-center space-x-4">
            <div v-if="editingPost.featuredImage" class="w-32 h-32 bg-gray-200 overflow-hidden">
              <img :src="editingPost.featuredImage" :alt="editingPost.title" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-32 h-32 bg-gray-200 flex items-center justify-center">
              <span class="text-gray-400">No image</span>
            </div>
            <div>
              <label for="image-upload" class="px-4 py-2 bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300">
                {{ editingPost.featuredImage ? 'Change Image' : 'Upload Image' }}
              </label>
              <input id="image-upload" type="file" class="hidden" accept="image/*" @change="handleImageUpload" />
              <button v-if="editingPost.featuredImage" type="button" @click="removeImage" class="ml-2 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200">
                Remove
              </button>
            </div>
            <div class="mb-4">
  <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
    Category
  </label>
  <select
    id="category"
    v-model="editingPost.category"
    required
    class="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="" disabled>Select a category</option>
    <option v-for="cat in categories" :key="cat" :value="cat">
      {{ cat }}
    </option>
  </select>
</div>

          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <div class="border">
            <div class="flex p-2 border-b bg-gray-50">
              <button type="button" @click="applyFormatting('bold')" class="p-1 hover:bg-gray-200 mr-1" title="Bold"><strong>B</strong></button>
              <button type="button" @click="applyFormatting('italic')" class="p-1 hover:bg-gray-200 mr-1" title="Italic"><em>I</em></button>
              <button type="button" @click="applyFormatting('h2')" class="p-1 hover:bg-gray-200 mr-1" title="Heading">H2</button>
              <button type="button" @click="applyFormatting('h3')" class="p-1 hover:bg-gray-200 mr-1" title="Subheading">H3</button>
              <button type="button" @click="applyFormatting('ul')" class="p-1 hover:bg-gray-200 mr-1" title="Bullet List">• List</button>
              <button type="button" @click="applyFormatting('ol')" class="p-1 hover:bg-gray-200 mr-1" title="Numbered List">1. List</button>
              <button type="button" @click="insertImage" class="p-1 hover:bg-gray-200 mr-1" title="Insert Image">🖼️ Image</button>
              <button type="button" @click="insertLink" class="p-1 hover:bg-gray-200" title="Insert Link">🔗 Link</button>
            </div>
            <div ref="editor" contenteditable="true" dir="ltr" class="p-3 min-h-64 focus:outline-none" @input="updateContent"></div>
            <div class="p-2 bg-gray-50 border-t flex justify-between items-center">
              <div class="text-sm">
                <span :class="{'text-red-600': contentCharCount > CHARACTER_LIMIT}">
                  {{ contentCharCount }} / {{ CHARACTER_LIMIT }} characters
                </span>
              </div>
              <div v-if="contentCharCount > CHARACTER_LIMIT" class="text-sm text-red-600">
                Character limit exceeded by {{ contentCharCount - CHARACTER_LIMIT }} characters
              </div>
            </div>
          </div>
        </div>
        <div class="mb-4">
          <label for="excerpt" class="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short description for previews)</label>
          <textarea id="excerpt" v-model="editingPost.excerpt" rows="3" class="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter a short excerpt" maxlength="4000"></textarea>
          <div class="text-sm mt-1 flex justify-end">
            <span :class="{'text-red-600': editingPost.excerpt.length > CHARACTER_LIMIT}">
              {{ editingPost.excerpt.length }} / {{ CHARACTER_LIMIT }} characters
            </span>
          </div>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <div class="flex space-x-4">
            <label class="inline-flex items-center">
              <input type="radio" name="status" value="published" v-model="editingPost.status" class="h-4 w-4 text-blue-600" />
              <span class="ml-2">Published</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" name="status" value="draft" v-model="editingPost.status" class="h-4 w-4 text-blue-600" />
              <span class="ml-2">Draft</span>
            </label>
          </div>
        </div>
        <div class="flex justify-end space-x-3">
          <button type="button" @click="cancelEdit" class="px-4 py-2 border text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button type="submit" 
            :disabled="contentCharCount > CHARACTER_LIMIT || editingPost.title.length > CHARACTER_LIMIT || editingPost.excerpt.length > CHARACTER_LIMIT" 
            class="px-4 py-2 text-white" 
            :class="contentCharCount > CHARACTER_LIMIT || editingPost.title.length > CHARACTER_LIMIT || editingPost.excerpt.length > CHARACTER_LIMIT ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3D6625] hover:bg-[#213D12]'">
            {{ selectedPost ? 'Update Post' : 'Create Post' }}
          </button>
        </div>
      </form>
    </div>
    <div v-else-if="activeView === 'preview'" class="bg-white shadow">
      <div class="p-6 border-b">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Post Preview</h2>
          <div class="flex space-x-3">
            <button @click="activeView = 'editor'" class="px-4 py-2 border text-gray-700 hover:bg-gray-100">Edit</button>
            <button @click="activeView = 'list'" class="px-4 py-2 border text-gray-700 hover:bg-gray-100">Back to List</button>
          </div>
        </div>
      </div>
      <div class="p-6">
        <h1 class="text-3xl font-bold mb-4">{{ editingPost.title }}</h1>
        <div v-if="editingPost.featuredImage" class="mb-6">
          <img :src="editingPost.featuredImage" :alt="editingPost.title" class="w-full max-h-96 object-cover" />
        </div>
        <div class="prose max-w-none" v-html="editingPost.content"></div>
      </div>
    </div>
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 shadow-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p class="mb-6">
          Are you sure you want to delete the post "<span>{{ postToDelete?.title }}</span>"? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-4">
          <button @click="showDeleteModal = false; postToDelete = null" class="px-4 py-2 border hover:bg-gray-100">
            Cancel
          </button>
          <button @click="deletePost" class="px-4 py-2 bg-red-600 text-white hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
    <div v-if="showImageModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 shadow-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Insert Image</h2>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
          <input type="file" accept="image/*" @change="handleContentImageUpload" class="w-full" />
        </div>
        <div class="mb-4">
          <label for="alt-text" class="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
          <input id="alt-text" v-model="imageAltText" type="text" class="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe the image" />
        </div>
        <div class="flex justify-end space-x-4">
          <button @click="cancelImageUpload" class="px-4 py-2 border hover:bg-gray-100">Cancel</button>
          <button @click="confirmImageUpload" class="px-4 py-2 bg-[#3D6625] text-white hover:bg-[#213D12]" :disabled="isUploadingImage">
            {{ isUploadingImage ? 'Uploading...' : 'Insert' }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="showLinkModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 shadow-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Insert Link</h2>
        <div class="mb-4">
          <label for="link-url" class="block text-sm font-medium text-gray-700 mb-1">URL</label>
          <input id="link-url" v-model="linkUrl" type="url" class="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://example.com" />
        </div>
        <div class="mb-4">
          <label for="link-text" class="block text-sm font-medium text-gray-700 mb-1">Link Text</label>
          <input id="link-text" v-model="linkText" type="text" class="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Click here" />
        </div>
        <div class="flex justify-end space-x-4">
          <button @click="cancelLinkInsert" class="px-4 py-2 border hover:bg-gray-100">Cancel</button>
          <button @click="confirmLinkInsert" class="px-4 py-2 bg-[#3D6625] text-white hover:bg-[#213D12]">Insert</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { ref, reactive, computed, onMounted } from 'vue'
import useBlogsApi from '~/composables/useBlogApi'
import type { BlogPost } from '~/type/BlogPost'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const API_BASE = config.public.apiBase || 'http://localhost:5000'

function getImageUrl(src: string | null) {
  if (!src) return '/img/default-hero.jpg'
  if (/^https?:\/\//.test(src)) return src
  return `${API_BASE}${src}`
}
const categories = [
  'Adoption Stories',
  'Volunteer Spotlights',
  'Dog Care Tips',
  'Training Advice',
  'Medical Updates',
  'Success Stories',
  'Events & Fundraisers',
  'Behind the Scenes',
  'Foster Programs',
  'Rescue Missions',
]

const { fetchAll, create, update, remove, uploadImage } = useBlogsApi()
const isUploadingFeaturedImage = ref(false)
const uploadProgress = ref(0)
const CHARACTER_LIMIT = 4000
const isAdmin = useCookie('isAdmin').value
if (!isAdmin) navigateTo('/login')

const loading = ref(true),
      activeView = ref<'list'|'editor'|'preview'>('list'),
      blogPosts = ref<BlogPost[]>([]),
      selectedPost = ref<BlogPost|null>(null),
      showDeleteModal = ref(false),
      postToDelete = ref<BlogPost|null>(null),
      showImageModal = ref(false),
      imageAltText = ref(''),
      contentImageFile = ref<File|null>(null),
      showLinkModal = ref(false),
      linkUrl = ref(''),
      linkText = ref(''),
      editor = ref<HTMLElement|null>(null),
      isUploadingImage = ref(false)

const emptyPost: BlogPost = {
  _id: '',
  title: '',
  content: '',
  excerpt: '',
  featuredImage: null,
  status: 'draft',
  category: '', 
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}
const editingPost = reactive<BlogPost>({ ...emptyPost })

function stripHtml(html: string): string {
  const temp = document.createElement('div')
  temp.innerHTML = html
  return temp.textContent || temp.innerText || ''
}

const contentCharCount = computed(() => stripHtml(editingPost.content).length)

function formatDate(d: string) {
  return new Date(d).toLocaleDateString()
}

onMounted(async () => {
  loading.value = true
  blogPosts.value = await fetchAll()
  loading.value = false
})

function createNewPost() {
  Object.assign(editingPost, { ...emptyPost, _id: `temp-${Date.now()}` })
  selectedPost.value = null
  activeView.value = 'editor'
}

function editPost(post: BlogPost) {
  Object.assign(editingPost, { ...post })
  selectedPost.value = post
  activeView.value = 'editor'
}

function cancelEdit() {
  activeView.value = 'list'
}

function removeImage() {
  editingPost.featuredImage = null
}

async function handleImageUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  isUploadingFeaturedImage.value = true
  uploadProgress.value = 0

  try {
    const fd = new FormData()
    fd.append('image', file)
    const { url } = await uploadImage(fd, pct => {
      uploadProgress.value = pct
    })
    editingPost.featuredImage = url
  } catch (err) {
    console.error('Upload failed:', err)
    alert('Image upload failed — please try again.')
  } finally {
    isUploadingFeaturedImage.value = false
  }
}
function updateContent(e: Event) {
  editingPost.content = (e.target as HTMLElement).innerHTML
}

function insertHtmlAtCaret(html: string) {
  const sel = window.getSelection()
  if (!sel || !sel.rangeCount) return
  const range = sel.getRangeAt(0)
  range.deleteContents()
  const frag = range.createContextualFragment(html)
  range.insertNode(frag)
  range.collapse(false)
  sel.removeAllRanges()
  sel.addRange(range)
}

function applyFormatting(format: string) {
  if (!editor.value) return;
  
  if ((format === 'ul' || format === 'ol') && contentCharCount.value >= CHARACTER_LIMIT - 10) {
    alert(`You're approaching the ${CHARACTER_LIMIT} character limit. Cannot add list formatting.`);
    return;
  }
  
  if (format === 'bold') {
    wrapSelectionWithTag('strong');
  } else if (format === 'italic') {
    wrapSelectionWithTag('em');
  } else if (format === 'h2') {
    wrapSelectionWithTag('h2');
  } else if (format === 'h3') {
    wrapSelectionWithTag('h3');
  } else if (format === 'ul') {
    const sel = window.getSelection();
    const text = sel ? sel.toString() : '';
    const html = `<ul><li>${text || 'List item'}</li></ul>`;
    insertHtmlAtCaret(html);
  } else if (format === 'ol') {
    const sel = window.getSelection();
    const text = sel ? sel.toString() : '';
    const html = `<ol><li>${text || 'List item'}</li></ol>`;
    insertHtmlAtCaret(html);
  }
  if (editor.value) {
    editingPost.content = editor.value.innerHTML;
  }
}
function insertImage() {
  showImageModal.value = true
  imageAltText.value = ''
  contentImageFile.value = null
}

function handleContentImageUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  contentImageFile.value = file || null
}

function cancelImageUpload() {
  showImageModal.value = false
  contentImageFile.value = null
  imageAltText.value = ''
}

async function confirmImageUpload() {
  if (!contentImageFile.value) {
    alert('Please select an image')
    return
  }
  if (!editor.value) return

  isUploadingImage.value = true
  try {
    const { url } = await uploadImage(
      Object.assign(new FormData(), (f: { append: (arg0: string, arg1: { readonly lastModified: number; readonly name: string; readonly webkitRelativePath: string; readonly size: number; readonly type: string; arrayBuffer: { (): Promise<ArrayBuffer>; (): Promise<ArrayBuffer> }; bytes: { (): Promise<Uint8Array>; (): Promise<Uint8Array> }; slice: { (start?: number, end?: number, contentType?: string): Blob; (start?: number, end?: number, contentType?: string): Blob }; stream: { (): ReadableStream<Uint8Array>; (): ReadableStream<Uint8Array> }; text: { (): Promise<string>; (): Promise<string> } }) => any }) => f.append('image', contentImageFile.value!)),
      pct => (uploadProgress.value = pct)
    )
    const imgHtml = `<img src="${url}" alt="${imageAltText.value}" class="max-w-full my-4 rounded" />`
    insertHtmlAtCaret(imgHtml)
    editingPost.content = editor.value.innerHTML
  } finally {
    isUploadingImage.value = false
    showImageModal.value = false
    contentImageFile.value = null
    imageAltText.value = ''
  }
}

function insertLink() {
  showLinkModal.value = true
  linkText.value = window.getSelection()?.toString() || ''
  linkUrl.value = ''
}

function cancelLinkInsert() {
  showLinkModal.value = false
  linkUrl.value = ''
  linkText.value = ''
}

function confirmLinkInsert() {
  if (!linkUrl.value || !editor.value) return
  const linkHtml = `<a href="${linkUrl.value}" target="_blank">${linkText.value || linkUrl.value}</a>`
  insertHtmlAtCaret(linkHtml)
  editingPost.content = editor.value.innerHTML
  showLinkModal.value = false
  linkUrl.value = ''
  linkText.value = ''
}

async function savePost() {
  if (
    contentCharCount.value > CHARACTER_LIMIT ||
    editingPost.title.length > CHARACTER_LIMIT ||
    editingPost.excerpt.length > CHARACTER_LIMIT
  ) {
    alert('One of your fields exceeds the character limit.')
    return
  }

  try {
    const isNew = !selectedPost.value?._id
    let saved: AxiosResponse<BlogPost, any>

    if (isNew) {
      interface NewBlogPost extends Omit<BlogPost, '_id'> {}
      saved = await create(editingPost as NewBlogPost)
      blogPosts.value.unshift(saved.data)
    } else {
      saved = await update(editingPost._id, editingPost)
      const idx = blogPosts.value.findIndex(p => p._id === saved.data._id)
      if (idx !== -1) {
        blogPosts.value[idx] = saved.data
      }
    }

    activeView.value = 'list'
  } catch (err) {
    console.error(err)
    alert(`Failed to ${selectedPost.value ? 'update' : 'create'} post.`)
  }
}


function confirmDeletePost(post: BlogPost) {
  postToDelete.value = post
  showDeleteModal.value = true
}

async function deletePost() {
  if (!postToDelete.value) return
  try {
    await remove(postToDelete.value._id)
    blogPosts.value = blogPosts.value.filter(
      p => p._id !== postToDelete.value!._id
    )
    showDeleteModal.value = false
    postToDelete.value = null
  } catch (err) {
    console.error(err)
    alert('Failed to delete post.')
  }
}


function wrapSelectionWithTag(tag: string) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  if (range.collapsed) return; 

  const wrapper = document.createElement(tag);
  wrapper.appendChild(range.extractContents());
  range.insertNode(wrapper);
  sel.removeAllRanges();
  const newRange = document.createRange();
  newRange.selectNodeContents(wrapper);
  sel.addRange(newRange);
}
</script>