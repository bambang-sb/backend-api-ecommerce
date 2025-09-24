module.exports = {
  // Tampilkan nama test dan deskripsi lebih detail
  verbose: true,  // Tampilkan setiap test case (bukan hanya summary)
  
  // Format output lebih clean dan colorful
  testEnvironment: 'node',  // Untuk Node.js/Express
  reporters: ['default'],
  
  // Suppress noise (seperti stack trace panjang)
  maxWorkers: '50%',  // Jalankan test paralel tapi tidak overload CPU
  silent: false,  // Jangan silent, tapi gunakan untuk dev
  
  // Format error lebih bagus (highlight diff)
  errorOnDeprecated: true,  // Warn deprecated API
 
      
};