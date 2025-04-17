<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Found Dog Reports</h1>

    <!-- loading spinner -->
    <div v-if="loading" class="flex justify-center py-12">
      <Loader />
    </div>

    <!-- empty state -->
    <p v-else-if="!reports.length" class="text-gray-500">
      No reports submitted yet.
    </p>

    <!-- data table -->
    <div v-else class="overflow-auto bg-white rounded shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left">Name</th>
            <th class="px-4 py-2 text-left">Phone</th>
            <th class="px-4 py-2 text-left">Email</th>
            <th class="px-4 py-2 text-left">Dog City</th>
            <th class="px-4 py-2 text-left">Reporter City</th>
            <th class="px-4 py-2 text-left">Comments</th>
            <th class="px-4 py-2 text-left">Picture</th>
            <th class="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="r in reports" :key="r._id" class="hover:bg-gray-50">
            <td class="px-4 py-2">{{ r.name }}</td>
            <td class="px-4 py-2">{{ r.phone }}</td>
            <td class="px-4 py-2">{{ r.email || '—' }}</td>
            <td class="px-4 py-2">{{ r.dogCity }}</td>
            <td class="px-4 py-2">{{ r.reporterCity }}</td>
            <td class="px-4 py-2">{{ r.comments || '—' }}</td>
            <td class="px-4 py-2">
              <img
                v-if="r.dogPicture"
                :src="r.dogPicture"
                alt="Dog"
                class="h-16 w-16 object-cover rounded"
              />
              <span v-else class="text-gray-400">—</span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap">{{ formatDate(r.createdAt) }}</td>
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
const reports = await api<Report[]>('/api/reports')
const loading = ref(true)

function formatDate(iso: string) {
  return new Date(iso).toLocaleString()
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
