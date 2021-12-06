import { MongoClient } from 'mongodb';

async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body;

		const client = await MongoClient.connect(
			'mongodb+srv://hossammohamedhelmy:hossam1965@cluster0.aakvb.mongodb.net/meetups?retryWrites=true&w=majority',
		);
		const db = client.db();
		const meetupCollection = db.collection('meetups');

		const results = await meetupCollection.insertOne(data);
		console.log(results);

		client.close();
		res.status(201).json({ message: 'Meetup inserted!' });
	}
}
export default handler;
