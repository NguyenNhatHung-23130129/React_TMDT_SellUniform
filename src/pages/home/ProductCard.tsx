import './ProductCard.scss';

const tabs = ['Tất cả sản phẩm', 'Doanh nghiệp', 'Y tế', 'Công sở', 'Học sinh'];

const products = [
  {
    name: 'Áo Polo CVC Coolmax Kháng…',
    specs: '65% Cotton CVC, 35% Poly chống xù, size S - 3XL',
    price: '185.000 đ',
    image: '/src/assets/hero.png',
    colors: ['#002b49', '#f8f9fa', '#5d6c7b', '#0a1317'],
  },
  {
    name: 'Bộ Scrub Bác Sĩ Tech-Flex 4…',
    specs: 'Poly/Rayon/Spandex, co giãn đa chiều, đóng gói sẵn bộ',
    price: '365.000 đ',
    image: '/src/assets/hero.png',
    colors: ['#007a78', '#004299', '#755bb4', '#3f484d'],
  },
];


export default function ProductCard() {
  return (
    <section className="product-section">
      <div className="head">
        <h2 className="title">Top sản phẩm bán chạy</h2>
        <div className="tabs">
          {tabs.map((label, i) => (
            <button key={i} className={`tab ${i === 0 ? 'selected' : ''}`}>{label}</button>
          ))}
        </div>
      </div>
      <div className="grid">
        {products.map((product, i) => (
          <div key={i} className="card">
            <div className="media">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="content">
              <p className="name">{product.name}</p>
              <p className="specs">{product.specs}</p>
              <div className="colors">
                {product.colors.map((color, j) => (
                  <button
                    key={j}
                    className={`swatch ${j === 0 ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Màu ${j + 1}`}
                  />
                ))}
                <button className="swatch more">
                  +{product.colors.length - 1} màu
                </button>
                <button className="save" aria-label="Lưu mẫu">
                  <i className="fa-regular fa-heart"></i>
                </button>
              </div>
            </div>
            <div className="price">
              <p className="label">Giá niêm yết:</p>
              <p className="value">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}