import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const TaskView = () => {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const isCreator =
    task?.createdBy?._id === user._id;

  const isAssigned =
    task?.assignedTo?.some(u => u._id === user._id);

  const isAdmin = user.role === "admin";

  const canChangeStatus = isAdmin || isCreator || isAssigned;

  const getStatusColor = () => {
    if (task.status === "completed") return "bg-green-600";
    if (task.status === "in_progress") return "bg-yellow-600";
    return "bg-gray-600";
  };

  const isOverdue =
    task.status !== "completed" &&
    new Date(task.dueDate) < new Date();

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
    console.log("comments",data);
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
  <div className="p-6 max-w-4xl mx-auto space-y-6">

    {/* HEADER */}
    <div className="bg-gray-800 p-6 rounded-xl shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{task?.title}</h1>
        <span className="px-3 py-1 text-sm rounded bg-blue-600">
          {task?.priority}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-300">
        <div>
          Status:
          {canChangeStatus ? (
            <div className={`px-3 py-1 rounded text-sm ${getStatusColor()}`}>
              <select
                value={task.status}
                onChange={handleStatusChange}
                className="ml-2 bg-gray-700 px-2 py-1 rounded"
                >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          ) : (
            <span className={`px-3 py-1 rounded text-sm ${getStatusColor()}`}>
              {task.status}
            </span>
          )}
        </div>

        <div>
            Due Date:
            <span
                className={`ml-2 ${
                isOverdue ? "text-red-500 font-semibold" : ""
                }`}
            >
                {new Date(task.dueDate).toLocaleDateString()}
            </span>
        </div>
        <div>
          Created By: {task?.createdBy?.name}
        </div>
      </div>

      {/* Assigned Users */}
      <div className="mt-4">
        <p className="text-sm mb-2">Assigned To:</p>
        <div className="flex flex-wrap gap-2">
          {task?.assignedTo?.map(user => (
            <span
              key={user._id}
              className="bg-gray-700 px-3 py-1 rounded-full text-xs"
            >
              {user?.name}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Description */}
    <div className="bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2">Description</h2>
      <p className="text-gray-300">{task?.description}</p>
    </div>

    {/* Coments */}
    <div className="bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>

      {/* Add Comment */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 bg-gray-700 px-3 py-2 rounded"
          placeholder="Write a comment..."
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Post
        </button>
      </div>

      {/* Comment List */}
      <div className="space-y-3">
        {comments?.map(comment => (
          <div
            key={comment._id}
            className="bg-gray-700 p-3 rounded"
          >
            <div className="text-xs text-gray-400 mb-1">
              {comment?.user?.name}
            </div>
            <div>{comment?.text}</div>
          </div>
        ))}
      </div>
    </div>

  </div>
);
};

export default TaskView;