// Sticky Navigation Bar Function, sticks to top of the page

window.onscroll = function() {stickyBar()};
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
function stickyBar() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
}}




// Interactive Map for the Singapore population
var map = L.map('popMap', {center: [1.3521, 103.8198], zoom: 11});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Ternary operators to check which colour to use for different population densities
function colourPopDens(d) {
  return d > 35000 ? '#b30000' :
      d > 25000 ? '#e34a33' :
          d > 20000 ? '#fc8d59' :
              d > 10000 ? '#fdcc8a' :
                  d > 1 ? '#fef0d9' :
                      '#fff';
}

function style(feature) {
  return {
      fillColor: colourPopDens(feature.properties.Pop_dens),
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 0.65
  };
}

function popUp(feature, layer) {
  layer.bindPopup(`
<b>Subzone: </b> ${feature.properties.SUBZONE_N} <br>
<b>Planning Area: </b> ${feature.properties.PLN_AREA_N} <br>
<b>Population density: </b> ${(feature.properties.Pop_dens).toFixed(1)} 
`)
  layer.on('click', function () { layer.openPopup(); })
}

L.geoJSON(singaporePopulation, {
  style: style,
  onEachFeature: popUp
}).addTo(map);




// Chart for Singapore Population Trend Over the Years

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
      }
    },
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          color: "rgb(0,0,0)",
          font: {
            size: 15,
            family: "Avenir",
          }
        }
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
  //console.log(clickStatus1);
  document.getElementById("changePopLine").innerHTML = "Back to Total Population.";
  //console.log("Showing STACKED AREA CHART");
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
  //console.log(clickStatus1);
  document.getElementById("changePopLine").innerHTML = "View Population Make-Up.";
  //console.log("Showing Total Population View");
}

//Add an event listener to the button to execute the if...else function
document.getElementById("changePopLine").addEventListener("click", changePopLine);




// Pie Chart for Population Ratio

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
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          color: "rgb(0,0,0)",
          font: {
            size: 15,
            family: "Avenir",
          }
        }
      }
    }
  }
});




// Histogram to show Latest Age Distribution in Singapore

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
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          color: "rgb(0,0,0)",
          font: {
            size: 15,
            family: "Avenir",
          }
        }
      }
    },
    scales: {
      x: [{
        display: false,
        barPercentage: 1,
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

//Add on to the data array by creating new variables for male and female distributions, use same ageBracket var.
var maleAge = [90906,103270,103066,105521,119622,139727,153268,137395,142574,147359,142735,149046,143437,121815,90038,48203,31019,14230,6981]
var femaleAge = [87179,98090,99313,101228,113681,140355,163885,153586,157297,156958,150249,150789,144570,126115,98546,57589,43918,23718,15961]

//Create data object for both male and female graphs
const ageMaleData = {
  labels: ageBracket,
  datasets: [
    {
      data: maleAge,
      label: "Number of Males",
      backgroundColor: "rgba(38, 84, 124, 0.8)",
      borderColor: "rgb(38, 84, 124)",
    }]
}

const ageFemaleData = {
  labels: ageBracket,
  datasets: [
    {
      data: femaleAge,
      label: "Number of Females",
      backgroundColor: "rgba(255, 132, 132, 0.8)",
      borderColor: "rgb(255, 132, 132)",
    }]
}

//Functions attached to each button that allows users to toggle between the 3 different views
//View 1: Total Age Distribution
function ageTotalChart() {
  ageBarChart.data = ageData;
  ageBarChart.update();
  //console.log("showing TOTAL AGE DISTRIBUTION");
}
document.getElementById("changeToFullDist").addEventListener("click", ageTotalChart);

//View 2: Male Age Distribution
function ageMaleChart() {
  ageBarChart.data = ageMaleData;
  ageBarChart.update();
  //console.log("showing MALE AGE DISTRIBUTION");
}
document.getElementById("changeToMaleChart").addEventListener("click", ageMaleChart);

//View 3: Female Age Distribution
function ageFemaleChart() {
  ageBarChart.data = ageFemaleData;
  ageBarChart.update();
  //console.log("showing FEMALE AGE DISTRIBUTION");
}
document.getElementById("changeToFemaleChart").addEventListener("click", ageFemaleChart);




//Youth vs Elderly Line Trend
//Create the data array first
year2 = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022];
elderlyAge = [235296,243639,251024,248638,264541,279693,294726,305586,315790,330132,338387,352645,378636,404437,431601,459715,487570,516692,547854,581680,614368,639008,678133];
youthAge = [928917,934943,938369,930145,930036,930240,932712,935757,934163,930626,918159,897642,885178,870309,855292,845317,835935,827454,817644,813278,803440,782101,788573]

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
const ageLineChart = new Chart ("ageLinePlot", {
  type: 'line',
  data: ageLineData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1/1,
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          color: "rgb(0,0,0)",
          font: {
            size: 15,
            family: "Avenir",
          }
        }
      }
    }

  }
})




// Scatter Plot for Life Expectancy

//Create data object for the overall life expectancy view
const lifeExpData = {
  datasets: [{
    label: 'Total Life Expectancy',
    data: [
      {x:2021  , y:83.5},
      {x:2020	, y:	83.7},
      {x:2019	, y:	83.7},
      {x:2018	, y:	83.4},
      {x:2017	, y:	83.2},
      {x:2016	, y:	83},
      {x:2015	, y:	82.9},
      {x:2014	, y:	82.6},
      {x:2013	, y:	82.4},
      {x:2012	, y:	82.1},
      {x:2011	, y:	81.9},
      {x:2010	, y:	81.7},
      {x:2009	, y:	81.4},
      {x:2008	, y:	80.9},
      {x:2007	, y:	80.6},
      {x:2006	, y:	80.3},
      {x:2005	, y:	80.1},
      {x:2004	, y:	79.6},
      {x:2003	, y:	79.1},
      {x:2002	, y:	78.6},
      {x:2001	, y:	78.3},
      {x:2000	, y:	78}
    ],
    backgroundColor: 'rgb(0, 189, 157)'
  }],
};

//Create data object for the gendered view
const lifeExpGender = {
  datasets: [{
    label: 'Male Life Expectancy',
    data: [
      {x:	2021	, y:	81.1},
      {x:	2020	, y:	81.3},
      {x:	2019	, y:	81.4},
      {x:	2018	, y:	81.2},
      {x:	2017	, y:	80.9},
      {x:	2016	, y:	80.7},
      {x:	2015	, y:	80.5},
      {x:	2014	, y:	80.3},
      {x:	2013	, y:	80.1},
      {x:	2012	, y:	79.8},
      {x:	2011	, y:	79.5},
      {x:	2010	, y:	79.2},
      {x:	2009	, y:	78.9},
      {x:	2008	, y:	78.4},
      {x:	2007	, y:	78.1},
      {x:	2006	, y:	77.8},
      {x:	2005	, y:	77.6},
      {x:	2004	, y:	77.1},
      {x:	2003	, y:	76.6},
      {x:	2002	, y:	76.6},
      {x:	2001	, y:	76.3},
      {x:	2000	, y:	76}
    ],
    backgroundColor: 'rgb(38, 84, 124)'
  }, {
    label: 'Female Life Expectancy',
    data: [
      {x:	2021	, y:	85.9	},
      {x:	2020	, y:	85.9	},
      {x:	2019	, y:	85.9	},
      {x:	2018	, y:	85.5	},
      {x:	2017	, y:	85.4	},
      {x:	2016	, y:	85.1	},
      {x:	2015	, y:	85.1	},
      {x:	2014	, y:	84.8	},
      {x:	2013	, y:	84.5	},
      {x:	2012	, y:	84.3	},
      {x:	2011	, y:	84.1	},
      {x:	2010	, y:	84	},
      {x:	2009	, y:	83.7	},
      {x:	2008	, y:	83.3	},
      {x:	2007	, y:	82.9	},
      {x:	2006	, y:	82.6	},
      {x:	2005	, y:	82.5	},
      {x:	2004	, y:	82	},
      {x:	2003	, y:	81.6	},
      {x:	2002	, y:	80.6	},
      {x:	2001	, y:	80.3	},
      {x:	2000	, y:	80	}
    ],
    backgroundColor: 'rgb(255, 132, 132)'
  }],
};

//Intialise the Life Expectancy Chart on the canvas id
const lifeExpChart = new Chart ("lifeExpChart", {
  type: 'scatter',
  data: lifeExpData,
  options: {
    scales: {
      x: {
        display: false,
        type: 'linear',
        position: 'bottom'
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1/1,
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          color: "rgb(0,0,0)",
          font: {
            size: 15,
            family: "Avenir",
          }
        }
      }
    }
  }
})


//Functions attached to each button that allows users to toggle between the 3 different views
//View 1: Total Life Expectancy
function totalLifeExp() {
  lifeExpChart.data = lifeExpData;
  lifeExpChart.update();
  //console.log("showing Overall Life Expectancy");
}
document.getElementById("totalLifeExp").addEventListener("click", totalLifeExp);

//View 2: Gender Life Expectancy 
function genderLifeExp() {
  lifeExpChart.data = lifeExpGender ;
  lifeExpChart.update();
  //console.log("Showing Life Expectancy by Gender");
}
document.getElementById("genderLifeExp").addEventListener("click", genderLifeExp);

document.getElementById("elderlyLifeExp").addEventListener("click", updateToElderlyView);

clickStatus2 = 0
function updateToElderlyView() {
  if (clickStatus2 === 0) {
    elderlyLifeExp();
  }
  else {
    backToLifeExp(); 
  }
}

let has65years = false;

//View 3: Life Expectancy at 65 years old
function elderlyLifeExp() {
  lifeExpChart.data.datasets.push( {
    label: 'Life Expectancy at Age 65 Years',
    data: [
      {x:	2021	, y:	21.2	},
		  {x:	2020	, y:	21.3	},
  		{x:	2019	, y:	21.4	},
	  	{x:	2018	, y:	21.2	},
  		{x:	2017	, y:	21	},
		  {x:	2016	, y:	20.8	},
		  {x:	2015	, y:	20.8	},
		  {x:	2014	, y:	20.6	},
		  {x:	2013	, y:	20.4	},
		  {x:	2012	, y:	20.2	},
		  {x:	2011	, y:	20	},
		  {x:	2010	, y:	19.8	},
		  {x:	2009	, y:	19.6	},
		  {x:	2008	, y:	19.3	},
		  {x:	2007	, y:	19	},
		  {x:	2006	, y:	18.9	},
		  {x:	2005	, y:	18.7	},
		  {x:	2004	, y:	18.4	},
		  {x:	2003	, y:	18	},
		  {x:	2002	, y:	17.3	},
		  {x:	2001	, y:	17.1	},
		  {x:	2000	, y:	16.9	}
    ],
    backgroundColor: 'rgb(255, 209, 102)'
  })
  lifeExpChart.update();
  //console.log("showing Life Expectancy at 65 years");

  //Update the click counter and the button HTML for users to toggle back to the previous chart
  clickStatus2++;
  //console.log(clickStatus2);
  document.getElementById("elderlyLifeExp").innerHTML = "Remove Life Expectancy At Age 65 Years.";
}

function backToLifeExp() {
  if (lifeExpChart.data.datasets.length === 2 && lifeExpChart.data === lifeExpData) {
    lifeExpChart.data.datasets.pop();
    lifeExpChart.update();
    
    //Update the click counter and the button HTML for users to toggle back to the previous chart
    clickStatus2--;
    //console.log(clickStatus2);
    document.getElementById("elderlyLifeExp").innerHTML = "View Life Expectancy At Age 65 Years.";
  } else if (lifeExpChart.data.datasets.length === 3 && lifeExpChart.data === lifeExpGender) {
    lifeExpChart.data.datasets.pop();
    lifeExpChart.update();
    
    //Update the click counter and the button HTML for users to toggle back to the previous chart
    clickStatus2--;
    //console.log(clickStatus2);
    document.getElementById("elderlyLifeExp").innerHTML = "View Life Expectancy At Age 65 Years.";
  }
}




// Marriage and Divorce Rate chart, donut chart

//Create new data object to store values 
const marriageData = {
  labels: [
    'Single',
    'Married',
    'Widowed',
    'Divorced'
  ],
  datasets: [{
    label: 'Number of residents',
    data: [997800, 2151900, 170500, 164000],
    backgroundColor: [
      'rgb(0, 189, 157)',
      'rgb(255, 209, 102)',
      'rgb(255, 132, 132)',
      'rgb(88, 81, 145)',
    ],
    hoverOffset: 4
  }]
};

//Initialise new chart in the canvas id
const marriageRatio = new Chart("marriageChart", {
  type: 'doughnut',
  data: marriageData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1/1,
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          color: "rgb(0,0,0)",
          font: {
            size: 15,
            family: "Avenir",
          }
        }
      }
    }
  }
});

//new data object to store new view
const divorceData = {
  labels: [
    'Marriages',
    'Divorces'
  ],
  datasets: [{
    label: 'Number',
    data: [28329, 7674],
    backgroundColor: [
      'rgb(255, 209, 102)',
      'rgb(88, 81, 145)',
    ],
    hoverOffset: 4
  }]
};

// event Listeners and functions for buttons to change view
document.getElementById("changeToDivorceView").addEventListener("click", changeToDivorceView)
function changeToDivorceView() {
  marriageRatio.data = divorceData;
  marriageRatio.update();
}

document.getElementById("changeToMarriageView").addEventListener("click", changeToMarriageView)
function changeToMarriageView() {
  marriageRatio.data = marriageData;
  marriageRatio.update();
}




// Bubble Chart for intersections of marriage, divorce, fertility and housing

//Create data object for the bubbles, with 3 variables, and year as the label for the 4th variable
const bubbleIntData = {
  datasets: [
    {
      label: '2000',	
      data: [{x:	7.82	, y:	6.22	, r:	21.34	}],
      backgroundColor: "rgb(255, 132, 132)"
    }, 
    {
      label: '2001',	
      data: [{x:	7.84	, y:	6.24	, r:	20.94	}],
      backgroundColor: "rgb(244, 120, 120)"
    },
    {
      label: '2002',	
      data: [{x:	7.62	, y:	6.13	, r:	20.34	}],
      backgroundColor: "rgb(235, 110, 110)"
    },
    {
      label: '2004',	
      data: [{x:	7.36	, y:	5.96	, r:	20.36	}],
      backgroundColor: "rgb(220, 100, 100)"
    },
    {
      label: '2005',	
      data: [{x:	7.22	, y:	5.90	, r:	19.74	}],
      backgroundColor: "rgb(210, 90, 90)"
    },
    {
      label: '2006',	
      data: [{x:	7.25	, y:	5.80	, r:	19.32	}],
      backgroundColor: "rgb(200, 80, 80)"
    },
    {
      label: '2007',	
      data: [{x:	7.21	, y:	5.79	, r:	19.16	}],
      backgroundColor: "rgb(190, 70, 70)"
    },
    {
      label: '2008',	
      data: [{x:	7.25	, y:	5.81	, r:	18.98	}],
      backgroundColor: "rgb(180, 60, 60)"
    },
    {
      label: '2009',	
      data: [{x:	7.34	, y:	5.75	, r:	19.02	}],
      backgroundColor: "rgb(170, 50, 50)"
    },
    {
      label: '2010',	
      data: [{x:	7.14	, y:	5.60	, r:	18.64	}],
      backgroundColor: "rgb(160, 40, 40)"
    },
    {
      label: '2011',	
      data: [{x:	7.35	, y:	5.65	, r:	18.16	}],
      backgroundColor: "rgb(150, 100, 100)"
    },
    {
      label: '2012',	
      data: [{x:	7.53	, y:	5.71	, r:	18.06	}],
      backgroundColor: "rgb(140, 155, 155)"
    },
    {
      label: '2013',	
      data: [{x:	7.28	, y:	5.67	, r:	17.84	}],
      backgroundColor: "rgb(130, 160, 160)"
    },
    {
      label: '2014',	
      data: [{x:	7.58	, y:	5.50	, r:	17.76	}],
      backgroundColor: "rgb(120, 170, 170)"
    },
    {
      label: '2015',	
      data: [{x:	7.49	, y:	5.43	, r:	17.38	}],
      backgroundColor: "rgb(110, 180, 180)"
    },
    {
      label: '2016',	
      data: [{x:	7.42	, y:	5.25	, r:	17.38	}],
      backgroundColor: "rgb(100, 190, 190)"
    },  
    {
      label: '2017',	
      data: [{x:	7.45	, y:	5.15	, r:	17.18	}],
      backgroundColor: "rgb(90, 200, 200)"
    },  
    {
      label: '2018',	
      data: [{x:	7.41	, y:	5.00	, r:	16.84	}],
      backgroundColor: "rgb(80, 210, 210)"
    },  
    {
      label: '2019',	
      data: [{x:	7.12	, y:	4.69	, r:	16.80	}],
      backgroundColor: "rgb(70, 220, 220)"
    },  
    {
      label: '2020',	
      data: [{x:	7.04	, y:	4.77	, r:	16.04	}],
      backgroundColor: "rgb(60, 230, 230)"
    }, 
    {
      label: '2021',	
      data: [{x:	7.29	, y:	4.63	, r:	16.14	}],
      backgroundColor: "rgb(50, 240, 240)"
    }]
};

//Initialise new bubble chart into the set canvas id 
const mixedBubbleChart = new Chart ("mixedBubbleChart", {
  type: 'bubble',
  data: bubbleIntData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1/1,
    scales: {
      x: {
        title: true,
        text: "Proportion of successful marriages"
      }
    },
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          color: "rgb(0,0,0)",
          font: {
            size: 11,
            family: "Avenir",
          }
        }
      }}
  }
})