"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function Nav() {
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    async function setProvidersEffect() {
      try {
        const res = await getProviders();
        setProviders(res);
      } catch (error) {
        console.log("ERROR");
        console.error(error);
      }
    }

    setProvidersEffect();
  }, []);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <DesktopNavigation
        isUserLoggedIn={session?.user}
        providers={providers}
        signIn={signIn}
        signOut={signOut}
        image={session?.user?.image}
      />
      <MobileNavigation
        isUserLoggedIn={session?.user}
        providers={providers}
        signIn={signIn}
        signOut={signOut}
        image={session?.user?.image}
      />
    </nav>
  );
}

function MobileNavigation({
  isUserLoggedIn,
  providers,
  signIn,
  signOut,
  image,
}) {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  return (
    <div className="sm:hidden flex relative">
      {isUserLoggedIn ? (
        <div className="flex ">
          <Image
            src={image}
            alt="Promptopia Logo"
            width={30}
            height={30}
            style={{ borderRadius: "50%" }}
            className="object-contain"
            onClick={() => setToggleDropdown((p) => !p)}
          />

          {toggleDropdown && (
            <div className="dropdown">
              <Link
                href="/profile"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                My Profile
              </Link>

              <Link
                href="/create-prompt"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Create Prompt
              </Link>
              <button
                type="button"
                className="mt-5 w-full black_btn"
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((p) => (
              <button
                type="button"
                key={p.name}
                onClick={() => signIn(p.id)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
        </>
      )}
    </div>
  );
}

function DesktopNavigation({
  isUserLoggedIn,
  providers,
  signIn,
  signOut,
  image,
}) {
  return (
    <div className="sm:flex hidden">
      {isUserLoggedIn ? (
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">
            Create Post
          </Link>
          <button type="button" onClick={signOut} className="outline_btn">
            Sign Out
          </button>
          <Link href="/profile" className="flex gap-2 flex-center">
            <Image
              src={image}
              width={37}
              height={37}
              className="rounded-full"
              alt="Profile"
            />
          </Link>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((p) => (
              <button
                type="button"
                key={p.name}
                onClick={() => signIn(p.id)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
        </>
      )}
    </div>
  );
}
