import firebase from '../config/firebase';

const db = firebase.firestore();

export const dataFromSnapshot = snapShot => {
console.log({snapShot})
    if (!snapShot.exists) return undefined;
    const data = snapShot.data();
    // checking for data.
    for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
            if (data[prop] instanceof firebase.firestore.Timestamp) {
                data[prop] = data[prop].toDate();
            }

        }
    }

    return {
        ...data,
        id: snapShot.id
    }


}


export function listenToCategoriesFromFirestore() {
    return db.collection('Categories');
}

export const getSingleCategoryFromFirestore = async categoryId => {
    await  db.collection('Categories').doc(categoryId).get();

}