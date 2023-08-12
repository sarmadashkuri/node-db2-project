const cars = [
    {
      vin: '1MEHM42W38G617930',
      make: 'toyota',
      model: 'prius',
      mileage: 215000,
      title: 'clean',
      transmission: 'manual',
    },
    {
      vin: '2C4JRGAG1ER437002',
      make: 'toyota',
      model: 'corolla',
      mileage: 115000,
      title: 'salvage',
    },
    {
      vin: '1FVXTMDB6YHG32076',
      make: 'ford',
      model: 'focus',
      mileage: 15000,
    },
  ]
  
  exports.seed = async function(knex) {
    await knex('cars').truncate()
    await knex('cars').insert(cars)
  }