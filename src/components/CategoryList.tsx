import { CategoryType } from "../types/category";
import CategoryService from "../services/category.service";
import { Link } from "react-router-dom";

type PropsCategoryList = {
  categoryList: CategoryType[];
  fetchAllCategories: () => void;
};

const CategoryList = ({
  categoryList,
  fetchAllCategories,
}: PropsCategoryList) => {
  const handleDelete = async (id: number) => {
    try {
      await CategoryService.remove(id);
      fetchAllCategories();
    } catch (error) {
      console.log("handleDelete error: ", error);
    }
  };

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {categoryList &&
        categoryList.map((category: CategoryType) => (
          <li
            key={category.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ccc",
              marginBottom: "10px",
            }}
          >
            <span style={{ color: 'black' }}>{category.name}</span>

            <div>
              <Link
                to={`/categories/${category.id}/edit`}
                style={{
                  marginRight: "10px",
                  color: "#007bff",
                  textDecoration: "none",
                }}
              >
                Learn more
              </Link>

              <button
                onClick={() => category.id && handleDelete(category.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default CategoryList;
