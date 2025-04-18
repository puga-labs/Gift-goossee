// Mock для detect-libc, используется только на клиенте для предотвращения ошибок сборки
module.exports = {
  family: null,
  version: null,
  isNonGlibcLinux: false,
  isGlibc: false,
  isMusl: false
}; 