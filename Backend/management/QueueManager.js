// QueueManager.js

class QueueManager {
  constructor() {
    this.queue = [];
  }

  enqueue(order) {
    this.queue.push(order);
  }

  dequeueBatch(limit) {
    return this.queue.splice(0, limit);
  }

  modifyOrder(modifyOrder) {
    const existing = this.queue.find(o => o.m_orderId === modifyOrder.m_orderId);
    if (existing) {
      existing.m_price = modifyOrder.m_price;
      existing.m_qty = modifyOrder.m_qty;
    }
  }

  cancelOrder(orderId) {
    this.queue = this.queue.filter(order => order.m_orderId !== orderId);
  }

  get length() {
    return this.queue.length;
  }
}

module.exports = QueueManager;
