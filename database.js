const { Sequelize, DataTypes, Op } = require('sequelize');

const user = process.env.DB_USER || 'postgres' ;
const password = process.env.DB_PASSWORD || 'admin';
const port = process.env.DB_PORT || 5432;

// Option 1: Passing a connection URI
const sequelize = new Sequelize(`postgres://${user}:${password}@localhost:${port}/pemantauan_pembangunan`,
{
  logging: false
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
      isIn: [['Pegawai', 'Konsumen', 'Admin']]
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
}, {
  // Other model options go here
  freezeTableName: true
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