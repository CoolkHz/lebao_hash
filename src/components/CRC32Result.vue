<template>
  <div v-if="crc32Value" class="result-container">
    <div class="result-card">
      <div class="result-header">
        <svg class="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 class="result-title">计算完成</h2>
      </div>

      <div class="file-info-section">
        <h3 class="section-title">文件信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">文件名:</span>
            <span class="info-value" :title="fileName">{{ fileName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">文件大小:</span>
            <span class="info-value">{{ fileSize }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">文件类型:</span>
            <span class="info-value">{{ fileType || '未知' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">计算耗时:</span>
            <span class="info-value">{{ formattedTime }}</span>
          </div>
        </div>
      </div>

      <div class="crc32-section">
        <h3 class="section-title">CRC32 校验值</h3>
        
        <div class="crc32-value-container">
          <div class="value-group">
            <span class="value-label">十六进制 (HEX):</span>
            <div class="value-display hex-value">
              <code>{{ crc32Value }}</code>
              <button 
                class="copy-button" 
                @click="handleCopy(crc32Value, 'hex')"
                :class="{ 'copied': copyStatus === 'hex' }"
              >
                <svg v-if="copyStatus !== 'hex'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>

          <div class="value-group">
            <span class="value-label">十进制 (DEC):</span>
            <div class="value-display dec-value">
              <code>{{ crc32Decimal }}</code>
              <button 
                class="copy-button" 
                @click="handleCopy(crc32Decimal, 'dec')"
                :class="{ 'copied': copyStatus === 'dec' }"
              >
                <svg v-if="copyStatus !== 'dec'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button class="action-button recalculate-button" @click="handleRecalculate">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>重新计算</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFormatter } from '../composables/useFormatter.js'

const props = defineProps({
  crc32Value: {
    type: String,
    default: ''
  },
  crc32Decimal: {
    type: String,
    default: ''
  },
  fileName: {
    type: String,
    default: ''
  },
  fileSize: {
    type: String,
    default: ''
  },
  fileType: {
    type: String,
    default: ''
  },
  calculationTime: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['recalculate'])

const { formatDuration, copyToClipboard } = useFormatter()
const copyStatus = ref('')

const formattedTime = computed(() => {
  return formatDuration(props.calculationTime)
})

const handleCopy = async (text, type) => {
  const success = await copyToClipboard(text)
  if (success) {
    copyStatus.value = type
    setTimeout(() => {
      copyStatus.value = ''
    }, 2000)
  }
}

const handleRecalculate = () => {
  emit('recalculate')
}
</script>

<style scoped>
.result-container {
  width: 100%;
  max-width: 700px;
  margin: 2rem auto 0;
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e0e0e0;
}

.success-icon {
  width: 40px;
  height: 40px;
  color: #4CAF50;
}

.result-title {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
  font-weight: 600;
}

.file-info-section,
.crc32-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.1rem;
  color: #555;
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.85rem;
  color: #888;
  font-weight: 500;
}

.info-value {
  font-size: 1rem;
  color: #333;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.crc32-value-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.value-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.value-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.value-display {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.value-display:hover {
  background-color: #eeeeee;
  border-color: #2196F3;
}

.value-display code {
  flex: 1;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2196F3;
  letter-spacing: 0.5px;
}

.hex-value code {
  text-transform: uppercase;
}

.copy-button {
  width: 36px;
  height: 36px;
  border: none;
  background-color: #2196F3;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.copy-button:hover {
  background-color: #1976D2;
  transform: scale(1.05);
}

.copy-button.copied {
  background-color: #4CAF50;
}

.copy-button svg {
  width: 20px;
  height: 20px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.recalculate-button {
  background: linear-gradient(135deg, #FF9800, #FFB74D);
  color: white;
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
}

.recalculate-button:hover {
  background: linear-gradient(135deg, #F57C00, #FF9800);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.4);
}

.action-button svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .result-card {
    padding: 1.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .value-display code {
    font-size: 0.95rem;
  }
}
</style>
