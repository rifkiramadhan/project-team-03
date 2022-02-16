const {orders} = require('../models')

class OrderController{
    static async showOrdersByUser(req,res){
        try {
            const { id } = req.userData;
            let order = await orders.findAll({
              where: { userId: id },
            });
            res.status(200).json(order);
          } catch (err) {
            res.status(500).json(err);
          }
    }
    static async showOrdersById(req,res){
        try {
            const id = +req.params.id;
            let order = await orders.findOne({
              where: { id },
              include:[users]
            });
            res.status(200).json(order);
          } catch (err) {
            res.status(500).json(err);
          }
    }
    static async createOrder(req,res){
        try {
            const {
                order_name,
                order_created_on,
                order_subtotal,
                order_discount,
                order_tax,
                order_total_due,
                order_total_qty,
                order_payt_trx_number,
                order_city,
                order_address,
                order_status,                
            } = req.body;
      
            //const userId = req.userData.id;
            let order = await orders.create(
              {
                order_name,
                order_created_on,
                order_subtotal,
                order_discount,
                order_tax,
                order_total_due,
                order_total_qty,
                order_payt_trx_number,
                order_city,
                order_address,
                order_status,
                userId,
              }
            );
            res.status(201).json(order);
          } catch (err) {
            res.status(500).json(err);
          }
    }
    static async updateOrder(req,res){
        try {
            const id = +req.params.id;
            const {
                order_name,
                order_created_on,
                order_subtotal,
                order_discount,
                order_tax,
                order_total_due,
                order_total_qty,
                order_payt_trx_number,
                order_city,
                order_address,
                order_status,
            } = req.body;
            //const userId = req.userData.id;
            let result = await orders.update(
              {
                order_name,
                order_created_on,
                order_subtotal,
                order_discount,
                order_tax,
                order_total_due,
                order_total_qty,
                order_payt_trx_number,
                order_city,
                order_address,
                order_status,
              },
              {
                where: { id },
              }
            );
      
            result[0] === 1
              ? res.status(200).json({
                  message: `${id} has been updated!`,
                })
              : res.status(404)({
                  message: `${id} has been not updated!`,
                });
          } catch (err) {
            res.status(500).json(err);
          }
    }
    static async deleteOrder(req,res){
        try {
            const id = +req.params.id;
            let result = await orders.destroy({
              where: { id },
            });
            result === 1
              ? res.status(200).json({
                  message: `${id} has been deleted!`,
                })
              : res.status(403).json({
                  message: `${id} has been not deleted!`,
                });
          } catch (err) {
            res.status(500).json(err);
          }    
    }
    static async updateStatusOrder(req,res){

    }

}

module.exports = OrderController