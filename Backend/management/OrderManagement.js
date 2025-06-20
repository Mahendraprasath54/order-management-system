const OrderSender = require('./MakeOrder');
const QueueManager = require('./QueueManager');
const TradingWindow = require('./TradeWindow');
const ResponseLogger = require('./ResponseLogger');
const { RequestType } = require('../enums');

class OrderManagement {
  constructor() {
    this.sentOrders = new Map();
    this.queueManager = new QueueManager();
    this.orderSender = new OrderSender(this.sentOrders, 100);
    this.tradingWindow = new TradingWindow(10, 0, 13, 0);
    this.responseLogger = new ResponseLogger(this.sentOrders);

    this.startTimers();
  }

  // Called when an order request is received
  onDataOrder(order, type = RequestType.New) {
    if (!this.tradingWindow.isTradingOpen()) {
      console.log(`[REJECTED] Order ${order.m_orderId} outside trading hours.`);
      return;
    }

    if (type === RequestType.Modify) {
      this.queueManager.modifyOrder(order);
      return;
    }

    if (type === RequestType.Cancel) {
      this.queueManager.cancelOrder(order.m_orderId);
      return;
    }

    if (this.orderSender.canSendMore()) {
      this.orderSender.send(order);
    } else {
      this.queueManager.enqueue(order);
    }
  }

  // Called when an order response is received from exchange
  onDataResponse(response) {
    this.responseLogger.log(response);
  }

  // Check if the system should send logon/logout based on time
  checkTradingWindow() {
    const now = new Date();
    this.tradingWindow.checkAndToggle(
      now,
      (logon) => console.log('[LOGON]', logon),
      (logout) => console.log('[LOGOUT]', logout)
    );
  }

  // Process the order queue every second
  processQueue() {
    this.orderSender.resetCounter();
    const batch = this.queueManager.dequeueBatch(100);
    batch.forEach(order => this.orderSender.send(order));
  }

  // Starts periodic checks
  startTimers() {
    setInterval(() => {
      this.checkTradingWindow();
      this.processQueue();
    }, 1000);
  }
}

module.exports = OrderManagement;
