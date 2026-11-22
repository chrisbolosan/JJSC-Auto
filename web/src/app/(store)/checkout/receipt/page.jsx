
import {getOrderById} from '@/server/services/orderDetails.service';
import { getItem } from '@/app/api/utils/localStorage'
import ShowOrderReceipt from '@/components/ShowOrderReceipt'
export default function Receipt(){
  const orderId = getItem("ORDER_ID");
    return(
    <div className="bg-white">  
      <ShowOrderReceipt/>
    </div>
    );
}

async function OrderDetail({orderId}) {
  const order = await getOrderById(Number(orderId));
  
}