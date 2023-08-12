const Car = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id);
    if (!car) {
      next({ status: 404, message: `car with id ${req.params.id} is not found`})
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  function validateProperty(property, propertyName) {
    if (!property) {
      return next({ status: 400, message: `${propertyName} is missing` });
    }
  }

  validateProperty(vin, 'vin');
  validateProperty(make, 'make');
  validateProperty(model, 'model');
  validateProperty(mileage, 'mileage');

  next();
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  if (!vinValidator.validate(vin)) {
    next({ status: 400, message: `vin ${vin} is invalid`});
  } else {
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const { vin } =  req.body;
    const existingVin = await Car.getByVin(vin);
    if (existingVin) {
      next({ status: 400, message: `vin ${vin} already exists`});
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}
