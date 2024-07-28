const mongoose = require('mongoose');
const {DeliveryModel} = require('../models');

//Dealing with data base operations
class CustomerRepository {

    async CreateDelivery(data){
        const newDevlivery = new DeliveryModel(data);
        newDevlivery.save();
        return newDevlivery;
    }
    
    async FindById(_id){
        const devlivery = await DeliveryModel.findById(_id);
        return devlivery;
    }
    
    async FindOneAndUpdate({orderId,data}){
        console.log(orderId,data)
        const {status,currentLocation,longitude,latitude,estimatedDeliveryDate} = data;

        const devlivery = await DeliveryModel.findOneAndUpdate({orderId:data.orderId},{
            status,currentLocation,longitude, latitude,estimatedDeliveryDate},{new:true});

        return devlivery;
    }
    
    async FindByOrderId(_id){
        const devlivery = await DeliveryModel.find({orderId:_id});
        return devlivery;
    }

    async FindSelectedDeliveries(orderIds){
            const deliveries = await DeliveryModel.find({
                orderId: { $in: orderIds }
            });
            return deliveries;
    }
    
    
 


}

module.exports = CustomerRepository;
