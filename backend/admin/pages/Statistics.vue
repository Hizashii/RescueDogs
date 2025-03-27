<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Statistics</h1>
    
    <!-- Loading indicator -->
    <div v-if="loading" class="text-gray-600">Loading statistics...</div>
    
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Dogs Chart -->
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-3">Dog Statistics</h2>
        <div style="height: 300px;">
          <BarChart :chart-data="chartData" :chart-options="chartOptions" />
        </div>
      </div>
      
      <!-- Donation Statistics -->
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-3">Donation Statistics</h2>
        
        <!-- Total Donations Card -->
        <div class="bg-blue-50 p-4 rounded mb-4 border border-blue-100">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-blue-800">Total Donations</h3>
              <p class="text-sm text-blue-600">All time</p>
            </div>
            <div class="text-3xl font-bold text-blue-800">$<span v-text="totalDonations.toLocaleString()"></span></div>
          </div>
        </div>
        
        <!-- Recent Donations -->
        <h3 class="font-medium mb-2">Recent Donations</h3>
        <div class="overflow-auto max-h-64 border rounded">
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left">Name</th>
                <th class="px-4 py-2 text-left">Date</th>
                <th class="px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(donation, index) in recentDonations" :key="index" class="border-t">
                <td class="px-4 py-2" v-text="donation.name"></td>
                <td class="px-4 py-2" v-text="formatDate(donation.date)"></td>
                <td class="px-4 py-2 text-right">$<span v-text="donation.amount.toLocaleString()"></span></td>
              </tr>
              <tr v-if="recentDonations.length === 0">
                <td colspan="3" class="px-4 py-2 text-center text-gray-500">No recent donations</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Monthly Donation Trend -->
        <h3 class="font-medium mt-4 mb-2">Monthly Donations (<span v-text="currentYear"></span>)</h3>
        <div class="h-40">
          <LineChart :chart-data="donationChartData" :chart-options="donationChartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BarChart from '~/components/BarChart.vue'
import LineChart from '../components/LineChart.vue'
import type { ChartData, ChartOptions } from 'chart.js'
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip } from 'chart.js'

// Define types for donation data
interface Donation {
  name: string;
  date: string;
  amount: number;
}

interface DonationStatistics {
  total: number;
  recent: Donation[];
  monthly: number[];
}

// Register the chart components
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip)

definePageMeta({
  layout: 'default'
})

const loading = ref(true)
const currentYear = new Date().getFullYear()

// Dog statistics chart
const chartOptions = ref<ChartOptions<'bar'>>({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: '#374151' }
    },
    title: {
      display: true,
      text: 'Adopted vs. Received Dogs Per Year',
      color: '#1F2937'
    }
  },
  scales: {
    x: { ticks: { color: '#374151' } },
    y: { ticks: { color: '#374151' } }
  }
})

// Initialize chartData with empty arrays
const chartData = ref<ChartData<'bar', number[], unknown>>({
  labels: [],
  datasets: []
})

// Donation statistics with proper typing
const totalDonations = ref<number>(0)
const recentDonations = ref<Donation[]>([])
const monthlyDonations = ref<number[]>([])

// Donation chart
const donationChartOptions = ref<ChartOptions<'line'>>({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
})

const donationChartData = computed(() => {
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Donations',
        data: monthlyDonations.value,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }
    ]
  }
})

// Format date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

onMounted(async () => {
  try {
    // Fetch dog statistics
    const dogResponse = await fetch('http://localhost:5000/api/statistics')
    if (!dogResponse.ok) throw new Error('Failed to fetch dog statistics')
    const dogData = await dogResponse.json()
    
    chartData.value = {
      labels: dogData.years,
      datasets: [
        {
          label: 'Adopted',
          data: dogData.adopted,
          backgroundColor: 'rgba(75, 192, 192, 0.7)'
        },
        {
          label: 'Received',
          data: dogData.received,
          backgroundColor: 'rgba(153, 102, 255, 0.7)'
        }
      ]
    }
    
    // Fetch donation statistics
    const donationResponse = await fetch('http://localhost:5000/api/donations/statistics')
    if (!donationResponse.ok) throw new Error('Failed to fetch donation statistics')
    const donationData: DonationStatistics = await donationResponse.json()
    
    totalDonations.value = donationData.total
    recentDonations.value = donationData.recent
    monthlyDonations.value = donationData.monthly
  } catch (error) {
    console.error(error)
    
    // Dummy data for testing
    chartData.value = {
      labels: [2020, 2021, 2022, 2023, 2024],
      datasets: [
        {
          label: 'Adopted',
          data: [10, 15, 12, 18, 22],
          backgroundColor: 'rgba(75, 192, 192, 0.7)'
        },
        {
          label: 'Received',
          data: [20, 18, 22, 25, 30],
          backgroundColor: 'rgba(153, 102, 255, 0.7)'
        }
      ]
    }
    
    // Dummy donation data
    totalDonations.value = 12750
    recentDonations.value = [
      { name: 'John Smith', date: '2025-03-20', amount: 250 },
      { name: 'Sarah Johnson', date: '2025-03-18', amount: 100 },
      { name: 'Anonymous', date: '2025-03-15', amount: 500 },
      { name: 'Michael Brown', date: '2025-03-10', amount: 75 },
      { name: 'Emily Wilson', date: '2025-03-05', amount: 150 }
    ]
    monthlyDonations.value = [1200, 950, 1500, 1100, 2000, 1800, 1600, 1400, 900, 1300, 400, 0]
  } finally {
    loading.value = false
  }
})
</script>