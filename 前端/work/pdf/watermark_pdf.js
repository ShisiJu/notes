import { PDFDocument } from 'pdf-lib'
import logoImg from '@/assets/images/watermark.png'

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  b64Data = b64Data.replace(`data:${contentType};base64,`, '')

  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

class WatermarkPdf {
  constructor (file) {
    this.file = file
    this.fileType = file.type
    this.fileName = file.name.split('.')[0]
  }

  async getArrayBuffer () {
    return this.file.arrayBuffer()
  }

  async handleImage (pdfDoc, arrayBuffer, type) {
    let image = null
    if (['image/png'].includes(type)) {
      image = await pdfDoc.embedPng(arrayBuffer)
    }
    if (['image/jpg', 'image/jpeg'].includes(type)) {
      image = await pdfDoc.embedJpg(arrayBuffer)
    }
    return image
  }

  async getPdfDoc () {
    let arrayBuffer = await this.getArrayBuffer()
    let pdfDoc = null
    if (this.fileType === 'application/pdf') {
      pdfDoc = await PDFDocument.load(arrayBuffer)
    }
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(this.fileType)) {
      pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage()
      const image = await this.handleImage(pdfDoc, arrayBuffer, this.fileType)
      let scale = WatermarkPdf.getScale(image, page)
      const imageDims = image.scale(scale)
      page.drawImage(image, {
        x: 50,
        y: page.getHeight() - imageDims.height - 65,
        width: imageDims.width,
        height: imageDims.height
      })
    }

    let watermarkImage = await this.addWaterMark(pdfDoc)
    await this.drawWatermark(pdfDoc, watermarkImage)
    return pdfDoc
  }

  async drawWatermark (pdfDoc, watermark) {
    const logoDims = watermark.logo.scale(0.5)

    await pdfDoc.getPages().forEach(page => {
      const pointLogo = WatermarkPdf.getStartPoint(page, {
        offsetX: 60,
        offsetY: -45
      })

      let rotate = page.getRotation()
      page.drawImage(watermark.logo, {
        x: pointLogo.x,
        y: pointLogo.y,
        width: logoDims.width,
        height: logoDims.height,
        rotate
      })
    })
  }

  async addWaterMark (pdfDoc) {
    let watermarkBlob = b64toBlob(logoImg, 'image/png')
    let watermarkArrayBuffer = await watermarkBlob.arrayBuffer()
    let watermarkImage = await pdfDoc.embedPng(watermarkArrayBuffer)

    return { logo: watermarkImage }
  }

  async exportPdf () {
    // 异步如果没有catch 不会报错
    let pdfBytes = null
    try {
      let pdfDoc = await this.getPdfDoc()
      pdfBytes = await pdfDoc.save()
    } catch (e) {
      console.error(e)
    }

    let blob = new Blob([pdfBytes])
    // FileReader主要用于将文件内容读入内存
    let reader = new FileReader()
    reader.readAsDataURL(blob)
    let fileName = this.fileName + '.pdf'
    // onload当读取操作成功完成时调用
    reader.onload = function (e) {
      let a = document.createElement('a')
      // 获取文件名fileName
      a.download = fileName
      a.href = e.target.result
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
}

WatermarkPdf.getScale = function (image, page) {
  let pageWidth = page.getWidth()
  let pageHight = page.getHeight()

  if (image.width < pageWidth && image.height < pageHight) {
    return 1
  }

  let widthScale = pageWidth / image.width
  let heightScale = pageHight / image.height

  return Math.min(widthScale, heightScale) - 0.1
}

function getDistance (distance, offset) {
  if (offset < 0) {
    return distance + offset
  } else {
    return offset
  }
}

WatermarkPdf.getStartPoint = function (page, offset) {
  // 顺时针旋转角度;  以左下角为原点
  let rotation = page.getRotation()
  console.log(rotation)
  let width = page.getWidth()
  let height = page.getHeight()

  let angle = rotation.angle
  let x = 0
  let y = 0
  let { offsetX, offsetY } = offset
  // 宽高需要根据 angle 进行切换
  if (angle === 0) {
    x = getDistance(width, offsetX)
    y = getDistance(height, offsetY)
  }

  if (angle === 180) {
    x = getDistance(width, 0 - offsetX)
    y = getDistance(height, 0 - offsetY)
  }

  if (angle === 90) {
    x = offsetX
    y = 0 - offsetY
  }

  if (angle === 270) {
    x = getDistance(width, offsetY)
    y = getDistance(height, 0 - offsetX)
  }

  return { x, y }
}

export default WatermarkPdf
