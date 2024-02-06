import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import SuggestedUser from './SuggestedUser';
import { getProfiles } from '../../services/service';

function Suggestions() {
  const profile = useSelector((state) => state.profile.profile);
  const [profiles, setProfiles] = useState(null);
  console.log(profile);

  useEffect(() => {
    getProfiles(profile, setProfiles);
  }, [profile]);

  return !profiles ? (
    <Skeleton count={1} height={70} width={100} />
  ) : profiles.length > 0 ? (
    <div>
      <h2>Suggestions for you</h2>
      {profiles.map((prof) => (
        <SuggestedUser
          key={prof.id}
          profile={prof}
          setProfiles={setProfiles}
        />
      ))}
    </div>
  ) : null;
}

export default Suggestions;
