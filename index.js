const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./database');
const { Op } = require('sequelize');
const { sequelize } = db;
const {
  akun,
  konsumen,
  blok,
  rumah,
  booking
} = db.model;

const seeder = require('./seeder');

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', async(req, res) => {
  try {
    const { email, kataSandi } = req.body;

    const user = await akun.findOne({
      where: {
        email: {
          [Op.iLike]: email
        },
      }
    });

    if (!user) {
      throw new Error('email tidak ditemukan');
    }

    if (user.kata_sandi !== kataSandi) {
      throw new Error('kata sandi salah');
    }

    delete user.kata_sandi;

    const dataKonsumen = await konsumen.findOne({
      where: {
        id_akun: user.id
      }
    });

    user.dataValues.dataKonsumen = dataKonsumen;

    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

app.post('/rumah/status/:idRumah', async(req, res) => {
  try {
    const { idKonsumen, statusBooking } = req.body;
    const {  idRumah } = req.params;

    const dataRumah = await rumah.findOne({
      where: {
        id: idRumah
      }
    });

    if (!dataRumah) {
      throw new Error('rumah tidak ditemukan');
    }

    const bookingRumah = await booking.findOne({
      where: {
        id_rumah: idRumah
      }
    });

    if (bookingRumah) {
      bookingRumah.update({
        status_booking: statusBooking
      });
    } else {
      await booking.create({
        id_konsumen: idKonsumen,
        id_rumah: idRumah,
        status_booking: statusBooking
      });
    }

    res.send({
      status: 'ok',
      data: {
        idKonsumen,
        idRumah,
        statusBooking
      }
    });
  } catch(e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

app.post('/rumah/status-pembangunan/:idRumah', async(req, res) => {
  try {
    const { statusPembangunan } = req.body;
    const { idRumah } = req.params;

    const dataRumah = await rumah.findOne({
      where: {
        id: idRumah
      }
    });

    if (!dataRumah) {
      throw new Error('rumah tidak ditemukan');
    }

    dataRumah.update({
      progress_pembangunan: statusPembangunan
    });

    res.send({
      status: 'ok',
      data: {
        idRumah,
        statusPembangunan
      }
    });
  } catch(e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

app.get('/blok', async(req, res) => {
  try {
    const blok = await sequelize.query(
      `select * from blok`,
      { type: sequelize.QueryTypes.SELECT }
    );

    res.send(blok);
  } catch (error) {
    console.log(error);
    res.status(400).send(e.message);
  }
});

app.get('/rumah', async(req, res) => {
  try {
    const { namaBlok } = req.query;

    const rumah = await sequelize.query(
      `
        select 
          a.*,
          Upper(:namaBlok) || a.rank as "nomorRumah"
        from (
          select 
            r.*,
            case 
              when bo.id is null then 'belum terjual'
              else bo.status_booking
            end as "status_rumah",
            rank() over (order by r.id asc)
          from rumah r 
          left join blok b
            on b.id = r.id_blok
          left join booking bo
            on bo.id_rumah = r.id
          where b.nama ilike :namaBlok
        ) a
      `, 
      { 
        type: sequelize.QueryTypes.SELECT,
        replacements: {
          namaBlok
        }
      }
    );
    
    res.send(rumah);
  } catch (error) {
    console.log(error);
    res.status(400).send(e.message);
  }
});

app.get('/rumah/seluruh/data', async(req, res) => {
  try {
    const rumah = await sequelize.query(
      `
        select 
          a.*,
          Upper(a."namaBlok") || a.rank as "nomorRumah"
        from (
          select 
            r.*,
            case 
              when bo.id is null then 'belum terjual'
              else bo.status_booking
            end as "status_rumah",
            rank() over (order by r.id asc),
            b.nama as "namaBlok"
          from rumah r 
          left join blok b
            on b.id = r.id_blok
          left join booking bo
            on bo.id_rumah = r.id
        ) a
      `, 
      { 
        type: sequelize.QueryTypes.SELECT,
      }
    );
    
    res.send(rumah);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

app.get('/rumah/:idRumah', async(req, res) => {
  try {
    const { idRumah } = req.params;

    const rumah = await sequelize.query(
      `
        select 
          a.*,
          Upper(a."namaBlok") || a.rank as "nomorRumah"
        from (
          select 
            r.*,
            case 
              when bo.id is null then 'belum terjual'
              else bo.status_booking
            end as "status_rumah",
            rank() over (order by r.id desc),
            b.nama as "namaBlok",
            k.*
          from rumah r 
          left join blok b
            on b.id = r.id_blok
          left join booking bo
            on bo.id_rumah = r.id
          left join konsumen k 
            on k.id = bo.id_konsumen
          left join akun a 
            on a.id = k.id_akun
          where r.id = :idRumah
        ) a
      `, 
      { 
        type: sequelize.QueryTypes.SELECT,
        replacements: {
          idRumah
        }
      }
    );

    res.send({rumah: rumah[0]});
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

app.get('/konsumen/rumah/:idKonsumen', async(req, res) => {
  try {
    const { idKonsumen } = req.params;

    const rumah = await sequelize.query(
      `
        select 
          a.*,
          Upper(a."namaBlok") || a.rank as "nomorRumah"
        from (
          select 
            r.*,
            case 
              when bo.id is null then 'belum terjual'
              else bo.status_booking
            end as "status_rumah",
            rank() over (order by r.id desc),
            b.nama as "namaBlok"
          from rumah r 
          left join blok b
            on b.id = r.id_blok
          left join booking bo
            on bo.id_rumah = r.id
          left join konsumen k 
            on k.id = bo.id_konsumen
          left join akun a 
            on a.id = k.id_akun
          where bo.id_konsumen = :idKonsumen
        ) a
      `, 
      { 
        type: sequelize.QueryTypes.SELECT,
        replacements: {
          idKonsumen
        }
      }
    );

    res.send({rumah: rumah[0]});
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

app.listen(3000, async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");

    await seeder(db.model);

    console.log('Example app listening on port 3000!');
  } catch(e) {
    console.log(e)
  }
});