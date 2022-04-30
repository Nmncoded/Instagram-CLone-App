import { getStorage, ref, uploadBytes, list, getDownloadURL } from "firebase/storage";
import app from "../app"
import { addUpdateUserInfoArray } from "../user";

const storage = getStorage(app);

export const uploadImage = async (file, description = "", uid) => {
  try {
    const name = Date.now();
    const storageRef = ref(storage, `images/${name}`);
    const fileInfo = await uploadBytes(storageRef, file[0], {
      contentType: file[0].mimetype
    });
    const url = await getDownloadURL(fileInfo.ref)
    await addUpdateUserInfoArray("images", {url, description}, uid)
    return url;
  } catch (error) {
    console.log(error)
    return {error: error.message}
  }
}

export const getFeed = async () => {
  try {
    const storageRef = ref(storage, 'images/');
    const lists =  await list(storageRef, {maxResults: 20});
    const feeds = await Promise.all(lists.items.map((ref) => getDownloadURL(ref)));
    return {data: feeds}
  } catch (error) {
    console.log(error)
    return {error: error.message}
  }
}