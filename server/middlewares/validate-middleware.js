const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    console.log(err);
    const status = 422;
    const message = 'Fill the input properly'
    const extraDetails= err.issues.map(e => e.message);
    const error ={
      status,
      message,
      extraDetails,
    }
    // this is needed before the error errorMiddleware
    // res.status(400).json({
    //   msg: message,
    // });
    console.log(error)
    next(error); 
  }
};

module.exports = validate;