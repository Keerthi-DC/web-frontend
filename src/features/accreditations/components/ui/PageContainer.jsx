const PageContainer = ({ children }) => {
  return (
    <section className="p-4 m-4 bg-gray-50 min-h-screen">
      {children}
    </section>
  );
};

export default PageContainer;