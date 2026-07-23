import { useEffect, useState } from "react";
import { api, type Order } from "../../lib/api";

interface Props {
  canDelete: boolean;
}

export function OrdersPanel({ canDelete }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    api
      .getOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function toggleCompleted(order: Order) {
    await api.updateOrder(order.id, { completed: !order.completed });
    load();
  }

  async function handleDelete(order: Order) {
    if (!confirm(`Delete order from ${order.customerName}?`)) return;
    await api.deleteOrder(order.id);
    load();
  }

  if (loading) return <p>Loading orders…</p>;
  if (orders.length === 0) return <p className="admin-hint">No orders yet.</p>;

  return (
    <div className="orders-list">
      {orders.map((order) => (
        <div
          className={`order-card ${order.completed ? "order-card-completed" : ""}`}
          key={order.id}
        >
          <div className="order-card-header">
            <div>
              <strong>{order.customerName}</strong> · {order.phone}
              <div className="order-meta">
                {order.fulfillmentType === "DELIVERY" ? "Delivery" : "Pickup"} ·{" "}
                {new Date(order.createdAt).toLocaleString()}
              </div>
              {order.address && <div className="order-meta">Address: {order.address}</div>}
              {order.notes && <div className="order-meta">Notes: {order.notes}</div>}
            </div>
            <span className={`badge ${order.completed ? "" : "badge-pending"}`}>
              {order.completed ? "Completed" : "Pending"}
            </span>
          </div>

          <ul className="order-items">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.quantity}× {item.dishName} ({item.size === "SMALL" ? "Small" : "Large"}) —{" "}
                {item.unitPrice}
              </li>
            ))}
          </ul>

          <div className="order-card-actions">
            <button type="button" className="btn btn-small" onClick={() => toggleCompleted(order)}>
              Mark as {order.completed ? "Pending" : "Completed"}
            </button>
            {canDelete && (
              <button
                type="button"
                className="btn btn-outline btn-small"
                onClick={() => handleDelete(order)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
