//sticky navbar
window.onscroll = function() {stickyBar()};
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
function stickyBar() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
}}

//Population Type Chart with x axis (years) and lines data
var years1 = [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022];
var total1 = [3047132,3135083,3230698,3313471,3419048,3524506,3670704,3796038,3927213,3958723,4027887,4138012,4175950,4114826,4166664,4265762,4401365,4588599,4839396,4987573,5076732,5183688,5312437,5399162,5469724,5535002,5607283,5612253,5638676,5703569,5685807,5453566,5637022];
var resident1 = [2735868,2794704,2849754,2904547,2959350,3013515,3068132,3123403,3180018,3229681,3273363,3325902,3382944,3366891,3413266,3467814,3525894,3583082,3642659,3733876,3771721,3789251,3818205,3844751,3870739,3902690,3933559,3965796,3994283,4026209,4044210,3986842,4073239];
var citizen1 = [2623736,2664625,2702430,2742826,2784168,2823707,2860419,2894794,2929731,2958379,2985886,3017092,3043397,3032541,3057087,3081001,3107924,3133848,3164438,3200693,3230719,3257228,3285140,3313507,3343030,3375023,3408943,3439177,3471936,3500940,3523191,3498191,3553749];
var pr1 = [112132,130079,147324,161720,175182,189808,207712,228608,250287,271302,287477,308810,339547,334350,356179,386813,417970,449234,478221,533183,541002,532023,533065,531244,527709,527667,524616,526619,522347,525269,521019,488651,519490];
var nonpr1 = [311264,340379,380944,408924,459698,510991,602572,672635,747195,729042,754524,812110,793006,747935,753398,797948,875471,1005517,1196737,1253697,1305011,1394437,1494232,1554411,1598985,1632312,1673724,1646457,1644393,1677360,1641597,1466724,1563783];

new Chart("populationType", {

  type: 'line',
  data: {
    labels: years1,
    datasets: [
      { 
        data: total1,
        label: "Total Population",
        borderColor: "#3e95cd",
        fill: false
      },
      { 
        data: resident1,
        label: "Resident Population",
        borderColor: "#8e5ea2",
        fill: false
      },
      { 
        data: citizen1,
        label: "Citizen Population",
        borderColor: "#3cba9f",
        fill: false
      },
      { 
        data: pr1,
        label: "Permanent Residents Population",
        borderColor: "#c45850",
        fill: false
      },
      { 
        data: nonpr1,
        label: "Non-Resident Population",
        borderColor: "#e8c3b9",
        fill: false
      }
    ]}
});

// Population Pie Chart

window.onload = function() {
    const piedata = {
        labels: ['Citizens', 'Permanent Residents', 'Non-residents'],
        datasets: [
          { 
              data: citizen1,
              label: "No. of citizens(2022)",
              backgroundColor: rgb(250,130,52),
            },
            { 
              data: pr1,
              label: "No. of permanent residents(2022)",
              backgroundColor: rgb(47,241,82),
            },
            { 
              data: nonpr1,
              label: "No. of non-residents(2022)",
              backgroundColor: rgb(103,34,255),
            }
          ].slice(0, DATA_COUNT) // limit the number of datasets to DATA_COUNT
      };
      const config = new Chart("populationPie", {
          type: 'pie',
          data: piedata,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Population Pie Chart'
              }
            }
          },
        });
    };
