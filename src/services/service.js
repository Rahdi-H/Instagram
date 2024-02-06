import { setProfile } from "../context/slices/profileSlice";
import { setUser } from "../context/slices/userSlice";
import { supabase } from "../lib/supabaseConfig";

export async function updateUserFollwers(person, own, isFollowing) {
    const {data, error} = await supabase
    .from('Profiles')
    .update({followers: !isFollowing? [...person.followers, own.user_id].filter((value, index, self) => self.indexOf(value) === index): person.followers.filter((item)=> item != own.user_id)})
    .eq('user_id', person.user_id)
    .select()
};

export async function updateUserFollowings(person, own, isFollowing) {
    const {data, error} = await supabase
    .from('Profiles')
    .update({following: !isFollowing? [...own.following, person.user_id].filter((value, index, self) => self.indexOf(value) === index): own.following.filter((item)=> item != person.user_id)})
    .eq('user_id', own.user_id)
    .select()

}

export async function getProfiles(profile, setProfiles) {
  console.log(profile);
    try {
      const {data, error} = await supabase
      .from('Profiles')
      .select('*')
      .limit(10)
      .neq('id', profile?.id)
      if (data && error == null && profile) {
        const inf = data.filter((prof)=> !profile.following?.includes(prof.user_id))
        setProfiles(inf)
        console.log(inf);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

export const getUser = async (dispatch, navigate) => {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user){
          const {data, error} = await supabase
          .from('Profiles')
          .select('*')
          .eq('user_id', user?.id)
          if (user && data[0]){
            dispatch(setUser(user))
            dispatch(setProfile(data[0]))
            return user
          } else {
            return null
          }
        }
    } catch (error) {
        console.log(error.message);
    }
}

export async function isActiveUserFollowingVisitedUser(ActiveID, VisitedID) {
  try {
    const {data, error} = await supabase
    .from('Profiles')
    .select('*')
    .eq('user_id', ActiveID)
    if (data && error == null) {
      const isFollowing = data[0].following.includes(VisitedID)
      console.log(isFollowing);
      return isFollowing
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function toggleFollow(activeProfile, VisitedProfile, isFollowing) {
  try {
    console.log('first try');
    const {data, error} = await supabase
    .from('Profiles')
    .update({"following": isFollowing ? [...activeProfile.following].filter((item)=> item != VisitedProfile.user_id): [...activeProfile.following, VisitedProfile.user_id]})
    .eq('user_id', activeProfile.user_id)
    .select()
    console.log(data, error);
    if (data && error == null) {
      try {
        console.log('second try');
        const {data, error} = await supabase
        .from('Profiles')
        .update({"followers": isFollowing ? [...VisitedProfile.followers].filter((item)=> item != activeProfile.user_id): [...VisitedProfile.followers, activeProfile.user_id]})
        .eq('user_id', VisitedProfile.user_id)
        .select()
        console.log(data, error);
        if (data && error == null) {
          console.log('Success');
          return 'SUCCESS';
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}