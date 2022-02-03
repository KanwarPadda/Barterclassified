import {useEffect} from "react";
import {dataFromSnapshot} from "../firestore/fireStoreService";

export default function useFireStoreCollection({query, data, deps}) {
    useEffect( () => {

        const unsubscribe = query().onSnapshot(
            snapshot => {
                const docs =  snapshot.docs.map(doc => dataFromSnapshot(doc));

                data(docs); // what do with data

            },
        );

        return () => {
            unsubscribe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}