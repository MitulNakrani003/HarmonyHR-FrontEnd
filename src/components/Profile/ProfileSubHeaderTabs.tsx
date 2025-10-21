import React from 'react';
import '../../styles/ProfileSubHeaderTabs.css';

// Define the possible tab names as a type for better type safety
export type ProfileTab = 'Summary' | 'Contacts' | 'Compensation' | 'Job' | 'Pay';

interface ProfileSubHeaderTabsProps {
  activeTab: ProfileTab;
  onTabClick: (tab: ProfileTab) => void;
}

const ProfileSubHeaderTabs: React.FC<ProfileSubHeaderTabsProps> = ({ activeTab, onTabClick }) => {
  const tabs: ProfileTab[] = ['Summary', 'Contacts', 'Compensation', 'Job', 'Pay'];

  return (
    <div className="profile-tabs-container mb-4">
      <ul className="nav nav-tabs">
        {tabs.map(tab => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => onTabClick(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileSubHeaderTabs;