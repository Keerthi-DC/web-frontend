import React from 'react';
import SectionContainer from '../common/SectionContainer';
import SectionTitle from '../common/SectionTitle';
import ReadMoreButton from '../common/ReadMoreButton';
import GridLayout from '../common/GridLayout';
const CallToActionSection = () => (
  <SectionContainer>
    <SectionTitle title="Get Involved" />
    <p className="mb-6" >Join our vibrant community and shape the future of engineering.</p>
    <button className="bg-yellow-300 text-[#0a2a66] px-6 py-3 rounded-md transition-colors hover:bg-yellow-400" >Apply Now</button>
  </SectionContainer>
);

export default CallToActionSection;
