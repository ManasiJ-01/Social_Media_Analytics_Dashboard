import React, { useEffect, useState } from "react";
import { Chart as ChartJs } from "chart.js/auto";
import axios from "axios";
import BarChart from "./BarChart"; // Import your existing chart components
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import GroupedBarChart from "./GroupedBarChart";

import "./ChartContainer.css";

const API_BASE_URL = "http://localhost:8080/api/user-analytics";

const ChartContainer = () => {
  const [userAnalytics, setUserAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        console.log("API Response:", response);

        setUserAnalytics(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user analytics:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getFollowersFollowingPostsData = () => {
    const labels = userAnalytics.map((user) => user.username);
    return {
      labels: labels,
      datasets: [
        {
          label: "Followers",
          data: userAnalytics.map((user) => user.followers),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Following",
          data: userAnalytics.map((user) => user.following),
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
        {
          label: "Posts",
          data: userAnalytics.map((user) => user.posts),
          backgroundColor: "rgba(255, 206, 86, 0.6)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const getCategoryData = () => {
    const categories = {};
    userAnalytics.forEach((user) => {
      categories[user.category] = (categories[user.category] || 0) + 1;
    });

    return {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const getAccountEngagementData = () => {
    const labels = userAnalytics.map((user) => user.username);
    return {
      labels: labels,
      datasets: [
        {
          label: "Account Reached",
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          data: userAnalytics.map((user) => user.account_reached),
        },
        {
          label: "Account Engaged",
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
          data: userAnalytics.map((user) => user.account_engaged),
        },
      ],
    };
  };


  const getContentSharedData = () => {
    const labels = userAnalytics.map((user) => user.username);
    return {
      labels: labels,
      datasets: [
        {
          label: "Content Shared",
          data: userAnalytics.map((user) => user.content_shared),
          backgroundColor: "rgba(255, 159, 64, 0.6)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "Ads Run",
          data: userAnalytics.map((user) => user.ads_run),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Active Promotions",
          data: userAnalytics.map((user) => user.active_promotions),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const getTotalInteractionData = () => {
    const labels = userAnalytics.map((user) => user.username);
    return {
      labels: labels,
      datasets: [
        {
          label: "Total Stories",
          data: userAnalytics.map((user) => user.total_stories),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Total Follows",
          data: userAnalytics.map((user) => user.total_follows),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Total Saves",
          data: userAnalytics.map((user) => user.total_saves),
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
        {
          label: "Total Comments",
          data: userAnalytics.map((user) => user.total_comments),
          backgroundColor: "rgba(255, 206, 86, 0.6)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
        {
          label: "Total Shares",
          data: userAnalytics.map((user) => user.total_shares),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="chart-container">
      <h3>Social Media Analytics Dashboard</h3>

      <BarChart data={getFollowersFollowingPostsData()} />
      <LineChart data={getFollowersFollowingPostsData()} />
      <PieChart data={getCategoryData()} />
      <GroupedBarChart data={getAccountEngagementData()} />
      <BarChart data={getContentSharedData()} />
      <PieChart data={getTotalInteractionData()} />
    </div>
  );
};

export default ChartContainer;
