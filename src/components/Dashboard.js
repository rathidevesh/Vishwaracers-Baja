import React, { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  Legend as RechartsLegend,
} from "recharts";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ReferenceLine } from "recharts";

import { FaTh } from "react-icons/fa";
import './Dashboard.css'
import {
  BsFillArchiveFill,
  BsFillGrid3xGapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";

import { BiDollar} from "react-icons/bi";
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBookingType, setSelectedBookingType] = useState("All");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [yearlyData, setYearlyData] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [yearlyUsers, setYearlyUsers] = useState([]);
  const COLORS = ["#800080", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/Bookingsroute/allbookings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        const json = await response.json();
        console.log(json);
        if (json.length > 0) {
          setBookings(json);
        } else {
          alert("No Bookings Found");
        }
      } catch (error) {
        console.error("Error fetching Bookings:", error);
      }
    };
    fetchAllBookings();
  }, []);

  useEffect(() => {
    // Calculate total cost for each year
    const yearlyCost = {};
    bookings.forEach((booking) => {
      const year = new Date(booking.date).getFullYear().toString();
      const cost = parseInt(booking.carcost);
      if (!yearlyCost[year]) {
        yearlyCost[year] = cost;
      } else {
        yearlyCost[year] += cost;
      }
    });
    setYearlyData(yearlyCost);
  }, [bookings]);

  // Filter bookings based on the selected booking type
  useEffect(() => {
    // Filter bookings based on the selected booking type
    const filtered =
      selectedBookingType === "All"
        ? bookings
        : bookings.filter(
            (booking) => booking.Used_for === selectedBookingType
          );
    setFilteredBookings(filtered);
  }, [bookings, selectedBookingType]);

  const pieChartData = {
    labels: ["Farmer", "Tourist", "Manager"],
    datasets: [
      {
        data: [
          (filteredBookings.filter((booking) => booking.Used_for === "farmer")
            .length /
            bookings.length) *
            100,
          (filteredBookings.filter((booking) => booking.Used_for === "tourist")
            .length /
            bookings.length) *
            100,
          filteredBookings.filter((booking) => booking.Used_for === "manager")
            .length,
        ],
        backgroundColor: ["#FF5733", "#33FF49", "#3366FF"], // Colors for each segment
      },
    ],
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const farmerPercentage =
    (filteredBookings.filter((booking) => booking.Used_for === "farmer")
      .length /
      filteredBookings.length) *
    100;

  const touristPercentage =
    (filteredBookings.filter((booking) => booking.Used_for === "tourist")
      .length /
      filteredBookings.length) *
    100;

  const managerPercentage =
    (filteredBookings.filter((booking) => booking.Used_for === "manager")
      .length /
      filteredBookings.length) *
    100;

  // Create data array for the pie chart
  const pieChartData1 = [
    { name: "Farmer", value: farmerPercentage },
    { name: "Tourist", value: touristPercentage },
    { name: "Manager", value: managerPercentage },
  ];

  useEffect(() => {
    // Ensure the chart is destroyed when the component unmounts
    return () => {
      try {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
      } catch (error) {
        console.error("Error destroying chart:", error);
      }
    };
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to customize width and height
    width: 400, // Set your custom width
    height: 400, // Set your custom height
  };

  // Prepare data for LineChart
  const lineChartData = Object.keys(yearlyData).map((year) => ({
    name: year,
    amount: yearlyData[year],
  }));

  // Function to calculate monthly sales for a selected year
  const calculateMonthlySales = (selectedYear) => {
    const monthlySales = new Array(12).fill(0); // Initialize an array with 12 months

    bookings.forEach((booking) => {
      const bookingYear = new Date(booking.date).getFullYear().toString();
      const bookingMonth = new Date(booking.date).getMonth();

      if (bookingYear === selectedYear) {
        monthlySales[bookingMonth] += parseInt(booking.carcost);
      }
    });

    return monthlySales;
  };

  // Default to current year
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  
  // Set monthly sales data initially for the current year
  useEffect(() => {
    const monthlySalesData = calculateMonthlySales(selectedYear);
    setMonthlyData(monthlySalesData);
  }, [selectedYear]);

  // Prepare data for the line chart
  const lineChartData1 = Object.keys(monthlyData).map((monthIndex) => ({
    name: `Month ${parseInt(monthIndex) + 1}`,
    amount: monthlyData[monthIndex],
  }));

  const filteredChartData = lineChartData1.filter(
    (data) => data.name !== selectedYear
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/alluserinfo",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const json = await response.json();
        console.log(json);
        if (json.length > 0) {
          setUserData(json);
        } else {
          alert("No User Data Found");
        }
      } catch (error) {
        console.error("Error fetching User Data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Calculate user type distribution
  const calculateUserTypeDistribution = () => {
    const userTypeDistribution = {};

    userData.forEach((user) => {
      const userType = user.occupation;
      if (!userTypeDistribution[userType]) {
        userTypeDistribution[userType] = 1;
      } else {
        userTypeDistribution[userType]++;
      }
    });

    return userTypeDistribution;
  };

  // Calculate user type distribution
  const userTypes = calculateUserTypeDistribution();

  // Prepare data for the pie chart
  const pieChartData2 = Object.keys(userTypes).map((userType) => ({
    name: userType,
    value: (userTypes[userType] / userData.length) * 100, // Calculate percentage
  }));

  const COLORS1 = ["#FF5733", "#33FF49", "#3366FF"]; // Colors for each segment

  useEffect(() => {
    // Calculate yearlyUsers and update the state
    const calculatedYearlyUsers = {};

    userData.forEach((user) => {
      const registrationDate = new Date(user.date);
      const year = registrationDate.getFullYear().toString();

      if (!calculatedYearlyUsers[year]) {
        calculatedYearlyUsers[year] = 1;
      } else {
        calculatedYearlyUsers[year]++;
      }
    });

    setYearlyUsers(calculatedYearlyUsers); // Update the state here
  }, [userData]);

  // Your existing code ...

  // Data for the BarChart
  const yearlyUsersData = Object.keys(yearlyUsers).map((year) => ({
    year,
    users: yearlyUsers[year],
  }));

  return (
    <main className="main-container">
      <div className="main-title">
        <h1>Statistics</h1>
      </div>
      <div className="main-cards">
        <div className="investor-card">
          <div className="card-inner">
            <h3>PRODUCTS</h3>
            {/* <Doughnut data={doughnutChartData} /> */}
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>300</h1>
        </div>
        <div className="investor-card">
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            {/* <Doughnut data={doughnutChartData} /> */}
            <FaTh className="card_icon" />
          </div>
          <h1>12</h1>
        </div>
        <div className="investor-card">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            {/* <Doughnut data={doughnutChartData} /> */}
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{userData.length}</h1>
        </div>
        <div className="investor-card">
          <div className="card-inner">
            <h3>INVESTORS</h3>
            {/* <Doughnut data={doughnutChartData} /> */}
            <BiDollar className="card_icon" />
          </div>
          <h1>4</h1>
        </div>
      </div>
      <div className="charts">
        <div className="sales-heading">
          <h2 >For Sales</h2>
        </div>

        <div className="booking-sales-type">
          <div className="sales-distribution">
            <div className="sales-distribution-heading">
              <h2>
                <span>Customer Type Sales Distribution</span>
              </h2>
            </div>
            <ResponsiveContainer width={700} height={500} >
              <PieChart width={600} height={600}>
                <Pie
                  data={pieChartData1}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={175}
                  label={({ name, value }) => `${name}: ${value.toFixed(2)}%`}
                  fill="#252525"
                  dataKey="value"
                  
                >
                  {pieChartData1.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="yearly-distribution">
            <div className="yearly-distribution-heading">
              <h2>
                <span>Yearly Sales Distribution</span>
              </h2>
            </div>
            <ResponsiveContainer width={500} height={500}  >
              <LineChart
                width={500}
                height={500}
                margin={{
                  top: 50,
                  right: 30,
                  left: 20,
                  bottom: 50,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <YAxis
                  dataKey="amount"
                  domain={["auto", "auto"]}
                  type="number"
                  interval={0}
                  label={{
                    value: "Amount",
                    style: { textAnchor: "middle" },
                    angle: -90,
                    position: "insideLeft",
                    offset: 0,
                  }}
                  allowDataOverflow={true}
                />

                <XAxis
                  dataKey="name"
                  domain={["auto", "auto"]}
                  interval={0}
                  type="category"
                  label={{
                    value: "Year",
                    position: "bottom",
                  }}
                  allowDataOverflow={true}
                />

                <ReferenceLine
                  y={0}
                  stroke="gray"
                  strokeWidth={1.5}
                  strokeOpacity={0.65}
                />

                <Line
                  strokeWidth={2}
                  data={lineChartData}
                  dot={false}
                  type="monotone"
                  dataKey="amount"
                  stroke="black"
                  tooltipType="none"
                />
              </LineChart>
            </ResponsiveContainer>

          </div>
        </div>
        
        <div className="monthly-sales-distribution">
          <div className="monthly-sales">
              <div className="monthly-sales-heading">
                <h2>
                  <span>Monthly Sales</span>
                </h2>
              </div>
              <div className="select-monthly-sales">
                <h5>
                  <span>
                    Please select year-
                  </span>
                </h5>
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="select-button">
                  <option value={currentYear}>{currentYear}</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  
                </select>
              </div>


              <ResponsiveContainer width={500} height={500} >
              <LineChart
                width={500}
                height={500}
                margin={{
                  top: 50,
                  right: 30,
                  left: 20,
                  bottom: 50,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <YAxis
                  dataKey="amount"
                  domain={['auto', 'auto']}
                  type="number"
                  interval={0}
                  label={{
                    value: 'Amount',
                    style: { textAnchor: 'middle' },
                    angle: -90,
                    position: 'insideLeft',
                    offset: 0,
                  }}
                  allowDataOverflow={true}
                />

                <XAxis
                  dataKey="name"
                  domain={['auto', 'auto']}
                  interval={1}
                  tickCount={filteredChartData.length}
                  type="category"
                  label={{
                    value: 'Month',
                    position: 'bottom',
                    angle: 0,
                  }}
                  allowDataOverflow={true}
                />

                <ReferenceLine y={0} stroke="gray" strokeWidth={0.5} strokeOpacity={0.65} />

                <Line
                  strokeWidth={2}
                  data={filteredChartData} 
                  dot={false}
                  type="monotone"
                  dataKey="amount"
                  stroke="black"
                  tooltipType="none"
                />
              </LineChart>
            </ResponsiveContainer>

            
          </div>
          
          <div className="customer-distribution">
            <div className="customer-distribution-heading">
              <h2>
                <span>
                  Customer Distribution
                </span>
              </h2>
            </div>
            <ResponsiveContainer width={600} height={600} >
              <PieChart width={700} height={700}>
                <Pie
                  data={pieChartData2}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={175}
                  label={({ name, value }) => `${name}: ${value.toFixed(2)}%`}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData2.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

          </div>
        </div>
        <div className="bar-chart">
          <div className="bar-chart-heading">
            <h2>
              <span>
                Customer Acquisition / Year
              </span>
            </h2>
          </div>
            <div className="bar">
              <ResponsiveContainer width={400} height={400}>
              <BarChart width={400} height={400} data={yearlyUsersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#8884d8" barSize={50}/>
              </BarChart>
            </ResponsiveContainer>

            </div>

        </div>
      </div>
    </main>
  );
};

export default Dashboard;