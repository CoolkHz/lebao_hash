/**
 * CRC32 计算组合式函数
 */
import { ref } from 'vue'
import CRC32 from 'crc-32'
import { readFileAsArrayBuffer, readFileInChunks } from '../utils/fileReader.js'
import { formatCRC32 } from './useFormatter.js'

export function useCRC32() {
  const crc32Value = ref('')
  const crc32Decimal = ref('')
  const isCalculating = ref(false)
  const progress = ref(0)
  const error = ref('')
  const calculationTime = ref(0)

  // 小文件阈值：10MB
  const SMALL_FILE_THRESHOLD = 10 * 1024 * 1024
  // 分块大小：2MB
  const CHUNK_SIZE = 2 * 1024 * 1024

  /**
   * 计算文件的 CRC32 值
   * @param {File} file - 文件对象
   */
  const calculateCRC32 = async (file) => {
    if (!file) {
      error.value = '请选择要计算的文件'
      return
    }

    reset()
    isCalculating.value = true
    const startTime = performance.now()

    try {
      let crc = 0

      if (file.size < SMALL_FILE_THRESHOLD) {
        // 小文件：一次性读取
        const arrayBuffer = await readFileAsArrayBuffer(file)
        const uint8Array = new Uint8Array(arrayBuffer)
        crc = CRC32.buf(uint8Array)
        progress.value = 100
      } else {
        // 大文件：分块读取
        const chunks = await readFileInChunks(
          file,
          CHUNK_SIZE,
          (progressValue) => {
            progress.value = Math.floor(progressValue)
          }
        )

        // 累积计算 CRC32
        for (const chunk of chunks) {
          crc = CRC32.buf(chunk, crc)
        }
        progress.value = 100
      }

      const endTime = performance.now()
      calculationTime.value = Math.round(endTime - startTime)

      // 格式化结果
      crc32Value.value = formatCRC32(crc, true, false)
      crc32Decimal.value = (crc >>> 0).toString()

    } catch (err) {
      error.value = '计算过程出错: ' + err.message
      console.error('CRC32 calculation error:', err)
    } finally {
      isCalculating.value = false
    }
  }

  /**
   * 重置状态
   */
  const reset = () => {
    crc32Value.value = ''
    crc32Decimal.value = ''
    isCalculating.value = false
    progress.value = 0
    error.value = ''
    calculationTime.value = 0
  }

  return {
    crc32Value,
    crc32Decimal,
    isCalculating,
    progress,
    error,
    calculationTime,
    calculateCRC32,
    reset
  }
}
