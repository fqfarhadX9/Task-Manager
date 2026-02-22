import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import AssignUsersModal from "../components/AssignUsersModel";
import { formatDistanceToNow } from "date-fns";

const TaskView = () => {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [openAssign, setOpenAssign] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isCreator =
    task?.createdBy?._id === user._id;

  const isAssigned =
    task?.assignedTo?.some(u => u._id === user._id);

  const isAdmin = user?.role === "admin";

  const canChangeStatus = isAdmin || isCreator || isAssigned;

  const getStatusColor = () => {
    if (task.status === "completed")
      return "bg-green-600/20 text-green-400 border border-green-500/30";
    if (task.status === "in_progress")
      return "bg-yellow-600/20 text-yellow-400 border border-yellow-500/30";
    return "bg-gray-600/20 text-gray-300 border border-gray-500/30";
  };
  const getPriorityColor = () => {
    const colors = {
      low: "bg-green-600/20 text-green-400",
      medium: "bg-yellow-600/20 text-yellow-400",
      high: "bg-red-600/20 text-red-400",
    };
    return colors[task.priority] || "bg-gray-600/20 text-gray-300";
  };

  const isOverdue =
    task?.status !== "completed" &&
    new Date(task?.dueDate) < new Date();

  const handleUnAssignTask = async (userId) => {
      try {
        const {data} = await axios.put(`/task/unassign/${id}`, {
          userId
        });
        // setTask(data.task)
        setTask(prev => ({
          ...prev,
          assignedTo: prev.assignedTo.filter(u => u._id !== userId)
        }));
      } catch (error) {
        console.error(error);
      }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    try {
      const { data } = await axios.put(
        `/task/status/${id}`,
        { status: newStatus }
      );

      setTask(data.task);

    } catch (error) {
      console.error(error);
    }
 };

  const fetchTask = async () => {
    const { data } = await axios.get(`/task/${id}`);
    console.log(data);
    setTask(data.task);
    setLoading(false);
  };

  const fetchComments = async () => {
    const { data } = await axios.get(`/comment/${id}`);
    setComments(data.comments);
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const { data } = await axios.post(`/comment/${id}`, { text: commentText });
      setComments(prev => [data.comment, ...prev]);
      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };
 
  useEffect(() => {
    fetchTask();
    fetchComments();
  }, [id]);

  if (loading) return <div>Loading 😒...</div>;

 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-100 py-12 px-6">
    <div className="max-w-4xl mx-auto space-y-10">

      {/* HEADER CARD */}
      <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700 p-10 rounded-3xl shadow-2xl shadow-black/30">

        {/* Title + Priority */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              {task?.title}
            </h1>

            {/* Status */}
            {canChangeStatus ? (
              <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor()}`}>
                <select
                  value={task.status}
                  onChange={handleStatusChange}
                  className="bg-transparent outline-none appearance-none cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            ) : (
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor()}`}>
                {task.status}
              </span>
            )}
          </div>

          <span className={`px-4 py-1.5 text-xs font-semibold rounded-full ${getPriorityColor()}`}>
            {task?.priority?.toUpperCase()}
          </span>
        </div>

        {/* Meta Info */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-400">

          <div>
            <p className="text-xs uppercase tracking-wider mb-1 text-gray-500">
              Due Date
            </p>
            <p className={`font-medium ${
              isOverdue ? "text-red-400" : "text-gray-200"
            }`}>
              {new Date(task.dueDate).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider mb-1 text-gray-500">
              Created By
            </p>
            <p className="text-gray-200 font-medium">
              {task?.createdBy?.name}
            </p>
          </div>

          <div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Assigned To
                </p>

                {(isAdmin || isCreator) && (
                  <button
                    onClick={() => setOpenAssign(true)}
                    className="text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-full transition"
                  >
                    + Assign
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {task?.assignedTo?.length === 0 ? (
                <span className="text-gray-500 text-xs italic">
                  No users assigned
                </span>
              ) : (
              task?.assignedTo?.map(user => (
                <div
                  key={user._id}
                  className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full text-xs"
                >
                  <span>{user?.name}</span>

                  {(isAdmin || isCreator) && (
                    <button
                      onClick={() => handleUnAssignTask(user._id)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              )))}
            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-3xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 tracking-tight">
          Description
        </h2>
        <p className="text-gray-300 leading-relaxed text-[15px]">
          {task?.description}
        </p>
      </div>

      {/* COMMENTS */}
      <div className="bg-gray-800/60 border border-gray-700 p-8 rounded-3xl shadow-xl shadow-black/20">

        <h2 className="text-xl font-semibold mb-6 tracking-tight">
          Comments
        </h2>

        {/* Add Comment */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 bg-gray-700/60 border border-gray-600 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition"
            placeholder="Write a comment..."
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-medium transition"
          >
            Post
          </button>
        </div>

        {/* Comment List */}
        <div className="space-y-4">
          {comments?.map(comment => (
            <div
              key={comment._id}
              className="bg-gray-900/60 border border-gray-700 p-5 rounded-2xl hover:border-gray-600 transition"
            >
              <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                {comment?.user?.name}
              </div>
              <div className="text-gray-200">
                {comment?.text}
              </div>
            </div>
          ))}
        </div>
       
        {/*Activity Log*/}
        <div className="mt-8">
          <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3">
            Activity
          </h3>

          <div className="flex flex-col gap-3">
            {task?.activity?.length === 0 ? (
              <p className="text-xs text-gray-500">No activity yet</p>
            ) : (
              task?.activity?.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-3 rounded-lg text-sm"
                >
                  <p className="text-gray-300">{item.message}</p>
                  <span
                    title={new Date(item.createdAt).toLocaleString()}
                  >
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>

    {openAssign && (
      <AssignUsersModal
        task={task}
        setOpen={setOpenAssign}
        setTask={setTask}
      />
    )}
  </div>
);
};

export default TaskView;