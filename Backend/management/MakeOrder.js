class MakeOrder {
    constructor(OrderMapping, maxOrderPerSecond)
    {
        this.OrderMapping = OrderMapping;
        this.maxOrderPerSecond = maxOrderPerSecond;
        this.orderthisSecond = 0;
    }
    validsend()
    {
        return this.orderthisSecond<this.maxOrderPerSecond;
    }

    send(order)
    {
        console.log(`[SENT] order Id ${order.m_orderId}`);
        this.OrderMapping.set(order.m_orderId, Date.now());
        this.orderthisSecond++;
    }

    reset()
    {
        this.orderthisSecond = 0;
    }
}

module.exports = MakeOrder;

