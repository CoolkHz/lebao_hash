/**
 * 文件读取工具函数
 */

/**
 * 读取文件为 ArrayBuffer（适用于小文件）
 * @param {File} file - 文件对象
 * @returns {Promise<ArrayBuffer>}
 */
export function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      resolve(event.target.result)
    }
    
    reader.onerror = (error) => {
      reject(new Error('文件读取失败: ' + error.message))
    }
    
    reader.readAsArrayBuffer(file)
  })
}

/**
 * 分块读取大文件
 * @param {File} file - 文件对象
 * @param {number} chunkSize - 块大小（字节）
 * @param {Function} onProgress - 进度回调
 * @returns {Promise<Uint8Array[]>}
 */
export function readFileInChunks(file, chunkSize = 2 * 1024 * 1024, onProgress = null) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let offset = 0
    const totalSize = file.size

    const readNextChunk = () => {
      if (offset >= totalSize) {
        resolve(chunks)
        return
      }

      const blob = file.slice(offset, offset + chunkSize)
      const reader = new FileReader()

      reader.onload = (event) => {
        chunks.push(new Uint8Array(event.target.result))
        offset += chunkSize

        if (onProgress) {
          const progress = Math.min((offset / totalSize) * 100, 100)
          onProgress(progress)
        }

        readNextChunk()
      }

      reader.onerror = (error) => {
        reject(new Error('文件读取失败: ' + error.message))
      }

      reader.readAsArrayBuffer(blob)
    }

    readNextChunk()
  })
}
