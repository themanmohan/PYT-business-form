const cloudinary = require(`cloudinary`).v2;

cloudinary.config({
  cloud_name: `raw-ice-studio`,
  api_key: `447967672324492`,
  api_secret: `hCRitxfzWEK-9H31N2B_fLwVISY`,
});

const uploadToCloudinary = async (array, file, folder) => {

  const optionsObj = {
    folder: folder,
    use_filename: true,
    resource_type: "auto"
    
  };

  await cloudinary.uploader.upload(file, optionsObj, function (err, response) {
    if (!err) {
      return array.push(response.secure_url);
    }
  });
  
};

module.exports = async (req, uploadPath, next) => {
  req.cloudinaryFiles = {};

  try {
    for (let key in req.files) {

      if (!req.cloudinaryFiles[key]) {
        req.cloudinaryFiles[key] = [];
      }

      for (let i = 0; i < req.files[key].length; i++) {
        await uploadToCloudinary(
          req.cloudinaryFiles[key],
          req.files[key][i].path,
          uploadPath
        );
      }
    }

    next();
  } catch (err) {
  }
};
