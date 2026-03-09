import axios from "../../api/axios.js";
import { BarChart3, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function TaskStats() {
    
    const [stats, setStats] = useState({
        totalTasks: 0,
        completed: 0,
        overdue: 0,
        dueSoon: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            const {data} = await axios.get("/task/stats");
            setStats(data);
        };
        fetchStats();
    }, []);

  return (

    <div className="grid grid-cols-4 gap-6">

      <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800 flex justify-between items-center">

        <div>
          <p className="text-gray-400">Total Tasks</p>
          <h2 className="text-3xl font-bold mt-2">{stats.totalTasks}</h2>
        </div>

        <div className="bg-blue-500/10 p-3 rounded-lg">
          <BarChart3 className="text-blue-500" size={22} />
        </div>

      </div>

      <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800 flex justify-between items-center">

        <div>
          <p className="text-gray-400">Completed</p>
          <h2 className="text-3xl font-bold mt-2">{stats.completed}</h2>
        </div>

        <div className="bg-green-500/10 p-3 rounded-lg">
          <CheckCircle2 className="text-green-500" size={22} />
        </div>

      </div>

      <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800 flex justify-between items-center">

        <div>
          <p className="text-gray-400">Overdue</p>
          <h2 className="text-3xl font-bold mt-2">{stats.overdue}</h2>
        </div>

        <div className="bg-red-500/10 p-3 rounded-lg">
          <AlertTriangle className="text-red-500" size={22} />
        </div>

      </div>

      <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800 flex justify-between items-center">

        <div>
          <p className="text-gray-400">Due Soon</p>
          <h2 className="text-3xl font-bold mt-2">{stats.dueSoon}</h2>
        </div>

        <div className="bg-yellow-500/10 p-3 rounded-lg">
          <Clock className="text-yellow-500" size={22} />
        </div>

      </div>

    </div>

  );
}