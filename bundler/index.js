/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const Parcel = require('@parcel/core').default
const path = require('path')
const fs = require('fs')
const AdmZip = require('adm-zip')
const rimraf = require('rimraf')
const sizeOf = require('image-size')

const generateFallbackJson = (fallbackPath) => {
  // Read fallback images dir
  const files = fs.readdirSync(fallbackPath)

  // valid fallback images extensions
  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif']

  const json = files
    // filter by extension
    .filter((file) => {
      const extension = file.split('.').pop()
      const isImage = imageExtensions.includes(extension)
      if (!isImage && file !== 'fallback.json') {
        console.warn(`Warning: file '${file}' is not an image and will not be added to the bundle`)
      }
      return isImage
    })

    // get dimensions
    .map((image) => ({
      filename: image,
      ...sizeOf(path.join(fallbackPath, image)),
    }))

    // filter by being a square image
    .filter((image) => {
      const isSquare = image.width === image.height
      if (!isSquare) {
        console.warn(`Warning: fallback image '${image.filename}' is not square and will not be added to the bundle`)
      }
      return isSquare
    })

  if (json.length === 0) throw new Error('No fallback images provided.')

  // write json to disk to bundle
  fs.writeFileSync(path.join(fallbackPath, 'fallback.json'), JSON.stringify(json))
  return json
}

const addFallbackImages = (zip, fallbackImages, fallbackPath) => {
  fallbackImages.forEach((image) => {
    zip.addLocalFile(path.join(fallbackPath, image.filename), 'fallback')
  })
  zip.addLocalFile(path.join(fallbackPath, 'fallback.json'), 'fallback')
}

const removeFallbackJson = (fallbackPath) => {
  fs.unlinkSync(path.join(fallbackPath, 'fallback.json'))
}

const init = async () => {
  // clean dist
  const distDir = path.join(__dirname, '..', 'dist')
  rimraf.sync(distDir)

  // set entry point
  const entryPoint = path.join(__dirname, '..', 'src', 'index.html')

  // initialize bundler
  try {
    const bundler = new Parcel({
      entries: entryPoint,
      defaultConfig: require.resolve('@parcel/config-default'),
      disableCache: true,
      minify: true,
      sourceMaps: false,
      mode: 'production',
      detailedReport: true,
    })

    // run bundler
    await bundler.run()

    // make zip
    const zip = new AdmZip()
    const targetPath = path.join(__dirname, '..', 'IPDD Poster.zip')
    const sourcePath = path.join(__dirname, '..', 'dist')
    const fallbackPath = path.join(__dirname, '..', 'src', 'fallback')
    if (fs.existsSync(targetPath)) fs.unlinkSync(targetPath)
    zip.addLocalFolder(sourcePath)
    const fallbackImages = generateFallbackJson(fallbackPath)
    addFallbackImages(zip, fallbackImages, fallbackPath)
    removeFallbackJson(fallbackPath)
    zip.writeZip(targetPath)
  } catch (err) {
    console.log('There was an error bundling the poster.')
    console.error(err)
  }
}

init()
