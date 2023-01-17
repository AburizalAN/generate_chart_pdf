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
  console.log("test test test")
  try {
    console.log("imageaaaa");
    const chartImage = await chartService.createImage()
  
    res.writeHead(200, {
      'Content-Type': 'image/svg+xml',
      'Content-Disposition': 'attachment;filename=chart.svg'
    })
    res.write(chartImage);
    res.end()
    next()
  } catch (err) {
    throw (err)
    console.log('err', err)
  }
})

module.exports = router;