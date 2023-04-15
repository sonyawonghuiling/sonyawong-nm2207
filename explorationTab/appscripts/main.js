//Sticky Navigation Bar Function
window.onscroll = function() {stickyBar()};
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
function stickyBar() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
}}

//Chart for Singapore Population Trend Over the Years
//Add Data Array for each population type 
var years1 = [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022];
var total1 = [3047132,3135083,3230698,3313471,3419048,3524506,3670704,3796038,3927213,3958723,4027887,4138012,4175950,4114826,4166664,4265762,4401365,4588599,4839396,4987573,5076732,5183688,5312437,5399162,5469724,5535002,5607283,5612253,5638676,5703569,5685807,5453566,5637022];
var resident1 = [2735868,2794704,2849754,2904547,2959350,3013515,3068132,3123403,3180018,3229681,3273363,3325902,3382944,3366891,3413266,3467814,3525894,3583082,3642659,3733876,3771721,3789251,3818205,3844751,3870739,3902690,3933559,3965796,3994283,4026209,4044210,3986842,4073239];
var citizen1 = [2623736,2664625,2702430,2742826,2784168,2823707,2860419,2894794,2929731,2958379,2985886,3017092,3043397,3032541,3057087,3081001,3107924,3133848,3164438,3200693,3230719,3257228,3285140,3313507,3343030,3375023,3408943,3439177,3471936,3500940,3523191,3498191,3553749];
var pr1 = [112132,130079,147324,161720,175182,189808,207712,228608,250287,271302,287477,308810,339547,334350,356179,386813,417970,449234,478221,533183,541002,532023,533065,531244,527709,527667,524616,526619,522347,525269,521019,488651,519490];
var nonpr1 = [311264,340379,380944,408924,459698,510991,602572,672635,747195,729042,754524,812110,793006,747935,753398,797948,875471,1005517,1196737,1253697,1305011,1394437,1494232,1554411,1598985,1632312,1673724,1646457,1644393,1677360,1641597,1466724,1563783];

//Assigning the data and settings for the first line chart
const popLineData = {
  labels: years1,
  datasets: [
    { 
      data: total1,
      label: "Total Population",
      backgroundColor: "rgb(38, 84, 124)",
      borderColor: "rgb(38, 84, 124)",
      fill: true
    }]
}

//Initialise new Chart and where to draw it using canvas id.
const popLine = new Chart("populationType", {
  type: 'line',
  data: popLineData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1/1,
    scales: {
      y: {
        beginAtZero: 0,
        stacked: true,
      }
    },
    legend: {
      display: true,
      position: "left",
      labels: {
        fontColor: "rgb(0,0,0)",
        fontFamily: "Avenir",
        fontSize: 15,
      }
    }
  }
})

//Using an if...else function to create a button that can toggle between 2 functions
clickStatus1 = 0
function changePopLine() {
  if (clickStatus1 === 0) {
    stackedPopLine();
  } else {
    normalPopLine(); 
  }
}

//Function to show a stacked area chart of population type trend
function stackedPopLine() {
  popLine.data.datasets.pop();
  popLine.data.datasets.push(
      { 
      data: pr1,
      label: "Permanent Residents",
      backgroundColor: "rgb(0, 189, 157)",
      borderColor: "rgb(0, 189, 157)",
      fill: true
    },
    { 
      data: nonpr1,
      label: "Non-Residents",
      backgroundColor: "rgb(88, 81, 145)",
      borderColor: "rgb(88, 81, 145)",
      fill: true
    },
    { 
      data: citizen1,
      label: "Citizens",
      backgroundColor: "rgb(255, 132, 132)",
      borderColor: "rgb(255, 132, 132)",
      fill: true
    },
    {
      data: resident1,
      label: "Total Residents",
      backgroundColor: "rgb(255, 209, 102)",
      borderColor: "rgb(255, 209, 102)",
      fill: true
    }
  );
  popLine.update();
  //Update the click counter and the button HTML for users to toggle back to the previous chart
  clickStatus1++;
  console.log(clickStatus1);
  document.getElementById("changePopLine").innerHTML = "Back to Total Population.";
  console.log("Showing STACKED AREA CHART");
}

//Function to change the stacked area view back to the original total population chart.
function normalPopLine() {
  popLine.data.datasets.pop();
  popLine.data.datasets.pop();
  popLine.data.datasets.pop();
  popLine.data.datasets.pop();
  popLine.data.datasets.push(
    { 
      data: total1,
      label: "Total Population",
      backgroundColor: "rgb(38, 84, 124)",
      borderColor: "rgb(38, 84, 124)",
      fill: true
    }
  )
  popLine.update();
  //Update the click counter and button inner HTML again for users to toggle to the other view
  clickStatus1--;
  console.log(clickStatus1);
  document.getElementById("changePopLine").innerHTML = "View Population Make-Up.";
  console.log("Showing Total Population View");
}

//Add an event listener to the button to execute the if...else function
document.getElementById("changePopLine").addEventListener("click", changePopLine);


//Pie Chart for Population Ratio
//Assign data and settings for the pie chart of population ratio
const popPieData = {
  labels: [
    'Citizens',
    'Permanent Residents',
    'Non-PRs',
  ],
  datasets: [{
    label: 'Average number of people',
      data: [3121500, 381414, 1043861],
      backgroundColor: [
        "rgb(255, 132, 132)", "rgb(0, 189, 157)", "rgb(88, 81, 145)"],
      hoverOffset: 4
    }]
};

//Initialise new pie chart into canvas id location
const popPie = new Chart("populationPie", {
  type: "pie",
  data: popPieData,
  options: { 
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1/1,
    legend: {
      display: true,
      position: 'left',
      labels: {
        fontColor: "rgb(0,0,0)",
        fontFamily: "Avenir",
        fontSize: 15,
      }
    }
  }
});


//Histogram to show Latest Age Distribution in Singapore
//Create data array
var ageBracket = ["0 - 4",  "5 - 9",  "10 - 14",  "15 - 19",  "20 - 24",  "25 - 29",  "30 - 34",  "35 - 39",  "40 - 44",  "45 - 49",  "50 - 54",  "55 - 59",  "60 - 64",  "65 - 69",  "70 - 74",  "75 - 79",  "80 - 84",  "85 - 89", "90 & Over"];
var agesNumber = [178085,201360,202379,206749,233303,280082,317153,290981,299871,304317,292984,299835,288007,247930,188584,105792,74937,37948,22942];

//Create a variable to store the data for the chart
const ageData = {
  labels: ageBracket,
  datasets: [
    {
      data: agesNumber,
      label: "Number of Residents",
      backgroundColor: "rgba(88, 81, 145, 0.8)",
      borderColor: "rgb(88, 81, 145)",
    }]
}

//Initialise bar chart and convert to histogram
const ageBarChart = new Chart ("ageChart", {
  type: "bar",
  data: ageData,
  options: { 
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1/1,
    legend: {
      display: true,
      position: 'left',
      labels: {
        fontColor: "rgb(0,0,0)",
        fontFamily: "Avenir",
        fontSize: 15,
      },
    },
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 1.3,
        ticks: {
            max: 4,
        }
     }, {
        display: true,
        ticks: {
            autoSkip: false,
            max: 4,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
})

//Youth vs Elderly Line Trend
//Create the data array first
year2 = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022];
elderlyAge = [235296,243639,251024,248638,264541,279693,294726,305586,315790,330132,338387,352645,378636,404437,431601,459715,487570,516692,547854,581680,614368,639008,678133];
youthAge = [928917,934943,938369,930145,930036,930240,932712,935757,934163,930626,918159,897642,885178,870309,855292,845317,835935,827454,817644,813278,803440,782101,788573]

/*
//Assign data values to its properties for the chart
const ageLineData  = {
  labels: year2,
  datasets: [{
    label: 'Elderly aged 65 & Above',
    data: elderlyAge,
    fill: false,
    backgroundColor: 'rgb(255, 209, 102)',
    borderColor: 'rgb(255, 209, 102)'
  }, {
    label: 'Youth aged 19 & Below',
    data: youthAge,
    fill: false,
    backgroundColor: "rgb(0, 189, 157)",
    borderColor: "rgb(0, 189, 157)",
  }]
}

//Initialise new age line chart to canvas id
const ageLineChart = new Chart ("deathChart", {
  type: 'line',
  data: ageLineData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1/1,
    legend: {
      display: true,
      position: "left",
      labels: {
        fontColor: "rgb(0,0,0)",
        fontFamily: "Avenir",
        fontSize: 15,
      }
    }
  }
})*/

//Using an if...else function to create another button that can toggle between 2 functions
clickStatus2 = 0
function changeAgeView() {
  if (clickStatus2 === 0) {
    compareAgeLine();
  } else {
    normalAgeBar(); 
  }
}

function compareAgeLine() {
  //clear canvas
  ageBarChart.clear();

  //create the new view of chart
  const ageLineData  = {
    labels: year2,
    datasets: [{
      label: 'Elderly aged 65 & Above',
      data: elderlyAge,
      fill: false,
      backgroundColor: 'rgb(255, 209, 102)',
      borderColor: 'rgb(255, 209, 102)'
    }, {
      label: 'Youth aged 19 & Below',
      data: youthAge,
      fill: false,
      backgroundColor: "rgb(0, 189, 157)",
      borderColor: "rgb(0, 189, 157)",
    }]
  };
  
  //Initialise new age line chart to canvas id
  const ageLineChart = new Chart ("ageChart", {
    type: 'line',
    data: ageLineData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1/1,
      legend: {
        display: true,
        position: "left",
        labels: {
          fontColor: "rgb(0,0,0)",
          fontFamily: "Avenir",
          fontSize: 15,
        }
      }
    }
  });
  //Update the click counter and the button HTML for users to toggle back to the previous chart
  clickStatus2++;
  console.log(clickStatus2);
  document.getElementById("changeAgeView").innerHTML = "View Age Distribution.";
  console.log("Showing COMPARISON BETWEEN YOUTH AND ELDERLY");
}

//Second function to change new chart back
function normalAgeBar() {
  //Initialise bar chart and convert to histogram
  const ageBarChart = new Chart ("ageChart", {
    type: "bar",
    data: ageData,
    options: { 
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1/1,
      legend: {
        display: true,
        position: 'left',
        labels: {
          fontColor: "rgb(0,0,0)",
          fontFamily: "Avenir",
          fontSize: 15,
        },
      },
      scales: {
        xAxes: [{
          display: false,
          barPercentage: 1.3,
          ticks: {
            max: 4,
          }
        }, {
          display: true,
          ticks: {
            autoSkip: false,
            max: 4,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
  //Update the click counter and button inner HTML again for users to toggle to the other view
  clickStatus2--;
  console.log(clickStatus2);
  document.getElementById("changeAgeView").innerHTML = "View Age Discrepancy.";
  console.log("Showing HISTOGRAM OF AGE DISTRIBUTION");
}

//Add an event listener to the button to execute the if...else function
document.getElementById("changeAgeView").addEventListener("click", changeAgeView);



















































