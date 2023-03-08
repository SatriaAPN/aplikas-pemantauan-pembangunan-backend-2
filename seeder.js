const seeder = async (model) => {
  try {
    await model.akun.create({
      nama: 'Admin',
      email: 'admin@gmail.com',
      kata_sandi: 'admin',
      role: 'Admin'
    });
  
    await model.akun.create({
      nama: 'Pegawai',
      email: 'pegawai@gmail.com',
      kata_sandi: 'pegawai',
      role: 'Pegawai'
    });

    await model.akun.create({
      nama: 'Pengawas',
      email: 'pengawas@gmail.com',
      kata_sandi: 'pengawas',
      role: 'Pengawas'
    });
    
    const konsumen1 = await model.akun.create({
      nama: 'Konsumen',
      email: 'konsumen1@gmail.com',
      kata_sandi: 'konsumen1',
      role: 'Konsumen'
    });
  
    const konsumen2 = await model.akun.create({
      nama: 'Konsumen',
      email: 'konsumen2@gmail.com',
      kata_sandi: 'konsumen2',
      role: 'Konsumen'
    });
  
    const konsumen3 = await model.akun.create({
      nama: 'Konsumen',
      email: 'konsumen3@gmail.com',
      kata_sandi: 'konsumen3',
      role: 'Konsumen'
    });
  
    const konsumen4 = await model.akun.create({
      nama: 'Konsumen',
      email: 'konsumen4@gmail.com',
      kata_sandi: 'konsumen4',
      role: 'Konsumen'
    });
  
    const konsumen5 = await model.akun.create({
      nama: 'Konsumen',
      email: 'konsumen5@gmail.com',
      kata_sandi: 'konsumen5',
      role: 'Konsumen'
    });
  
    const konsumen6 = await model.akun.create({
      nama: 'Konsumen',
      email: 'konsumen6@gmail.com',
      kata_sandi: 'konsumen6',
      role: 'Konsumen'
    });
  
    const konsumen7 = await model.akun.create({
      nama: 'Konsumen',
      email: 'konsumen7@gmail.com',
      kata_sandi: 'konsumen7',
      role: 'Konsumen'
    });
  
    const konsumen8 = await model.akun.create({
      nama: 'Konsumen',
      email: 'konsumen8@gmail.com',
      kata_sandi: 'konsumen8',
      role: 'Konsumen'
    });
  
    const konsumen9 = await model.akun.create({
      nama: 'Konsumen',
      email: 'konsumen9@gmail.com',
      kata_sandi: 'konsumen9',
      role: 'Konsumen'
    });
  
    const konsumen10 = await model.akun.create({
      nama: 'Konsumen',
      email: 'konsumen10@gmail.com',
      kata_sandi: 'konsumen10',
      role: 'Konsumen'
    });
  
    const konsumen11 = await model.akun.create({
      nama: 'Konsumen',
      email: 'konsumen11@gmail.com',
      kata_sandi: 'konsumen11',
      role: 'Konsumen'
    });
  
    const konsumen12 = await model.akun.create({
      nama: 'Konsumen',
      email: 'konsumen12@gmail.com',
      kata_sandi: 'konsumen12',
      role: 'Konsumen'
    });

    const konsumen13 = await model.akun.create({
      nama: 'Konsumen',
      email: 'konsumen13@gmail.com',
      kata_sandi: 'konsumen13',
      role: 'Konsumen'
    });
  
    const dataKonsumen1 = await model.konsumen.create({
      id_akun: konsumen1.id,
      nik: '1234567890123456',
      no_telp: '081234567890',
      alamat: 'Jl. A No. 1',
      pekerjaan: 'PNS',
    });
  
    const dataKonsumen2 = await model.konsumen.create({
      id_akun: konsumen2.id,
      nik: '1234567890123456',
      no_telp: '081234567890',
      alamat: 'Jl. A No. 2',
      pekerjaan: 'Pedagang',
    });
  
    const dataKonsumen3 = await model.konsumen.create({
      id_akun: konsumen3.id,
      nik: '1234567890123456',
      no_telp: '081234567890',
      alamat: 'Jl. A No. 3',
      pekerjaan: 'PNS',
    });
  
    const dataKonsumen4 = await model.konsumen.create({
      id_akun: konsumen4.id,
      nik: '1234567890123456',
      no_telp: '081234567890',
      alamat: 'Jl. A No. 4',
      pekerjaan: 'Programmer',
    });
  
    const dataKonsumen5 = await model.konsumen.create({
      id_akun: konsumen5.id,
      nik: '1234567890123456',
      no_telp: '081234567890',
      alamat: 'Jl. A No. 5',
      pekerjaan: 'PNS',
    });
  
    const dataKonsumen6 = await model.konsumen.create({
      id_akun: konsumen6.id,
      nik: '1234567890123456',
      no_telp: '081234567890',
      alamat: 'Jl. A No. 6',
      pekerjaan: 'Pegawai',
    });
  
    const dataKonsumen7 = await model.konsumen.create({
      id_akun: konsumen7.id,
      nik: '1234567890123456',
      no_telp: '081234567890',
      alamat: 'Jl. A No. 7',
      pekerjaan: 'PNS',
    });
  
    const dataKonsumen8 = await model.konsumen.create({
      id_akun: konsumen8.id,
      nik: '1234567890123456',
      no_telp: '081234567890',
      alamat: 'Jl. A No. 8',
      pekerjaan: 'Pengusaha',
    });
  
    const dataKonsumen9 = await model.konsumen.create({
      id_akun: konsumen9.id,
      nik: '1234567890123456',
      no_telp: '081234567890',
      alamat: 'Jl. A No. 9',
      pekerjaan: 'Programmer',
    });
  
    const dataKonsumen10 = await model.konsumen.create({
      id_akun: konsumen10.id,
      nik: '1234567890123456',
      no_telp: '081234567890',
      alamat: 'Jl. A No. 10',
      pekerjaan: 'PNS',
    });
  
    const dataKonsumen11 = await model.konsumen.create({
      id_akun: konsumen11.id,
      nik: '1234567890123456',
      no_telp: '081234567890',
      alamat: 'Jl. A No. 11',
      pekerjaan: 'Pedagang',
    });
  
    const dataKonsumen12 = await model.konsumen.create({
      id_akun: konsumen12.id,
      nik: '1234567890123456',
      no_telp: '081234567890',
      alamat: 'Jl. A No. 12',
      pekerjaan: 'Petani',
    });

    const dataKonsumen13 = await model.konsumen.create({
      id_akun: konsumen13.id,
      nik: '1234567890123456',
      no_telp: '081234567890',
      alamat: 'Jl. A No. 12',
      pekerjaan: 'Petani',
    });
  
    const blok1 = await model.blok.create({
      nama: 'A'
    });
  
    const blok2 = await model.blok.create({
      nama: 'B'
    });
  
    const blok3 = await model.blok.create({
      nama: 'C'
    });
  
    const rumah1 = await model.rumah.create({
      id_blok: blok1.id,
      progress_pembangunan: 25
    });
  
    const rumah2 = await model.rumah.create({
      id_blok: blok1.id,
      progress_pembangunan: 50
    });
  
    const rumah3 = await model.rumah.create({
      id_blok: blok1.id,
      progress_pembangunan: 75
    });
  
    const rumah4 = await model.rumah.create({
      id_blok: blok1.id,
      progress_pembangunan: 55
    });
  
    const rumah5 = await model.rumah.create({
      id_blok: blok1.id,
      progress_pembangunan: 65
    });
  
    const rumah6 = await model.rumah.create({
      id_blok: blok1.id,
      progress_pembangunan: 75
    });
  
    const rumah7 = await model.rumah.create({
      id_blok: blok1.id,
      progress_pembangunan: 85
    });
  
    const rumah8 = await model.rumah.create({
      id_blok: blok1.id,
      progress_pembangunan: 95
    });
  
    const rumah9 = await model.rumah.create({
      id_blok: blok1.id,
      progress_pembangunan: 25
    });
  
    const rumah10 = await model.rumah.create({
      id_blok: blok1.id,
      progress_pembangunan: 35
    });
  
    const rumah11 = await model.rumah.create({
      id_blok: blok2.id,
      progress_pembangunan: 25
    });
  
    const rumah12 = await model.rumah.create({
      id_blok: blok2.id,
      progress_pembangunan: 35
    });
  
    const rumah13 = await model.rumah.create({
      id_blok: blok2.id,
      progress_pembangunan: 45
    });
  
    const rumah14 = await model.rumah.create({
      id_blok: blok2.id,
      progress_pembangunan: 55
    });
  
    const rumah15 = await model.rumah.create({
      id_blok: blok2.id,
      progress_pembangunan: 65
    });
  
    const rumah16 = await model.rumah.create({
      id_blok: blok2.id,
      progress_pembangunan: 75
    });
  
    const rumah17 = await model.rumah.create({
      id_blok: blok2.id,
      progress_pembangunan: 85
    });
  
    const rumah18 = await model.rumah.create({
      id_blok: blok2.id,
      progress_pembangunan: 95
    });
  
    const rumah19 = await model.rumah.create({
      id_blok: blok2.id,
      progress_pembangunan: 25
    });
  
    const rumah20 = await model.rumah.create({
      id_blok: blok2.id,
      progress_pembangunan: 35
    });
  
    const rumah21 = await model.rumah.create({
      id_blok: blok3.id,
      progress_pembangunan: 25
    });
  
    const rumah22 = await model.rumah.create({
      id_blok: blok3.id,
      progress_pembangunan: 35
    });
  
    const rumah23 = await model.rumah.create({
      id_blok: blok3.id,
      progress_pembangunan: 45
    });
  
    const rumah24 = await model.rumah.create({
      id_blok: blok3.id,
      progress_pembangunan: 55
    });
  
    const rumah25 = await model.rumah.create({
      id_blok: blok3.id,
      progress_pembangunan: 65
    });
  
    const rumah26 = await model.rumah.create({
      id_blok: blok3.id,
      progress_pembangunan: 75
    });
  
    const rumah27 = await model.rumah.create({
      id_blok: blok3.id,
      progress_pembangunan: 85
    });
  
    const rumah28 = await model.rumah.create({
      id_blok: blok3.id,
      progress_pembangunan: 95
    });
  
    const rumah29 = await model.rumah.create({
      id_blok: blok3.id,
      progress_pembangunan: 25
    });
  
    const rumah30 = await model.rumah.create({
      id_blok: blok3.id,
      progress_pembangunan: 35
    });
  
    // booking rumah blok 1
    await model.booking.create({
      id_konsumen: dataKonsumen1.id,
      id_rumah: rumah1.id,
      status_booking: 'di booking',
      nominal_booking: 1000000,
      tanggal_booking: '2020-12-01'
    });
  
    await model.booking.create({
      id_konsumen: dataKonsumen2.id,
      id_rumah: rumah4.id,
      status_booking: 'di booking',
      nominal_booking: 1000000,
      tanggal_booking: '2020-12-01'
    });
  
    await model.booking.create({
      id_konsumen: dataKonsumen3.id,
      id_rumah: rumah7.id,
      status_booking: 'terjual',
      nominal_booking: 1000000,
      tanggal_booking: '2020-12-01'
    });
  
    await model.booking.create({
      id_konsumen: dataKonsumen4.id,
      id_rumah: rumah9.id,
      status_booking: 'terjual',
      nominal_booking: 1000000,
      tanggal_booking: '2020-12-01'
    });
  
    // booking rumah blok 2
    await model.booking.create({
      id_konsumen: dataKonsumen5.id,
      id_rumah: rumah13.id,
      status_booking: 'terjual',
      nominal_booking: 1000000,
      tanggal_booking: '2020-12-01'
    });
  
    await model.booking.create({
      id_konsumen: dataKonsumen6.id,
      id_rumah: rumah16.id,
      status_booking: 'terjual',
      nominal_booking: 1000000,
      tanggal_booking: '2020-12-01'
    });
  
    await model.booking.create({
      id_konsumen: dataKonsumen7.id,
      id_rumah: rumah17.id,
      status_booking: 'di booking',
      nominal_booking: 1000000,
      tanggal_booking: '2020-12-01'
    });
  
    await model.booking.create({
      id_konsumen: dataKonsumen8.id,
      id_rumah: rumah20.id,
      status_booking: 'terjual',
      nominal_booking: 1000000,
      tanggal_booking: '2020-12-01'
    });
  
    // booking rumah blok 3
    await model.booking.create({
      id_konsumen: dataKonsumen9.id,
      id_rumah: rumah23.id,
      status_booking: 'terjual',
      nominal_booking: 1000000,
      tanggal_booking: '2020-12-01'
    });
  
    await model.booking.create({
      id_konsumen: dataKonsumen10.id,
      id_rumah: rumah25.id,
      status_booking: 'terjual',
      nominal_booking: 1000000,
      tanggal_booking: '2020-12-01'
    });
  
    await model.booking.create({
      id_konsumen: dataKonsumen11.id,
      id_rumah: rumah29.id,
      status_booking: 'di booking',
      nominal_booking: 1000000,
      tanggal_booking: '2020-12-01'
    });
  
    await model.booking.create({
      id_konsumen: dataKonsumen12.id,
      id_rumah: rumah30.id,
      status_booking: 'di booking',
      nominal_booking: 1000000,
      tanggal_booking: '2020-12-01'
    });
  } catch(e) {
    console.error('seeder:', e.message);
    throw e;
  }
}

module.exports = seeder;