import { useMemo, useState } from 'react';
import type { OrderHistoryRecord, OrderHistoryStatus } from './orderHistoryTypes';
import './OrderHistory.css';

type OrderHistoryProps = {
  orders: OrderHistoryRecord[];
  onContinueShopping: () => void;
};

type StatusFilter = 'all' | OrderHistoryStatus;
type TimeFilter = 'all' | '30' | '90';

const statusLabels: Record<OrderHistoryStatus, string> = {
  waiting: 'Chờ xác nhận',
  shipping: 'Đang giao hàng',
  completed: 'Đã hoàn thành',
  cancelled: 'Đã hủy',
};

const formatCurrency = (amount: number) => `${amount.toLocaleString('vi-VN')} đ`;
const formatQuantity = (quantity: string) => quantity.replace(/^Số lượng:\s*/i, '');

function MetricIcon({ type }: { type: 'orders' | 'waiting' | 'shipping' | 'completed' }) {
  if (type === 'waiting') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (type === 'shipping') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
        <circle cx="7.5" cy="18" r="1.8" />
        <circle cx="18" cy="18" r="1.8" />
      </svg>
    );
  }

  if (type === 'completed') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m5 12.5 4.5 4L19 7" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3.5h9l4 4V21H6z" />
      <path d="M15 3.5V8h4M9 12h7M9 16h7" />
    </svg>
  );
}

function OrderThumbnail({ tone }: { tone: string }) {
  return (
    <span className={`history-product-thumbnail ${tone}`} aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <path d="m15 8 9 4 9-4 9 7-5 8-5-3v20H16V20l-5 3-5-8 9-7Z" />
        <path className="history-shirt-seam" d="m18 9 6 7 6-7M24 16v24" />
      </svg>
    </span>
  );
}

function OrderHistory({ orders, onContinueShopping }: OrderHistoryProps) {
  const [searchInput, setSearchInput] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const statusCounts = useMemo(
    () => ({
      all: orders.length,
      waiting: orders.filter((order) => order.status === 'waiting').length,
      shipping: orders.filter((order) => order.status === 'shipping').length,
      completed: orders.filter((order) => order.status === 'completed').length,
      cancelled: orders.filter((order) => order.status === 'cancelled').length,
    }),
    [orders],
  );

  const filteredOrders = useMemo(() => {
    const query = submittedSearch.trim().toLocaleLowerCase('vi-VN');
    const cutoff = timeFilter === 'all' ? 0 : Date.now() - Number(timeFilter) * 24 * 60 * 60 * 1000;

    return orders
      .filter((order) => statusFilter === 'all' || order.status === statusFilter)
      .filter((order) => timeFilter === 'all' || order.createdAt >= cutoff)
      .filter((order) => {
        if (!query) return true;

        const searchableText = [
          order.orderNumber,
          order.customerName,
          ...order.items.flatMap((item) => [item.name, item.options]),
        ]
          .join(' ')
          .toLocaleLowerCase('vi-VN');

        return searchableText.includes(query);
      })
      .sort((a, b) =>
        sortOrder === 'newest' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt,
      );
  }, [orders, statusFilter, submittedSearch, timeFilter, sortOrder]);

  const pageSize = 4;
  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const pageOrders = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const selectStatus = (status: StatusFilter) => {
    setStatusFilter(status);
    setCurrentPage(1);
    setExpandedOrder(null);
  };

  const setTimeRange = (range: TimeFilter) => {
    setTimeFilter(range);
    setCurrentPage(1);
  };

  const toggleOrderDetails = (orderNumber: string) => {
    setExpandedOrder((current) => (current === orderNumber ? null : orderNumber));
  };

  return (
    <div className="order-history-page">
      <nav className="order-history-breadcrumb" aria-label="Điều hướng">
        <button type="button" onClick={onContinueShopping}>
          Trang chủ
        </button>
        <span aria-hidden="true">›</span>
        <span>Tài khoản</span>
        <span aria-hidden="true">›</span>
        <strong>Lịch sử đơn hàng</strong>
      </nav>

      <div className="order-history-title-row">
        <div>
          <h1>Lịch sử đơn hàng</h1>
          <p>Quản lý đơn hàng, theo dõi giao nhận và dễ dàng đặt lại những sản phẩm yêu thích.</p>
        </div>
        <button type="button" className="history-shop-button" onClick={onContinueShopping}>
          <span aria-hidden="true">＋</span> Tiếp tục mua sắm
        </button>
      </div>

      <section className="history-metrics" aria-label="Thống kê đơn hàng">
        <article className="history-metric-card">
          <span className="history-metric-icon">
            <MetricIcon type="orders" />
          </span>
          <div>
            <span>Tổng đơn hàng</span>
            <strong>{String(statusCounts.all).padStart(2, '0')}</strong>
            <small>Từ trước đến nay</small>
          </div>
        </article>
        <article className="history-metric-card">
          <span className="history-metric-icon metric-waiting">
            <MetricIcon type="waiting" />
          </span>
          <div>
            <span>Chờ xác nhận</span>
            <strong>{String(statusCounts.waiting).padStart(2, '0')}</strong>
            <small>Đang được xử lý</small>
          </div>
        </article>
        <article className="history-metric-card">
          <span className="history-metric-icon metric-shipping">
            <MetricIcon type="shipping" />
          </span>
          <div>
            <span>Đang giao hàng</span>
            <strong>{String(statusCounts.shipping).padStart(2, '0')}</strong>
            <small>Sắp đến tay bạn</small>
          </div>
        </article>
        <article className="history-metric-card">
          <span className="history-metric-icon metric-completed">
            <MetricIcon type="completed" />
          </span>
          <div>
            <span>Đã hoàn thành</span>
            <strong>{String(statusCounts.completed).padStart(2, '0')}</strong>
            <small>Cảm ơn bạn đã chọn</small>
          </div>
        </article>
      </section>

      <section className="history-filter-panel" aria-label="Tìm kiếm và lọc đơn hàng">
        <form
          className="history-filter-controls"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmittedSearch(searchInput);
            setCurrentPage(1);
          }}
        >
          <label className="history-search-field">
            <span>Tìm kiếm đơn hàng</span>
            <span className="history-search-box">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 5 5" />
              </svg>
              <input
                type="search"
                placeholder="Nhập mã đơn hàng hoặc tên sản phẩm..."
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
            </span>
          </label>
          <label className="history-time-field">
            <span>Thời gian đặt hàng</span>
            <select
              value={timeFilter}
              onChange={(event) => setTimeRange(event.target.value as TimeFilter)}
            >
              <option value="all">Tất cả thời gian</option>
              <option value="30">30 ngày gần nhất</option>
              <option value="90">90 ngày gần nhất</option>
            </select>
          </label>
          <button className="history-search-button" type="submit">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 5 5" />
            </svg>
            Tìm kiếm
          </button>
        </form>

        <div className="history-status-tabs" role="group" aria-label="Lọc theo trạng thái đơn hàng">
          {(
            [
              ['all', 'Tất cả'],
              ['waiting', 'Chờ xác nhận'],
              ['shipping', 'Đang giao hàng'],
              ['completed', 'Đã hoàn thành'],
              ['cancelled', 'Đã hủy'],
            ] as const
          ).map(([status, label]) => (
            <button
              key={status}
              type="button"
              aria-pressed={statusFilter === status}
              className={statusFilter === status ? 'is-active' : ''}
              onClick={() => selectStatus(status)}
            >
              {label} ({statusCounts[status]})
            </button>
          ))}
        </div>
      </section>

      <div className="history-list-toolbar">
        <p>
          <strong>{filteredOrders.length} đơn hàng</strong> • Hiển thị {pageOrders.length} đơn hàng
        </p>
        <label>
          Sắp xếp:
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as 'newest' | 'oldest')}
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
        </label>
      </div>

      <div className="history-order-list">
        {pageOrders.map((order) => (
          <article className="history-order-card" key={order.orderNumber}>
            <div className="history-order-heading">
              <div>
                <span>Đơn hàng</span> <strong>{order.orderNumber}</strong>
              </div>
              <time>Ngày đặt: {order.orderedAt}</time>
              <span className={`history-status-badge status-${order.status}`}>
                <i aria-hidden="true" /> {statusLabels[order.status]}
              </span>
            </div>

            <div className="history-order-items">
              {order.items.map((item, index) => (
                <div className="history-order-item" key={`${order.orderNumber}-${item.name}`}>
                  <OrderThumbnail tone={item.tone} />
                  <div className="history-item-copy">
                    <h2>{item.name}</h2>
                    <p>{item.options}</p>
                  </div>
                  <span className="history-item-quantity">{formatQuantity(item.quantity)}</span>
                  {index === order.items.length - 1 && (
                    <div className="history-order-total">
                      <span>
                        {order.items.length} sản phẩm • {formatQuantity(item.quantity)}
                      </span>
                      <strong>{formatCurrency(order.total)}</strong>
                      <small>{order.paymentLabel}</small>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="history-order-footer">
              <p>
                <span aria-hidden="true">◉</span>
                {order.status === 'shipping'
                  ? `${order.shippingLabel} • Mã đơn đang được vận chuyển.`
                  : order.status === 'completed'
                    ? `${order.shippingLabel} • Cảm ơn bạn đã mua hàng!`
                    : order.status === 'cancelled'
                      ? 'Đơn hàng đã được hủy theo yêu cầu.'
                      : 'Đơn hàng đang chờ xác nhận từ cửa hàng.'}
              </p>
              <div className="history-order-actions">
                <button
                  type="button"
                  className="history-detail-button"
                  onClick={() => toggleOrderDetails(order.orderNumber)}
                >
                  {expandedOrder === order.orderNumber ? 'Thu gọn' : 'Xem chi tiết'}
                </button>
                {order.status === 'shipping' && (
                  <button
                    type="button"
                    className="history-track-button"
                    onClick={() => toggleOrderDetails(order.orderNumber)}
                  >
                    Theo dõi đơn hàng
                  </button>
                )}
                {(order.status === 'completed' || order.status === 'cancelled') && (
                  <button
                    type="button"
                    className="history-track-button"
                    onClick={onContinueShopping}
                  >
                    Mua lại
                  </button>
                )}
              </div>
            </div>

            {expandedOrder === order.orderNumber && (
              <div className="history-order-expanded">
                <div>
                  <span>Người nhận</span>
                  <strong>
                    {order.customerName} • {order.customerPhone}
                  </strong>
                </div>
                <div>
                  <span>Địa chỉ</span>
                  <strong>{order.address}</strong>
                </div>
                <div>
                  <span>Thanh toán</span>
                  <strong>{order.paymentLabel}</strong>
                </div>
                <div>
                  <span>Vận chuyển</span>
                  <strong>{order.shippingLabel}</strong>
                </div>
                {order.status === 'shipping' && (
                  <p role="status">Đơn hàng đã rời kho và đang trên đường giao đến bạn.</p>
                )}
              </div>
            )}
          </article>
        ))}

        {pageOrders.length === 0 && (
          <div className="history-empty-state">
            <span aria-hidden="true">⌕</span>
            <strong>Không tìm thấy đơn hàng</strong>
            <p>Thử đổi từ khóa hoặc bộ lọc để xem các đơn hàng khác.</p>
          </div>
        )}
      </div>

      {pageCount > 1 && (
        <nav className="history-pagination" aria-label="Phân trang đơn hàng">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            ‹ Trước
          </button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
            <button
              type="button"
              key={page}
              className={currentPage === page ? 'is-active' : ''}
              aria-current={currentPage === page ? 'page' : undefined}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage === pageCount}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            Sau ›
          </button>
        </nav>
      )}

      <aside className="history-help-card">
        <span className="history-help-icon" aria-hidden="true">
          ☎
        </span>
        <div>
          <strong>Bạn cần hỗ trợ về đơn hàng?</strong>
          <p>Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn.</p>
          <small>Thứ 2 - Chủ nhật, 8:00 - 21:00</small>
        </div>
        <a href="tel:19001234" className="history-phone-button">
          1900 1234
        </a>
        <a href="mailto:23130129@st.hcmuaf.edu.vn" className="history-support-button">
          Nhắn tin hỗ trợ
        </a>
      </aside>
    </div>
  );
}

export default OrderHistory;
