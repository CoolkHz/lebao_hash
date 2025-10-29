<template>
  <div v-if="isVisible" class="progress-container">
    <div class="progress-header">
      <span class="progress-label">{{ label }}</span>
      <span class="progress-percentage">{{ Math.floor(progress) }}%</span>
    </div>
    <div class="progress-bar-wrapper">
      <div 
        class="progress-bar"
        :style="{ width: progress + '%' }"
      >
        <div class="progress-bar-animation"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100
  },
  label: {
    type: String,
    default: '正在计算...'
  },
  isVisible: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.progress-container {
  width: 100%;
  margin: 1.5rem 0;
  animation: fadeIn 0.3s ease-in;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.progress-label {
  color: #555;
  font-weight: 500;
}

.progress-percentage {
  color: #2196F3;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.progress-bar-wrapper {
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #2196F3, #42A5F5);
  border-radius: 10px;
  transition: width 0.3s ease;
  position: relative;
  overflow: hidden;
}

.progress-bar-animation {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
