const MembersPagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  if (!totalPages || totalPages === 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-10 flex justify-center items-center gap-2">

      {/* PREVIOUS BUTTON */}
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="px-4 py-2 bg-[#1F2937] rounded-lg text-sm disabled:opacity-40 hover:bg-gray-700 transition"
      >
        Prev
      </button>

      {/* PAGE NUMBERS */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 rounded-lg text-sm transition
            ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-[#1F2937] hover:bg-gray-700"
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* NEXT BUTTON */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="px-4 py-2 bg-[#1F2937] rounded-lg text-sm disabled:opacity-40 hover:bg-gray-700 transition"
      >
        Next
      </button>

    </div>
  );
};

export default MembersPagination;