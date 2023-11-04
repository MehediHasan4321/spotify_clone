import { Song } from "@/tpyes";
import usePlayer from "./usePlayer";
import useAuthModel from "./useAuthModel";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {

    const player = usePlayer()
    const authModel = useAuthModel()
    const { user } = useUser()

    const onPlay = (id: string) => {
        if (!user) {
            return authModel.onOpen()
        }

        player.setId(id);
        player.setIds(songs.map(song => song.id))



    }

    return onPlay

}

export default useOnPlay