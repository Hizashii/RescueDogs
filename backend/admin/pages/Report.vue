<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Found Dog Reports</h1>
    <p class="mb-6">List of reports submitted by people who found stray dogs.</p>
    
    <!-- Loading state -->
    <p v-if="loading">Loading reports...</p>
    
    <!-- Reports list -->
    <div v-else class="bg-white rounded shadow overflow-hidden">
      <!-- Empty state -->
      <p v-if="reports.length === 0" class="p-4 text-gray-500">No reports submitted yet.</p>
      
      <table v-else class="w-full">
        <thead class="bg-gray-100 border-b">
          <tr>
            <th class="px-4 py-2 text-left">Reporter</th>
            <th class="px-4 py-2 text-left">Contact</th>
            <th class="px-4 py-2 text-left">Location</th>
            <th class="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, index) in reports" :key="index" class="border-b">
            <td class="px-4 py-2">{{ report.name }} {{ report.surname }}</td>
            <td class="px-4 py-2">{{ report.phone }}</td>
            <td class="px-4 py-2">{{ report.city }}, {{ report.street }}</td>
            <td class="px-4 py-2">{{ formatDate(report.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Sample data for initial development
const sampleReports = [
  {
    id: 1,
    name: 'John',
    surname: 'Doe',
    phone: '555-123-4567',
    email: 'john@example.com',
    city: 'Bihornagybajom',
    street: 'Main Street',
    createdAt: new Date('2025-03-15').toISOString()
  },
  {
    id: 2,
    name: 'Jane',
    surname: 'Smith',
    phone: '555-987-6543',
    email: 'jane@example.com',
    city: 'Bihornagybajom',
    street: 'Oak Avenue',
    createdAt: new Date('2025-03-20').toISOString()
  },
  {
    id: 3,
    name: 'Robert',
    surname: 'Johnson',
    phone: '555-456-7890',
    email: 'robert@example.com',
    city: 'Bihornagybajom',
    street: 'Pine Road',
    createdAt: new Date('2025-03-22').toISOString()
  }
]

const reports = ref([])
const loading = ref(true)

// Format date for display
function formatDate(dateString) {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

// Function to fetch reports (currently using sample data)
function fetchReports() {
  // For now, we'll use the sample data
  // Later, this will be replaced with an actual API call
  
  // Simulating API call with a timeout
  setTimeout(() => {
    reports.value = sampleReports
    loading.value = false
  }, 500)
  
  // When ready to implement with real API:
  /*
  fetch('http://localhost:5000/api/reports')
    .then(response => response.json())
    .then(data => {
      reports.value = data
    })
    .catch(error => {
      console.error('Error fetching reports:', error)
    })
    .finally(() => {
      loading.value = false
    })
  */
}

onMounted(() => {
  fetchReports()
})
</script>