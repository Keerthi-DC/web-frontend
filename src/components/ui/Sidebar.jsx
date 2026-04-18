const Sidebar = ({ items, activeId, setActiveId, iconMap = {}, title = "Committees" }) => {
  return (
    <aside className="w-64 bg-white/50 backdrop-blur-xl border-r border-gray-100 shadow-xl rounded-l-2xl overflow-hidden">

      {/* TITLE */}
      <div className="p-5 text-lg font-bold text-[#001430] border-b border-gray-100 bg-white/80">
        {title}
      </div>

      {/* ITEMS */}
      <div className="p-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={`group relative cursor-pointer px-4 py-3 mb-1 flex items-center gap-3 rounded-xl transition-all duration-300 ${
              activeId === item.id
                ? "bg-[#001430] text-white shadow-md transform scale-105"
                : "text-gray-600 hover:bg-gray-50 hover:text-[#001430] hover:scale-[1.02]"
            }`}
          >
            {/* Active indicator */}
            {activeId === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2/3 w-1 bg-yellow-500 rounded-r-md"></div>
            )}

            {/* Icon */}
            <span className={`material-symbols-outlined transition-colors duration-300 ${activeId === item.id ? "text-yellow-500" : "text-gray-400 group-hover:text-[#001430]"}`}>
              {iconMap[item.type] || "groups"}
            </span>

            {/* Title */}
            <span className="font-medium text-sm">{item.title}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
