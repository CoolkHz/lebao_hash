/**
 * 验证函数集合
 */

/**
 * 验证文件对象是否有效
 * @param {File} file - 文件对象
 * @returns {{valid: boolean, error: string}}
 */
export function validateFile(file) {
  if (!file) {
    return {
      valid: false,
      error: '请选择要计算的文件'
    }
  }

  if (!(file instanceof File)) {
    return {
      valid: false,
      error: '无效的文件对象'
    }
  }

  return {
    valid: true,
    error: ''
  }
}

/**
 * 检查文件大小
 * @param {File} file - 文件对象
 * @param {number} maxSize - 最大文件大小（字节），默认 2GB
 * @returns {{valid: boolean, warning: string}}
 */
export function checkFileSize(file, maxSize = 2 * 1024 * 1024 * 1024) {
  if (file.size > maxSize) {
    return {
      valid: false,
      warning: '文件过大，可能导致浏览器卡顿或崩溃'
    }
  }

  if (file.size > 100 * 1024 * 1024) {
    return {
      valid: true,
      warning: '文件较大，计算可能需要一些时间'
    }
  }

  return {
    valid: true,
    warning: ''
  }
}

/**
 * 检查浏览器 API 支持
 * @returns {{supported: boolean, message: string}}
 */
export function checkBrowserSupport() {
  if (!window.FileReader) {
    return {
      supported: false,
      message: '您的浏览器不支持 File API，请升级浏览器'
    }
  }

  if (!window.File) {
    return {
      supported: false,
      message: '您的浏览器不支持文件处理，请升级浏览器'
    }
  }

  return {
    supported: true,
    message: ''
  }
}
