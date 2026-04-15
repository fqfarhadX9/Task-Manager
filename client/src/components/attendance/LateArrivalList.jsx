import { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import LateArrivalCard from "./LateArrivalCard";

export default function LateArrivals() {

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLateArrivals = async () => {
    try {

      const res = await axios.get("/attendance/late-arrivals");
      setRecords(res.data.lateArrivals);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLateArrivals();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Late Arrivals
        </h2>

        <span className="text-sm bg-red-500/10 text-red-400 px-3 py-1 rounded-full">
          {records.length} records
        </span>
      </div>

      {loading && (
        <p className="text-gray-400 text-sm">
          Loading late arrivals...
        </p>
      )}

      {!loading && records.length === 0 && (
        <div className="text-center text-gray-400 text-sm py-6">
           No late arrivals yet 🙃
        </div>
      )}

      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
        {records.map((item) => (
          <LateArrivalCard key={item._id} data={item} />
        ))}
      </div>

    </div>
  );
}