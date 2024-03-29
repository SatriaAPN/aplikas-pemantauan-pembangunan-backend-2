const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const {v4: uuidv4} = require("uuid")
const path = require("path")
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination : function(req,file,cb){
    cb(null,"uploads")
  },
  filename: function(req,file, cb){
    cb(null,`${uuidv4()}_${path.extname(file.originalname)}`)
  }
})

const fileFilter = (req,file,cb) => {
  const allowedFileTypes = ["image/jpeg","image/jpg","image/png"]
  if(allowedFileTypes.includes(file.mimetype)){
      cb(null,true)
  }else{
      cb(null,false)
  }
}
const uploadMiddleware = multer({storage,fileFilter})

// const upload = multer.diskStorage({ 
//   dest: 'uploads/', 
//   limits: { fileSize: 1000000 }, 
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(new Error('Please upload an image'));
//     }

//     cb(undefined, true);
//   },
//   filename(req, file, cb) {
//     cb(undefined, new Date().getTime() + file.originalname);
//   } 
// });

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

// access image
app.use('/uploads', express.static('uploads'));

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

app.post('/rumah/progress/:idRumah', uploadMiddleware.single('image'), async (req, res) => {
  try {
    const { idRumah } = req.params;
    const file = req.file;
    const { persentaseProgress, detailProgress } = req.body;
console.log(idRumah)
    const dataRumah = await rumah.findOne({
      where: {
        id: idRumah
      }
    });

    if (!dataRumah) {
      throw new Error('data rumah tidak ditemukan');
    }

    const dataProgress = await dataRumah.update({
      progress_pembangunan: persentaseProgress,
      image_progress_pembangunan: file.filename,
      details_progress_pembangunan: detailProgress
    });

    res.send(dataProgress);
  } catch(e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

app.post('/register', async(req, res) => {
  try {
    const { email, kataSandi, nama, noHp, role, nik, pekerjaan, alamat} = req.body;

    const user = await akun.findOne({
      where: {
        email: {
          [Op.iLike]: email
        },
      }
    });

    if (user) {
      throw new Error('email sudah terdaftar');
    }

    const newUser = await akun.create({
      nama,
      email,
      kata_sandi: kataSandi,
      role
    });

    if(role === 'Konsumen') {
      await konsumen.create({
        id_akun: newUser.id,
        nama,
        no_telp: noHp,
        nik,
        pekerjaan,
        alamat
      });
    }

    res.send({
      status: 'ok',
      data: {
        email,
        kataSandi,
        nama,
        noHp
      }
    });

  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

// update akun
app.put('/akun/:idAkun', async(req, res) => {
  try {
    const { idAkun } = req.params;
    const { email, kataSandi, nama, noHp, nik, pekerjaan, alamat } = req.body;

    const dataAkun = await akun.findOne({
      where: {
        id: idAkun
      }
    });

    if (!dataAkun) {
      throw new Error('data akun tidak ditemukan');
    }

    await dataAkun.update({
      nama,
      email,
      kata_sandi: kataSandi
    });

    if (dataAkun.role === 'Konsumen') {
      const dataKonsumen = await konsumen.findOne({
        where: {
          id_akun: idAkun
        }
      });
  
      if (!dataKonsumen) {
        throw new Error('data konsumen tidak ditemukan');
      }

      await dataKonsumen.update({
        nama,
        no_telp: noHp,
        nik,
        pekerjaan,
        alamat
      });
    }

    res.send({
      status: 'ok',
      data: {
        email,
        kataSandi,
        nama,
        noHp
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});


app.get('/kustomer', async(req, res) => {
  try {
    const dataKustomer = await sequelize.query(
      `
        select 
          k.*,
          to_json(a) as "dataAkun",
          to_json("dataBooking") as "dataBooking"
        from konsumen k 
        left join akun a 
          on a.id = k.id_akun 
        left join (
          select
            b.*,
            to_json(r) as "dataRumah" 
          from booking b 
          left join rumah r 
            on r.id = b.id_rumah 
        ) as "dataBooking"
          on "dataBooking"."id_konsumen" = k.id 
        order by k.id
      `,
      { type: sequelize.QueryTypes.SELECT }
    );

    res.send(dataKustomer);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

app.get('/seluruh-akun', async(req, res) => {
  try {
    const dataKustomer = await sequelize.query(
      `
          select
          a.*,
          to_json(k) as "dataKonsumen",
          to_json(b) as "dataBooking"
        from akun a 
        left join konsumen k 
          on k.id_akun = a.id
        left join (
          select
            b.*,
            to_json(r) as "dataRumah" 
          from booking b
          left join rumah r 
            on r.id = b.id_rumah
        ) b 
          on b.id_konsumen = k.id
        order by a.id
      `,
      { type: sequelize.QueryTypes.SELECT }
    );

    res.json({
      data: {
        seluruhAkun: dataKustomer
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

app.get('/akun/:idAkun', async(req, res) => {
  try {
    const { idAkun } = req.params;

    const dataKustomer = await sequelize.query(
      `
        select
          a.*,
          to_json(k) as "dataKonsumen",
          to_json(b) as "dataBooking"
        from akun a 
        left join konsumen k 
          on k.id_akun = a.id
        left join (
          select
            b.*,
            to_json(r) as "dataRumah" 
          from booking b
          left join rumah r 
            on r.id = b.id_rumah
        ) b 
          on b.id_konsumen = k.id
        where a.id = :idAkun
      `,
      { 
        type: sequelize.QueryTypes.SELECT,
        replacements: {
          idAkun
        }
      }
    );

    if (!dataKustomer.length) {
      throw new Error('akun tidak ditemukan');
    }

    res.json({
      data: {
        akun: dataKustomer[0]
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

app.post('/rumah/status/:idRumah', async(req, res) => {
  try {
    const { idKonsumen, statusBooking, nominalBooking, tanggalBooking } = req.body;
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

    if(statusBooking === 'belum terjual') {
      if(bookingRumah) {
        await bookingRumah.destroy();
      }
    } else {
      if (bookingRumah) {
        bookingRumah.update({
          status_booking: statusBooking,
          nominal_booking: nominalBooking,
          tanggal_booking: tanggalBooking
        });
      } else {
        await booking.create({
          id_konsumen: idKonsumen,
          id_rumah: idRumah,
          status_booking: statusBooking,
          nominal_booking: nominalBooking,
          tanggal_booking: tanggalBooking
        });
      }
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
          a.*
        from (
          select 
            r.*,
            case 
              when bo.id is null then 'belum terjual'
              else bo.status_booking
            end as "status_rumah",
            rank() over (order by r.id asc),
            r.nomor_rumah as "nomorRumah"
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
          a.*
        from (
          select 
            r.*,
            case 
              when bo.id is null then 'belum terjual'
              else bo.status_booking
            end as "status_rumah",
            rank() over (order by r.id asc),
            b.nama as "namaBlok",
            r.nomor_rumah as "nomorRumah",
            to_json(bo) as "dataBooking" 
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
          a.*
        from (
          select 
            r.*,
            case 
              when bo.id is null then 'belum terjual'
              else bo.status_booking
            end as "status_rumah",
            rank() over (order by r.id desc),
            b.nama as "namaBlok",
            to_json(k)  as "dataKonsumen",
            to_json(a) as "dataAkunKonsumen",
            to_json(bo) as "dataBooking",
            r.nomor_rumah as "nomorRumah"
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
          a.*
        from (
          select 
            r.*,
            case 
              when bo.id is null then 'belum terjual'
              else bo.status_booking
            end as "status_rumah",
            rank() over (order by r.id desc),
            b.nama as "namaBlok",
            r.nomor_rumah as "nomorRumah",
            to_json(k)  as "dataKonsumen",
            to_json(a) as "dataAkunKonsumen",
            to_json(bo) as "dataBooking"
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

app.listen(port, async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");

    await seeder(db.model);

    console.log('Example app listening on port 3000!');
  } catch(e) {
    console.log(e)
  }
});