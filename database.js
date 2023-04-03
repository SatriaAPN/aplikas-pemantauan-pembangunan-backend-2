const { Sequelize, DataTypes, Op } = require('sequelize');

const user = process.env.DB_USER || 'postgres' ;
const password = process.env.DB_PASSWORD || 'admin';
const port = process.env.DB_PORT || 5432;
const databaseUrl = process.env.DATABASE_URL || `postgres://boihwsxvurdysg:e3179ad047f38c751ed55c6e9f266c8bfb123768e71f655cd3ecfceef7f8fc68@ec2-3-232-103-50.compute-1.amazonaws.com:5432/d2ho2gbt4b34o8`;


// Option 1: Passing a connection URI
const sequelize = new Sequelize(databaseUrl,
  {
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }) // Example for postgres

const akun = sequelize.define('akun', {
  // Model attributes are defined here
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kata_sandi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Konsumen',
    validate: {
      isIn: [['Pegawai', 'Konsumen', 'Admin', "Pengawas"]]
    }
  },
}, {
  // Other model options go here
  freezeTableName: true
});

const konsumen = sequelize.define('konsumen', {
  // Model attributes are defined here
  id_akun: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  no_telp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nik: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pekerjaan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
  freezeTableName: true
});

const blok = sequelize.define('blok', {
  // Model attributes are defined here
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
  freezeTableName: true
});

const rumah = sequelize.define('rumah', {
  // Model attributes are defined here
  tipe_rumah: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '36/90 m2'
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 140000000
  },
  id_blok: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  progress_pembangunan: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  details_progress_pembangunan: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nomor_rumah: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_progress_pembangunan: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  // Other model options go here
  freezeTableName: true
});

rumah.beforeValidate(async (dataRumah, options) => {
  const rumahBlok = await rumah.findAll({
    where: {
      id_blok: dataRumah.id_blok
    }
  });

  const dataBlok = await blok.findOne({
    where: {
      id: dataRumah.id_blok
    }
  });

  const nomorRumah = rumahBlok.length + 1;

  dataRumah.nomor_rumah = dataBlok.nama  + nomorRumah;
});

const booking = sequelize.define('booking', {
  // Model attributes are defined here
  id_konsumen: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_rumah: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status_booking: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['di booking', 'terjual']]
    }
  },
  nominal_booking: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tanggal_booking: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  // Other model options go here
  freezeTableName: true
});

module.exports = {
  sequelize,
  model: {
    akun,
    konsumen,
    blok,
    rumah,
    booking
  }
}