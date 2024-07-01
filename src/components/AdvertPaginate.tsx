type PropsAdvertPaginate = {
    totalCount: number;
};

const AdvertPaginate = ({ totalCount }: PropsAdvertPaginate) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
            <p style={{ margin: 0, fontSize: '16px', color: '#333' }}>
                Number of adverts: {totalCount}
            </p>
        </div>
    );
};

export default AdvertPaginate;
