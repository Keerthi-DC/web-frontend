import { theme } from "./theme";

const Sidebar = ({ items, activeId, setActiveId, iconMap = {}, title = "Committees" }) => {
  return (
    <aside className={`w-64 bg-white/50 backdrop-blur-xl border-r border-gray-100 ${theme.shadows.xl} rounded-l-2xl overflow-hidden`}>

      {/* TITLE */}
      <div className={`p-5 text-lg font-bold ${theme.colors.primaryText} border-b ${theme.borders.light} bg-white/80`}>
        {title}
      </div>

      {/* ITEMS */}
      <div className="p-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={`group relative cursor-pointer px-4 py-3 mb-1 flex items-center gap-3 ${theme.radius.xl} transition-all duration-300 ${
              activeId === item.id
                ? `${theme.colors.primaryBg} text-white ${theme.shadows.md} transform scale-105`
                : `text-gray-600 hover:bg-gray-50 ${theme.colors.primaryHoverText} hover:scale-[1.02]`
            }`}
          >
            {/* Active indicator */}
            {activeId === item.id && (
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-2/3 w-1 ${theme.colors.accentBg} rounded-r-md`}></div>
            )}

            {/* Icon */}
            <span className={`material-symbols-outlined transition-colors duration-300 ${activeId === item.id ? theme.colors.accentText : `text-gray-400 group-hover:${theme.colors.primaryText}`}`}>
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
