import { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import CategoryPaginate from "./components/CategoryPaginate";
import CategoryService from "./services/category.service";

function Category() {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    fetchAllCategories();

    return () => {
      console.log("component will unmount");
    };
  }, []);

  const fetchAllCategories = async () => {
    try {
      const data = await CategoryService.findAll();
      setCategoryList(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '30px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Category List</h1>
      <CategoryList
        categoryList={categoryList}
        fetchAllCategories={fetchAllCategories}
      />
      <CategoryPaginate totalCount={categoryList.length} />
    </div>
  );
}

export default Category;
