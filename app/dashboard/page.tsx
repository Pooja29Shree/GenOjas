"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useChat } from "ai/react";
import Link from "next/link";

const streakData = [
  { day: "Mon", value: 10 },
  { day: "Tue", value: 20 },
  { day: "Wed", value: 15 },
  { day: "Thu", value: 25 },
  { day: "Fri", value: 30 },
  { day: "Sat", value: 20 },
  { day: "Sun", value: 35 },
];

const ojasBoostData = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

export default function DashboardPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  return (
    <div className="min-h-screen bg-gray-100/40 dark:bg-gray-800/40 p-4 sm:p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <h1 className="text-4xl font-bold font-jakarta text-blue-950">
            Dashboard
          </h1>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Ojas</CardTitle>
                <CardDescription>Your current Ojas level.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <span className="text-sm font-medium text-blue-900">Angry</span>
                <Progress value={25} className="w-full" />
              </CardContent>
              <CardFooter className="flex gap-4">
                <Link href="/ojas-detect">
                  <Button>Detect Ojas</Button>
                </Link>
                <Button variant="outline">Detect Bhava (mood)</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Streak</CardTitle>
                <CardDescription>Your consistency streak.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={streakData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>OjasBoost</CardTitle>
              <CardDescription>Your Ojas boost over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ojasBoostData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="pv" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>MatrikaCore</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto">
              <div className="space-y-4">
                {messages.map((m: any) => (
                  <div key={m.id} className="flex gap-2">
                    <span className="font-bold">
                      {m.role === "user" ? "User: " : "AI: "}
                    </span>
                    <span>{m.content}</span>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2 text-blue-500">
                    AI is typing...
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSubmit} className="relative w-full">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Chatbox..."
                  className="pr-10"
                  disabled={isLoading}
                />
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
