import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Activity,
  Heart,
  Droplet,
  Scale,
  Calendar,
  TrendingUp,
  LightbulbIcon,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userReport, setUserReport] = useState([]);

  const generateSuggestions = (latestDiabetes) => {
    if (!latestDiabetes) return null;

    const suggestions = [];
    const { bloodSugarLevels, hba1c, insulinLevels } =
      latestDiabetes.healthMetrics;

    if (bloodSugarLevels > 140) {
      suggestions.push(
        "Consider increasing physical activity to help regulate blood sugar levels",
      );
    }
    if (hba1c > 6.5) {
      suggestions.push(
        "Schedule a follow-up with your healthcare provider to discuss HbA1c management",
      );
    }
    if (insulinLevels > 25) {
      suggestions.push(
        "Monitor your carbohydrate intake and maintain a balanced diet",
      );
    }

    return suggestions[Math.floor(Math.random() * suggestions.length)];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/user");
        const response2 = await axios.get("/api/medicine");
        localStorage.setItem(
          "userMeds",
          JSON.stringify(response2.data.medicines),
        );
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        setUserData(response.data.user);
        setUserReport(response.data.userReport);
        setError(null);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  console.log(userData, userReport);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="border-red-200 bg-red-50 p-6">
          <CardTitle className="mb-2 text-red-600">Error</CardTitle>
          <p className="text-red-500">{error}</p>
        </Card>
      </div>
    );
  }

  if (userData.healthSuggestions.length === 0 || !userReport === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="p-6">
          <CardTitle className="mb-2">No Data Available</CardTitle>
          <p>Please check back later or Fill up your data.</p>
        </Card>
      </div>
    );
  }

  // Process diabetes data for time series
  const diabetesTimeData = userReport
    .filter((report) => report.reportType === "diabetes")
    .map((report) => ({
      date: new Date(report.dateUploaded).toLocaleDateString("ne-NP"),
      bloodSugar: report.healthMetrics.bloodSugarLevels,
      hba1c: report.healthMetrics.hba1c,
      insulin: report.healthMetrics.insulinLevels,
      cPeptide: report.healthMetrics.cPeptide,
    }));

  // Process cholesterol data
  const cholesterolData = userReport
    .filter((report) => report.reportType === "cholesterol")
    .flatMap((report) => [
      {
        name: "HDL",
        value: report.healthMetrics.hdlCholesterol,
      },
      {
        name: "LDL",
        value: report.healthMetrics.ldlCholesterol,
      },
      {
        name: "Triglycerides",
        value: report.healthMetrics.triglycerides,
      },
      {
        name: "Total Cholesterol",
        value: report.healthMetrics.totalCholesterol,
      },
    ]);

  const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"];

  // Latest diabetes metrics for radar chart
  const latestDiabetes = userReport
    .filter((report) => report.reportType === "diabetes")
    .sort((a, b) => new Date(b.dateUploaded) - new Date(a.dateUploaded))[0];

  const radarData = latestDiabetes
    ? [
        {
          subject: "Blood Sugar",
          A: latestDiabetes.healthMetrics.bloodSugarLevels,
          fullMark: 100,
        },
        {
          subject: "HbA1c",
          A: latestDiabetes.healthMetrics.hba1c,
          fullMark: 100,
        },
        {
          subject: "Insulin",
          A: latestDiabetes.healthMetrics.insulinLevels,
          fullMark: 100,
        },
        {
          subject: "C-Peptide",
          A: latestDiabetes.healthMetrics.cPeptide,
          fullMark: 100,
        },
      ]
    : [];

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-3 lg:p-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        <div className="flex w-full flex-col items-center justify-between gap-4 rounded-lg bg-white p-6 shadow-lg md:w-auto md:flex-row">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Health Dashboard
            </h1>
            <p className="text-gray-600">Welcome, {userData?.fullName}</p>
          </div>
          <div className="flex items-center gap-4">
            <Calendar className="h-5 w-5 text-indigo-600" />
            <span className="text-gray-600">
              {new Date().toLocaleDateString("en-US")}
            </span>
          </div>
        </div>

        <Alert className="max-w-md border-l-4 border-blue-500 bg-white shadow-lg">
          <LightbulbIcon className="h-5 w-5 text-blue-500" />
          <AlertTitle className="text-blue-800">Daily Health Tip</AlertTitle>
          <AlertDescription className="text-gray-600">
            {generateSuggestions(latestDiabetes) ||
              "Keep monitoring your health metrics regularly"}
          </AlertDescription>
        </Alert>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {latestDiabetes && (
          <>
            <Card className="cursor-pointer bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <CardContent className="cursor-pointer pt-6">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-red-100 p-3">
                    <Droplet className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Blood Sugar
                    </p>
                    <h3 className="text-2xl font-bold">
                      {latestDiabetes.healthMetrics.bloodSugarLevels}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-blue-100 p-3">
                    <Activity className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">HbA1c</p>
                    <h3 className="text-2xl font-bold">
                      {latestDiabetes.healthMetrics.hba1c}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-green-100 p-3">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Insulin</p>
                    <h3 className="text-2xl font-bold">
                      {latestDiabetes.healthMetrics.insulinLevels}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-purple-100 p-3">
                    <Heart className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      C-Peptide
                    </p>
                    <h3 className="text-2xl font-bold">
                      {latestDiabetes.healthMetrics.cPeptide}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Diabetes Trends Chart */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Diabetes Metrics Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={diabetesTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="bloodSugar"
                    stroke="#8884d8"
                    name="Blood Sugar"
                  />
                  <Line
                    type="monotone"
                    dataKey="hba1c"
                    stroke="#82ca9d"
                    name="HbA1c"
                  />
                  <Line
                    type="monotone"
                    dataKey="insulin"
                    stroke="#ffc658"
                    name="Insulin"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Metrics Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Metrics"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Detailed Health Report</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="diabetes" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
              <TabsTrigger value="diabetes">Diabetes Report</TabsTrigger>
              <TabsTrigger value="cholesterol">Cholesterol Report</TabsTrigger>
            </TabsList>
            <TabsContent value="diabetes" className="mt-4">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {latestDiabetes &&
                  Object.entries(latestDiabetes.healthMetrics)
                    .filter(([key, value]) => value !== 0)
                    .map(([key, value]) => (
                      <div key={key} className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">{key}</p>
                        <p className="text-lg font-semibold">{value}</p>
                      </div>
                    ))}
              </div>
            </TabsContent>
            <TabsContent value="cholesterol" className="mt-4">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {cholesterolData.map((item, index) => (
                  <div key={index} className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">{item.name}</p>
                    <p className="text-lg font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
