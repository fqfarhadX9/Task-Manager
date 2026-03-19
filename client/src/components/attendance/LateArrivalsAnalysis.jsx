import { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import LateArrivalBar from "./LateArrivalBar";

export default function LateArrivalsAnalysis() {

  const [lateData, setLateData] = useState([]);
  const [totalLate, setTotalLate] = useState(0);
  const [avg, setAvg] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("/attendance/late-arrivals");
      const lateArrivals = res.data.lateArrivals;

      const total = lateArrivals.length;
      setTotalLate(total);

      const uniqueDates = new Set(
        lateArrivals.map(item => item.date)
      );

      const average = total / (uniqueDates.size || 1);
      setAvg(average.toFixed(1));

      const dayMap = {};

      lateArrivals.forEach(item => {
        const day = new Date(item.date).toLocaleString("en-US", {
          weekday: "long"
        });

        dayMap[day] = (dayMap[day] || 0) + 1;
      });

      const daysOrder = [
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
      ];

      const formattedData = Object.keys(dayMap)
        .map(day => ({ day, count: dayMap[day] }))
        .sort(
          (a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day)
        );

      setLateData(formattedData);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const max = Math.max(...lateData.map(i => i.count), 1);

  return (
    <div className="bg-gradient-to-br from-[#020817] to-[#020817]/70 border border-gray-800 rounded-2xl p-6 shadow-lg">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">
          Late Arrivals Analysis
        </h2>
        <span className="text-xs text-gray-500">
          Weekly Overview
        </span>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading analytics...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-6 mb-8">

            <div className="bg-[#0F172A] p-4 rounded-xl">
              <p className="text-3xl font-bold text-orange-400">
                {totalLate}
              </p>
              <p className="text-gray-400 text-sm">
                Total Late Arrivals
              </p>
            </div>

            <div className="bg-[#0F172A] p-4 rounded-xl">
              <p className="text-3xl font-bold text-blue-400">
                {avg}
              </p>
              <p className="text-gray-400 text-sm">
                Daily Average
              </p>
            </div>

          </div>

          <p className="text-sm mb-4 text-gray-400">
            Late Arrivals by Day
          </p>

          <div className="space-y-4">
            {lateData.length > 0 ? (
              lateData.map((item, index) => (
                <LateArrivalBar
                  key={index}
                  item={item}
                  max={max}
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No late records found
              </p>
            )}
          </div>
        </>
      )}

    </div>
  );
}