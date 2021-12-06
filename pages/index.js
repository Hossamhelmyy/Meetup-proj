import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
	return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
	// fetch data from an API
	const client = await MongoClient.connect(
		'mongodb+srv://hossammohamedhelmy:hossam1965@cluster0.aakvb.mongodb.net/meetups?retryWrites=true&w=majority',
	);
	const db = client.db();
	const meetupCollection = db.collection('meetups');

	const meetups = await meetupCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1,
	};
}

export default HomePage;
