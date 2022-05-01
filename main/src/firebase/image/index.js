import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, list, getDownloadURL } from "firebase/storage";
import app from "../app"
import { addUpdateUserInfoArray, db } from "../user";

const storage = getStorage(app);
console.log(storage);

export const createFeed = async (username, name, uid, url,description) => {
	try {
		const docRef = doc(db, 'feeds', `${uid}`);
		await setDoc(docRef, {
			username,
			name,
			url,
      description,
      likes : [],
		});

		return { data: { username,
			name,
			url,
      description, } };

	} catch (error) {
    console.log(error);
		return { error: error.message };
	}
};

export const uploadImage = async (file, description = "", userInfo) => {
  try {
    const name = Date.now();
    const storageRef = ref(storage, `images/${name}`);
    const fileInfo = await uploadBytes(storageRef, file[0], {
      contentType: file[0].mimetype
    });
    console.log(fileInfo);
    const url = await getDownloadURL(fileInfo.ref)
    await addUpdateUserInfoArray("images", {url, description}, userInfo.uid);
    const feed = await createFeed(userInfo.username,userInfo.name, name, url,description );
    console.log(feed);
    return url;
  } catch (error) {
    console.log(error)
    return {error: error.message}
  }
}

export const getFeed = async () => {
  try {
    // const storageRef = ref(storage, 'images/');
    // const lists =  await list(storageRef, {maxResults: 20});
    // const feeds = await Promise.all(lists.items.map((ref) => getDownloadURL(ref)));
    const feedsCollection = await getDocs(collection(db, "feeds"));
    let feeds = [];
    feedsCollection.forEach(doc => feeds.push(doc.data()))
    return {data: feeds}
  } catch (error) {
    // console.log(error)
    return {error: error.message}
  }
}

