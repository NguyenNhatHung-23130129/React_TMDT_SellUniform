const img = (n: number) => `/src/assets/images/figma/product_${n}.jpeg`;

export const categories = [
    {title: 'Công sở / Doanh nghiệp', desc: 'Sơ mi, quần âu, chân váy, vest công sở', image: img(2)},
    {title: 'Áo Polo & Sự kiện', desc: 'Polo CVC, Pique mắt chim, team building', image: img(1)},
    {title: 'Y tế & Spa', desc: 'Bộ Scrub co giãn 4 chiều, Áo Blouse', image: img(3)},
    {title: 'Nhà hàng & F&B', desc: 'Áo bếp thoáng khí, tạp dề canvas', image: img(5)},
    {title: 'Bảo hộ & Kỹ thuật', desc: 'Quần áo kaki Pangrim, áo phản quang', image: img(6)},
    {title: 'Học sinh - Sinh viên', desc: 'Sơ mi trắng, áo khoác gió & đồ lớp', image: img(7)},
    {title: 'Đồng phục Thể thao', desc: 'Áo thun thể thao, đồ chạy bộ giải', image: img(9)},
    {title: 'Phụ kiện Đồng phục', desc: 'Tạp dề, nón kết, cà vạt, bảng tên', image: img(4)},
];

export const tabs = ['Tất cả', 'Áo Polo', 'Sơ Mi Công Sở', 'Y Tế & Scrubs', 'Tạp Dề & Bếp', 'Bảo Hộ Kaki'];

export const filterOpts = {
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['#1E1B18', '#FFFAFF', '#0A2463', '#3E92CC', '#D8315B', '#00DB72', '#F91E36', '#888888'],
    prices: ['Dưới 150.000đ', '150.000đ - 250.000đ', '250.000đ - 400.000đ', 'Trên 400.000đ']
};

export const mockProducts = [
    {
        id: 1,
        category: 'Áo Polo & Sự kiện',
        tab: 'Áo Polo',
        name: 'Áo Polo Doanh Nghiệp Phối Line Navy',
        price: '185.000đ',
        oldPrice: '220.000đ',
        image: img(1),
        colors: ['#007a78', '#004299', '#755bb4', '#3f484d']
    },
    {
        id: 2,
        category: 'Công sở / Doanh nghiệp',
        tab: 'Sơ Mi Công Sở',
        name: 'Sơ Mi Trắng Kháng Khuẩn Bamboo Sợi Tre',
        price: '195.000đ',
        oldPrice: '250.000đ',
        image: img(2),
        colors: ['#ffffff', '#d9d9d9', '#004299', '#3f484d']
    },
    {
        id: 3,
        category: 'Y tế & Spa',
        tab: 'Y Tế & Scrubs',
        name: 'Bộ Scrub Bác Sĩ Co Giãn 4 Chiều',
        price: '260.000đ',
        oldPrice: '320.000đ',
        image: img(3),
        colors: ['#007a78', '#004299', '#755bb4', '#3f484d']
    },
    {
        id: 4,
        category: 'Phụ kiện Đồng phục',
        tab: 'Tạp Dề & Bếp',
        name: 'Tạp Dề Đồng Phục Canvas Phối Dây Da',
        price: '85.000đ',
        oldPrice: '110.000đ',
        image: img(4),
        colors: ['#755bb4', '#3f484d', '#8b5e3c', '#007a78']
    },
    {
        id: 5,
        category: 'Nhà hàng & F&B',
        tab: 'Tạp Dề & Bếp',
        name: 'Áo Bếp Trắng Cao Cấp 2 Hàng Khuy',
        price: '215.000đ',
        oldPrice: '270.000đ',
        image: img(5),
        colors: ['#ffffff', '#3f484d', '#004299', '#007a78']
    },
    {
        id: 6,
        category: 'Bảo hộ & Kỹ thuật',
        tab: 'Bảo Hộ Kaki',
        name: 'Bộ Bảo Hộ Lao Động Kaki Pangrim',
        price: '285.000đ',
        oldPrice: '340.000đ',
        image: img(6),
        colors: ['#3f484d', '#004299', '#755bb4', '#007a78']
    },
    {
        id: 7,
        category: 'Học sinh - Sinh viên',
        tab: 'Áo Polo',
        name: 'Áo Polo Đồng Phục CVC Coolmax Khử Mùi',
        price: '165.000đ',
        oldPrice: '210.000đ',
        image: img(7),
        colors: ['#ffffff', '#004299', '#007a78', '#3f484d']
    },
    {
        id: 8,
        category: 'Y tế & Spa',
        tab: 'Y Tế & Scrubs',
        name: 'Áo Blouse Trắng Bác Sĩ Kaki Lon Nhật',
        price: '145.000đ',
        oldPrice: '190.000đ',
        image: img(8),
        colors: ['#ffffff', '#d9d9d9', '#007a78', '#004299']
    },
];