import {projectFireStore} from "../config";

export const getDoc = async id => {
    const snapshot = await projectFireStore.collection ('Users').doc(id).get();
    return {...snapshot.data(), id: snapshot.id};
};