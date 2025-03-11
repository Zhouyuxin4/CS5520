import { router, Slot, Stack, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { auth } from "@/Firebase/firebaseSetup";
import { onAuthStateChanged } from "firebase/auth";

export default function _layout() {
    const [userLogin, setUserLoggedIn] = useState(false); // Initializing state properly
    const segments = useSegments(); // Get current route segments
    
    console.log(segments)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserLoggedIn(true); // Set user state when user is logged in
                console.log("User logged in:", user);
            } else {
                setUserLoggedIn(false); // Set state to false if no user
                console.log("No user logged in");
            }
        });

        // Cleanup function to unsubscribe when component unmounts
        return () => {
            unsubscribe();
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Conditional check based on authentication status and route segment
    useEffect(() => {
        if (userLogin && segments[0] === "(auth)") {
            // Perform actions when the user is logged in and on the "(auth)" segment
            console.log("User is logged in and on the '(auth)' route segment");
            router.replace("(protected)")
        } else if (!userLogin && segments[0] === "(protected)") {
            // Perform actions when the user is logged in and on the "(auth)" segment
            console.log("User is logged in and on the '(protected)' route segment");
            router.replace("(auth)/login")
        }
    }, [userLogin]); // Dependencies for this effect

    return (
    <Stack screenOptions={{ headerShown: false, animation: "fade" }} >
	<Stack.Screen
				 name="(auth)" options={{ animation: "slide_from_left" }} />     
	<Stack.Screen 
				name="(protected)" options={{ animation: "slide_from_right" }} />
    </Stack>
)
}
