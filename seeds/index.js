const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)]

// Delete everything in the Campground database
// ... and then put all the seeds
const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '61b8ba232588e329ff307fa4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'http://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur molestias nemo minima doloremque quasi omnis sed laborum maiores aspernatur neque. Incidunt inventore nostrum ipsam? Expedita sed nihil voluptates fugit adipisci. Maxime voluptate dignissimos perferendis expedita, vel, dolor quidem fugit ea officiis quis commodi mollitia omnis, cum quos! Adipisci commodi vero recusandae harum, dolorum ea pariatur accusamus soluta, consectetur tempore eum.',
            price: price
        })
        await camp.save()
    }
}

seedDB()