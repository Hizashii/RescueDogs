<template>
    <canvas ref="canvas"></canvas>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  
  // Register the required Chart.js components
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    Title,
    Tooltip,
    Legend
  )
  
  interface Props {
    chartData: any
    chartOptions: any
  }
  
  const props = defineProps<Props>()
  const canvas = ref<HTMLCanvasElement | null>(null)
  let chart: Chart | null = null
  
  onMounted(() => {
    if (canvas.value) {
      chart = new Chart(canvas.value, {
        type: 'line',
        data: props.chartData,
        options: props.chartOptions,
      })
    }
  })
  
  // Watch for changes in chartData and update the chart
  watch(
    () => props.chartData,
    (newData) => {
      if (chart) {
        chart.data = newData
        chart.update()
      }
    },
    { deep: true }
  )
  </script>