"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Wind,
  Droplets,
  Snowflake,
  Thermometer,
  Umbrella,
  Eye,
  CircleHelp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { weatherCode, weatherIcon } from "./codes/weathercodes";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = "your api key here";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  snowfall: number;
  precipitation: number;
  visibility: number;
  uvIndex: number;
  forecast: Array<{
    date: string;
    tempHigh: number;
    tempLow: number;
    condition: string;
  }>;
}

export default function WeatherApp() {
  const [location, setLocation] = useState("Punjab");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<string>("");

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      setLocation(" ");
      const res = await axios.get(
        `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=${API_KEY}`
      );
      const data = res.data;
      console.log(data);
      setWeatherData({
        location: location,
        temperature: Math.round(
          data.timelines.daily[0].values.temperatureApparentAvg
        ),
        condition: data.timelines.daily[0].values.weatherCodeMax,
        humidity: Math.round(data.timelines.daily[0].values.humidityAvg),
        windSpeed: Math.round(data.timelines.daily[0].values.windSpeedAvg),
        snowfall: Math.round(
          data.timelines.daily[0].values.snowAccumulationSum || 0
        ),
        precipitation: Math.round(
          data.timelines.daily[0].values.precipitationProbabilityAvg
        ),
        visibility: Math.round(data.timelines.daily[0].values.visibilityAvg),
        uvIndex: Math.round(data.timelines.daily[0].values.uvIndexAvg),
        forecast: data.timelines.daily.slice(1, 5).map((day: any) => ({
          date: new Date(day.time).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          tempHigh: Math.round(day.values.temperatureApparentMax),
          tempLow: Math.round(day.values.temperatureApparentMin),
          condition: day.values.weatherCodeMax,
        })),
      });
      const wcoden = await data.timelines.daily[0].values.weatherCodeMax;
      const string: string = wcoden.toString();
      //@ts-ignore
      setWeather(weatherCode[string]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(API_KEY);
    fetchWeatherData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIcon = (condition: string) => {
    //@ts-ignore
    if (weatherIcon[condition]) {
      //@ts-ignore
      return <img className="h-[50px]" src={weatherIcon[condition]} />;
    } else {
      return <CircleHelp />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white">
              Weather Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
              <Input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-grow bg-gray-700 text-white border-gray-600"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Loading..." : <Search className="h-4 w-4" />}
              </Button>
            </form>

            {weatherData && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-semibold text-white">
                      {weatherData.location}
                    </h2>
                    <p className="text-xl text-gray-300">{weather}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-bold text-white">
                      {weatherData.temperature}°C
                    </p>
                    <div className="flex items-center justify-end space-x-2 mt-2 text-gray-300">
                      <Droplets className="h-4 w-4 text-blue-400" />
                      <span>{weatherData.humidity}%</span>
                      <Wind className="h-4 w-4 text-gray-400" />
                      <span>{weatherData.windSpeed} km/h</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {weatherData.forecast.map((day, index) => (
                    <Card
                      key={index}
                      className="text-center bg-gray-700 border-gray-600"
                    >
                      <CardContent className="pt-4">
                        <p className="font-semibold text-white">{day.date}</p>
                        {getWeatherIcon(day.condition)}
                        <p className="mt-2">
                          <span className="font-semibold text-white">
                            {day.tempHigh}°
                          </span>{" "}
                          /{" "}
                          <span className="text-gray-400">{day.tempLow}°</span>
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gray-700 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-white">
                      Additional Weather Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-5 w-5 text-blue-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-300">
                            Humidity
                          </p>
                          <p className="text-lg text-white">
                            {weatherData.humidity}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Snowflake className="h-5 w-5 text-blue-300" />
                        <div>
                          <p className="text-sm font-medium text-gray-300">
                            Snowfall
                          </p>
                          <p className="text-lg text-white">
                            {weatherData.snowfall} cm
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Umbrella className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-300">
                            Precipitation
                          </p>
                          <p className="text-lg text-white">
                            {weatherData.precipitation}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-300">
                            Visibility
                          </p>
                          <p className="text-lg text-white">
                            {weatherData.visibility} km
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Wind className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-300">
                            Wind Speed
                          </p>
                          <p className="text-lg text-white">
                            {weatherData.windSpeed} km/h
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-5 w-5 text-red-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-300">
                            UV Index
                          </p>
                          <p className="text-lg text-white">
                            {weatherData.uvIndex}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
