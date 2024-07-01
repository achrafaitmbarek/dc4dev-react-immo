import { Link } from "react-router-dom";
import { AdvertType } from "../types/advert";
import AdvertService from "../services/advert.service";

type PropsAdvertList = {
    advertList: AdvertType[],
    fetchAllAdverts: () => void
}

const AdvertList = ({ advertList, fetchAllAdverts }: PropsAdvertList) => {
    const handleDelete = async (id: number) => {
        try {
            await AdvertService.remove(id)
            fetchAllAdverts()
        } catch (error) {
            console.log("handleDelete error : ", error)
        }
    }

    return (
        <ul>
            {advertList.map((advert: AdvertType) => (
                <li key={advert.id} style={{ color: 'black' }}>{advert.title}

                    <Link to={`/adverts/${advert.id}`}>
                        Learn more
                    </Link>

                    <button onClick={() => handleDelete(advert.id)} style={{
                        padding: "5px 10px",
                        marginLeft: "10px",
                        backgroundColor: "#ff4d4d",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}>
                        delete
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default AdvertList;