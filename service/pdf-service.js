const PDFDocument = require('pdfkit-table');
const chartService = require('./chart-service');


const buildPDF = async (dataCallback, endCallback) => {
  const chartImage = await chartService.createImage()

  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  doc.on('data', dataCallback);
  doc.on('end', endCallback);
  doc
    .fontSize(20)
    .text("Overview")
    .moveDown(1);
  doc
    .fontSize(14)
    .text("Trend Total User (Trend dalam 12 bulan terakhir)")
    .moveDown(0.5)
  doc.image(chartImage, { fit: [400, 500] }).moveDown(1);;
  const table = {
    subtitle: "Subtitle",
    headers: [ "Country", "Conversion rate", "Trend" ],
    rows: [
      [ "Switzerland", "12%", "+1.12%" ],
      [ "France", "67%", "-0.98%" ],
      [ "England", "33%", "+4.44%" ],
    ],
  };
  // A4 595.28 x 841.89 (portrait) (about width sizes)
  // width
  await doc.table(table, { 
    width: 300,
  });
  // or columnsSize
  await doc.table(table, { 
    columnsSize: [ 200, 100, 100 ],
  });
  doc.end()
}

module.exports = { buildPDF }