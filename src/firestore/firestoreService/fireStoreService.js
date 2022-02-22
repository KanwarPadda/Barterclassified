import {projectFireStore} from "../config";

export const getDoc = async id => {
    const snapshot = await projectFireStore.collection('Users').doc(id).get();
    return {...snapshot.data(), id: snapshot.id};
};


export function dataFromSnapshot(snapshot) {
    if (!snapshot.exists) return undefined;
    const data = snapshot.data();

    // for(const prop in data){
    //     if(data.hasOwnProperty(prop)){
    //         if(data[prop] instanceof projectFireStore.Timestamp){ // this checks whether date is a child of fireBase.fireStore.TimeStamp
    //             data[prop] = data[prop].toDate();
    //         }
    //     }
    // }


    return {
        ...data,
        id: snapshot.id,
    }
}


export const addingDataToCollection = async (collectionName, args) => {
    return projectFireStore.collection(collectionName).add(args);
}