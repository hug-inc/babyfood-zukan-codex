import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const root = path.resolve(process.argv[2] || 'wordpress-theme/rinyushoku-zukan')
const required = ['style.css', 'index.php', 'functions.php', 'header.php', 'footer.php', 'front-page.php', 'theme.json']
const failures = []

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing required file: ${file}`)
}

const style = fs.readFileSync(path.join(root, 'style.css'), 'utf8')
if (!/Theme Name:\s*離乳食ずかん/.test(style)) failures.push('style.css is missing the expected Theme Name header')
if (!/Text Domain:\s*rinyushoku-zukan/.test(style)) failures.push('style.css is missing the text domain')

JSON.parse(fs.readFileSync(path.join(root, 'theme.json'), 'utf8'))
execFileSync(process.execPath, ['--check', path.join(root, 'assets/js/theme.js')], { stdio: 'inherit' })

const files = fs.readdirSync(root, { recursive: true })
  .filter((file) => typeof file === 'string' && file.endsWith('.php'))

for (const file of files) {
  const source = fs.readFileSync(path.join(root, file), 'utf8')
  const opens = (source.match(/<\?php/g) || []).length
  const closes = (source.match(/\?>/g) || []).length
  if (closes > opens) failures.push(`${file}: more PHP closing tags than opening tags`)

  // Lightweight delimiter check after strings and comments are removed.
  const blocks = [...source.matchAll(/<\?php([\s\S]*?)(?:\?>|$)/g)].map((match) => match[1]).join('\n')
  const php = blocks
    .replace(/'(?:\\.|[^'\\])*'/g, "''")
    .replace(/"(?:\\.|[^"\\])*"/g, '""')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/#.*$/gm, '')
  const pairs = { ')': '(', ']': '[', '}': '{' }
  const stack = []
  for (const character of php) {
    if ('([{'.includes(character)) stack.push(character)
    if (')]}'.includes(character) && stack.pop() !== pairs[character]) {
      failures.push(`${file}: unbalanced delimiter near ${character}`)
      break
    }
  }
  if (stack.length) failures.push(`${file}: unclosed delimiter ${stack.at(-1)}`)
}

const css = fs.readFileSync(path.join(root, 'assets/css/theme.css'), 'utf8')
const cssBalance = [...css].reduce((total, char) => total + (char === '{' ? 1 : char === '}' ? -1 : 0), 0)
if (cssBalance !== 0) failures.push(`theme.css: unbalanced braces (${cssBalance})`)
if (/\.empty-state;/.test(css)) failures.push('theme.css contains a malformed .empty-state selector')

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Theme validation passed: ${root}`)
console.log(`PHP templates checked: ${files.length}`)
