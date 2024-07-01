type PropsCategoryPaginate = {
  totalCount: number;
};

const CategoryPaginate = ({ totalCount }: PropsCategoryPaginate) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
      <p style={{ margin: 0, fontSize: '16px', color: '#333' }}>
        Number of categories: {totalCount}
      </p>
    </div>
  );
};

export default CategoryPaginate;

