const img = (n: number) => `/src/assets/images/figma/product_${n}.jpeg`;

export const categories = [
    {id: 1, title: 'Công sở / Doanh nghiệp', desc: 'Sơ mi, quần âu, chân váy, vest công sở', image: img(2)},
    {id: 2, title: 'Áo Polo & Sự kiện', desc: 'Polo CVC, Pique mắt chim, team building', image: img(1)},
    {id: 3, title: 'Y tế & Spa', desc: 'Bộ Scrub co giãn 4 chiều, Áo Blouse', image: img(3)},
    {id: 4, title: 'Nhà hàng & F&B', desc: 'Áo bếp thoáng khí, tạp dề canvas', image: img(5)},
    {id: 5, title: 'Bảo hộ & Kỹ thuật', desc: 'Quần áo kaki Pangrim, áo phản quang', image: img(6)},
    {id: 6, title: 'Học sinh - Sinh viên', desc: 'Sơ mi trắng, áo khoác gió & đồ lớp', image: img(7)},
    {id: 7, title: 'Đồng phục Thể thao', desc: 'Áo thun thể thao, đồ chạy bộ giải', image: img(9)},
    {id: 8, title: 'Phụ kiện Đồng phục', desc: 'Tạp dề, nón kết, cà vạt, bảng tên', image: img(4)},
];

export const tabs = [
    {id: 0, title: 'Tất cả'},
    {id: 1, title: 'Áo Polo'},
    {id: 2, title: 'Sơ Mi Công Sở'},
    {id: 3, title: 'Y Tế & Scrubs'},
    {id: 4, title: 'Tạp Dề & Bếp'},
    {id: 5, title: 'Bảo Hộ Kaki'},
];

export const filterOpts = {
    categories: categories,
    tabs: tabs,
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: [
        '#1E1B18', '#FFFAFF', '#0A2463', '#3E92CC',
        '#D8315B', '#00DB72', '#F91E36', '#888888'
    ],
    prices: [
        'Dưới 150.000đ',
        '150.000đ - 250.000đ',
        '250.000đ - 400.000đ',
        'Trên 400.000đ'
    ]
};

export const mockProducts = [
    {
        id: 1,
        categoryId: 2,
        tabId: 1,
        name: 'Áo Polo Doanh Nghiệp Phối Line Navy',
        price: 185000,
        oldPrice: 220000,
        image: img(1),
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
        colors: ['#007a78', '#004299', '#755bb4', '#3f484d']
    },
    {
        id: 2,
        categoryId: 1,
        tabId: 2,
        name: 'Sơ Mi Trắng Kháng Khuẩn Bamboo Sợi Tre',
        price: 195000,
        oldPrice: 250000,
        image: img(2),
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#ffffff', '#d9d9d9', '#004299', '#3f484d']
    },
    {
        id: 3,
        categoryId: 3,
        tabId: 3,
        name: 'Bộ Scrub Bác Sĩ Co Giãn 4 Chiều',
        price: 260000,
        oldPrice: 320000,
        image: img(3),
        sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        colors: ['#007a78', '#004299', '#755bb4', '#3f484d']
    },
    {
        id: 4,
        categoryId: 8,
        tabId: 4,
        name: 'Tạp Dề Đồng Phục Canvas Phối Dây Da',
        price: 85000,
        oldPrice: 110000,
        image: img(4),
        sizes: ['Free Size'],
        colors: ['#755bb4', '#3f484d', '#8b5e3c', '#007a78']
    },
    {
        id: 5,
        categoryId: 4,
        tabId: 4,
        name: 'Áo Bếp Trắng Cao Cấp 2 Hàng Khuy',
        price: 215000,
        oldPrice: 270000,
        image: img(5),
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
        colors: ['#ffffff', '#3f484d', '#004299', '#007a78']
    },
    {
        id: 6,
        categoryId: 5,
        tabId: 5,
        name: 'Bộ Bảo Hộ Lao Động Kaki Pangrim',
        price: 285000,
        oldPrice: 340000,
        image: img(6),
        sizes: ['M', 'L', 'XL', '2XL', '3XL'],
        colors: ['#3f484d', '#004299', '#755bb4', '#007a78']
    },
    {
        id: 7,
        categoryId: 6,
        tabId: 1,
        name: 'Áo Polo Đồng Phục CVC Coolmax Khử Mùi',
        price: 165000,
        oldPrice: 210000,
        image: img(7),
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#ffffff', '#004299', '#007a78', '#3f484d']
    },
    {
        id: 8,
        categoryId: 3,
        tabId: 3,
        name: 'Áo Blouse Trắng Bác Sĩ Kaki Lon Nhật',
        price: 145000,
        oldPrice: 190000,
        image: img(8),
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
        colors: ['#ffffff', '#d9d9d9', '#007a78', '#004299']
    },
];
