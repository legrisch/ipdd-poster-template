/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const Parcel = require('@parcel/core').default
const path = require('path')
const fs = require('fs')
const AdmZip = require('adm-zip')
const rimraf = require('rimraf')

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
    zip.addLocalFolder(fallbackPath, 'fallback')
    zip.writeZip(targetPath)
  } catch (err) {
    console.log('There was an error bundling the poster.')
    console.error(err)
  }
}

init()
