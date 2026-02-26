import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import AssignUsersModal from "../components/AssignUsersModel";
import ProgressBar from "../components/ProgressBar";
import Navbar from "../components/Navbar";
import { formatDistanceToNow } from "date-fns";
import SubtaskSection from "../components/SubtaskSection";
import TodoSection from "../components/TodoSection";

const TaskView = () => {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [openAssign, setOpenAssign] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [newSubtaskDesc, setNewSubtaskDesc] = useState("");
  const [subtaskInput, setSubtaskInput] = useState({});
  const [editingSubtaskId, setEditingSubtaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const handleEditSubtask = (subtask) => {
    setEditingSubtaskId(subtask._id);
    setEditTitle(subtask.title);
    setEditDesc(subtask.description);
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isCreator =
    task?.createdBy?._id === user._id;

  const isAssigned =
    task?.assignedTo?.some(u => u._id === user._id);

  const isAdmin = user?.role === "admin";

  // const canChangeStatus = isAdmin || isCreator || isAssigned;

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

  const completedTodos = task?.todoChecklist?.filter(t => t.completed).length || 0;


  const handleClear = async () => {
    try {
      await axios.put(`/task/${id}/activity/clear`);
      setTask(prev => ({
        ...prev,
        activity: []
      }));
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  const handleDeleteSubtaskTodo = async (subtaskId, todoId) => {
    try {
      const { data } = await axios.delete(
        `/task/${id}/subtask/${subtaskId}/todo/${todoId}`
      );

      setTask(data.task);

    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  const handleToggleSubtaskTodo = async (subtaskId, todoId) => {
    try {
      const { data } = await axios.put(
        `/task/${id}/subtask/${subtaskId}/todo/${todoId}`
      );

      setTask(data.task);

    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  const handleAddSubtaskTodo = async (subtaskId) => {
    const text = subtaskInput[subtaskId];
    if (!text?.trim()) return;

    try {
      const { data } = await axios.post(
        `/task/${id}/subtask/${subtaskId}/todo`,
        { text }
      );
      console.log("todo data", data);

      setTask({...data.task});

      setSubtaskInput({
        ...subtaskInput,
        [subtaskId]: ""
      });

    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  const handleUpdateSubtask = async (subtaskId) => {
    try {
      const { data } = await axios.put(
        `/task/${id}/subtask/${subtaskId}`,
        {
          title: editTitle,
          description: editDesc
        }
      );

      setTask(data.task);
      setEditingSubtaskId(null);

    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  const handleDeleteSubtask = async (subtaskId) => {
    try {
      const { data } = await axios.delete(
        `/task/${id}/subtask/${subtaskId}`
      );

      setTask(data.task);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  const handleCreateSubtask = async () => {
    if (!newSubtaskTitle.trim() || !newSubtaskDesc.trim()) return;

    try {
      const { data } = await axios.post(
        `/task/${id}/subtask`,
        {
          title: newSubtaskTitle,
          description: newSubtaskDesc,
          todos: []
        }
      );

      setTask(data.task);
      setNewSubtaskTitle("");
      setNewSubtaskDesc("");

    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };
  
  const handleDeleteTodo = async (todoId) => {
    try {
      const { data } = await axios.delete(
        `/task/todo/${id}/${todoId}`
      );

      setTask(data.task);

    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  const handleToggleTodo = async (todoId) => {
    try {
      const { data } = await axios.put(
        `/task/todo/${id}/${todoId}`
      );

      setTask(data.task);

    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const { data } = await axios.post(
        `/task/todo/${id}`,
        { text: newTodo }
      );

      setTask(data.task);
      setNewTodo("");

    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };  

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

  const fetchTask = async () => {
    const { data } = await axios.get(`/task/${id}`);
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
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-100 ">
    <Navbar/>
    <div className="max-w-4xl mx-auto space-y-10">
     <div className="space-y-3 mt-4">
        <ProgressBar value={task.progress} />
      </div>

      {/* HEADER CARD */}
      <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700 p-6 sm:p-10 rounded-3xl shadow-2xl shadow-black/30 space-y-10">

        {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex-1">
              <h1 className="text-3xl uppercase sm:text-4xl font-bold tracking-tight">
                {task?.title}
              </h1>
            </div>


            <div className="flex items-center gap-3">
              {/* Status */}
              <span
                className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor()}`}
              >
                {task.status === "pending" && "Pending"}
                {task.status === "in_progress" && "In Progress"}
                {task.status === "completed" && "Completed"}
              </span>
              
              {/* Priority */}
              <span
                className={`px-4 py-1.5 text-sm font-semibold rounded-full sm:self-auto ${getPriorityColor()}`}
              >
                {task?.priority?.toUpperCase()}
              </span>

            </div>
          </div>

        {task?.description && (
          <div className="max-w-3xl">
            <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed">
              {task.description}
            </p>
          </div>
        )}

        {/* META INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          {/* Due Date */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
              Due Date
            </p>
            <p
              className={`font-medium ${
                isOverdue ? "text-red-400" : "text-gray-200"
              }`}
            >
              {new Date(task.dueDate).toLocaleDateString()}
            </p>
          </div>

          {/* Created By */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
              Created By
            </p>
            <p className="text-gray-200 font-medium">
              {task?.createdBy?.name}
            </p>
          </div>

          {/* Assigned Users */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-5 space-y-4">

            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Assigned To
              </p>

              {(isAdmin || isCreator || isAssigned) && (
                <button
                  onClick={() => setOpenAssign(true)}
                  className="text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-full transition"
                >
                  + Assign
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {task?.assignedTo?.length === 0 ? (
                <span className="text-gray-500 text-xs italic">
                  No users assigned
                </span>
              ) : (
                task?.assignedTo?.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full text-xs"
                  >
                    <span>{user?.name}</span>

                    {(isAdmin || isCreator) && (
                      <button
                        onClick={() => handleUnAssignTask(user._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

    {/* TODO SECTION */}
    <TodoSection
      title="Checklist"
      todos={task?.todoChecklist || []}
      newTodo={newTodo}
      setNewTodo={setNewTodo}
      onAdd={handleAddTodo}
      onToggle={handleToggleTodo}
      onDelete={handleDeleteTodo}
      disabled={task?.status === "completed"}
      completedCount={completedTodos}
    /> 

    {/* SUBTASKS */}
    <SubtaskSection
      task={task}
      newSubtaskTitle={newSubtaskTitle}
      setNewSubtaskTitle={setNewSubtaskTitle}
      newSubtaskDesc={newSubtaskDesc}
      setNewSubtaskDesc={setNewSubtaskDesc}
      handleCreateSubtask={handleCreateSubtask}
      editingSubtaskId={editingSubtaskId}
      setEditingSubtaskId={setEditingSubtaskId}
      editTitle={editTitle}
      setEditTitle={setEditTitle}
      editDesc={editDesc}
      setEditDesc={setEditDesc}
      handleUpdateSubtask={handleUpdateSubtask}
      handleDeleteSubtask={handleDeleteSubtask}
      handleEditSubtask={handleEditSubtask}
      subtaskInput={subtaskInput}
      setSubtaskInput={setSubtaskInput}
      handleAddSubtaskTodo={handleAddSubtaskTodo}
      handleToggleSubtaskTodo={handleToggleSubtaskTodo}
      handleDeleteSubtaskTodo={handleDeleteSubtaskTodo}
    />

    {/* COMMENTS */}
    <div className="bg-gray-800/60 border border-gray-700 p-6 sm:p-8 rounded-3xl shadow-xl shadow-black/20 space-y-8">

      <div className="flex items-center justify-between">
        <h2 className="text-xl uppercase font-semibold tracking-tight">
          Comments
        </h2>

        <span className="text-sm text-gray-400">
          {comments?.length || 0} total
        </span>
      </div>

      {/* Add Comment */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 bg-gray-700/60 border border-gray-600 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
          placeholder="Write a comment..."
        />
        <button
          onClick={handleAddComment}
          className="bg-white text-black hover:bg-gray-200 px-5 py-3 rounded-xl font-medium transition"
        >
          Post
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-700/60" />

      <div className="space-y-6">
        {comments?.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            No comments yet
          </p>
        ) : (
          comments?.map((comment) => (
            <div key={comment._id} className="flex gap-4">

              {/* Avatar Circle */}
              <div className="w-9 h-9 rounded-full bg-blue-600/20 flex items-center justify-center text-sm font-semibold text-blue-400">
                {comment?.user?.name?.charAt(0)}
              </div>

              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-200">
                    {comment?.user?.name}
                  </span>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {comment?.text}
                </p>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
       
    {/* Activity Log */}
    <div className="space-y-6">

      <h3 className="text-sm uppercase tracking-wider text-gray-400">
        Activity
      </h3>

      <button
        onClick={handleClear}
        className="text-gray-400 uppercase hover:text-red-400 transition"
      >
       Clear
      </button>

      <div className="space-y-8">

        {task?.activity?.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            No activity yet
          </p>
        ) : (
          task?.activity
          ?.filter(item => !item.isArchived)
          ?.map((item, index) => (
            <div key={index} className="flex gap-4 items-start">

              {/* Dot */}
              <div className="mt-2 w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />

              {/* Content */}
              <div className="flex-1 space-y-1">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {item.message}
                </p>

                <span
                  className="text-xs text-gray-500"
                  title={new Date(item.createdAt).toLocaleString()}
                >
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

            </div>
          ))
        )}

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