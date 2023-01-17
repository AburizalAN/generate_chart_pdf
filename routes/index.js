const express = require('express');
const pdfService = require('../service/pdf-service');
const chartService = require('../service/chart-service');

const router = express.Router();
router.get('/invoice', (req, res, next) => {
  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment;filename=invoice.pdf'
  });

  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end()
  )
});

router.get('/chart-image', async (req, res, next) => {
  const chartImage = await chartService.createImage()

  console.log("image", chartImage);
  res.writeHead(200, {
    'Content-Type': 'image/jpeg',
    'Content-Disposition': 'attachment;filename=chart.jpg'
  })
  res.write(chartImage);
  res.end()
  next()
})

module.exports = router;