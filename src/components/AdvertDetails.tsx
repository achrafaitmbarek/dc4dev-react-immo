import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AdvertService from "../services/advert.service";
import { AdvertType } from "../types/advert";

const AdvertDetails = () => {
    const { id } = useParams();
    const [advert, setAdvert] = useState<AdvertType | null>(null);

    useEffect(() => {
        fetchOneAdvert();
    }, [id]);

    const fetchOneAdvert = async () => {
        if (!id) return;

        try {
            const data = await AdvertService.findOne(id);
            setAdvert(data);
        } catch (error) {
            console.log("fetchOneAdvert error: ", error);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '30px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Link
                to={`/adverts/${advert?.id}/edit`}
                style={{
                    display: 'inline-block',
                    marginBottom: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    textAlign: 'center'
                }}
            >
                Update
            </Link>

            <h1 style={{ color: '#333', marginBottom: '20px' }}>{advert?.title}</h1>
            <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#555' }}>
                {advert?.description}
            </p>
        </div>
    );
};

export default AdvertDetails;
