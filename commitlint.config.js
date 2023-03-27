// @see: https://cz-git.qbenben.com/zh/guide
/** @type {import('cz-git').UserConfig} */
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const scopes = fs
  .readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name.replace(/s$/, ''))

// precomputed scope
const scopeComplete = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  .find((r) => ~r.indexOf('M  src'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1]
  ?.replace(/s$/, '')

/** @type {import('cz-git').UserConfig} */
module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
        'release'
      ]
    ]
  },
  prompt: {
    /** @use `yarn commit :f` */
    alias: {
      f: 'docs: fix typos',
      r: 'docs: update README',
      s: 'style: update code format',
      b: 'build: bump dependencies',
      c: 'chore: update config'
    },
    customScopesAlign: !scopeComplete ? 'top' : 'bottom',
    defaultScope: scopeComplete,
    scopes: [
      { name: '基础资料' },
      { name: '规则设置' },
      { name: '报价管理' },
      { name: '计费数据' },
      { name: '计费管理' },
      { name: '账单管理' },
      { name: '报表管理' },
      { name: '系统管理' },
      ...scopes
    ],
    allowEmptyIssuePrefixs: false,
    allowCustomIssuePrefixs: false,
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀（可选）:',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '请输入关联的禅道bug号 (可选) 例如: #31, #I3244 \n',
      confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
    },
    types: [
      { value: 'feat', name: 'feat:     🚀 新增功能 | A new feature', emoji: '🚀' },
      { value: 'fix', name: 'fix:       🧩 修复缺陷 | A bug fix', emoji: '🧩' },
      {
        value: 'docs',
        name: 'docs:      📝 文档更新 | Documentation only changes',
        emoji: ':memo:'
      },
      {
        value: 'style',
        name: 'style:     💄 代码格式 | Changes that do not affect the meaning of the code',
        emoji: ':lipstick:'
      },
      {
        value: 'refactor',
        name: 'refactor:  ♻️  代码重构 | A code change that neither fixes a bug nor adds a feature',
        emoji: ':recycle:'
      },
      {
        value: 'perf',
        name: 'perf:      ⚡️ 性能提升 | A code change that improves performance',
        emoji: ':zap:'
      },
      {
        value: 'test',
        name: 'test:      ✅ 测试相关 | Adding missing tests or correcting existing tests',
        emoji: ':white_check_mark:'
      },
      {
        value: 'build',
        name: 'build:     📦️ 构建相关 | Changes that affect the build system or external dependencies',
        emoji: ':package:'
      },
      {
        value: 'ci',
        name: 'ci:        🎡 持续集成 | Changes to our CI configuration files and scripts',
        emoji: ':ferris_wheel:'
      },
      { value: 'revert', name: 'revert:    🔨 回退代码 | Revert to a commit', emoji: ':hammer:' },
      {
        value: 'chore',
        name: 'chore:     ⏪️ 其他修改 | Other changes that do not modify src or test files',
        emoji: ':rewind:'
      }
    ],
    useEmoji: true,
    emojiAlign: 'center',
    themeColorCode: '',
    // 在 scope 选择的时候，会有 empty 和 custom 可以选择，顾名思义，选择 empty 表示 scope 缺省，如果选择 custom，则可以自己输入信息
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    // 指定跳过哪些步骤
    skipQuestions: ['body', 'breaking'],
    issuePrefixs: [{ value: 'closed', name: 'closed:   标记 bug 已完成' }],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: 'skip',
    customIssuePrefixsAlias: 'custom',
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultSubject: ''
  }
}
