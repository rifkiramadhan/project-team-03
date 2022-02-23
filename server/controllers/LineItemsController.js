const { 
  Line_Item,
  Shopping_Cart,
  Order
} = require('../models');

class LineItemController {
    static async showLineItems(req, res) {
        try {
          let lineitems = await Line_Item.findAll({});

          res.status(200).json(lineitems);
        } catch (err) {
          res.status(404).json(err);
        };
    };

    static async showItemsUsers(req, res) {
        try {
          const { id } = req.UserDetail;
          let items =  await Line_Item.findAll({
            where : { UserId: id }
          });

          res.status(200).json(items);
        } catch (err){
          res.status(500).json(err);
        };
    };

    static async showItemsById(req, res) {
        try {
          const id = +req.params.id;
          let product = await Line_Item.findByPk(id);

          res.status(200).json(product);
        } catch (err) {
          res.status(500).json(err);
        };
    };

    static async addLineItem(req, res) {
        try {
          const { qty, 
                  status, 
                  ProductId, 
                  ShoppingCartId, 
                  OrderId 
                } = req.body;
          let lineitem = await Line_Item.create(
            {
              qty, 
              status, 
              ProductId, 
              ShoppingCartId, 
              OrderId
            }
          );

          res.status(201).json (lineitem);
        } catch (err) {
          res.status(500).json(err);
        };
    };

    static async deleteLineItem(req, res) {
        try {
            const id = +req.params.id;
            let result = await Line_Item.destroy(
              {
                where: { id },
              }
            );

            res.status(200).json(result);
          } catch (err) {
            res.status(500).json(err);
          };
    };

    static async updateLineItem(req, res) {
        try {
          const id = +req.params.id;
          const { 
            qty, 
            status, 
            ProductId, 
            Shopping_CartId, 
            OrderId
          } = req.body;
          let lineitem = await Line_Item.update(
            {
                qty, 
                status, 
                ProductId, 
                Shopping_CartId, 
                OrderId
            },
            {
              where: { id },
            }
          );
          
          res.status(200).json (lineitem);
        } catch (err) {
          res.status(500).json(err);
        };
    };
};

module.exports = LineItemController;