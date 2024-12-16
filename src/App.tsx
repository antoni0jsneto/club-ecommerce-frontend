import { onAuthStateChanged } from "firebase/auth";
import { FunctionComponent, useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

// Pages
import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import SignUpPage from "./pages/sign-up/sign-up.page";

// Utilities
import { UserContext } from "./contexts/user.context";
import { auth, db } from "./config/firebase.config";
import { userConverter } from "./converters/firestore.converters";
import Loading from "./components/loading/loading.component";

const App: FunctionComponent = () => {
    const [isInitializing, setIsInitializing] = useState(true);

    const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext);

    onAuthStateChanged(auth, async (user) => {
        const isSigningOut = isAuthenticated && !user;

        if (isSigningOut) {
            logoutUser();
            return setIsInitializing(false);
        }

        const isSigningIn = !isAuthenticated && user;

        if (isSigningIn) {
            const querySnapshot = await getDocs(
                query(
                    collection(db, "users").withConverter(userConverter),
                    where("id", "==", user.uid)
                )
            );

            const userFromFirestore = querySnapshot.docs[0]?.data();

            loginUser(userFromFirestore);

            return setIsInitializing(false);
        }

        return setIsInitializing(false);
    });

    if (isInitializing) return <Loading />;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
