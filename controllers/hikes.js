const Hike = require('../models/hike');

module.exports.index = async (req, res) => {
    const hikes = await Hike.find({});
    res.render('hikes/index', { hikes })
}

module.exports.renderNewForm = (req, res) => {
    res.render('hikes/new');
}

module.exports.createHike = async (req, res, next) => {
    const hike = new Hike(req.body.hike);
    hike.author = req.user._id;
    await hike.save();
    req.flash('success', 'Successfully added new hike!')
    res.redirect(`/hikes/${hike._id}`)
}

module.exports.showHike = async (req, res) => {
    const hike = await Hike.findById(req.params.id).populate({
        path: 'reviews',
        populate: { 
            path: 'author'
        }
    }).populate('author');
    console.log(hike);
    if (!hike) {
        req.flash('error', 'Could not find hike.');
        return res.redirect('/hikes');
    }
    res.render('hikes/show', { hike });
}

module.exports.renderEditForm = async (req, res) => {
    const hike = await Hike.findById(req.params.id)
    if (!hike) {
        req.flash('error', 'Could not find hike.');
        return res.redirect('/hikes');
    }
    res.render('hikes/edit', { hike });
}

module.exports.updateHike = async (req, res) => {
    const { id } = req.params;
    const hike = await Hike.findByIdAndUpdate(id, { ...req.body.hike});
    req.flash('success', 'Hike updated!')
    res.redirect(`/hikes/${hike._id}`)
}

module.exports.destroyHike = async (req, res) => {
    const { id } = req.params;
    await Hike.findByIdAndDelete(id);
    req.flash('success', 'Hike deleted!')
    res.redirect('/hikes');
}