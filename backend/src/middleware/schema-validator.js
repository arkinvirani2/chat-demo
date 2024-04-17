const schemaValidator = (schema) => {
  return (req, res, next) => {
    const { body } = req;
    const result = schema.validate(body);
    const { error } = result;
    const valid = error == null;
    if (!valid) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",");
      res.status(400).json({
        message,
      });
    } else {
      next();
    }
  };
};

export default schemaValidator;
