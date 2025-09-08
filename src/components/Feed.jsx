import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";

const Feed = () => {
    const feed = useSelector(store => store.feed);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const getfeed = async () => {
        try {
            if (feed) return;
            const res = await axios.get(BASE_URL + '/feed', { withCredentials: true });
            console.log(res);

            dispatch(addFeed(res.data));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getfeed();
    }, []);

    return feed && (
        <div className="w-full h-screen flex justify-center mt-[5em]">
            <div>
                <div className="card bg-base-300 w-96 shadow-sm">
                    <figure>
                        <img
                            src={user.photoUrl}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
                        <p>{user.age + ", " + user.gender}</p>
                        <p>{user.about}</p>
                        <div className="card-actions justify-center my-4">
                            <button className="btn btn-secondary">Interested</button>
                            <button className="btn btn-primary">Ignore</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed;