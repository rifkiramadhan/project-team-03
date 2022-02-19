const { User, 
        Order, 
        Line_Item 
} = require('../models')

class OrderController {
    static async showOrders(req, res) {
        try {
          let order = await Order.findAll({
          order: [['UserId', 'ASC']],
            include: 
              [
                User
              ] 
          });
    
          res.status(200).json(order);
        } catch (err) {
          res.status(500).json(err);
        };
      };

    static async showOrdersById(req, res){  
      try{
          let id = +req.params.id;
          let orders = await Order.findOne({
              where:{id}
          });

          res.status(200).json(orders);
        } catch (err){
          res.status(500).json(err);
        };
    };

    static async showOrdersUsers(req, res) {
      try{
        const {id} = req.UserDetail
        let order =  await Order.findAll({
          where : { UserId : id }
        });

        res.status(200).json(order);
      } catch (err) {
        res.status(500).json(err);
      };
    };

    static async addOrders(req, res) {
        try {
          // Subtotal harga total semua barang
          const { name, subtotal, total_qty, city, address } = req.body;
          const UserId = req.UserDetail.id;
          let order = await Order.create({
            name, created_on:new Date(), subtotal, total_qty, city, address, UserId
          });;

          res.status(201).json(order);
    } catch (err) {
          res.status(500).json(err);
        };
    };
    
    static async deleteOrders(req, res) {
        try {
          const id = +req.params.id;
          let result = await Order.destroy({
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
        };
    };

    static async updateOrders(req, res) {
        try {
          const id = +req.params.id;
          const { name, subtotal, total_qty, city, address, UserId } = req.body;
          let order = await Order.update(
            {
                name, subtotal, total_qty, city, address, UserId
            },
            {
              where: { id },
              individualHooks:true
            }
          );

          res.status(200).json ({
              message: 'Data Has Been Update'
          });
        } catch (err) {
          res.status(500).json(err);
        };
    };

    static async updateStatus(req, res) {
        try {
          const id = +req.params.id;
          const { status } = req.body;
          let order = await Order.update(
            {status},
            {
              where: { id },
            }
          );

          res.status(200).json ({
              message: 'Status Has Been Update'
          });
        } catch (err) {
          res.status(500).json(err);
        };
    };
};

module.exports = OrderController;