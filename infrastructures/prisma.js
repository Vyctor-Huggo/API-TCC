const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

prisma.$on('query', (e) => {
  console.log('\x1b[36m%s\x1b[0m', '🔍 QUERY:', e.query);
  console.log('📊 Duration:', e.duration, 'ms');
  console.log('📦 Params:', e.params);
});

prisma.$on('info', (e) => {
  console.log('ℹ️ Info:', e.message);
});

prisma.$on('warn', (e) => {
  console.warn('⚠️ Warn:', e.message);
});

prisma.$on('error', (e) => {
  console.error('❌ Error:', e.message);
});



module.exports = prisma;
