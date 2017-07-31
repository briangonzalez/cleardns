const { getClearDNSCommand } = require('./')

const typesAndReleases = [
  { type: 'Darwin', release: '16.6.0' },
  { type: 'Darwin', release: '16.3.0' },
  { type: 'Darwin', release: '16.7.0' },
  { type: 'Darwin', release: '15.6.0' },
  { type: 'Darwin', release: '14.6.0' },
  { type: 'Darwin', release: '13.10.0' },
  { type: 'Darwin', release: '12.9.0' },
  { type: 'Darwin', release: '11.3.0' },
  { type: 'Darwin', release: '10.2.0' },
  { type: 'Darwin', release: '9.10.0' },
  { type: 'Windows_NT', release: '10.0.0' },
  { type: 'Linux', release: '0.0.0' }
]

test('the correct command should be returned', () => {
  const cmds = typesAndReleases.map(i => getClearDNSCommand(i))
  const expectedCmds = [
    'sudo killall -HUP mDNSResponder',
    'sudo killall -HUP mDNSResponder',
    'sudo killall -HUP mDNSResponder',
    'sudo killall -HUP mDNSResponder',
    'sudo discoveryutil mdnsflushcache',
    ' sudo killall -HUP mDNSResponder',
    'sudo killall -HUP mDNSResponder',
    'sudo killall -HUP mDNSResponder',
    'sudo dscacheutil -flushcache',
    'sudo dscacheutil -flushcache',
    'ipconfig /flushdns',
    '/etc/init.d/named restart || /etc/init.d/nscd restart'
  ]

  expect(cmds).toEqual(expectedCmds)
})
