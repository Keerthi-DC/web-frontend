const Sidebar = ({ items = [], activeId, setActiveId }) => {
  if (!items || !items.length) {
    return (
      <aside className="p-4 text-sm text-gray-500">
        No sections available
      </aside>
    );
  }

  return (
    <aside className="sticky top-24 h-fit">
      <div className="bg-white rounded-2xl p-3 shadow-sm border">

        <nav className="space-y-1">
          {items.map((item, idx) => {
            // ✅ SAFE FALLBACK
            const id = item?.id || item?.title || idx;
            const label = item?.title || item;

            const active = activeId === id;

            return (
              <button
                key={id}
                onClick={() => setActiveId(id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium
                  ${active ? "bg-[#0b2d5c] text-white" : "hover:bg-gray-100"}
                `}
              >
                {label}
              </button>
            );
          })}
        </nav>

      </div>
    </aside>
  );
};

export default Sidebar;