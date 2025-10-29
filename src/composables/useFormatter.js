/**
 * 格式化工具组合式函数
 */

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string} 格式化后的大小
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * 格式化 CRC32 值
 * @param {number} crc32 - CRC32 数值
 * @param {boolean} uppercase - 是否大写
 * @param {boolean} withPrefix - 是否添加 0x 前缀
 * @returns {string} 格式化后的 CRC32 值
 */
export function formatCRC32(crc32, uppercase = true, withPrefix = false) {
  // CRC32 是有符号整数，转换为无符号 32 位整数
  const unsigned = (crc32 >>> 0)
  let hex = unsigned.toString(16).padStart(8, '0')
  
  if (uppercase) {
    hex = hex.toUpperCase()
  }
  
  return withPrefix ? '0x' + hex : hex
}

/**
 * 格式化时长
 * @param {number} milliseconds - 毫秒数
 * @returns {string} 格式化后的时长
 */
export function formatDuration(milliseconds) {
  if (milliseconds < 1000) {
    return milliseconds + ' ms'
  }
  
  const seconds = Math.round(milliseconds / 100) / 10
  return seconds + ' s'
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} 是否成功
 */
export async function copyToClipboard(text) {
  try {
    // 优先使用 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
    
    // 降级方案：使用 execCommand
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    
    return success
  } catch (error) {
    console.error('复制失败:', error)
    return false
  }
}

/**
 * useFormatter 组合式函数
 */
export function useFormatter() {
  return {
    formatFileSize,
    formatCRC32,
    formatDuration,
    copyToClipboard
  }
}
