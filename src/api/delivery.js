const DeliveryService = require('../services/delivery-service');
const  UserAuth = require('./middlewares/auth');
const { SubscribeMessage } = require('../utils');


module.exports = (app, channel) => {
    
    const service = new DeliveryService();

    // To listen
    SubscribeMessage(channel, service);   
     

   // Create a new delivery record
    app.post('/', async (req, res) => {
        try {
            const delivery =await service.MakeDelivery(req.body);
            res.status(201).json(delivery);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

// Retrieve delivery information
    app.get('/:id', async (req, res) => {
        try {
            const delivery =await service.GetDeliveryById(req.params.id);
            if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
            res.json(delivery);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Update delivery status
    app.put('/:id', async (req, res) => {
        try {
            const delivery = await service.FindDeliveryAndUpdate(req.params.id, req.body);
            if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
            res.json(delivery);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Retrieve delivery information for a specific order
    app.get('/order/:orderId', async (req, res) => {
        try {
            const deliveries = await service.FindDeliveryByOrderId(req.params.orderId);
            res.json(deliveries);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }); 

    app.post("/ids", async (req, res, next) => {
        const { ids } = req.body;
        const products = await service.GetSelectedDeliveries(ids);
        return res.status(200).json(products);
      });
}
