import './CategorySection.scss';

const categories = [
  {
    title: 'Đồng phục Doanh nghiệp',
    desc: 'Áo sơ mi, quần quai vest, boots ...',
    image: '/src/assets/hero.png',
  },
  {
    title: 'Đồng phục Y tế',
    desc: 'Scrub co giãn 4 chiều, Áo Blouse bác sĩ',
    image: '/src/assets/hero.png',
  },
  {
    title: 'Đồng phục F&B & Bếp',
    desc: 'Áo bếp thoáng khí, Tạp dề canvas, Phụ kiện',
    image: '/src/assets/hero.png',
  },
  {
    title: 'Đồng phục Học sinh',
    desc: 'Polo cotton 100%, Áo khoác gió & Quần âu',
    image: '/src/assets/hero.png',
  },
  {
    title: 'Đồng phục Học sinh',
    desc: 'Polo cotton 100%, Áo khoác gió & Quần âu',
    image: '/src/assets/hero.png',
  },
  {
    title: 'Đồng phục Học sinh',
    desc: 'Polo cotton 100%, Áo khoác gió & Quần âu',
    image: '/src/assets/hero.png',
  },
];

export default function CategorySection() {
  return (
    <section className="category">
      <h2 className="section-title">DANH MỤC SẢN PHẨM</h2>
      <div className="category-grid">
        {categories.map((cat, i) => (
          <div key={i} className="category-card">
            <div className="category-media">
              <img src={cat.image} alt={cat.title} />
            </div>
            <div className="category-text">
              <p className="category-name">{cat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
