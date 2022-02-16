# Project Team 3 Code Academy

## Tema Aplikasi: CodiHealth

## Nama Peran

1. Rifki
2. Nesti
3. Samira

### Rancangan Data

1. [ERD]('./ERD.png)
2. [API Documentation](/)

### Deskripsi

``` CodiHealth adalah sebuah Toko Online berbasis website untuk menjual produk obat-obatan kesehatan berdasarkan resep dokter dan juga menyediakan fasilitas untuk konsultasi masalah kesehatan secara daring dengan para dokter specialist. ```

### Copyright  

```Aplikasi ini dikembangkan oleh Team ke-3 dari Bootcamp Code ID 2022.```

### Peran Tugas (Contoh)

1. UI / UX (Membuat Desain Aplikasi dari Figma / Adobe XD)
    - Tidak perlu, Karena sudah ada Website [Dribbble](https://dribble.com/) untuk mencari Referensi Desain
2. UI Engineer (Mentranslate Desain aplikasi dari Figma / Adobe XD ke HTML & CSS)
    - In the process
3. Fullstack Developer (Convert HTML & CSS ke Framework REACT JS, Integrasi API & Deploy App)
    - In the process
4. Power Point (Presentation)
    - In the process

### Tools Development

``` Adalah tools menarik untuk Web Developer ketika membuat sebuah project dengan cara yang lebih cepat. ```

1. [CSS Matic](https://www.cssmatic.com/)
    - Suatu Generator yang akan membantu kita dalam pembuatan Box Shadow, Noise, Gradient, dan Border Radius.
2. [CruIP](https://cruip.com/)
    - Menyediakan Landing Page untuk beberapa startup seperti Startup Teknologi, Industri, atau bahkan yang lainnya.
    - Desainnya sangat menarik dan desainnya itu sangat terbaru dari desain yang pernah ada.
3. [Crisp.chat](https://crisp.chat/en/)
    - Dimana Tools ini sering digunakan oleh Web Developer untuk memasang suatu Chat box yang biasanya dipasang di sebelah knanan pojok bawah, dan seseorang dapat bertanya langsung kepada kita, tanpa harus menghubungi via WhatsApp atau SMS.
4. [Isoflat](https://isoflat.com/)
    - Adalah Tools yang akan membantu kita sebagai Web Developer ketika kita tidak dapat melakukan Design, jadi kita dapat mendesain suatu ilustrasi yang berbentu Isometric, dan ini dari tingkatan desain terlihat lebih sulit.
5. [Grid.guide](http://grid.guide/)
    - Dimana ketika kita sebagai Web Developer atau Web Designer dan kita ingin untuk mendesain suatu halaman website dengan lebih baik lagi dan mudah di implementasikan maka kita wajib menggunakan Grid.Guide dan dapat kita kostomisasi.
6. [Codepen](https://codepen.io/)
    - Dimana kita bisa melihat beberapa codingan seperti HTML, CSS, JavaScript, SCSS, jQuery, dll.
    - Codingan di dalamnya dibuat oleh beberapa Front-End Web Developer yang baik hati ingin memberikan suatu codingan yang bisa kita gunakan pada aplikasi kita dengan mudah.

### Aktifitas

1. Git clone < link-git >
2. Development
3. Git pull
4. Development
5. Git push origin to main
6. Git checkout -b < nama-branch >
7. Git push origin to < nama-branch >


npx sequelize-cli model:generate --name users --attributes user_id:integer,user_name:string,user_email:string,user_password:string,user_salt:string,user_birthdate:dateonly,user_gender:string,user_avatar:string,user_type:string

npx sequelize-cli model:generate --name shopping_cart --attributes shop_created_on:dateonly,shop_status:string,shop_user_id:integer

npx sequelize-cli model:generate --name products --attributes prod_name:string,prod_desc:string,prod_price:integer,prod_stock:integer,prod_expire:timestamp,prod_weight:integer,prod_category:string,prod_brand:string,prod_condition:string,prod_total_sold:integer,prod_rating:integer,prod_views:integer,prod_user_id:integer

npx sequelize-cli model:generate --name orders --attributes order_name:string,order_subtotal:integer,order_discount:string,order_tax:dateonly,order_total_due:string,order_payt_trx_number:string,order_city:string,order_address:string,order_status:string,order_user_id:integer




npx sequelize-cli model:generate --name products_image --attributes prim_filename:string,prim_filesize:string,prim_filetype:string,prim_primary:boolean,prim_prod_id:integer


line_items
npx sequelize-cli model:generate --name line_items --attributes lite_qty:integer,lite_status:string,lite_prod_id:integer,lite_shop_id:integer,lite_order_name:string,lite_shop_id:integer,lite_prod_id:integer

lite_id

