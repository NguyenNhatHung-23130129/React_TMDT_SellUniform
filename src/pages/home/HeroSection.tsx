import './HeroSection.scss';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Đồng Phục May Sẵn Chất Lượng Cao - Giao Nhanh Toàn Quốc</h1>
        <p className="hero-subtitle">Hơn 50.000 sản phẩm đồng phục công sở, y tế, nhà hàng, học sinh luôn có sẵn trong kho. Đặt là ship ngay trong 24h, đổi trả miễn phí trong 30 ngày.</p>
        <button className="btn-primary">Mua Ngay</button>
      </div>
      <div className="hero-image">
        <img src="/src/assets/hero.png" alt="Đồng phục may sẵn" />
      </div>
    </section>
  );
}