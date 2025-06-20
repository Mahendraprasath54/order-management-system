const OrderManagement = require('./management/OrderManagement');
const OrderRequest = require('./orderReq');
const OrderResponse = require('./orderRes');
const { RequestType, ResponseType } = require('./enums');

const oms = new OrderManagement();

for (let i = 1; i <= 105; i++) {
  const order = new OrderRequest(1, 100.0, 10, 'B', i);
  console.log("RequestType:", RequestType);

  oms.onDataOrder(order, RequestType.New);
}

const modify = new OrderRequest(1, 120.0, 5, 'B', 5);
oms.onDataOrder(modify, RequestType.Modify);

const cancel = new OrderRequest(1, 0, 0, 'B', 6);
oms.onDataOrder(cancel, RequestType.Cancel);


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function simulateResponse() {
  await delay(2000); 
  const response = new OrderResponse(5, ResponseType.Accept);
  oms.onDataResponse(response);
}

simulateResponse();
