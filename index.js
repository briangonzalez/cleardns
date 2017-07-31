const os = require('os')
const execSync = require('child_process').execSync

function getClearDNSCommand ({ type, release }) {
  // Taken from: https://coolestguidesontheplanet.com/clear-the-local-dns-cache-in-osx/
  const osxCommands = {
    '16.x.x': 'sudo killall -HUP mDNSResponder', // 10.12.x
    '15.x.x': 'sudo killall -HUP mDNSResponder', // 10.11.x
    '14.5.x': 'sudo killall -HUP mDNSResponder', // 10.10.5
    '14.4.x': 'sudo killall -HUP mDNSResponder', // 10.10.4
    '14.x.x': 'sudo discoveryutil mdnsflushcache', // 10.10.0-10.10.3
    '13.x.x': ' sudo killall -HUP mDNSResponder', // 10.9.x
    '12.x.x': 'sudo killall -HUP mDNSResponder', // 10.8.x
    '11.x.x': 'sudo killall -HUP mDNSResponder', // 10.7.x
    '10.x.x': 'sudo dscacheutil -flushcache', // 10.6.x
    '9.x.x': 'sudo dscacheutil -flushcache' // 9.x.x
  }

  if (type === 'Darwin') {
    const versionParts = release.split('.')
    const major = `${versionParts.slice(0, 2).join('.')}.x` // 16.4.x
    const minor = `${versionParts.slice(0, 1).join('.')}.x.x` // 16.x.x
    const cmd = osxCommands[major] || osxCommands[minor]
    return cmd
  } else if (type === 'Windows_NT') {
    return 'ipconfig /flushdns'
  } else {
    return '/etc/init.d/named restart || /etc/init.d/nscd restart'
  }
}

function clear () {
  const cmd = getClearDNSCommand({ type: os.type(), release: os.release() })
  return execSync(cmd)
}

module.exports.getClearDNSCommand = getClearDNSCommand
module.exports.clear = clear
