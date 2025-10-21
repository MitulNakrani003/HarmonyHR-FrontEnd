import React, { useState, useEffect } from 'react';
import ProfileSubHeaderTabs, { type ProfileTab } from '../components/Profile/ProfileSubHeaderTabs';
import SummarySubpage from '../components/Profile/SummarySubpage';
import AuthService from '../services/auth.service';
import ProfileService, { type DetailedEmployeeData} from '../services/profile.service';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('Summary');
  const [profile, setProfile] = useState<DetailedEmployeeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser?.userId) {
      ProfileService.getProfileData(currentUser.userId)
        .then(response => {
          setProfile(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          setError("Failed to load user profile.");
          setIsLoading(false);
        });
    } else {
      setError("No user is logged in.");
      setIsLoading(false);
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'Summary':
        return <SummarySubpage />;
      case 'Contacts':
        return <div className="card"><div className="card-body"><p>Contact information will be displayed here.</p></div></div>;
      case 'Compensation':
        return <div className="card"><div className="card-body"><p>Compensation details will be displayed here.</p></div></div>;
      case 'Job':
        return <div className="card"><div className="card-body"><p>Job history and details will be displayed here.</p></div></div>;
      case 'Pay':
        return <div className="card"><div className="card-body"><p>Payroll and payment information will be displayed here.</p></div></div>;
      default:
        return <SummarySubpage />;
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container mt-4"><div className="alert alert-danger">{error}</div></div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4 page-heading">
        {profile ? `${profile.firstName} ${profile.lastName}'s Profile` : 'User Profile'}
      </h1>
      <ProfileSubHeaderTabs activeTab={activeTab} onTabClick={setActiveTab} />
      <div className="profile-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfilePage;