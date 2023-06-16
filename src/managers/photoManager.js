const Photo = require('../models/Photos');

const create = (name, age, description, location, image, owner) => {
    const photo = new Photo({ name, age, description, location, image, owner });

    return photo.save();
}

const getAll = async() => {
    const photos = await Photo.find().populate('owner').lean();

    return photos;
}

const getById = (id) => {
    return Photo.findById(id).populate('owner').lean();
}

const updateById = function (id, photoData) {
    return Photo.findByIdAndUpdate(id, photoData, { runValidators: true });
}

const deleteById = function (id){
    return Photo.findByIdAndDelete(id);
}

exports.create = create;
exports.getAll = getAll;
exports.getById = getById;
exports.updateById = updateById;
exports.deleteById = deleteById;