const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const width = 700;
const height = 400;
const backgroundColour = '#ffffff';
const chartCallback = (ChartJS) => {
  console.log("chart built");
};

const chartJSNodeCanvas = new ChartJSNodeCanvas({ type: 'svg', width, height, backgroundColour, chartCallback, plugins: {
  requireLegacy: ['chartjs-plugin-datalabels']
}});

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    borderWidth: 1,
  }]
}

const createImage = async () => {
  const configuration = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        }
      },
      plugins: {
        datalabels: { // This code is used to display data values
          anchor: 'end',
          align: 'top',
          formatter: Math.round,
          font: {
              weight: 'bold',
              size: 12
          }
        }
      },
    }
  }

  const image = await chartJSNodeCanvas.renderToBufferSync(configuration);
  
  return image;
}

module.exports = {
  createImage
}