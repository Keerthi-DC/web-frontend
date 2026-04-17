const Sidebar = ({ items, activeId, setActiveId, iconMap = {} }) => {
  return (
    <aside className="w-64 bg-white/50 backdrop-blur-xl border-r border-white/20 shadow-xl">

      {/* TITLE */}
      <div className="p-4 text-lg font-bold text-[#0f2a44] border-b border-white/20">
        Committees
      </div>

      {/* ITEMS */}
      <div className="p-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={`relative cursor-pointer px-4 py-3 flex items-center gap-3 rounded-lg transition transform duration-200 ${
              activeId === item.id
                ? "bg-[#0f2a44] text-white"
                : "text-gray-600 hover:bg-white/40 hover:scale-[1.02]"
            }`}
          >
            {/* Active indicator */}
            {activeId === item.id && (
              <div className="absolute left-0 top-0 h-full w-1 bg-white rounded-r"></div>
            )}

            {/* Icon */}
            <span className="material-symbols-outlined">
              {iconMap[item.type] || "groups"}
            </span>

            {/* Title */}
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;