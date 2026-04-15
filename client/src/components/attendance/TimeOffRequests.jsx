import { useEffect, useState } from "react";
import TimeOffCard from "./TimeOffCard";
import axios from "../../api/axios.js";

export default function TimeOffRequests() {

  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reason, setReason] = useState("")
  const [error, setError] = useState({});
  
  const fetchRequests = async () => {
    try{

      const res = await axios.get("/timeoff");
      setRequests(res.data.requests);

    }catch(error){
      console.error(error);
    }
  };

  useEffect(()=>{
   fetchRequests();
  },[])

  const handleSubmit = async (e) => {

    e.preventDefault();

    try{

      await axios.post("/timeoff",{
        startDate,
        endDate,
        reason
      });

      setStartDate("");
      setEndDate("");
      setReason("");

      setShowForm(false);

      fetchRequests();

    }catch(error){
      console.error(error);
    }

  };

  const updateStatus = async (id, status) => {
    try {
       setError("");

      await axios.patch(`/timeoff/${id}`, { status });

      fetchRequests();
    } catch (error) {
      console.error(error);
      setError(prev => ({
        ...prev,
        [id]: error.response?.data?.message || "you are not allowed to update request status"
      }));
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };


  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-lg font-semibold text-black dark:text-white">
          Time Off Requests
        </h2>

        <button
          onClick={()=>setShowForm(true)}
          className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-md text-sm"
        >
          Request Time Off
        </button>

      </div>

      <div className="space-y-4">
        {requests.map((req, index) => (
          <TimeOffCard 
            key={index} 
            data={req}
            error={error[req._id]}
            updateStatus={updateStatus} 
          />
        ))}
      </div>

       {showForm && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/50">

          <div className="bg-white dark:bg-gray-950 p-6 rounded-lg w-96">

            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
              Request Time Off
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="date"
                value={startDate}
                onChange={(e)=>setStartDate(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-800 p-2 rounded"
                required
              />

              <input
                type="date"
                value={endDate}
                onChange={(e)=>setEndDate(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-800 p-2 rounded"
                required
              />

              <textarea
                placeholder="Reason"
                value={reason}
                onChange={(e)=>setReason(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-800 p-2 rounded"
                required
              />

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={()=>setShowForm(false)}
                  className="px-4 py-2 bg-gray-600 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 rounded"
                >
                  Submit
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}