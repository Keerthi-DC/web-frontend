const SectionRenderer = ({ section }) => {
  switch (section.type) {

    case "image":
      return (
        <div className="mb-12">
          <div className="rounded-3xl overflow-hidden aspect-[21/10] shadow-xl border border-gray-200">
            <img src={section.images[0]} className="w-full h-full object-cover" />
          </div>
        </div>
      );

    case "paragraph":
      return (
        <div className="bg-gray-100 p-6 rounded-2xl mb-8">
          <p className="text-gray-600 text-lg leading-relaxed">
            {section.text}
          </p>
        </div>
      );

    case "heading":
      return (
        <h3 className="text-3xl italic mb-6 text-gray-800">
          {section.text}
        </h3>
      );

    case "list":
      return (
        <div className="space-y-3 mb-10">
          {section.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-gray-100 rounded-full">
              <span className="material-symbols-outlined">check</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <div className="mb-14">
          {section.title && (
            <h3 className="text-3xl italic mb-8">{section.title}</h3>
          )}

          <div className="rounded-3xl overflow-hidden border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {section.columns.map((col, i) => (
                    <th key={i} className="p-4 text-left">{col}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {section.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="p-4">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "info":
      return (
        <div className="grid grid-cols-2 gap-6 mb-14">
          {section.data.map((item, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-2xl">
              <div className="text-3xl font-bold">{item.value}</div>
              <div className="text-xs text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
};

export default SectionRenderer;
