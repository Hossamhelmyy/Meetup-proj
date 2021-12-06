import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';

function MeetupDetails(props) {
	return (
		<MeetupDetail
			image={props.meetupData.image}
			title={props.meetupData.title}
			address={props.meetupData.address}
			description={props.meetupData.description}
		/>
	);
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		'mongodb+srv://hossammohamedhelmy:hossam1965@cluster0.aakvb.mongodb.net/meetups?retryWrites=true&w=majority',
	);
	const db = client.db();
	const meetupCollection = db.collection('meetups');

	const meetups = await meetupCollection
		.find({}, { _id: 1 })
		.toArray();
	return {
		fallback: false,
		paths: meetups.map((meetup) => ({
			params: {
				meetupId: meetup._id.toString(),
			},
		})),
	};
}

export async function getStaticProps(context) {
	// fetch data for a single meetup

	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(
		'mongodb+srv://hossammohamedhelmy:hossam1965@cluster0.aakvb.mongodb.net/meetups?retryWrites=true&w=majority',
	);
	const db = client.db();
	const meetupCollection = db.collection('meetups');

	const meetup = await meetupCollection.findOne({
		_id: ObjectId(meetupId),
	});

	client.close();
	console.log(meetupId);

	return {
		props: {
			meetupData: {
				id: meetup._id.toString(),
				image: meetup.image,
				title: meetup.title,
				description: meetup.description,
				address: meetup.address,
			},
		},
	};
}

export default MeetupDetails;
