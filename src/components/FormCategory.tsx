import { useEffect, useState } from "react";
import CategoryService from "../services/category.service";
import { CategoryType } from "../types/category";
import { useNavigate, useParams } from "react-router-dom";

const FormCategory = () => {
  const [credentials, setCredentials] = useState<CategoryType>({
    name: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log("FormCategory component did mount: ", id);
    if (id) {
      handleFetchOneCategory();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleFetchOneCategory = async () => {
    if (!id) return;
    try {
      const data = await CategoryService.findOne(id);
      console.log("handleFetchOneCategory data: ", data);

      setCredentials({ name: data.name });
    } catch (error) {
      console.log("handleFetchOneCategory error: ", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (credentials.name.trim() === "") {
      return;
    }

    try {
      if (!id) {
        await CategoryService.create(credentials);
      } else {
        await CategoryService.update(credentials, id);
      }

      navigate("/categories");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '60px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Form Category</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={credentials.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '15px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
          />
        </div>
        <input
          type="submit"
          value={id ? "Update" : "Create"}
          style={{ padding: '15px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', textAlign: 'center' }}
        />
      </form>
    </div>
  );
};

export default FormCategory;
