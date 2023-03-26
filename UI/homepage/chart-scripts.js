  // Get the canvas element and create the chart context

  var ctx = document.getElementById(' lineChart').getContext('2d');
  
  // Define the data for the chart
  var data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Collected',
        data: [12, 19, 3, 5, 2, 3, 7],
        fill: false,
        borderColor: 'green'
      },
      {
        label: 'Distributed',
        data: [8, 12, 6, 10, 5, 8, 4],
        fill: false,
        borderColor: 'red'
      }
    ]
  };
  
  // Create the chart
  var  lineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
     

  
// Get the canvas element and create the chart context
var ctx = document.getElementById('barChart').getContext('2d');

// Define the data for the chart
var data = {
labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
datasets: [
  {
    label: 'Number of Units',
    data: [42, 7, 37, 6, 3, 1, 52, 8],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)'
    ],
    borderWidth: 1
  }
]
};

// Create the chart
var barChart = new Chart(ctx, {
type: 'bar',
data: data,
options: {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}
});

   


  // Get the canvas element and create the chart context
  var ctx = document.getElementById('pieChart').getContext('2d');
  
  // Define the data for the chart
  var data = {
    labels: ['Blood Collected', 'Blood Dumped'],
    datasets: [{
      data: [200, 30],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
    }]
  };
  
  // Create the chart
  var pieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      legend: {
        display: true,
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Daily Blood Collection and Disposal'
      }
    }
  });
     