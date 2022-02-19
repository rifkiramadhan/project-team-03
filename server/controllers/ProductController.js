const { User, 
        Product,
        Products_Image 
} = require ('../models');

class ProductController {
    static async showProducts(req, res) {
      try {
        let product = await Product.findAll({
        order: [["id", "ASC"]],
          include: 
               [Products_Image] 
        });
  
        res.status(200).json(product);
      } catch (err) {
        res.status(500).json(err);
      };
    };

    static async showProductsUsers(req, res) {
      try{
        const {id} = req.UserDetail;
        let product =  await Product.findAll({
          where : { UserId : id }
        });

        res.status(200).json(product);
      } catch (err) {
        res.status(500).json(err);
      };
    };

    static async showProductsById(req, res) {
      try {
        const id = +req.params.id;
        let product = await Product.findOne({
          where: {id},
            include: 
                [
                  User,
                  Products_Image
                ] 
          });

        res.status(200).json(product);
      } catch (err) {
        res.status(500).json(err);
      };
    };

    static async addProducts(req, res) {
        try {
          const { name, desc, price, expire_date, weight, category, brand, condition} = req.body;
          const UserId = req.UserDetail.id;
          let product = await Product.create({
            name, desc, price, expire_date, weight, category, brand, condition, UserId
          });

          res.status(201).json (product);
        } catch (err) {
          res.status(500).json(err);
        };
    };

    static async deleteProducts(req, res) {
      try {
            const id = +req.params.id;
            let result = await Product.destroy({
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
    
    static async updateProducts(req, res) {
      try {
        const id = +req.params.id;
        const { name, desc, price, stock, expire_date, weight, category, brand, condition } = req.body;
        let product = await Product.update(
          {
              name, desc, price, stock, expire_date, weight, category, brand, condition
          },
          {
            where: { id },
          }
        );

        res.status(200).json (product);
      } catch (err) {
        res.status(500).json(err);
      };
  };

  static async updateViews(req, res) {
     try{
       const id = +req.params.id;
       let product = await Product.increment(
         {
           views : +1,
          },
          {
            where: { id },
          }
       );

       res.status(200).json(product);
     } catch (err) {
       res.status(500).json(err);
     };
   };

   static async updateSold(req, res) {
    try{
      const id = +req.params.id;
      let product = await Product.increment(
        {
          total_sold : +1,
         },
         {
           where: { id },
         }
      );

      res.status(200).json(product);
    }catch (err) {
      res.status(500).json(err);
    };
  };

   static async updateRating(req, res) {
    try{
      const id = +req.params.id;
      let product = await Product.increment(
        {
          rating: +1,
         },
         {
           where: { id },
         }
      );

      res.status(200).json(product);
    }catch (err) {
      res.status(500).json(err);
    };
  };
};

module.exports = ProductController;