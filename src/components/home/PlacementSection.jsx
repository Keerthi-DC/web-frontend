import React, { useEffect, useState } from 'react';
import SectionContainer from '../common/SectionContainer';
import SectionTitle from '../common/SectionTitle';
import ReadMoreButton from '../common/ReadMoreButton';

// ---------- Statistics data ----------
const placementStats = [
  { label: 'Placement Rate', value: '95%' },
  { label: 'Highest Package', value: '₹24 LPA' },
  { label: 'Average Package', value: '₹6.5 LPA' },
  { label: 'Recruiters', value: '120+' },
];

// Component for company logo card
const CompanyLogoCard = ({ logo, company }) => (
  <div className="flex flex-col items-center space-y-2 p-4 rounded-lg transform transition hover:scale-105 shadow-md">
    <img src={logo} alt={company} className="w-20 h-12 object-contain" />
    <span className="text-sm font-medium">{company}</span>
  </div>
);

// Component for student highlight card (small)
const StudentHighlightCard = ({ student }) => (
  <div className="flex flex-col items-center p-3 space-y-2 rounded-lg shadow-lg bg-white hover:scale-105 transform transition">
    <img src={student.image} alt={student.name} className="w-24 h-24 rounded-full object-cover" />
    <div className="text-center">
      <h3 className="text-sm font-semibold">{student.name}</h3>
      <p className="text-xs text-gray-600">{student.company}</p>
      <p className="text-xs font-medium">{student.package}</p>
    </div>
  </div>
);

const PlacementSection = () => {
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('/data/placements.json')
      .then(r => r.json())
      .then(setCompanies)
      .catch(console.error);
    fetch('/data/placementHighlights.json')
      .then(r => r.json())
      .then(setStudents)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-gray-200 py-16">
      <h2 className="text-3xl font-bold text-center mb-10 shake-text">
Placements
</h2>

      {/* Statistics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-8 text-center">
        {placementStats.map((s, i) => (
          <div key={i} className="p-6 rounded-lg bg-gray-50">
            <p className="text-4xl font-bold text-indigo-600">{s.value}</p>
            <p className="mt-2 text-sm text-gray-700">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Company logos */}
      <h2 className="text-3xl font-bold text-center mb-10 shake-text">Recruiter Companies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 mt-4">
        {companies.map(c => (
          <CompanyLogoCard key={c.id} logo={c.logo} company={c.company} />
        ))}
      </div>

      {/* Student highlights */}
      <div className=" items-center justify-center mt-12">
      <h2 className="text-3xl font-bold text-center mb-10 shake-text">Student Placement Highlights</h2>
      <div className="flex items-center justify-center overflow-x-auto space-x-4 mt-4 pb-4">
        {students.map(s => (
          <StudentHighlightCard key={s.id} student={s} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default PlacementSection;
