/* eslint-disable no-console */
/* eslint-disable no-use-before-define */

const Bundler = require('parcel-bundler')
const path = require('path')
const fs = require('fs')
const AdmZip = require('adm-zip')

const onError = (err) => {
  console.log('There was an error bundling the poster.')
  console.error(err)
}

const onBundled = () => {
  const zip = new AdmZip()
  const targetPath = path.join(__dirname, '..', 'IPDD Poster.zip')
  const sourcePath = path.join(__dirname, '..', 'dist')
  const fallbackPath = path.join(__dirname, '..', 'src', 'fallback')
  if (fs.existsSync(targetPath)) fs.unlinkSync(targetPath)
  zip.addLocalFolder(sourcePath)
  zip.addLocalFolder(fallbackPath, 'fallback')
  zip.writeZip(targetPath)
}

const init = async () => {
  const entryPoint = path.join(__dirname, '..', 'src', 'index.html')

  const options = {
    outDir: './dist',
    outFile: 'index.html',
    publicUrl: '.',
    watch: false,
    cache: false,
    minify: true,
    scopeHoist: false,
    target: 'browser',
    logLevel: 3,
    hmr: true,
    hmrPort: 0,
    sourceMaps: true,
    detailedReport: false,
    autoInstall: true,
  }

  const bundler = new Bundler(entryPoint, options)
  bundler.on('bundled', onBundled)
  bundler.on('buildError', onError)
  await bundler.bundle()
}

init()
