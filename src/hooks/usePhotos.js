import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { supabase } from "../lib/supabaseConfig"

export default function usePhotos() {
    const profile = useSelector((state)=> state.profile.profile)
    const [photos, setPhotos] = useState(null)
    useEffect(()=> {
        const getPhotos = async () => {
            try {
                const {data, error} = await supabase
                .from('Photos')
                .select('*')
                .limit(20)
                if (data && error == null) {
                    console.log(data);
                    setPhotos(data.filter((pho)=> profile?.following.includes(pho.user_id)))
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getPhotos()
    }, [profile])
    return {photos}
}