<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Found Dog Reports</h1>

    <div v-if="loading" class="flex justify-center py-12">
      <Loader />
    </div>

    <p v-else-if="!reports.length" class="text-gray-500">
      No reports submitted yet.
    </p>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full border-collapse table-fixed">
        <thead>
          <tr class="bg-blue-600 text-white">
            <th class="border px-3 py-2 w-1/12">Name</th>
            <th class="border px-3 py-2 w-1/12">Phone</th>
            <th class="border px-3 py-2 w-1/5">Email</th>
            <th class="border px-3 py-2 w-1/12">Dog City</th>
            <th class="border px-3 py-2 w-1/12">Reporter City</th>
            <th class="border px-3 py-2 w-2/12">Comments</th>
            <th class="border px-3 py-2 w-1/12">Picture</th>
            <th class="border px-3 py-2 w-2/12">Date</th>
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
            <td class="border px-3 py-1 text-center">
              <img
                v-if="r.dogPicture"
                :src="r.dogPicture"
                alt="Dog"
                class="h-12 w-12 object-cover rounded"
              />
              <span v-else class="text-gray-400">—</span>
            </td>
            <td class="border px-3 py-1 whitespace-nowrap">
              {{ formatDate(r.createdAt) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Loader from '~/components/Loader.vue'
import { useApi } from '~/composables/useApi'

interface Report {
  _id: string
  name: string
  phone: string
  email?: string
  dogCity: string
  reporterCity: string
  comments?: string
  dogPicture?: string
  createdAt: string
}

const api = useApi()
const reports = ref<Report[]>([])
const loading = ref(true)

function formatDate(iso: string) {
  return new Date(iso).toLocaleString()
}

function formatComment(comment: string | undefined): string {
  if (!comment) return '—'
  return comment.length > 40 ? comment.slice(0, 40) + '...' : comment
}

async function loadReports() {
  loading.value = true
  try {
    reports.value = await api<Report[]>('/api/reports')
  } catch (e) {
    console.error('Failed to load reports', e)
  } finally {
    loading.value = false
  }
}

onMounted(loadReports)
</script>

<style scoped>
table {
  border: 1px solid #ccc;
}
th,
td {
  /* Optional: ensure consistent height */
  height: 2.5rem;
}
</style>
