<template>
  <div id="app">
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">
          <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          CRC32 文件校验计算器
        </h1>
        <p class="app-description">
          纯前端计算，保护您的隐私 · 文件不会上传到服务器
        </p>
      </div>
    </header>

    <main class="app-main">
      <div class="container">
        <!-- 文件上传组件 -->
        <FileUploader
          :selected-file="selectedFile"
          :is-dragging="isDragging"
          :error="uploadError"
          :warning="uploadWarning"
          @file-select="handleFileSelect"
          @drop="handleDrop"
          @drag-over="handleDragOver"
          @drag-leave="handleDragLeave"
          @clear="handleClearFile"
        />

        <!-- 进度条组件 -->
        <ProgressBar
          v-if="isCalculating"
          :progress="progress"
          :label="progressLabel"
          :is-visible="isCalculating"
        />

        <!-- 错误提示 -->
        <div v-if="calcError" class="error-alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ calcError }}</span>
        </div>

        <!-- 结果展示组件 -->
        <CRC32Result
          v-if="crc32Value && !isCalculating"
          :crc32-value="crc32Value"
          :crc32-decimal="crc32Decimal"
          :file-name="fileInfo.name"
          :file-size="fileInfo.size"
          :file-type="fileInfo.type"
          :calculation-time="calculationTime"
          @recalculate="handleRecalculate"
        />
      </div>
    </main>

    <footer class="app-footer">
      <p class="footer-text">
        基于 Vue 3 + Vite 构建 · 
        使用 <a href="https://www.npmjs.com/package/crc-32" target="_blank" rel="noopener">crc-32</a> 算法库
      </p>
      <p class="footer-privacy">
        🔒 所有计算均在本地浏览器中完成，您的文件安全且隐私
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import FileUploader from './components/FileUploader.vue'
import ProgressBar from './components/ProgressBar.vue'
import CRC32Result from './components/CRC32Result.vue'
import { useFileUpload } from './composables/useFileUpload.js'
import { useCRC32 } from './composables/useCRC32.js'
import { useFormatter } from './composables/useFormatter.js'
import { checkBrowserSupport } from './utils/validators.js'

// 检查浏览器支持
const browserCheck = checkBrowserSupport()
if (!browserCheck.supported) {
  alert(browserCheck.message)
}

// 文件上传相关
const {
  selectedFile,
  isDragging,
  error: uploadError,
  warning: uploadWarning,
  handleFileSelect,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  clearFile
} = useFileUpload()

// CRC32 计算相关
const {
  crc32Value,
  crc32Decimal,
  isCalculating,
  progress,
  error: calcError,
  calculationTime,
  calculateCRC32,
  reset: resetCalculation
} = useCRC32()

// 格式化工具
const { formatFileSize } = useFormatter()

// 进度标签
const progressLabel = computed(() => {
  if (progress.value < 100) {
    return '正在计算 CRC32...'
  }
  return '计算完成'
})

// 文件信息
const fileInfo = computed(() => {
  if (!selectedFile.value) {
    return {
      name: '',
      size: '',
      type: ''
    }
  }

  return {
    name: selectedFile.value.name,
    size: formatFileSize(selectedFile.value.size),
    type: selectedFile.value.type
  }
})

// 监听文件选择，自动计算
watch(selectedFile, (newFile) => {
  if (newFile) {
    resetCalculation()
    calculateCRC32(newFile)
  }
})

// 清除文件
const handleClearFile = () => {
  clearFile()
  resetCalculation()
}

// 重新计算
const handleRecalculate = () => {
  clearFile()
  resetCalculation()
}
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 
               Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header 样式 */
.app-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem 1rem;
  text-align: center;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.app-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.title-icon {
  width: 36px;
  height: 36px;
  color: #2196F3;
}

.app-description {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

/* Main 内容区 */
.app-main {
  flex: 1;
  padding: 3rem 1rem;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

/* 错误提示 */
.error-alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background-color: #ffebee;
  border: 1px solid #f44336;
  border-radius: 8px;
  color: #c62828;
  margin: 1.5rem auto;
  max-width: 600px;
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.2);
}

.error-alert svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

/* Footer 样式 */
.app-footer {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem 1rem;
  text-align: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.footer-text {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.footer-text a {
  color: #2196F3;
  text-decoration: none;
  font-weight: 600;
}

.footer-text a:hover {
  text-decoration: underline;
}

.footer-privacy {
  font-size: 0.85rem;
  color: #4CAF50;
  font-weight: 500;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-title {
    font-size: 1.5rem;
  }

  .title-icon {
    width: 28px;
    height: 28px;
  }

  .app-description {
    font-size: 0.9rem;
  }

  .app-main {
    padding: 2rem 1rem;
  }

  .app-header,
  .app-footer {
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .app-title {
    font-size: 1.25rem;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
