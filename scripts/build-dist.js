const { execSync } = require('child_process');
const fs = require('fs')
const path = require('path')

const archiver = require('archiver')
const ncp = require('ncp').ncp

const package = require('../package.json')

const cp = (src, dest) => {
  return new Promise((resolve, reject) => {
    ncp(src, dest, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

(async () => {
  try {
    console.log('Building app…')
    execSync('npm run build', { stdio: 'ignore' })

    await fs.promises.rm('tmp', { recursive: true, force: true })
    fs.mkdirSync('tmp')

    process.chdir('tmp')

    console.log('Copying files…')
    await Promise.all([
      cp(path.resolve(process.cwd(), '..', 'package.json'), 'package.json'),
      cp(path.resolve(process.cwd(), '..', 'package-lock.json'), 'package-lock.json'),
      cp(path.resolve(process.cwd(), '..', 'dist'), 'dist'),
      cp(path.resolve(process.cwd(), '..', 'config'), 'config'),
      fs.promises.writeFile('.env', new Uint8Array(Buffer.from('NODE_ENV=production\nPORT=8000\n')))
    ]).then(() => {
      // Uninstalls all dev dependencies, which removes them from package-lock.json
      // npm uninstall has the side effect of installing remaining packages if there is no node_modules
      console.log('Installing dependencies…')
      execSync(`npm r ${Object.keys(package.devDependencies).join(' ')}`, { stdio: 'ignore' })
    })

    console.log('Creating new package.json…')
    await fs.promises.writeFile('package.json', new Uint8Array(Buffer.from(JSON.stringify({
      ...package,
      main: 'dist/index.js',
      scripts: {
        start: 'node .'
      },
      devDependencies: {}
    }))))
    execSync(`npm i`, { stdio: 'ignore' }) // Formats package.json

    console.log('Creating zip archive…')
    const zip = archiver('zip', {
      zlib: { level: 9 }
    })
    zip.on('error', function(err) {
      throw err
    })
    const zipStream = fs.createWriteStream(path.resolve(process.cwd(), '..', `${package.name || 'app'}.zip`))
    zip.pipe(zipStream)
    zip.directory('../tmp', false)
    await zip.finalize()

    console.log('Creating tarball…')
    const tarball = archiver('tar', {
      gzipOptions: { level: 9 }
    })
    tarball.on('error', function(err) {
      throw err
    })
    const tarballStream = fs.createWriteStream(path.resolve(process.cwd(), '..', `${package.name || 'app'}.tar.gz`))
    tarball.pipe(tarballStream)
    tarball.directory('../tmp', false)
    await tarball.finalize()
  } catch (error) {
    console.log('Aborting due to error…')
    console.error(error)
  } finally {
    console.log('Cleaning up…')
    process.chdir('..')
    await fs.promises.rm('tmp', { recursive: true, force: true })

    console.log('Done')
  }
})()
