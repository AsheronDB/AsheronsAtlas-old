const {
    Router
} = require('express');

const router = Router();
const controllers = require('#server/controllers/index.js');

// Routes
router.get('/locations', controllers.locations.locations_get);
router.get('/locations/:id', controllers.locations.location_get);
router.get('/geocode/reverse', controllers.geocode.reverse_get);
router.get('/search', controllers.search.search_get);

// Index
router.all('/', async (req, res) => {
    
});

module.exports = router;
