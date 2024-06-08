const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require('stripe')(process.env.PAYMENT_SECRET);
const cors = require('cors');
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// Middleware
app.use(cors());
app.use(express.json());

// Routes
// SET TOKEN .
const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'Unauthorize access' })
    }
    const token = authorization?.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ error: true, message: 'forbidden user or token has expired' })
        }
        req.decoded = decoded;
        next()
    })
}

// MONGO DB ROUTES

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}
@charity-service.lyqrs44.mongodb.net/?retryWrites=true&w=majority&appName=charity-service`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        const database = client.db("charity");
        const userCollection = database.collection("users");
        const donationsCollection = database.collection("donations");
        const cartCollection = database.collection("cart");
        const enrolledCollection = database.collection("enrolled");
        const paymentCollection = database.collection("payments");
        const appliedCollection = database.collection("applied");
        client.connect();

        // Verify admin
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            if (user.role === 'admin') {
                next()
            }
            else {
                return res.status(401).send({ error: true, message: 'Unauthorize access' })
            }
        }

        const verifyVolunteer = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            if (user.role === 'volunteer' || user.role === 'admin') {
                next()
            }
            else {
                return res.status(401).send({ error: true, message: 'Unauthorize access' })
            }
        }


        app.post('/new-user', async (req, res) => {
            const newUser = req.body;

            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })
        app.post('/api/set-token', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: '24h' })
            res.send({ token })
        })


        // GET ALL USERS
        app.get('/users', async (req, res) => {
            const users = await userCollection.find({}).toArray();
            res.send(users);
        })
        // GET USER BY ID
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const user = await userCollection.findOne(query);
            res.send(user);
        })
        // GET USER BY EMAIL
        app.get('/user/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await userCollection.findOne(query);
            res.send(result);
        })
        // Delete a user

        app.delete('/delete-user/:id', verifyJWT, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
        // UPDATE USER
        app.put('/update-user/:id', verifyJWT, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.option,
                    address: updatedUser.address,
                    phone: updatedUser.phone,
                    about: updatedUser.about,
                    photoUrl: updatedUser.photoUrl,
                    skills: updatedUser.skills ? updatedUser.skills : null,
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })


        // ! DONATION ROUTES

      /*  app.post('/new-donations', async (req, res) => {
            const newUser = req.body;

            const result = await donationsCollection.insertOne(newDonations);
            res.send(result);
        })*/
     


       app.post('/new-donation', async (req, res) => {
            const newDonation = req.body;
            newDonation.AmountCanbeDonations = parseInt(newDonation.AmountCanbeDonations)
            const result = await donationsCollection.insertOne(newDonation);
            res.send(result);
        });

        // GET ALL DONATINS ADDED BY VOLENTERS
        app.get('/donations/:email', verifyJWT, verifyVolunteer, async (req, res) => {
            const email = req.params.email;
            const query = { volunteerEmail: email };
            const result = await donationsCollection.find(query).toArray();
            res.send(result);
        })

        // GET ALL DONATIONS
        app.get('/donations', async (req, res) => {
            const query = { status: 'approved' };
            const result = await donationsCollection.find(query).toArray();
            res.send(result);
        })
        app.get('/donations-manage', async (req, res) => {
            const result = await donationsCollection.find().toArray();
            res.send(result);
        })

        // Change status of a donations
        app.put('/change-status/:id', verifyJWT, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const status = req.body.status;
            console.log(req.body)
            const reason = req.body.reason;
            const filter = { _id: new ObjectId(id) };
            console.log("🚀 ~ file: index.js:180 ~ app.put ~ reason:", reason)
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    status: status,
                    reason: reason
                }
            }
            const result = await donationsCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })
        // * GET APPROVED DONATINS
        app.get('/approved-donations', async (req, res) => {
            const query = { status: 'approved' };
            const result = await donationsCollection.find(query).toArray();
            res.send(result);
        })

        // GET ALL VOLENTEERS
        app.get('/volunteers', async (req, res) => {
            const query = { role: 'volunteer' };
            const result = await userCollection.find(query).toArray();
            res.send(result);
        })

        // Update a donations
        app.put('/update-donation/:id', verifyJWT, verifyVolunteer, async (req, res) => {
            const id = req.params.id;
            const updatedDonation = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedDonation.name,
                    description: updatedDonation.description,
                    price: updatedDonation.price,
                    AmountCanbeDonations: parseInt(updatedDonation.AmountCanbeDonations),
                  
                    status: 'pending'
                }
            }
            const result = await donatinsCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })


        // Get single donations by id for details page
        app.get('/donation/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await donationsCollection.findOne(query);
            res.send(result);
        })
        // ! CART ROUTES

        // ADD TO CART
        app.post('/add-to-cart', verifyJWT, async (req, res) => {
            const newCartItem = req.body;
            const result = await cartCollection.insertOne(newCartItem);
            res.send(result);
        })
        // Get cart item id for checking if a donations is already in cart
        app.get('/cart-item/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const email = req.query.email;
            const query = { donationId: id, userMail: email };
            const projection = { donationId: 1 };
            const result = await cartCollection.findOne(query, { projection: projection });
            res.send(result);
        })

        app.get('/cart/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            const query = { userMail: email };
            const projection = { donationId: 1 };
            const carts = await cartCollection.find(query, { projection: projection }).toArray();
            const donationIds = carts.map(cart => new ObjectId(cart.donationId));
            const query2 = { _id: { $in: donationIds } };
            const result = await donationsCollection.find(query2).toArray();
            res.send(result);
        })

        // Delete a item form cart
        app.delete('/delete-cart-item/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const query = { donationId: id };
            const result = await cartCollection.deleteOne(query);
            res.send(result);
        })
        // PAYMENT ROUTES
        app.post('/create-payment-intent', verifyJWT, async (req, res) => {
            const { price } = req.body;
            const amount = parseInt(price) * 100;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method_types: ['card']
            });
            res.send({
                clientSecret: paymentIntent.client_secret
            });
        })
        // POST PAYMENT INFO 
        app.post('/payment-info', verifyJWT, async (req, res) => {
            const paymentInfo = req.body;
            const donationsId = paymentInfo.donationsId;
            const userEmail = paymentInfo.userEmail;
            const singleDonationId = req.query.donationId;
            let query;
            // const query = { donationsId: { $in: donationsId } };
            if (singleDonationId) {
                query = { donationId: singleDonationId, userMail: userEmail };
            } else {
                query = { donationId: { $in: donationsId } };
            }
            const donationsQuery = { _id: { $in: donationsId.map(id => new ObjectId(id)) } }
            const donations = await donationsCollection.find(donationsQuery).toArray();
            const newEnrolledData = {
                userEmail: userEmail,
                donationsId: donationsId.map(id => new ObjectId(id)),
                transactionId: paymentInfo.transactionId,
            }
            const updatedDoc = {
                $set: {
                    totalEnrolled: donations.reduce((total, current) => total + current.totalEnrolled, 0) + 1 || 0,
                    AmountCanbeDonated: donations.reduce((total, current) => total + current.AmountCanbeDonated, 0) - 1 || 0,
                }
            }
            // const updatedvolunteers = await userCollection.find()
            const updatedResult = await donationsCollection.updateMany(donationsQuery, updatedDoc, { upsert: true });
            const enrolledResult = await enrolledCollection.insertOne(newEnrolledData);
            const deletedResult = await cartCollection.deleteMany(query);
            const paymentResult = await paymentCollection.insertOne(paymentInfo);
            res.send({ paymentResult, deletedResult, enrolledResult, updatedResult });
        })


        app.get('/payment-history/:email', async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const result = await paymentCollection.find(query).sort({ date: -1 }).toArray();
            res.send(result);
        })


        app.get('/payment-history-length/:email', async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const total = await paymentCollection.countDocuments(query);
            res.send({ total });
        })


        // ! ENROLLED ROUTES

        app.get('/popular_donations', async (req, res) => {
            const result = await donationsCollection.find().sort({ totalEnrolled: -1 }).limit(6).toArray();
            res.send(result);
        })


        app.get('/popular-volunteers', async (req, res) => {
            const pipeline = [
                {
                    $group: {
                        _id: "$ivolunteerEmail",
                        totalEnrolled: { $sum: "$totalEnrolled" },
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "_id",
                        foreignField: "email",
                        as: "volunteer"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        volunteer: {
                            $arrayElemAt: ["$volunteer", 0]
                        },
                        totalEnrolled: 1
                    }
                },
                {
                    $sort: {
                        totalEnrolled: -1
                    }
                },
                {
                    $limit: 6
                }
            ]
            const result = await donationsCollection.aggregate(pipeline).toArray();
            res.send(result);

        })

        // Admins stats 
        app.get('/admin-stats', verifyJWT, verifyAdmin, async (req, res) => {
            // Get approved donations and pending donations and volunteerss 
            const approvedDonations = (await donationsCollection.find({ status: 'approved' }).toArray()).length;
            const pendingDonations = (await donationsCollection.find({ status: 'pending' }).toArray()).length;
            const volunteers = (await userCollection.find({ role: 'volunteer' }).toArray()).length;
            const totalDonations = (await donationsCollection.find().toArray()).length;
            const totalEnrolled = (await enrolledCollection.find().toArray()).length;
            // const totalRevenue = await paymentCollection.find().toArray();
            // const totalRevenueAmount = totalRevenue.reduce((total, current) => total + parseInt(current.price), 0);
            const result = {
                approvedDonations,
                pendingDonations,
                volunteers,
                totalDonations,
                totalEnrolled,
                // totalRevenueAmount
            }
            res.send(result);

        })

        // !GET ALL volunteers  

        app.get('/volunteers', async (req, res) => {
            const result = await userCollection.find({ role: 'volunteer' }).toArray();
            res.send(result);
            
        })




        app.get('/enrolled-donations/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const pipeline = [
                {
                    $match: query
                },
                {
                    $lookup: {
                        from: "donations",
                        localField: "donationsId",
                        foreignField: "_id",
                        as: "donations"
                    }
                },
                {
                    $unwind: "$donations"
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "donations.volunteerEmail",
                        foreignField: "email",
                        as: "volunteer"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        donations: 1,
                        volunteer: {
                            $arrayElemAt: ["$volunteer", 0]
                        }
                    }
                }

            ]
            const result = await enrolledCollection.aggregate(pipeline).toArray();
            // const result = await enrolledCollection.find(query).toArray();
            res.send(result);
        })

       //Applied route 
       app.post('/application', async (req, res) => {
        const data = req.body;
        const result = await appliedCollection.insertOne(data);
        res.send(result);
    })
    app.get('/application/:email',   async (req, res) => {
        const email = req.params.email;
        const result = await appliedCollection.findOne({email});
        res.send(result);
    });
    app.get('/application-manage', async (req, res) => {
        const result = await appliedCollection.find().toArray();
        res.send(result);
    })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING');
})


// Listen
app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
})