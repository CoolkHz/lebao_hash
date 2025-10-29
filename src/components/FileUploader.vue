<template>
  <div class="file-uploader">
    <div 
      class="drop-zone"
      :class="{ 'drop-zone-active': isDragging, 'has-file': selectedFile }"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
    >
      <div v-if="!selectedFile" class="drop-zone-content">
        <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <h3 class="drop-zone-title">
          {{ isDragging ? '松开鼠标上传文件' : '拖拽文件到此处' }}
        </h3>
        <p class="drop-zone-description">或者</p>
        <label class="file-select-button">
          <input 
            type="file" 
            class="file-input"
            @change="handleFileSelect"
            ref="fileInputRef"
          />
          <span class="button-text">选择文件</span>
        </label>
      </div>

      <div v-else class="file-info-preview">
        <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <div class="file-details">
          <p class="file-name">{{ selectedFile.name }}</p>
          <p class="file-size">{{ formattedSize }}</p>
        </div>
        <button class="clear-button" @click="handleClear" title="清除文件">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <p v-if="warning" class="warning-message">⚠️ {{ warning }}</p>
    <p v-if="error" class="error-message">❌ {{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFormatter } from '../composables/useFormatter.js'

const props = defineProps({
  selectedFile: {
    type: File,
    default: null
  },
  isDragging: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  warning: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['file-select', 'drop', 'drag-over', 'drag-leave', 'clear'])

const { formatFileSize } = useFormatter()

const formattedSize = computed(() => {
  return props.selectedFile ? formatFileSize(props.selectedFile.size) : ''
})

const handleFileSelect = (event) => {
  emit('file-select', event)
}

const handleDrop = (event) => {
  emit('drop', event)
}

const handleDragOver = (event) => {
  emit('drag-over', event)
}

const handleDragLeave = () => {
  emit('drag-leave')
}

const handleClear = () => {
  emit('clear')
}
</script>

<style scoped>
.file-uploader {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.drop-zone {
  border: 2px dashed #ccc;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  background-color: #fafafa;
  cursor: pointer;
}

.drop-zone:hover {
  border-color: #2196F3;
  background-color: #f5f5f5;
}

.drop-zone-active {
  border-color: #2196F3;
  background-color: #e3f2fd;
  transform: scale(1.02);
}

.drop-zone.has-file {
  padding: 1.5rem;
  background-color: #fff;
  border-color: #4CAF50;
}

.drop-zone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  width: 64px;
  height: 64px;
  color: #2196F3;
  margin-bottom: 1rem;
}

.drop-zone-title {
  font-size: 1.25rem;
  color: #333;
  margin: 0;
  font-weight: 600;
}

.drop-zone-description {
  color: #666;
  margin: 0.5rem 0;
}

.file-select-button {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #2196F3, #42A5F5);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
}

.file-select-button:hover {
  background: linear-gradient(135deg, #1976D2, #2196F3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
}

.file-input {
  display: none;
}

.file-info-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
}

.file-icon {
  width: 48px;
  height: 48px;
  color: #4CAF50;
  flex-shrink: 0;
}

.file-details {
  flex: 1;
  overflow: hidden;
}

.file-name {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.clear-button {
  width: 36px;
  height: 36px;
  border: none;
  background-color: #f44336;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.clear-button:hover {
  background-color: #d32f2f;
  transform: rotate(90deg);
}

.clear-button svg {
  width: 20px;
  height: 20px;
}

.warning-message {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background-color: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 6px;
  color: #856404;
  font-size: 0.9rem;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background-color: #f8d7da;
  border: 1px solid #f44336;
  border-radius: 6px;
  color: #721c24;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .drop-zone {
    padding: 2rem 1rem;
  }

  .file-select-button {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>
