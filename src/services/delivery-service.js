const { DeliveryRepository } = require("../database");
// All Business logic will be here
class CustomerService {

    constructor(){
        this.repository = new DeliveryRepository();
    }

    async MakeDelivery(data){
        // Get google map distance
        // const cost=200;
        const delivery =await this.repository.CreateDelivery({...data});
        return delivery;
    }
    async GetDeliveryById(_id){
        const delivery =await this.repository.FindById(_id);
        return delivery;
    }
    async FindDeliveryAndUpdate(orderId,data){
        const delivery = await this.repository.FindOneAndUpdate({orderId,data});
        return delivery;
    }
    
    async FindDeliveryByOrderId(_id){
        const delivery = await this.repository.FindByOrderId(_id);
        return delivery;
    }
    async GetSelectedDeliveries(orderIds){
        const delivery = await this.repository.FindSelectedDeliveries(orderIds);
        return delivery;
    }


    async SubscribeEvents(payload){
 
        console.log('Triggering.... Delivery Events')

        payload = JSON.parse(payload)

        const { event, data } =  payload;

        const { userId, order } = data;

        switch(event){
            case 'CREATE_DELIVERY':
                this.MakeDelivery(order);
                break;
            case 'UPDATE_DELIVERY':
                this.FindDeliveryAndUpdate(userId,order)

            default:
                break;
        }
    }
}

module.exports = CustomerService;