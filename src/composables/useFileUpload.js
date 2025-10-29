/**
 * 文件上传组合式函数
 */
import { ref } from 'vue'
import { validateFile, checkFileSize } from '../utils/validators.js'

export function useFileUpload() {
  const selectedFile = ref(null)
  const isDragging = ref(false)
  const error = ref('')
  const warning = ref('')

  /**
   * 处理文件选择
   * @param {Event} event - 文件选择事件
   */
  const handleFileSelect = (event) => {
    const files = event.target.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  /**
   * 处理文件拖放
   * @param {DragEvent} event - 拖放事件
   */
  const handleDrop = (event) => {
    event.preventDefault()
    isDragging.value = false

    const files = event.dataTransfer?.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  /**
   * 处理拖拽悬停
   * @param {DragEvent} event - 拖拽事件
   */
  const handleDragOver = (event) => {
    event.preventDefault()
    isDragging.value = true
  }

  /**
   * 处理拖拽离开
   */
  const handleDragLeave = () => {
    isDragging.value = false
  }

  /**
   * 处理文件
   * @param {File} file - 文件对象
   */
  const processFile = (file) => {
    error.value = ''
    warning.value = ''

    // 验证文件
    const validation = validateFile(file)
    if (!validation.valid) {
      error.value = validation.error
      selectedFile.value = null
      return
    }

    // 检查文件大小
    const sizeCheck = checkFileSize(file)
    if (!sizeCheck.valid) {
      error.value = sizeCheck.warning
      selectedFile.value = null
      return
    }

    if (sizeCheck.warning) {
      warning.value = sizeCheck.warning
    }

    selectedFile.value = file
  }

  /**
   * 清除选中的文件
   */
  const clearFile = () => {
    selectedFile.value = null
    error.value = ''
    warning.value = ''
  }

  return {
    selectedFile,
    isDragging,
    error,
    warning,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    clearFile
  }
}
