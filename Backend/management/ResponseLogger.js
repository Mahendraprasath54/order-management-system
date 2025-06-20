const fs = require('fs');

class ResponseLogger {
  constructor(sentOrders) {
    this.sentOrders = sentOrders;
  }

  log(response) {
    const sendTime = this.sentOrders.get(response.m_orderId);
    if (!sendTime) return;

    const latency = Date.now() - sendTime;
    const logLine = `${response.m_orderId},${response.m_responseType},${latency}ms\n`;

    fs.appendFile('order_responses.log', logLine, err => {
      if (err) console.error('Logging failed:', err);
    });

    this.sentOrders.delete(response.m_orderId);
  }
}

module.exports = ResponseLogger;
