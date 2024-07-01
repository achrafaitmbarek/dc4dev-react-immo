import { useEffect, useState } from "react";
import AdvertList from "./components/AdvertList";
import AdvertPaginate from "./components/AdvertPaginate";
import AdvertService from "./services/advert.service";
import { Link } from "react-router-dom";

function Advert() {
  const [totalCount, setTotalCount] = useState(0);
  const [advertList, setAdvertList] = useState([]);

  const [isLogged, setIsLogged] = useState<string>(
    localStorage.getItem("access_token") as string
  );

  useEffect(() => {
    fetchAllAdverts();

    return () => {
      console.log("component will unmount");
    };
  }, []);

  const fetchAllAdverts = async () => {
    try {
      const { data, totalCount } = await AdvertService.findAll();
      setAdvertList(data);
      setTotalCount(totalCount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      {!isLogged && (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
          <Link to="/auth/signup" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px', textAlign: 'center' }}>Sign up</Link>
          <Link to="/auth/signin" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px', textAlign: 'center' }}>Sign in</Link>
        </div>
      )}
      <h1 style={{ textAlign: 'center', color: '#333' }}>Advert List</h1>
      <AdvertList advertList={advertList} fetchAllAdverts={fetchAllAdverts} />
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <Link to="/adverts/create">
          <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add an advert
          </button>
        </Link>
      </div>
      <AdvertPaginate totalCount={totalCount} />
    </div>
  );
}

export default Advert;
