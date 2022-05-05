import { useEffect, useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";

import { auth, firestore, githubAuthProvider } from "../lib/firebase";
import { UserContext } from "../lib/context";
import Layout from "../components/Layout";
import TailwindNavbar from "../components/TailwindNavbar";
import TailwindHeader from "../components/TailwindHeader";

/**
 *
 * @param props the properties of the page
 * @returns
 */
export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <div>
      <TailwindNavbar />
      <TailwindHeader
        sectionName="Einstellungen"
        title="Deine Einstellungen"
        subtitle="Was möchtest du anpassen?"
      />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex">
        {user ? (
          !username ? (
            <UsernameForm />
          ) : (
            <SignOutButton />
          )
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
    // <Layout title={"Enter"}>
    //   <main className="mt-40">
    //     {/* <Metatags title="Enter" description="Sign up for this amazing app!" /> */}
    //     {user ? (
    //       !username ? (
    //         <UsernameForm />
    //       ) : (
    //         <SignOutButton />
    //       )
    //     ) : (
    //       <SignInButton />
    //     )}
    //   </main>
    // </Layout>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGithub = async () => {
    await auth.signInWithPopup(githubAuthProvider);
  };

  return (
    <button
      type="button"
      className="m-auto inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={signInWithGithub}
    >
      Mit Github anmelden
    </button>
    // <button className="btn-google" onClick={signInWithGithub}>
    //   <img src={"/google.png"} width="30px" /> Sign in with Github
    // </button>
  );
}

// Sign out button
function SignOutButton() {
  return (
    <button
      type="button"
      className="m-auto inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={() => auth.signOut()}
    >
      Ausloggen
    </button>
  );
  // return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 700),
    []
  );

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="myname"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
