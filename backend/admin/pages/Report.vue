<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-[#3D4836]">Found Dog Reports</h1>

    <div v-if="loading" class="flex justify-center py-12">
      <Loader />
    </div>

    <p v-else-if="!reports.length" class="text-gray-500">
      No reports submitted yet.
    </p>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full border-collapse table-fixed">
        <thead>
          <tr class="bg-green-700 text-white">
            <th class="border px-3 py-2 w-1/12">Name</th>
            <th class="border px-3 py-2 w-1/12">Phone</th>
            <th class="border px-3 py-2 w-1/5">Email</th>
            <th class="border px-3 py-2 w-1/12">Dog City</th>
            <th class="border px-3 py-2 w-1/12">Reporter City</th>
            <th class="border px-3 py-2 w-2/12">Comments</th>
            <th class="border px-3 py-2 w-1/12">Picture</th>
            <th class="border px-3 py-2 w-2/12">Date</th>
            <th class="border px-3 py-2 w-1/12">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="r in reports"
            :key="r._id"
            class="hover:bg-gray-100 even:bg-gray-50"
          >
            <td class="border px-3 py-1">{{ r.name }}</td>
            <td class="border px-3 py-1">{{ r.phone }}</td>
            <td class="border px-3 py-1 break-all">{{ r.email || '—' }}</td>
            <td class="border px-3 py-1">{{ r.dogCity }}</td>
            <td class="border px-3 py-1">{{ r.reporterCity }}</td>
            <td class="border px-3 py-1">{{ formatComment(r.comments) }}</td>
            <td class="border px-3 py-1">
              <div v-if="r.dogPicture" class="relative group">
                <img
                  :src="getImageUrl(r.dogPicture)"
                  :alt="imageLoadError.has(getImageUrl(r.dogPicture)) ? 'Default dog image' : 'Reported dog'"
                  class="w-20 h-20 object-cover rounded cursor-pointer"
                  loading="lazy"
                  @error="handleImageError"
                />
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
                  <span class="text-white text-sm">Click to view</span>
                </div>
              </div>
              <span v-else class="text-gray-400">No image</span>
            </td>
            <td class="border px-3 py-1 whitespace-nowrap">
              {{ formatDate(r.createdAt) }}
            </td>
            <td class="border px-3 py-1">
              <button
                @click="confirmDeleteReport(r)"
                class="px-3 py-1 bg-[#3D6625] text-white hover:bg-[#213D12] rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 shadow-lg max-w-md w-full rounded">
        <h2 class="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p class="mb-6">
          Are you sure you want to delete this report? This action cannot be
          undone.
        </p>
        <div class="flex justify-end space-x-4">
          <button
            @click="showDeleteModal = false; reportToDelete = null"
            class="px-4 py-2 border hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            @click="deleteReport"
            class="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCookie } from '#app'
import Loader from '~/components/Loader.vue'
import useReportApi from '~/composables/useReportApi'
import type { Report } from '~/type/Report'
import { useRuntimeConfig, useRouter } from '#app'
const router = useRouter()
const isAdmin = useCookie('isAdmin').value
if (!isAdmin) {
  router.push('/login')
}
const { fetchAll, remove } = useReportApi()
const config = useRuntimeConfig()
const API_BASE = config.public.apiBase || 'http://localhost:5000'
function getImageUrl(src: string | null): string {
  if (!src) return '';
  
  // If it's already a full URL, return as is
  if (src.startsWith('http')) return src;
  
  // If it's a relative path starting with /uploads
  if (src.startsWith('/uploads')) {
    return `${API_BASE}${src}`;
  }
  
  // For other relative paths, assume they're in the dog-pictures folder
  return `${API_BASE}/uploads/dog-pictures/${src}`;
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleString()
}

const defaultDogImage = '/uploads/dog-pictures/default-dog.jpg'
const imageLoadError = ref(new Set<string>())

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  const src = img.src
  
  // Prevent infinite loop of error handling
  if (src.endsWith(defaultDogImage)) return
  
  imageLoadError.value.add(src)
  img.src = defaultDogImage
}

function formatComment(comment?: string): string {
  if (!comment) return '—'
  return comment.length > 40
    ? comment.slice(0, 40) + '…'
    : comment
}
const reports = ref<Report[]>([])
const loading = ref(true)
async function loadReports() {
  loading.value = true
  try {
    reports.value = (await fetchAll()) as unknown as Report[]
  } catch (e) {
    console.error('Failed to load reports', e)
  } finally {
    loading.value = false
  }
}

onMounted(loadReports)
const showDeleteModal = ref(false)
const reportToDelete = ref<Report|null>(null)
function confirmDeleteReport(report: Report) {
  reportToDelete.value = report
  showDeleteModal.value = true
}
async function deleteReport() {
  if (!reportToDelete.value) return
  try {
    await remove(reportToDelete.value._id)
    reports.value = reports.value.filter(
      r => r._id !== reportToDelete.value!._id
    )
    showDeleteModal.value = false
    reportToDelete.value = null
  } catch (err: any) {
    console.error('Failed to delete report:', err)
    alert(err.response?.data?.message || 'Failed to delete report')
  }
}
</script>

<style scoped>
table {
  border: 1px solid #ccc;
}
th, td {
  height: 2.5rem;
}
</style>
