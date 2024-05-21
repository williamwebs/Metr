export const POST = (req) => {
  const formData = req.body;
  try {
    console.log(formData);
  } catch (error) {
    console.log(error);
  }
};
