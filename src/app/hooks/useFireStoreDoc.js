import {useEffect} from "react";
import {dataFromSnapshot} from "../firestore/fireStoreService";

export default function useFireStoreDoc({query, data, deps}) {
    useEffect(() => {

        const unsubscribe = query().onSnapshot(
            snapshot => {

                data(dataFromSnapshot(snapshot)); // what do with data

            },
        );

        return () => {
            unsubscribe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}