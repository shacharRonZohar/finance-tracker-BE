import fs from 'fs'

const logsDir = './logs'
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

export const logger = {
  debug(...args: any[]) {
    if (process.env.NODE_NEV === 'production') return
    doLog('DEBUG', ...args)
  },
  info(...args: any[]) {
    doLog('INFO', ...args)
  },
  warn(...args: any[]) {
    doLog('WARN', ...args)
  },
  error(...args: any[]) {
    doLog('ERROR', ...args)
  },
}

//define the time format
function getTime() {
  let now = new Date()
  return now.toLocaleString('he')
}

function isError(e: any) {
  return e && e.stack && e.message
}

function doLog(level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR', ...args: any[]) {
  const strs = args.map(arg => (typeof arg === 'string' || isError(arg) ? arg : JSON.stringify(arg)))

  const line = `${getTime()} - ${level} - ${strs.join(' | ')}\n`
  fs.appendFile('./logs/backend.log', line, err => {
    if (err) console.log('FATAL: cannot write to log file')
  })
}
