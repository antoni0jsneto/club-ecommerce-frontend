import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import User from "../types/user.types";

export const userConverter = {
    toFirestore(user: User) {
        return { ...user };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): User {
        const data = snapshot.data(options);

        return {
            id: data.id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            provider: data.provider,
        };
    },
};
