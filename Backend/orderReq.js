class orderReq {
       constructor(symbolId, price, qyt,side, orderId)
       {
        this.m_symbolId = symbolId;
        this.m_price = price;
        this.m_quantity = qyt;
        this.side = side;
        this.m_orderId = orderId;}
    }

    module.exports = orderReq;